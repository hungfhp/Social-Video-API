/* eslint-disable no-unused-vars */
import { Router } from 'express'
const router = new Router()
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as movieController from './movieController'
import movieValidation from './movieValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import * as ownMiddleware from '../../middlewares/ownMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import * as voiceoverController from '../voiceover/voiceoverController'

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

// More router
router
	.get(
		'/init',
		accessControl('createAny', 'movie'),
		movieController.initMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: 'OK'
			})
		}
	)
	.get(
		'/search',
		accessControl('readAny', 'movie'),
		paramMiddleware.parseParamList,
		movieController.searchMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.movies,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/suggests',
		accessControl('readAny', 'movie'),
		paramMiddleware.parseParamList,
		movieController.getSuggestMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.movies,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id/followers',
		accessControl('readOwn', 'followMovie'),
		validate(movieValidation.show),
		paramMiddleware.parseParamList,
		movieController.getFollowerMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followers,
				pagination: res.pagination
			})
		}
	)
// .get(
// 	'/upload',
// 	accessControl('createOwn', 'movie'),
// 	validate(movieValidation.upload),
// 	movieController.getFollowerMovies,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.followers,
// 			pagination: res.pagination
// 		})
// 	}
// )

//  Default router
router
	.get(
		'/stats',
		accessControl('readAny', 'movie'),
		validate(movieValidation.stats),
		movieController.getMoviesStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.moviesStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'movie'),
		validate(movieValidation.index),
		paramMiddleware.parseParamList,
		movieController.getMovies,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.movies,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		accessControl('readAny', 'movie'),
		validate(movieValidation.show),
		movieController.getMovieById,
		voiceoverController.getVoiceoversByMovie,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: { ...res.movie._doc, voiceovers: res.voiceovers }
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'movie'),
		validate(movieValidation.create),
		movieController.createMovie,
		function(req, res, next) {
			req.body.movieId = res.movie._id
			next()
		},
		voiceoverController.createVoiceover,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.movie
			})
		}
	)
	.put(
		'/:id',
		accessControl('updateOwn', 'movie'),
		validate(movieValidation.update),
		ownMiddleware.ownMovie,
		movieController.updateMovie,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.movie
			})
		}
	)
	.delete(
		'/:id',
		accessControl('deleteOwn', 'movie'),
		validate(movieValidation.delete),
		ownMiddleware.ownMovie,
		movieController.deleteMovie,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
