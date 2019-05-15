/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let subSchema = new Schema(
	{
		subName: {
			type: String,
			required: [true, 'subName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

subSchema.statics = {}

subSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

subSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
subSchema.plugin(mongoosePaginate)
subSchema.plugin(autopopulate)
subSchema.plugin(pluginService.logPost, { schemaName: 'Sub' })
subSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Sub' })

export default mongoose.model('Sub', subSchema)
