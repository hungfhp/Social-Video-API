import Rate from './rateModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './rateUtil'
import { log } from '../../utils/helper'

/**
 * @group rates - Operations about rates
 *
 */

export async function getRatesStats(req, res, next) {
	try {
		res.ratesStats = {
			count: await Rate.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRates(req, res, next) {
	try {
		let { docs, ...pagination } = await Rate.paginate({}, req.parsedParams)

		res.rates = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRateById(req, res, next) {
	try {
		res.rate = await Rate.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createRate(req, res, next) {
	try {
		res.rate = await Rate.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateRate(req, res, next) {
	try {
		let rate = await Rate.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			rate[key] = req.body[key]
		})
		await rate.save()
		res.rate = rate

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteRate(req, res, next) {
	try {
		const rate = await Rate.findById(req.params.id)

		await rate.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
