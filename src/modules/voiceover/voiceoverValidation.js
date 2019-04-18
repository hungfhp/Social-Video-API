/* eslint-disable no-unused-vars */
import Joi from 'joi'

export default {
	checkSynthesis: {
		query: {
			requestId: Joi.string().required()
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
