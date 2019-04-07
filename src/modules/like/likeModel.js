/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let likeSchema = new Schema(
	{
		likeName: {
			type: String,
			required: [true, 'likeName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

likeSchema.statics = {}

likeSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

likeSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
likeSchema.plugin(mongoosePaginate)
likeSchema.plugin(autopopulate)
likeSchema.plugin(pluginService.logPost, { schemaName: 'Like' })
likeSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Like' })

export default mongoose.model('Like', likeSchema)
