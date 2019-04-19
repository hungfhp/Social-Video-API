/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as seriesController from './seriesController'
import seriesValidation from './seriesValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getSeriesesStats
 * GET /items => getSerieses
 * GET /items/:id => getSeriesById
 * POST /items/ => createSeries
 * PATCH/PUT /items/:id => updateSeries
 * DELETE /items/:id => deleteSeries
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(seriesValidation.stats),
		seriesController.getSeriesesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				seriesesStats: res.seriesesStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(seriesValidation.index),
		seriesController.getSerieses,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				serieses: res.serieses,
				seriesesMeta: res.seriesesMeta
			})
		}
	)
	.get(
		'/:id',
		validate(seriesValidation.show),
		seriesController.getSeriesById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				series: res.series
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(seriesValidation.create),
		seriesController.createSeries,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				series: res.series
			})
		}
	)
	.put(
		'/:id',
		validate(seriesValidation.update),
		seriesController.updateSeries,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				series: res.series
			})
		}
	)
	.delete(
		'/:id',
		validate(seriesValidation.delete),
		seriesController.deleteSeries,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
