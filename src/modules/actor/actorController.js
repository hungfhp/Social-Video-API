import Actor from './actorModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './actorUtil'
import defaultActors from '../../initData/actors'
import { log } from '../../utils/helper'

/**
 * @group actors - Operations about actors
 *
 */

export default async function initActors(req, res, next) {
	try {
		await Actor.deleteMany()
		await Actor.insertMany(defaultActors)
		res.actors = defaultActors

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getActorsStats(req, res, next) {
	try {
		res.actorsStats = {
			count: await Actor.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getActors(req, res, next) {
	try {
		let { docs, ...pagination } = await Actor.paginate({}, req.parsedParams)

		res.actors = docs
		res.pagination = pagination

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getActorById(req, res, next) {
	try {
		res.actor = await Actor.findById(req.params.id)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createActor(req, res, next) {
	try {
		res.actor = await Actor.create(req.body)

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function updateActor(req, res, next) {
	try {
		let actor = await Actor.findById(req.params.id)

		Object.keys(req.body).forEach(key => {
			actor[key] = req.body[key]
		})
		await actor.save()
		res.actor = actor

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteActor(req, res, next) {
	try {
		const actor = await Actor.findById(req.params.id)

		await actor.remove()

		next()
	} catch (e) {
		log(JSON.stringify(e), 'error-response.log')
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
