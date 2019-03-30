/**
 * @typedef samples
 * @property {string} _id
 * @property {string} sampleName
 */

import validator from 'validator'
import * as myValid from './sampleValidation'
import mongoose from 'mongoose'
let Schema = mongoose.Schema
import mongoosePaginate from 'mongoose-paginate'

let sampleSchema = new Schema(
	{
		sampleName: {
			type: String,
			required: [true, 'sampleName is required!'],
			trim: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
)
sampleSchema.plugin(mongoosePaginate)

export default mongoose.model('sample', sampleSchema)
