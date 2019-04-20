import HTTPStatus from 'http-status'
import FollowMovie from '../modules/followMovie/followMovieModel'
import Like from '../modules/like/likeModel'
import Member from '../modules/member/memberModel'

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
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function existFollowUser(req, res, next) {
	try {
		res.followUser = await FollowMovie.findOne({ ...req.body, user: req.user })

		if (res.followUser) {
			return res.status(HTTPStatus.OK).json({
				data: res.followUser
			})
		}

		next()
	} catch (e) {
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
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
