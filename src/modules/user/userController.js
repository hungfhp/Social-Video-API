import User from './userModel'
import Movie from '../movie/movieModel'
import Group from '../group/groupModel'
import Like from '../like/likeModel'
import FollowMovie from '../followMovie/followMovieModel'
import FollowUser from '../followUser/followUserModel'
import Member from '../member/memberModel'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './userUtil'
import { log } from '../../utils/helper'
import * as authService from '../../services/authService'
import { genderToNumber } from '../../utils/helper'

/**
 * @group users - Operations about users
 *
 */
export async function getMoviesOwn(req, res, next) {
	try {
		let { docs, ...pagination } = await Movie.paginate(
			{ uploader: req.params.id },
			req.parsedParams
		)
		res.movies = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMoviesLiked(req, res, next) {
	try {
		let { docs, ...pagination } = await Like.paginate(
			{ user: req.params.id },
			req.parsedParams
		)

		res.movies = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMoviesFollowed(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowMovie.paginate(
			{ user: req.params.id },
			{
				...req.parsedParams,
				populate: [
					{
						path: 'movie',
						model: 'Movie'
					}
				]
			}
		)

		res.movies = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGroupsOwn(req, res, next) {
	try {
		let { docs, ...pagination } = await Group.paginate(
			{ creator: req.params.id },
			req.parsedParams
		)

		res.groups = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGroupsStatus(req, res, next) {
	try {
		let { docs, ...pagination } = await Member.paginate(
			{ user: req.params.id, status: req.params.status },
			req.parsedParams
		)

		res.groups = docs
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
			{ follow: req.params.id },
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

export async function getFollowed(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowUser.paginate(
			{ user: req.params.id },
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

		res.followed = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getUsersStats(req, res, next) {
	try {
		res.usersStats = {
			count: await User.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getUsers(req, res, next) {
	try {
		let { docs, ...pagination } = await User.paginate({}, req.parsedParams)

		res.users = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getUserById(req, res, next) {
	try {
		res.user = await User.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createUser(req, res, next) {
	try {
		const user = await User.create({ ...req.body, provider: 'local' })
		res.user = user.toAuthJSON()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
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
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id)

		await user.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export function localLogin(req, res, next) {
	res.user = req.user.toAuthJSON()
	return next()
}

export async function fbLogin(req, res, next) {
	// req.user is inited
	try {
		const fbAuthUser = await authService.authFacebook(req.body.accessToken)

		if (!fbAuthUser.user_id) {
			log(JSON.stringify(fbAuthUser.error), 'error-response.log')
			return res.status(HTTPStatus.BAD_REQUEST).json(fbAuthUser.error)
		}
		const profile = { ...req.body, ...fbAuthUser }
		res.user = await User.findOne({
			provider: 'facebook',
			'social.id': profile.user_id
		})

		if (res.user) {
			next()
		} else {
			let newUser =
				(await User.findOne({
					email: profile.name
				})) || new User()
			newUser.provider = 'facebook'
			newUser.social = { id: profile.user_id, accessToken: profile.accessToken }
			newUser.name = profile.name
			newUser.email = profile.email
			newUser.gender = genderToNumber(profile.gender)
			if (profile.picture && profile.picture.data && profile.picture.data.url) {
				newUser.avatarUrl = profile.picture.data.url
			}

			newUser = await newUser.save()
			res.user = newUser.toAuthJSON()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
