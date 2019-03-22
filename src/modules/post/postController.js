import Post from './postModel.js'
import HTTPStatus from 'http-status'
import * as util from './postUtil'

/**
 * @group posts - Operations about posts
 *
 */

export async function stats(req, res) {
	try {
		let result = {
			count: Post.count()
		}

		return res.status(HTTPStatus.OK).json(result)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function index(req, res) {
	const limit = parseInt(req.query.limit, 0)
	const skip = parseInt(req.query.skip, 0)
	try {
		const users = await Post.find({
			limit,
			skip,
			...req.query
		})

		return res.status(HTTPStatus.OK).json(posts)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function show(req, res) {
	try {
		const post = await Post.findById(
			req.params.id
		).populate('user')

		return res.status(HTTPStatus.OK).json(post)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function create(req, res) {
	try {
		const post = await Post.create({ ...req.body })

		return res.status(HTTPStatus.CREATED).json(post)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function update(req, res) {
	try {
		const post = await Post.findById(req.params.id)

		// util.isOwn(post, req, res)

		Object.keys(req.body).forEach(key => {
			post[key] = req.body[key]
		})

		return res.status(HTTPStatus.OK).json(await post.save())
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function remove(req, res) {
	try {
		const post = await Post.findById(req.params.id)

		// util.isOwn(post, req, res)

		await post.remove()

		return res.sendStatus(HTTPStatus.OK)
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
