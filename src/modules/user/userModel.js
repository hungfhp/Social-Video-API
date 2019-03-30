import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

import { passwordReg } from './userValidation'
import con from '../../config/constants'

/**
 * @typedef users
 * @property {string} _id
 * @property {string} email
 * @property {string} name
 * @property {string} email
 * @property {string} name
 * @property {string} email
 * @property {string} name
 * @property {string} password
 */

let userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: [true, 'Email is required!'],
			trim: true,
			validate: {
				validator(email) {
					return validator.isEmail(email)
				},
				message: '{VALUE} is not a valid email!'
			}
		},
		password: {
			type: String,
			// required: [true, 'Password is required!'],
			trim: true,
			minlength: [6, 'Password need to be longer!'],
			validate: {
				validator(password) {
					return passwordReg.test(password)
				},
				message: '{VALUE} is not a valid password!'
			}
		},
		name: {
			type: String,
			trim: true
		},
		provider: {
			type: String,
			trim: true
		},
		socials: {
			type: Object,
			trim: true
		},
		gender: {
			type: Number,
			trim: true,
			default: 0
		},
		role: {
			type: String,
			trim: true,
			default: 'user'
		},
		avatarUrl: {
			type: String,
			trim: true,
			default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg'
		},
		token: {
			type: String,
			trim: true
		},
		uploadedCount: {
			type: Number,
			trim: true
		},
		friendsRequest: {
			type: Array, // ObjectId User
			trim: true
		}
	},
	{
		timestamps: true
	}
)

userSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

userSchema.pre('save', function(next) {
	if (this.isModified('password')) {
		this.password = this._hashPassword(this.password)
	}

	return next()
})

userSchema.methods = {
	_hashPassword(password) {
		return hashSync(password)
	},
	authenticateUser(password) {
		return compareSync(password, this.password)
	},
	createToken() {
		return jwt.sign(
			{
				_id: this._id
			},
			con.JWT_SECRET
		)
	},
	toJSON() {
		return _.pick(this, [
			'_id',
			'email',
			'name',
			'role',
			'avatarUrl',
			'fbId',
			'ggId'
		])
	},
	toAuthJSON() {
		return {
			...this.toJSON(),
			role: this.role,
			provider: this.provider,
			providerUrl: this.providerUrl,
			token: `JWT ${this.createToken()}`
		}
	}
}

userSchema.plugin(mongoosePaginate)

export default mongoose.model('User', userSchema)
