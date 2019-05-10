// import Upload from './uploadModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
// import * as util from './uploadUtil'
import { log } from '../../utils/helper'
import multiparty from 'multiparty'
import request from 'request'
import fs from 'fs'
// import request from 'request'
import cons from '../../config/constants'
import util from 'util'
import * as fileService from '../../services/fileService'

export async function uploadFile(req, res, next) {
	try {
		fileService.uploadFile(
			'/files',
			'false',
			{
				value: fs.createReadStream(req.file.path),
				options: {
					filename: req.file.originalFilename
				}
			},
			async function(uploadedFile) {
				res.uploadedFile = uploadedFile
				next()
			}
		)
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function uploadImage(req, res, next) {
	try {
		fileService.uploadFile(
			'/images',
			'false',
			{
				value: fs.createReadStream(req.file.path),
				options: {
					filename: req.file.originalFilename
				}
			},
			async function(uploadedFile) {
				res.uploadedFile = uploadedFile
				next()
			}
		)
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function uploadSubtitle(req, res, next) {
	try {
		fileService.uploadFile(
			'/subtitles',
			'false',
			{
				value: fs.createReadStream(req.file.path),
				options: {
					filename: req.file.originalFilename
				}
			},
			async function(uploadedFile) {
				res.uploadedFile = uploadedFile
				next()
			}
		)
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function uploadMovie(req, res, next) {
	try {
		fileService.uploadFile(
			'/movies',
			'false',
			{
				value: fs.createReadStream(req.file.path),
				options: {
					filename: req.file.originalFilename
				}
			},
			async function(uploadedFile) {
				res.uploadedFile = uploadedFile
				next()
			}
		)
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function uploadVoiceover(req, res, next) {
	try {
		fileService.uploadFile(
			'/voiceovers',
			'false',
			{
				value: fs.createReadStream(req.file.path),
				options: {
					filename: req.file.originalFilename
				}
			},
			async function(uploadedFile) {
				res.uploadedFile = uploadedFile
				next()
			}
		)
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
