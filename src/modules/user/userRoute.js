import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as userController from './userController'
import userValidation from './userValidation'
import { authLocal } from '../../services/authService'

const router = new Router()

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/:id => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

//  Default router
router.get(
	'/stats',
	validate(userValidation.stats),
	userController.getStats,
	function(req, res) {
		return res.status(HTTPStatus.OK).json({
			stats: res.stats
		})
	}
)
router.get(
	'/',
	validate(userValidation.index),
	userController.index
)
router.get(
	'/:id',
	validate(userValidation.show),
	userController.show
)
router.post(
	'/',
	validate(userValidation.create),
	userController.create
)
router.put(
	'/:id',
	validate(userValidation.update),
	userController.update
)
router.delete(
	'/:id',
	validate(userValidation.remove),
	userController.remove
)

// More router
router.post(
	'/signup',
	validate(userValidation.create),
	userController.create
)
router.post('/login', authLocal, userController.login)

export default router
