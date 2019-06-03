/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as relationshipController from './relationshipController'
import relationshipValidation from './relationshipValidation'
import * as paramService from '../../services/paramService'
import { accessControl } from '../../middlewares/roleMiddleware'

const router = new Router()

/**
 * GET /items/stats => getRelationshipsStats
 * GET /items => getRelationships
 * GET /items/:id => getRelationshipById
 * POST /items/ => createRelationship
 * PATCH/PUT /items/:id => updateRelationship
 * DELETE /items/:id => deleteRelationship
 */

// More router
router
	.post(
		'/',
		accessControl('createOwn', 'relationship'),
		validate(relationshipValidation.requests),
		relationshipController.createRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationship
			})
		}
	)
	.put(
		'/accept',
		accessControl('updateOwn', 'relationship'),
		validate(relationshipValidation.requests),
		relationshipController.acceptRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationship
			})
		}
	)
	.put(
		'/reject',
		accessControl('updateOwn', 'relationship'),
		validate(relationshipValidation.requests),
		relationshipController.rejectRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationship
			})
		}
	)
	.get(
		'/check/:targetId',
		accessControl('updateOwn', 'relationship'),
		relationshipController.checkStatus,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationshipStatus
			})
		}
	)
	.delete(
		'/remove/:targetId',
		accessControl('updateOwn', 'relationship'),
		relationshipController.removeFriend,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationship
			})
		}
	)

// Default Rest router
router
	.get(
		'/stats',
		validate(relationshipValidation.stats),
		relationshipController.getRelationshipsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationshipsStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'movie'),
		paramService.parseParam,
		validate(relationshipValidation.index),
		relationshipController.getRelationships,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.relationships,
				pagination: res.pagination
			})
		}
	)
// .get(
// 	'/:id',
// 	validate(relationshipValidation.show),
// 	relationshipController.getRelationshipById,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .post(
// 	'/',
// 	accessControl('createOwn', 'movie'),
// 	validate(relationshipValidation.create),
// 	relationshipController.createRelationship,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'movie'),
// 	validate(relationshipValidation.update),
// 	relationshipController.updateRelationship,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .delete(
// 	'/:id',
// 	accessControl('deleteOwn', 'movie'),
// 	validate(relationshipValidation.delete),
// 	relationshipController.deleteRelationship,
// 	function(req, res, next) {
// 		return res.sendStatus(HTTPStatus.OK)
// 	}
// )

export default router
