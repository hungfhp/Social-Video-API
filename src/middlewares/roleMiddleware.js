import HTTPStatus from 'http-status'
import ac from '../services/accessControlService'

export function accessControl(access, resource) {
	return function checkPermission(req, res, next) {
		req.permission = ac
			.can(req.user.role)
			.execute(access)
			.on(resource)

		if (req.permission.granted) {
			req.body = req.permission.filter(req.body)

			return next()
		} else {
			return res.status(HTTPStatus.FORBIDDEN).json({
				status: 'Not Permission',
				message: `${String(
					req.user.role
				).toUpperCase()} can not ${access} ${resource}`
			})
		}
	}
}
