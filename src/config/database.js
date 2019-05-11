/* eslint-disable no-console */
import mongoose from 'mongoose'
import constants from './constants'

// Removes the warning with promises
// eslint-disable-next-line no-undef
mongoose.Promise = global.Promise

const options = {
	autoIndex: false,
	useNewUrlParser: true
}
// Connect the db with the url provided
try {
  mongoose.connect(constants.MONGO_URL, options)
} catch (err) {
	mongoose.createConnection(constants.MONGO_URL)
}
mongoose.connection
	.once('open', () => console.log('\tMongoDB Connected'))
	.on('error', e => {
		throw e
	})
