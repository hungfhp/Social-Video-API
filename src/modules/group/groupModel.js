/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as pluginService from '../../services/pluginService'

let groupSchema = new Schema(
	{
		creator: {
			type: ObjectId,
			ref: 'User',
			autopopulate: true,
			required: [true, 'Creator is required!'],
			trim: true
		},
		name: {
			type: String,
			required: [true, 'Name is required!'],
			trim: true
		},
		slug: {
			type: String,
			trim: true
		},
		url: {
			type: String,
			trim: true
		},
		desc: {
			type: String,
			trim: true
		},
		membersCount: {
			type: Number,
			default: 0,
			trim: true
		},
		requestsCount: {
			type: Number,
			default: 0,
			trim: true
		},
		genres: [
			{
				type: String,
				required: [true, 'Genre is required!'],
				trim: true
			}
		],
		posts: [
			{
				type: ObjectId,
				ref: 'Post',
				trim: true
			}
		]
	},
	{
		timestamps: true
	}
)

groupSchema.statics = {
	incMembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: 1 } })
	},

	decMembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: -1 } })
	},

	incRequestsCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { requestsCount: 1 } })
	},

	decRequestsCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { requestsCount: -1 } })
	}
}

groupSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
groupSchema.plugin(mongoosePaginate)
groupSchema.plugin(autopopulate)
groupSchema.plugin(pluginService.logPost, { schemaName: 'Group' })
groupSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Group' })

export default mongoose.model('Group', groupSchema)
