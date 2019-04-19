/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as userController from './userController'
import userValidation from './userValidation'
import { authLocal, authFacebook, authJwt } from '../../services/authService'
import { checkPermission } from '../../middlewares/roleMiddleware'
import ac from '../../services/roleService'
const router = new Router()

/**
 * GET /items/stats => getUsersStats
 * GET /items => getUsers
 * GET /items/:id => getUserById
 * POST /items/ => createUser
 * PATCH/PUT /items/:id => updateUser
 * DELETE /items/:id => deleteUser
 */

// More router
router
	.get(
		'/current',
		function(req, res, next) {
			req.permission = ac.can(req.user.role).readOwn('user')
			next()
		},
		checkPermission,
		userController.getProfile,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: req.user
			})
		}
	)
	.post(
		'/signup',
		validate(userValidation.create),
		userController.createUser,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: req.user
			})
		}
	)
	.post('/login', authLocal, userController.localLogin, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			user: req.user
		})
	})
	.get('/auth/facebook', authFacebook)
	.get(
		'/auth/facebook/callback',
		authFacebook,
		userController.facebookLogin,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: req.user
			})
		}
	)

//  Default Rest router
router
	.get(
		'/stats',
		validate(userValidation.stats),
		userController.getUsersStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				usersStats: res.usersStats
			})
		}
	)
	.get('/', validate(userValidation.index), userController.getUsers, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			users: res.users,
			usersMeta: res.usersMeta
		})
	})
	.get(
		'/:id',
		validate(userValidation.show),
		userController.getUserById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: res.user
			})
		}
	)
	.post(
		'/',
		validate(userValidation.create),
		userController.createUser,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: req.user
			})
		}
	)
	.put(
		'/:id',
		validate(userValidation.update),
		userController.updateUser,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				user: res.user
			})
		}
	)
	.delete(
		'/:id',
		validate(userValidation.delete),
		userController.deleteUser,
		function(req, res, next) {
			return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
