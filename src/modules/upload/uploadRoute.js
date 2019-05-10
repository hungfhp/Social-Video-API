/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as uploadController from './uploadController'
import uploadValidation from './uploadValidation'
import * as upload from '../../services/paramService'
import { accessControl } from '../../middlewares/roleMiddleware'
import { parseForm } from '../../middlewares/uploadMiddleware'

const router = new Router()

/**
 * GET /items/stats => getUploadsStats
 * GET /items => getUploads
 * GET /items/:id => getUploadById
 * POST /items/ => createUpload
 * PATCH/PUT /items/:id => updateUpload
 * DELETE /items/:id => deleteUpload
 */

// More router

router.post(
	'/file',
	parseForm,
	validate(uploadValidation.uploadFile),
	uploadController.uploadFile,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.uploadedFile
		})
	}
)
router.post(
	'/image',
	parseForm,
	validate(uploadValidation.uploadImage),
	uploadController.uploadImage,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.uploadedFile
		})
	}
)
router.post(
	'/movie',
	parseForm,
	validate(uploadValidation.uploadMovie),
	uploadController.uploadMovie,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.uploadedFile
		})
	}
)
router.post(
	'/subtitle',
	parseForm,
	validate(uploadValidation.uploadSubtitle),
	uploadController.uploadSubtitle,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.uploadedFile
		})
	}
)
router.post(
	'/voiceover',
	parseForm,
	validate(uploadValidation.uploadVoiceover),
	uploadController.uploadVoiceover,
	function(req, res, next) {
		return res.status(HTTPStatus.OK).json({
			data: res.uploadedFile
		})
	}
)

export default router
