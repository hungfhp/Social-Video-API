import HTTPStatus from 'http-status'
import FollowMovie from '../modules/followMovie/followMovieModel'
import FollowUser from '../modules/followUser/followUserModel'
import Like from '../modules/like/likeModel'
import Rate from '../modules/rate/rateModel'
import Member from '../modules/member/memberModel'
import { log } from '../utils/helper'

export async function existFollowMovie(req, res, next) {
	try {
		res.followMovie = await FollowMovie.findOne({ ...req.body, user: req.user })

		if (res.followMovie) {
			return res.status(HTTPStatus.OK).json({
				data: res.followMovie
			})
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function existFollowUser(req, res, next) {
	try {
		res.followUser = await FollowUser.findOne({ ...req.body, user: req.user })

		if (res.followUser) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUser
			})
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function existLike(req, res, next) {
	try {
		res.like = await Like.findOne({ ...req.body, user: req.user })

		if (res.like) {
			return res.status(HTTPStatus.OK).json({
				data: res.like
			})
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function existRate(req, res, next) {
	try {
		res.rate = await Rate.findOne({ ...req.body, user: req.user })

		if (res.rate) {
			return res.status(HTTPStatus.OK).json({
				data: res.rate
			})
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function existMember(req, res, next) {
	try {
		res.member = await Member.findOne({ ...req.body, user: req.user })

		if (res.member) {
			return res.status(HTTPStatus.OK).json({
				data: res.member
			})
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
