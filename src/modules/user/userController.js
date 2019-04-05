import User from './userModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './userUtil'

/**
 * @group users - Operations about users
 *
 */

export async function getUsersStats(req, res, next) {
	try {
		res.usersStats = {
			count: await User.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getProfile(req, res, next) {
	try {
		req.authenUser = req.user.toAuthJSON()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getUsers(req, res, next) {
	try {
		let { docs, ...usersMeta } = await User.paginate({}, req.parsedParams)

		res.users = docs
		res.usersMeta = usersMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getUserById(req, res, next) {
	try {
		res.user = await User.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createUser(req, res, next) {
	try {
		const user = await User.create({ ...req.body, provider: 'local' })
		req.user = user.toAuthJSON()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateUser(req, res, next) {
	try {
		let user = await User.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			user[key] = req.body[key]
		})
		await user.save()
		res.user = user

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id)

		await user.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export function localLogin(req, res, next) {
	req.user = req.user.toAuthJSON()
	return next()
}
export function facebookLogin(req, res, next) {
	// req.user is inited
	return next()
}
