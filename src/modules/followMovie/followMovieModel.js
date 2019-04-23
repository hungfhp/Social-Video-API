/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let followMovieSchema = new Schema(
	{
		user: {
			type: ObjectId,
			required: [true, 'User is required!'],
			trim: true
		},
		movie: {
			type: ObjectId,
			required: [true, 'Movie is required!'],
			trim: true
		}
	},
	{
		timestamps: true
	}
)

followMovieSchema.statics = {}

followMovieSchema.pre('save', function(next) {
	return next()
})

followMovieSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
followMovieSchema.plugin(mongoosePaginate)
followMovieSchema.plugin(autopopulate)
followMovieSchema.plugin(pluginService.logPost, { schemaName: 'FollowMovie' })
followMovieSchema.plugin(pluginService.setSlugUrl, {
	schemaName: 'FollowMovie'
})

export default mongoose.model('FollowMovie', followMovieSchema)
