/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as actorController from './actorController'
import actorValidation from './actorValidation'

const router = new Router()

/**
 * GET /items/stats => getActorsStats
 * GET /items => getActors
 * GET /items/:id => getActorById
 * POST /items/ => createActor
 * PATCH/PUT /items/:id => updateActor
 * DELETE /items/:id => deleteActor
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(actorValidation.stats),
		actorController.getActorsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				actorsStats: res.actorsStats
			})
		}
	)
	.get(
		'/',
		validate(actorValidation.index),
		actorController.getActors,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				actors: res.actors,
				actorsMeta: res.actorsMeta
			})
		}
	)
	.get(
		'/:id',
		validate(actorValidation.show),
		actorController.getActorById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				actor: res.actor
			})
		}
	)
	.post(
		'/',
		validate(actorValidation.create),
		actorController.createActor,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				actor: res.actor
			})
		}
	)
	.put(
		'/:id',
		validate(actorValidation.update),
		actorController.updateActor,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				actor: res.actor
			})
		}
	)
	.delete(
		'/:id',
		validate(actorValidation.delete),
		actorController.deleteActor,
		function(req, res, next) {
      return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
