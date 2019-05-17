import Country from './countryModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './countryUtil'
import defaultCountries from '../../initData/countries'
import { log } from '../../utils/helper'

/**
 * @group countries - Operations about countries
 *
 */

export async function initCountries(req, res, next) {
	try {
		await Country.deleteMany()
		await Country.insertMany(defaultCountries)
		res.countries = defaultCountries

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getCountriesStats(req, res, next) {
	try {
		res.countriesStats = {
			count: await Country.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getCountries(req, res, next) {
	try {
		let { docs, ...pagination } = await Country.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

		res.countries = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getCountryById(req, res, next) {
	try {
		res.country = await Country.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createCountry(req, res, next) {
	try {
		res.country = await Country.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateCountry(req, res, next) {
	try {
		let country = await Country.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			country[key] = req.body[key]
		})
		await country.save()
		res.country = country

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteCountry(req, res, next) {
	try {
		const country = await Country.findById(req.params.id)

		await country.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
