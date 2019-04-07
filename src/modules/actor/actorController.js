import Actor from './actorModel.js'
import HTTPStatus from 'http-status'
// eslint-disable-next-line no-unused-vars
import * as util from './actorUtil'

/**
 * @group actors - Operations about actors
 *
 */

export async function getActorsStats(req, res, next) {
	try {
		res.actorsStats = {
			count: await Actor.estimatedDocumentCount()
		}

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getActors(req, res, next) {
	try {
		let { docs, ...actorsMeta } = await Actor.paginate({}, req.parsedParams)

		res.actors = docs
		res.actorsMeta = actorsMeta

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function getActorById(req, res, next) {
	try {
		res.actor = await Actor.findById(req.params.id)

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function createActor(req, res, next) {
	try {
		res.actor = await Actor.create(req.body)

		next()
	} catch (e) {
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
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}

export async function deleteActor(req, res, next) {
	try {
		const actor = await Actor.findById(req.params.id)

		await actor.remove()

		next()
	} catch (e) {
		return res.status(HTTPStatus.BAD_REQUEST).json(e)
	}
}
