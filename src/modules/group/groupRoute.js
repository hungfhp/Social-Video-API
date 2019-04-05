/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as groupController from './groupController'
import groupValidation from './groupValidation'
import { authJwt } from '../../services/authService'
import { parseParam } from '../../services/paramService'

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
		parseParam,
		validate(groupValidation.index),
		groupController.getGroups,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				groups: res.groups,
				groupsMeta: res.groupsMeta
			})
		}
	)
	.get(
		'/:id',
		validate(groupValidation.show),
		groupController.getGroupById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				group: res.group
			})
		}
	)
	.post(
		'/',
		authJwt,
		validate(groupValidation.create),
		groupController.createGroup,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				group: res.group
			})
		}
	)
	.put(
		'/:id',
		validate(groupValidation.update),
		groupController.updateGroup,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				group: res.group
			})
		}
	)
	.delete(
		'/:id',
		validate(groupValidation.delete),
		groupController.deleteGroup,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
