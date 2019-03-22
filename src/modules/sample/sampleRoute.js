import { Router } from 'express'
import validate from 'express-validation'

import * as sampleController from './sampleController'
import sampleValidation from './sampleValidation'

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
		validate(sampleValidation.stats),
		sampleController.getSampleStats
	)
	.get(
		'/',
		validate(sampleValidation.index),
		sampleController.getSamples
	)
	.get(
		'/:id',
		validate(sampleValidation.show),
		sampleController.getSampleById
	)
	.post(
		'/',
		validate(sampleValidation.create),
		sampleController.createSample
	)
	.put(
		'/:id',
		validate(sampleValidation.update),
		sampleController.updateSample
	)
	.delete(
		'/:id',
		validate(sampleValidation.delete),
		sampleController.deleteSample
	)

// More router

export default router
