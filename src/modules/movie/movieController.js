/* eslint-disable no-unused-vars */
import Movie from './movieModel'
import HTTPStatus from 'http-status'
import defaultMovies from '../../initData/movies'

/**
 * @group movies - Operations about movies
 *
 */

export async function initMovies(req, res, next) {
	try {
		await Movie.deleteMany()
		await Movie.insertMany(defaultMovies)
		res.movies = defaultMovies

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getOwnMovies(req, res, next) {
	try {
		// let { docs, ...moviesMeta } = await Movie.paginate(
		// 	{ uploader: req.user._id },
		// 	req.parsedParams
		// )
		let { docs, ...moviesMeta } = await Movie.paginate({}, req.parsedParams)

		res.movies = docs
		res.moviesMeta = moviesMeta

		next()
	} catch (e) {
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
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovies(req, res, next) {
	try {
		let { docs, ...moviesMeta } = await Movie.paginate(
			{ share: 'public' },
			req.parsedParams
		)

		res.movies = docs
		res.moviesMeta = moviesMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getMovieById(req, res, next) {
	try {
		res.movie = await Movie.incViewsCount(req.params.id)

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
