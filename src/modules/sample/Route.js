/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as sampleController from './sampleController'
import sampleValidation from './sampleValidation'
import * as paramService from '../../services/paramService'
import { accessControl } from '../../middlewares/roleMiddleware'

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
				data: res.samplesStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'movie'),
		paramService.parseParam,
		validate(sampleValidation.index),
		sampleController.getSamples,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.samples,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(sampleValidation.show),
		sampleController.getSampleById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.sample
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'movie'),
		validate(sampleValidation.create),
		sampleController.createSample,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.sample
			})
		}
	)
	.put(
		'/:id',
		accessControl('updateOwn', 'movie'),
		validate(sampleValidation.update),
		sampleController.updateSample,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.sample
			})
		}
	)
	.delete(
		'/:id',
		accessControl('deleteOwn', 'movie'),
		validate(sampleValidation.delete),
		sampleController.deleteSample,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
