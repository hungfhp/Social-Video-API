/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as followUserController from './followUserController'
import followUserValidation from './followUserValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'
import { existFollowUser } from '../../middlewares/existMiddleware'

const router = new Router()

/**
 * GET /items/stats => getFollowUsersStats
 * GET /items => getFollowUsers
 * GET /items/:id => getFollowUserById
 * POST /items/ => createFollowUser
 * PATCH/PUT /items/:id => updateFollowUser
 * DELETE /items/:id => deleteFollowUser
 */

// More router
router
	.get(
		'/following/:id',
		validate(followUserValidation.following),
		paramMiddleware.parseParamList,
		followUserController.getFollowing,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.following,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/followers/:id',
		validate(followUserValidation.followers),
		paramMiddleware.parseParamList,
		followUserController.getFollowers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followers,
				pagination: res.pagination
			})
		}
	)

// Default Rest router
router
	.get(
		'/stats',
		validate(followUserValidation.stats),
		followUserController.getFollowUsersStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUsersStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'movie'),
		paramMiddleware.parseParamList,
		validate(followUserValidation.index),
		followUserController.getFollowUsers,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUsers,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(followUserValidation.show),
		followUserController.getFollowUserById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUser
			})
		}
	)
	.post(
		'/',
		accessControl('createOwn', 'movie'),
		validate(followUserValidation.create),
		existFollowUser,
		followUserController.createFollowUser,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUser
			})
		}
	)
	// .put(
	// 	'/:id',
	// 	accessControl('updateOwn', 'movie'),
	// 	validate(followUserValidation.update),
	// 	followUserController.updateFollowUser,
	// 	function(req, res, next) {
	// 		return res.status(HTTPStatus.OK).json({
	// 			data: res.followUser
	// 		})
	// 	}
	// )
	.delete(
		'/:id',
		accessControl('deleteOwn', 'movie'),
		validate(followUserValidation.delete),
		followUserController.deleteFollowUser,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
