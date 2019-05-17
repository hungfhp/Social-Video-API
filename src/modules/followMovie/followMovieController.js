import FollowMovie from './followMovieModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './followMovieUtil'
import { log } from '../../utils/helper'

/**
 * @group followMovies - Operations about followMovies
 *
 */

export async function getFollowing(req, res, next) {
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
		let { docs, ...pagination } = await FollowMovie.paginate(
			{ ...req.parsedParams.filters, movie: req.params.id },
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

export async function getFollowMoviesStats(req, res, next) {
	try {
		res.followMoviesStats = {
			count: await FollowMovie.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowMovies(req, res, next) {
	try {
		let { docs, ...pagination } = await FollowMovie.paginate(
			{ ...req.parsedParams.filters },
			{
				...req.parsedParams,
				populate: [
					{
						path: 'user',
						model: 'User'
					},
					{
						path: 'movie',
						model: 'Movie'
					}
				]
			}
		)

		res.followMovies = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowMovieById(req, res, next) {
	try {
		res.followMovie = await FollowMovie.findById(req.params.id).populate([
			{
				path: 'user',
				model: 'User'
			},
			{
				path: 'movie',
				model: 'Movie'
			}
		])

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createFollowMovie(req, res, next) {
	try {
		res.followMovie = await FollowMovie.create({
			...req.body,
			user: req.user
		})

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateFollowMovie(req, res, next) {
	try {
		let followMovie = await FollowMovie.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			followMovie[key] = req.body[key]
		})
		await followMovie.save()
		res.followMovie = followMovie

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteFollowMovie(req, res, next) {
	try {
		const followMovie = await FollowMovie.findById(req.params.id)

		await followMovie.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
