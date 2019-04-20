/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let friendSchema = new Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
			required: [true, 'User is required!'],
			autopopulate: true,
			trim: true
		},
		requestsCount: {
			type: Number,
			default: 0
		},
		friendsCount: {
			type: Number,
			default: 0
		},
		requests: [
			{
				type: ObjectId,
				ref: 'User',
				trim: true
			}
		],
		friends: [
			{
				type: ObjectId,
				ref: 'User',
				trim: true
			}
		]
	},
	{
		timestamps: true
	}
)

friendSchema.methods.isFriend = async function(friend) {
	return false
}

friendSchema.methods = {
	createRequest(friend) {
		if (!this.requests.indexOf(friend)) {
			this.requests.push(friend)
			this.requestsCount++
		}
		return this.save()
	},
	acceptRequest(friend) {
		if (this.requests.indexOf(friend)) {
			this.requests.remove(friend)
			this.requestsCount--
		}
		if (!this.friends.indexOf(friend)) {
			this.friends.push(friend)
			this.friendsCount++
		}
		return this.save()
	},
	rejectRequest(friend) {
		if (this.requests.indexOf(friend)) {
			this.requests.remove(friend)
			this.requestsCount--
		}
		return this.save()
	},
	removeFriend(friend) {
		if (this.friends.indexOf(friend)) {
			this.friends.remove(friend)
			this.friendsCount--
		}
		return this.save()
	}
}

friendSchema.statics = {
	async createRequest(user, friend) {
		friend = mongoose.Types.ObjectId(friend)
		let friendResource = await this.findOne({ user: friend })
		if (!friendResource) {
			friendResource = await this.create({ user: friend })
		}
		return friendResource.createRequest(user)
	},
	acceptFriend(user, friend) {
		friend = mongoose.Types.ObjectId(friend)
		let userResource = this.findOne({ user })
		let friendResource = this.findOne({ user: friend })
		friendResource.acceptRequest(user)
		return userResource.acceptRequest(friend)
	},
	rejectRequest(user, friend) {
		friend = mongoose.Types.ObjectId(friend)
		let userResource = this.findOne({ user })
		return userResource.rejectFriend(friend)
	},
	removeFriend(user, friend) {
		friend = mongoose.Types.ObjectId(friend)
		let userResource = this.findOne({ user })
		let friendResource = this.findOne({ user: friend })
		friendResource.removeFriend(user)
		return userResource.removeFriend(friend)
	}
}

friendSchema.pre('save', function(next) {
	return next()
})

friendSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
friendSchema.plugin(mongoosePaginate)
friendSchema.plugin(autopopulate)
friendSchema.plugin(pluginService.logPost, { schemaName: 'Friend' })
friendSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Friend' })

export default mongoose.model('Friend', friendSchema)
