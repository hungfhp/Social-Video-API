/* eslint-disable no-unused-vars */
import Voiceover from './voiceoverModel.js'
import Movie from '../movie/movieModel.js'
import HTTPStatus from 'http-status'
import * as synthesisService from '../../services/synthesisService'
import * as fileService from '../../services/fileService'
import cons from '../../config/constants'
import { log } from '../../utils/helper'
import request from 'request'
import fs from 'fs'
import multiparty from 'multiparty'
import util from 'util'
import * as systhesisService from '../../services/synthesisService'

/**
 * @group voiceovers - Operations about voiceovers
 *
 */

export async function checkSynthesis(req, res, next) {
	try {
		let voiceoverChecked = await synthesisService.checkSynthesis(
			req.params.requestId
		)

		let voiceover = await Voiceover.findOne({
			requestId: voiceoverChecked.requestId
		})
		voiceover = (voiceover && voiceover._doc) || {}

		if (
			voiceover.status &&
			voiceover.status !== 'done' &&
			voiceoverChecked &&
			voiceoverChecked.status == 'done'
		) {
			voiceover = Object.assign(voiceover, voiceoverChecked)
			await fileService.uploadFileByUrl(
				'/voiceovers',
				'true',
				voiceoverChecked.downloadUrl,
				async uploadedFile => {
					voiceover.embedUrl = uploadedFile.url
					await voiceover.save()
					res.voiceover = { ...voiceover, vbee: voiceoverChecked }
				}
			)
		} else {
			res.voiceover = { ...voiceover, vbee: voiceoverChecked }
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function reSynthesis(req, res, next) {
	try {
		let vbee = await synthesisService.requestResynthesis(req.params.requestId)

		const hour = 60 * 60 * 1000
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 1 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 2 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 3 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 4 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 6 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(req.params.requestId)
		}, 8 * hour)

		let voiceover = await Voiceover.findOne({
			requestId: req.params.requestId
		})
		voiceover = (voiceover && voiceover._doc) || {}

		res.voiceover = { ...voiceover, vbee: vbee }
		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function callbackSynthesis(req, res, next) {
	try {
		log(JSON.stringify(req.body), 'voiceover-callback.log')
		let synthesised = req.body

		let voiceover = await Voiceover.findOne({
			requestId: synthesised.requestId
		})
		if (!voiceover) {
			next()
		}
		voiceover.fileFormat = synthesised.fileFormat
		voiceover.downloadUrl = synthesised.downloadUrl
		voiceover.status = synthesised.status

		fileService.uploadFileByUrl(
			'/voiceovers',
			'false',
			synthesised.downloadUrl,
			async function(uploadedFile) {
				voiceover.embedUrl = uploadedFile.url
				voiceover.save()
				res.voiceover = voiceover

				let movie = await Movie.findByIdAndUpdate(voiceover.movie, {
					status: synthesised.status,
					voiceoverUrl: uploadedFile.url
				})

				log(JSON.stringify(uploadedFile), 'voiceover-callback.log')
			}
		)

		next()
	} catch (e) {
		log(JSON.stringify(req.body), 'voiceover-callback.log')
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceoversStats(req, res, next) {
	try {
		res.voiceoversStats = {
			count: await Voiceover.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceoversByMovie(req, res, next) {
	try {
		res.voiceovers = await Voiceover.find({ movie: res.movie })

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceovers(req, res, next) {
	try {
		let { docs, ...pagination } = await Voiceover.paginate(
			{ ...req.parsedParams.filters },
			{ ...req.parsedParams }
		)

		res.voiceovers = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getVoiceoverById(req, res, next) {
	try {
		res.voiceover = await Voiceover.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createVoiceover(req, res, next) {
	try {
		const movie = await Movie.findById(req.body.movieId)
		let requestSysthesis = await systhesisService.requestSynthesis(
			movie.subUrl,
			req.body.voice || 'hn_male_xuantin_vdts_48k-hsmm'
		)

		const hour = 60 * 60 * 1000
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 1 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 2 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 3 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 4 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 6 * hour)
		setTimeout(function() {
			systhesisService.callbackSynthesis(requestSysthesis.requestId)
		}, 8 * hour)

		res.voiceover = await Voiceover.create({
			requestId: requestSysthesis.requestId,
			movie,
			uploader: req.user || '',
			name: req.body.name
		})
		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
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
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteVoiceover(req, res, next) {
	try {
		const voiceover = await Voiceover.findById(req.params.id)

		await voiceover.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
