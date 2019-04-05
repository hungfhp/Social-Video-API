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
		rateName: {
			type: String,
			required: [true, 'rateName is required!'],
			trim: true,
			unique: true
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
