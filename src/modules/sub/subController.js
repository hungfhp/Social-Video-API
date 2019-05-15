import Sub from './subModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './subUtil'
import { log } from '../../utils/helper'
import slugify from 'slugify'
import axios from 'axios'
import { uploadFileByUrl } from '../../services/fileService'

export async function getSubsSuggest(req, res, next) {
	try {
		const { nameOrigin, year } = req.query
		if (year && nameOrigin) {
			const url = `https://www.studyphim.vn/movies/getSubtitle/vi/${slugify(
				nameOrigin,
				{
					lower: true
				}
			)}-${year}/1`

			await axios
				.get(url)
				.then(response => {
					uploadFileByUrl('/subtitles', 'true', url, function(subUrl) {
						res.subUrl = subUrl
						next()
					})
				})
				.catch(e => {
					log(JSON.stringify(e), 'error-response.log')
					res.subUrl = ''
					next()
				})
			// subUrl = `https://www.studyphim.vn/movies/getSubtitle/vi/${slugify(
			// 	nameOrigin,
			// 	{ lower: true }
			// )}-${year}/1`
		}
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSubs(req, res, next) {
	try {
		let { docs, ...pagination } = await Sub.paginate({}, req.parsedParams)

		res.subs = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getSubById(req, res, next) {
	try {
		res.sub = await Sub.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createSub(req, res, next) {
	try {
		res.sub = await Sub.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateSub(req, res, next) {
	try {
		let sub = await Sub.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			sub[key] = req.body[key]
		})
		await sub.save()
		res.sub = sub

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteSub(req, res, next) {
	try {
		const sub = await Sub.findById(req.params.id)

		await sub.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
