/* eslint-disable indent */
/* eslint-disable no-undef */
const devConfig = {
	MONGO_URL:
		'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
}

const testConfig = {
	MONGO_URL:
		'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
}

const prodConfig = {
	MONGO_URL:
		'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
}

const defaultConfig = {
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 3000,
	API_PREFIX: '/api',
	JWT_SECRET: 'hihihihihihihi',
	FACEBOOK_APP_ID: '329324544364004',
	FACEBOOK_APP_SECRET: '6521fe7adaa99b2038e728dccfcb0885'
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
