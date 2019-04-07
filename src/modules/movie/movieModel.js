/**
 * @typedef movies
 * @property {string} _id
 * @property {string} movieName
 */

// import validator from 'validator'
// import * as myValid from './movieValidation'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import float from 'mongoose-float'
const Float = float.loadType(mongoose)
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as pluginService from '../../services/pluginService'

let movieSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'Movie name is required!'],
			trim: true
		},
		nameOrigin: {
			type: String,
			trim: true
		},
		desc: {
			type: String,
			trim: true
		},
		imdb: {
			id: {
				type: String,
				trim: true
			},
			ratesAvg: {
				type: Float,
				trim: true
			},
			ratesCount: {
				type: Number,
				trim: true
			}
		},
		duration: {
			type: Date,
			trim: true
		},
		country: {
			type: ObjectId,
			ref: 'Country',
			autopopulate: true,
			trim: true
		},
		uploader: {
			type: ObjectId,
			ref: 'User',
			autopopulate: true,
			required: [true, 'Uploader is required!'],
			trim: true
		},
		embedUrl: {
			type: String,
			required: [true, 'Movie file is required!'],
			trim: true
		},
		url: {
			type: String,
			trim: true
		},
		trailerUrl: {
			type: String,
			trim: true
		},
		thumbnails: {
			small: {
				type: String,
				trim: true
			},
			medium: {
				type: String,
				trim: true
			},
			large: {
				type: String,
				trim: true
			}
		},
		photos: [
			{
				type: String,
				trim: true
			}
		],
		slug: {
			type: String,
			unique: true,
			trim: true
		},
		slugOrigin: {
			type: String,
			unique: true,
			trim: true
		},
		genres: [
			{
				type: ObjectId,
				ref: 'Genre',
				autopopulate: true,
				trim: true
			}
		],
		status: {
			type: String,
			enum: ['pending', 'updating', 'done'],
			default: 'pending',
			trim: true
		},
		releaseDate: {
			type: Date,
			trim: true
		},
		year: {
			type: Number,
			trim: true
		},
		subtitleUrl: {
			type: String,
			trim: true
		},
		voiceoverUrl: {
			type: String,
			trim: true
		},
		voiceovers: [
			{
				type: ObjectId,
				ref: 'Voiceover',
				trim: true
			}
		],
		actors: [
			{
				type: ObjectId,
				ref: 'Actor',
				trim: true
			}
		],
		directors: {
			type: Array,
			trim: true
		},
		quality: {
			type: Number,
			enum: ['240', '360', '480', '720', '1080', '2048', '4096'],
			default: '720',
			trim: true
		},
		viewsCount: {
			type: Number,
			trim: true
		},
		likesCount: {
			type: Number,
			trim: true
		},
		favoritesCount: {
			type: Number,
			trim: true
		},
		ratesAvg: {
			type: Number,
			trim: true
		},
		ratesCount: {
			type: Number,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

movieSchema.pre('save', function(next) {
	return next()
})

movieSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

movieSchema.plugin(mongoosePaginate)
movieSchema.plugin(autopopulate)
movieSchema.plugin(pluginService.logPost, { schemaName: 'Movie' })
movieSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Movie' })

export default mongoose.model('Movie', movieSchema)
