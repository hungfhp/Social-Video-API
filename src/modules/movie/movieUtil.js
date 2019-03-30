/* eslint-disable no-console */
import HTTPStatus from 'http-status'

export function debug(obj) {
	console.log(obj)
}

export function isOwn(movie, req, res) {
	if (!movie.user.equals(req.user._id)) {
		return res.sendStatus(HTTPStatus.UNAUTHORIZED)
	}
}
