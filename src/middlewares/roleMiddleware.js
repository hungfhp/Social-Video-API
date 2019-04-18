import HTTPStatus from 'http-status'

export async function checkPermission(req, res, next) {
	if (req.permission.granted) {
		res.body = req.permission.filter(res.body)
		next()
	} else {
		return res.status(HTTPStatus.FORBIDDEN).json('Not Permission')
	}
}
