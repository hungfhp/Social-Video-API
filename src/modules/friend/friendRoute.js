/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as friendController from './friendController'
import friendValidation from './friendValidation'
import * as paramMiddleware from '../../middlewares/paramMiddleware'
import * as ownMiddleware from '../../middlewares/ownMiddleware'
import { accessControl } from '../../middlewares/roleMiddleware'

const router = new Router()

/**
 * GET /items/stats => getFriendsStats
 * GET /items => getFriends
 * GET /items/:id => getFriendById
 * POST /items/ => createFriend
 * PATCH/PUT /items/:id => updateFriend
 * DELETE /items/:id => deleteFriend
 */

// More router
router
	.post(
		'/requests',
		accessControl('createOwn', 'friend'),
		validate(friendValidation.requests),
		friendController.createRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: req.user
			})
		}
	)
	.post(
		'/requests/accept',
		accessControl('createOwn', 'friend'),
		validate(friendValidation.requests),
		friendController.acceptRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friend
			})
		}
	)
	.post(
		'/requests/reject',
		accessControl('createOwn', 'friend'),
		validate(friendValidation.requests),
		friendController.rejectRequest,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friend
			})
		}
	)
	.delete(
		'/',
		accessControl('createOwn', 'friend'),
		validate(friendValidation.remove),
		friendController.removeFriend,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friend
			})
		}
	)

// Default Rest router
router
	.get(
		'/stats',
		validate(friendValidation.stats),
		friendController.getFriendsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friendsStats
			})
		}
	)
	.get(
		'/',
		accessControl('readAny', 'friend'),
		paramMiddleware.parseParamList,
		validate(friendValidation.index),
		friendController.getFriends,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friends,
				pagination: res.pagination
			})
		}
	)
	.get(
		'/:id',
		validate(friendValidation.show),
		friendController.getFriendById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				data: res.friend
			})
		}
	)
// .post(
// 	'/',
// 	accessControl('createOwn', 'friend'),
// 	validate(friendValidation.create),
// 	friendController.createFriend,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.friend
// 		})
// 	}
// )
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'friend'),
// 	validate(friendValidation.update),
// 	friendController.updateFriend,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.friend
// 		})
// 	}
// )
// .delete(
// 	'/:id',
// 	accessControl('deleteOwn', 'friend'),
// 	validate(friendValidation.delete),
// 	friendController.deleteFriend,
// 	function(req, res, next) {
// 		return res.sendStatus(HTTPStatus.OK)
// 	}
// )

export default router
