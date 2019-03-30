// eslint-disable-next-line no-unused-vars
import Joi from 'joi'

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

export default {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}
