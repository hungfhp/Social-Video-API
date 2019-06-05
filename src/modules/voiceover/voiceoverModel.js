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
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as pluginService from '../../services/pluginService'

let voiceoverSchema = new Schema(
	{
		requestId: {
			type: String,
			required: [true, 'Request ID is required!'],
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
			required: [true, 'Movie is required!'],
			trim: true
		},
		uploader: {
			type: ObjectId,
			ref: 'User',
			required: [true, 'Uploader is required!'],
			trim: true
		},
		name: {
			type: String,
			trim: true,
			default: 'Giọng'
		}
	},
	{
		timestamps: true
	}
)

voiceoverSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

voiceoverSchema.plugin(mongoosePaginate)
voiceoverSchema.plugin(autopopulate)
voiceoverSchema.plugin(pluginService.logPost, { schemaName: 'Voiceover' })
voiceoverSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Voiceover' })

export default mongoose.model('Voiceover', voiceoverSchema)
