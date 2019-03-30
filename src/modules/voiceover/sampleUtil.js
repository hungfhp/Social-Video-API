/* eslint-disable no-console */
import HTTPStatus from 'http-status'

export function debug(obj) {
	console.log(obj)
}

export function isOwn(sample, req, res) {
	if (!sample.user.equals(req.user._id)) {
		return res.sendStatus(HTTPStatus.UNAUTHORIZED)
	}
}
