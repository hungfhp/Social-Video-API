/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as sampleController from './sampleController'
import sampleValidation from './sampleValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getSamplesStats
 * GET /items => getSamples
 * GET /items/:id => getSampleById
 * POST /items/ => createSample
 * PATCH/PUT /items/:id => updateSample
 * DELETE /items/:id => deleteSample
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(sampleValidation.stats),
		sampleController.getSamplesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				samplesStats: res.samplesStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(sampleValidation.index),
		sampleController.getSamples,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				samples: res.samples,
				samplesMeta: res.samplesMeta
			})
		}
	)
	.get(
		'/:id',
		validate(sampleValidation.show),
		sampleController.getSampleById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				sample: res.sample
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(sampleValidation.create),
		sampleController.createSample,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				sample: res.sample
			})
		}
	)
	.put(
		'/:id',
		validate(sampleValidation.update),
		sampleController.updateSample,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				sample: res.sample
			})
		}
	)
	.delete(
		'/:id',
		validate(sampleValidation.delete),
		sampleController.deleteSample,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
