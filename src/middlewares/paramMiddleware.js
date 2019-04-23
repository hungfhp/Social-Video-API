export async function parseParamList(req, res, next) {
	const limit = parseInt(req.query.limit, 0) || 10
	const page = parseInt(req.query.page, 0) || 1
	const offset = parseInt(req.query.offset, 0) || 0
	const sort = req.query.sort || '-createdAt'

	req.parsedParams = {
		page,
		limit,
		sort
	}

	if (offset) {
		req.parsedParams.offset = offset
	}
	next()
}
