/* eslint-disable no-unused-vars */
/**
 * @typedef voiceovers
 * @property {string} _id
 * @property {string} voiceoverName
 */

import validator from 'validator'
import * as myValid from './voiceoverValidation'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'

let voiceoverSchema = new Schema(
	{
		requestId: {
			type: String,
			required: [true, 'Request indentifier is required!'],
			unique: true,
			trim: true
		},
		embedUrl: {
			type: String,
			trim: true
		},
		fileFormat: {
			type: String,
			trim: true
		},
		status: {
			type: String,
			enum: ['pending', 'done'],
			default: 'pending',
			trim: true
		},
		movie: {
			type: ObjectId,
			ref: 'Movie',
			trim: true
		},
		uploader: {
			type: ObjectId,
			ref: 'User',
			trim: true
		}
	},
	{
		timestamps: true
	}
)
voiceoverSchema.plugin(mongoosePaginate)

export default mongoose.model('Voiceover', voiceoverSchema)
