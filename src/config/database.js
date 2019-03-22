import mongoose from 'mongoose'
import constants from './constants'

// Removes the warning with promises
// eslint-disable-next-line no-undef
mongoose.Promise = global.Promise

// Connect the db with the url provided
try {
	mongoose.connect(constants.MONGO_URL)
} catch (err) {
	mongoose.createConnection(constants.MONGO_URL)
}
// eslint-disable-next-line no-console
mongoose.connection
	.once('open', () => console.log('MongoDB Running'))
	.on('error', e => {
		throw e
	})
