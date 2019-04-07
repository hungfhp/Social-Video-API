/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as likeController from './likeController'
import likeValidation from './likeValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getLikesStats
 * GET /items => getLikes
 * GET /items/:id => getLikeById
 * POST /items/ => createLike
 * PATCH/PUT /items/:id => updateLike
 * DELETE /items/:id => deleteLike
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(likeValidation.stats),
		likeController.getLikesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				likesStats: res.likesStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(likeValidation.index),
		likeController.getLikes,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				likes: res.likes,
				likesMeta: res.likesMeta
			})
		}
	)
	.get(
		'/:id',
		validate(likeValidation.show),
		likeController.getLikeById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				like: res.like
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(likeValidation.create),
		likeController.createLike,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				like: res.like
			})
		}
	)
	.put(
		'/:id',
		validate(likeValidation.update),
		likeController.updateLike,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				like: res.like
			})
		}
	)
	.delete(
		'/:id',
		validate(likeValidation.delete),
		likeController.deleteLike,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
