/* eslint-disable no-unused-vars */
import Voiceover from './voiceoverModel.js'
import HTTPStatus from 'http-status'
import * as synthesisService from '../../services/synthesisService'
import * as fileService from '../../services/fileService'
import { log } from '../../utils/helper'
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
		res.voiceover = await Voiceover.create({
			...req.body,
			uploader: req.user._id || ''
		})

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

export async function checkSynthesis(req, res, next) {
	try {
		let voiceoverChecked = await synthesisService.checkSynthesis(
			req.query.requestId
		)

		let voiceover = await Voiceover.find({
			requestId: voiceoverChecked.requestId
		})

		if (
			voiceover.status !== 'done' &&
			voiceoverChecked &&
			voiceoverChecked.status == 'done'
		) {
			voiceover = Object.assign(voiceover, voiceoverChecked)
			await voiceover.save()
			res.voiceover = voiceover
		} else {
			res.voiceover = voiceoverChecked
		}

		let file = await fileService.uploadFile(
			'test',
			false,
			'https://i.vimeocdn.com/portrait/25122243_300x300'
		)
		console.log(file)
		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function callbackSynthesis(req, res, next) {
	try {
		log(JSON.stringify(req.body), 'voiceover-callback.log')

		let voiceoverChecked = req.body

		let file = await fileService.uploadFile(
			'test',
			false,
			voiceoverChecked.downloadUrl
			// 'https://i.vimeocdn.com/portrait/25122243_300x300'
		)

		let voiceover = await Voiceover.find({
			requestId: req.body.requestId
		})
		voiceover.fileFormat = voiceoverChecked.fileFormat
		voiceover.embedUrl = file.url

		await voiceover.save()
		res.voiceover = voiceover

		log(JSON.stringify(file))
		log('--', 'voiceover-callback.log')

		next()
	} catch (e) {
		console.log(e)
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
