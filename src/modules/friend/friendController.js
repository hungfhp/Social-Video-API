import Friend from './friendModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './friendUtil'

/**
 * @group friends - Operations about friends
 *
 */

// export async function getFriendsByUserId(req, res, next) {
// 	try {
// 		res.friends = await Friend.find(req.params.id)

// 		next()
// 	} catch (e) {
// 		return res.status(HTTPStatus.BAD_REQUEST).json(e)
// 	}
// }

// export async function getRequestsByUserId(req, res, next) {
// 	try {
// 		res.friend = await Friend.findById(req.params.id)

// 		next()
// 	} catch (e) {
// 		return res.status(HTTPStatus.BAD_REQUEST).json(e)
// 	}
// }

export async function createRequest(req, res, next) {
	try {
		res.friend = await Friend.createRequest(req.user._id, req.body.friend)
		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function acceptRequest(req, res, next) {
	try {
		res.friend = await Friend.acceptRequest(req.user._id, req.body.friend)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function rejectRequest(req, res, next) {
	try {
		res.friend = await Friend.rejectRequest(req.user._id, req.body.friend)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function removeFriend(req, res, next) {
	try {
		res.friend = await Friend.removeFriend(req.user._id, req.body.friend)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFriendsStats(req, res, next) {
	try {
		res.friendsStats = {
			count: await Friend.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFriends(req, res, next) {
	try {
		let { docs, ...pagination } = await Friend.paginate({}, req.parsedParams)

		res.friends = docs
		res.pagination = pagination

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFriendById(req, res, next) {
	try {
		res.friend = await Friend.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createFriend(req, res, next) {
	try {
		res.friend = await Friend.create({ user: req.user })

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateFriend(req, res, next) {
	try {
		let friend = await Friend.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			friend[key] = req.body[key]
		})
		await friend.save()
		res.friend = friend

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteFriend(req, res, next) {
	try {
		const friend = await Friend.findById(req.params.id)

		await friend.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
