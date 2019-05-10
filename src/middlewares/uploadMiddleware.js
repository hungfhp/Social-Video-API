import HTTPStatus from 'http-status'
// import Movie from '../modules/movie/movieModel'
import { log } from '../utils/helper'
import multiparty from 'multiparty'
import cons from '../config/constants'

export async function parseForm(req, res, next) {
	try {
		var form = new multiparty.Form()

		form.parse(req, function() {})

		form.on('file', function(name, file) {
			req.file = file
			req.params.size = file.size
			next()
		})
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
