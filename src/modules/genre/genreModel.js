/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'
import * as myValid from './genreValidation'

let genreSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Genre is required!'],
			trim: true,
			unique: true
		},
		slug: {
			type: String,
			trim: true,
			unique: true
		},
		movies: [
			{
				type: ObjectId,
				ref: 'Movie',
				trim: true
			}
		],
		groups: [
			{
				type: ObjectId,
				ref: 'Group',
				trim: true
			}
		]
	},
	{
		timestamps: true
	}
)

genreSchema.pre('save', function(next) {
	this.slug = slugify(this.name, {
		lower: true
	})

	return next()
})

genreSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
genreSchema.plugin(mongoosePaginate)
genreSchema.plugin(autopopulate)
genreSchema.plugin(pluginService.logPost, { schemaName: 'Genre' })

export default mongoose.model('Genre', genreSchema)
