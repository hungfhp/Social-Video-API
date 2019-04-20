import Member from './memberModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './memberUtil'

/**
 * @group members - Operations about members
 *
 */

export async function getMembersStats(req, res, next) {
	try {
		res.membersStats = {
			count: await Member.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMembers(req, res, next) {
	try {
		let { docs, ...pagination } = await Member.paginate({}, req.parsedParams)

		res.members = docs
		res.pagination = pagination

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMemberById(req, res, next) {
	try {
		res.member = await Member.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createMember(req, res, next) {
	try {
		res.member = await Member.create({
			...req.body,
			user: req.user
		})

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateMember(req, res, next) {
	try {
		let member = await Member.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			member[key] = req.body[key]
		})
		await member.save()
		res.member = member

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteMember(req, res, next) {
	try {
		const member = await Member.findById(req.params.id)

		await member.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
