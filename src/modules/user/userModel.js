import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { hashSync, compareSync } from 'bcrypt-nodejs'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

import { passwordReg } from './userValidation'
import con from '../../config/constants'

/**
 * @typedef users
 * @property {string} _id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
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
		firstName: {
			type: String,
			trim: true
		},
		lastName: {
			type: String,
			trim: true
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
			trim: true,
			minlength: [6, 'Password need to be longer!'],
			validate: {
				validator(password) {
					return passwordReg.test(password)
				},
				message: '{VALUE} is not a valid password!'
			}
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
	toAuthJSON() {
		return {
			_id: this._id,
			email: this.email,
			token: `JWT ${this.createToken()}`
		}
	},
	toJSON() {
		return {
			_id: this._id,
			email: this.email
		}
	}
}

userSchema.plugin(mongoosePaginate)

export default mongoose.model('User', userSchema)
