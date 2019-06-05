/* eslint-disable no-console */
import axios from 'axios'
// import HTTPStatus from 'http-status'
import Movie from '../modules/movie/movieModel.js'
import Voiceover from '../modules/voiceover/voiceoverModel.js'
import * as fileService from './fileService'
import { log } from '../utils/helper'

export async function requestSynthesis(
	subtitle_url,
	voice = 'hn_male_xuantin_vdts_48k-hsmm'
) {
	let url = 'http://api-thuyetminhphim.vbee.vn/synthesis'
	let callback = 'http://api-social.thuyetminhphim.com/api/voiceovers/callback'
	return await axios
		.get(url, {
			params: { callback, subtitle_url, voice }
		})
		.then(function(response) {
			return response.data
		})
		.catch(function(e) {
			console.log('error', e)
			throw e
		})
}

export async function requestResynthesis(requestId) {
	return await axios
		.get('http://api-thuyetminhphim.vbee.vn/resynthesis', {
			params: {
				request_id: requestId
			}
		})
		.then(function(response) {
			return response.data
		})
		.catch(function(e) {
			console.log('error', e)
			throw e
		})
}

export async function checkSynthesis(requestId) {
	return await axios
		.get('http://api-thuyetminhphim.vbee.vn/check', {
			params: {
				request_id: requestId
			}
		})
		.then(function(response) {
			return response.data
		})
		.catch(function(e) {
			// eslint-disable-next-line no-console
			console.log('error', e)
			throw e
		})
}

export async function callbackSynthesis(requestId) {
	let synthesised = await checkSynthesis(requestId)
	let voiceover = await Voiceover.findOne({
		requestId: synthesised.requestId
	})
	if (!voiceover) {
		console.log(synthesised)
		return { vbee: synthesised }
	}

	if (
		voiceover.status &&
		voiceover.status !== 'done' &&
		synthesised &&
		synthesised.status == 'done'
	) {
		voiceover = Object.assign(voiceover, synthesised)
		await fileService.uploadFileByUrl(
			'/voiceovers',
			'true',
			synthesised.downloadUrl,
			async function(uploadedFile) {
				voiceover.embedUrl = uploadedFile.url
				voiceover.save()

				Movie.findByIdAndUpdate(voiceover.movie, {
					status: synthesised.status,
					voiceoverUrl: uploadedFile.url
				})

				log(JSON.stringify(voiceover), 'voiceover-callback.log')
				return voiceover
			}
		)
	}
	// voiceover.fileFormat = synthesised.fileFormat
	// voiceover.downloadUrl = synthesised.downloadUrl
	// voiceover.status = synthesised.status
}
