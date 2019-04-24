import Post from './postModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './postUtil'
import { log } from '../../utils/helper'

/**
 * @group posts - Operations about posts
 *
 */

export async function getPostsStats(req, res, next) {
	try {
		res.postsStats = {
			count: await Post.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getPosts(req, res, next) {
	try {
		let { docs, ...pagination } = await Post.paginate({}, req.parsedParams)

		res.posts = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getPostById(req, res, next) {
	try {
		res.post = await Post.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createPost(req, res, next) {
	try {
		res.post = await Post.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updatePost(req, res, next) {
	try {
		let post = await Post.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			post[key] = req.body[key]
		})
		await post.save()
		res.post = post

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deletePost(req, res, next) {
	try {
		const post = await Post.findById(req.params.id)

		await post.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
