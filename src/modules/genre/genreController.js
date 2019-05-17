import Genre from './genreModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './genreUtil'
import { log } from '../../utils/helper'
import defaultGenres from '../../initData/genres'

/**
 * @group genres - Operations about genres
 *
 */

export async function initGenres(req, res, next) {
	try {
		await Genre.deleteMany()
		await Genre.insertMany(defaultGenres)
		res.genres = defaultGenres

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGenresStats(req, res, next) {
	try {
		res.genresStats = {
			count: await Genre.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGenres(req, res, next) {
	try {
		let { docs, ...pagination } = await Genre.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

		res.genres = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getGenreById(req, res, next) {
	try {
		res.genre = await Genre.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createGenre(req, res, next) {
	try {
		res.genre = await Genre.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateGenre(req, res, next) {
	try {
		let genre = await Genre.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			genre[key] = req.body[key]
		})
		await genre.save()
		res.genre = genre

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteGenre(req, res, next) {
	try {
		const genre = await Genre.findById(req.params.id)

		await genre.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
