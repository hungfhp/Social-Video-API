/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as directorController from './directorController'
import directorValidation from './directorValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

const router = new Router()

/**
 * GET /items/stats => getDirectorsStats
 * GET /items => getDirectors
 * GET /items/:id => getDirectorById
 * POST /items/ => createDirector
 * PATCH/PUT /items/:id => updateDirector
 * DELETE /items/:id => deleteDirector
 */

// More router
router.get(
	'/init',
	authService.authJwt,
	directorController.initDirectors,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.directors
		})
	}
)

// Default Rest router
router
	.get(
		'/stats',
		validate(directorValidation.stats),
		directorController.getDirectorsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.directorsStats
			})
		}
	)
	.get(
		'/',
		paramService.parseParam,
		validate(directorValidation.index),
		directorController.getDirectors,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.directors,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(directorValidation.show),
		directorController.getDirectorById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.director
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(directorValidation.create),
		directorController.createDirector,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.director
			})
		}
	)
	.put(
		'/:id',
		validate(directorValidation.update),
		directorController.updateDirector,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.director
			})
		}
	)
	.delete(
		'/:id',
		validate(directorValidation.delete),
		directorController.deleteDirector,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
