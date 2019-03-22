import Sample from './sampleModel.js'
import HTTPStatus from 'http-status'
import * as util from './sampleUtil'

/**
 * @group samples - Operations about samples
 *
 */

export async function getSampleStats(req, res, next) {
	try {
		res.stats = {
			count: Sample.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSamples(req, res, next) {
	const limit = parseInt(req.query.limit, 0)
	const skip = parseInt(req.query.skip, 0)
	try {
		const samples = await Sample.find({
			limit,
			skip,
			...req.query
		})

		return res.status(HTTPStatus.OK).json(samples)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSampleById(req, res, next) {
	try {
		const sample = await Sample.findById(
			req.params.id
		).populate('user')

		return res.status(HTTPStatus.OK).json(sample)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createSample(req, res, next) {
	try {
		const sample = await Sample.create(
			req.body,
			req.user._id
		)

		return res.status(HTTPStatus.CREATED).json(sample)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateSample(req, res, next) {
	try {
		const sample = await Sample.findById(req.params.id)

		// util.isOwn(sample, req, res, next)

		Object.keys(req.body).forEach(key => {
			sample[key] = req.body[key]
		})

		return res
			.status(HTTPStatus.OK)
			.json(await sample.save())
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteSample(req, res, next) {
	try {
		const sample = await Sample.findById(req.params.id)

		// util.isOwn(sample, req, res, next)

		await sample.remove()

		return res.sendStatus(HTTPStatus.OK)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
