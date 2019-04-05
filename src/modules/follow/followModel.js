/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let followSchema = new Schema(
	{
		followName: {
			type: String,
			required: [true, 'followName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

followSchema.statics = {}

followSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

followSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
followSchema.plugin(mongoosePaginate)
followSchema.plugin(autopopulate)
followSchema.plugin(pluginService.logPost, { schemaName: 'Follow' })
followSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Follow' })

export default mongoose.model('Follow', followSchema)
