/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let sampleSchema = new Schema(
	{
		sampleName: {
			type: String,
			required: [true, 'sampleName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

sampleSchema.statics = {}

sampleSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

sampleSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
sampleSchema.plugin(mongoosePaginate)
sampleSchema.plugin(autopopulate)
sampleSchema.plugin(pluginService.logPost, { schemaName: 'Sample' })
sampleSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Sample' })

export default mongoose.model('Sample', sampleSchema)
