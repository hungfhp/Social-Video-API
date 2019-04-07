/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let memberSchema = new Schema(
	{
		memberName: {
			type: String,
			required: [true, 'memberName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)

memberSchema.statics = {}

memberSchema.pre('save', function(next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next()
})

memberSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
memberSchema.plugin(mongoosePaginate)
memberSchema.plugin(autopopulate)
memberSchema.plugin(pluginService.logPost, { schemaName: 'Member' })
memberSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Member' })

export default mongoose.model('Member', memberSchema)
