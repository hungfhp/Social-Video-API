/* eslint-disable no-unused-vars */
import Joi from 'joi'

export default {
	checkSynthesis: {
		params: {
			requestId: Joi.string().required()
		}
	},
	upload: {
		body: {
			file: Joi.any().required()
		}
	},
	callbackSynthesis: {},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
