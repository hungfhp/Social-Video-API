import Director from './directorModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './directorUtil'
import defaultDirectors from '../../initData/directors'
import { log } from '../../utils/helper'

/**
 * @group directors - Operations about directors
 *
 */

export async function initDirectors(req, res, next) {
	try {
		await Director.deleteMany()
		await Director.insertMany(defaultDirectors)
		res.directors = defaultDirectors

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getDirectorsStats(req, res, next) {
	try {
		res.directorsStats = {
			count: await Director.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getDirectors(req, res, next) {
	try {
		let { docs, ...pagination } = await Director.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

		res.directors = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getDirectorById(req, res, next) {
	try {
		res.director = await Director.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createDirector(req, res, next) {
	try {
		res.director = await Director.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateDirector(req, res, next) {
	try {
		let director = await Director.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			director[key] = req.body[key]
		})
		await director.save()
		res.director = director

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteDirector(req, res, next) {
	try {
		const director = await Director.findById(req.params.id)

		await director.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
