/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let relationshipSchema = new Schema(
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

relationshipSchema.statics = {
	async findOneOrCreate(condition) {
		let rs = await this.findOne(condition)
		return rs ? rs : await this.create(condition)
	},
	async isRequest(user, request) {
		let rs = await this.findOneOrCreate({ user })
		return rs.isRequest(request)
	},
	async isFriend(user, friend) {
		let rs = await this.findOneOrCreate({ user })
		return rs.isFriend(friend)
	},
	async createRequest(user, request) {
		let rs = await this.findOneOrCreate({ user })
		return rs.addRequest(request)
	},
	async acceptRequest(user, request) {
		let userRS = await this.findOneOrCreate({ user })
		let requestRS = await this.findOneOrCreate({ user: request })

		userRS.removeRequest(request)
		userRS.addFriend(request)
		requestRS.addFriend(user)
		return userRS
	},
	async rejectRequest(user, request) {
		let userRS = await this.findOneOrCreate({ user })
		return await userRS.removeRequest(request)
	},
	async removeFriend(user, friend) {
		let userResource = await this.findOneOrCreate({ user })
		let friendResource = await this.findOneOrCreate({ user: friend })

		friendResource.removeFriend(user)
		return await userResource.removeFriend(friend)
	}
}

relationshipSchema.methods = {
	isRequest(request) {
		return this.requests.indexOf(request._id || request) !== -1 ? true : false
	},
	isFriend(friend) {
		return this.friends.indexOf(friend._id || friend) !== -1 ? true : false
	},
	addRequest(request) {
		if (this.isRequest(request) || this.isFriend(request)) {
			return this
		}
		this.requests.push(request)
		if (this.requestsCount % 10 === 0) {
			this.requestsCount = this.requests.length
		} else {
			this.requestsCount++
		}
		return this.save()
	},
	addFriend(friend) {
		if (this.isFriend(friend)) {
			return this
		}
		this.friends.push(friend)
		if (this.friendsCount % 10 === 0) {
			this.friendsCount = this.friends.length
		} else {
			this.friendsCount++
		}
		return this.save()
	},
	removeRequest(request) {
		if (!this.isRequest(request)) {
			return this
		}
		this.requests.remove(request)
		if (this.requestsCount % 10 === 0) {
			this.requestsCount = this.requests.length
		} else {
			this.requestsCount--
		}
		return this.save()
	},
	removeFriend(friend) {
		if (!this.isFriend(friend)) {
			return this
		}
		this.friends.remove(friend)
		if (this.friendsCount % 10 === 0) {
			this.friendsCount = this.friends.length
		} else {
			this.friendsCount--
		}
		return this.save()
	}
}

relationshipSchema.pre('save', function(next) {
	return next()
})

relationshipSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
relationshipSchema.plugin(mongoosePaginate)
relationshipSchema.plugin(autopopulate)
relationshipSchema.plugin(pluginService.logPost, { schemaName: 'Relationship' })
relationshipSchema.plugin(pluginService.setSlugUrl, {
	schemaName: 'Relationship'
})

export default mongoose.model('Relationship', relationshipSchema)
