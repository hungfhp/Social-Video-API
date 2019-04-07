import Follow from './followModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './followUtil'

/**
 * @group follows - Operations about follows
 *
 */

export async function getFollowsStats(req, res, next) {
	try {
		res.followsStats = {
			count: await Follow.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollows(req, res, next) {
	try {
		let { docs, ...followsMeta } = await Follow.paginate({}, req.parsedParams)

		res.follows = docs
		res.followsMeta = followsMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowById(req, res, next) {
	try {
		res.follow = await Follow.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createFollow(req, res, next) {
	try {
		res.follow = await Follow.create(req.body)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateFollow(req, res, next) {
	try {
		let follow = await Follow.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			follow[key] = req.body[key]
		})
		await follow.save()
		res.follow = follow

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteFollow(req, res, next) {
	try {
		const follow = await Follow.findById(req.params.id)

		await follow.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
