import HTTPStatus from 'http-status'
import Movie from '../modules/movie/movieModel'

// update req.movie
export async function ownMovie(req, res, next) {
	try {
		req.movie = await Movie.findById(req.params.id)

		if (!req.movie.uploader.equals(req.user._id)) {
			return res.sendStatus(HTTPStatus.NON_AUTHORITATIVE_INFORMATION)
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
