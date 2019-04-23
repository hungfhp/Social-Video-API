/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as genreController from './genreController'
import genreValidation from './genreValidation'
import * as authService from '../../services/authService'
import * as paramMiddleware from '../../middlewares/paramMiddleware'

const router = new Router()

/**
 * GET /items/stats => getGenresStats
 * GET /items => getGenres
 * GET /items/:id => getGenreById
 * POST /items/ => createGenre
 * PATCH/PUT /items/:id => updateGenre
 * DELETE /items/:id => deleteGenre
 */

// More router
router.get('/init', authService.authJwt, genreController.initGenres, function(
	req,
	res,
	next
) {
	return res.status(HTTPStatus.OK).json({
		data: res.genres
	})
})

// Default Rest router
router
	.get(
		'/stats',
		validate(genreValidation.stats),
		genreController.getGenresStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				genresStats: res.genresStats
			})
		}
	)
	.get(
		'/',
		validate(genreValidation.index),
		paramMiddleware.parseParamList,
		genreController.getGenres,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.genres,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(genreValidation.show),
		genreController.getGenreById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.genre
			})
		}
	)
	.post(
		'/',
		validate(genreValidation.create),
		genreController.createGenre,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.genre
			})
		}
	)
	.put(
		'/:id',
		validate(genreValidation.update),
		genreController.updateGenre,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.genre
			})
		}
	)
	.delete(
		'/:id',
		validate(genreValidation.delete),
		genreController.deleteGenre,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
