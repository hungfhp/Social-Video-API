/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let directorSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Director name is required!'],
			trim: true
		},
		slug: {
			type: String,
			required: [true, 'Director slug is required!'],
			trim: true
		},
		url: {
			type: String,
			required: [true, 'Director url is required!'],
			trim: true,
			unique: true
		},
		info: {
			type: String,
			trim: true
		},
		avatarUrl: {
			type: String,
			default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg',
			trim: true
		}
	},
	{
		timestamps: true
	}
)

directorSchema.statics = {}

directorSchema.pre('save', function(next) {
	return next()
})

directorSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
directorSchema.plugin(mongoosePaginate)
directorSchema.plugin(autopopulate)
directorSchema.plugin(pluginService.logPost, { schemaName: 'Director' })
directorSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Director' })

export default mongoose.model('Director', directorSchema)
