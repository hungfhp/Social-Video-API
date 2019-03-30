/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as sampleController from './sampleController'
import sampleValidation from './sampleValidation'

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
		validate(sampleValidation.index),
		sampleController.getSamplesStats,
		sampleController.getSamples,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				samples: res.samples,
				samplesStats: res.samplesStats
			})
		}
	)
	.get('/:id', validate(sampleValidation.show), sampleController.getSampleById, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			sample: res.sample
		})
	})
	.post('/', validate(sampleValidation.create), sampleController.createSample, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			sample: res.sample
		})
	})
	.put('/:id', validate(sampleValidation.update), sampleController.updateSample, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			sample: res.sample
		})
	})
	.delete(
		'/:id',
		validate(sampleValidation.delete),
		sampleController.deleteSample,
		function(req, res, next) {
			return res.status(HTTPStatus.OK)
		}
	)

// More router

export default router
