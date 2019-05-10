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

		let file = await fileService.uploadFileByUrl(
			'test',
			false,
			'https://i.vimeocdn.com/portrait/25122243_300x300'
		)
		// console.log(file)
		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function uploadVoiceover(req, res, next) {
	try {
		var form = new multiparty.Form()

		// await form.parse(req, async function(err, fields, files) {
		// 	// 	res.writeHead(200, { 'content-type': 'text/plain' })
		// 	// 	res.write('received upload:\n\n')
		// 	// 	res.end(util.inspect({ fields: fields, files: files }))
		// 	console.log(files.file)
		// await request.post(
		// 	{
		// 		url: 'https://upload.vbee.vn/api/v1/upload/file',
		// 		headers: {
		// 			authorization: cons.UPLOAD_VBEE_TOKEN
		// 		},
		// 		formData: {
		// 			path: '/test',
		// 			overwrite: 'false',
		// 			file: request(
		// 				'https://raw.githubusercontent.com/svenhornberg/pipeupload/master/LICENSE'
		// 			)
		// 		}
		// 	},
		// 	(error, response, body) => {
		// 		console.error('error:', error) // Print the error if one occurred
		// 		console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
		// 		console.log('body:', body) // Prin
		// 		res.file = JSON.parse(body)
		// 		next()
		// 	}
		// )
		// fileService.uploadFileByUrl(
		// 	'test',
		// 	'false',
		// 	'https://raw.githubusercontent.com/svenhornberg/pipeupload/master/LICENSE',
		// 	function(uploadedFile) {
		// 		console.log(uploadedFile)
		// 	}
		// )
		// console.log('object')

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
		if (res.movie.subUrl) {
			let requestSysthesis = await systhesisService.requestSynthesis(
				res.movie.subUrl,
				null
			)

			let vc = await Voiceover.create({
				requestId: requestSysthesis.requestId,
				movie: res.movie._id,
				uploader: req.user || ''
			})
		}
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
