/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as subController from './subController'
import subValidation from './subValidation'
import * as paramService from '../../services/paramService'
import { accessControl } from '../../middlewares/roleMiddleware'

const router = new Router()

/**
 * GET /items/stats => getSubsStats
 * GET /items => getSubs
 * GET /items/:id => getSubById
 * POST /items/ => createSub
 * PATCH/PUT /items/:id => updateSub
 * DELETE /items/:id => deleteSub
 */

// More router

// Default Rest router
router.get('/suggest', subController.getSubsSuggest, function(req, res, next) {
	return res.status(HTTPStatus.OK).json({
		data: res.subUrl
	})
})
// .get(
// 	'/',
// 	accessControl('readAny', 'movie'),
// 	paramService.parseParam,
// 	validate(subValidation.index),
// 	subController.getSubs,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.subs,
// 			pagination: res.pagination
// 		})
// 	}
// )
// .get('/:id', validate(subValidation.show), subController.getSubById, function(
// 	req,
// 	res,
// 	next
// ) {
// 	return res.status(HTTPStatus.OK).json({
// 		data: res.sub
// 	})
// })
// .post(
// 	'/',
// 	accessControl('createOwn', 'movie'),
// 	validate(subValidation.create),
// 	subController.createSub,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.sub
// 		})
// 	}
// )
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'movie'),
// 	validate(subValidation.update),
// 	subController.updateSub,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.sub
// 		})
// 	}
// )
// .delete(
// 	'/:id',
// 	accessControl('deleteOwn', 'movie'),
// 	validate(subValidation.delete),
// 	subController.deleteSub,
// 	function(req, res, next) {
// 		return res.sendStatus(HTTPStatus.OK)
// 	}
// )

export default router
