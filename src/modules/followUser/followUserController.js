import FollowUser from './followUserModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './followUserUtil'
import { log } from '../../utils/helper'

/**
 * @group followUsers - Operations about followUsers
 *
 */

export async function getFollowing(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowUser.paginate(
			{ ...req.parsedParams.filters, user: req.params.id },
			{
				...req.parsedParams,
				populate: [
					{
						path: 'follow',
						model: 'User'
					}
				]
			}
		)

		res.following = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowers(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowUser.paginate(
			{ ...req.parsedParams.filters, follow: req.params.id },
			{
				...req.parsedParams,
				populate: [
					{
						path: 'user',
						model: 'User'
					}
				]
			}
		)

		res.followers = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowUsersStats(req, res, next) {
	try {
		res.followUsersStats = {
			count: await FollowUser.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowUsers(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowUser.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

		res.followUsers = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowUserById(req, res, next) {
	try {
		res.followUser = await FollowUser.findById(req.params.id).populate([
			{
				path: 'user',
				model: 'User'
			},
			{
				path: 'follow',
				model: 'User'
			}
		])

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createFollowUser(req, res, next) {
	try {
		res.followUser = await FollowUser.create({
			...req.body,
			user: req.user
		})

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateFollowUser(req, res, next) {
	try {
		let followUser = await FollowUser.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			followUser[key] = req.body[key]
		})
		await followUser.save()
		res.followUser = followUser

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteFollowUser(req, res, next) {
	try {
		const followUser = await FollowUser.findById(req.params.id)

		await followUser.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
