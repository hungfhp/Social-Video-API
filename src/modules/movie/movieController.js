/* eslint-disable no-unused-vars */
import Movie from './movieModel'
import HTTPStatus from 'http-status'

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
	try {
		let { docs, ...moviesMeta } = await Movie.paginate({}, req.parsedParams)

		res.movies = docs
		res.moviesMeta = moviesMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovieById(req, res, next) {
	try {
		res.movie = await Movie.findById(req.params.id)

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

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateMovie(req, res, next) {
	try {
		Object.keys(req.body).forEach(key => {
			req.movie[key] = req.body[key]
		})
		await req.movie.save()
		res.movie = req.movie

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteMovie(req, res, next) {
	try {
		await Movie.findOneAndDelete(req.movie._id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
