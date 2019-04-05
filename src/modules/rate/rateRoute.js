/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as rateController from './rateController'
import rateValidation from './rateValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getRatesStats
 * GET /items => getRates
 * GET /items/:id => getRateById
 * POST /items/ => createRate
 * PATCH/PUT /items/:id => updateRate
 * DELETE /items/:id => deleteRate
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(rateValidation.stats),
		rateController.getRatesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				ratesStats: res.ratesStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(rateValidation.index),
		rateController.getRates,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				rates: res.rates,
				ratesMeta: res.ratesMeta
			})
		}
	)
	.get(
		'/:id',
		validate(rateValidation.show),
		rateController.getRateById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				rate: res.rate
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(rateValidation.create),
		rateController.createRate,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				rate: res.rate
			})
		}
	)
	.put(
		'/:id',
		validate(rateValidation.update),
		rateController.updateRate,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				rate: res.rate
			})
		}
	)
	.delete(
		'/:id',
		validate(rateValidation.delete),
		rateController.deleteRate,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
