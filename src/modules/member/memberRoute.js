/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as memberController from './memberController'
import memberValidation from './memberValidation'
import * as authService from '../../services/authService'
import * as paramService from '../../services/paramService'

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
		paramService.parseParam,
		validate(memberValidation.index),
		memberController.getMembers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				members: res.members,
				membersMeta: res.membersMeta
			})
		}
	)
	.get(
		'/:id',
		validate(memberValidation.show),
		memberController.getMemberById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				member: res.member
			})
		}
	)
	.post(
		'/',
		authService.authJwt,
		validate(memberValidation.create),
		memberController.createMember,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				member: res.member
			})
		}
	)
	.put(
		'/:id',
		validate(memberValidation.update),
		memberController.updateMember,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				member: res.member
			})
		}
	)
	.delete(
		'/:id',
		validate(memberValidation.delete),
		memberController.deleteMember,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
