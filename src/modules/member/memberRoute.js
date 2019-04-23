/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as memberController from './memberController'
import memberValidation from './memberValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import { existMember } from '../../middlewares/existMiddleware'

const router = new Router()

/**
 * GET /items/stats => getMembersStats
 * GET /items => getMembers
 * GET /items/:id => getMemberById
 * POST /items/ => createMember
 * PATCH/PUT /items/:id => updateMember
 * DELETE /items/:id => deleteMember
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(memberValidation.stats),
		memberController.getMembersStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				membersStats: res.membersStats
			})
		}
	)
	.get(
		'/',
		validate(memberValidation.index),
		paramMiddleware.parseParamList,
		memberController.getMembers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.members,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(memberValidation.show),
		memberController.getMemberById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.member
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'member'),
		validate(memberValidation.create),
		existMember,
		memberController.createMember,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.member
			})
		}
	)
	.put(
		'/:id',
		accessControl('updateOwn', 'member'),
		validate(memberValidation.update),
		memberController.updateMember,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.member
			})
		}
	)
	.delete(
		'/:id',
		accessControl('deleteOwn', 'member'),
		validate(memberValidation.delete),
		memberController.deleteMember,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
