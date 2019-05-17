import User from './userModel'
import Movie from '../movie/movieModel'
import Group from '../group/groupModel'
import Like from '../like/likeModel'
import FollowMovie from '../followMovie/followMovieModel'
import FollowUser from '../followUser/followUserModel'
import Member from '../member/memberModel'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import { log } from '../../utils/helper'
// import * as authService from '../../services/authService'
import { genderToNumber } from '../../utils/helper'

export async function searchUsers(req, res, next) {
	try {
		res.users = await User.find(
			{ $text: { $search: req.parsedParams.search } },
			{ score: { $meta: 'textScore' } }
		)
			.sort({ score: { $meta: 'textScore' } })
			.limit(req.parsedParams.limit)

		res.pagination = {
			...req.parsedParams,
			sort: 'textScore',
			total: req.parsedParams.limit
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMoviesOwn(req, res, next) {
	try {
		let { docs, ...pagination } = await Movie.paginate(
			{ ...req.parsedParams.filters, uploader: req.params.id },
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
			{ ...req.parsedParams.filters, user: req.params.id },
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
			{ ...req.parsedParams.filters, user: req.params.id },
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
			{ ...req.parsedParams.filters, creator: req.params.id },
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
			{
				...req.parsedParams.filters,
				user: req.params.id,
				status: req.params.status
			},
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

export async function getFollowed(req, res, next) {
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
		let { docs, ...pagination } = await User.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

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
		const profile = req.body
		res.user = await User.findOne({
			provider: 'facebook',
			'social.id': profile.userID
		})

		if (res.user) {
			res.user = res.user.toAuthJSON()
			next()
		} else {
			let newUser =
				(await User.findOne({
					email: profile.email
				})) || new User()
			newUser.provider = 'facebook'
			newUser.social = { id: profile.userID, accessToken: profile.accessToken }
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
