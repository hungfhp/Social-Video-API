/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as voiceoverController from './voiceoverController'
import voiceoverValidation from './voiceoverValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import * as ownMiddleware from '../../middlewares/ownMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import * as synthesisService from '../../services/synthesisService'

const router = new Router()

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

// More router
router
	.get(
		'/check/:requestId',
		validate(voiceoverValidation.checkSynthesis),
		voiceoverController.checkSynthesis,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
			})
		}
	)
	.get(
		'/rerequest/:requestId',
		validate(voiceoverValidation.checkSynthesis),
		voiceoverController.reSynthesis,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
			})
		}
	)
	.post(
		'/callback',
		// accessControl('createOwn', 'voiceover'),
		// validate(voiceoverValidation.callbackSynthesis),
		voiceoverController.callbackSynthesis,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
			})
		}
	)

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
		paramMiddleware.parseParamList,
		voiceoverController.getVoiceovers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceovers,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(voiceoverValidation.show),
		voiceoverController.getVoiceoverById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
			})
		}
	)
	.post(
		'/',
		validate(voiceoverValidation.create),
		voiceoverController.createVoiceover,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
			})
		}
	)
	.put(
		'/:id',
		validate(voiceoverValidation.update),
		voiceoverController.updateVoiceover,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.voiceover
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

export default router
