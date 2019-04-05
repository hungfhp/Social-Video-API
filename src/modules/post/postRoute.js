/* eslint-disable no-unused-vars */
import { Router } from 'express'
import validate from 'express-validation'
import HTTPStatus from 'http-status'

import * as postController from './postController'
import postValidation from './postValidation'

const router = new Router()

/**
 * GET /items/stats => getPostsStats
 * GET /items => getPosts
 * GET /items/:id => getPostById
 * POST /items/ => createPost
 * PATCH/PUT /items/:id => updatePost
 * DELETE /items/:id => deletePost
 */

// More router

// Default Rest router
router
	.get(
		'/stats',
		validate(postValidation.stats),
		postController.getPostsStats,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				postsStats: res.postsStats
			})
		}
	)
	.get('/', validate(postValidation.index), postController.getPosts, function(
		req,
		res,
		next
	) {
		return res.status(HTTPStatus.OK).json({
			posts: res.posts,
			postsMeta: res.postsMeta
		})
	})
	.get(
		'/:id',
		validate(postValidation.show),
		postController.getPostById,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				post: res.post
			})
		}
	)
	.post(
		'/',
		validate(postValidation.create),
		postController.createPost,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				post: res.post
			})
		}
	)
	.put(
		'/:id',
		validate(postValidation.update),
		postController.updatePost,
		function(req, res, next) {
			return res.status(HTTPStatus.OK).json({
				post: res.post
			})
		}
	)
	.delete(
		'/:id',
		validate(postValidation.delete),
		postController.deletePost,
		function(req, res, next) {
		return res.sendStatus(HTTPStatus.OK)
		}
	)

export default router
