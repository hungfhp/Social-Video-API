/**
 * @typedef posts
 * @property {string} _id
 * @property {string} postName
 */

import validator from 'validator'
import slug from 'slug'
import mongoose from 'mongoose'
let Schema = mongoose.Schema
import uniqueValidator from 'mongoose-unique-validator'
import mongoosePaginate from 'mongoose-paginate'

import * as myValid from './postValidation'

let postSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Title is required!'],
			minlength: [3, 'Title need to be longer!'],
			unique: true
		},
		text: {
			type: String,
			trim: true,
			required: [true, 'Text   is required!'],
			minlength: [10, 'Text   need to be longer!']
		},
		slug: {
			type: String,
			trim: true,
			lowercase: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		favoriteCount: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true
	}
)

postSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

postSchema.pre('validate', function(next) {
	this._slugify()
	next()
})

postSchema.methods = {
	_slugify() {
		this.slug = slug(this.title)
	}
}

postSchema.plugin(mongoosePaginate)

export default mongoose.model('post', postSchema)
