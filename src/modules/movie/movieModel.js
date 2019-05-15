// import validator from 'validator'
// import * as myValid from './movieValidation'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import float from 'mongoose-float'
const Float = float.loadType(mongoose)
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
// import Actor from '../actor/actorModel'
// import Director from '../director/directorModel'
// import Genre from '../genre/genreModel'

import * as pluginService from '../../services/pluginService'

var embedSchema = new Schema({
	resolution: {
		type: Number,
		default: 720
	},
	embedUrl: {
		type: String,
		required: [true, 'Movie file is required!']
	},
	default: {
		type: Boolean,
		default: false
	}
})

var movieSchema = new Schema(
	{
		name: {
			type: String,
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
			type: Number,
			trim: true
		},
		category: {
			type: String,
			enum: ['single', 'series'],
			default: 'single',
			trim: true
		},
		countries: [
			{
				type: String,
				trim: true
			}
		],
		uploader: {
			type: ObjectId,
			ref: 'User',
			autopopulate: true,
			required: [true, 'Uploader is required!'],
			// hung-prod
			default: '5c9edb2d6d7b1b2ea07ff3fa',
			trim: true
		},
		embeds: [embedSchema],
		url: {
			type: String,
			unique: true,
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
			trim: true,
			index: false
		},
		genres: [
			{
				type: String,
				trim: true
			}
		],
		status: {
			type: String,
			enum: ['pending', 'updating', 'done'],
			default: 'pending',
			trim: true
		},
		share: {
			type: String,
			enum: ['private', 'friend', 'public'],
			default: 'public',
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
		provider: {
			type: Object,
			trim: true
		},
		isAdult: {
			type: Boolean,
			default: false
		},
		subUrl: {
			type: String,
			trim: true
		},
		voiceoverUrl: {
			type: String,
			trim: true
		},
		actors: [
			{
				type: String,
				trim: true
			}
		],
		directors: [
			{
				type: String,
				trim: true
			}
		],
		quality: {
			type: String,
			enum: ['CAM', 'HD', 'FULL HD'],
			default: 'HD',
			trim: true
		},
		viewsCount: {
			type: Number,
			default: 1,
			trim: true
		},
		likesCount: {
			type: Number,
			default: 0,
			trim: true
		},
		favoritesCount: {
			type: Number,
			default: 0,
			trim: true
		},
		ratesAvg: {
			type: Number,
			default: 5,
			trim: true
		},
		ratesCount: {
			type: Number,
			default: 0,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

movieSchema.set('autoIndex', true)

movieSchema.index({
	name: 'text',
	nameOrigin: 'text',
	genres: 'text',
	actors: 'text',
	countries: 'text',
	directors: 'text',
	uploader: 'text',
	year: 'text'
})

movieSchema.pre('save', function(next) {
	// if (this.country) {
	// 	this.countries.push(this.country)
	// }
	// return next()
})

movieSchema.statics = {
	// views inc
	incViewsCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { viewsCount: 1 } })
	},

	// favorites inc
	incFavoritesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { favoritesCount: 1 } })
	},

	// favorites dec
	decFavoritesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { favoritesCount: -1 } })
	}
}

movieSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

movieSchema.plugin(mongoosePaginate)
movieSchema.plugin(autopopulate)
movieSchema.plugin(pluginService.logPost, { schemaName: 'Movie' })
movieSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Movie' })

export default mongoose.model('Movie', movieSchema)
