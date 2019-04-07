/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'

import * as myValid from './actorValidation'
let actorSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required!'],
			trim: true
		},
		info: {
			type: String,
			trim: true
		},
		movies: [
			{
				type: ObjectId,
				ref: 'Movie',
				trim: true
			}
		],
		avatarUrl: {
			type: String,
			default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg',
			trim: true
		}
	},
	{
		timestamps: true
	}
)

actorSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
actorSchema.plugin(mongoosePaginate)
actorSchema.plugin(autopopulate)

export default mongoose.model('Actor', actorSchema)
