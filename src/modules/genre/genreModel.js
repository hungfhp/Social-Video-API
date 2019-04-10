/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as pluginService from '../../services/pluginService'
import * as myValid from './genreValidation'

let genreSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Genre name is required!'],
			trim: true,
			unique: true
		},
		slug: {
			type: String,
			required: [true, 'Genre slug is required!'],
			trim: true,
			unique: true
		},
		url: {
			type: String,
			required: [true, 'Genre url is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

genreSchema.pre('save', function(next) {
	return next()
})

genreSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
genreSchema.plugin(mongoosePaginate)
genreSchema.plugin(autopopulate)
genreSchema.plugin(pluginService.logPost, { schemaName: 'Genre' })
genreSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Genre' })

export default mongoose.model('Genre', genreSchema)
