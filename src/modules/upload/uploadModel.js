/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let uploadSchema = new Schema(
	{
		uploadName: {
			type: String,
			required: [true, 'uploadName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

uploadSchema.statics = {}

uploadSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

uploadSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
uploadSchema.plugin(mongoosePaginate)
uploadSchema.plugin(autopopulate)
uploadSchema.plugin(pluginService.logPost, { schemaName: 'Upload' })
uploadSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Upload' })

export default mongoose.model('Upload', uploadSchema)
