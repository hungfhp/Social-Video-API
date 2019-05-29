/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as likeController from './likeController'
import likeValidation from './likeValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import { existLike } from '../../middlewares/existMiddleware'
import * as recommendController from '../recommend/recommendController'

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
		validate(likeValidation.index),
		paramMiddleware.parseParamList,
		likeController.getLikes,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.likes,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(likeValidation.show),
		likeController.getLikeById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.like
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'like'),
		validate(likeValidation.create),
    existLike,
		likeController.createLike,
		function(req, res, next) {
      req.body.movieId = res.like && res.like.movie
      req.body.score = 4
      next()
    },
    recommendController.addHistory,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.like
			})
		}
	)
	.put(
		'/:id',
		validate(likeValidation.update),
		likeController.updateLike,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.like
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
