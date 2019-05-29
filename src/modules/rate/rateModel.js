/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let rateSchema = new Schema(
	{
		movie: {
			type: ObjectId,
			required: [true, 'Movie is required!'],
			ref: 'Movie',
			trim: true
		},
		user: {
			type: ObjectId,
			required: [true, 'User is required!'],
			ref: 'User',
			trim: true
		},
		value: {
			type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rate value is required!'],
			ref: 'User',
			trim: true
		}
	},
	{
		timestamps: true
	}
)

rateSchema.statics = {}

rateSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

rateSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
rateSchema.plugin(mongoosePaginate)
rateSchema.plugin(autopopulate)
rateSchema.plugin(pluginService.logPost, { schemaName: 'Rate' })
rateSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Rate' })

export default mongoose.model('Rate', rateSchema)
