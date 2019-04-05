import HTTPStatus from 'http-status'

export async function ownMovie(req, res, next) {
	try {
		// let { docs, ...moviesMeta } = await Movie.paginate({}, req.parsedParams)

		// res.movies = docs
		// res.moviesMeta = moviesMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
