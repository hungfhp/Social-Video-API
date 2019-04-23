/* eslint-disable no-unused-vars */
import Joi from 'joi'

export default {
	following: {
		params: {
			id: Joi.string().required()
		}
	},
	followers: {
		params: {
			id: Joi.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
