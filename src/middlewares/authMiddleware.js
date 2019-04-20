import constants from '../config/constants'
import jwt from 'jsonwebtoken'
import User from '../modules/user/userModel'

export async function getUser(req, res, next) {
	req.user = {}
	await jwt.verify(
		extractToken(req.headers.authorization),
		constants.JWT_SECRET,
		async function(err, decoded) {
			if (err) {
				req.user = {
					role: 'viewer'
				}
				next()
			} else {
				const user = await User.findById(decoded._id)
				req.user = user
				req.token = req.headers.authorization
				next()
			}
		}
	)
}

function extractToken(authorization = '') {
	return authorization.replace('JWT ', '')
}
