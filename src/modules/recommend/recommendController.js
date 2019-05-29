import Recommend from './recommendModel.js'
import Movie from '../movie/movieModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './recommendUtil'
import { log } from '../../utils/helper'

export async function addHistory(req, res, next) {
	try {
		if (!req.user._id || !req.body.movieId) {
			next()
		}
		let moive = await Movie.findById(req.body.movieId)
		if (!moive) {
			next()
    }      

		Recommend.addHistory(req.user, moive, req.body.score)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRecommendsStats(req, res, next) {
	try {
		res.recommendsStats = {
			count: await Recommend.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRecommends(req, res, next) {
	try {
		let { docs, ...pagination } = await Recommend.paginate(
			{ ...req.parsedParams.filters },
			req.parsedParams
		)

		res.recommends = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRecommendsForUser(req, res, next) {
	try {
		if (!req.user._id) {
			next()
		}

		const recommends = await Recommend.findOne({
			user: req.user.id
		}).populate({
			path: 'recommends',
			options: req.parsedParams
		})

		res.recommends = recommends._doc.recommends
		res.pagination = { total: res.recommends.length }

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getRecommendById(req, res, next) {
	try {
		res.recommend = await Recommend.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createRecommend(req, res, next) {
	try {
		res.recommend = await Recommend.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateRecommend(req, res, next) {
	try {
		let recommend = await Recommend.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			recommend[key] = req.body[key]
		})
		await recommend.save()
		res.recommend = recommend

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteRecommend(req, res, next) {
	try {
		const recommend = await Recommend.findById(req.params.id)

		await recommend.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
