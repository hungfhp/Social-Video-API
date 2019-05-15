// eslint-disable-next-line no-unused-vars
import Joi from 'joi'

export default {
	groupsStatus: {
		params: {
			id: Joi.string().required(),
			status: Joi.string()
				.required()
				.valid('checking', 'done', 'block')
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
