/* eslint-disable no-unused-vars */
import Joi from 'joi'

export default {
	requests: {
		body: {
			friend: Joi.string().required()
		}
	},
	remove: {
		body: {
			friend: Joi.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
