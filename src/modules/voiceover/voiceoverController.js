/* eslint-disable no-unused-vars */
import Voiceover from './voiceoverModel.js'
import HTTPStatus from 'http-status'

/**
 * @group voiceovers - Operations about voiceovers
 *
 */

export async function getVoiceoversStats(req, res, next) {
	try {
		res.voiceoversStats = {
			count: await Voiceover.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceovers(req, res, next) {
	const limit = parseInt(req.query.limit, 0)
	const skip = parseInt(req.query.skip, 0)

	try {
		res.voiceovers = await Voiceover.find({
			// limit,
			// skip,
			...req.query
		})

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceoverById(req, res, next) {
	try {
		res.voiceover = await Voiceover.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createVoiceover(req, res, next) {
	try {
		res.voiceover = await Voiceover.create(req.body)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateVoiceover(req, res, next) {
	try {
		let voiceover = await Voiceover.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			voiceover[key] = req.body[key]
		})
		await voiceover.save()
		res.voiceover = voiceover

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteVoiceover(req, res, next) {
	try {
		const voiceover = await Voiceover.findById(req.params.id)

		await voiceover.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
