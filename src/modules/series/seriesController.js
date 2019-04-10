import Series from './seriesModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './seriesUtil'

/**
 * @group serieses - Operations about serieses
 *
 */

export async function getSeriesesStats(req, res, next) {
	try {
		res.seriesesStats = {
			count: await Series.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSerieses(req, res, next) {
	try {
		let { docs, ...seriesesMeta } = await Series.paginate({}, req.parsedParams)

		res.serieses = docs
		res.seriesesMeta = seriesesMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSeriesById(req, res, next) {
	try {
		res.series = await Series.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createSeries(req, res, next) {
	try {
		res.series = await Series.create(req.body)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateSeries(req, res, next) {
	try {
		let series = await Series.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			series[key] = req.body[key]
		})
		await series.save()
		res.series = series

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteSeries(req, res, next) {
	try {
		const series = await Series.findById(req.params.id)

		await series.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
