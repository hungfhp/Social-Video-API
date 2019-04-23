/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let followUserSchema = new Schema(
	{
		user: {
			type: ObjectId,
			required: [true, 'User is required!'],
			trim: true
		},
		follow: {
			type: ObjectId,
			required: [true, 'Follow is required!'],
			trim: true
		}
	},
	{
		timestamps: true
	}
)

followUserSchema.statics = {}

followUserSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

followUserSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
followUserSchema.plugin(mongoosePaginate)
followUserSchema.plugin(autopopulate)
followUserSchema.plugin(pluginService.logPost, { schemaName: 'FollowUser' })
followUserSchema.plugin(pluginService.setSlugUrl, { schemaName: 'FollowUser' })

export default mongoose.model('FollowUser', followUserSchema)
