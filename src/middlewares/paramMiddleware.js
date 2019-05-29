export async function parseParamList(req, res, next) {
	const limit = parseInt(req.query.limit, 0) || 10
	const page = parseInt(req.query.page, 0) || 1
	const offset = parseInt(req.query.offset, 0) || 0
	const search = String(req.query.search || '')
	const filters = JSON.parse(req.query.filters || '{}')
	const populate = JSON.parse(req.query.populate || '[]')
	const sort = req.query.sort || '-createdAt'

	req.parsedParams = {
		page,
		limit,
		search,
    filters,
    populate,
		sort
	}

	if (offset) {
		req.parsedParams.offset = offset
	}
	next()
}
