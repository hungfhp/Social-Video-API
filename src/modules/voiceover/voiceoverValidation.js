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
	create: {
		body: {
			movieId: Joi.string().required(),
			voice: Joi.string()
				.required()
				.valid(
					'hn_male_xuantin_vdts_48k-hsmm',
					'hn_female_xuanthu_news_48k-hsmm',
					'sg_male_xuankien_vdts_48k-hsmm',
					'hn_female_thutrang_phrase_48k-hsmm',
					'sg_female_xuanhong_vdts_48k-hsmm',
					'sg_male_minhhoang_dial_48k-hsmm',
					'sg_female_thaotrinh_dialog_48k-hsmm'
				)
		}
	},
	update: {},
	delete: {}
}
