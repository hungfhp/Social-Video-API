/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import float from 'mongoose-float'
const Float = float.loadType(mongoose)
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'

let seriesSchema = new Schema(
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
		part: {
			type: Number,
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
		episodes: [
			{
				type: ObjectId,
				ref: 'Movie',
				trim: true
			}
		],
		year: {
			type: Number,
			trim: true
		},
		series: {
			type: ObjectId,
			ref: 'Series',
			trim: true
		},
		isAdult: {
			type: Boolean,
			default: false
		},
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
			type: String,
			enum: ['CAM', 'HD', 'FULL HD'],
			default: 'HD',
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

seriesSchema.statics = {}

seriesSchema.pre('save', function(next) {
	return next()
})

seriesSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
seriesSchema.plugin(mongoosePaginate)
seriesSchema.plugin(autopopulate)
seriesSchema.plugin(pluginService.logPost, { schemaName: 'Series' })
seriesSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Series' })

export default mongoose.model('Series', seriesSchema)
