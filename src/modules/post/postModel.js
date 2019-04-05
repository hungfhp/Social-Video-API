/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as myValid from './postValidation'
let postSchema = new Schema(
	{
		content: {
			type: String,
			trim: true,
			unique: true
		},
		movie: {
			type: ObjectId,
			required: [true, 'Movie is required!'],
			ref: 'Movie',
			trim: true
		},
		status: {
			type: String,
			enum: ['checking', 'close', 'done'],
			default: 'checking',
			trim: true
		},
		poster: {
			type: ObjectId,
			ref: 'User',
			required: [true, 'Poster is required!'],
			trim: true
		},
		group: {
			type: ObjectId,
			ref: 'Group',
			required: [true, 'Group is required!'],
			trim: true
		}
	},
	{
		timestamps: true
	}
)

postSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
postSchema.plugin(mongoosePaginate)
postSchema.plugin(autopopulate)

export default mongoose.model('Post', postSchema)
