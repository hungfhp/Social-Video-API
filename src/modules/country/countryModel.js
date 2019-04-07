/* eslint-disable no-unused-vars */
import validator from 'validator'
import mongoose, { Schema } from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import mongoosePaginate from 'mongoose-paginate'
import autopopulate from 'mongoose-autopopulate'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

import * as pluginService from '../../services/pluginService'
import { countryCodeReg } from '../../config/regex'

let countrySchema = new Schema({
	name: {
		type: String,
		required: [true, 'Country name is required!'],
		trim: true
	},
	code: {
		type: String,
		required: [true, 'Country code is required!'],
		uppercase: true,
		minlength: [2, 'Country code must be two characters!'],
		maxlength: [2, 'Country code must be two characters!'],
		unique: true,
		trim: true
	}
})

countrySchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!'
})
countrySchema.plugin(mongoosePaginate)
countrySchema.plugin(autopopulate)
countrySchema.plugin(pluginService.logPost, { schemaName: 'Country' })
countrySchema.plugin(pluginService.setSlugUrl, { schemaName: 'Country' })

export default mongoose.model('Country', countrySchema)
