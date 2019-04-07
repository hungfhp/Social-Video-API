import Group from './groupModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './groupUtil'

/**
 * @group groups - Operations about groups
 *
 */

export async function getGroupsStats(req, res, next) {
	try {
		res.groupsStats = {
			count: await Group.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGroups(req, res, next) {
	try {
		let { docs, ...groupsMeta } = await Group.paginate({}, req.parsedParams)

		res.groups = docs
		res.groupsMeta = groupsMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGroupById(req, res, next) {
	try {
		res.group = await Group.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createGroup(req, res, next) {
	try {
		res.group = await Group.create({
			...req.body,
			creator: req.user._id || ''
		})

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateGroup(req, res, next) {
	try {
		let group = await Group.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			group[key] = req.body[key]
		})
		await group.save()
		res.group = group

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteGroup(req, res, next) {
	try {
		const group = await Group.findById(req.params.id)

		await group.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
