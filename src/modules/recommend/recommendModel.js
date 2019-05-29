/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'
import Movie from '../movie/movieModel'

import * as pluginService from '../../services/pluginService'
import { getRecommends } from './recommendController'

var historySchema = new Schema({
	movie: {
		type: ObjectId,
		ref: 'Movie',
		required: [true, 'Movie is required!'],
		trim: true
	},
	score: {
		type: Number,
		default: 0
	}
})
// var prioritySchema = new Schema({
// 	features: [
// 		{
// 			type: String,
// 			trim: true
// 		}
// 	]
// })
// var recommendItemSchema = new Schema({
// 	movie: {
// 		type: ObjectId,
// 		ref: 'Movie',
// 		required: [true, 'Movie is required!'],
// 		trim: true
// 	}
// })
let recommendSchema = new Schema(
	{
		user: {
			type: String,
			required: [true, 'User is required!'],
			trim: true,
			unique: true
		},
		histories: [historySchema],
		priorities: [
			{
				type: Array,
				trim: true
			}
		],
		recommends: [
			{
				type: ObjectId,
				ref: 'Movie',
				trim: true
			}
		]
	},
	{
		timestamps: true
	}
)

recommendSchema.statics = {
	async findOneOrCreate(condition) {
		let rs = await this.findOne(condition)
		return rs ? rs : await this.create(condition)
	},
	async addHistory(user, movie, score) {
		let rcd = await this.findOneOrCreate({ user: user._id })
		let foundIndex = await rcd.indexExistHiroty(movie._id)

		if (foundIndex > -1) {
      if (score !==3 ) {
        rcd.histories[foundIndex].score = score
      }
		} else {
			rcd.histories.push({ movie: movie._id, score })
		}
		await rcd.addPriority(movie, score)
		await rcd.updateRecommends()

		return rcd.save()
	},
	async getRecommends(condition) {}
}

recommendSchema.methods = {
	async indexExistHiroty(movieId) {
		return await this.histories.findIndex(o => {
			return o.movie == String(movieId)
		})
	},
	// async parsePriority(movie) {
	// 	let priority = []
	// 	const name = movie.name.replace(/[0-9]/g, '').split(' ') || []
	// 	const nameOrigin = movie.nameOrigin.replace(/[0-9]/g, '').split(' ') || []
	// 	const actors = movie.actors || []
	// 	const directors = movie.directors || []
	// 	const genres = movie.genres || []

	// 	priority = name.concat(
	// 		nameOrigin.concat(actors.concat(directors.concat(genres)))
	// 	)
	// 	return priority
	// },
	async addPriority(movie, score) {
		if (this.priorities.length > 50) {
			this.priorities = this.priorities.slice(-50)
		}
		let priority = []
		const name = movie.name.replace(/[0-9]/g, '').split(' ') || []
		const nameOrigin = movie.nameOrigin.replace(/[0-9]/g, '').split(' ') || []
		const actors = movie.actors || []
		const directors = movie.directors || []
		const genres = (movie.genres || []).concat(movie.genres || [])

		priority = name.concat(
			nameOrigin.concat(actors.concat(directors.concat(genres)))
		)

		const splitKey = '  '
		const str = priority
			.join(splitKey)
			.trim()
			.replace(/[&\/\\#,+()$~%.'":*?<>{}0-9]/g, '')

		priority = str
			.replace(/ {5}/g, splitKey)
			.replace(/ {4}/g, splitKey)
			.replace(/ {3}/g, splitKey)
			.split(splitKey)

		for (let i = 0; i < score; i++) {
			priority = priority.concat(priority)
		}

		this.priorities.push(priority)

		return this.save()
	},
	async updateRecommends() {
		let features = []
		let keyword = ''
		let counts = {}
		let topPriorities2D = this.priorities.slice(-15)

		topPriorities2D.push(this.priorities[this.priorities.length - 1])
		topPriorities2D.push(this.priorities[this.priorities.length - 1])

		const topPriorities1D = [].concat(...topPriorities2D)

		topPriorities1D.forEach(function(x) {
			counts[x] = (counts[x] || 0) + 1
		})

		for (var key in counts) {
			if (counts.hasOwnProperty(key)) features.push([key, counts[key]])
		}

		features.sort(function(a, b) {
			return b[1] - a[1]
		})

		if (features.length > 15) {
			keyword = features.slice(0, 14).join(' ')
		} else {
			keyword = features.join(' ')
		}

		const movies = await Movie.find(
			{ $text: { $search: keyword } },
			{ score: { $meta: 'textScore' } }
		)
			.sort({ score: { $meta: 'textScore' } })
			.limit(50)

		this.recommends = []
		await Promise.all(
			movies.map(async o => {
				let foundIndex = await this.indexExistHiroty(String(o._id))
				if (foundIndex == -1) {
					await this.recommends.push(o._id)
				}
			})
		)
		return this.save()
	}
}

recommendSchema.pre('save', function(next) {
	return next()
})

recommendSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
recommendSchema.plugin(mongoosePaginate)
recommendSchema.plugin(autopopulate)
recommendSchema.plugin(pluginService.logPost, { schemaName: 'Recommend' })
// recommendSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Recommend' })

export default mongoose.model('Recommend', recommendSchema)
