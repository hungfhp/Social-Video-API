/* eslint-disable no-unused-vars */
import Movie from './movieModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './movieUtil'

/**
 * @group movies - Operations about movies
 *
 */

export async function getMoviesStats(req, res, next) {
	try {
		res.moviesStats = {
			count: await Movie.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovies(req, res, next) {
	// const limit = parseInt(req.query.limit, 0)
	// const skip = parseInt(req.query.skip, 0)

	try {
		res.movies = await Movie.find({
			// limit,
			// skip,
			...req.query
		})

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovieById(req, res, next) {
	try {
		res.movie = await Movie.findById(req.params.id).populate('uploader')

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createMovie(req, res, next) {
	try {
		res.movie = await Movie.create({
			...req.body,
			uploader: req.user._id || ''
		})
		console.log(req.body)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateMovie(req, res, next) {
	try {
		let movie = await Movie.findById(req.params.id)
		// util.isOwn(movie, req, res, next)

		Object.keys(req.body).forEach(key => {
			movie[key] = req.body[key]
		})
		await movie.save()
		res.movie = movie

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteMovie(req, res, next) {
	try {
		const movie = await Movie.findById(req.params.id)

		// util.isOwn(movie, req, res, next)

		await movie.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
