import User from './userModel.js'
import HTTPStatus from 'http-status'
import * as util from './userUtil'

/**
 * @group users - Operations about users
 *
 */

export async function getStats(req, res, next) {
	try {
		let stats = {
			count: await User.estimatedDocumentCount()
		}

		// callback(null,stats)
		res.stats = stats
		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function index(req, res) {
	const limit = parseInt(req.query.limit, 0) || 10
	const skip = parseInt(req.query.skip, 0) || 0
	try {
		const users = await User.find({
			...req.query
		})

		return res.status(HTTPStatus.OK).json(users)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function show(req, res) {
	try {
		const user = await User.findById(
			req.params.id
		).populate('user')

		return res.status(HTTPStatus.OK).json(user)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function create(req, res) {
	try {
		const user = await User.create(req.body)

		return res
			.status(HTTPStatus.CREATED)
			.json(user.toAuthJSON())
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function update(req, res) {
	try {
		const user = await User.findById(req.params.id)

		// util.isOwn(user, req, res)

		Object.keys(req.body).forEach(key => {
			user[key] = req.body[key]
		})

		return res.status(HTTPStatus.OK).json(await user.save())
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function remove(req, res) {
	try {
		const user = await User.findById(req.params.id)

		// util.isOwn(user, req, res)

		await user.remove()

		return res.sendStatus(HTTPStatus.OK)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function login(req, res, next) {
	res.status(HTTPStatus.OK).json(req.user.toAuthJSON())

	return next()
}
