/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as followController from './followController'
import followValidation from './followValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getFollowsStats
 * GET /items => getFollows
 * GET /items/:id => getFollowById
 * POST /items/ => createFollow
 * PATCH/PUT /items/:id => updateFollow
 * DELETE /items/:id => deleteFollow
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(followValidation.stats),
		followController.getFollowsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				followsStats: res.followsStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(followValidation.index),
		followController.getFollows,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				follows: res.follows,
				followsMeta: res.followsMeta
			})
		}
	)
	.get(
		'/:id',
		validate(followValidation.show),
		followController.getFollowById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				follow: res.follow
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(followValidation.create),
		followController.createFollow,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				follow: res.follow
			})
		}
	)
	.put(
		'/:id',
		validate(followValidation.update),
		followController.updateFollow,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				follow: res.follow
			})
		}
	)
	.delete(
		'/:id',
		validate(followValidation.delete),
		followController.deleteFollow,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
