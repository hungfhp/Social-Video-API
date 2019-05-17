/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as recommendController from './recommendController'
import recommendValidation from './recommendValidation'
import * as paramService from '../../services/paramService'
import { accessControl } from '../../middlewares/roleMiddleware'

const router = new Router()

/**
 * GET /items/stats => getRecommendsStats
 * GET /items => getRecommends
 * GET /items/:id => getRecommendById
 * POST /items/ => createRecommend
 * PATCH/PUT /items/:id => updateRecommend
 * DELETE /items/:id => deleteRecommend
 */

// More router
router
	.post(
		'/add-history',
		accessControl('createOwn', 'recommend'),
		validate(recommendValidation.stats),
		recommendController.addHistory,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: 'OK'
			})
		}
	)
	.get(
		'/movies',
		accessControl('readOwn', 'recommend'),
		paramService.parseParam,
		validate(recommendValidation.index),
		recommendController.getRecommendsForUser,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.recommends,
				pagination: res.pagination
			})
		}
	)

// Default Rest router
router
	.get(
		'/',
		accessControl('readAny', 'recommend'),
		paramService.parseParam,
		validate(recommendValidation.index),
		recommendController.getRecommends,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.recommends,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(recommendValidation.show),
		recommendController.getRecommendById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.recommend
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'recommend'),
		validate(recommendValidation.create),
		recommendController.createRecommend,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.recommend
			})
		}
	)
	.put(
		'/:id',
		accessControl('updateOwn', 'recommend'),
		validate(recommendValidation.update),
		recommendController.updateRecommend,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.recommend
			})
		}
	)
	.delete(
		'/:id',
		accessControl('deleteOwn', 'recommend'),
		validate(recommendValidation.delete),
		recommendController.deleteRecommend,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
