export async function parseParam(req, res, next) {
	const limit = parseInt(req.query.limit, 0) || 10
	const page = parseInt(req.query.page, 0) || 0
	const offset = parseInt(req.query.offset, 0) || 0
	const sort = String(req.query.sort) || '-createdAt'

	req.parsedParams = {
		limit,
		offset,
		page,
		sort
	}

	next()
}
