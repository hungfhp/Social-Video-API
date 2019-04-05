/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as voiceoverController from './voiceoverController'
import voiceoverValidation from './voiceoverValidation'

const router = new Router()

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

//  Default router
router
	.get(
		'/stats',
		validate(voiceoverValidation.stats),
		voiceoverController.getVoiceoversStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				voiceoversStats: res.voiceoversStats
			})
		}
	)
	.get(
		'/',
		validate(voiceoverValidation.index),
		voiceoverController.getVoiceoversStats,
		voiceoverController.getVoiceovers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				voiceovers: res.voiceovers,
				voiceoversStats: res.voiceoversStats
			})
		}
	)
	.get(
		'/:id',
		validate(voiceoverValidation.show),
		voiceoverController.getVoiceoverById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				voiceover: res.voiceover
			})
		}
	)
	.post(
		'/',
		validate(voiceoverValidation.create),
		voiceoverController.createVoiceover,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				voiceover: res.voiceover
			})
		}
	)
	.put(
		'/:id',
		validate(voiceoverValidation.update),
		voiceoverController.updateVoiceover,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				voiceover: res.voiceover
			})
		}
	)
	.delete(
		'/:id',
		validate(voiceoverValidation.delete),
		voiceoverController.deleteVoiceover,
		function(req, res, next) {
		return res.sendStatus(HTTPStatus.OK)
		}
	)

// More router

export default router
