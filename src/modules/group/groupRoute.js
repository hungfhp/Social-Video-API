/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as groupController from './groupController'
import groupValidation from './groupValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import * as ownMiddleware from '../../middlewares/ownMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'

const router = new Router()

/**
 * GET /items/stats => getGroupsStats
 * GET /items => getGroups
 * GET /items/:id => getGroupById
 * POST /items/ => createGroup
 * PATCH/PUT /items/:id => updateGroup
 * DELETE /items/:id => deleteGroup
 */

// More router
router.get(
	'/suggest',
	accessControl('readAny', 'group'),
	validate(groupValidation.index),
	paramMiddleware.parseParamList,
	groupController.getSuggestGroups,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.groups,
			pagination: res.pagination
		})
	}
)

// Default Rest router
router
	.get(
		'/stats',
		validate(groupValidation.stats),
		groupController.getGroupsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				groupsStats: res.groupsStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'group'),
		validate(groupValidation.index),
		paramMiddleware.parseParamList,
		groupController.getGroups,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.groups,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		accessControl('readOwn', 'group'),
		validate(groupValidation.show),
		groupController.getGroupById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.group
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'group'),
		validate(groupValidation.create),
		groupController.createGroup,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.group
			})
		}
	)
	.put(
		'/:id',
		accessControl('deleteOwn', 'group'),
		validate(groupValidation.update),
		groupController.updateGroup,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.group
			})
		}
	)
	.delete(
		'/:id',
		accessControl('updateOwn', 'group'),
		validate(groupValidation.delete),
		groupController.deleteGroup,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
