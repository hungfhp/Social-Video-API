/* eslint-disable no-undef */
const devConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-dev'
}

const testConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-test'
}

const prodConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-prod'
}

const defaultConfig = {
	PORT: process.env.PORT || 3000,
	API_PREFIX: '/api',
	JWT_SECRET: 'hihihihihihihi'
}

function envConfig(env) {
	switch (env) {
	case 'development':
		return devConfig
	case 'test':
		return testConfig
	default:
		return prodConfig
	}
}

export default {
	...defaultConfig,
	...envConfig(process.env.NODE_ENV)
}
