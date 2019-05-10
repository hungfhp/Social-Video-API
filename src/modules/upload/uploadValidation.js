/* eslint-disable no-unused-vars */
import Joi from 'joi'
import cons from '../../config/constants'

export default {
	uploadFile: {
		params: {
			size: Joi.number().max(cons.UPLOAD_FILE_MAX)
		}
	},
	uploadImage: {
		params: {
			size: Joi.number().max(cons.UPLOAD_IMAGE_MAX)
		}
	},
	uploadMovie: {
		params: {
			size: Joi.number().max(cons.UPLOAD_MOVIE_MAX)
		}
	},
	uploadSubtitle: {
		params: {
			size: Joi.number().max(cons.UPLOAD_SUBTITLE_MAX)
		}
	},
	uploadVoiceover: {
		params: {
			size: Joi.number().max(cons.UPLOAD_VOICEOVER_MAX)
		}
	}
}
