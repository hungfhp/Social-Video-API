import HTTPStatus from 'http-status'
import Movie from '../modules/movie/movieModel'
import { log } from '../utils/helper'

// update req.movie
export async function ownMovie(req, res, next) {
	try {
		req.movie = await Movie.findById(req.params.id)

		if (!req.movie.uploader.equals(req.user._id)) {
			return res.sendStatus(HTTPStatus.NON_AUTHORITATIVE_INFORMATION)
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
