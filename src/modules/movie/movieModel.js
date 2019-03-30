/**
 * @typedef movies
 * @property {string} _id
 * @property {string} movieName
 */

// import validator from 'validator'
// import * as myValid from './movieValidation'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

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
		uploader: {
			type: ObjectId,
			ref: 'User',
			required: [true, 'Uploader is required!'],
			trim: true
		},
		embedUrl: {
			type: String,
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
		thumbnailUrl: {
			type: String,
			trim: true
		},
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
		genres: {
			type: Array,
			trim: true
		},
		status: {
			type: String,
			trim: true
		},
		premiere: {
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
		actors: {
			type: Array,
			trim: true
		},
		tags: {
			type: Array,
			trim: true
		},
		directorName: {
			type: String,
			trim: true
		},
		// 240 360 480 720 1080 2048 4096
		quality: {
			type: Number,
			trim: true
		},
		viewsCount: {
			type: Number,
			trim: true
		},
		likedCount: {
			type: Number,
			trim: true
		},
		favoritesCount: {
			type: Number,
			trim: true
		},
		ratingAvg: {
			type: Number,
			trim: true
		},
		ratingCount: {
			type: Number,
			trim: true
		}
	},
	{
		timestamps: true
	}
)

movieSchema.pre('save', function(next) {
	this.slug = slugify(this.name, {
		lower: true
	})

	this.slugOrigin = slugify(this.nameOrigin || this.name, {
		lower: true
	})

	this.url =
		slugify(this.name, {
			lower: true
		}) +
		'_' +
		this._id

	return next()
})

movieSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})

movieSchema.plugin(mongoosePaginate)

export default mongoose.model('movie', movieSchema)
