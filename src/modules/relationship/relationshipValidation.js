/* eslint-disable no-unused-vars */
import Joi from 'joi'

export default {
	requests: {
		body: {
			target: Joi.string().required()
		}
	},
	remove: {
		body: {
			target: Joi.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
