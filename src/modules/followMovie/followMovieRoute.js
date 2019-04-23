/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as followMovieController from './followMovieController'
import followMovieValidation from './followMovieValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import { existFollowMovie } from '../../middlewares/existMiddleware'

const router = new Router()

/**
 * GET /items/stats => getFollowMoviesStats
 * GET /items => getFollowMovies
 * GET /items/:id => getFollowMovieById
 * POST /items/ => createFollowMovie
 * PATCH/PUT /items/:id => updateFollowMovie
 * DELETE /items/:id => deleteFollowMovie
 */

// More router
router
	.get(
		'/following/:id',
		validate(followMovieValidation.following),
		paramMiddleware.parseParamList,
		followMovieController.getFollowing,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.following,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/followers/:id',
		validate(followMovieValidation.followers),
		paramMiddleware.parseParamList,
		followMovieController.getFollowers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followers,
				pagination: res.pagination
			})
		}
	)

// Default Rest router
router
	.get(
		'/stats',
		validate(followMovieValidation.stats),
		followMovieController.getFollowMoviesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				followMoviesStats: res.followMoviesStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'followMovie'),
		paramMiddleware.parseParamList,
		validate(followMovieValidation.index),
		followMovieController.getFollowMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				followMovies: res.followMovies,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(followMovieValidation.show),
		followMovieController.getFollowMovieById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followMovie
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'followMovie'),
		validate(followMovieValidation.create),
		existFollowMovie,
		followMovieController.createFollowMovie,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followMovie
			})
		}
	)
	// .put(
	// 	'/:id',
	// 	accessControl('updateOwn', 'followMovie'),
	// 	validate(followMovieValidation.update),
	// 	followMovieController.updateFollowMovie,
	// 	function(req, res, next) {
	// 		return res.status(HTTPStatus.OK).json({
	// 			data: res.followMovie
	// 		})
	// 	}
	// )
	.delete(
		'/:id',
		accessControl('deleteOwn', 'followMovie'),
		validate(followMovieValidation.delete),
		followMovieController.deleteFollowMovie,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
