import { Router } from 'express'
import validate from 'express-validation'
import { authJwt } from '../../services/authService'

import * as postController from './postController'
import postValidation from './postValidation'

const router = new Router()

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

//  Default router
router
	.get(
		'/stats',
		validate(postValidation.stats),
		postController.stats
	)
	.get(
		'/',
		validate(postValidation.index),
		postController.index
	)
	.get(
		'/:id',
		validate(postValidation.show),
		postController.show
	)
	.post(
		'/',
		validate(postValidation.create),
		authJwt,
		postController.create
	)
	.put(
		'/:id',
		validate(postValidation.update),
		authJwt,
		postController.update
	)
	.delete(
		'/:id',
		validate(postValidation.remove),
		authJwt,
		postController.remove
	)

// More router

export default router
