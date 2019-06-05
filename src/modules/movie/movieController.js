/* eslint-disable no-unused-vars */
import Movie from './movieModel'
import User from '../user/userModel'
import FollowMovie from '../followMovie/followMovieModel.js'
import HTTPStatus from 'http-status'
import defaultMovies from '../../initData/movies'
import { log } from '../../utils/helper'
import mongoose, { Schema } from 'mongoose'
var movieSchema = mongoose.model('Movie').schema

/**
 * @group movies - Operations about movies
 *
 */

export async function searchMovies(req, res, next) {
	try {
		res.movies = await Movie.find(
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

export async function initMovies(req, res, next) {
	try {
		await Movie.deleteMany()
		await Movie.insertMany(defaultMovies)
		res.movies = defaultMovies

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSuggestMovies(req, res, next) {
	try {
		let suggests = [
			{ viewsCount: 'desc' },
			{ likesCount: 'desc' },
			{ favoritesCount: 'desc' },
			{ ratesAvg: 'desc' },
			{ ratesCount: 'desc' }
		]
		let sort = suggests[Math.floor(Math.random() * suggests.length)]

		let { docs, ...pagination } = await Movie.paginate(
			{ ...req.parsedParams.filters, share: 'public' },
			{ ...req.parsedParams, sort: sort }
		)

		res.movies = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getFollowerMovies(req, res, next) {
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

export async function getMoviesStats(req, res, next) {
	try {
		res.moviesStats = {
			count: await Movie.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovies(req, res, next) {
	try {
		let { docs, ...pagination } = await Movie.paginate(
			{ ...req.parsedParams.filters, share: 'public' },
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

export async function getMovieById(req, res, next) {
	try {
		res.movie = await Movie.incViewsCount(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createMovie(req, res, next) {
	try {
		res.movie = await Movie.create({
			...req.body,
			uploader: req.user._id || ''
		})
		User.incUploadedCount(req.user._id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateMovieByVoiceover(req, res, next) {
	// had res.voiceover
	try {
		let movie = await Movie.findById(res.voiceover.movie)

		if (
			movie.voiceovers &&
			movie.voiceovers[movie.voiceovers.lenght - 1] === res.voiceover._id &&
			res.voiceover.status === 'done' &&
			res.voiceover.embedUrl
		) {
			movie.status = 'done'
		}

		await movie.save()
		res.movie = req.movie

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateMovie(req, res, next) {
	try {
		let movie = await Movie.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			movie[key] = req.body[key]
		})
		await movie.save()
		res.movie = movie

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteMovie(req, res, next) {
	try {
		let movie = await Movie.findById(req.params.id)
		if (!movie) {
			next()
		}

		if (
			String(movie.uploader._id) === String(req.user._id) ||
			req.user.role == 'admin'
		) {
			await movie.remove()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
