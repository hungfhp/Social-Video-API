module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.genderToNumber = genderToNumber;
exports.log = log;

var _logToFile = __webpack_require__(117);

var _logToFile2 = _interopRequireDefault(_logToFile);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genderToNumber(gender) {
	if (gender == 'male') return 1;
	if (gender == 'female') return 2;
	return 0;
}

function log(message = '', fileName = '') {
	// eslint-disable-next-line no-console
	console.log(`---------------log---------------:\n fileName: ${fileName} \n: message ${message}`);
	let pathFile = `./logs/${fileName || 'default.log'}`;

	_fs2.default.exists(pathFile, function (exists) {
		if (exists) {
			(0, _logToFile2.default)(message, pathFile);
		} else {
			_fs2.default.writeFile(pathFile, '', function () {
				(0, _logToFile2.default)(message, pathFile);
			});
		}
	});

	// eslint-disable-next-line no-console
	console.log('\n');
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-autopopulate");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.accessControl = accessControl;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _accessControlService = __webpack_require__(107);

var _accessControlService2 = _interopRequireDefault(_accessControlService);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function accessControl(access, resource) {
	return function checkPermission(req, res, next) {
		req.permission = _accessControlService2.default.can(req.user.role).execute(access).on(resource);

		if (req.permission.granted) {
			req.body = req.permission.filter(req.body);

			return next();
		} else {
			(0, _helper.log)(`${String(req.user.role).toUpperCase()} ${access} ${resource}`, 'error-role.log');

			return res.status(_httpStatus2.default.FORBIDDEN).json({
				status: 'Not Permission',
				message: `${String(req.user.role).toUpperCase()} can not ${access} ${resource}`
			});
		}
	};
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.logPost = logPost;
exports.setSlugUrl = setSlugUrl;

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logPost(schema, options) {
	schema.post('init', function (doc) {
		// console.log(
		// 	`${options.schemaName || 'Model'}: ${doc.name ||
		// 		doc.title ||
		// 		doc._id} has been initialized`
		// )
	});

	schema.post('validate', function (doc) {
		// console.log(
		// 	`${options.schemaName || 'Model'}: ${doc.name ||
		// 		doc.title ||
		// 		doc._id} has been validated`
		// )
	});

	schema.post('save', function (doc) {
		// console.log(
		// 	`${options.schemaName || 'Model'}: ${doc.name ||
		// 		doc.title ||
		// 		doc._id} has been saved`
		// )
	});

	schema.post('remove', function (doc) {
		// console.log(
		// 	`${options.schemaName || 'Model'}: ${doc.name ||
		// 		doc.title ||
		// 		doc._id} has been removed`
		// )
	});
}

// eslint-disable-next-line no-unused-vars
/* eslint-disable no-console */
function setSlugUrl(schema, options) {
	schema.pre('validate', function (next) {
		if (this.name || this.title) {
			if (schema.paths.slug) {
				this.slug = (0, _slugify2.default)(this.name || this.title, {
					lower: true
				});
			}
			if (schema.paths.url) {
				this.url = `${(0, _slugify2.default)(this.name || this.title, {
					lower: true
				})}_${String(this._id).slice(-6)}`; // ObjectId.valueOf
			}
		}
		let nameOrigin = this.nameOrigin || (this.name || this.title) + `_${String(this._id).slice(-6)}`;
		if (schema.paths.slugOrigin) {
			this.slugOrigin = (0, _slugify2.default)(nameOrigin);
		}
		next();
	});
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable indent */
/* eslint-disable no-undef */
const devConfig = {
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 3000,
	// MONGO_URL: 'mongodb://localhost:27017/gr2019-dev'
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019-dev'
};

const testConfig = {
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 3000,
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019-test'
};

const prodConfig = {
	HOST: process.env.HOST || '43.239.223.206',
	PORT: process.env.PORT || 3000,
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
};

const defaultConfig = {
	API_PREFIX: '/api',
	JWT_SECRET: 'hihihihihihihi',
	FACEBOOK_APP_ID: '329324544364004',
	FACEBOOK_APP_SECRET: '6521fe7adaa99b2038e728dccfcb0885',
	UPLOAD_VBEE_URL: 'https://upload.vbee.vn/api/v1/upload/file',
	UPLOAD_VBEE_TOKEN: '30065a2c-cdf1-4316-8827-488557133f54',
	UPLOAD_FILE_MAX: 10 * 1000000,
	UPLOAD_IMAGE_MAX: 5 * 1000000,
	UPLOAD_MOVIE_MAX: 3000 * 1000000,
	UPLOAD_SUBTITLE_MAX: 10 * 1000000,
	UPLOAD_VOICEOVER_MAX: 200 * 1000000
};

function envConfig(env) {
	switch (env) {
		case 'development':
			return devConfig;
		case 'test':
			return testConfig;
		default:
			return prodConfig;
	}
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseParamList = parseParamList;
async function parseParamList(req, res, next) {
	const limit = parseInt(req.query.limit, 0) || 10;
	const page = parseInt(req.query.page, 0) || 1;
	const offset = parseInt(req.query.offset, 0) || 0;
	const search = String(req.query.search || '');
	const filters = JSON.parse(req.query.filters || '{}');
	const populate = JSON.parse(req.query.populate || '[]');
	const sort = req.query.sort || '-createdAt';

	req.parsedParams = {
		page,
		limit,
		search,
		filters,
		populate,
		sort
	};

	if (offset) {
		req.parsedParams.offset = offset;
	}
	next();
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFloat = __webpack_require__(118);

var _mongooseFloat2 = _interopRequireDefault(_mongooseFloat);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId; // import validator from 'validator'
// import * as myValid from './movieValidation'

const Float = _mongooseFloat2.default.loadType(_mongoose2.default);
// import Actor from '../actor/actorModel'
// import Director from '../director/directorModel'
// import Genre from '../genre/genreModel'

var embedSchema = new _mongoose.Schema({
	resolution: {
		type: Number,
		default: 720
	},
	embedUrl: {
		type: String,
		required: [true, 'Movie file is required!']
	},
	default: {
		type: Boolean,
		default: false
	}
});

var movieSchema = new _mongoose.Schema({
	name: {
		type: String,
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
	imdb: {
		id: {
			type: String,
			trim: true
		},
		ratesAvg: {
			type: Float,
			trim: true
		},
		ratesCount: {
			type: Number,
			trim: true
		}
	},
	duration: {
		type: Number,
		trim: true
	},
	category: {
		type: String,
		enum: ['single', 'series'],
		default: 'single',
		trim: true
	},
	countries: [{
		type: String,
		trim: true
	}],
	uploader: {
		type: ObjectId,
		ref: 'User',
		autopopulate: true,
		required: [true, 'Uploader is required!'],
		// hung-prod
		default: '5c9edb2d6d7b1b2ea07ff3fa',
		trim: true
	},
	embeds: [embedSchema],
	url: {
		type: String,
		unique: true,
		trim: true
	},
	trailerUrl: {
		type: String,
		trim: true
	},
	thumbnails: {
		small: {
			type: String,
			trim: true
		},
		medium: {
			type: String,
			trim: true
		},
		large: {
			type: String,
			trim: true
		}
	},
	photos: [{
		type: String,
		trim: true
	}],
	slug: {
		type: String,
		// unique: true,
		trim: true
	},
	slugOrigin: {
		type: String,
		// unique: true,
		trim: true,
		index: false
	},
	genres: [{
		type: String,
		trim: true
	}],
	status: {
		type: String,
		enum: ['pending', 'updating', 'done'],
		default: 'pending',
		trim: true
	},
	share: {
		type: String,
		enum: ['private', 'friend', 'public'],
		default: 'public',
		trim: true
	},
	releaseDate: {
		type: Date,
		trim: true
	},
	year: {
		type: Number,
		trim: true
	},
	provider: {
		type: Object,
		trim: true
	},
	isAdult: {
		type: Boolean,
		default: false
	},
	subUrl: {
		type: String,
		trim: true
	},
	voiceoverUrl: {
		type: String,
		trim: true
	},
	actors: [{
		type: String,
		trim: true
	}],
	directors: [{
		type: String,
		trim: true
	}],
	quality: {
		type: String,
		enum: ['CAM', 'HD', 'FULL HD'],
		default: 'HD',
		trim: true
	},
	viewsCount: {
		type: Number,
		default: 1,
		trim: true
	},
	likesCount: {
		type: Number,
		default: 0,
		trim: true
	},
	favoritesCount: {
		type: Number,
		default: 0,
		trim: true
	},
	ratesAvg: {
		type: Number,
		default: 5,
		trim: true
	},
	ratesCount: {
		type: Number,
		default: 0,
		trim: true
	}
}, {
	timestamps: true
});

movieSchema.set('autoIndex', true);

movieSchema.index({
	name: 'text',
	nameOrigin: 'text',
	genres: 'text',
	actors: 'text',
	countries: 'text',
	directors: 'text',
	uploader: 'text',
	year: 'text'
});

movieSchema.pre('save', function (next) {
	// if (this.country) {
	// 	this.countries.push(this.country)
	// }
	return next();
});

movieSchema.statics = {
	// views inc
	incViewsCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { viewsCount: 1 } });
	},

	// favorites inc
	incFavoritesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { favoritesCount: 1 } });
	},

	// favorites dec
	decFavoritesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { favoritesCount: -1 } });
	},

	// likes inc
	incLikesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { likesCount: 1 } });
	},

	// likes dec
	decLikesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { likesCount: -1 } });
	},

	// rates inc
	incRatesCount(movieId) {
		return this.findByIdAndUpdate(movieId, { $inc: { ratesCount: 1 } });
	},

	// ratesAvg update
	updateRatesAvg(movieId, ratesAvg) {
		return this.findByIdAndUpdate(movieId, { ratesAvg: ratesAvg });
	}
};

movieSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

movieSchema.plugin(_mongoosePaginate2.default);
movieSchema.plugin(_mongooseAutopopulate2.default);
movieSchema.plugin(pluginService.logPost, { schemaName: 'Movie' });
movieSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Movie' });

exports.default = _mongoose2.default.model('Movie', movieSchema);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addHistory = addHistory;
exports.getRecommendsStats = getRecommendsStats;
exports.getRecommends = getRecommends;
exports.getRecommendsForUser = getRecommendsForUser;
exports.getRecommendById = getRecommendById;
exports.createRecommend = createRecommend;
exports.updateRecommend = updateRecommend;
exports.deleteRecommend = deleteRecommend;

var _recommendModel = __webpack_require__(86);

var _recommendModel2 = _interopRequireDefault(_recommendModel);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _recommendUtil = __webpack_require__(88);

var util = _interopRequireWildcard(_recommendUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


async function addHistory(req, res, next) {
	try {
		if (!req.user._id || !req.body.movieId) {
			next();
		}
		let moive = await _movieModel2.default.findById(req.body.movieId);
		if (!moive) {
			next();
		}

		_recommendModel2.default.addHistory(req.user, moive, req.body.score);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRecommendsStats(req, res, next) {
	try {
		res.recommendsStats = {
			count: await _recommendModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRecommends(req, res, next) {
	try {
		let _ref = await _recommendModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.recommends = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRecommendsForUser(req, res, next) {
	try {
		if (!req.user._id) {
			next();
		}

		const recommends = await _recommendModel2.default.findOne({
			user: req.user.id
		}).populate({
			path: 'recommends',
			options: req.parsedParams
		});

		res.recommends = recommends._doc.recommends;
		res.pagination = { total: res.recommends.length };

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRecommendById(req, res, next) {
	try {
		res.recommend = await _recommendModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createRecommend(req, res, next) {
	try {
		res.recommend = await _recommendModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateRecommend(req, res, next) {
	try {
		let recommend = await _recommendModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			recommend[key] = req.body[key];
		});
		await recommend.save();
		res.recommend = recommend;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteRecommend(req, res, next) {
	try {
		const recommend = await _recommendModel2.default.findById(req.params.id);

		await recommend.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.existFollowMovie = existFollowMovie;
exports.existFollowUser = existFollowUser;
exports.existLike = existLike;
exports.existRate = existRate;
exports.existMember = existMember;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followMovieModel = __webpack_require__(21);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _followUserModel = __webpack_require__(23);

var _followUserModel2 = _interopRequireDefault(_followUserModel);

var _likeModel = __webpack_require__(24);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _rateModel = __webpack_require__(34);

var _rateModel2 = _interopRequireDefault(_rateModel);

var _memberModel = __webpack_require__(25);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function existFollowMovie(req, res, next) {
	try {
		res.followMovie = await _followMovieModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

		if (res.followMovie) {
			return res.status(_httpStatus2.default.OK).json({
				data: res.followMovie
			});
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function existFollowUser(req, res, next) {
	try {
		res.followUser = await _followUserModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

		if (res.followUser) {
			return res.status(_httpStatus2.default.OK).json({
				data: res.followUser
			});
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function existLike(req, res, next) {
	try {
		res.like = await _likeModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

		if (res.like) {
			return res.status(_httpStatus2.default.OK).json({
				data: res.like
			});
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function existRate(req, res, next) {
	try {
		res.rate = await _rateModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

		if (res.rate) {
			return res.status(_httpStatus2.default.OK).json({
				data: res.rate
			});
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function existMember(req, res, next) {
	try {
		res.member = await _memberModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

		if (res.member) {
			return res.status(_httpStatus2.default.OK).json({
				data: res.member
			});
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseParam = parseParam;
async function parseParam(req, res, next) {
	const limit = parseInt(req.query.limit, 0) || 10;
	const page = parseInt(req.query.page, 0) || 0;
	const offset = parseInt(req.query.offset, 0) || 0;
	const sort = String(req.query.sort) || '-createdAt';

	req.parsedParams = {
		limit,
		offset,
		page,
		sort
	};

	next();
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ownMovie = ownMovie;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// update req.movie
async function ownMovie(req, res, next) {
	try {
		req.movie = await _movieModel2.default.findById(req.params.id);

		if (!req.movie.uploader.equals(req.user._id)) {
			return res.sendStatus(_httpStatus2.default.NON_AUTHORITATIVE_INFORMATION);
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let followMovieSchema = new _mongoose.Schema({
	user: {
		type: ObjectId,
		required: [true, 'User is required!'],
		trim: true
	},
	movie: {
		type: ObjectId,
		required: [true, 'Movie is required!'],
		trim: true
	}
}, {
	timestamps: true
});

followMovieSchema.statics = {};

followMovieSchema.pre('save', function (next) {
	return next();
});

followMovieSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
followMovieSchema.plugin(_mongoosePaginate2.default);
followMovieSchema.plugin(_mongooseAutopopulate2.default);
followMovieSchema.plugin(pluginService.logPost, { schemaName: 'FollowMovie' });
followMovieSchema.plugin(pluginService.setSlugUrl, {
	schemaName: 'FollowMovie'
});

exports.default = _mongoose2.default.model('FollowMovie', followMovieSchema);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = __webpack_require__(109);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(39);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(116);

var _lodash2 = _interopRequireDefault(_lodash);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _regex = __webpack_require__(47);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


/**
 * @typedef users
 * @property {string} _id
 * @property {string} email
 * @property {string} name
 * @property {string} email
 * @property {string} name
 * @property {string} email
 * @property {string} name
 * @property {string} password
 */

let userSchema = new _mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required!'],
		trim: true,
		validate: {
			validator(email) {
				return _validator2.default.isEmail(email);
			},
			message: '{VALUE} is not a valid email!'
		}
	},
	password: {
		type: String,
		trim: true,
		minlength: [6, 'Password need to be longer!']
		// validate: {
		// 	validator(password) {
		// 		return passwordReg.test(password)
		// 	},
		// 	message: '{VALUE} is not a valid password!'
		// }
	},
	name: {
		type: String,
		default: 'User',
		trim: true
	},
	url: {
		type: String,
		unique: true,
		trim: true
	},
	provider: {
		type: String,
		trim: true
	},
	social: {
		type: Object,
		trim: true
	},
	gender: {
		type: Number,
		trim: true,
		default: 0
	},
	role: {
		type: String,
		trim: true,
		enum: ['viewer', 'user', 'contributor', 'editer', 'admin', 'superadmin'],
		default: 'user'
	},
	avatarUrl: {
		type: String,
		trim: true,
		default: 'https://png.pngtree.com/svg/20161027/631929649c.png'
	},
	token: {
		type: String,
		trim: true
	},
	uploadedCount: {
		type: Number,
		default: 0,
		trim: true
	}
}, {
	timestamps: true
});

userSchema.set('autoIndex', true);

userSchema.index({
	name: 'text',
	email: 'text',
	gender: 'text'
});

userSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

userSchema.pre('save', function (next) {
	if (this.isModified('password')) {
		this.password = this._hashPassword(this.password);
	}

	return next();
});

userSchema.statics = {
	incUploadedCount(userId) {
		return this.findByIdAndUpdate(userId, { $inc: { uploadedCount: 1 } });
	}
};

userSchema.methods = {
	_hashPassword(password) {
		return (0, _bcryptNodejs.hashSync)(password);
	},
	authenticateUser(password) {
		return (0, _bcryptNodejs.compareSync)(password, this.password);
	},
	createToken() {
		this.token = 'JWT ' + _jsonwebtoken2.default.sign({
			_id: this._id,
			salt: Math.random()
		}, _constants2.default.JWT_SECRET, {
			expiresIn: '60d' // expires in 365 days
		});
		this.save();
	},
	toJSON() {
		return _lodash2.default.pick(this, ['_id', 'email', 'name', 'gender', 'role', 'avatarUrl', 'provider', 'uploadedCount']);
	},
	toAuthJSON() {
		this.createToken();
		return Object.assign({}, this.toJSON(), {
			role: this.role,
			provider: this.provider,
			providerUrl: this.providerUrl,
			token: this.token
			// tokenExpiresAt: this.tokenExpiresAt
			// token: `JWT ${this.createToken()}`
		});
	}
};

userSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

userSchema.plugin(_mongoosePaginate2.default);
userSchema.plugin(_mongooseAutopopulate2.default);
userSchema.plugin(pluginService.logPost, { schemaName: 'User' });
userSchema.plugin(pluginService.setSlugUrl, { schemaName: 'User' });

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let followUserSchema = new _mongoose.Schema({
	user: {
		type: ObjectId,
		required: [true, 'User is required!'],
		trim: true
	},
	follow: {
		type: ObjectId,
		required: [true, 'Follow is required!'],
		trim: true
	}
}, {
	timestamps: true
});

followUserSchema.statics = {};

followUserSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

followUserSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
followUserSchema.plugin(_mongoosePaginate2.default);
followUserSchema.plugin(_mongooseAutopopulate2.default);
followUserSchema.plugin(pluginService.logPost, { schemaName: 'FollowUser' });
followUserSchema.plugin(pluginService.setSlugUrl, { schemaName: 'FollowUser' });

exports.default = _mongoose2.default.model('FollowUser', followUserSchema);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let likeSchema = new _mongoose.Schema({
	movie: {
		type: ObjectId,
		ref: 'Movie',
		required: [true, 'Movie is required!'],
		trim: true
	},
	user: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'User is required!'],
		trim: true
	}
}, {
	timestamps: true
});

likeSchema.statics = {};

likeSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

likeSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
likeSchema.plugin(_mongoosePaginate2.default);
likeSchema.plugin(_mongooseAutopopulate2.default);
likeSchema.plugin(pluginService.logPost, { schemaName: 'Like' });
likeSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Like' });

exports.default = _mongoose2.default.model('Like', likeSchema);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let memberSchema = new _mongoose.Schema({
	group: {
		type: ObjectId,
		ref: 'Group',
		required: [true, 'Group is required!'],
		trim: true
	},
	user: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'User is required!'],
		trim: true
	},
	status: {
		type: String,
		enum: ['checking', 'done', 'block'],
		default: 'checking',
		trim: true
	}
}, {
	timestamps: true
});

memberSchema.statics = {};

memberSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

memberSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
memberSchema.plugin(_mongoosePaginate2.default);
memberSchema.plugin(_mongooseAutopopulate2.default);
memberSchema.plugin(pluginService.logPost, { schemaName: 'Member' });
memberSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Member' });

exports.default = _mongoose2.default.model('Member', memberSchema);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authFacebook = exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(40);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(122);

var _passportFacebook = __webpack_require__(120);

var _passportJwt = __webpack_require__(121);

var _userModel = __webpack_require__(22);

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _helper = __webpack_require__(1);

var _axios = __webpack_require__(28);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
	usernameField: 'email'
};

const localStrategy = new _passportLocal.Strategy(localOpts, async (email, password, done) => {
	try {
		const user = await _userModel2.default.findOne({
			email
		});
		if (!user) {
			return done(null, false);
		} else if (!user.authenticateUser(password)) {
			return done(null, false);
		}
		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

// Jwt strategy
const jwtOpts = {
	jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: _constants2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
	try {
		const user = await _userModel2.default.findById(payload._id);

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	} catch (e) {
		return done(e, false);
	}
});

// Facebook
const fbOpts = {
	clientID: _constants2.default.FACEBOOK_APP_ID,
	clientSecret: _constants2.default.FACEBOOK_APP_SECRET,
	callbackURL: 'http://localhost:3000/api/users/auth/facebook/callback',
	enableProof: true,
	profileFields: ['id', 'displayName', 'email', 'photos', 'gender', 'profileUrl']
};

const facebookStrategy = new _passportFacebook.Strategy(fbOpts, async (accessToken, refreshToken, profile, done) => {
	try {
		const user = await _userModel2.default.findOne({
			email: profile._json.email
		});

		if (user) {
			return done(null, user);
		} else {
			let newUser = new _userModel2.default();
			newUser.fbId = profile.id;
			newUser.name = profile._json.name;
			newUser.gender = (0, _helper.genderToNumber)(profile.gender);
			newUser.email = profile._json.email || profile.id + '@facebook.com';
			newUser.provier = 'facebook';
			if (profile.photos && profile.photos.length && profile.photos[0].value) {
				newUser.avatarUrl = profile.photos[0].value;
			}
			newUser.token = accessToken;

			await newUser.save();
			return done(null, newUser);
		}
	} catch (e) {
		return done(e, false);
	}
});

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);
_passport2.default.use(facebookStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', { session: false });
// export const authFacebook = passport.authenticate('facebook', {
// 	session: false,
// 	display: 'popup'
// })

const authFacebook = exports.authFacebook = async function (access_token) {
	const appLink = 'https://graph.facebook.com/oauth/access_token?client_id=' + _constants2.default.FACEBOOK_APP_ID + '&client_secret=' + _constants2.default.FACEBOOK_APP_SECRET + '&grant_type=client_credentials';

	const app = await _axios2.default.get(appLink);
	const appToken = app && app.data && app.data.access_token;

	const link = 'https://graph.facebook.com/debug_token?input_token=' + access_token + '&access_token=' + appToken;
	const fbAuthUserData = await _axios2.default.get(link);
	const fbAuthUser = fbAuthUserData && fbAuthUserData.data && fbAuthUserData.data.data;

	return fbAuthUser;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploadFile = uploadFile;
exports.uploadFileByUrl = uploadFileByUrl;

var _request = __webpack_require__(30);

var _request2 = _interopRequireDefault(_request);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function uploadFile(path = 'default', overwrite = 'false', file, callback) {
	_request2.default.post({
		url: _constants2.default.UPLOAD_VBEE_URL,
		headers: {
			authorization: _constants2.default.UPLOAD_VBEE_TOKEN
		},
		formData: {
			path: path,
			overwrite: overwrite,
			file: file
		}
	}, (error, res, body) => {
		if (error) {
			throw error;
		}
		callback(JSON.parse(body));
	});
} /* eslint-disable no-console */
async function uploadFileByUrl(path = '/default', overwrite = 'false', fileUrl, callback) {
	_request2.default.post({
		url: _constants2.default.UPLOAD_VBEE_URL,
		headers: {
			authorization: _constants2.default.UPLOAD_VBEE_TOKEN
		},
		formData: {
			path: path,
			overwrite: overwrite,
			file: (0, _request2.default)(fileUrl).on('error', function (err) {
				console.error(err);
			})
		}
	}, (error, res, body) => {
		if (error) {
			throw error;
		}
		callback(JSON.parse(body));
	});
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("multiparty");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let groupSchema = new _mongoose.Schema({
	creator: {
		type: ObjectId,
		ref: 'User',
		autopopulate: true,
		required: [true, 'Creator is required!'],
		trim: true
	},
	name: {
		type: String,
		required: [true, 'Name is required!'],
		trim: true
	},
	slug: {
		type: String,
		trim: true
	},
	url: {
		type: String,
		trim: true
	},
	desc: {
		type: String,
		trim: true
	},
	membersCount: {
		type: Number,
		default: 0,
		trim: true
	},
	requestsCount: {
		type: Number,
		default: 0,
		trim: true
	},
	genres: [{
		type: String,
		required: [true, 'Genre is required!'],
		trim: true
	}],
	posts: [{
		type: ObjectId,
		ref: 'Post',
		trim: true
	}]
}, {
	timestamps: true
});

groupSchema.index({ '$**': 'text' });

groupSchema.statics = {
	incMembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: 1 } });
	},

	decMembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: -1 } });
	},

	incRequestsCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { requestsCount: 1 } });
	},

	decRequestsCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { requestsCount: -1 } });
	}
};

groupSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
groupSchema.plugin(_mongoosePaginate2.default);
groupSchema.plugin(_mongooseAutopopulate2.default);
groupSchema.plugin(pluginService.logPost, { schemaName: 'Group' });
groupSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Group' });

exports.default = _mongoose2.default.model('Group', groupSchema);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let rateSchema = new _mongoose.Schema({
	movie: {
		type: ObjectId,
		required: [true, 'Movie is required!'],
		ref: 'Movie',
		trim: true
	},
	user: {
		type: ObjectId,
		required: [true, 'User is required!'],
		ref: 'User',
		trim: true
	},
	value: {
		type: Number,
		min: 1,
		max: 5,
		required: [true, 'Rate value is required!'],
		ref: 'User',
		trim: true
	}
}, {
	timestamps: true
});

rateSchema.statics = {};

rateSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

rateSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
rateSchema.plugin(_mongoosePaginate2.default);
rateSchema.plugin(_mongooseAutopopulate2.default);
rateSchema.plugin(pluginService.logPost, { schemaName: 'Rate' });
rateSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Rate' });

exports.default = _mongoose2.default.model('Rate', rateSchema);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRequest = createRequest;
exports.acceptRequest = acceptRequest;
exports.rejectRequest = rejectRequest;
exports.removeFriend = removeFriend;
exports.checkStatus = checkStatus;
exports.getRequestsByUserId = getRequestsByUserId;
exports.getFriendsByUserId = getFriendsByUserId;
exports.getRelationshipsStats = getRelationshipsStats;
exports.getRelationships = getRelationships;
exports.getRelationshipById = getRelationshipById;
exports.createRelationship = createRelationship;
exports.updateRelationship = updateRelationship;
exports.deleteRelationship = deleteRelationship;

var _relationshipModel = __webpack_require__(90);

var _relationshipModel2 = _interopRequireDefault(_relationshipModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _relationshipUtil = __webpack_require__(92);

var util = _interopRequireWildcard(_relationshipUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group relationships - Operations about relationships
 *
 */

async function createRequest(req, res, next) {
	try {
		let own = {
			_id: req.body.target
		};
		res.relationship = await _relationshipModel2.default.createRequest(own, req.user);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function acceptRequest(req, res, next) {
	try {
		let request = {
			_id: req.body.target
		};
		res.relationship = await _relationshipModel2.default.acceptRequest(req.user, // user
		request);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function rejectRequest(req, res, next) {
	try {
		let request = {
			_id: req.body.target
		};
		res.relationship = await _relationshipModel2.default.rejectRequest(req.user, // user
		request);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function removeFriend(req, res, next) {
	try {
		let target = {
			_id: req.params.targetId
		};
		res.relationship = await _relationshipModel2.default.removeFriend(req.user, // user
		target);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function checkStatus(req, res, next) {
	try {
		let target = {
			_id: req.params.targetId
		};
		res.relationshipStatus = {
			isRequester: await _relationshipModel2.default.isRequest(req.user, target),
			isFriend: await _relationshipModel2.default.isFriend(req.user, target),
			isRequested: await _relationshipModel2.default.isRequest(target, req.user)
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRequestsByUserId(req, res, next) {
	try {
		let rs = await _relationshipModel2.default.findOne({
			user: req.params.id
		}).populate({
			path: 'requests',
			options: req.parsedParams
		});
		res.requests = rs.requests;
		res.pagination = Object.assign({}, req.parsedParams, {
			page: 'null. Please use limit argument for load more',
			total: rs.requestsCount
		});

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFriendsByUserId(req, res, next) {
	try {
		let rs = await _relationshipModel2.default.findOne({
			user: req.params.id
		}).populate({
			path: 'friends',
			options: req.parsedParams
		});
		res.friends = rs.friends;
		res.pagination = Object.assign({}, req.parsedParams, {
			page: 'null. Please use limit argument for load more',
			total: rs.friendsCount
		});

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRelationshipsStats(req, res, next) {
	try {
		res.relationshipsStats = {
			count: await _relationshipModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRelationships(req, res, next) {
	try {
		let _ref = await _relationshipModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.relationships = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRelationshipById(req, res, next) {
	try {
		res.relationship = await _relationshipModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createRelationship(req, res, next) {
	try {
		res.relationship = await _relationshipModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateRelationship(req, res, next) {
	try {
		let relationship = await _relationshipModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			relationship[key] = req.body[key];
		});
		await relationship.save();
		res.relationship = relationship;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteRelationship(req, res, next) {
	try {
		const relationship = await _relationshipModel2.default.findById(req.params.id);

		await relationship.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkSynthesis = checkSynthesis;
exports.reSynthesis = reSynthesis;
exports.callbackSynthesis = callbackSynthesis;
exports.getVoiceoversStats = getVoiceoversStats;
exports.getVoiceoversByMovie = getVoiceoversByMovie;
exports.getVoiceovers = getVoiceovers;
exports.getVoiceoverById = getVoiceoverById;
exports.createVoiceover = createVoiceover;
exports.updateVoiceover = updateVoiceover;
exports.deleteVoiceover = deleteVoiceover;

var _voiceoverModel = __webpack_require__(105);

var _voiceoverModel2 = _interopRequireDefault(_voiceoverModel);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _synthesisService = __webpack_require__(38);

var synthesisService = _interopRequireWildcard(_synthesisService);

var systhesisService = _interopRequireWildcard(_synthesisService);

var _fileService = __webpack_require__(27);

var fileService = _interopRequireWildcard(_fileService);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _helper = __webpack_require__(1);

var _request = __webpack_require__(30);

var _request2 = _interopRequireDefault(_request);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

var _multiparty = __webpack_require__(29);

var _multiparty2 = _interopRequireDefault(_multiparty);

var _util = __webpack_require__(41);

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable no-unused-vars */


/**
 * @group voiceovers - Operations about voiceovers
 *
 */

async function checkSynthesis(req, res, next) {
	try {
		let voiceoverChecked = await synthesisService.checkSynthesis(req.params.requestId);

		let voiceover = await _voiceoverModel2.default.findOne({
			requestId: voiceoverChecked.requestId
		});
		voiceover = voiceover && voiceover._doc || {};

		if (voiceover.status && voiceover.status !== 'done' && voiceoverChecked && voiceoverChecked.status == 'done') {
			voiceover = Object.assign(voiceover, voiceoverChecked);
			await fileService.uploadFileByUrl('/voiceovers', 'true', voiceoverChecked.downloadUrl, async uploadedFile => {
				voiceover.embedUrl = uploadedFile.url;
				await voiceover.save();
				res.voiceover = Object.assign({}, voiceover, { vbee: voiceoverChecked });
			});
		} else {
			res.voiceover = Object.assign({}, voiceover, { vbee: voiceoverChecked });
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function reSynthesis(req, res, next) {
	try {
		let vbee = await synthesisService.requestResynthesis(req.params.requestId);

		const hour = 60 * 60 * 1000;
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 1 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 2 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 3 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 4 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 6 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(req.params.requestId);
		}, 8 * hour);

		let voiceover = await _voiceoverModel2.default.findOne({
			requestId: req.params.requestId
		});
		voiceover = voiceover && voiceover._doc || {};

		res.voiceover = Object.assign({}, voiceover, { vbee: vbee });
		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function callbackSynthesis(req, res, next) {
	try {
		(0, _helper.log)(JSON.stringify(req.body), 'voiceover-callback.log');
		let synthesised = req.body;

		let voiceover = await _voiceoverModel2.default.findOne({
			requestId: synthesised.requestId
		});
		if (!voiceover) {
			next();
		}
		voiceover.fileFormat = synthesised.fileFormat;
		voiceover.downloadUrl = synthesised.downloadUrl;
		voiceover.status = synthesised.status;

		fileService.uploadFileByUrl('/voiceovers', 'false', synthesised.downloadUrl, async function (uploadedFile) {
			voiceover.embedUrl = uploadedFile.url;
			voiceover.save();
			res.voiceover = voiceover;

			let movie = await _movieModel2.default.findByIdAndUpdate(voiceover.movie, {
				status: synthesised.status,
				voiceoverUrl: uploadedFile.url
			});

			(0, _helper.log)(JSON.stringify(uploadedFile), 'voiceover-callback.log');
		});

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(req.body), 'voiceover-callback.log');
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getVoiceoversStats(req, res, next) {
	try {
		res.voiceoversStats = {
			count: await _voiceoverModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getVoiceoversByMovie(req, res, next) {
	try {
		res.voiceovers = await _voiceoverModel2.default.find({ movie: res.movie });

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getVoiceovers(req, res, next) {
	try {
		let _ref = await _voiceoverModel2.default.paginate(Object.assign({}, req.parsedParams.filters), Object.assign({}, req.parsedParams)),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.voiceovers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getVoiceoverById(req, res, next) {
	try {
		res.voiceover = await _voiceoverModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createVoiceover(req, res, next) {
	try {
		const movie = await _movieModel2.default.findById(req.body.movieId);
		let requestSysthesis = await systhesisService.requestSynthesis(movie.subUrl, req.body.voice || 'hn_male_xuantin_vdts_48k-hsmm');

		const hour = 60 * 60 * 1000;
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 1 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 2 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 3 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 4 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 6 * hour);
		setTimeout(function () {
			systhesisService.callbackSynthesis(requestSysthesis.requestId);
		}, 8 * hour);

		res.voiceover = await _voiceoverModel2.default.create({
			requestId: requestSysthesis.requestId,
			movie,
			uploader: req.user || '',
			name: req.body.name
		});
		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateVoiceover(req, res, next) {
	try {
		let voiceover = await _voiceoverModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			voiceover[key] = req.body[key];
		});
		await voiceover.save();
		res.voiceover = voiceover;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteVoiceover(req, res, next) {
	try {
		const voiceover = await _voiceoverModel2.default.findById(req.params.id);

		await voiceover.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	checkSynthesis: {
		params: {
			requestId: _joi2.default.string().required()
		}
	},
	upload: {
		body: {
			file: _joi2.default.any().required()
		}
	},
	callbackSynthesis: {},
	stats: {},
	index: {},
	show: {},
	create: {
		body: {
			movieId: _joi2.default.string().required(),
			voice: _joi2.default.string().required().valid('hn_male_xuantin_vdts_48k-hsmm', 'hn_female_xuanthu_news_48k-hsmm', 'sg_male_xuankien_vdts_48k-hsmm', 'hn_female_thutrang_phrase_48k-hsmm', 'sg_female_xuanhong_vdts_48k-hsmm', 'sg_male_minhhoang_dial_48k-hsmm', 'sg_female_thaotrinh_dialog_48k-hsmm')
		}
	},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.requestSynthesis = requestSynthesis;
exports.requestResynthesis = requestResynthesis;
exports.checkSynthesis = checkSynthesis;
exports.callbackSynthesis = callbackSynthesis;

var _axios = __webpack_require__(28);

var _axios2 = _interopRequireDefault(_axios);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _voiceoverModel = __webpack_require__(105);

var _voiceoverModel2 = _interopRequireDefault(_voiceoverModel);

var _fileService = __webpack_require__(27);

var fileService = _interopRequireWildcard(_fileService);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import HTTPStatus from 'http-status'
async function requestSynthesis(subtitle_url, voice = 'hn_male_xuantin_vdts_48k-hsmm') {
	let url = 'http://api-thuyetminhphim.vbee.vn/synthesis';
	let callback = 'http://api-social.thuyetminhphim.com/api/voiceovers/callback';
	return await _axios2.default.get(url, {
		params: { callback, subtitle_url, voice }
	}).then(function (response) {
		return response.data;
	}).catch(function (e) {
		console.log('error', e);
		throw e;
	});
} /* eslint-disable no-console */
async function requestResynthesis(requestId) {
	return await _axios2.default.get('http://api-thuyetminhphim.vbee.vn/resynthesis', {
		params: {
			request_id: requestId
		}
	}).then(function (response) {
		return response.data;
	}).catch(function (e) {
		console.log('error', e);
		throw e;
	});
}

async function checkSynthesis(requestId) {
	return await _axios2.default.get('http://api-thuyetminhphim.vbee.vn/check', {
		params: {
			request_id: requestId
		}
	}).then(function (response) {
		return response.data;
	}).catch(function (e) {
		// eslint-disable-next-line no-console
		console.log('error', e);
		throw e;
	});
}

async function callbackSynthesis(requestId) {
	let synthesised = await checkSynthesis(requestId);
	let voiceover = await _voiceoverModel2.default.findOne({
		requestId: synthesised.requestId
	});
	if (!voiceover) {
		console.log(synthesised);
		return { vbee: synthesised };
	}

	if (voiceover.status && voiceover.status !== 'done' && synthesised && synthesised.status == 'done') {
		voiceover = Object.assign(voiceover, synthesised);
		await fileService.uploadFileByUrl('/voiceovers', 'true', synthesised.downloadUrl, async function (uploadedFile) {
			voiceover.embedUrl = uploadedFile.url;
			voiceover.save();

			_movieModel2.default.findByIdAndUpdate(voiceover.movie, {
				status: synthesised.status,
				voiceoverUrl: uploadedFile.url
			});

			(0, _helper.log)(JSON.stringify(voiceover), 'voiceover-callback.log');
			return voiceover;
		});
	}
	// voiceover.fileFormat = synthesised.fileFormat
	// voiceover.downloadUrl = synthesised.downloadUrl
	// voiceover.status = synthesised.status
}

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the warning with promises
// eslint-disable-next-line no-undef
/* eslint-disable no-console */
_mongoose2.default.Promise = global.Promise;

const options = {
	autoIndex: false,
	useNewUrlParser: true
	// Connect the db with the url provided
};try {
	_mongoose2.default.connect(_constants2.default.MONGO_URL, options);
} catch (err) {
	_mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}
_mongoose2.default.connection.once('open', () => console.log('\tMongoDB Connected')).on('error', e => {
	throw e;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _morgan = __webpack_require__(119);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(110);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(111);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(115);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(40);

var _passport2 = _interopRequireDefault(_passport);

var _cors = __webpack_require__(113);

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = __webpack_require__(112);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'; /* eslint-disable no-undef */

const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
	if (isProd) {
		app.use((0, _compression2.default)());
		app.use((0, _helmet2.default)());
	}
	app.use(_bodyParser2.default.json());

	app.use((0, _cookieParser2.default)());

	app.use((0, _cors2.default)());

	app.use(_bodyParser2.default.urlencoded({
		extended: true
	}));
	app.use(_passport2.default.initialize());

	if (isDev) {
		app.use((0, _morgan2.default)('dev'));
	}
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _authMiddleware = __webpack_require__(49);

var _followMovieRoute = __webpack_require__(52);

var _followMovieRoute2 = _interopRequireDefault(_followMovieRoute);

var _followUserRoute = __webpack_require__(56);

var _followUserRoute2 = _interopRequireDefault(_followUserRoute);

var _relationshipRoute = __webpack_require__(91);

var _relationshipRoute2 = _interopRequireDefault(_relationshipRoute);

var _subRoute = __webpack_require__(96);

var _subRoute2 = _interopRequireDefault(_subRoute);

var _genreRoute = __webpack_require__(61);

var _genreRoute2 = _interopRequireDefault(_genreRoute);

var _groupRoute = __webpack_require__(64);

var _groupRoute2 = _interopRequireDefault(_groupRoute);

var _likeRoute = __webpack_require__(68);

var _likeRoute2 = _interopRequireDefault(_likeRoute);

var _memberRoute = __webpack_require__(72);

var _memberRoute2 = _interopRequireDefault(_memberRoute);

var _movieRoute = __webpack_require__(76);

var _movieRoute2 = _interopRequireDefault(_movieRoute);

var _postRoute = __webpack_require__(80);

var _postRoute2 = _interopRequireDefault(_postRoute);

var _rateRoute = __webpack_require__(83);

var _rateRoute2 = _interopRequireDefault(_rateRoute);

var _recommendRoute = __webpack_require__(87);

var _recommendRoute2 = _interopRequireDefault(_recommendRoute);

var _uploadRoute = __webpack_require__(100);

var _uploadRoute2 = _interopRequireDefault(_uploadRoute);

var _userRoute = __webpack_require__(103);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _voiceoverRoute = __webpack_require__(106);

var _voiceoverRoute2 = _interopRequireDefault(_voiceoverRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
	app.use(_authMiddleware.getUser);
	// app.use(con.API_PREFIX + '/actors', actorRoute)
	// app.use(con.API_PREFIX + '/countries', countryRoute)
	// app.use(con.API_PREFIX + '/directors', directorRoute)
	app.use(_constants2.default.API_PREFIX + '/follows/movies', _followMovieRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/follows/users', _followUserRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/relationships', _relationshipRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/subs', _subRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/genres', _genreRoute2.default);
	// app.use(con.API_PREFIX + '/groups', groupRoute)
	app.use(_constants2.default.API_PREFIX + '/likes', _likeRoute2.default);
	// app.use(con.API_PREFIX + '/members', memberRoute)
	// app.use(con.API_PREFIX + '/posts', postRoute)
	app.use(_constants2.default.API_PREFIX + '/movies', _movieRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/rates', _rateRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/recommends', _recommendRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/upload', _uploadRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/users', _userRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/voiceovers', _voiceoverRoute2.default);
};
// ((following)|(followers)|(actor)|(actors)|(country)|(countries)|(director)|(directors)|(genre)|(genres)|(group)|(groups)|(like)|(likes)|(member)|(members)|(movie)|(movies)|(post)|(posts)|(rate)|(rates)|(user)|(users)|(voiceover)|(voiceovers)|(followMovie)|(followUser)): res.
// import actorRoute from './actor/actorRoute'
// import countryRoute from './country/countryRoute'
// import directorRoute from './director/directorRoute'
/* eslint-disable no-console */

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("express-list-endpoints");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(42);

var _middleware = __webpack_require__(43);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(44);

var _modules2 = _interopRequireDefault(_modules);

var _expressListEndpoints = __webpack_require__(45);

var _expressListEndpoints2 = _interopRequireDefault(_expressListEndpoints);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
// import fileUpload from 'express-fileupload'

// import path from 'path'

(0, _middleware2.default)(app);

// default options
// app.use(fileUpload())

app.get('/', (req, res) => {
	res.send('Welcome!');
});

app.use('/logs', _express2.default.static('./logs', {
	maxAge: '30d',
	immutable: true
}));

app.get('/logs', async (req, res) => {
	await _fs2.default.readdir('./logs', function (err, files) {
		if (err) {
			res.send('Unable to scan directory: ' + err);
		}
		res.send(files);
	});
});

app.get('/api', (req, res) => {
	res.send((0, _expressListEndpoints2.default)(app));
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
	if (err) {
		throw err;
	} else {
		// eslint-disable-next-line no-console
		console.log(`\tRunning on ${_constants2.default.HOST}:${_constants2.default.PORT}`);
	}
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const countryCodeReg = exports.countryCodeReg = /^\w{2}$/;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = [{ name: 'Hài Hước' }, { name: 'Viễn Tưởng' }, { name: 'Hành Động' }, { name: 'Phiêu Lưu' }, { name: 'Tâm Lý' }, { name: 'Hình Sự' }, { name: 'Kinh Dị' }, { name: 'Điện Ảnh' }, { name: 'Âm Nhạc' }, { name: 'Khoa học Tài liệu' }, { name: 'Võ Thuật' }, { name: 'Chiến Tranh' }, { name: 'Hoạt Hình' }, { name: 'Thần Thoại' }, { name: 'Cổ Trang' }, { name: 'Thuyết Minh' }, { name: 'Thiếu nhi' }, { name: 'Hài Việt' }, { name: 'TV Show' }];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUser = getUser;

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _jsonwebtoken = __webpack_require__(39);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = __webpack_require__(22);

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getUser(req, res, next) {
	req.user = {};
	await _jsonwebtoken2.default.verify(extractToken(req.headers.authorization), _constants2.default.JWT_SECRET, async function (err, decoded) {
		if (err) {
			req.user = {
				role: 'viewer'
			};
			next();
		} else {
			const user = await _userModel2.default.findById(decoded._id);
			req.user = user;
			req.token = req.headers.authorization;
			next();
		}
	});
}

function extractToken(authorization = '') {
	return authorization.split(' ')[1];
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseForm = parseForm;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _helper = __webpack_require__(1);

var _multiparty = __webpack_require__(29);

var _multiparty2 = _interopRequireDefault(_multiparty);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function parseForm(req, res, next) {
	try {
		var form = new _multiparty2.default.Form();

		form.parse(req, function () {});

		form.on('file', function (name, file) {
			req.file = file;
			req.params.size = file.size;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}
// import Movie from '../modules/movie/movieModel'

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFollowing = getFollowing;
exports.getFollowers = getFollowers;
exports.getFollowMoviesStats = getFollowMoviesStats;
exports.getFollowMovies = getFollowMovies;
exports.getFollowMovieById = getFollowMovieById;
exports.createFollowMovie = createFollowMovie;
exports.updateFollowMovie = updateFollowMovie;
exports.deleteFollowMovie = deleteFollowMovie;

var _followMovieModel = __webpack_require__(21);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followMovieUtil = __webpack_require__(53);

var util = _interopRequireWildcard(_followMovieUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group followMovies - Operations about followMovies
 *
 */

async function getFollowing(req, res, next) {
	try {
		let _ref = await _followMovieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { user: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'movie',
				model: 'Movie'
			}]
		})),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.following = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowers(req, res, next) {
	try {
		let _ref2 = await _followMovieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { movie: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}]
		})),
		    { docs } = _ref2,
		    pagination = _objectWithoutProperties(_ref2, ['docs']);

		res.followers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowMoviesStats(req, res, next) {
	try {
		res.followMoviesStats = {
			count: await _followMovieModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowMovies(req, res, next) {
	try {
		let _ref3 = await _followMovieModel2.default.paginate(Object.assign({}, req.parsedParams.filters), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}, {
				path: 'movie',
				model: 'Movie'
			}]
		})),
		    { docs } = _ref3,
		    pagination = _objectWithoutProperties(_ref3, ['docs']);

		res.followMovies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowMovieById(req, res, next) {
	try {
		res.followMovie = await _followMovieModel2.default.findById(req.params.id).populate([{
			path: 'user',
			model: 'User'
		}, {
			path: 'movie',
			model: 'Movie'
		}]);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createFollowMovie(req, res, next) {
	try {
		res.followMovie = await _followMovieModel2.default.create(Object.assign({}, req.body, {
			user: req.user
		}));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateFollowMovie(req, res, next) {
	try {
		let followMovie = await _followMovieModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			followMovie[key] = req.body[key];
		});
		await followMovie.save();
		res.followMovie = followMovie;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteFollowMovie(req, res, next) {
	try {
		const followMovie = await _followMovieModel2.default.findById(req.params.id);

		await followMovie.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followMovieController = __webpack_require__(51);

var followMovieController = _interopRequireWildcard(_followMovieController);

var _followMovieValidation = __webpack_require__(54);

var _followMovieValidation2 = _interopRequireDefault(_followMovieValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _existMiddleware = __webpack_require__(18);

var _recommendController = __webpack_require__(16);

var recommendController = _interopRequireWildcard(_recommendController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getFollowMoviesStats
 * GET /items => getFollowMovies
 * GET /items/:id => getFollowMovieById
 * POST /items/ => createFollowMovie
 * PATCH/PUT /items/:id => updateFollowMovie
 * DELETE /items/:id => deleteFollowMovie
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/following/:id', (0, _expressValidation2.default)(_followMovieValidation2.default.following), paramMiddleware.parseParamList, followMovieController.getFollowing, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.following,
		pagination: res.pagination
	});
}).get('/followers/:id', (0, _expressValidation2.default)(_followMovieValidation2.default.followers), paramMiddleware.parseParamList, followMovieController.getFollowers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followers,
		pagination: res.pagination
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_followMovieValidation2.default.stats), followMovieController.getFollowMoviesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		followMoviesStats: res.followMoviesStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'followMovie'), paramMiddleware.parseParamList, (0, _expressValidation2.default)(_followMovieValidation2.default.index), followMovieController.getFollowMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		followMovies: res.followMovies,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_followMovieValidation2.default.show), followMovieController.getFollowMovieById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followMovie
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'followMovie'), (0, _expressValidation2.default)(_followMovieValidation2.default.create), _existMiddleware.existFollowMovie, followMovieController.createFollowMovie, function (req, res, next) {
	req.body.movieId = res.followMovie && res.followMovie.movie;
	req.body.score = 4;
	next();
}, recommendController.addHistory, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followMovie
	});
})
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'followMovie'),
// 	validate(followMovieValidation.update),
// 	followMovieController.updateFollowMovie,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.followMovie
// 		})
// 	}
// )
.delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'followMovie'), (0, _expressValidation2.default)(_followMovieValidation2.default.delete), followMovieController.deleteFollowMovie, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	following: {
		params: {
			id: _joi2.default.string().required()
		}
	},
	followers: {
		params: {
			id: _joi2.default.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFollowing = getFollowing;
exports.getFollowers = getFollowers;
exports.getFollowUsersStats = getFollowUsersStats;
exports.getFollowUsers = getFollowUsers;
exports.getFollowUserById = getFollowUserById;
exports.createFollowUser = createFollowUser;
exports.updateFollowUser = updateFollowUser;
exports.deleteFollowUser = deleteFollowUser;

var _followUserModel = __webpack_require__(23);

var _followUserModel2 = _interopRequireDefault(_followUserModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followUserUtil = __webpack_require__(57);

var util = _interopRequireWildcard(_followUserUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group followUsers - Operations about followUsers
 *
 */

async function getFollowing(req, res, next) {
	try {
		let _ref = await _followUserModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { user: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'follow',
				model: 'User'
			}]
		})),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.following = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowers(req, res, next) {
	try {
		let _ref2 = await _followUserModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { follow: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}]
		})),
		    { docs } = _ref2,
		    pagination = _objectWithoutProperties(_ref2, ['docs']);

		res.followers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowUsersStats(req, res, next) {
	try {
		res.followUsersStats = {
			count: await _followUserModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowUsers(req, res, next) {
	try {
		let _ref3 = await _followUserModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref3,
		    pagination = _objectWithoutProperties(_ref3, ['docs']);

		res.followUsers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowUserById(req, res, next) {
	try {
		res.followUser = await _followUserModel2.default.findById(req.params.id).populate([{
			path: 'user',
			model: 'User'
		}, {
			path: 'follow',
			model: 'User'
		}]);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createFollowUser(req, res, next) {
	try {
		res.followUser = await _followUserModel2.default.create(Object.assign({}, req.body, {
			user: req.user
		}));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateFollowUser(req, res, next) {
	try {
		let followUser = await _followUserModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			followUser[key] = req.body[key];
		});
		await followUser.save();
		res.followUser = followUser;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteFollowUser(req, res, next) {
	try {
		const followUser = await _followUserModel2.default.findById(req.params.id);

		await followUser.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followUserController = __webpack_require__(55);

var followUserController = _interopRequireWildcard(_followUserController);

var _followUserValidation = __webpack_require__(58);

var _followUserValidation2 = _interopRequireDefault(_followUserValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _existMiddleware = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => getFollowUsersStats
 * GET /items => getFollowUsers
 * GET /items/:id => getFollowUserById
 * POST /items/ => createFollowUser
 * PATCH/PUT /items/:id => updateFollowUser
 * DELETE /items/:id => deleteFollowUser
 */

// More router
router.get('/following/:id', (0, _expressValidation2.default)(_followUserValidation2.default.following), paramMiddleware.parseParamList, followUserController.getFollowing, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.following,
		pagination: res.pagination
	});
}).get('/followers/:id', (0, _expressValidation2.default)(_followUserValidation2.default.followers), paramMiddleware.parseParamList, followUserController.getFollowers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followers,
		pagination: res.pagination
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_followUserValidation2.default.stats), followUserController.getFollowUsersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followUsersStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'movie'), paramMiddleware.parseParamList, (0, _expressValidation2.default)(_followUserValidation2.default.index), followUserController.getFollowUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followUsers,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_followUserValidation2.default.show), followUserController.getFollowUserById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followUser
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'movie'), (0, _expressValidation2.default)(_followUserValidation2.default.create), _existMiddleware.existFollowUser, followUserController.createFollowUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followUser
	});
})
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'movie'),
// 	validate(followUserValidation.update),
// 	followUserController.updateFollowUser,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.followUser
// 		})
// 	}
// )
.delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'movie'), (0, _expressValidation2.default)(_followUserValidation2.default.delete), followUserController.deleteFollowUser, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	following: {
		params: {
			id: _joi2.default.string().required()
		}
	},
	followers: {
		params: {
			id: _joi2.default.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initGenres = initGenres;
exports.getGenresStats = getGenresStats;
exports.getGenres = getGenres;
exports.getGenreById = getGenreById;
exports.createGenre = createGenre;
exports.updateGenre = updateGenre;
exports.deleteGenre = deleteGenre;

var _genreModel = __webpack_require__(60);

var _genreModel2 = _interopRequireDefault(_genreModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _genreUtil = __webpack_require__(62);

var util = _interopRequireWildcard(_genreUtil);

var _helper = __webpack_require__(1);

var _genres = __webpack_require__(48);

var _genres2 = _interopRequireDefault(_genres);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group genres - Operations about genres
 *
 */

async function initGenres(req, res, next) {
	try {
		await _genreModel2.default.deleteMany();
		await _genreModel2.default.insertMany(_genres2.default);
		res.genres = _genres2.default;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGenresStats(req, res, next) {
	try {
		res.genresStats = {
			count: await _genreModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGenres(req, res, next) {
	try {
		let _ref = await _genreModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.genres = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGenreById(req, res, next) {
	try {
		res.genre = await _genreModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createGenre(req, res, next) {
	try {
		res.genre = await _genreModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateGenre(req, res, next) {
	try {
		let genre = await _genreModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			genre[key] = req.body[key];
		});
		await genre.save();
		res.genre = genre;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteGenre(req, res, next) {
	try {
		const genre = await _genreModel2.default.findById(req.params.id);

		await genre.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _genreValidation = __webpack_require__(31);

var myValid = _interopRequireWildcard(_genreValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let genreSchema = new _mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Genre name is required!'],
		trim: true,
		unique: true
	},
	slug: {
		type: String,
		required: [true, 'Genre slug is required!'],
		trim: true,
		unique: true
	},
	url: {
		type: String,
		required: [true, 'Genre url is required!'],
		trim: true,
		unique: true
	}
}, {
	timestamps: true
});

genreSchema.pre('save', function (next) {
	return next();
});

genreSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
genreSchema.plugin(_mongoosePaginate2.default);
genreSchema.plugin(_mongooseAutopopulate2.default);
genreSchema.plugin(pluginService.logPost, { schemaName: 'Genre' });
genreSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Genre' });

exports.default = _mongoose2.default.model('Genre', genreSchema);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _genreController = __webpack_require__(59);

var genreController = _interopRequireWildcard(_genreController);

var _genreValidation = __webpack_require__(31);

var _genreValidation2 = _interopRequireDefault(_genreValidation);

var _authService = __webpack_require__(26);

var authService = _interopRequireWildcard(_authService);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getGenresStats
 * GET /items => getGenres
 * GET /items/:id => getGenreById
 * POST /items/ => createGenre
 * PATCH/PUT /items/:id => updateGenre
 * DELETE /items/:id => deleteGenre
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/init', authService.authJwt, genreController.initGenres, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.genres
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_genreValidation2.default.stats), genreController.getGenresStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genresStats: res.genresStats
	});
}).get('/', (0, _expressValidation2.default)(_genreValidation2.default.index), paramMiddleware.parseParamList, genreController.getGenres, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.genres,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_genreValidation2.default.show), genreController.getGenreById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.genre
	});
}).post('/', (0, _expressValidation2.default)(_genreValidation2.default.create), genreController.createGenre, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.genre
	});
}).put('/:id', (0, _expressValidation2.default)(_genreValidation2.default.update), genreController.updateGenre, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.genre
	});
}).delete('/:id', (0, _expressValidation2.default)(_genreValidation2.default.delete), genreController.deleteGenre, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.searchGroups = searchGroups;
exports.getSuggestGroups = getSuggestGroups;
exports.getGroupsStats = getGroupsStats;
exports.getGroups = getGroups;
exports.getGroupById = getGroupById;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;

var _groupModel = __webpack_require__(32);

var _groupModel2 = _interopRequireDefault(_groupModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _groupUtil = __webpack_require__(65);

var util = _interopRequireWildcard(_groupUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group groups - Operations about groups
 *
 */

async function searchGroups(req, res, next) {
	try {
		_groupModel2.default.find({ $text: { $search: 'p' } }).limit(10).exec(function (err, docs) {
			if (err) {
				res.json(err);
			} else {
				res.groups = docs;
				next();
			}
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getSuggestGroups(req, res, next) {
	try {
		let suggests = [{ membersCount: 'desc' }, { requestsCount: 'desc' }, { createdAt: 'desc' }];
		let sort = suggests[Math.floor(Math.random() * suggests.length)];

		let _ref = await _groupModel2.default.paginate(Object.assign({}, req.parsedParams.filters), Object.assign({}, req.parsedParams, { sort: sort })),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.groups = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroupsStats(req, res, next) {
	try {
		res.groupsStats = {
			count: await _groupModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroups(req, res, next) {
	try {
		let _ref2 = await _groupModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref2,
		    pagination = _objectWithoutProperties(_ref2, ['docs']);

		res.groups = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroupById(req, res, next) {
	try {
		res.group = await _groupModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createGroup(req, res, next) {
	try {
		res.group = await _groupModel2.default.create(Object.assign({}, req.body, {
			creator: req.user
		}));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateGroup(req, res, next) {
	try {
		let group = await _groupModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			group[key] = req.body[key];
		});
		await group.save();
		res.group = group;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteGroup(req, res, next) {
	try {
		const group = await _groupModel2.default.findById(req.params.id);

		await group.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _groupController = __webpack_require__(63);

var groupController = _interopRequireWildcard(_groupController);

var _groupValidation = __webpack_require__(66);

var _groupValidation2 = _interopRequireDefault(_groupValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(20);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => getGroupsStats
 * GET /items => getGroups
 * GET /items/:id => getGroupById
 * POST /items/ => createGroup
 * PATCH/PUT /items/:id => updateGroup
 * DELETE /items/:id => deleteGroup
 */

// More router
router.get('/suggest', (0, _roleMiddleware.accessControl)('readAny', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.index), paramMiddleware.parseParamList, groupController.getSuggestGroups, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.groups,
		pagination: res.pagination
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_groupValidation2.default.stats), groupController.getGroupsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		groupsStats: res.groupsStats
	});
}).get('/search', (0, _roleMiddleware.accessControl)('readAny', 'movie'), groupController.searchGroups, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.groups
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.index), paramMiddleware.parseParamList, groupController.getGroups, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.groups,
		pagination: res.pagination
	});
}).get('/:id', (0, _roleMiddleware.accessControl)('readOwn', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.show), groupController.getGroupById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.group
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.create), groupController.createGroup, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.group
	});
}).put('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.update), groupController.updateGroup, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.group
	});
}).delete('/:id', (0, _roleMiddleware.accessControl)('updateOwn', 'group'), (0, _expressValidation2.default)(_groupValidation2.default.delete), groupController.deleteGroup, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getLikesStats = getLikesStats;
exports.getLikes = getLikes;
exports.getLikeById = getLikeById;
exports.createLike = createLike;
exports.updateLike = updateLike;
exports.deleteLike = deleteLike;

var _likeModel = __webpack_require__(24);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _likeUtil = __webpack_require__(69);

var util = _interopRequireWildcard(_likeUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group likes - Operations about likes
 *
 */

async function getLikesStats(req, res, next) {
	try {
		res.likesStats = {
			count: await _likeModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getLikes(req, res, next) {
	try {
		let _ref = await _likeModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.likes = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getLikeById(req, res, next) {
	try {
		res.like = await _likeModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createLike(req, res, next) {
	try {
		res.like = await _likeModel2.default.create(Object.assign({}, req.body, {
			user: req.user
		}));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateLike(req, res, next) {
	try {
		let like = await _likeModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			like[key] = req.body[key];
		});
		await like.save();
		res.like = like;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteLike(req, res, next) {
	try {
		const like = await _likeModel2.default.findById(req.params.id);

		await like.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _likeController = __webpack_require__(67);

var likeController = _interopRequireWildcard(_likeController);

var _likeValidation = __webpack_require__(70);

var _likeValidation2 = _interopRequireDefault(_likeValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _existMiddleware = __webpack_require__(18);

var _recommendController = __webpack_require__(16);

var recommendController = _interopRequireWildcard(_recommendController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getLikesStats
 * GET /items => getLikes
 * GET /items/:id => getLikeById
 * POST /items/ => createLike
 * PATCH/PUT /items/:id => updateLike
 * DELETE /items/:id => deleteLike
 */

// More router

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_likeValidation2.default.stats), likeController.getLikesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		likesStats: res.likesStats
	});
}).get('/', (0, _expressValidation2.default)(_likeValidation2.default.index), paramMiddleware.parseParamList, likeController.getLikes, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.likes,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_likeValidation2.default.show), likeController.getLikeById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.like
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'like'), (0, _expressValidation2.default)(_likeValidation2.default.create), _existMiddleware.existLike, likeController.createLike, function (req, res, next) {
	req.body.movieId = res.like && res.like.movie;
	req.body.score = 4;
	next();
}, recommendController.addHistory, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.like
	});
}).put('/:id', (0, _expressValidation2.default)(_likeValidation2.default.update), likeController.updateLike, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.like
	});
}).delete('/:id', (0, _expressValidation2.default)(_likeValidation2.default.delete), likeController.deleteLike, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMembersStats = getMembersStats;
exports.getMembers = getMembers;
exports.getMemberById = getMemberById;
exports.createMember = createMember;
exports.updateMember = updateMember;
exports.deleteMember = deleteMember;

var _memberModel = __webpack_require__(25);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _memberUtil = __webpack_require__(73);

var util = _interopRequireWildcard(_memberUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group members - Operations about members
 *
 */

async function getMembersStats(req, res, next) {
	try {
		res.membersStats = {
			count: await _memberModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMembers(req, res, next) {
	try {
		let _ref = await _memberModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.members = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMemberById(req, res, next) {
	try {
		res.member = await _memberModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createMember(req, res, next) {
	try {
		res.member = await _memberModel2.default.create(Object.assign({}, req.body, {
			user: req.user
		}));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateMember(req, res, next) {
	try {
		let member = await _memberModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			member[key] = req.body[key];
		});
		await member.save();
		res.member = member;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteMember(req, res, next) {
	try {
		const member = await _memberModel2.default.findById(req.params.id);

		await member.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _memberController = __webpack_require__(71);

var memberController = _interopRequireWildcard(_memberController);

var _memberValidation = __webpack_require__(74);

var _memberValidation2 = _interopRequireDefault(_memberValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _existMiddleware = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => getMembersStats
 * GET /items => getMembers
 * GET /items/:id => getMemberById
 * POST /items/ => createMember
 * PATCH/PUT /items/:id => updateMember
 * DELETE /items/:id => deleteMember
 */

// More router

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_memberValidation2.default.stats), memberController.getMembersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		membersStats: res.membersStats
	});
}).get('/', (0, _expressValidation2.default)(_memberValidation2.default.index), paramMiddleware.parseParamList, memberController.getMembers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.members,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_memberValidation2.default.show), memberController.getMemberById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.member
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'member'), (0, _expressValidation2.default)(_memberValidation2.default.create), _existMiddleware.existMember, memberController.createMember, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.member
	});
}).put('/:id', (0, _roleMiddleware.accessControl)('updateOwn', 'member'), (0, _expressValidation2.default)(_memberValidation2.default.update), memberController.updateMember, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.member
	});
}).delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'member'), (0, _expressValidation2.default)(_memberValidation2.default.delete), memberController.deleteMember, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.searchMovies = searchMovies;
exports.initMovies = initMovies;
exports.getSuggestMovies = getSuggestMovies;
exports.getFollowerMovies = getFollowerMovies;
exports.getMoviesStats = getMoviesStats;
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.createMovie = createMovie;
exports.updateMovieByVoiceover = updateMovieByVoiceover;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _userModel = __webpack_require__(22);

var _userModel2 = _interopRequireDefault(_userModel);

var _followMovieModel = __webpack_require__(21);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movies = __webpack_require__(108);

var _movies2 = _interopRequireDefault(_movies);

var _helper = __webpack_require__(1);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable no-unused-vars */


var movieSchema = _mongoose2.default.model('Movie').schema;

/**
 * @group movies - Operations about movies
 *
 */

async function searchMovies(req, res, next) {
	try {
		res.movies = await _movieModel2.default.find({ $text: { $search: req.parsedParams.search } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(req.parsedParams.limit);

		res.pagination = Object.assign({}, req.parsedParams, {
			sort: 'textScore',
			total: req.parsedParams.limit
		});

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function initMovies(req, res, next) {
	try {
		await _movieModel2.default.deleteMany();
		await _movieModel2.default.insertMany(_movies2.default);
		res.movies = _movies2.default;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getSuggestMovies(req, res, next) {
	try {
		let suggests = [{ viewsCount: 'desc' }, { likesCount: 'desc' }, { favoritesCount: 'desc' }, { ratesAvg: 'desc' }, { ratesCount: 'desc' }];
		let sort = suggests[Math.floor(Math.random() * suggests.length)];

		let _ref = await _movieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { share: 'public' }), Object.assign({}, req.parsedParams, { sort: sort })),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.movies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowerMovies(req, res, next) {
	try {
		let _ref2 = await _followMovieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { movie: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}]
		})),
		    { docs } = _ref2,
		    pagination = _objectWithoutProperties(_ref2, ['docs']);

		res.followers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMoviesStats(req, res, next) {
	try {
		res.moviesStats = {
			count: await _movieModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMovies(req, res, next) {
	try {
		let _ref3 = await _movieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { share: 'public' }), req.parsedParams),
		    { docs } = _ref3,
		    pagination = _objectWithoutProperties(_ref3, ['docs']);

		res.movies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMovieById(req, res, next) {
	try {
		res.movie = await _movieModel2.default.incViewsCount(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createMovie(req, res, next) {
	try {
		res.movie = await _movieModel2.default.create(Object.assign({}, req.body, {
			uploader: req.user._id || ''
		}));
		_userModel2.default.incUploadedCount(req.user._id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateMovieByVoiceover(req, res, next) {
	// had res.voiceover
	try {
		let movie = await _movieModel2.default.findById(res.voiceover.movie);

		if (movie.voiceovers && movie.voiceovers[movie.voiceovers.lenght - 1] === res.voiceover._id && res.voiceover.status === 'done' && res.voiceover.embedUrl) {
			movie.status = 'done';
		}

		await movie.save();
		res.movie = req.movie;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateMovie(req, res, next) {
	try {
		let movie = await _movieModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			movie[key] = req.body[key];
		});
		await movie.save();
		res.movie = movie;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteMovie(req, res, next) {
	try {
		await _movieModel2.default.findOneAndDelete(req.movie._id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieController = __webpack_require__(75);

var movieController = _interopRequireWildcard(_movieController);

var _movieValidation = __webpack_require__(77);

var _movieValidation2 = _interopRequireDefault(_movieValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(20);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _voiceoverController = __webpack_require__(36);

var voiceoverController = _interopRequireWildcard(_voiceoverController);

var _recommendController = __webpack_require__(16);

var recommendController = _interopRequireWildcard(_recommendController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router(); /* eslint-disable no-unused-vars */


// More router
router.get('/init', (0, _roleMiddleware.accessControl)('createAny', 'movie'), movieController.initMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: 'OK'
	});
}).get('/search', (0, _roleMiddleware.accessControl)('readAny', 'movie'), paramMiddleware.parseParamList, movieController.searchMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		// data: res.data
		data: res.movies,
		pagination: res.pagination
	});
}).get('/suggests', (0, _roleMiddleware.accessControl)('readAny', 'movie'), paramMiddleware.parseParamList, movieController.getSuggestMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies,
		pagination: res.pagination
	});
}).get('/:id/followers', (0, _roleMiddleware.accessControl)('readOwn', 'followMovie'), (0, _expressValidation2.default)(_movieValidation2.default.show), paramMiddleware.parseParamList, movieController.getFollowerMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followers,
		pagination: res.pagination
	});
});

//  Default router
router.get('/stats', (0, _roleMiddleware.accessControl)('readAny', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.stats), movieController.getMoviesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.moviesStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.index), paramMiddleware.parseParamList, movieController.getMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies,
		pagination: res.pagination
	});
}).get('/:id', (0, _roleMiddleware.accessControl)('readAny', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.show), movieController.getMovieById, voiceoverController.getVoiceoversByMovie, function (req, res, next) {
	req.body.movieId = res.movie && res.movie._doc && res.movie._doc._id;
	req.body.score = 3;
	next();
}, recommendController.addHistory, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: Object.assign({}, res.movie._doc, { voiceovers: res.voiceovers })
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.create), movieController.createMovie, function (req, res, next) {
	req.body.movieId = res.movie._id;
	next();
}, voiceoverController.createVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movie
	});
}).put('/:id', (0, _roleMiddleware.accessControl)('updateOwn', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.update), ownMiddleware.ownMovie, movieController.updateMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movie
	});
}).delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.delete), ownMiddleware.ownMovie, movieController.deleteMovie, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	upload: {},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getPostsStats = getPostsStats;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

var _postModel = __webpack_require__(79);

var _postModel2 = _interopRequireDefault(_postModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postUtil = __webpack_require__(81);

var util = _interopRequireWildcard(_postUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group posts - Operations about posts
 *
 */

async function getPostsStats(req, res, next) {
	try {
		res.postsStats = {
			count: await _postModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getPosts(req, res, next) {
	try {
		let _ref = await _postModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.posts = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getPostById(req, res, next) {
	try {
		res.post = await _postModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createPost(req, res, next) {
	try {
		res.post = await _postModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updatePost(req, res, next) {
	try {
		let post = await _postModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			post[key] = req.body[key];
		});
		await post.save();
		res.post = post;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deletePost(req, res, next) {
	try {
		const post = await _postModel2.default.findById(req.params.id);

		await post.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _postValidation = __webpack_require__(33);

var myValid = _interopRequireWildcard(_postValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;

let postSchema = new _mongoose.Schema({
	content: {
		type: String,
		trim: true,
		unique: true
	},
	movie: {
		type: ObjectId,
		required: [true, 'Movie is required!'],
		ref: 'Movie',
		trim: true
	},
	status: {
		type: String,
		enum: ['checking', 'close', 'done'],
		default: 'checking',
		trim: true
	},
	poster: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Poster is required!'],
		trim: true
	},
	group: {
		type: ObjectId,
		ref: 'Group',
		required: [true, 'Group is required!'],
		trim: true
	}
}, {
	timestamps: true
});

postSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
postSchema.plugin(_mongoosePaginate2.default);
postSchema.plugin(_mongooseAutopopulate2.default);

exports.default = _mongoose2.default.model('Post', postSchema);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postController = __webpack_require__(78);

var postController = _interopRequireWildcard(_postController);

var _postValidation = __webpack_require__(33);

var _postValidation2 = _interopRequireDefault(_postValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getPostsStats
 * GET /items => getPosts
 * GET /items/:id => getPostById
 * POST /items/ => createPost
 * PATCH/PUT /items/:id => updatePost
 * DELETE /items/:id => deletePost
 */

// More router

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_postValidation2.default.stats), postController.getPostsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		postsStats: res.postsStats
	});
}).get('/', (0, _expressValidation2.default)(_postValidation2.default.index), postController.getPosts, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.posts,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_postValidation2.default.show), postController.getPostById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.post
	});
}).post('/', (0, _expressValidation2.default)(_postValidation2.default.create), postController.createPost, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.post
	});
}).put('/:id', (0, _expressValidation2.default)(_postValidation2.default.update), postController.updatePost, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.post
	});
}).delete('/:id', (0, _expressValidation2.default)(_postValidation2.default.delete), postController.deletePost, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRatesStats = getRatesStats;
exports.getRates = getRates;
exports.getRateById = getRateById;
exports.createRate = createRate;
exports.updateRate = updateRate;
exports.deleteRate = deleteRate;

var _rateModel = __webpack_require__(34);

var _rateModel2 = _interopRequireDefault(_rateModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _rateUtil = __webpack_require__(84);

var util = _interopRequireWildcard(_rateUtil);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group rates - Operations about rates
 *
 */

async function getRatesStats(req, res, next) {
	try {
		res.ratesStats = {
			count: await _rateModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRates(req, res, next) {
	try {
		let _ref = await _rateModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.rates = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRateById(req, res, next) {
	try {
		res.rate = await _rateModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createRate(req, res, next) {
	try {
		res.rate = await _rateModel2.default.create(Object.assign({}, req.body, { user: req.user }));

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateRate(req, res, next) {
	try {
		let rate = await _rateModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			rate[key] = req.body[key];
		});
		await rate.save();
		res.rate = rate;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteRate(req, res, next) {
	try {
		const rate = await _rateModel2.default.findById(req.params.id);

		await rate.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _rateController = __webpack_require__(82);

var rateController = _interopRequireWildcard(_rateController);

var _rateValidation = __webpack_require__(85);

var _rateValidation2 = _interopRequireDefault(_rateValidation);

var _authService = __webpack_require__(26);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(19);

var paramService = _interopRequireWildcard(_paramService);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _existMiddleware = __webpack_require__(18);

var _recommendController = __webpack_require__(16);

var recommendController = _interopRequireWildcard(_recommendController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getRatesStats
 * GET /items => getRates
 * GET /items/:id => getRateById
 * POST /items/ => createRate
 * PATCH/PUT /items/:id => updateRate
 * DELETE /items/:id => deleteRate
 */

// More router

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_rateValidation2.default.stats), rateController.getRatesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		ratesStats: res.ratesStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_rateValidation2.default.index), rateController.getRates, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.rates,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_rateValidation2.default.show), rateController.getRateById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.rate
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'rate'), (0, _expressValidation2.default)(_rateValidation2.default.create), _existMiddleware.existRate, rateController.createRate, function (req, res, next) {
	req.body.movieId = res.rate && res.rate.movie;
	req.body.score = res.rate && res.rate.value;
	console.log(req.body);
	next();
}, recommendController.addHistory, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.rate
	});
}).put('/:id', (0, _expressValidation2.default)(_rateValidation2.default.update), rateController.updateRate, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.rate
	});
}).delete('/:id', (0, _expressValidation2.default)(_rateValidation2.default.delete), rateController.deleteRate, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _recommendController = __webpack_require__(16);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


var historySchema = new _mongoose.Schema({
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
});
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
let recommendSchema = new _mongoose.Schema({
	user: {
		type: String,
		required: [true, 'User is required!'],
		trim: true,
		unique: true
	},
	histories: [historySchema],
	priorities: [{
		type: Array,
		trim: true
	}],
	recommends: [{
		type: ObjectId,
		ref: 'Movie',
		trim: true
	}]
}, {
	timestamps: true
});

recommendSchema.statics = {
	async findOneOrCreate(condition) {
		let rs = await this.findOne(condition);
		return rs ? rs : await this.create(condition);
	},
	async addHistory(user, movie, score) {
		let rcd = await this.findOneOrCreate({ user: user._id });
		let foundIndex = await rcd.indexExistHiroty(movie._id);

		if (foundIndex > -1) {
			if (score !== 3) {
				rcd.histories[foundIndex].score = score;
			}
		} else {
			rcd.histories.push({ movie: movie._id, score });
		}
		await rcd.addPriority(movie, score);
		await rcd.updateRecommends();

		return rcd.save();
	},
	async getRecommends(condition) {}
};

recommendSchema.methods = {
	async indexExistHiroty(movieId) {
		return await this.histories.findIndex(o => {
			return o.movie == String(movieId);
		});
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
			this.priorities = this.priorities.slice(-50);
		}
		let priority = [];
		const name = movie.name.replace(/[0-9]/g, '').split(' ') || [];
		const nameOrigin = movie.nameOrigin.replace(/[0-9]/g, '').split(' ') || [];
		const actors = movie.actors || [];
		const directors = movie.directors || [];
		const genres = (movie.genres || []).concat(movie.genres || []);

		priority = name.concat(nameOrigin.concat(actors.concat(directors.concat(genres))));

		const splitKey = '  ';
		const str = priority.join(splitKey).trim().replace(/[&\/\\#,+()$~%.'":*?<>{}0-9]/g, '');

		priority = str.replace(/ {5}/g, splitKey).replace(/ {4}/g, splitKey).replace(/ {3}/g, splitKey).split(splitKey);

		for (let i = 0; i < score; i++) {
			priority = priority.concat(priority);
		}

		this.priorities.push(priority);

		return this.save();
	},
	async updateRecommends() {
		let features = [];
		let keyword = '';
		let counts = {};
		let topPriorities2D = this.priorities.slice(-15);

		topPriorities2D.push(this.priorities[this.priorities.length - 1]);
		topPriorities2D.push(this.priorities[this.priorities.length - 1]);

		const topPriorities1D = [].concat(...topPriorities2D);

		topPriorities1D.forEach(function (x) {
			counts[x] = (counts[x] || 0) + 1;
		});

		for (var key in counts) {
			if (counts.hasOwnProperty(key)) features.push([key, counts[key]]);
		}

		features.sort(function (a, b) {
			return b[1] - a[1];
		});

		if (features.length > 15) {
			keyword = features.slice(0, 14).join(' ');
		} else {
			keyword = features.join(' ');
		}

		const movies = await _movieModel2.default.find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(50);

		this.recommends = [];
		await Promise.all(movies.map(async o => {
			let foundIndex = await this.indexExistHiroty(String(o._id));
			if (foundIndex == -1) {
				await this.recommends.push(o._id);
			}
		}));
		return this.save();
	}
};

recommendSchema.pre('save', function (next) {
	return next();
});

recommendSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
recommendSchema.plugin(_mongoosePaginate2.default);
recommendSchema.plugin(_mongooseAutopopulate2.default);
recommendSchema.plugin(pluginService.logPost, { schemaName: 'Recommend' });
// recommendSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Recommend' })

exports.default = _mongoose2.default.model('Recommend', recommendSchema);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _recommendController = __webpack_require__(16);

var recommendController = _interopRequireWildcard(_recommendController);

var _recommendValidation = __webpack_require__(89);

var _recommendValidation2 = _interopRequireDefault(_recommendValidation);

var _paramService = __webpack_require__(19);

var paramService = _interopRequireWildcard(_paramService);

var _roleMiddleware = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getRecommendsStats
 * GET /items => getRecommends
 * GET /items/:id => getRecommendById
 * POST /items/ => createRecommend
 * PATCH/PUT /items/:id => updateRecommend
 * DELETE /items/:id => deleteRecommend
 */

// More router
/* eslint-disable no-unused-vars */
router.post('/add-history', (0, _roleMiddleware.accessControl)('createOwn', 'recommend'), (0, _expressValidation2.default)(_recommendValidation2.default.stats), recommendController.addHistory, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: 'OK'
	});
}).get('/movies', (0, _roleMiddleware.accessControl)('readOwn', 'recommend'), paramService.parseParam, (0, _expressValidation2.default)(_recommendValidation2.default.index), recommendController.getRecommendsForUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.recommends,
		pagination: res.pagination
	});
});

// Default Rest router
router.get('/', (0, _roleMiddleware.accessControl)('readAny', 'recommend'), paramService.parseParam, (0, _expressValidation2.default)(_recommendValidation2.default.index), recommendController.getRecommends, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.recommends,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_recommendValidation2.default.show), recommendController.getRecommendById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.recommend
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'recommend'), (0, _expressValidation2.default)(_recommendValidation2.default.create), recommendController.createRecommend, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.recommend
	});
}).put('/:id', (0, _roleMiddleware.accessControl)('updateOwn', 'recommend'), (0, _expressValidation2.default)(_recommendValidation2.default.update), recommendController.updateRecommend, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.recommend
	});
}).delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'recommend'), (0, _expressValidation2.default)(_recommendValidation2.default.delete), recommendController.deleteRecommend, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let relationshipSchema = new _mongoose.Schema({
	user: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'User is required!'],
		autopopulate: true,
		trim: true
	},
	requestsCount: {
		type: Number,
		default: 0
	},
	friendsCount: {
		type: Number,
		default: 0
	},
	requests: [{
		type: ObjectId,
		ref: 'User',
		trim: true
	}],
	friends: [{
		type: ObjectId,
		ref: 'User',
		trim: true
	}]
}, {
	timestamps: true
});

relationshipSchema.statics = {
	async findOneOrCreate(condition) {
		let rs = await this.findOne(condition);
		return rs ? rs : await this.create(condition);
	},
	async isRequest(user, request) {
		let rs = await this.findOneOrCreate({ user });
		return rs.isRequest(request);
	},
	async isFriend(user, friend) {
		let rs = await this.findOneOrCreate({ user });
		return rs.isFriend(friend);
	},
	async createRequest(user, request) {
		let rs = await this.findOneOrCreate({ user });
		return rs.addRequest(request);
	},
	async acceptRequest(user, request) {
		let userRS = await this.findOneOrCreate({ user });
		let requestRS = await this.findOneOrCreate({ user: request });

		userRS.removeRequest(request);
		userRS.addFriend(request);
		requestRS.addFriend(user);
		return userRS;
	},
	async rejectRequest(user, request) {
		let userRS = await this.findOneOrCreate({ user });
		return await userRS.removeRequest(request);
	},
	async removeFriend(user, friend) {
		let userResource = await this.findOneOrCreate({ user });
		let friendResource = await this.findOneOrCreate({ user: friend });

		friendResource.removeFriend(user);
		return await userResource.removeFriend(friend);
	}
};

relationshipSchema.methods = {
	isRequest(request) {
		return this.requests.indexOf(request._id || request) !== -1 ? true : false;
	},
	isFriend(friend) {
		return this.friends.indexOf(friend._id || friend) !== -1 ? true : false;
	},
	addRequest(request) {
		if (this.isRequest(request) || this.isFriend(request)) {
			return this;
		}
		this.requests.push(request);
		if (this.requestsCount % 10 === 0) {
			this.requestsCount = this.requests.length;
		} else {
			this.requestsCount++;
		}
		return this.save();
	},
	addFriend(friend) {
		if (this.isFriend(friend)) {
			return this;
		}
		this.friends.push(friend);
		if (this.friendsCount % 10 === 0) {
			this.friendsCount = this.friends.length;
		} else {
			this.friendsCount++;
		}
		return this.save();
	},
	removeRequest(request) {
		if (!this.isRequest(request)) {
			return this;
		}
		this.requests.remove(request);
		if (this.requestsCount % 10 === 0) {
			this.requestsCount = this.requests.length;
		} else {
			this.requestsCount--;
		}
		return this.save();
	},
	removeFriend(friend) {
		if (!this.isFriend(friend)) {
			return this;
		}
		this.friends.remove(friend);
		if (this.friendsCount % 10 === 0) {
			this.friendsCount = this.friends.length;
		} else {
			this.friendsCount--;
		}
		return this.save();
	}
};

relationshipSchema.pre('save', function (next) {
	return next();
});

relationshipSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
relationshipSchema.plugin(_mongoosePaginate2.default);
relationshipSchema.plugin(_mongooseAutopopulate2.default);
relationshipSchema.plugin(pluginService.logPost, { schemaName: 'Relationship' });
relationshipSchema.plugin(pluginService.setSlugUrl, {
	schemaName: 'Relationship'
});

exports.default = _mongoose2.default.model('Relationship', relationshipSchema);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _relationshipController = __webpack_require__(35);

var relationshipController = _interopRequireWildcard(_relationshipController);

var _relationshipValidation = __webpack_require__(93);

var _relationshipValidation2 = _interopRequireDefault(_relationshipValidation);

var _paramService = __webpack_require__(19);

var paramService = _interopRequireWildcard(_paramService);

var _roleMiddleware = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getRelationshipsStats
 * GET /items => getRelationships
 * GET /items/:id => getRelationshipById
 * POST /items/ => createRelationship
 * PATCH/PUT /items/:id => updateRelationship
 * DELETE /items/:id => deleteRelationship
 */

// More router
/* eslint-disable no-unused-vars */
router.post('/', (0, _roleMiddleware.accessControl)('createOwn', 'relationship'), (0, _expressValidation2.default)(_relationshipValidation2.default.requests), relationshipController.createRequest, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).put('/accept', (0, _roleMiddleware.accessControl)('updateOwn', 'relationship'), (0, _expressValidation2.default)(_relationshipValidation2.default.requests), relationshipController.acceptRequest, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).put('/reject', (0, _roleMiddleware.accessControl)('updateOwn', 'relationship'), (0, _expressValidation2.default)(_relationshipValidation2.default.requests), relationshipController.rejectRequest, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).get('/check/:targetId', (0, _roleMiddleware.accessControl)('updateOwn', 'relationship'), relationshipController.checkStatus, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationshipStatus
	});
}).delete('/remove/:targetId', (0, _roleMiddleware.accessControl)('updateOwn', 'relationship'), relationshipController.removeFriend, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_relationshipValidation2.default.stats), relationshipController.getRelationshipsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationshipsStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'movie'), paramService.parseParam, (0, _expressValidation2.default)(_relationshipValidation2.default.index), relationshipController.getRelationships, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationships,
		pagination: res.pagination
	});
});
// .get(
// 	'/:id',
// 	validate(relationshipValidation.show),
// 	relationshipController.getRelationshipById,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .post(
// 	'/',
// 	accessControl('createOwn', 'movie'),
// 	validate(relationshipValidation.create),
// 	relationshipController.createRelationship,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'movie'),
// 	validate(relationshipValidation.update),
// 	relationshipController.updateRelationship,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.relationship
// 		})
// 	}
// )
// .delete(
// 	'/:id',
// 	accessControl('deleteOwn', 'movie'),
// 	validate(relationshipValidation.delete),
// 	relationshipController.deleteRelationship,
// 	function(req, res, next) {
// 		return res.sendStatus(HTTPStatus.OK)
// 	}
// )

exports.default = router;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	requests: {
		body: {
			target: _joi2.default.string().required()
		}
	},
	remove: {
		body: {
			target: _joi2.default.string().required()
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getSubsSuggest = getSubsSuggest;
exports.getSubs = getSubs;
exports.getSubById = getSubById;
exports.createSub = createSub;
exports.updateSub = updateSub;
exports.deleteSub = deleteSub;

var _subModel = __webpack_require__(95);

var _subModel2 = _interopRequireDefault(_subModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _subUtil = __webpack_require__(97);

var util = _interopRequireWildcard(_subUtil);

var _helper = __webpack_require__(1);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _axios = __webpack_require__(28);

var _axios2 = _interopRequireDefault(_axios);

var _fileService = __webpack_require__(27);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


async function getSubsSuggest(req, res, next) {
	try {
		const { nameOrigin, year } = req.query;
		if (year && nameOrigin) {
			const url = `https://www.studyphim.vn/movies/getSubtitle/vi/${(0, _slugify2.default)(nameOrigin, {
				lower: true
			})}-${year}/1`;

			await _axios2.default.get(url).then(response => {
				(0, _fileService.uploadFileByUrl)('/subtitles', 'true', url, function (subUrl) {
					res.subUrl = subUrl;
					next();
				});
			}).catch(e => {
				(0, _helper.log)(JSON.stringify(e), 'error-response.log');
				res.subUrl = '';
				next();
			});
			// subUrl = `https://www.studyphim.vn/movies/getSubtitle/vi/${slugify(
			// 	nameOrigin,
			// 	{ lower: true }
			// )}-${year}/1`
		}
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getSubs(req, res, next) {
	try {
		let _ref = await _subModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.subs = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getSubById(req, res, next) {
	try {
		res.sub = await _subModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createSub(req, res, next) {
	try {
		res.sub = await _subModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateSub(req, res, next) {
	try {
		let sub = await _subModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			sub[key] = req.body[key];
		});
		await sub.save();
		res.sub = sub;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteSub(req, res, next) {
	try {
		const sub = await _subModel2.default.findById(req.params.id);

		await sub.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(14);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let subSchema = new _mongoose.Schema({
	subName: {
		type: String,
		required: [true, 'subName is required!'],
		trim: true,
		unique: true
	}
}, {
	timestamps: true
});

subSchema.statics = {};

subSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

subSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
subSchema.plugin(_mongoosePaginate2.default);
subSchema.plugin(_mongooseAutopopulate2.default);
subSchema.plugin(pluginService.logPost, { schemaName: 'Sub' });
subSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Sub' });

exports.default = _mongoose2.default.model('Sub', subSchema);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _subController = __webpack_require__(94);

var subController = _interopRequireWildcard(_subController);

var _subValidation = __webpack_require__(98);

var _subValidation2 = _interopRequireDefault(_subValidation);

var _paramService = __webpack_require__(19);

var paramService = _interopRequireWildcard(_paramService);

var _roleMiddleware = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getSubsStats
 * GET /items => getSubs
 * GET /items/:id => getSubById
 * POST /items/ => createSub
 * PATCH/PUT /items/:id => updateSub
 * DELETE /items/:id => deleteSub
 */

// More router

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/suggest', subController.getSubsSuggest, function (req, res, next) {
  return res.status(_httpStatus2.default.OK).json({
    data: res.subUrl
  });
});
// .get(
// 	'/',
// 	accessControl('readAny', 'movie'),
// 	paramService.parseParam,
// 	validate(subValidation.index),
// 	subController.getSubs,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.subs,
// 			pagination: res.pagination
// 		})
// 	}
// )
// .get('/:id', validate(subValidation.show), subController.getSubById, function(
// 	req,
// 	res,
// 	next
// ) {
// 	return res.status(HTTPStatus.OK).json({
// 		data: res.sub
// 	})
// })
// .post(
// 	'/',
// 	accessControl('createOwn', 'movie'),
// 	validate(subValidation.create),
// 	subController.createSub,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.sub
// 		})
// 	}
// )
// .put(
// 	'/:id',
// 	accessControl('updateOwn', 'movie'),
// 	validate(subValidation.update),
// 	subController.updateSub,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.sub
// 		})
// 	}
// )
// .delete(
// 	'/:id',
// 	accessControl('deleteOwn', 'movie'),
// 	validate(subValidation.delete),
// 	subController.deleteSub,
// 	function(req, res, next) {
// 		return res.sendStatus(HTTPStatus.OK)
// 	}
// )

exports.default = router;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
/* eslint-disable no-console */
function debug(obj) {
	console.log(obj);
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; /* eslint-disable no-unused-vars */

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploadFile = uploadFile;
exports.uploadImage = uploadImage;
exports.uploadSubtitle = uploadSubtitle;
exports.uploadMovie = uploadMovie;
exports.uploadVoiceover = uploadVoiceover;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _helper = __webpack_require__(1);

var _multiparty = __webpack_require__(29);

var _multiparty2 = _interopRequireDefault(_multiparty);

var _request = __webpack_require__(30);

var _request2 = _interopRequireDefault(_request);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

var _util = __webpack_require__(41);

var _util2 = _interopRequireDefault(_util);

var _fileService = __webpack_require__(27);

var fileService = _interopRequireWildcard(_fileService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Upload from './uploadModel.js'
async function uploadFile(req, res, next) {
	try {
		fileService.uploadFile('/files', 'false', {
			value: _fs2.default.createReadStream(req.file.path),
			options: {
				filename: req.file.originalFilename
			}
		}, async function (uploadedFile) {
			res.uploadedFile = uploadedFile;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}
// import request from 'request'

// eslint-disable-next-line no-unused-vars
// import * as util from './uploadUtil'
async function uploadImage(req, res, next) {
	try {
		fileService.uploadFile('/images', 'false', {
			value: _fs2.default.createReadStream(req.file.path),
			options: {
				filename: req.file.originalFilename
			}
		}, async function (uploadedFile) {
			res.uploadedFile = uploadedFile;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function uploadSubtitle(req, res, next) {
	try {
		fileService.uploadFile('/subtitles', 'false', {
			value: _fs2.default.createReadStream(req.file.path),
			options: {
				filename: req.file.originalFilename
			}
		}, async function (uploadedFile) {
			res.uploadedFile = uploadedFile;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function uploadMovie(req, res, next) {
	try {
		fileService.uploadFile('/movies', 'false', {
			value: _fs2.default.createReadStream(req.file.path),
			options: {
				filename: req.file.originalFilename
			}
		}, async function (uploadedFile) {
			res.uploadedFile = uploadedFile;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function uploadVoiceover(req, res, next) {
	try {
		fileService.uploadFile('/voiceovers', 'false', {
			value: _fs2.default.createReadStream(req.file.path),
			options: {
				filename: req.file.originalFilename
			}
		}, async function (uploadedFile) {
			res.uploadedFile = uploadedFile;
			next();
		});
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _uploadController = __webpack_require__(99);

var uploadController = _interopRequireWildcard(_uploadController);

var _uploadValidation = __webpack_require__(101);

var _uploadValidation2 = _interopRequireDefault(_uploadValidation);

var _paramService = __webpack_require__(19);

var upload = _interopRequireWildcard(_paramService);

var _roleMiddleware = __webpack_require__(9);

var _uploadMiddleware = __webpack_require__(50);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => getUploadsStats
 * GET /items => getUploads
 * GET /items/:id => getUploadById
 * POST /items/ => createUpload
 * PATCH/PUT /items/:id => updateUpload
 * DELETE /items/:id => deleteUpload
 */

// More router

router.post('/file', _uploadMiddleware.parseForm, (0, _expressValidation2.default)(_uploadValidation2.default.uploadFile), uploadController.uploadFile, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.uploadedFile
	});
});
router.post('/image', _uploadMiddleware.parseForm, (0, _expressValidation2.default)(_uploadValidation2.default.uploadImage), uploadController.uploadImage, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.uploadedFile
	});
});
router.post('/movie', _uploadMiddleware.parseForm, (0, _expressValidation2.default)(_uploadValidation2.default.uploadMovie), uploadController.uploadMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.uploadedFile
	});
});
router.post('/subtitle', _uploadMiddleware.parseForm, (0, _expressValidation2.default)(_uploadValidation2.default.uploadSubtitle), uploadController.uploadSubtitle, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.uploadedFile
	});
});
router.post('/voiceover', _uploadMiddleware.parseForm, (0, _expressValidation2.default)(_uploadValidation2.default.uploadVoiceover), uploadController.uploadVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.uploadedFile
	});
});

exports.default = router;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

var _constants = __webpack_require__(12);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
exports.default = {
	uploadFile: {
		params: {
			size: _joi2.default.number().max(_constants2.default.UPLOAD_FILE_MAX)
		}
	},
	uploadImage: {
		params: {
			size: _joi2.default.number().max(_constants2.default.UPLOAD_IMAGE_MAX)
		}
	},
	uploadMovie: {
		params: {
			size: _joi2.default.number().max(_constants2.default.UPLOAD_MOVIE_MAX)
		}
	},
	uploadSubtitle: {
		params: {
			size: _joi2.default.number().max(_constants2.default.UPLOAD_SUBTITLE_MAX)
		}
	},
	uploadVoiceover: {
		params: {
			size: _joi2.default.number().max(_constants2.default.UPLOAD_VOICEOVER_MAX)
		}
	}
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.searchUsers = searchUsers;
exports.suggestUsers = suggestUsers;
exports.getMoviesOwn = getMoviesOwn;
exports.getMoviesLiked = getMoviesLiked;
exports.getMoviesFollowed = getMoviesFollowed;
exports.getGroupsOwn = getGroupsOwn;
exports.getGroupsStatus = getGroupsStatus;
exports.getFollowers = getFollowers;
exports.getFollowed = getFollowed;
exports.getUsersStats = getUsersStats;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.localLogin = localLogin;
exports.fbLogin = fbLogin;

var _userModel = __webpack_require__(22);

var _userModel2 = _interopRequireDefault(_userModel);

var _movieModel = __webpack_require__(15);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _groupModel = __webpack_require__(32);

var _groupModel2 = _interopRequireDefault(_groupModel);

var _likeModel = __webpack_require__(24);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _followMovieModel = __webpack_require__(21);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _followUserModel = __webpack_require__(23);

var _followUserModel2 = _interopRequireDefault(_followUserModel);

var _memberModel = __webpack_require__(25);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars

// import * as authService from '../../services/authService'


async function searchUsers(req, res, next) {
	try {
		res.users = await _userModel2.default.find({ $text: { $search: req.parsedParams.search } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(req.parsedParams.limit);

		res.pagination = Object.assign({}, req.parsedParams, {
			sort: 'textScore',
			total: req.parsedParams.limit
		});

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function suggestUsers(req, res, next) {
	try {
		let suggests = [{ uploadedCount: 'desc' }, { uploadedCount: 'desc' }, { uploadedCount: 'desc' }, { uploadedCount: 'desc' }, { uploadedCount: 'desc' }, { uploadedCount: 'desc' }, { createdAt: 'desc' }];
		let sort = suggests[Math.floor(Math.random() * suggests.length)];

		let _ref = await _userModel2.default.paginate(Object.assign({}, req.parsedParams.filters), Object.assign({}, req.parsedParams, {
			sort: sort,
			offset: Math.floor(Math.random() * 10)
		})),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.users = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMoviesOwn(req, res, next) {
	try {
		let _ref2 = await _movieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { uploader: req.params.id }), req.parsedParams),
		    { docs } = _ref2,
		    pagination = _objectWithoutProperties(_ref2, ['docs']);
		res.movies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMoviesLiked(req, res, next) {
	try {
		let _ref3 = await _likeModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { user: req.params.id }), req.parsedParams),
		    { docs } = _ref3,
		    pagination = _objectWithoutProperties(_ref3, ['docs']);

		res.movies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMoviesFollowed(req, res, next) {
	try {
		let _ref4 = await _followMovieModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { user: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'movie',
				model: 'Movie'
			}]
		})),
		    { docs } = _ref4,
		    pagination = _objectWithoutProperties(_ref4, ['docs']);

		res.movies = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroupsOwn(req, res, next) {
	try {
		let _ref5 = await _groupModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { creator: req.params.id }), req.parsedParams),
		    { docs } = _ref5,
		    pagination = _objectWithoutProperties(_ref5, ['docs']);

		res.groups = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroupsStatus(req, res, next) {
	try {
		let _ref6 = await _memberModel2.default.paginate(Object.assign({}, req.parsedParams.filters, {
			user: req.params.id,
			status: req.params.status
		}), req.parsedParams),
		    { docs } = _ref6,
		    pagination = _objectWithoutProperties(_ref6, ['docs']);

		res.groups = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowers(req, res, next) {
	try {
		let _ref7 = await _followUserModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { follow: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}]
		})),
		    { docs } = _ref7,
		    pagination = _objectWithoutProperties(_ref7, ['docs']);

		res.followers = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowed(req, res, next) {
	try {
		let _ref8 = await _followUserModel2.default.paginate(Object.assign({}, req.parsedParams.filters, { user: req.params.id }), Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'follow',
				model: 'User'
			}]
		})),
		    { docs } = _ref8,
		    pagination = _objectWithoutProperties(_ref8, ['docs']);

		res.followed = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUsersStats(req, res, next) {
	try {
		res.usersStats = {
			count: await _userModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUsers(req, res, next) {
	try {
		let _ref9 = await _userModel2.default.paginate(Object.assign({}, req.parsedParams.filters), req.parsedParams),
		    { docs } = _ref9,
		    pagination = _objectWithoutProperties(_ref9, ['docs']);

		res.users = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUserById(req, res, next) {
	try {
		res.user = await _userModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createUser(req, res, next) {
	try {
		const user = await _userModel2.default.create(Object.assign({}, req.body, { provider: 'local' }));
		res.user = user.toAuthJSON();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateUser(req, res, next) {
	try {
		let user = await _userModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			user[key] = req.body[key];
		});
		await user.save();
		res.user = user;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteUser(req, res, next) {
	try {
		const user = await _userModel2.default.findById(req.params.id);

		await user.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

function localLogin(req, res, next) {
	res.user = req.user.toAuthJSON();
	return next();
}

async function fbLogin(req, res, next) {
	// req.user is inited
	try {
		const profile = req.body;
		res.user = await _userModel2.default.findOne({
			provider: 'facebook',
			'social.id': profile.userID
		});

		if (res.user) {
			res.user = res.user.toAuthJSON();
			next();
		} else {
			let newUser = (await _userModel2.default.findOne({
				email: profile.email
			})) || new _userModel2.default();
			newUser.provider = 'facebook';
			newUser.social = { id: profile.userID, accessToken: profile.accessToken };
			newUser.name = profile.name;
			newUser.email = profile.email;
			newUser.gender = (0, _helper.genderToNumber)(profile.gender);
			if (profile.picture && profile.picture.data && profile.picture.data.url) {
				newUser.avatarUrl = profile.picture.data.url;
			}

			newUser = await newUser.save();
			res.user = newUser.toAuthJSON();
		}

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userController = __webpack_require__(102);

var userController = _interopRequireWildcard(_userController);

var _relationshipController = __webpack_require__(35);

var relationshipController = _interopRequireWildcard(_relationshipController);

var _userValidation = __webpack_require__(104);

var _userValidation2 = _interopRequireDefault(_userValidation);

var _authService = __webpack_require__(26);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(20);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _fb = __webpack_require__(114);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

var fb = new _fb.Facebook({});
/**
 * GET /items/stats => getUsersStats
 * GET /items => getUsers
 * GET /items/:id => getUserById
 * POST /items/ => createUser
 * PATCH/PUT /items/:id => updateUser
 * DELETE /items/:id => deleteUser
 */

// More router
router.get('/me', (0, _roleMiddleware.accessControl)('createOwn', 'user'), function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: req.user
	});
}).get('/search', (0, _roleMiddleware.accessControl)('readAny', 'user'), paramMiddleware.parseParamList, userController.searchUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.users,
		pagination: res.pagination
	});
}).get('/suggests', (0, _roleMiddleware.accessControl)('readAny', 'user'), paramMiddleware.parseParamList, userController.suggestUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.users,
		pagination: res.pagination
	});
}).get('/:id/movies/own', (0, _roleMiddleware.accessControl)('readOwn', 'movie'), paramMiddleware.parseParamList, userController.getMoviesOwn, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies,
		pagination: res.pagination
	});
}).get('/:id/movies/liked', (0, _roleMiddleware.accessControl)('readOwn', 'like'), paramMiddleware.parseParamList, userController.getMoviesLiked, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies,
		pagination: res.pagination
	});
}).get('/:id/movies/followed', (0, _roleMiddleware.accessControl)('readOwn', 'movie'), paramMiddleware.parseParamList, userController.getMoviesFollowed, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies,
		pagination: res.pagination
	});
}).get('/:id/groups/own', (0, _roleMiddleware.accessControl)('readOwn', 'group'), paramMiddleware.parseParamList, userController.getGroupsOwn, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.groups,
		pagination: res.pagination
	});
}).get('/:id/groups/:status', (0, _roleMiddleware.accessControl)('readOwn', 'group'), (0, _expressValidation2.default)(_userValidation2.default.groupsStatus), paramMiddleware.parseParamList, userController.getGroupsStatus, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.groups,
		pagination: res.pagination
	});
}).get('/:id/followers', (0, _roleMiddleware.accessControl)('readOwn', 'followUser'), paramMiddleware.parseParamList, userController.getFollowers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followers,
		pagination: res.pagination
	});
}).get('/:id/followed', (0, _roleMiddleware.accessControl)('readOwn', 'followUser'), paramMiddleware.parseParamList, userController.getFollowed, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.followed,
		pagination: res.pagination
	});
}).get('/:id/requests', (0, _roleMiddleware.accessControl)('readAny', 'relationship'), paramMiddleware.parseParamList, relationshipController.getRequestsByUserId, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.requests,
		pagination: res.pagination
	});
}).get('/:id/friends', (0, _roleMiddleware.accessControl)('readAny', 'relationship'), paramMiddleware.parseParamList, relationshipController.getFriendsByUserId, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.friends,
		pagination: res.pagination
	});
}).post('/signup', (0, _expressValidation2.default)(_userValidation2.default.create), userController.createUser,
// relationshipController.createRelationship,
function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
}).post('/login', _authService.authLocal, userController.localLogin, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
}).post('/fb_login', userController.fbLogin, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
});

//  Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_userValidation2.default.stats), userController.getUsersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.usersStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'user'), paramMiddleware.parseParamList, (0, _expressValidation2.default)(_userValidation2.default.index), userController.getUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.users,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_userValidation2.default.show), userController.getUserById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
}).post('/', (0, _expressValidation2.default)(_userValidation2.default.create), userController.createUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
}).put('/:id', (0, _expressValidation2.default)(_userValidation2.default.update), userController.updateUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.user
	});
}).delete('/:id', (0, _expressValidation2.default)(_userValidation2.default.delete), userController.deleteUser, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(5);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	groupsStatus: {
		params: {
			id: _joi2.default.string().required(),
			status: _joi2.default.string().required().valid('checking', 'done', 'block')
		}
	},
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; // eslint-disable-next-line no-unused-vars

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(11);

var _validator2 = _interopRequireDefault(_validator);

var _voiceoverValidation = __webpack_require__(37);

var myValid = _interopRequireWildcard(_voiceoverValidation);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId; /* eslint-disable no-unused-vars */
/**
 * @typedef voiceovers
 * @property {string} _id
 * @property {string} voiceoverName
 */

let voiceoverSchema = new _mongoose.Schema({
	requestId: {
		type: String,
		required: [true, 'Request ID is required!'],
		unique: true,
		trim: true
	},
	embedUrl: {
		type: String,
		trim: true
	},
	fileFormat: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		enum: ['pending', 'done'],
		default: 'pending',
		trim: true
	},
	movie: {
		type: ObjectId,
		ref: 'Movie',
		required: [true, 'Movie is required!'],
		trim: true
	},
	uploader: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Uploader is required!'],
		trim: true
	},
	name: {
		type: String,
		trim: true,
		default: 'Giọng'
	}
}, {
	timestamps: true
});

voiceoverSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

voiceoverSchema.plugin(_mongoosePaginate2.default);
voiceoverSchema.plugin(_mongooseAutopopulate2.default);
voiceoverSchema.plugin(pluginService.logPost, { schemaName: 'Voiceover' });
voiceoverSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Voiceover' });

exports.default = _mongoose2.default.model('Voiceover', voiceoverSchema);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(4);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _voiceoverController = __webpack_require__(36);

var voiceoverController = _interopRequireWildcard(_voiceoverController);

var _voiceoverValidation = __webpack_require__(37);

var _voiceoverValidation2 = _interopRequireDefault(_voiceoverValidation);

var _paramMiddleware = __webpack_require__(13);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(20);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(9);

var _synthesisService = __webpack_require__(38);

var synthesisService = _interopRequireWildcard(_synthesisService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/check/:requestId', (0, _expressValidation2.default)(_voiceoverValidation2.default.checkSynthesis), voiceoverController.checkSynthesis, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).get('/rerequest/:requestId', (0, _expressValidation2.default)(_voiceoverValidation2.default.checkSynthesis), voiceoverController.reSynthesis, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).post('/callback',
// accessControl('createOwn', 'voiceover'),
// validate(voiceoverValidation.callbackSynthesis),
voiceoverController.callbackSynthesis, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
});

//  Default router
router.get('/stats', (0, _expressValidation2.default)(_voiceoverValidation2.default.stats), voiceoverController.getVoiceoversStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceoversStats: res.voiceoversStats
	});
}).get('/', (0, _expressValidation2.default)(_voiceoverValidation2.default.index), paramMiddleware.parseParamList, voiceoverController.getVoiceovers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceovers,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.show), voiceoverController.getVoiceoverById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).post('/', (0, _expressValidation2.default)(_voiceoverValidation2.default.create), voiceoverController.createVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).put('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.update), voiceoverController.updateVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).delete('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.delete), voiceoverController.deleteVoiceover, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _roleAcl = __webpack_require__(123);

var _roleAcl2 = _interopRequireDefault(_roleAcl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ac = new _roleAcl2.default(); /* eslint-disable */


ac.grant('viewer').execute('readAny').on('user', ['*', '!password']).execute('readAny').on('followMovie').execute('readAny').on('followUser').execute('readAny').on('relationship').execute('readAny').on('movie').execute('readAny').on('post').execute('readAny').on('recommend').execute('readAny').on('group').execute('readAny').on('like').execute('readAny').on('rate').execute('readAny').on('member');

ac.grant('user').extend('viewer').execute('readOwn').on('user').execute('createOwn').on('user').execute('updateOwn').on('user').execute('deleteOwn').on('user').execute('readOwn').on('followMovie').execute('createOwn').on('followMovie').execute('updateOwn').on('followMovie').execute('deleteOwn').on('followMovie').execute('readOwn').on('followUser').execute('createOwn').on('followUser').execute('updateOwn').on('followUser').execute('deleteOwn').on('followUser').execute('readOwn').on('relationship').execute('createOwn').on('relationship').execute('updateOwn').on('relationship').execute('deleteOwn').on('relationship').execute('readOwn').on('movie').execute('createOwn').on('movie').execute('updateOwn').on('movie').execute('deleteOwn').on('movie').execute('readOwn').on('post').execute('createOwn').on('post').execute('updateOwn').on('post').execute('deleteOwn').on('post').execute('readOwn').on('recommend').execute('createOwn').on('recommend').execute('updateOwn').on('recommend').execute('deleteOwn').on('recommend').execute('readOwn').on('group').execute('createOwn').on('group').execute('updateOwn').on('group').execute('deleteOwn').on('group').execute('readOwn').on('like').execute('createOwn').on('like').execute('updateOwn').on('like').execute('deleteOwn').on('like').execute('readOwn').on('rate').execute('createOwn').on('rate').execute('updateOwn').on('rate').execute('deleteOwn').on('rate').execute('readOwn').on('member').execute('createOwn').on('member', ['*', '!status']).execute('updateOwn').on('member').execute('deleteOwn').on('member');

ac.grant('editer').extend('user');

ac.grant('admin').extend('user').execute('readAny').on('movie').execute('createAny').on('movie').execute('updateAny').on('movie').execute('deleteAny').on('movie');

ac.grant('superadmin').extend('admin').execute('readAny').on('user').execute('createAny').on('user').execute('updateAny').on('user').execute('deleteAny').on('user').execute('readAny').on('followMovie').execute('createAny').on('followMovie').execute('updateAny').on('followMovie').execute('deleteAny').on('followMovie').execute('readAny').on('followUser').execute('createAny').on('followUser').execute('updateAny').on('followUser').execute('deleteAny').on('followUser').execute('readAny').on('movie').execute('createAny').on('movie').execute('updateAny').on('movie').execute('deleteAny').on('movie').execute('readAny').on('post').execute('createAny').on('post').execute('updateAny').on('post').execute('deleteAny').on('post').execute('readAny').on('group').execute('createAny').on('group').execute('updateAny').on('group').execute('deleteAny').on('group');

exports.default = ac;

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = [{"name":"Chúa Tể Godzilla","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chua-te-godzilla_11859/xem-phim/"},"nameOrigin":"Godzilla: King of the Monsters","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchua-te-godzilla-godzilla-king-of-the-monsters-2019.jpg%3Fsize%3D300"},"directors":["Michael Dougherty"],"actors":["Kyle Chandler","Millie Bobby Brown","Sally Hawkins","Vera Farmiga"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Kinh Dị","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":3,"desc":"Đây là tác phẩm thứ ba thuộc vũ trụ điện ảnh quái vật của hãng Legendary và Warner Bros..Theo đó, bộ phim có bối cảnh diễn ra vài năm sau sự kiện của phần trước. Lúc này, Godzilla phải đối mặt với những quái vật hết sức mạnh mẽ như Rồng ba đầu King Ghidorah, Rodan và sâu bướm Mothra.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-5hne6nsy.googlevideo.com/videoplayback?expire=1557783445&ei=NY_ZXOLvJc35-gb41K_oDQ&ip=134.19.186.201&id=o-AAWpzMZQhId9X2L6eNLvGNgIfdgan1ro4T97gJydU77y&itag=22&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-5hne6nsy%2Csn-4g5edn7e&ms=au%2Conr&mv=u&pl=24&mime=video%2Fmp4&ratebypass=yes&dur=186.015&lmt=1550482223386459&mt=1557761507&fvip=5&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgf4M5cptKDNoJGXn-knJS2eghMPtF5rTFJYU5mcCky04CIBo7A7wHXeNBqLEULY9ilrcEtFUqs656gtn4A5jKE622&lsparams=mm%2Cmn%2Cms%2Cmv%2Cpl&lsig=AHylml4wRQIhALtAsjE4pPrSTJE67MM6NYs19i0npupch8MiL5ubjbdRAiA1p4ba5r9-mGmPuvRLh5_99bdDyIO9qapibuEsJyU62A%3D%3D","default":true},{"resolution":720,"embedUrl":"https://r5---sn-5hne6nsy.googlevideo.com/videoplayback?expire=1557783445&ei=NY_ZXOLvJc35-gb41K_oDQ&ip=134.19.186.201&id=o-AAWpzMZQhId9X2L6eNLvGNgIfdgan1ro4T97gJydU77y&itag=43&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-5hne6nsy%2Csn-4g5edn7e&ms=au%2Conr&mv=u&pl=24&mime=video%2Fwebm&gir=yes&clen=14296063&ratebypass=yes&dur=0.000&lmt=1550488289965432&mt=1557761507&fvip=5&c=WEB&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgTbhiVaWskYyTsShmLbxDZTmMPL6EgbZe6EEk_cz6qEwCIHti1e4u3hxD_RD9VaZg2Xnaa2IFN1WfUnG8sYdxO7zj&lsparams=mm%2Cmn%2Cms%2Cmv%2Cpl&lsig=AHylml4wRQIhALtAsjE4pPrSTJE67MM6NYs19i0npupch8MiL5ubjbdRAiA1p4ba5r9-mGmPuvRLh5_99bdDyIO9qapibuEsJyU62A%3D%3D","default":false},{"resolution":1080,"embedUrl":"https://r5---sn-5hne6nsy.googlevideo.com/videoplayback?expire=1557783445&ei=NY_ZXOLvJc35-gb41K_oDQ&ip=134.19.186.201&id=o-AAWpzMZQhId9X2L6eNLvGNgIfdgan1ro4T97gJydU77y&itag=18&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-5hne6nsy%2Csn-4g5edn7e&ms=au%2Conr&mv=u&pl=24&mime=video%2Fmp4&gir=yes&clen=9882473&ratebypass=yes&dur=186.015&lmt=1550480810246476&mt=1557761507&fvip=5&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=ALgxI2wwRAIgXHVbz0P7s9nxTUt3bfsQwXolA2hhYT0SoHXN3wd3mVgCIGSY_ASJ91mqVEPQi0n8gPNS8tCEW0pciutJrhGfurGT&lsparams=mm%2Cmn%2Cms%2Cmv%2Cpl&lsig=AHylml4wRQIhALtAsjE4pPrSTJE67MM6NYs19i0npupch8MiL5ubjbdRAiA1p4ba5r9-mGmPuvRLh5_99bdDyIO9qapibuEsJyU62A%3D%3D","default":false}]},{"name":"Câu Chuyện Lego (Phần 2)","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cau-chuyen-lego-phan-2_11887/xem-phim/"},"nameOrigin":"The Lego Movie 2","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcau-chuyen-lego-phan-2-the-lego-movie-2-2019.jpg%3Fsize%3D300"},"directors":["Mike Mitchell"],"actors":["Alison Brie","Chris Pratt","Elizabeth Banks","Tiffany Haddish"],"genres":["Phim Hành Động","Phim Chiến Tranh","Phim Hài Hước","Phim Hoạt Hình","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":105,"desc":"Trong The Lego Movie 2, thần dân xứ sở Lego lại phải đối diện với một kẻ thù khủng đến mức khiến cả Người dơi cũng bó tay chịu trói. Phim lấy bối cảnh ngày tận thế Lego sau khi thế giới bị một con quái vật tàn phá. Cuộc sống của người dân trở nên khó khăn và điêu đứng trừ Emmet. Anh chàng vẫn luôn lạc quan, yêu đời và chào hỏi mọi thành phần dù là đáng sợ nhất. Song, đây là lúc mối đe dọa mới từ không gian mang tên Lego Duplo xuất hiện và nhăm nhe hủy diệt mọi thứ. Dù được xem là anh hùng của phần phim trước nhưng chàng nam chính của chúng ta vẫn khá vô dụng và phải phụ thuộc vào Lucy hay Batman. Hậu quả là khi kẻ thù đòi giao nộp thủ lĩnh thì tất cả đều bị bắt đi trừ Emmet. Giờ đây, anh chàng buộc phải tự lực cánh sinh để cứu tất cả mọi người. The Lego Movie 2 vẫn sẽ theo phong cách hài bựa đặc trưng với những tình huống hết sức lầy lội cùng dàn nhân vật đông đảo tới từ vô số thương hiệu.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/1c1bb67689b47be0f1925cb9f4ee41bb/1c1bb67689b47be0f1925cb9f4ee41bb.playlist.m3u8","default":true}]},{"name":"Thiếu Hiệp Hảo Công Phu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thieu-hiep-hao-cong-phu_11870/xem-phim/"},"nameOrigin":"Swordsman Nice Kung fu","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthieu-hiep-hao-cong-phu-swordsman-nice-kung-fu-2019.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Đang cập nhật"],"genres":["Phim Hài Hước","Phim Võ Thuật"],"countries":["Trung Quốc"],"duration":62,"desc":"Được chiếu online trên mạng iQiyi vào đúng dịp Tết nguyên đán 2019, Thiếu Hiệp Hảo Công Phu là bộ phim võ thuật trung quốc khá thú vị với sự kết hợp giữa võ thuật, hài hước pha trộn chút giả tưởng, nó được chỉ đạo bởi đạo diễn Lữ Lỗi cùng sự hợp tác của nhiều nhà sản xuất khác nhau. Phim không có dàn sao đình đám, đảm nhiệm vai nam chính không phải là một ngôi sao võ thuật nhưng sự góp mặt của nam diễn viên từng nhiều lần thủ vai Qủy cước Thất – Hùng Hân Hân là bảo chứng phần nào cho những màn đánh võ mãn nhãn. Nội dung của phim Thiếu Hiệp Hảo Công Phu xoay quanh chàng trai Diệp Thiếu Hiệp, một thiếu niên quyết tâm học võ để trả thù cho cha. Câu chuyện này sau đó đã mở rộng thành một câu chuyện truyền cảm hứng chống lại các thế lực xấu xa và bảo vệ lợi ích của các thành viên trong gia đình. Trải qua bao khổ nạn, cuối cùng cậu cũng trở thành một Nhất Đại Tông Sư. Nhân vật chính ngoài thể hiện phẩm chất Nho gia Trung Hiếu Nhân Nghĩa, còn mang theo quan niệm bình đẳng bác ái của phương Tây.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednle.googlevideo.com/videoplayback?id=5203c66ff03b788d&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=m&pl=25&sc=yes&ei=jorZXKu_JIf31gKYyp-YDg&susc=ph&app=fife&mime=video/mp4&dur=3764.279&lmt=1557654221094934&mt=1557760550&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767854&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=900E9C986973313F0B274B617CB4C244B04D75D5C979F5334D8F32540EF14CDD.D342F5906ECAFBC92C62CD96E6807DC4716680E5298E168E81A4551528A7632B&key=us0","default":false}]},{"name":"Cửa Hàng Kỳ Lân","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cua-hang-ky-lan_11866/xem-phim/"},"nameOrigin":"Unicorn Store","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcua-hang-ky-lan-unicorn-store-2019.jpg%3Fsize%3D300"},"directors":["Brie Larson"],"actors":["Bradley Whitford","Brie Larson","Joan Cusack","Samuel L. Jackson"],"genres":["Phim Hài Hước","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":92,"desc":"Unicorn Store là bộ phim thuộc thể loại hài, tâm lí xoay quanh cuộc đời \"ẩm ương\" của Kit (Brie Larson) - một người phụ nữ gần 30 tuổi, sống cùng với bố mẹ và có niềm đam mê lớn dành cho 7 sắc cầu vồng và kì lân. Sau khi bị loại khỏi trường nghệ thuật vì góc sáng tạo bị đánh giá là kì quái, Kit trải qua chuỗi ngày thất nghiệp, nằm dài trên ghế sô pha chỉ để xem phim truyền hình. Một ngày nọ, cô quyết định nộp đơn xin làm công việc văn phòng, không phải vì thiếu tiền hay đam mê, mà chỉ vì không muốn trở thành \"nỗi thất vọng\" lớn của cha mẹ.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nzl.googlevideo.com/videoplayback?id=c234f8a55050f777&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=koPZXJ6WJ5G01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&dur=5513.903&lmt=1555865554271013&mt=1557758120&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766066&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=3522A8CA622E1D63C698140C1C2B03DAEAC1E55B7385C8EC3AB9E87DDC6B9FA5.B7AB1CEC54FE9AC39A4C7532654019721F5E452D86C2B9DD816D3B817E9164C9&key=us0","default":false},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nzl.googlevideo.com/videoplayback?id=c234f8a55050f777&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=koPZXPqMJ4rH1wLxyrLwBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5513.903&lmt=1555867352425867&mt=1557758120&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766066&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=58596CAD9859060A22211E25480F0FFC3C03DE3FA4DEEE6AED80793781A54D47.CC60FEF52F8166FF97F15C573F0640537235E3BEE99A7F94908D9903E0B63518&key=us0","default":true}]},{"name":"Cuộc Hôn Nhân Đẫm Máu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-hon-nhan-dam-mau_11874/xem-phim/"},"nameOrigin":"The Russian Bride","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-hon-nhan-dam-mau-the-russian-bride-2019.jpg%3Fsize%3D300"},"directors":["Michael S. Ojeda"],"actors":["Corbin Bernsen","Kristina Pimenova","Michael Robert Brandon","Oksana Orlan"],"genres":["Phim Kinh Dị"],"countries":["Mỹ"],"duration":101,"desc":"Một người phụ nữ Nga chuyển tới Mỹ cùng con gái để kết hôn với một tỷ phú ẩn dật, người hóa ra là một kẻ tâm thần. Hắn khiến cuộc sống của hai mẹ con trở thành vòng xoáy địa ngục.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/0be1f2e55c225f95586c5cbc557bc002/0be1f2e55c225f95586c5cbc557bc002.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-russian-bride-2019/1"},{"name":"Truyền Thuyết Đảo Cocain","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/truyen-thuyet-dao-cocain_11814/xem-phim/"},"nameOrigin":"The Legend of Cocaine Island","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftruyen-thuyet-dao-cocain-the-legend-of-cocaine-island-2019.jpg%3Fsize%3D300"},"directors":["Theo Love"],"actors":["Andy Culpepper","Bo Butterworth","Bri Bryant","Greg Engleberg"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Mỹ"],"duration":83,"desc":"The Legend of Cocaine Island (Truyền Thuyết Về Đảo Cocaine) kể rằng có một người chủ doanh nghiệp nhỏ tình cờ nghe được truyền thuyết về \"kho báu\" cocaine trị giá 2 triệu USD được giấu ở vùng Caribbean. Vì gánh nợ trong cuộc Đại suy thoái, anh ta ấp ủ một kế hoạch để lấy lại các chiến lợi phẩm bị chôn vùi. Nhưng vì không có kinh nghiệm buôn ma túy trước đó, các rắc rối bắt đầu ập đến với anh chàng \"gà mờ\".","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edn7z.googlevideo.com/videoplayback?id=94d4c1f300be5f54&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7z&ms=nxu&mv=u&pl=25&sc=yes&ei=oZDZXNTRLJiJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&dur=5223.746&lmt=1554594902803033&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557769409&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=889250BAC3CC2960A7352639A86CABC2DBAABCCB4BA310F4663DEADBB28AFB26.E1CF9DF5E4AB6089036D0937EEC913369A645EEF95FD1ECD2E7DA13E9C459DE9&key=us0","default":false},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nzs.googlevideo.com/videoplayback?id=f62784e28fedc2a2&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ei=oZDZXPPFLJqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5223.746&lmt=1554597090952995&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557769409&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=9BBDBD7A3F0C8D042550C89631D600A94EB73B559C3F899492925A73BE7D0EC2.D24790C20BD10339A7FFF33D83BEF5A4C58BC1E455E99088026666CC7C5FC465&key=us0","default":true}]},{"name":"Đại Úy Marvel","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/dai-uy-marvel_11845/xem-phim/"},"nameOrigin":"Captain Marvel","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdai-uy-marvel-captain-marvel-2019.jpg%3Fsize%3D300"},"directors":["Anna Boden"],"actors":["Ben Mendelsohn","Brie Larson","Jude Law","Samuel L. Jackson"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":123,"desc":"Lấy bối cảnh những năm 90s, Captain Marvel là một cuộc phiêu lưu hoàn toàn mới đến với một thời kỳ chưa từng xuất hiện trong vũ trụ điện ảnh Marvel. Bộ phim kể về con đường trở thành siêu anh hùng mạnh mẽ nhất vũ trụ của Carol Danvers. Bên cạnh đó, trận chiến ảnh hưởng đến toàn vũ trụ giữa tộc Kree và tộc Skrull đã lan đến Trái Đất, liệu Danvers và các đồng minh có thể ngăn chặn binh đoàn Skrull cũng như các thảm họa tương lai?","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/106f7627dcf29af140c7d7cc645ab5a3/106f7627dcf29af140c7d7cc645ab5a3.playlist.m3u8","default":true}]},{"name":"Con Nuôi Bất Đắc Dĩ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/con-nuoi-bat-dac-di_11810/xem-phim/"},"nameOrigin":"Instant Family","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcon-nuoi-bat-dac-di-instant-family-2018.jpg%3Fsize%3D300"},"directors":["Sean Anders"],"actors":["Isabela Moner","Mark Wahlberg","Octavia Spencer","Rose Byrne"],"genres":["Phim Hài Hước"],"countries":["Mỹ"],"duration":119,"desc":"Câu chuyện hài hước về cặp vợ chồng Pete và Ellie khi quyết định trở thành ba mẹ nuôi của 3 đứa trẻ với 3 độ tuổi và tính cách khác nhau: Cô gái tuổi teen Lizzy, cậu bé ngốc nghếch Juan và cô út luôn la hét Lita.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/4dcddb7001ba8600b9b27289e561b842/4dcddb7001ba8600b9b27289e561b842.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/instant-family-2018/1"},{"name":"Bộ Ba Vệ Sĩ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bo-ba-ve-si_11808/xem-phim/"},"nameOrigin":"Triple Threat","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbo-ba-ve-si-triple-threat-2019.jpg%3Fsize%3D300"},"directors":["Jesse V. Johnson"],"actors":["Iko Uwais","Scott Adkins","Tiger Hu Chen","Tony Jaa"],"genres":["Phim Hành Động"],"countries":["Trung Quốc"],"duration":96,"desc":"Ba nhân vật chính Payu (Tony Jaa), Jaka (Iko Uwais), Long Fei (Tiger Chen) sẽ kết hợp cùng với nhau trong nhiệm vụ bảo vệ cô gái có cha là tỷ phú, chủ của một tập đoàn lớn. Trong khi đó sát thủ Collin (do Scott Adkins) dẫn đầu một băng nhóm tội phạm được cử đi để hạ sát cô ta....","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/a017f1cec973b07d44d37e6081180c27/a017f1cec973b07d44d37e6081180c27.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/triple-threat-2019/1"},{"name":"Cậu Bé và Sứ Mệnh Thiên Tử","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cau-be-va-su-menh-thien-tu_11805/xem-phim/"},"nameOrigin":"The Kid Who Would Be King","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcau-be-va-su-menh-thien-tu-the-kid-who-would-be-king-2019.jpg%3Fsize%3D300"},"directors":["Joe Cornish"],"actors":["Joey Ansah","Louis Ashbourne Serkis","Rebecca Ferguson","Tom Taylor"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Viễn Tưởng"],"countries":["Anh"],"duration":120,"desc":"Cậu nam sinh người Anh Alexander Elliot, người đã rút thanh kiếm Excalibur của vua Arthur khỏi lòng đất, khiến cõi trần gian gặp lâm nguy. Cậu bé đã tập hợp những những người bạn thân nhất của mình, để cùng nhau chống lại kẻ phản diện từ thời Trung Cổ Morgana. Ả ta đang triệu hồi đội quân quái vật cổ xưa nhằm âm mưu thống trị thế giới.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/42b888ff630f2b6b9977e949a0d81714/42b888ff630f2b6b9977e949a0d81714.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-kid-who-would-be-king-2019/1"},{"name":"Đòi Nợ Thuê","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/doi-no-thue_11773/xem-phim/"},"nameOrigin":"The Debt Collector","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdoi-no-thue-the-debt-collector-2018.jpg%3Fsize%3D300"},"directors":["Jesse V. Johnson"],"actors":["Louis Mandylor","Scott Adkins","Tony Todd","Vladimir Kulich"],"genres":["Phim Tâm Lý"],"countries":["Mỹ"],"duration":95,"desc":"Một võ sĩ được đào tạo bài bản sẽ đi làm công việc đòi nợ cho tổ chức đen. Công việc có vẻ dễ dàng, cho đến khi một \"khách hàng\" kéo anh ta vào một tình huống khó nhằn hơn bao giờ hết...","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/9b4b8fd7e18e8695f63c32bcc097a15c/9b4b8fd7e18e8695f63c32bcc097a15c.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-debt-collector-2018/1"},{"name":"Bạch Xà: Duyên Khởi","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bach-xa-duyen-khoi_11769/xem-phim/"},"nameOrigin":"White Snake","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbach-xa-duyen-khoi-white-snake-2019.jpg%3Fsize%3D300"},"directors":["đang cập nhập"],"actors":["đang cập nhập"],"genres":["Phim Hoạt Hình","Phim Thần Thoại"],"countries":["Trung Quốc"],"duration":99,"desc":"Nối tiếp thành công của tác phẩm Tiểu Môn Thần tại Trung Quốc vào năm 2016, năm nay hãng Light Chaser lại cho ra mắt một bộ phim hoạt hình 3D về chủ đề huyền huyễn, thần thoại mang tên Bạch Xà: Duyên Khởi (Bạch Xà: Khởi đầu duyên phận).Phim lấy bối cảnh những năm cuối thời Đường, quốc sư vì mối hận với xà tộc nên đã phát động dân chúng bắt rắn. Bạch Xà - Tiểu Bạch trên đường ám sát quốc sư không may mất trí nhớ, được người bắt rắn A Tuyên cứu giúp, A Tuyên chính là tiền kiếp của Hứa Tiên.Dưới sự giúp đỡ của A Tuyên, Tiểu Bạch bắt đầu dấn thân vào con đường mạo hiểm tìm lại kí ức. Hai người dần dần nảy sinh tình cảm với nhau, thế nhưng lúc này thân phận xà yêu của nàng cũng được hé lộ. Người và yêu vốn khác biệt, liệu họ có vượt qua được thử thách này?","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nzs.googlevideo.com/videoplayback?id=e1403ee1874321da&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ei=bpfZXKL-AZfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5922.086&lmt=1553487084075103&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771150&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=6BD9028FBC313C838AAC0BAF0690C12837B8B2988427CD35F4E7FF3A97D7A3AE.685DCD4FBFF0B86D0AF179BD1DE1FAF2F939012B94A3A97541B3D3930D7D06E4&key=us0","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nzs.googlevideo.com/videoplayback?id=e1403ee1874321da&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ei=bpfZXP7wAdKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&dur=5922.086&lmt=1553484500928458&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771150&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9AE39FFAC542AF572E5A2CCCD01EAD720516B730F139FF6EC173AEA6A441923D.07331BA7DC13AC59B7DF098F7F831F9480226791F6816CE223EA58913BD6D086&key=us0","default":false}]},{"name":"Bí Kíp Luyện Rồng 3: Vùng Đất Bí Ẩn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bi-kip-luyen-rong-3-vung-dat-bi-an_11806/xem-phim/"},"nameOrigin":"How to Train Your Dragon 3: The Hidden World","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbi-kip-luyen-rong-3-vung-dat-bi-an-how-to-train-your-dragon-3-the-hidden-world-2019.jpg%3Fsize%3D300"},"directors":["Dean DeBlois"],"actors":["America Ferrera","Cate Blanchett","F. Murray Abraham","Jay Baruchel"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":104,"desc":"Sau khi Hiccup tạo ra một thế giới hòa bình cho loài rồng, Răng Sún phát hiện ra một người bạn mới đầy bí hiểm. Lúc này Hiccup đã trở thành người lãnh đạo của cả làng gánh trên vai trọng trách gìn giữ sự an nguy cho mọi người. Vì vậy, cậu không thể mãi bị cuốn theo những cuộc phiêu lưu bất tận với Răng Sún. Và khi nguy hiểm ập đến ngôi làng, cả Hiccup và Răng Sún đều đã đứng lên, anh dũng bảo vệ giống loài của mình.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/dfe7f7ebfde6d4d2dbc8a775ca969d86/dfe7f7ebfde6d4d2dbc8a775ca969d86.playlist.m3u8","default":true}]},{"name":"Zombie Đại Hạ Giá","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/zombie-dai-ha-gia_11766/xem-phim/"},"nameOrigin":"The Odd Family: Zombie On Sale","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fzombie-dai-ha-gia-the-odd-family-zombie-on-sale-2019.jpg%3Fsize%3D300"},"directors":["Lee Min-Jae"],"actors":["Jung Jae Young","Kim Nam Gil","Lee Soo kyung","Uhm Ji Won"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":112,"desc":"Gia đình ông Park vốn dĩ đã kỳ quặc nay còn kỳ quái hơn khi nhận nuôi zombie trong nhà. Trái ngược với nỗi sợ khi phải đối mặt với zombie thì gia đình ông Park đã tận dụng kiếm tiền một cách triệt để từ thành viên mới này. Từ đây nảy sinh những tình huống hài hước khó đỡ cùng chuyện tình đáng yêu giữa Zombie và cô con út của gia đình ông Park.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/eabeb4a52f7194e3f26d6f31295995f8/eabeb4a52f7194e3f26d6f31295995f8.playlist.m3u8","default":true}]},{"name":"Băng Cướp Bất Đắc Dĩ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bang-cuop-bat-dac-di_11767/xem-phim/"},"nameOrigin":"Triple Frontier","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbang-cuop-bat-dac-di-triple-frontier-2019.jpg%3Fsize%3D300"},"directors":["J.C. Chandor"],"actors":["Adria Arjona","Ben Affleck","Charlie Hunnam","Oscar Isaac"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":125,"desc":"Một sĩ quan đặc nhiệm chống ma túy tên Pope (Oscar Isaac) đánh hơi thấy nơi giấu tiền của tên trùm ma túy Colombia. Anh quyết định tập hợp một đội gồm những cựu binh thiện chiến với kế hoạch đột nhập vào hang ổ của tên mafia, cướp tiền và rút êm. Tham gia vào nhóm của \"Giáo Hoàng\" có \"Thiết Thủ\" Ironhead (Charlie Hunnam) từng giết 43 mạng người, em trai Ben (Garrett Hedlund) của Ironhead, phi công \"Cá Mèo\" (Pedro Pascal) cùng tay lính kỳ cựu \"Ruồi Đỏ\" (Ben Affleck) bị bắn 5 lần... không chết. Tất nhiên mọi chuyện không dễ dàng như thế và 5 con người phải đối mặt với hậu quả mà mình gây ra.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/84a0373c1def0047947a39d33e9b666a/84a0373c1def0047947a39d33e9b666a.playlist.m3u8","default":true}]},{"name":"Mãi Bên Cháu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mai-ben-chau_11780/xem-phim/"},"nameOrigin":"Stand by Me / Deok Goo","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmai-ben-chau-stand-by-me-deok-goo-2018.jpg%3Fsize%3D300"},"directors":["Bang Soo-In"],"actors":["Jang Gwang","Jung Ji Hoon","Lee Soon Jae","Sung Byoung Sook"],"genres":["Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":91,"desc":"Một người ông 70 tuổi đã một tay nuôi lớn hai đứa cháu của mình. Ông cố để lại cho các cháu một thứ đặc biệt khi ông biết mình không còn sống được bao lâu nữa.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nzl.googlevideo.com/videoplayback?id=37c9fc6c5917ca2e&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=m&pl=25&sc=yes&ei=VZnZXLf_B4e11gLou7m4CQ&susc=ph&app=fife&mime=video/mp4&dur=5488.616&lmt=1552843763493129&mt=1557764317&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771637&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=D2B9C94D553616720822BD87F5874C1B0EA41739F1ADAFD45D460EBF028B3B74.974C5C5679EE1D1AA0C1754E1B70367C133D23E3359B75D517C087D1252ADCF4&key=us0","default":false},{"resolution":720,"embedUrl":"https://r1---sn-4g5edne7.googlevideo.com/videoplayback?id=210c75db03e22f8a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne7&ms=nxu&mv=m&pl=25&sc=yes&ei=VZnZXPT4B5bg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5488.616&lmt=1552846288833062&mt=1557764317&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771637&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3B22C03498A428850DAF07E743B479193BCA6FA5A7B09A816C3D31AC8106D1C6.680A8953349EF906C42C65BF97998E6DB3980EB28046AC98DD86792C79BEB0FD&key=us0","default":true}]},{"name":"Ma Thổi Đèn: Trùng Cốc Vân Nam","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ma-thoi-den-trung-coc-van-nam_11771/xem-phim/"},"nameOrigin":"Mojin: The Worm Valley","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fma-thoi-den-trung-coc-van-nam-mojin-the-worm-valley-2018.jpg%3Fsize%3D300"},"directors":["Xing Fei"],"actors":["Chih Wei Tang","Hang Cai","Heng Yu","Xuan Gu"],"genres":["Phim Phiêu Lưu"],"countries":["Trung Quốc"],"duration":110,"desc":"Để tự cứu mình khỏi lời nguyền của Động Quỷ Tinh Tuyệt, Hồ Bát Nhất cùng Tuyền béo và Shirley Dương lên đường đến Trùng cốc, Vân Nam để tìm Mộc Trần Châu ẩn trong mộ Hiến Vương, vị vua bí hiểm, đầy phép phù thủy của nước Điền cổ hai ngàn năm trước. Đến vùng núi Già Long gần Trùng cốc, trước mắt ba Mô kim Hiệu úy, một loạt chuyện kỳ quái đã xảy ra: những nô lệ bị thành xác khô bởi tà thuật cả ngàn năm trước, bọn cá ăn thịt người hung hãn, con sâu khổng lồ bất tử trong bộ giáp vảy rồng... Và chuyến đi lần này, họ không chỉ gặp những cạm bẫy âm hiểm hay đám cương thi trong mộ cổ, mà còn có thứ đáng sợ hơn gấp bội phần ...","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5ednle.googlevideo.com/videoplayback?id=112cb1e4c67ea338&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=BYfZXMGQK8vJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6611.882&lmt=1555496124034385&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766949&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=A75BDD6CB0ED17631AF54603CE904F53E757C6B6759E9FCA83CF5FD822E3C2BE.4CB7A93C81F04CF1318D827E340280963B5BC0DC8F5D046E839CAA9252C7C1BC&key=us0","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nss.googlevideo.com/videoplayback?id=112cb1e4c67ea338&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nss&ms=nxu&mv=u&pl=25&sc=yes&ei=BYfZXMaZK5iJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&dur=6611.882&lmt=1555492206008775&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766949&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B9ABC9BD06D61A35F93F9794C314F6D1E78901481C327BF0D232D1BDE6845AA2.C000260534F4C9C9207A22A34E69A2F5C09B4032BC6337A4977DAA8DBE20E3AD&key=us0","default":false}]},{"name":"Ảo Ảnh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ao-anh_11809/xem-phim/"},"nameOrigin":"Mirage (Durante la Tormenta)","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fao-anh-mirage-durante-la-tormenta-2018.jpg%3Fsize%3D300"},"directors":["Oriol Paulo"],"actors":["Adriana Ugarte","Albert Pérez","Francesc Orella","Javier Gutiérrez"],"genres":["Phim Tâm Lý"],"countries":["Khác"],"duration":128,"desc":"Mirage (Ảo Ảnh) bắt đầu với những hình ảnh của năm 1989, xoay quanh cậu bé 12 tuổi Nico Lasarte thích đàn hát và thường thu âm lại chúng bằng đầu băng VHS. Hai mươi lăm năm sau, ngôi nhà của Nico đã trở thành tổ ấm mới của đôi vợ chồng Vera Roy (Adriana Urgate) và David Ortiz (Alvaro Morte), cùng cô con gái nhỏ Gloria.Hai cuộc đời hoàn toàn xa lạ, ở hai thời điểm cách biệt lại tình cờ \"va\" vào nhau thông qua một cơn bão âm u, với mây đen giăng đầy trời. Cơn bão lặp lại sau 25 năm. Nhưng số phận của những con người nhỏ bé, vì nó mà đã thay đổi tới mức không thể ngờ.Hai năm sau thời điểm The Invisible Guest (2017) ra mắt và làm công chúng thế giới sững sờ, thích thú trước hành trình vạch trần tội ác của tay doanh nhân trẻ điển trai Adrian Doria, đạo diễn Oriol Paulo lại tiếp tục mang đến một câu chuyện trinh thám mới Mirage (Ảo Ảnh) là sự kết hợp của nhiều yếu tố, từ khoa học - viễn tưởng, rùng rợn, bí ẩn xen lẫn với những bi kịch và một chút lãng mạn kì ảo.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/599e7ae843c2aa22828c829470012662/599e7ae843c2aa22828c829470012662.playlist.m3u8","default":true}]},{"name":"Mirai: Em Gái Đến Từ Tương Lai","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mirai-em-gai-den-tu-tuong-lai_11784/xem-phim/"},"nameOrigin":"Mirai Of the Future / Mirai no Mirai","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmirai-em-gai-den-tu-tuong-lai-mirai-of-the-future-mirai-no-mirai-2018.jpg%3Fsize%3D300"},"directors":["Mamoru Hosoda"],"actors":["Crispin Freeman","Daniel Dae Kim","John Cho","Rebecca Hall"],"genres":["Phim Hoạt Hình","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Nhật Bản"],"duration":98,"desc":"Từ một cậu bé bướng bỉnh được cưng chiều nhất gia đình, Kun bỗng thấy vị trí của mình bị lung lay khi em gái cậu – Mirai, ra đời. Đố kỵ xen lẫn tủi thân, cậu bé 4 tuổi cảm thấy tình thương của bố mẹ dành cho mình bị giảm sút và cậu hoàn toàn bị choáng ngợp với việc phải trở thành một người anh. Mọi thứ dường rắc rối hơn khi Kun tình cờ phát hiện ra một cánh cổng kỳ lạ nơi đưa cậu đến gặp mẹ mình lúc bà còn là một cô bé và em gái mình – Mirai lại là một học sinh tuổi teen. Trải qua rất nhiều cuộc phiêu lưu, liệu Kun có dần thay đổi bản thân và học được cách trở thành một người anh trai đúng nghĩa?","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/5bf140b85e2ab9d91d995f525ab2dc37/5bf140b85e2ab9d91d995f525ab2dc37.playlist.m3u8","default":true}]},{"name":"Kẻ Cướp Vùng Hindostan","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ke-cuop-vung-hindostan_11772/xem-phim/"},"nameOrigin":"Thugs of Hindostan","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fke-cuop-vung-hindostan-thugs-of-hindostan-2018.jpg%3Fsize%3D300"},"directors":["Vijay Krishna Acharya"],"actors":["Aamir Khan","Amitabh Bachchan","Fatima Sana Shaikh","Katrina Kaif"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Ấn Độ"],"duration":164,"desc":"Phim Thugs of Hindostan (Kẻ Cướp Vùng Hindostan) dựa trên tiểu thuyết Confessions of a Thug của nhà văn Philip Meadows Taylor, kể về tên cướp Ameer Ali, băng nhóm của Ameer đã đặt ra một thách thức nghiêm trọng cho Đế Quốc Anh ở Ấn Độ ( vùng Ấn Độ là thuộc địa của Anh- gọi là Hindustan hoặc Hindostan ) vào đầu thế kỉ 19...","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5ednll.googlevideo.com/videoplayback?id=c23060cee52baaa2&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=m&pl=25&sc=yes&ei=V4bZXP7UOaSK8gOIx6ngAg&susc=ph&app=fife&mime=video/mp4&dur=49.876&lmt=1552460352282063&mt=1557759426&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766775&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=7D6A649C2F9260891CB9ED3BF996561E490DCC4EC9C62344DFE802153F371517.B81E36299192C585354D91C644D2AF368D32546189BFB627619E338F6723411E&key=us0","default":false},{"resolution":720,"embedUrl":"https://r6---sn-4g5ednll.googlevideo.com/videoplayback?id=c23060cee52baaa2&itag=22&source=picasa_otf&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=m&pl=25&sc=yes&ei=V4bZXMvIOcvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&otf=1&otfp=1&dur=0.000&lmt=1552461664041923&mt=1557759426&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766775&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,otf,otfp,dur,lmt&signature=1583CC9FF5EA5C6E61A2E7A7636E4E04A071822C6FF1C12820892C3160206292.41C890C5BBB5C3655E14DD33D191FBEB8C739740CA58C5D3B9AF09BC482034B0&key=us0","default":true}]},{"name":"Hãy Để Em Yêu Anh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hay-de-em-yeu-anh_11781/xem-phim/"},"nameOrigin":"Live Again, Love Again","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhay-de-em-yeu-anh-live-again-love-again-2018.jpg%3Fsize%3D300"},"directors":["Han Sang-Hee"],"actors":["Chi Pu","Jung Chae Yeon","Lee Su Ryeon","San E"],"genres":["Phim Chiến Tranh","Phim Hình Sự","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":97,"desc":"LALA: HÃY ĐỂ EM YÊU ANH kể về những người trẻ theo đuổi đam mê, cùng nhau chia sẻ tình bạn, tình yêu, những tổn thương trong cuộc sống. Nhân vật Hà Mi (Chi Pu) là một nhạc sĩ trẻ đam mê sáng tác. Còn G-Feel (San E) là nhạc sĩ thiên tài của Hàn Quốc nhưng đang phải đối mặt với áp lực từ sự nổi tiếng. Giữa hai con người xa lạ, sống ở hai đất nước có một sợi dây liên kết là cô gái Yoon Hee (Chae Yeon). Câu chuyện về mối quan hệ kỳ lạ của 3 người được hé mở khi G-Feel quyết định sang Việt Nam sau một biến cố lớn.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nls.googlevideo.com/videoplayback?id=e2b24448ccf2ffba&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nls&ms=nxu&mv=m&pl=25&sc=yes&ei=EZzZXKGMMpfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=3847.801&lmt=1552843325360723&mt=1557764994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557772337&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9AC1A828BD087BBBABAA403D32536F730809E7BCCE864B86943CD5F5006DF227.867C35233012E590FC6C474F76EEEE7A6FEEC27E6A9255B5DD4D4248455C80EE&key=us0","default":false},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nls.googlevideo.com/videoplayback?id=e2b24448ccf2ffba&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nls&ms=nxu&mv=m&pl=25&sc=yes&ei=EZzZXKCUMs-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3847.801&lmt=1552845045932651&mt=1557764994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557772337&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=918F189FB152770256F290710E90F4F1943A78301CE1E2D28E86DCEB1A17FE8C.9AE04293972134DEDABF6D3551D51FFAC5A5DE6584FAA9ABEB5318773017EE20&key=us0","default":true}]},{"name":"Điệp Vụ XXXL","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/diep-vu-xxxl_11717/xem-phim/"},"nameOrigin":"Fat Buddies","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdiep-vu-xxxl-fat-buddies-2018.jpg%3Fsize%3D300"},"directors":["Bao Bối Nhĩ"],"actors":["Bao Bối Nhĩ","Clara Lee","Tiểu Tống Giai","Yasuaki Kurata"],"genres":["Phim Hành Động","Phim Hài Hước"],"countries":["Trung Quốc"],"duration":109,"desc":"phim xoay quanh cặp đôi cảnh sát cồng kềnh, bồng bềnh và hành trình phá án vạch trần một công ty sản xuất thuốc phiện. Trong đó, một người là Hách Anh Tuấn, 175 kg và đang làm nhân viên bảo vệ, anh luôn mơ ước trở thành một thám tử thực thụ và người còn lại là đại úy J, một cựu nhân viên đặc vụ cao cấp.J vốn từng là một điệp vụ hoàn hảo nhưng sau vụ tai nạn khiến não bị tổn thương nặng, anh đánh mất dần đi chính mình, cơ thể béo lên và chậm chạp đi rất nhiều nhưng trong tâm trí anh vẫn chưa bao giờ quên mình là một đặc vụ. Sau nhiều lỗ lực, J đã được nhận một nhiệm vụ mật, đó là đi đến Nhật Bản lấy tài liệu mật. Nhưng không may mắn anh gặp phải rắc rối sau khi lấy được tài liệu, nhờ sự giúp đỡ của anh chàng bảo vệ Anh Tuấn, J mới thoát nạn và 2 người tiếp tục hành trình hoàn thành nhiệm vụ.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/bdc5e0042dc7c8c5a80ed25073ca4567/bdc5e0042dc7c8c5a80ed25073ca4567.playlist.m3u8","default":true}]},{"name":"Ráp phờ Đập Phá 2: Phá đảo thế giới ảo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/rap-pho-dap-pha-2-pha-dao-the-gioi-ao_11730/xem-phim/"},"nameOrigin":"Wreck It Ralph 2: Ralph Breaks the Internet","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Frap-pho-dap-pha-2-pha-dao-the-gioi-ao-wreck-it-ralph-2-ralph-breaks-the-internet-2018.jpg%3Fsize%3D300"},"directors":["Phil Johnston"],"actors":["Gal Gadot","John C. Reilly","Sarah Silverman","Taraji P. Henson"],"genres":["Phim Hoạt Hình"],"countries":["Mỹ"],"duration":112,"desc":"Sáu năm sau phần 1, một sự kiện thay đổi hoàn toàn cuộc sống của đôi bạn thân Ralph và Vanellope. Máy tính đã kết nối wifi, giờ đây họ bắt đầu cuộc phiêu lưu mới trên mạng Internet.Vì thiết bị trò chơi bị hỏng, anh chàng đập phá Ralph và cô bé Vanellope phải vào thế giới internet để mua đồ mới. Tất nhiên, muốn được như ý thì họ phải làm nhiều việc để kiếm đủ tiền. Cũng chính vì thế mà hai anh em được gặp gỡ và biết được nhiều điều mới lạ cùng một số người bạn vô cùng đặc biệt.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednse.googlevideo.com/videoplayback?id=0a11f102cb12811c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=QInZXLDcCJrj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&dur=6805.699&lmt=1556235517703104&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767520&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=90CB5EA4DED2B1E9F17A672FD6D34B7ADF198D25FFE0FF30FCFA89B679552793.387AA4626C45BFC7B50F9FB7FB7D37C1BDA824A73466F65FB0923586C8BAB49E&key=us0","default":false}]},{"name":"Hoa Lý Dạ Hương Tháng 10","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hoa-ly-da-huong-thang-10_11731/xem-phim/"},"nameOrigin":"October","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhoa-ly-da-huong-thang-10-october-2018.jpg%3Fsize%3D300"},"directors":["Shoojit Sircar"],"actors":["Alex","Banita Sandhu","Nikita Anand","Varun Dhawan"],"genres":["Phim Tâm Lý"],"countries":["Ấn Độ"],"duration":115,"desc":"Một nhóm thực tập sinh đang trải qua những ngày bình thường ở viện. Đột nhiên có một ca, môt vụ tai nạn đã làm thay đổi cuộc sống của họ. một câu chuyện ám ảnh nhưng cũng lấy đi nhiều nước mắt....","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nze.googlevideo.com/videoplayback?id=83eee13d9a883a56&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=QInZXI6eEsSD8gPjka6oAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6934.964&lmt=1548838607678138&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767520&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=EB4DB6851F2A22C5E5FF92DCEE3E7A7126F7285E17EE5EA7751705A4A07E1EFA.363D63F4B47C3492B7A1474E1797372777CF670963064147C7A1FEF179CD328E&key=us0","default":false},{"resolution":720,"embedUrl":"https://r2---sn-4g5edned.googlevideo.com/videoplayback?id=366553d9c08efd1d&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edned&ms=nxu&mv=u&pl=25&sc=yes&ei=QInZXKyvEtCJ1wLo47_YAw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6934.964&lmt=1548837001603225&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767520&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=DA36E07C79DBBF1D15464538308F05E1F5693A2D91163ED980746D1AC3983268.1BAAD416C8E2A54D71D14B2334C7C452AB9CAF0445BC52C6EC17C82D43B3B073&key=us0","default":true},{"resolution":1080,"embedUrl":"https://r6---sn-4g5ednle.googlevideo.com/videoplayback?id=83eee13d9a883a56&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=QInZXPvLEpaw1wKDxYKgDw&susc=ph&app=fife&mime=video/mp4&dur=6934.964&lmt=1548833179701839&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767520&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=22693336EFF4339823B304824A86C95A8AA500F8204F6F599CF2DFF0F59901A7.B7E46509B4439E746B4D73DAEC99DC91EB5B9BD2E191F4B62C60796A576AB767&key=us0","default":false}]},{"name":"Robot Đại Chiến: Bumblebee","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/robot-dai-chien-bumblebee_11543/xem-phim/"},"nameOrigin":"Bumblebee","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbumblebee-bumblebee-2018.jpg%3Fsize%3D300"},"directors":["Travis Knight"],"actors":["Hailee Steinfeld","John Cena","Kenneth Choi"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":1,"desc":"Trên đường đi vào năm 1987, Bumblebee được tìm thấy trong một bãi phế liệu ở một thị trấn nhỏ thuộc California. Charlie, một cô gái 18 tuổi và cố gắng tìm kiếm vị trí của mình trên thế giới này đã phát hiện ra Bumblebee tổn thương và gãy nát...","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/670001013578f52dc2e51d3d6c93723d/670001013578f52dc2e51d3d6c93723d.playlist.m3u8","default":true}]},{"name":"Chết Để Hồi Sinh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chet-de-hoi-sinh_11529/xem-phim/"},"nameOrigin":"Dying to Survive","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchet-de-hoi-sinh-dying-to-survive-2018.jpg%3Fsize%3D300"},"directors":["Muye Wen"],"actors":["Từ Tranh","Chuan jun Wang","Yiwei Zhou","Xinming Yang","Beibi Gong"],"genres":["Phim Hài Hước"],"countries":["Trung Quốc"],"duration":120,"desc":"Phim Chết Để Hồi Sinh: Dying to Survive quy tụ dàn diễn viên Từ Tranh, Chu Nhất Vi, Vương Truyền Quân, Đàm Trác, kể chuyện một chủ cửa hàng mắc nợ lớn, liều lĩnh tổ chức đường dây nhập thuốc Ấn Độ giá rẻ vào Trung Quốc. Anh đổi đời, được các bệnh nhân tôn sùng như thần thánh nhưng gặp rắc rối với luật pháp. Kịch bản dựa trên câu chuyện có thật về một thương gia mắc bệnh ung thư được xem như người hùng khi đưa thuốc từ Ấn Độ về Trung Quốc.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edns7.googlevideo.com/videoplayback?id=7055dcc7d4812423&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=u&pl=25&sc=yes&ei=GpzZXP66KYeA1gK60JEo&susc=ph&app=fife&mime=video/mp4&dur=6972.998&lmt=1552485963501030&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772346&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=642A8D4DBD25EA284E911720ECE5EA0CE4AB5C5012EC1C8E154C7EAB654B55B5.2AB63A510F0FD53B7CAC455838FAED95CFED9175F80FBE5B68CE1ACF7DD78D04&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nzs.googlevideo.com/videoplayback?id=7055dcc7d4812423&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ei=GpzZXISkNZaw1wKDxYKgDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6972.998&lmt=1552489813589630&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772346&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E31472AEC8EF76F1FB898F854E5B494FFC7226AFF86C0E8ACE36E04A58F0D05C.5D62C6384C3FA99D19B6B3496F23A76268A3A8F41799FC238CFA3C22C941E35C&key=us0#f720p","default":true}]},{"name":"Phi Vụ Tiền Giả","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phi-vu-tien-gia_11524/xem-phim/"},"nameOrigin":"Project Gutenberg","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphi-vu-tien-gia-project-gutenberg-2018.jpg%3Fsize%3D300"},"directors":["Felix Chong"],"actors":["Quách Phú Thành","Châu Nhuận Phát"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":130,"desc":"Phim Phi Vụ Tiền Giả Cảnh sát Hồng Kông đã phá vỡ một phi vụ tiền giả động trời và bắt được Lee Man, một thành viên chủ chốt của đường dây tiền giả khi hắn đang chạy trốn sang Thái Lan. Các thanh tra cảnh sát đang nỗ lực tìm ra chân tưóng của Painter, kẻ chủ mưu đứng đầu băng đảng làm tiền giả từ lời khai của Lee Man. Bất chấp sự truy đuổi mạnh mẽ của cảnh sát, băng đảng của Painter lừa mua được giấy in tiền và cướp được một xe tải chở mực bảo mật để sản xuất hàng loạt các tờ tiền đô giả có thể qua mặt được cả những chuyên gia tiền tệ. Sở cảnh sát nhận ra họ phải đối mặt với một kẻ thù mạnh hơn họ tưởng...","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednsl.googlevideo.com/videoplayback?id=607e010cd5cefb87&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=GpzZXObeIdKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&dur=7777.036&lmt=1552824781218217&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772346&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B65E4A0158CC88C04CF0A82C52B5F64A729D5F5B151861E8D036498854126D27.984628A72CF72043522B0E948697DA57861B685C1B1E8167BA15F55D2C4605C9&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nzz.googlevideo.com/videoplayback?id=607e010cd5cefb87&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ei=GpzZXP_EJZqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7777.036&lmt=1552829147280423&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772346&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E8A8C7E1881CC9704C2530A3AE35C6F5836E4EB02D31523E7E1ED42557DA97BC.25FE957B6F42F41420338A7A06EA5B05D043A44FD4B51119010662A7ABD68DAF&key=us0#f720p","default":true}]},{"name":"Sinh Tồn Nơi Hoang Đảo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sinh-ton-noi-hoang-dao_11542/xem-phim/"},"nameOrigin":"The Island","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsinh-ton-noi-hoang-dao-the-island-2018.jpg%3Fsize%3D300"},"directors":["Hoàng Bột"],"actors":["Hoàng Bột","Thư Kỳ","Vương Bảo Cường","Trương Nghệ Hưng","Hewei Yu","Xun Wang","Qinqin Li","Hu Guan","Jing Liang","You Lin Lee","Teddy Chan","Xiaohang Fang","Wenting Hao","Yanqing Liu","Hao Ning"],"genres":["Phim Hài Hước","Phim Phiêu Lưu","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":134,"desc":"The Island là phim hài do Hoàng Bột đạo diễn với sự tham gia của Hoàng Bột, Thư Kỳ, Vương Bảo Cường, Trương Nghệ Hưng (EXO)... lấy chủ đề tận thế, thuật lại câu chuyện về một nhóm người bị lạc ra đảo hoang sau khi sao chổi va chạm với địa cầu. Tác phẩm là lời đáp cho câu hỏi: Con người ta sẽ ứng xử thế nào ở một thế giới nơi quy tắc, pháp luật cùng những thứ vô cùng quen thuộc với con người như điện hay tiền bạc đều trở nên vô nghĩa? Khi ấy tình yêu có còn là tình yêu, quyền lực có còn là quyền lực?The Island là câu chuyện của một người đàn ông luôn mơ ước một lần chiến thắng xổ số. Nhưng khi chưa kịp giành được ước mơ này, ông và những người bạn, đồng nghiệp của mình lại bị mắc kẹt ở một hòn đảo hoang. Trong hoàn cảnh đối mặt với sự sống cái chết nơi đây, ông được chỉ ra ước mơ viển vông của mình và ý nghĩa của cuộc sống.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nsk.googlevideo.com/videoplayback?id=9684506a7560ddd8&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=DZ_ZXK3rCprj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&dur=8003.918&lmt=1552253490939550&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773101&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=8F233205019C6E5610398BEF0BA0C12007CF0FF8862B195D3D13EFDF0025C9E2.6640C03FB7CC4DF6E8F34A4A4B60E9CE4FC478D03290EC090DBDB2F644E34777&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edn7l.googlevideo.com/videoplayback?id=9684506a7560ddd8&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7l&ms=nxu&mv=u&pl=25&sc=yes&ei=DZ_ZXN7hFMnF1gL-mYdw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=8003.918&lmt=1552257587811840&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773101&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=486D719A046720E2252A34AB8EB8FA39C8919E1D1EAE6D7752A9A76EAECC24C9.0229A7D5BFE684B2756F22F794C77ECC19692815D6FB078FAF9FE0A091189279&key=us0#f720p","default":true}]},{"name":"Người Băng (Phần 2): Du Hành Thời Gian","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nguoi-bang-phan-2-du-hanh-thoi-gian_11541/xem-phim/"},"nameOrigin":"IceMan 2","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-bang-phan-2-ice-man-2-2018.jpg%3Fsize%3D300"},"directors":["Wai Man Yip"],"actors":["Chung Tử Đơn","Vương Bảo Cường","Huỳnh Thánh Y","Nhậm Đạt Hoa","Yasuaki Kurata"],"genres":["Phim Hành Động","Phim Cổ Trang","Phim Võ Thuật","Phim Viễn Tưởng"],"countries":["Trung Quốc"],"duration":120,"desc":"Người Băng (Phần 2) : Du Hành Thời Gian /  Ice Man 2 tiếp nối câu chuyện của người bằng 1 về chuyến phiêu lưu của 1 Cẩm y vệ đời nhà Minh do Chân Tử Đan đóng vai chính vào thế giới hiện đại. Câu chuyện bắt đầu khi anh vô tình bị đóng băng trong một trận đánh, cơ thể của được lưu giữ gần 4 thế kỷ. Sau khi bị phát hiện, cơ thể của người băng đã được gửi tới Hong Kong để tiến hành nghiên cứu. Tại đây, họ được giải thoát khỏi lớp băng, tái sinh và bắt đầu cuộc sống ở một thế giới hoàn toàn lạ lẫm.Xem Người Băng (Phần 1)","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednsk.googlevideo.com/videoplayback?id=3ea72bb7348290a2&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=NI3ZXOn6I5iJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&dur=5226.277&lmt=1551347220590130&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557768532&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=DA17086FA30CC50563615EF483B514D37E2C4DE72A852545449D3C48DF2AE8BB.2F6C915B487F2B15BDA25183087C2DC2050C680251B03F46ADD990131B7911D5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nzl.googlevideo.com/videoplayback?id=3ea72bb7348290a2&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=NI3ZXJOiJsnF1gL-mYdw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5226.277&lmt=1551350855331547&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557768532&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=A48AC4BB89353DAF22375AC00F274183774F769234139F4F5A3A56A4AABB8B1A.5D913784505B3098AC422E00721ADA3784F4A19762F6027283A391727B2BAE34&key=us0#f720p","default":true}]},{"name":"Cận Vệ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/can-ve_11555/xem-phim/"},"nameOrigin":"Close","year":"2019","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcan-ve-close-2019.jpg%3Fsize%3D300"},"directors":["Vicky Jewson"],"actors":["Noomi Rapace","Sophie Nélisse","Indira Varma","Charley Palmer Rothwell","Eoin Macken","Akin Gazi","George Georgiou","Olivia Jewson","Abdellatif Chaouqi","Huw Parmenter","Cherise Silvestri","Sargon Yelda","Robin Kermode","Jonathan Jude","Anna Marie Sullivan"],"genres":["Phim Hành Động"],"countries":["Mỹ"],"duration":94,"desc":"Nữ vệ sĩ và chuyên gia chống khủng bố Sam nhận một công việc bảo vệ Zoe - một nữ thừa kế trẻ giàu có. Cả hai bên đều không quan tâm đến việc sắp xếp cho đến khi một vụ bắt cóc bạo lực buộc họ phải trốn chạy.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nsd.googlevideo.com/videoplayback?id=c10a0562b949601e&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsd&ms=nxu&mv=u&pl=25&sc=yes&ei=TYnZXKSoMoHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5678.370&lmt=1552334590027870&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767533&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5332978F627C9B04025A1A4FA5895A78E2FC024BD86F792BB78928E16D8FD849.D4F347E96B73A247BCCF3CF7D971BAFF58F5057E38D9B946BEA1F6D91F73B710&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednsz.googlevideo.com/videoplayback?id=c10a0562b949601e&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=TYnZXLSjMoqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5678.370&lmt=1552334695238459&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767533&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=04A2277E1DAFCBF778AB200825BAC5A8C92B83117011AFF7FF16ADFF519C03EC.6E76B8AF3A62AA987011AEE47FA14512E007F5F991F6FDD67D2AD6385C890CB1&key=us0","default":false},{"resolution":1080,"embedUrl":"https://r4---sn-4g5e6nsd.googlevideo.com/videoplayback?id=c10a0562b949601e&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsd&ms=nxu&mv=u&pl=25&sc=yes&ei=TYnZXNClMq2S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&dur=5678.370&lmt=1552331043880240&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767533&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B7A07F455A90A7BF1B938D2555CC7E9D5420741D8F2DBC6D27C97576500C45D0.4CB0ABE30114644DCFB56D638128A530111E5D1452B219A60CD9755E4B4C32DE&key=us0","default":false}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/close-2019/1"},{"name":"Ngày Em Đẹp Nhất","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ngay-em-dep-nhat_11538/xem-phim/"},"nameOrigin":"On Your Wedding Day","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fngay-em-dep-nhat-on-your-wedding-day-2018.jpg%3Fsize%3D300"},"directors":["Lee Seok-Geun"],"actors":["Park Bo Young","Kim Young Kwang","Kang Ki Young","Ko Kyu Pil"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":100,"desc":"Seung Hee (Park Bo Young) và Woo Yeon (Kim Young Kwang) quen nhau từ khi còn là học sinh trung học. Woo Yeon thích Seung Hee nhưng không biết cô bạn của mình có thích mình hay không. Sau khi tốt nghiệp đại học, cả hai bắt đầu đi làm và rồi, Woo Yeon nhận được thiệp mời đám cưới từ mối tình đầu của mình.Những kỷ niệm ngọt ngào về mối tình đầu xen lẫn với những tiếc nuối về tình yêu không đúng thời điểm. Liệu Woo-yeon sẽ có những cảm xúc và hành động như thế nào khi cầm trên tay tấm thiệp cưới của người con gái mà mình thương yêu nhất?","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednle.googlevideo.com/videoplayback?id=67ddb3e73ffb9c4d&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=GJ_ZXLPiCtKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&dur=6632.617&lmt=1552606578516438&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773112&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9B2C57DC13F71A09E7ADB0EB0DEE7EC741141E7B5666A39AD0BF8D6939AF5144.0585C71CF2C2ED7E3E6640B83C6FA39FDFB011A9F22A7281035D84706C9B0D18&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nle.googlevideo.com/videoplayback?id=67ddb3e73ffb9c4d&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nle&ms=nxu&mv=u&pl=25&sc=yes&ei=GJ_ZXJa7EJrj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6632.617&lmt=1552609419724717&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773112&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=DDE46FF611A44A784DA036DCF769C5BCEC5CDFE58B362DAFC47EF839D5A5EE86.06726D8F38774C7D2C12BD0F32B73E4703E847573FE1CD05A76DBFAAC7B460DB&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5ednle.googlevideo.com/videoplayback?id=67ddb3e73ffb9c4d&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=GJ_ZXI6EE8eA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6632.617&lmt=1552609672763979&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773112&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5D08D6C6A0E3D7F263F7D4FD4F218D83E1A1F716084ED407F72F47E4035E57B1.797B21CAD144ACEE7AC85DC104F997A9CABBDFFF40F29FC05400D08A0466A35D&key=us0#f1080p","default":true}]},{"name":"Mật Vụ Giải Cứu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mat-vu-giai-cuu_11495/xem-phim/"},"nameOrigin":"Hunter Killer","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmat-vu-giai-cuu-hunter-killer-2018.jpg%3Fsize%3D300"},"directors":["Donovan Marsh"],"actors":["Common","Gary Oldman","Gerard Butler"],"genres":["Phim Hành Động","Phim Chiến Tranh","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":122,"desc":"Phim Mật Vụ Giải Cứu: kể về âm mưu bắt cóc Tổng thống Nga bởi một vị tướng phản trắc. Để giải cứu nhà lãnh đạo của Nga cũng như ngăn ngừa xung đột giữa hai nước, thuyền trưởng tàu ngầm Mỹ Joe Glass đã phải hợp lực cùng đội Đặc nhiệm Hải quân Mỹ để thực hiện công cuộc cứu nguy căng thẳng đến nghẹt thở","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/f6412a4ad39e2530b753dec7cc64f777/f6412a4ad39e2530b753dec7cc64f777.playlist.m3u8","default":true}]},{"name":"Gặp Được Bạn Thật Tốt","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/gap-duoc-ban-that-tot_11454/xem-phim/"},"nameOrigin":"Nice To Meet You","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fgap-duoc-ban-that-tot-nice-to-meet-you-2018.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Đang cập nhật"],"genres":["Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Gặp Được Bạn Thật Tốt Là Một bộ phim điện ảnh dễ thương vừa được công chiếu ngày 29/3, với sự góp mặt của Tào Tuấn và Lam Doanh Oánh.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednld.googlevideo.com/videoplayback?id=f66c1083a6147f0e&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=u&pl=25&sc=yes&ei=HZ_ZXNMZia7XAtuaqpgM&susc=ph&app=fife&mime=video/mp4&dur=5989.053&lmt=1551043440496278&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773117&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=8000ECC46C71EA092E287E8E07B23BF8191FA17AB866262DC5CB8E8D45014006.11BA9B2F56E8B0E549CB228BC01F604A720403DBA6BEC3F88AA38F6C6275367F&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednld.googlevideo.com/videoplayback?id=f66c1083a6147f0e&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=u&pl=25&sc=yes&ei=HZ_ZXMHKAsvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5989.053&lmt=1551047441320699&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773117&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=85E20681F34211552CE1AEDBF41A5398E49496F047E2855BF695A1BFCDD21EE0.3B96DA6EFE9BEC80E30B234E633419B907767CBA68A74EE0BFC1D4B18C49186A&key=us0#f720p","default":true}]},{"name":"Thống Đốc Trẻ Tuổi","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thong-doc-tre-tuoi_11489/xem-phim/"},"nameOrigin":"The Vision of Bharat","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthong-doc-tre-tuoi-the-vision-of-bharat-2018.jpg%3Fsize%3D300"},"directors":["Koratala Siva"],"actors":["Prakash Raj","Mahesh Babu","Sarath Kumar","Kiara Advani","Devaraj","Rajsekhar Aningi"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Ấn Độ"],"duration":173,"desc":"Phim Thống Đốc Trẻ Tuổi: Bharat là con trai của một Thống Đốc Bang, đang du học tại Anh. Nghe tin bố mất nên anh đã từ bên London trở về chịu tang. Khi về đến nơi thì bố đã được chôn cất, trong thời gian này nội bộ của Đảng Cầm Quyền tranh giành chức Thống Đốc chưa có chủ. Vì muốn đảng yên ổn trở lại, Bhrat bất ngờ được làm Thống Đốc. Khi làm Thống Đốc, Bharat đã có 1 cuộc cách mạng khi trừng trị tham nhũng và nâng cao đời sống xã hội. Rồi chuyện gì đến cũng phải đến, những tên quan chức tham nhũng liên thủ tìm cách triệt hạ Bharat.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/8813311e319693ca030ea8359ecf341b/8813311e319693ca030ea8359ecf341b.playlist.m3u8","default":true}]},{"name":"Quỷ Dữ Đưa Lối","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quy-du-dua-loi_11457/xem-phim/"},"nameOrigin":"May The Devil Take You","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquy-du-dua-loi-may-the-devil-take-you-2018.jpg%3Fsize%3D300"},"directors":["Timo Tjahjanto"],"actors":["Ray Sahetapy","Chelsea Islan","Pevita Pearce","Karina Suwandhi","Samo Rafael","Hadijah Shahab"],"genres":["Phim Kinh Dị","Phim Tâm Lý"],"countries":["Mỹ"],"duration":110,"desc":"Phim Quỷ Dữ Đưa Lối: tựa gốc Sebelum Iblis Menjemput là một bộ phim kinh dị siêu nhiên máu me của Indonesia dựa trên Evil Dead được đánh giá rất cao. Bộ phim theo chân Alfie (Chelsea Islan; Headshot) một người phụ nữ trẻ độc thân đã sống tách khỏi cha mình từ rất lâu. Bỗng một ngày cô phát hiện ra cha mình vẫn còn sống nhưng trong tình trạng nằm liệt giường. Cô đã tìm đến căn nhà của cha mình nhằm tìm hiểm nguyên nhân thật sự khiến cha mình ra nông nổi này và liệu xem có manh mối nào dẫn đến cái chết bí ẩn năm xưa của mẹ cô hay không. Mọi chuyện càng trở nên phức tạp hơn khi Maya, người chị kế của Alfie xuất hiện. Cả hai cô gái rơi vào một cái bẫy khủng khiếp của một con quỷ trong ngôi nhà này đã khiến mọi người gần như phát điên và giết chóc lẫn nhau.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/99f5d8241a8ac6d1b6644790332a3298/99f5d8241a8ac6d1b6644790332a3298.playlist.m3u8","default":true}]},{"name":"Mowgli: Cậu Bé Rừng Xanh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mowgli-cau-be-rung-xanh_11476/xem-phim/"},"nameOrigin":"Mowgli: Legend of the Jungle","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmowgli-cau-be-rung-xanh-mowgli-legend-of-the-jungle-2018.jpg%3Fsize%3D300"},"directors":["Andy Serkis"],"actors":["Christian Bale","Cate Blanchett","Benedict Cumberbatch"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Tâm Lý"],"countries":["Mỹ"],"duration":104,"desc":"Phim Mowgli: Cậu Bé Rừng Xanh: được xây dựng dựa trên tác phẩm văn học kinh điển của tác giả Rudyard Kipling, The \"Jungle Book\" kể lại cuộc phiêu lưu của Mowgli - cậu bé mồ côi được đàn sói nuôi dưỡng trong một khu rừng già Ấn Độ. Nội dung của câu chuyện đã mang lại cho khán giả nhiều cảm xúc về cuộc đời của một cậu bé đáng thương phải đứng giữa cuộc chiến của hai thế giới muôn thú và loài người.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednls.googlevideo.com/videoplayback?id=2885a043f9ade8eb&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednls&ms=nxu&mv=u&pl=25&sc=yes&ei=JIjZXJ7BAYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6293.048&lmt=1551840004208285&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767236&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=891071E8F4FF57E03AE1059429F36497C640FBA96DAFC956A9871C5014671ACD.63C80682FE60A06F9AA968EA9756E337CD6E98A9887D6C4F9C0869ED461587F5&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nsz.googlevideo.com/videoplayback?id=2885a043f9ade8eb&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=JIjZXPOfAdLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&dur=6293.048&lmt=1551837505794741&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767236&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=BAC6F9BCB6D13FB26B7734DD40E5F4AD880F43ED970887AFF020DF587D76D7D8.C5A157B0492E4C43B744E28D5EFF83A08EB99649F1418F55A51633DA5FB99B7F&key=us0","default":false},{"resolution":1080,"embedUrl":"https://r4---sn-4g5ednls.googlevideo.com/videoplayback?id=2885a043f9ade8eb&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednls&ms=nxu&mv=u&pl=25&sc=yes&ei=JIjZXL-gAY-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6293.048&lmt=1551840023439921&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767236&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=25A1695F9FFA4E79F50632BBA5352094B4D000C670089CC839B6C8424384AF13.2BA09ACD748A3BA7BB861961A800BB3997D8C83ECEB6A8FE8EDCB2B46EC6567B&key=us0","default":false}]},{"name":"Vua Lừa Đảo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/vua-lua-dao_11492/xem-phim/"},"nameOrigin":"The Polka King","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fvua-lua-dao-the-polka-king-2018.jpg%3Fsize%3D300"},"directors":["Maya Forbes"],"actors":["Jack Black","Jason Schwartzman","Robert Capron","Jenny Slate","Jacki Weaver","J.b. Smoove"],"genres":["Phim Hài Hước"],"countries":["Mỹ"],"duration":95,"desc":"Phim Vua Lừa Đảo: là một bộ phim hài tiểu sử của Mỹ do Maya Forbes đạo diễn và được viết bởi Forbes và Wallace Wolodarsky. Bộ phim dựa trên câu chuyện có thật kể về người đứng đầu ban nhạc Polka gốc Ba Lan, người Mỹ gốc Phi Jan Lewan, người đã bị bắt giam năm 2004 vì đã điều hành một mô hình Ponzi lừa đảo. Jan Lewan (Jack Black) là một người nhập cư Ba Lan với giấc mơ Mỹ. Sau khi làm một số công việc tay chân, anh gặp một nhạc công tên là Mickey (Schwartzman) và họ thành lập một ban nhạc Polka ở Pennsylvania.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/0e1e27454297449d8712ea81b17c7dd7/0e1e27454297449d8712ea81b17c7dd7.playlist.m3u8","default":true}]},{"name":"Huyền Thoại Kung Fu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/huyen-thoai-kung-fu_11491/xem-phim/"},"nameOrigin":"Kung Fu League","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhuyen-thoai-kung-fu-kung-fu-league-2018.jpg%3Fsize%3D300"},"directors":["Lưu Trấn Vĩ"],"actors":["Trần Quốc Khôn","Triệu Văn Trác"],"genres":["Phim Cổ Trang","Phim Võ Thuật"],"countries":["Trung Quốc"],"duration":105,"desc":"Phim Huyền Thoại Kung Fu Diệp Vấn, Trần Chân, Hoàng Phi Hồng, Hoắc Nguyên Giáp - 4 vị tôn sư võ thuật của Trung Quốc - sẽ cùng góp mặt trong Huyền Thoại Kung Fu. Bốn võ sư, bốn môn phái, đại diện cho bốn thời đại khác nhau gặp nhau và gây ra vô số tình huống dở khóc dở cười. Liệu những rắc rối của thời hiện đại có khiến tứ đại tôn sư lừng danh thiên hạ trong quá khứ phải chùn bước? Huyền Thoại Kung Fu là câu chuyện của Phi Hùng - cậu trai bất mãn với tình yêu vì không dám tỏ tình với cô gái mà anh ta thầm thương trộm nhớ bấy lâu nay. Thế rồi anh ta ao ước rằng những vị đại hiệp Diệp Vấn, Trần Chân, Hoàng Phi Hồng, Hoắc Nguyên Giáp có thể xuyên không đến với năm 2018 nhằm cứu vãn cuộc tình. Và với khả năng sáng tạo vô hạn của biên kịch thì 1 phút 30 giây sau là các vị sư phụ kia đã lập tức bay cái vèo đến thời hiện đại và giúp đỡ Phi Hùng chiếm lấy trái tim người con gái anh yêu.","embeds":[{"resolution":360,"embedUrl":"https://hls.hydrax.net/7UAqLipleBxTOUmJSA4YVzRtViIPD3nY7SexLqOtLS9p6I/0/playlist.m3u8#f720","default":true}]},{"name":"Dạ Quỷ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/da-quy_11443/xem-phim/"},"nameOrigin":"Rampant","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fda-quy-rampant-2018.jpg%3Fsize%3D300"},"directors":["Kim Sung-Hoon"],"actors":["Jang Dong Gun","Hyun Bin"],"genres":["Phim Hành Động","Phim Cổ Trang","Phim Phiêu Lưu","Phim Kinh Dị"],"countries":["Hàn Quốc"],"duration":129,"desc":"Phim Dạ Quỷ là câu chuyện về hoàng tử Lee ở triều đại Joseon, người nổi tiếng có võ thuật cao cường. Trở về sau khoảng thời gian dài bị đày ải bởi nhà Thanh, Ngài đau lòng chứng kiến cả quê hương chìm trong một đại dịch của những “ác quỷ bóng đêm”. Liệu rằng vị hoàng tử Lee có ngăn được cơn cuồng nộ của đội quân quỷ dữ này và cứu được giang sơn?","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5edn7s.googlevideo.com/videoplayback?id=6304e3009fad1cca&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7s&ms=nxu&mv=u&pl=25&sc=yes&ei=GZnZXLnaKsby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&dur=7298.612&lmt=1551202288885238&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771577&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=6A13A0E00CB18DB53AFB685B93A420F756739DD0BE2DB9D441EFB47184636FF4.02FCAEBA760702649FC8DC5419F554DC9016166AF9A16657C5BD4A12AD569F86&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5edn7s.googlevideo.com/videoplayback?id=6304e3009fad1cca&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7s&ms=nxu&mv=u&pl=25&sc=yes&ei=GZnZXNXSM5aw1wKDxYKgDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7298.612&lmt=1551206082580458&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771577&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8AF3EEABE7C17CCAA7B92949EA212B3BEA49BF036BF0BD32CDD2A3733C8B2BE7.C17B144A0A2B68F275D31CC7DAEF6E48A76C4A51978363FFE1A2D7EFE6AB9B5E&key=us0#f720p","default":true}]},{"name":"Cảnh Báo Tình Yêu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/canh-bao-tinh-yeu_11441/xem-phim/"},"nameOrigin":"Fluttering Warning","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcanh-bao-tinh-yeu-fluttering-warning-2018.jpg%3Fsize%3D300"},"directors":["Yoon Eun HyeChun Jung Myung"],"actors":["Han Go Eun","Kim Byung Gi","Joo Woo Jae","Lee Hye Ran","Kim Ye Ryung"],"genres":["Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":45,"desc":"Phim Cảnh Báo Tình Yêu:là Bộ phim dựa trên tểu thuyết mạng “Seolremjoouibo” của tác giả Seo Han-Kyeol. Câu chuyện “Fluttering Warning” theo sau bác sĩ phẫu thuật chỉnh hình (Chun Jung-Myung) và nữ diễn viên nổi tiếng (Yoon Eun-Hye) lập một bản hợp đồng rằng họ phải hành động như hai người yêu nhau.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednsy.googlevideo.com/videoplayback?id=f3feceeeb356d15a&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=Hp_ZXNHJPIzn1wLMsZmIAg&susc=ph&app=fife&mime=video/mp4&dur=3530.245&lmt=1551194882822051&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773119&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=0CAFC2CF7722222A7349B1FA52DCB6B2B0B62F0CE084E926023233EB7F19EE2D.79E752B2E42A402D7DC09863C172C43738B679D358C372B369DD5BD23D234823&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5ednsy.googlevideo.com/videoplayback?id=f3feceeeb356d15a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=H5_ZXK21Coqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3530.245&lmt=1551198196918920&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773119&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=A931FE94CD2FFE937C316EAD24316B9AD6D21D44D1F90F7FC9B38563956038FC.AA5338C894F58A975CF63F1861C6E119A18A34E34778176B9B81D66A9D36EB34&key=us0#f720p","default":true}]},{"name":"Quái Vật Venom","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quai-vat-venom_11365/xem-phim/"},"nameOrigin":"Venom","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquai-vat-venom-venom-2018.jpg%3Fsize%3D300"},"directors":["Ruben Fleischer"],"actors":["Tom Hardy","Riz Ahmed","Michelle Williams"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":121,"desc":"Quái Vật Venom là một kẻ thù nguy hiểm và nặng ký của Người nhện trong loạt series của Marvel. Chàng phóng viên Eddie Brock (do Tom Hardy thủ vai) bí mật theo dõi âm mưu xấu xa của một tổ chức và đã không may mắn khi nhiễm phải loại cộng sinh trùng ngoài hành tinh (Symbiote) và từ đó đã không còn làm chủ bản thân về thể chất lẫn tinh thần. Điều này đã dần biến anh thành quái vật đen tối và nguy hiểm nhất chống lại người Nhện - Venom.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/50687b27cddebe90732f7c8b9c2177c1/50687b27cddebe90732f7c8b9c2177c1.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/venom-2018/1"},{"name":"Cuộc Gọi Bạc Tỷ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-goi-bac-ty_11370/xem-phim/"},"nameOrigin":"The Big Call","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-goi-bac-ty-the-big-call-2018.jpg%3Fsize%3D300"},"directors":["Bành Thuận"],"actors":["Trương Hiếu Toàn","Quế Luân Mỹ","Trần Học Đông","Tưởng Mộng Điệp"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":123,"desc":"phim Cuộc Gọi Bạc Tỷ xoay quanh cảnh sát trẻ Đinh Tiểu Điền (Trần Học Đông thủ vai) vừa được nhận chức gia nhập vào tổ trọng án chuyên phụ trách về tội phạm thông tin. Tại đây, anh và nữ đặc vụ lành nghề Tiểu Thỏ (Tưởng Mộng Điệp thủ vai) được giao nhiệm vụ trà trộn vào tổ chức lừa đảo xuyên quốc gia do bộ đôi A Hải (Trương Hiếu Toàn thủ vai) và A Phương (do Quế Luân Mỹ) đứng đầu. Dù đã nắm trong tay nhiều bằng chứng phạm tội, nhưng khó ai có thể nắm bắt được ý nghĩ khó lường của Hải, hắn đắm mình vào cuộc cá cược đánh cắp ngày càng khổng lồ.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/2abab7ba6fe9606c3bbfdbcbd824af10/2abab7ba6fe9606c3bbfdbcbd824af10.playlist.m3u8","default":true}]},{"name":"Thiên Hạ Đệ Nhất Tiêu Cục","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thien-ha-de-nhat-tieu-cuc_11376/xem-phim/"},"nameOrigin":"The Bravest Escort Group (2018)","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthien-ha-de-nhat-tieu-cuc-the-bravest-escort-group-2018-2018.jpg%3Fsize%3D300"},"directors":["Đào Minh Hỷ"],"actors":["Phàn Thiếu Hoàng","Thích Ngạn Năng","Xa Vĩnh Lợi"],"genres":["Phim Cổ Trang","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Thiên Hạ Đệ Nhất Tiêu Cục Ngô Tam Quới qua đời, tướng Mã Bảo vì bảo vệ truyền nhân của chủ tử đành phải nhờ giang hồ giúp sức. Chứng tỏ được năng lực, Thái Bình tiêu cục được Mã Bảo ủy thác hộ tống một người thần bí đến nới an toàn. Nhóm tiêu sư quả cảm do tiêu đầu Lục An chỉ huy phấn khởi lên đường nhưng không biết mình sẽ đối mặt với mối nguy hiểm khôn lường.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednle.googlevideo.com/videoplayback?id=fde649dd8a704198&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=s5bZXKTrGJqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&dur=5404.792&lmt=1552241380276729&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557770963&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=8EF507222A1DC551F98A328BA8A7CCFC4F9E1FEA3143186C51BC0EB07C6895DB.912E7519B7AC444D57B2A6D9F2FC922B1203DECC36399DD380D44FBF974FF0F3&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5ednle.googlevideo.com/videoplayback?id=fde649dd8a704198&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednle&ms=nxu&mv=u&pl=25&sc=yes&ei=s5bZXIGYG8Kt8gOsnpT4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5404.792&lmt=1552243592718139&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557770963&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=26285155A8DAD12BB558BF3E96B8B68773BC0B8707030B11C8AA8F3E59F848C5.555DA7850EE06CB1CA3D818DAC95FD51BF73DBBD1E3614D45D5DEA38B8483DB4&key=us0#f720p","default":true}]},{"name":"Săn Bão","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/san-bao_11394/xem-phim/"},"nameOrigin":"L Storm / Biệt đội chống tham nhũng 3","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsan-bao-l-storm-biet-doi-chong-tham-nhung-3-2018.jpg%3Fsize%3D300"},"directors":["David Lam"],"actors":["Cổ Thiên Lạc","Julian Cheung","Stephy Tang","KAI CHUNG CHEUNG","Kevin Cheng","Chung Chi Cheung"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Hồng Kong"],"duration":90,"desc":"Phim Săn Bão: là phần 3 của series Biệt đội chống tham nhũng. Sự thành công và được mong chờ của Săn bão còn đến từ màn tái xuất của Cổ Thiên Lạc, Trịnh Gia Dĩnh, Trương Trí Lâm cùng dàn sao TVB không chỉ đình đám một thời mà còn thu hút bởi vẻ ngoài soái ca lịch lãm, phong độ. Trong một vụ án tưởng chừng như đi vào bế tắc của điều tra viên Lục Chí Liêm (Cổ Thiên Lạc) cùng đồng nghiệp, thì anh ta bị cáo buộc dính đến vụ việc quan liêu nhũng nhiễu ngay trong chính vụ án của mình. Để minh oan cho bản thân, Lục Chí Liêm đã dấn thân điều tra và phát hiện hàng loạt những đường dây bất hợp pháp. Từ đó, anh bắt đầu bước vào nhiều phen hiểm nguy cũng như những màn đấu trí đến nghẹt thở.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednse.googlevideo.com/videoplayback?id=0701e4070d46aefb&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=M5DZXLNxycXWAv6Zh3A&susc=ph&app=fife&mime=video/mp4&dur=6004.215&lmt=1551898803837751&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769299&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=990FB9685E34502BD8BDF921A23FC8C39C438400173DBD0AF6FBC7BA33FCEA8E.8116FAC09E713C238F1F39B3E0EE5637FFEDF7E82A1EBA4F1B1E093ACCDDE3B6&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6nle.googlevideo.com/videoplayback?id=0701e4070d46aefb&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nle&ms=nxu&mv=u&pl=25&sc=yes&ei=M5DZXIqyA9LM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6004.215&lmt=1551912087321223&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769299&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=7E7B159CFF73212B5A9207F9F09DB6D564644C588A0971EA667E06B339BEBC20.D5C5503A038211AEDEC478D2C73AAE13E4EE0561FFC96D73DBC2848F49FC88AE&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5ednse.googlevideo.com/videoplayback?id=0701e4070d46aefb&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=M5DZXLu5DrGL8gPr66LYBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6004.215&lmt=1551911977718833&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769299&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=A5196F3A83FB1032AD3E5801297B0D0E9DB02450855B7226CBF3D75439652745.DCE75CD4BAA149DA2DCE8991604141084A075A246805D2A5E3A2340E3AD415BE&key=us0#f1080p","default":true}]},{"name":"Quái Thú Vô Hình","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quai-thu-vo-hinh_11364/xem-phim/"},"nameOrigin":"The Predator","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquai-thu-vo-hinh-the-predator-2018.jpg%3Fsize%3D300"},"directors":["Shane Black"],"actors":["Keegan Michael Key","Boyd Holbrook","Sterling K. Brown"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":100,"desc":"Phim Quái Thú Vô Hình 2018 Những thợ săn bí ẩn từ không gian bỗng xuất hiện ở Trái Đất. Chính quyền cử một đội đặc nhiệm truy tìm và lùng bắt những thợ săn này nhưng liệu ai mới thật sự là kẻ đi săn. Bí ẩn về giống loài tiên tiến này dần được hé lộ.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5edns6.googlevideo.com/videoplayback?id=7c9303e880256eb9&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=EJ_ZXLKZFYe11gLou7m4CQ&susc=ph&app=fife&mime=video/mp4&dur=6408.521&lmt=1552396258681145&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773104&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=1EBBB91B5456315ECBB7D1FA348D5C02AAE21E8CEB9D296F7C3D2EB5243A4428.A85E9AA812667B2B9705A73250CD1A76B6FBBD5D410A3D7463CCE25BAB556124&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edns6.googlevideo.com/videoplayback?id=7c9303e880256eb9&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=EJ_ZXOWyF62S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6408.521&lmt=1552398477008258&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773104&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=96FF844465074546DE1090F1666350DDD03B3A0FDB2D416643C6B73AEE2519BF.A404D797E4010F63265C49590F6BB003D0A113E6C53490FBAC999AD1144F7AAD&key=us0#f720p","default":true}]},{"name":"A X L Chú Chó Robot","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/a-x-l-chu-cho-robot_11375/xem-phim/"},"nameOrigin":"A X L","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fa-x-l-chu-cho-robot-a-x-l-2018.jpg%3Fsize%3D300"},"directors":["Oliver Daly"],"actors":["Alex Neustaedter","Becky G","Alex MacNicoll"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":100,"desc":"A-X-L Chú Chó Robot, A-X-L 2018 Phim A-X-L Chú Chó Robot tiếp tục giúp khán giả có dịp tái ngộ tình bạn thiêng liêng đó trên màn ảnh rộng với A-X-L (tựa Việt hóa: A-X-L Chú Chó Robot) khi người bạn bốn chân của chúng ta nay đã trở thành một chú siêu khuyển bằng máy móc. Chúc các bạn xem phim vui vẻ!","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edns7.googlevideo.com/videoplayback?id=0f7bdda6437d6f19&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=JJ_ZXNf6G82j8gOgkJagBA&susc=ph&app=fife&mime=video/mp4&dur=5936.367&lmt=1551321153296221&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773124&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=CC684AD7F66B1F9FE477CCDDDDA6E540B61B44D995E16881C16CFCDE8B62B0EE.65A2F0BFD1814B32C7DA2BF8DBD4B23D26A6B35FFECF430286BE7091B49DE31C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edns7.googlevideo.com/videoplayback?id=0f7bdda6437d6f19&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=JJ_ZXMy_HvmY8gP-1IS4Cg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5936.367&lmt=1551323170870780&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773124&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=DCF40D72AB9A6BBD75C612A181E8EC40D592D3B2785F71F84EB13016ECEAE3A6.2AC99E165795C083A9DCCE85EB2302ED307A7F11CDB3ABE5D1182E878D27D7D1&key=us0#f720p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/a-x-l-2018/1"},{"name":"Cuộc Đàm Phán Sinh Tử","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-dam-phan-sinh-tu_11391/xem-phim/"},"nameOrigin":"The Negotiation","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-dam-phan-sinh-tu-the-negotiation-2018.jpg%3Fsize%3D300"},"directors":["Lee Jong-suk"],"actors":["Son Ye Jin","Hyun Bin"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":115,"desc":"Phim Cuộc Đàm Phán Sinh Tử Ha Chae-youn (Son Ye-jin) là cảnh sát giỏi nhất của đội Đàm phán khủng hoảng, cô luôn giữ một cái đầu lạnh trong mọi tình huống. Tuy nhiên cô rơi vào một cú sốc lớn khi một vụ bắt cóc đã kết thúc trong thảm kịch, cô chứng kiến kẻ bắt cóc và con tin bị giết ngay trước mắt mình. Chỉ 10 ngày sau đó, Min Tae-gu (Hyun Bin), một kẻ buôn bán vũ khí khét tiếng bị cảnh sát truy nã, bắt cóc một phóng viên và một cảnh sát người Hàn và chỉ định Chae-youn là người đàm phán. Tình huống nguy hiểm chưa từng có khiến Chae-youn không thể lùi bước, và sự thật kinh hoàng đằng sau dần được hé lộ.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nzl.googlevideo.com/videoplayback?id=667b33547a8d4218&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=MJDZXP6eEoKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&dur=6790.489&lmt=1552201405679284&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769296&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=74B2640C273F9583104426EAAE0962225B867B8B1DEE982620018334D46DD05D.D3CA914FEF9EA1DB7F94715039EBEA845B45DD542AFC94341AB832F5029BF1DB&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5ednsr.googlevideo.com/videoplayback?id=667b33547a8d4218&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsr&ms=nxu&mv=u&pl=25&sc=yes&ei=MJDZXPeXFceo8gOiw4WoCQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6790.489&lmt=1552203070360508&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769296&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8C6AD3CBEA2999012046BE3157EE8B46F899B969EC9BCC8F2B888600111B4223.BAC241F30AF748FD9CD05164EB8185FC90C05A868B0D3A7D1B7F5D28C2817119&key=us0#f720p","default":true}]},{"name":"Huynh Đệ Hoàng Kim","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/huynh-de-hoang-kim_11387/xem-phim/"},"nameOrigin":"Golden Job","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhuynh-de-hoang-kim-golden-job-2018-2018.jpg%3Fsize%3D300"},"directors":["Kar Lok Chin"],"actors":["Trịnh Y Kiện","Xa Thi Mạn","Trần Tiểu Xuân","Michael Tse","Kar Lok Chin","Jerry Lamb"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Hồng Kong"],"duration":100,"desc":"Phim Huynh Đệ Hoàng Kim: đánh dấu sự tái ngộ của dàn diễn viên đình đám Hong Kong trong một bộ phim sau 20 năm. Lần đầu tiên lên sóng vào năm 1996, bộ phim Người trong giang hồ (Young and Dangerous) đã nhận được sự quan tâm của dư luận. Năm anh em Sư Vương (Trịnh Y Kiện), Hỏa Sơn (Trần Tiểu Xuân), Bill (Tạ Thiên Hoa), Đàm Định (Tiền Gia Lạc), Lão Thử (Lâm Hiểu Phong), dưới sự chỉ đạo của ân sư Tào Sir (Tăng Chí Vĩ) cùng nhau vào sinh ra tử. Vì muốn cứu sống những đứa trẻ với số phận đáng thương nên năm anh em đã quyết định ăn trộm một loại thuốc đặc hiệu, không may mắc bẫy của kẻ địch, rơi vào một màn mưa bom bão đạn. Cả năm người đều biết không thể quay đầu lại được nữa, nhưng họ vẫn quyết chí hoàn thành.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednz7.googlevideo.com/videoplayback?id=d367cce869f26308&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=JZ_ZXKz5IseA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&dur=5960.330&lmt=1552292645762189&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773125&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=040FD115DCC4992E20EBD765452A1A7B58F6FFB38373C91C41D51193C86F285C.614DD0D2565A91ED7B79DF3D9223A07784D0F170A356F0199980BC856CA311BC&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nsk.googlevideo.com/videoplayback?id=d367cce869f26308&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=JZ_ZXK2lKoHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5960.330&lmt=1552294324973596&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773125&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=2772FF146DD2468595B5480791CE898838F76E77C731E5D9BC598B5E21F0D4F4.D010CBDB4A0F0EE29833C32C32255D3424FB877AB9E1B6DBC1D3E8A302E641B6&key=us0#f720p","default":true}]},{"name":"Giải Cứu Người Đẹp 2","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/giai-cuu-nguoi-dep-2_11296/xem-phim/"},"nameOrigin":"Baaghi 2","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fgiai-cuu-nguoi-dep-2-baaghi-2-2018.jpg%3Fsize%3D300"},"directors":["Ahmed Khan"],"actors":["Disha Patani","Deepak Dobriyal","Darshan Kumaar","Indraneel Bhattacharya"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Ấn Độ"],"duration":143,"desc":"Phim Giải Cứu Người Đẹp 2 Sau thành công vang dội của phần 1 ra mắt vào năm 2016, bom tấn hành động Bollywood mang tên Baaghi tiếp tục cho ra mắt phần 2 vào năm 2018 và Ahmed Khan là cái tên đảm nhiệm vai trò “cầm trịch” cho Giải Cứu …","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/c5dcbe027d4fb183d0d7131d7f591f57/c5dcbe027d4fb183d0d7131d7f591f57.playlist.m3u8","default":true}]},{"name":"Phản Đòn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phan-don_11276/xem-phim/"},"nameOrigin":"Reprisal","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphan-don-reprisal-2018.jpg%3Fsize%3D300"},"directors":["Brian A Miller"],"actors":["Bruce Willis","Frank Grillo","Johnathon Schaech"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":89,"desc":"Jacob ( Frank Grillo ), một người quản lý ngân hàng bị ám ảnh bởi một vụ cướp bạo lực đã lấy mạng sống của một đồng nghiệp, lập nhóm với người hàng xóm cũ của mình, James ( Bruce Willis ), để hạ gục kẻ tấn công. Trong khi hai người đàn ông làm việc cùng nhau để tìm ra động thái tiếp theo của tên trộm, Gabriel ( Johnathon Schaech ), một tên tội phạm được đào tạo xuất sắc. Khi Gabriel bắt cóc vợ của Jacob ( Olivia Culpo ) và con gái, Jacob trở nên điên cuồng quyết tâm trả lại món nợ máu","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/82f9b4058c9da94dfd0f2e20066ed626/82f9b4058c9da94dfd0f2e20066ed626.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/reprisal-2018/1"},{"name":"Đế Chế Bất Diệt","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/de-che-bat-diet_11304/xem-phim/"},"nameOrigin":"Furious / Legenda o Kolovrate","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fde-che-bat-diet-furious-legenda-o-kolovrate-2018.jpg%3Fsize%3D300"},"directors":["Dzhanik Fayziev,Ivan Shurkhovetskiy"],"actors":["Ilya Malakov","Aleksey Serebryakov","Aleksandr Ilin","Timofey Tribuntsev","Yuliya Khlynina","Andrey Burkovskiy","Igor Savochkin","Polina Chernyshova","Aleksandr Tsoy","Viktor Proskurin","Sergey Koltakov","Julia Pisarenko","Fedor Starykh"],"genres":["Phim Chiến Tranh","Phim Cổ Trang"],"countries":["Mỹ"],"duration":107,"desc":"Đế Chế Bất Diệt đặt trong bối cảnh nước Nga vào giữa thế kỷ 13 Trung Cổ, bị phân chia thành các quân khu đang lần lượt thất thủ khi quân đội Mông Cổ dẫn đầu bởi tướng Bạt Đô hiện thực hóa giấc mộng bá chủ thế giới của Thành Cát Tư Hãn. Sợ hãi trước sức mạnh và sự tàn bạo của quân xâm lược, hầu hết các thái tử Nga đều xin hàng và giao nộp vùng đất của họ cho kẻ thù. Những kẻ xâm lược cướp bóc và đốt cháy các thành phố, nhuộm đất Nga bằng máu, cho đến khi một kiếm sĩ Ryazan Evpaty Kolovrat đứng lên ngăn chặn chúng. Kolovrat dẫn đầu một đội ngũ của hàng trăm chiến binh dũng cảm để trả thù cho gia đình thân yêu, cho dân tộc, và quê hương của anh.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/261692c9f0efde59a7a1307e8c686842/261692c9f0efde59a7a1307e8c686842.playlist.m3u8","default":true}]},{"name":"Chiến Binh Mexico","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chien-binh-mexico_11274/xem-phim/"},"nameOrigin":"Sicario: Day Of The Soldado","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchien-binh-mexico-sicario-day-of-the-soldado-2018.jpg%3Fsize%3D300"},"directors":["Stefano Sollima"],"actors":["Josh Brolin","Benicio Del Toro","Isabela Moner","Jeffrey Donovan"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":122,"desc":"Phim Chiến Binh Mexico Bắt đầu một chương mới, Chiến binh Mexico (Sicario: Day of the Soldado) sẽ là một cuộc chiến bất chấp luật lệ giữa chính phủ Mỹ và các băng đảng ma tuý Mexico. Không chỉ ma tuý, các băng đảng này còn vận chuyển người trái phép để thực hiện các vụ khủng bố tại Mỹ. Trước tình hình chính trị căng thẳng, đặc vụ liên bang Matt Graver (Josh Brolin) liên lạc với người đàn ông bí ẩn Alejandro (Benicio Del Toro), đưa cuộc chiến lên giai đoạn mới bằng cách bắt cóc con gái Isabela của tay trùm băng đảng lớn nhất để các phe phái quay sang hạ bệ lẫn nhau. Bắt đầu cuộc chiến nhưng không lường trước được hậu quả, số phận của cô bé bị đe doạ trầm trọng và họ buộc đưa ra lựa chọn: mạng sống của Isable hay chiến thắng cuộc chiến?","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5e6nl7.googlevideo.com/videoplayback?id=7f7aa7e9f69ee521&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nl7&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=Kp_ZXJqKMJiJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&dur=7343.821&lmt=1551252977374738&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773130&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=598730E558DCAA53CCE0627A1E6AE37ADF8A5904C4947DC2BA7B833BD8C55DF4.045475F871391B2A33FE7E0B4F8F4061D04290A5B9ABF6E0B71DB7EDF7F8AE04&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5edn7z.googlevideo.com/videoplayback?id=7f7aa7e9f69ee521&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7z&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=Kp_ZXJLrNdLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7343.821&lmt=1551255765069965&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773130&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=65B6CF0E2E437AEC3D9909255829C3E1C8405FAFFE085C0910BDE31FA9FA8E36.546C2725F2C23D39DCEF3718C5177B57A5A61044C33F17587E6F41223E99B50F&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r6---sn-4g5edn7z.googlevideo.com/videoplayback?id=7f7aa7e9f69ee521&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7z&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=Kp_ZXIHIOoKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7343.821&lmt=1551255813778528&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773131&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=72CF4477AB0E74746D50A0B588C64663CCC7B8A87BD05F748A74A1BC93D1A4F9.2AE077806FD42153768555F6E95202816367B9C3FB6AE3B2F26D1BCE7C58CB75&key=us0#f1080p","default":true}]},{"name":"Thám tử Conan Movie 22: Kẻ Hành Pháp Zero","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tham-tu-conan-movie-22-ke-hanh-phap-zero_11269/xem-phim/"},"nameOrigin":"Detective Conan Movie 22: Zero the Enforcer","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftham-tu-conan-movie-22-ke-hanh-phap-zero-detective-conan-movie-22-zero-the-enforcer-2018.jpg%3Fsize%3D300"},"directors":["Yuzuru Tachikawa"],"actors":["Tôru Furuya","Megumi Hayashibara","Rikiya Koyama","Ryôtarô Okiayu","Minami Takayama","Kappei Yamaguchi","Wakana Yamazaki","Ken'ichi Ogata"],"genres":["Phim Hình Sự","Phim Hoạt Hình","Phim Phiêu Lưu","Phim Tâm Lý","Phim Thiếu nhi"],"countries":["Nhật Bản"],"duration":120,"desc":"Conan Movie 22 xoay quanh nhân vật Tooru \"Zero\" Amuro và nghi vấn cảnh sát trưởng Kuroda là một trong những thành phần của tổ chức áo đen.\"Edge of Ocean\", một cơ sở mới của Vịnh Tokyo sẽ là nơi tổ chức Hội nghị Thượng đỉnh Tokyo. Hội nghị sẽ được tổ chức vào ngày 1/5 và có tới 22.000 cảnh sát được huy động, nhưng một vụ nổ bom cực lớn đột ngột xảy ra tại cơ sở siêu hoành tráng này! Tại nơi đó, vào lúc xảy ra vụ việc, lại nhìn thấy bóng dáng của Amuro Tooru thuộc tổ chức bí mật của Cảnh sát Quốc gia với bí danh là \"Zero\" đang điều khiển các cảnh sát an ninh trên toàn quốc. Tại hiện trường, cảnh sát đã phát hiện dấu vân tay của Mori Kogoro và ông bị bắt. Để chứng minh ông Mori vô tội, Conan đã bắt tay vào điều tra nhưng liên tục bị \"kẻ 3 mặt\" Amuro cản đường.Bộ phim dự kiến sẽ được gắn mác 13+ và công chiếu từ ngày 17/8 tại tất cả hệ thống rạp trên toàn quốc.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednss.googlevideo.com/videoplayback?id=ba5dce64efbe67b4&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednss&ms=nxu&mv=u&pl=25&sc=yes&ei=Kp_ZXNOgNJfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=6615.690&lmt=1552619460681827&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773130&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=E7C8EA19899DFC18FBB45E42C36C442F10ECECE08A33BCCD880F8F1EA6B59568.B30688D5BD0C2045737CD3CB9976E92F7D770C494FA69FBA4379AD0CE6B984D9&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nsk.googlevideo.com/videoplayback?id=ba5dce64efbe67b4&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=K5_ZXPo8zaPyA6CQlqAE&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6615.690&lmt=1552625649474572&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773131&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=2777E88563CCF48E33F311C443E18F48ACC6A865DB6DB5F1A7B01B7BB9DAE9DD.1E60C00B8A741D902A741D9F81CC4D0C82F9670E5D1C4A3760FE37CEB17D670C&key=us0#f720p","default":true}]},{"name":"Chung Cư Tình Yêu (Bản Điện Ảnh)","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chung-cu-tinh-yeu-ban-dien-anh_11303/xem-phim/"},"nameOrigin":"iPartment The Movie","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchung-cu-tinh-yeu-ban-dien-anh-ipartment-the-movie-2018.jpg%3Fsize%3D300"},"directors":["Vi Chính"],"actors":["Lâu Nghệ Tiêu","Tôn Nghệ Châu","Trần Hách","Viên Hoằng"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Viễn Tưởng"],"countries":["Trung Quốc"],"duration":120,"desc":"Chung Cư Tình Yêu bản điện ảnh với những nhân vật quen thuộc như Tăng Tiểu Hiền, Hồ Nhất Phi, Lữ Tử Kiều, Trương Vĩ, Đường Du Du sẽ trở lại với khán giả sau 10 năm kỷ niệm. Dàn nhân vật Chung Cư Tình Yêu tình cờ lấy nhầm hào quang nhân vật chính của Thiết Tam Giác trong thế giới Đạo Mộ Bút Kí của tác giả Nam Phái Tam Thúc, xuyên qua thế giới trộm mộ đầy hiểm nguy, phá tan âm mưu tà ác.Vẫn là những con người quen thuộc đó, tiếng cười chưa từng ngừng nghỉ, bạn bè gặp nhau, tiếp tục phát triển câu chuyện, chứng minh câu nói chủ đề của bản truyền hình: “Bạn bè tốt nhất ở cạnh bên, người mình yêu nhất ngay trước mắt”.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6ne6.googlevideo.com/videoplayback?id=2c6b4c0a12ca49cf&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=WY3ZXMqPG8yX8gOqvqXIDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6933.966&lmt=1549103107910917&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557768569&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=A71B2826EC0141E5F9B2F2F273DCD3DEC9CFFF1062794966D6201FBA8204A771.BB1BEDAFC64DCBDC8EC849F7508B6A19EA776715044955E9BCF95098E61F1FBE&key=us0","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednse.googlevideo.com/videoplayback?id=2c6b4c0a12ca49cf&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=WY3ZXJCTG8-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&dur=6933.966&lmt=1549099308690642&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557768569&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=E6B15F2DEDB20B55762BBB231D400A6CBA053067F97F8DB9C70156A4D546138D.D5D8E1562C89388F812E4A5D5C9BAACC2B2A56C48D1B19970DCFA307245C6548&key=us0","default":false}]},{"name":"Đặc Vụ Bất Chấp","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/dac-vu-bat-chap_11245/xem-phim/"},"nameOrigin":"Agent Mr. Chan","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdac-vu-bat-chap-agent-mr-chan-2018.jpg%3Fsize%3D300"},"directors":["Jeff Cheung"],"actors":["Xa Thi Mạn","Trịnh Trung Cơ","Sammi Cheng","Kai Chung Cheung","Kwok Keung Cheung","Sui Man Chim","Ada Choi","Philippe Joly","Colin David Herbert Blackwell","Chi Wah Wong","Cecilia So","Sze Kwan Cheng","Lawrence Cheng","Justin Cheung","Michael Hui"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Phiêu Lưu"],"countries":["Hồng Kong"],"duration":101,"desc":"Hào hoa và lịch lãm chẳng kém gì James Bond, Mr.Chan là một điệp viên đẳng cấp hàng đầu. Anh chàng được một nữ cảnh sát ngỏ lời giúp đỡ cô trong một vụ án đầy gian nan. Trong suốt hành trình truy tìm ra câu trả lời, cả hai đã gặp phải vô số những pha đụng độ nguy hiểm nhưng cũng không kém phần hài hước.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6nze.googlevideo.com/videoplayback?id=326fada39ea410d2&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXPa_BsnF1gL-mYdw&susc=ph&app=fife&mime=video/mp4&dur=5990.748&lmt=1552695151595065&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=A7E47887F19670226B94CA284671D7F7C71303091DDBE1336CC75EDD3F4B0A5C.48D40060C7E4CC9930C257E6B1E4C4309541B228938E49B4F6CAC17BBD97239D&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nze.googlevideo.com/videoplayback?id=326fada39ea410d2&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXN7zCJWd1wKq87T4Bw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5990.748&lmt=1552697178732627&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=20C874A1EFFE98359040A5113E55BBF7382D64E5757A50CAD4C81A3683BC1602.6B72B51FB00F319A832F1155C22F436A78A70F35CA3452B7978997427E2304FF&key=us0#f720p","default":true}]},{"name":"Nhiệm Vụ Bất Khả Thi 6: Sụp Đổ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nhiem-vu-bat-kha-thi-6-sup-do_11163/xem-phim/"},"nameOrigin":"Mission: Impossible Fallout","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnhiem-vu-bat-kha-thi-sup-do-mission-impossible-fallout-2018.jpg%3Fsize%3D300"},"directors":["Christopher McQuarrie"],"actors":["Tom Cruise","Vanessa Kirby","Rebecca Ferguson"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"Phim Nhiệm Vụ Bất Khả Thi: Sụp Đổ Ba năm sau Mission: Impossible – Rogue Nation, chàng đặc vụ điển trai và hào hoa bậc nhất trên màn ảnh rộng Ethan Hunt sẽ tái xuất màn bạc trong mùa hè 2018. Trailer đầu tiên của Nhiệm Vụ Bất Khả Thi: Sụp Đổ (Tựa gốc: Mission: Impossible - Fallout) vừa được hãng phát hành Paramount tung ra ngay lập tức trở thành tâm điểm của đại chúng bởi sự trở lại của ngôi sao hành động hàng đầu thế giới Tom Cruise cùng những khoảnh khắc nghẹt thở bắt nguồn từ pha hành động đẳng cấp mang đậm dấu ấn cá nhân anh.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednsl.googlevideo.com/videoplayback?id=a4808244ff6b0247&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=U43ZXM_9AZfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=8861.384&lmt=1551874250066531&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557768563&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=AF55CB6131DCCD084E03EF487A53B556A0BD98E0D0F7F190B7AE5675F88D7CA3.33364A49CCB1BE7E734DA764853C3B52A344E2E07F6FBFC65577F4FF411E41&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nzs.googlevideo.com/videoplayback?id=a4808244ff6b0247&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=U43ZXJvDCpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=8861.384&lmt=1551880843546747&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557768563&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=69C025FFAA1C895FE96319D4B07DAB192194DF78CC829EE99914AAF6460358CA.DC95F107EA67393F67448269A338123B0FFD30779E757CE3DF224A2DCC866606&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r1---sn-4g5ednsl.googlevideo.com/videoplayback?id=a4808244ff6b0247&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=U43ZXMCWDZqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=8861.384&lmt=1551880534158453&mt=1557760963&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557768563&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=CFB21CFEBF52CE36669F7216DDCE5B5E4E6357AA55EBC6FC2DAFDF9354F5A353.332EAEB8BA732026B0C2FF97474C47D2BAC99FD719095E1ADB26C9502F6FCA88&key=us0#f1080p","default":true}]},{"name":"Cá Mập Siêu Bạo Chúa","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ca-map-sieu-bao-chua_11248/xem-phim/"},"nameOrigin":"The Meg","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fca-map-sieu-bao-chua-the-meg-2018.jpg%3Fsize%3D300"},"directors":["Jon Turteltaub"],"actors":["Jason Statham","Rainn Wilson","Ruby Rose"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":113,"desc":"Phim Cá Mập Siêu Bạo Chúa Trong chuyến thám hiểm đại dương, đoàn thủy thủ đã khám phá ra Mariana - khu vực biển sâu nhất Trái Đất. Tuy nhiên, cả đoàn bị mắc kẹt dưới đáy Thái Bình Dương, khi đó tính mạng của họ bị đe dọa trước kẻ săn mồi ám ảnh đầy kinh hãi nhất lịch sử - siêu cá mập bạo chúa khổng lồ, thường được biết đến với cái tên Megalodon. Trước tình hình ngàn cân treo sợi tóc, một đội chuyên gia gồm Jonas Taylor (Jason Statham), nhà đại dương và con gái ông đã được tập hợp để đến giải cứu đoàn tàu. Jonas cùng đồng đội sẽ xoay sở ra sao? Liệu họ có thể giải cứu mọi người thoát khỏi sinh vật đáng sợ này?","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6ns6.googlevideo.com/videoplayback?id=aec3c65ec7e7dae0&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns6&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXKSACsKt8gOsnpT4Bg&susc=ph&app=fife&mime=video/mp4&dur=6791.581&lmt=1552616955091288&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9E92021F8F93FDE247073FE722BBACE443E1BD1B9D6C051FEBDF481A4C9A6CF0.4BCD9E0BF171EE58A0B4E7F64ECCDD77C95AAC275D8925C8E22F431D3F382000&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edned.googlevideo.com/videoplayback?id=aec3c65ec7e7dae0&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edned&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXLvYD4mu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6791.581&lmt=1552619234467165&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8A9483AD2E7B0A06A0371F69AEBDD547DEAD8E4685F76535B8F14852618AA838.19DAB97540EF874B8AAF1FC502AD963F428C33142C18BF8275033F864BD80386&key=us0#f720p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-meg-2018/1"},{"name":"Alpha: Người Thủ Lĩnh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/alpha-nguoi-thu-linh_11246/xem-phim/"},"nameOrigin":"Alpha","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Falpha-nguoi-thu-linh-alpha-2018.jpg%3Fsize%3D300"},"directors":["Albert Hughes"],"actors":["Natassia Malthe","Leonor Varela","Kodi Smit McPhee","Jóhannes Haukur Jóhannesson"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":100,"desc":"Alpha” lấy bối cảnh 20.000 năm trước, đưa người xem theo chân một cậu bé thuộc tộc người hang động tại Châu Âu (do Kodi Smit-McPhee thủ vai) vào thời Đồ Đá Cũ. Trong lúc cùng các đồng bào của mình đi săn bò rừng, cậu đã bị rơi khỏi vách đá và lạc mất đoàn. Trong hành trình trở về bộ tộc đầy cam go, người chiến binh trẻ đã có một tình bạn kỳ lạ cùng một con sói tuyết hung dữ.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednsz.googlevideo.com/videoplayback?id=f2c199ab9e855dab&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXNLYKseA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&dur=5790.499&lmt=1552654433023480&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=3589B238C7621AC3A52F082C00F43C2D36E11019A76C8A2570C0F2883F8C80B9.61B933C8808B07B732FB3AC5A89B5FED79D4D79E50B801D6585B57DCF874CEFD&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nsz.googlevideo.com/videoplayback?id=f2c199ab9e855dab&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=MZ_ZXOH9LIKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5790.499&lmt=1552657792257094&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773137&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=2B905CBA1F9A62CB17D0708942768C25D595D8118354082E2CE3798D9AE4D0E8.A7C3C11B6945BE2F0AE80F3F5618992EFAB0D8EEF13FF520D0F5C08878260610&key=us0#f720p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/alpha-2018/1"},{"name":"Tế Công 2: Thần Long Tái Xuất","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/te-cong-2-than-long-tai-xuat_11212/xem-phim/"},"nameOrigin":"The Incredible Monk: Dragon Return","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fte-cong-2-than-long-tai-xuat-the-incredible-monk-dragon-return-2018.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Đang cập nhật"],"genres":["Phim Cổ Trang","Phim Hài Hước","Phim Thần Thoại","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Tế Công 2: Thần Long Tái Xuất Tế Công và các liên minh anh hùng, lại một lần nữa hóa giải thảm họa của nhân gian, phàm là không gian đều không thể nhận được an toàn, tranh chấp, chiến tranh vẫn không ngừng. Tướng quân Cao Nhân Kiệt chính là danh tiếng triều đình, đã tham gia nhiều trận lớn nhỏ và giành nhiều chiến thắng, lập được không ít công lao hiển hách, trở thành người anh hùng dân tộc. Cao Bân và Tự Thiếu phải lòng thanh mai trúc mã Phượng Nghi, nhưng ý trời lại lệnh Phượng Nghi bị ép phải xuống biển làm kỹ nữ.Cao Nhân Kiệt yêu Phượng Nghi, lại bị mọi người chỉ trích lại không dám cưới Phượng Nghi làm thê tử. Cao Nhân Kiệt cầu Tế Công giúp, Tế Công trải qua bao nhiêu khó khăn, thề phải làm mối cho hai người mệnh khổ này! Khi tất cả đã thành công, thuộc hạ của Cao lại hạ độc thủ, giết chết Phượng Nghi, muốn Cao Nhân Kiệt quên đi tình cảm trai gái, dốc lòng vì nước vì dân. Tế Công phẫn nộ, oán hận ông trời vì sao lại chia cách uyên ương? Lẽ trời ở đâu? Giận dữ biến thành rồng thần, thề phải thay đổi vận mệnh, đi ngượi thiên ý, trực tiếp đi xuống địa phủ, chiến đầu chống lại các linh hồn tà ác, cướp lại nguyên thần của Phượng Nghi","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6ne6.googlevideo.com/videoplayback?id=74e4eb9fcaa1cf04&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=Mp_ZXJTWC4KC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&dur=5303.391&lmt=1552553977662866&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773138&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9E6B7764A0AB180F9FDC2812C47E56B35A112C2B09D43F079E008AE60B7A1BC2.3E6FBFE306737BE88902B843769586AABFBB7D3425BF1E699358F740B499C698&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5ednz7.googlevideo.com/videoplayback?id=74e4eb9fcaa1cf04&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=Mp_ZXPT8EZbg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5303.391&lmt=1552555417650192&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773138&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E2C52D146F3122CC23849846174EB378C99ED7F4207319EEE059A70780DA4CE6.79EBA8948D1574DEC6FA235D46051F27977271AD0035561B6804A52841C63AB0&key=us0#f720p","default":true}]},{"name":"Tập Yêu Pháp Hải Truyện","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tap-yeu-phap-hai-truyen_11185/xem-phim/"},"nameOrigin":"Fa Hai","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftap-yeu-phap-hai-truyen-fa-hai-2018.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Bạch Vũ","Hoàng Dung","Khương Chấn Hạo"],"genres":["Phim Cổ Trang","Phim Thần Thoại"],"countries":["Trung Quốc"],"duration":90,"desc":"Trong phim Tập Yêu Pháp Hải Truyện, thời kì hưng thịnh, yêu quái hoành hành. Triều đình lập ra tổ chức “Tập Yêu Ti” chuyên lùng bắt yêu quái, từng thành viên đều phải uống máu yêu, để chống lại yêu ma. Nhưng nếu không thể giữ được tấm lòng trong sạch như nước, thì sẽ bị máu yêu phản phệ, hóa thành bán yêu.Ban đêm, thủ lĩnh Tập yêu ti Bùi Văn Đức dẫn người ra ngoài thành tìm kiếm yêu khí lạ xuất hiện. Tại nơi đó phát hiện một thiếu nữ tên Bạch Thanh Thanh thực chất là một con cự xà, trong lúc hai bên giao chiến, hoàng cung bị Quỷ Vương tập kích, tính mạng hoàng đế như chỉ mành treo chuông. Bùi Văn Đức phụng mệnh dẫn theo “nội ứng” của yêu vương Bạch Thanh Thanh bước lên con đường tìm kiếm Quỷ Vương, dọc đường đi Bùi Văn Đức phát hiện thì ra Bạch Thanh Thanh bị yêu vương uy hiếp, hai người hóa giải hiềm nghi lúc trước bắt đầu nảy sinh một chút tình cảm khác thường.Trải qua khó khăn trùng trùng, rốt cục Bùi Văn Đức đã tìm được chỗ ẩn náu của Yêu vương, nhưng thực lực đôi bên chênh lệch quá rõ, hắn phải làm sao đây ?","embeds":[{"resolution":360,"embedUrl":"https://content.googleapis.com/drive/v2/files/1FTnx6FI1pWcK-CIcceB4AJ8S61rYJuRy?alt=media&key=AIzaSyBMqv4dXnTJOGQtZZS3CBjvf748QvxSzF0","default":true}]},{"name":"Toà Tháp Chọc Trời","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/toa-thap-choc-troi_11119/xem-phim/"},"nameOrigin":"Skyscraper","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftoa-thap-choc-troi-skyscraper-2018.jpg%3Fsize%3D300"},"directors":["Rawson Marshall Thurber"],"actors":["Dwayne Johnson","Roland Møller"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"Phim Toà Tháp Chọc Trời Dwayne Johnson (The Rock) sẽ vào vai cựu quân nhân và cựu trưởng nhóm đặc nhiệm giải cứu của FBI Will Ford đầy dũng cảm. Không may trong một nhiệm vụ nguy hiểm, tai nạn khủng khiếp xảy đến với Will làm anh mất đi chân trái của mình. Kể từ đó, Will Ford từ bỏ công việc tại FBI và trở thành chuyên gia đánh giá an ninh cho các tòa nhà. Trong một lần làm việc, Tòa nhà cao 240 tầng với hệ thống an ninh tối tân đột nhiên bị cháy lớn ở tầng 96. Những con người, cạm bẫy và thế lực nào đứng sau thảm họa này chắc chắn đang nhắm vào cựu quân nhân và lấy gia đình anh ra làm con tin. Với kinh nghiệm, sự gan dạ của một người lính cùng tình yêu gia đình mãnh liệt, liệu Will Ford có tìm ra được kẻ chủ mưu và cứu lấy gia đình của anh?","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsd.googlevideo.com/videoplayback?id=e274518e371b340a&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsd&ms=nxu&mv=u&pl=25&sc=yes&ei=3JbZXLusHYzn1wLMsZmIAg&susc=ph&app=fife&mime=video/mp4&dur=6146.182&lmt=1552397873943678&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771004&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=76826CADD817D270B7EB5413AD61707E13BFB70AD378D2EAEF59ED24B4AAE53E.19B39957F219A542E64DC8A9C4F0C2D2133305DE113CF20CB833FE55D6F3489D&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nzl.googlevideo.com/videoplayback?id=e274518e371b340a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=3JbZXK64JceA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6146.182&lmt=1552401757817090&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771004&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5E8CE93FAA1A3CEA9DA17C68734EC9632952C2759ABFD80DDD4BD604509471AD.A935AA86B9BB9F089CE00EF4123BAA68CB9E451052787A73D625787257FD3A94&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5e6nzl.googlevideo.com/videoplayback?id=e274518e371b340a&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=3JbZXO7iJ8-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6146.182&lmt=1552401772042745&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771004&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=C3812EBBF3FB55F525ADC1603129383EB0CC3AB9059108B1BF32F015E5907487.ECFDE15DE8FD07265D3B9D1FD0A8A9D4C643758018F9F33390D31B2CBB186AB9&key=us0#f1080p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/skyscraper-2018/1"},{"name":"Tiết Mật Hành Giả","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tiet-mat-hanh-gia_11146/xem-phim/"},"nameOrigin":"The Leakers","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftiet-mat-hanh-gia-the-leakers-2018.jpg%3Fsize%3D300"},"directors":["Herman Yau"],"actors":["Julian Cheung","Chrissie Chau","Francis Ng","Kent Cheng","Sam Lee"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Tâm Lý"],"countries":["Hồng Kong"],"duration":100,"desc":"Phim Tiết Mật Hành Giả thuộc thể loại hành động, ly kỳ có bối cảnh chủ yếu ở Malaysia và HongKong. Phim khai thác đề tài dịch bệnh do bị phát tán 1 loài virus nguy hiểm ảnh hưởng đến toàn nhân loại và cuộc chiến khắc nghiệt của hình cảnh quốc tế cùng chống lại những kẻ đứng sau vụ này.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6ns7.googlevideo.com/videoplayback?id=efa2ab15e6e2d2a9&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns7&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=OJ_ZXPavEIOd8gOAxbGoAw&susc=ph&app=fife&mime=video/mp4&dur=6166.453&lmt=1551274395256404&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773144&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=6F3EF73243DB383C18D38EA3F85CA22290E259973ED9C0CC24E8DD98FFB57F69.97B817C75DE7CD6C4532E0329AEBBE599E8A6864BD979CE75FA093F4F63CDBB5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edn7e.googlevideo.com/videoplayback?id=efa2ab15e6e2d2a9&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7e&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=OJ_ZXODaEoOd8gOAxbGoAw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6166.453&lmt=1551277812740312&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773144&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=B408B60415F375583BAAC8CE265904A380F34D25829F3664BB9EADF411457CE4.0E514EE73C3D84D7DB353A519D2D3D4EA158A3EEB9A659B76FBA3F00B52E43BF&key=us0#f720p","default":true}]},{"name":"Ngự Thiên Thần Đế 3: Chi U Yến Kinh Hồn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ngu-thien-than-de-3-chi-u-yen-kinh-hon_11058/xem-phim/"},"nameOrigin":"Ngu Thien Than De","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fngu-thien-than-de-3-chi-u-yen-kinh-hon-ngu-thien-than-de-2018.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Lý Hân Trạch","Phó Dương Dương","Trương Duyệt Nam"],"genres":["Phim Cổ Trang","Phim Thần Thoại","Phim Võ Thuật"],"countries":["Trung Quốc"],"duration":90,"desc":"Phim Ngự Thiên Thần Đế 3: Chi U Yến Kinh Hồn 2018: Diệp thanh vũ - Con trai tuyết quốc đại tướng quân, trong 1 đêm cả nhà gặp nạn, trở thành tên ăn mày. Để trở lại triều đình điều tra rõ chân tướng, hắn ghi danh vào học viện võ đạo. Mong muốn báo thù. Trong thời gian ở học viện, hắn được nhiều người không để ý sống chết bản thân ra sức giúp đỡ, khiến thân thế của hắn thành bí ẩn. Diệp thanh vũ không muốn liên lụy tới Tống Tiểu Quân (người yêu hắn), nhưng hắn lại yêu Bạch Ngọc Khanh, Quận chúa bạch ngọc khanh lại là yêu tộc nằm vùng tại nhân tộc. Yêu tộc không ngừng dùng thủ đoạn gia hại Diệp Thanh Vũ, nhưng hắn ở trong nghịch cảnh không ngừng mạnh mẽ hơn. Bạch Ngọc Khanh yêu hắn, nhưng hắn lại trúng bấy của Yêu tộc, Tống tiểu quân dùng tình mệnh cứu hắn... Hắn sẽ ra sao ?","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/54fa9bcadc849e6f19750e6d88daa424/54fa9bcadc849e6f19750e6d88daa424.playlist.m3u8","default":true}]},{"name":"Đôi Bạn Trổ Tài","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/doi-ban-tro-tai_11047/xem-phim/"},"nameOrigin":"Đôi Bạn Tri Kỷ 2 / Mad Mission Part / Aces Go Places 2","year":"1983","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdoi-ban-tro-tai-doi-ban-tri-ky-2-mad-mission-part-aces-go-places-2-1983.jpg%3Fsize%3D300"},"directors":["Tăng Chí Vĩ"],"actors":["Trương Ngải Gia","Karl Maka","Sam Hui (Hứa Quán Kiệt)","Yasuaki Kurata"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Đôi Bạn Trổ Tài - Đôi Bạn Tri Kỷ 2 / Mad Mission Part / Aces Go Places 2 kể về hai nhân vật King Kong - Đầu Trọc quyết tâm phá án vụ cướp hà băng, đưa bọn người xấu ra ánh sáng.","embeds":[{"resolution":360,"embedUrl":"http://zingtv-video-12.zadn.vn/Video480/2015/1112/30/211fbb3b16a10ea01090f8df70b94541.mp4?authen=exp=1557852351~acl=211fbb3b16a10ea01090f8df70b94541~hmac=191f1be64aeae853b2b83353094e28cc","default":false},{"resolution":720,"embedUrl":"http://zingtv-video-12.zadn.vn/2015/1112/30/1309f74323a77f3f0ce9224fc581e3ff.mp4?authen=exp=1557852351~acl=1309f74323a77f3f0ce9224fc581e3ff~hmac=cbdb320833fe87a863b2ba20e4e02dc0","default":false}]},{"name":"Em Trai Tôi Là Găng Tơ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/em-trai-toi-la-gang-to_10986/xem-phim/"},"nameOrigin":"Brothers in Heaven","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fem-trai-toi-la-gang-to-brothers-in-heaven-2018.jpg%3Fsize%3D300"},"directors":["Park Hee Joon"],"actors":["Sung Hoon","Jo Han Sun"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":114,"desc":"phim Em Trai Tôi Là Găng Tơ - Brothers in Heaven 2018 kể về Tae-Joo (Jo Han-Sun đóng) một cảnh sát giỏi, có nhiệm vụ truy bắt những băng đảng trộm cổ vật khét tiếng ở Busan. Trong lúc truy đuổi tội phạm, anh lại phải đối đầu với Tae-Sung (Sung Hoon đóng) - người em trai sinh đôi của mình, một thành viên “máu mặt” trong thế giới ngầm Găng Tơ.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6ns7.googlevideo.com/videoplayback?id=c29418ea69d18fa4&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns7&ms=nxu&mv=m&pl=25&sc=yes&ei=xYbZXPvDDseA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6845.776&lmt=1550176934850922&mt=1557759518&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766885&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=4761076E330FA28746F80C46CE9171B6113B7CF8E7928203335E8937BDC3532C.101FA66886A211D4388184C0706A8EE65147A7281A215F369459727C75BBFCCA&key=us0","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5edney.googlevideo.com/videoplayback?id=c29418ea69d18fa4&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edney&ms=nxu&mv=u&pl=25&sc=yes&ei=xYbZXOO4DsyX8gOqvqXIDw&susc=ph&app=fife&mime=video/mp4&dur=6845.776&lmt=1550171082145295&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766885&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=62A15C8FEBEEE66065960A8F535AC6687DEADAE4A0115E94F85A3C4CC379A2FF.354DCFEDF93A38F66CEDF52510F47F11778E4F487014DAEB22F55B745347346B&key=us0","default":false}]},{"name":"Rồng Đất: Ngày Lạnh Giá Ở Địa Ngục","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/rong-dat-ngay-lanh-gia-o-dia-nguc_10947/xem-phim/"},"nameOrigin":"Tremors: A Cold Day in Hell","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Frong-dat-ngay-lanh-gia-o-dia-nguc-tremors-a-cold-day-in-hell-2018.jpg%3Fsize%3D300"},"directors":["Don Michael Paul"],"actors":["Jamie Kennedy","Tanya van Graan","Jamie Lee Money"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Kinh Dị","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":98,"desc":"Phim Rồng Đất: Ngày Lạnh Giá Ở Địa Ngục - Tremors: A Cold Day in Hell Phần tiếp theo tìm thấy Burt Gummer và con trai Travis tại một trạm nghiên cứu từ xa, nơi họ phải chiến đấu với quái vật Graboids đã được biến thành vũ khí sống.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nz7.googlevideo.com/videoplayback?id=f197ca592dd91b8f&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=2JDZXO_MMZmV1wL9qaHgDA&susc=ph&app=fife&mime=video/mp4&dur=5878.619&lmt=1552397688456199&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769464&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=067AFF7BAAE15CFE9266E91339AE94D263B243E7A6F1EF2A8A3AF0D4F311F409.A0E23815CD9625CB85589466F67C72319F848437FFD94960BDD4B04633604841&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edne6.googlevideo.com/videoplayback?id=f197ca592dd91b8f&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=2JDZXM-_NInG1wL4lbfwDg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5878.619&lmt=1552400386537296&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769464&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=984735FDF76316F998046373C634E075F8EEAE69287890134CDC65DDDB184D07.2B77749E9AC4D891CD10155216EF1E62D30B39B5B69E30703D7122CD3C3A5D51&key=us0#f720p","default":true}]},{"name":"Siêu Thú Cuồng Nộ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sieu-thu-cuong-no_10914/xem-phim/"},"nameOrigin":"Rampage","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsieu-thu-cuong-no-rampage-2018.jpg%3Fsize%3D300"},"directors":["Brad Peyton"],"actors":["Dwayne Johnson","Jeffrey Dean Morgan","Malin Akerman","Joe Manganiello"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":107,"desc":"phim Siêu Thú Cuồng Nộ - Rampage nói về nhà sinh vật học Davis Okoye (Dwayne Johnson) đã kết bạn với George, một con khỉ đột thông minh, người đã được chăm sóc từ khi sinh ra. Tuy nhiên, một thí nghiệm di truyền giả mạo đã biến đổi con khỉ nhuyễn thành một con quái vật. Khi các con quái vật mới được tạo ra này tràn ngập khắp Bắc Mỹ, phá hủy mọi thứ trên con đường của họ, Okoye đã làm việc với một kỹ sư di truyền bị để tìm ra thuốc giải độc, chiến đấu để vượt qua một chiến trường luôn thay đổi, không chỉ để ngăn chặn một thảm hoạ toàn cầu mà còn cứu được sinh vật đã từng là bạn của mình.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsl.googlevideo.com/videoplayback?id=489f5382321840d6&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=m&pl=25&sc=yes&ei=jIbZXNi1Iozn1wLMsZmIAg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6436.223&lmt=1555269872464189&mt=1557759518&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766828&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=6A85944EEFC379D7F7F9BA51EF49C1BFD2F31013860443555DCC4BCB3982E889.4D9E313574AEAF50232BC89F15CD60EB4A76294E8705E9CC0EC8B5724C0F96D9&key=us0","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6n7d.googlevideo.com/videoplayback?id=489f5382321840d6&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n7d&ms=nxu&mv=m&pl=25&sc=yes&ei=jIbZXJnBIpmV1wL9qaHgDA&susc=ph&app=fife&mime=video/mp4&dur=6436.223&lmt=1555265902811136&mt=1557759518&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766828&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=C5596BFE1BF799AF9D56D53FCED54AE7F3C8E5765BCCD389289946EA36F9C902.E4988F6DBAA31842EE98DEE78D4859CAF7F682281A2E809F38A8EC29BF213AB8&key=us0","default":false}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/rampage-2018/1"},{"name":"Vinh Quang Thích Khách Kinh Kha","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/vinh-quang-thich-khach-kinh-kha_10912/xem-phim/"},"nameOrigin":"Assassin Glory","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fvinh-quang-thich-khach-kinh-kha-assassin-glory-2018.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Tạ Miêu"],"genres":["Phim Cổ Trang","Phim Võ Thuật"],"countries":["Trung Quốc"],"duration":75,"desc":"Phim Vinh Quang Thích Khách - Kinh Kha phim - Assassin Glory thể hiện nửa đời trước của Kinh Kha, trước khi hành thích tần vương","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nsr.googlevideo.com/videoplayback?id=fcca1a7ceb37b642&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsr&ms=nxu&mv=u&pl=25&sc=yes&ei=6ZbZXKnXGqyj8gODuIrIBQ&susc=ph&app=fife&mime=video/mp4&dur=4459.694&lmt=1551262958134832&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771017&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=132A495D02E746107A5790F095B2902A115F9A26B09C4734391F6CA0C6081C07.C161C52CD25E97BEDDEF9584C16BF59F89AD29B67A2FCE2E5DF40F93058C75F3&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nsr.googlevideo.com/videoplayback?id=fcca1a7ceb37b642&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsr&ms=nxu&mv=u&pl=25&sc=yes&ei=6ZbZXPiIH5rj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4459.694&lmt=1551264972417202&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771017&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=592E35D8E1A0E5957400EF29B9EFA982BD15D5C1F37F7A98D6764D96A6F2D7F2.99C229EE5D754C38D8E603210D8BF313A8D74E7F70020474A195A3294D296B43&key=us0#f720p","default":true}]},{"name":"Cuộc Gọi Cuối Cùng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-goi-cuoi-cung_10936/xem-phim/"},"nameOrigin":"The Last Call","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-goi-cuoi-cung-the-last-call-2018.jpg%3Fsize%3D300"},"directors":["Vương Ninh"],"actors":["Lý Tuấn Vĩ","Triệu Tân","Triệu Văn Kỳ"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Cuộc Gọi Cuối Cùng - The Last Call khi tỉnh lại, bác sĩ Tần Phong phát hiện bị nhốt trong một chiếc hòm kín. Kẻ bắt anh cho biết để thoát khỏi đây, anh chỉ được cung cấp một chiếc điện thoại cài sẵn 3 số điện để liên lạc cầu cứu. Vỏn vẹn 60 phút trong một không gian thiếu oxi, liệu anh có được cứu thoát kịp thời và người âm mưu chuyện này là ai?","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5edn7e.googlevideo.com/videoplayback?id=698718f7fac25c15&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7e&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=SJ_ZXMi9FYHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&dur=4978.892&lmt=1551336900291791&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773160&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=C8B1F107763332773F24524103A80CDCB47A2EB56750A5997F6BB321A26D0E8A.C60CF85C7D7C513FC7BDCD92AD3E5584622C5B5761E1F42F3A6CADF7A53846A0&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nlk.googlevideo.com/videoplayback?id=698718f7fac25c15&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nlk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=SJ_ZXM-nH4zn1wLMsZmIAg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4978.892&lmt=1551340196010749&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773160&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=C7757A00D74980F84D7D8EB3A5E174ADAAFA995C14F246DF9085C72A6866DDEA.9A88C37B248B7E0D024EFEC37D747CB9DA2AAB6FFB334C464AAEE2370EFDD68A&key=us0#f720p","default":true}]},{"name":"Cô Nàng Xui Xẻo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/co-nang-xui-xeo_10859/xem-phim/"},"nameOrigin":"Fairy Tale Of Love","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-nang-xui-xeo-fairy-tale-of-love-2017.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Lý Tương","Phan Nguyễn","Lý Tử"],"genres":["Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Cô Nàng Xui Xẻo / Fairy Tale Of Love Cuộc sống giản đơn của anh chàng Trần Mạch bỗng chốc bị xáo trộn bởi sự xuất hiện của Tịnh Ly – một cô gái kỳ lạ, có phép thuật. Thật ra, Tịnh Ly chính là Suy Thần – một vị thần mang đến xui xẻo – trốn từ tiên giới xuống trần gian. Rốt cuộc giữa hai người họ có cơ duyên gì mà có thể khiến Tịnh Ly quyết định hạ phàm như vậy?","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednll.googlevideo.com/videoplayback?id=83b45e12024d1558&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ei=8JbZXPrHKc-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&dur=4587.659&lmt=1552483003579810&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771024&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=725D107D713CD0D42BD7D6DF91B6F60F22948E93971745F20CCC548ACCF465DD.676149DB60987389EF23137B762D6D45475C97B22BB9F8AEA2A270CCA290DFB0&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nez.googlevideo.com/videoplayback?id=83b45e12024d1558&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nez&ms=nxu&mv=u&pl=25&sc=yes&ei=8JbZXP7sK4qk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4587.659&lmt=1552488212558914&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771024&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=828ACC879DB0483AE701ED992903C67AB72F04042784022DB0B71F1963F238D6.8867B3D1C551A26853EC6FA455AB17ACFE2E2C22A39F9C613F5196CA601CE657&key=us0#f720p","default":true}]},{"name":"Chiến Dịch Đen","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chien-dich-den_10807/xem-phim/"},"nameOrigin":"China Salesman","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchien-dich-den-china-salesman-2017.jpg%3Fsize%3D300"},"directors":["Tan Bing"],"actors":["Steven Seagal","Mike Tyson","Dong xue Li","Janicke Askevold","Eriq Ebouaney"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":110,"desc":"phim Chiến Dịch Đen / China Salesman kể về Yan Jian, một kỹ sư công nghệ thông tin người Trung Quốc tình nguyện đi đến Bắc Phi. Điệp viên Pháp Michael theo mệnh lệnh đi đến Bắc Phi để đánh chiếm khoáng sản. Yan đã phát hiện ra âm mưu của họ, liệu anh có thể ngăn chặn được âm mưu này ?","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edne6.googlevideo.com/videoplayback?id=bc3dd9e59638219c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=UJ_ZXN_mFpbg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&dur=6615.040&lmt=1552384283993998&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773168&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=0468C381D1B6246F116A100FF947A714ED814E9893EB50C1F8DAA3394BC25359.AA634586E351DB7753A534D240742F91E1304B043A8B221EF12AA2E893693056&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edne6.googlevideo.com/videoplayback?id=bc3dd9e59638219c&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=UJ_ZXOWYGceo8gOiw4WoCQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6615.040&lmt=1552386805929129&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773168&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E47702941C6BCF2BCFC8E79F20E76460EA1C6C6EC817B4F256B03A959FDF15D4.BC8F5274A0940701387B60D22AEB326903002E257677CE8EB959D13EB11C3620&key=us0#f720p","default":true}]},{"name":"Ngũ Hiệp Trừ Yêu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ngu-hiep-tru-yeu_10672/xem-phim/"},"nameOrigin":"The Thousand Faces of Dunjia","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fngu-hiep-tru-yeu-the-thousand-faces-of-dunjia-2018.jpg%3Fsize%3D300"},"directors":["Viên Hòa Bình"],"actors":["Liễu Nham","Lý Trị Đình","Đổng Thành Bằng","Chu Đông Vũ","Nghê Ni","Ngũ Bách","Ngụy Lộ","Trương Nghệ Kiển"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Ngũ Hiệp Trừ Yêu / The Thousand Faces of Dunjia Lấy bối cảnh giả tưởng không cụ thể, Trung Nguyên bấy giờ đang đứng trước bờ vực thảm họa khi bị lũ sinh vật dị hợm đến từ ngoài vũ trụ hoành hành. Để ngăn chặn các thế lực tà ác, bảo vệ dân lành, Vụ Ẩn Bang được thành lập bao gồm hàng loạt cao thủ tinh thông võ nghệ lẫn Kỳ Môn Độn Giáp. Thời gian thấm thoát trôi qua, con quái vật mạnh nhất đã bị phong ấn, xã hội bình yên trở lại, tổ chức này cũng vì vậy mà ngày một suy tàn, chìm dần vào quên lãng.","embeds":[{"resolution":360,"embedUrl":"http://cdn16nofree.keeng.net/kfilm/mp4/20180822/2e763c9b-15a2-4865-8aa0-143436065879_5.mp4","default":true}]},{"name":"Hỷ Lạc Trường An","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hy-lac-truong-an_10663/xem-phim/"},"nameOrigin":"Easy Life","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhy-lac-truong-an-easy-life-2016.jpg%3Fsize%3D300"},"directors":["Trúc Khanh"],"actors":["Trương Thiên Dương","Hà Hoằng San","Vạn Thương"],"genres":["Phim Hành Động","Phim Cổ Trang","Phim Hài Hước","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":92,"desc":"Hỷ Lạc Trường An / Easy Life được chuyển thể từ tiểu thuyết Trường An Loạn của tác giả nổi tiếng Hàn Hàn. Thích Nhiên – 1 tiểu hòa thượng có công phu đặc biệt, dù chiêu thức nhanh đến đâu nhưng trong mắt cậu cũng chậm rì rì.. Vì thế, cậu nghiễm nhiên trở thành 1 nhân vật huyền thoại và bị giới giang hồ truy sát vì chức vị minh chủ võ lâm","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednss.googlevideo.com/videoplayback?id=79d3e383a058bb97&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednss&ms=nxu&mv=u&pl=25&sc=yes&ei=X5_ZXITvLZWd1wKq87T4Bw&susc=ph&app=fife&mime=video/mp4&dur=5538.330&lmt=1552398623590070&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773183&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=60B517191EC630FAE942A3AE89F0DD38FE161F03A19A156D76A5D895B995A60B.70823A857FEE52EB8B1DFE82B25FF129D9ED6E47ED07729F02E8B38486489AE1&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6ney.googlevideo.com/videoplayback?id=79d3e383a058bb97&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ney&ms=nxu&mv=u&pl=25&sc=yes&ei=X5_ZXJ-kNNKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5538.330&lmt=1552611934107520&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773183&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8CE14DF2F75066B1C602B0641E0B56A903A3941EA37DC97D826C275E5FF1F8BF.ABC4848856A03A5BA74EEBDBA1C49C45D48DDC67F27EF1F83E1A6FF0C343DBBC&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r2---sn-4g5ednss.googlevideo.com/videoplayback?id=79d3e383a058bb97&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednss&ms=nxu&mv=u&pl=25&sc=yes&ei=X5_ZXJbuOpWd1wKq87T4Bw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5538.330&lmt=1552612079189952&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773183&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3A433E482DB2689640161E063AF414C7D62BE0A8EDF6EDC61F1EA5931F194C1F.B187DF5E60CE5931B1C95C43F972FEB59003864C56493E81DE5DD962034CDFF5&key=us0#f1080p","default":true}]},{"name":"Tôi Là Cung Xử Nữ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/toi-la-cung-xu-nu_10623/xem-phim/"},"nameOrigin":"12 Cung Hoàng Đạo / Perfect Imperfection","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftoi-la-cung-xu-nu-perfect-imperfection-2016.jpg%3Fsize%3D300"},"directors":["Trần Bình"],"actors":["Phương Trung Tín","An Dĩ Hiên","Ahn Jae Hyun"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":86,"desc":"Tôi Là Cung Xử Nữ / 12 Cung Hoàng Đạo / Perfect Imperfection là tác phẩm đầu tiên của Hoa Ngữ có chủ đề về cung hoàng đạo. Phim khắc họa lại câu chuyện tình yêu đầy thú vị của cặp đôi đều thuộc cung Xử Nữ. Đây là một bước đi thông minh của các nhà làm phim. Vì những năm trở lại đây, giới trẻ càng ngày càng chú trọng hơn đến vấn đề cung hoàng đạo. Từ công việc, học tập cho đến tình yêu, tình bạn, người ta đều lấy 12 chòm sao ra làm thước đo chuẩn mực.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsr.googlevideo.com/videoplayback?id=9338cb03149fa628&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsr&ms=nxu&mv=u&pl=25&sc=yes&ei=CJHZXOzmG5G01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&dur=5184.876&lmt=1552377177879176&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769512&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=56A505C1256D1C1946768F791D17333777A2C3102A7B5469B3C71D2BB8AAE3D7.D0EFFFA72B09874DCD38BAECF5F1DC5DB0BCC4245D089B34EB2E8B1B10106A5C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6nls.googlevideo.com/videoplayback?id=9338cb03149fa628&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nls&ms=nxu&mv=u&pl=25&sc=yes&ei=CJHZXI6fIo-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5184.876&lmt=1552380196962488&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769512&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=17FA923D64F75C4F572F0D62D89D1A239AA6BF995ECC00A2E7A8E93A08622F83.62092D13EA9CC851E0DF3EFF616A0E17E9273AACBFB3C43EB88B52919527D73E&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5ednsr.googlevideo.com/videoplayback?id=9338cb03149fa628&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsr&ms=nxu&mv=u&pl=25&sc=yes&ei=CJHZXPbcJPmY8gP-1IS4Cg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5184.876&lmt=1552380320311430&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769512&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E7C0ED28DD4D31CB2487CE5E7F51FFA5724788C93592E658DC1206FF0A136B73.9BB555D747AEB6D054C047106266DE70379AC9FFB652C106AFAD1073C6E3E958&key=us0#f1080p","default":true}]},{"name":"Siêu Nhân Điện Quang: Thiết Long","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sieu-nhan-dien-quang-thiet-long_10601/xem-phim/"},"nameOrigin":"Dragon Force: So Long Ultraman","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsieu-nhan-dien-quang-thiet-long-dragon-force-so-long-ultraman-2017.jpg%3Fsize%3D300"},"directors":["Vương Nguy"],"actors":["Hầu Dũng","Kim Thần","Đại Trương Vỹ"],"genres":["Phim Hành Động","Phim Hoạt Hình","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Siêu Nhân Điện Quang: Thiết Long / Dragon Force: So Long Ultraman Nửa thế kỷ trước trái Đất xuất hiện 1 siêu anh hùng được nhiều người yêu mến đó là Siêu Nhân Điện Quang. Thế nhưng, sau khi diệt trừ hết quái thú thì anh lại biến mất, thậm chí còn bị nghi ngờ là âm mưu hủy diệt Trái Đất. Trước đại họa sắp ập đến đội Cang Chi Thiết Long tinh nhuệ buộc phải xuất quân ngăn chặn.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednls.googlevideo.com/videoplayback?id=7256336783a5a53b&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednls&ms=nxu&mv=u&pl=25&sc=yes&ei=SZLZXM_iJ4-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&dur=5305.039&lmt=1552429951178864&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769833&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=02528AF1A862DD7AF1066AE23E88701E0A94F12FB96248EA7F1AA26553F62925.B2421650AA6601BD67DA55F9EB34F6AE77EFCAC07148AF8B1EAF87B54BF1C19E&key=us0#f360p","default":true}]},{"name":"28 Tuổi Vị Thành Niên (Bản Điện Ảnh)","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/28-tuoi-vi-thanh-nien-ban-dien-anh_10640/xem-phim/"},"nameOrigin":"Suddenly Seventeen","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2F28-tuoi-vi-thanh-nien-ban-dien-anh-suddenly-seventeen-2016.jpg%3Fsize%3D300"},"directors":["Mo Zhang"],"actors":["Hoắc Kiến Hoa","Tưởng Mộng Tiệp"],"genres":["Phim Tâm Lý","Phim Viễn Tưởng"],"countries":["Trung Quốc"],"duration":107,"desc":"Phim 28 Tuổi Vị Thành Niên / Suddenly Seventeen kể về Lương Hạ năm nay 28 tuổi, là quản lý một khách sạn cao cấp. Trong công việc cô phải đối mặt với sự quấy rối của cấp trên và sự hoạnh họe của khách hàng. Vào ngày sinh nhật, cô cãi nhau với bạn trai Mao Lượng. Trong lúc chán nản Lương Hạ đã đề nghị chia tay, nhưng điều bất ngờ là cô và Mao Lượng cùng xuyên không trở về năm 17 tuổi. Cũng từ đó bao chuyện dở khóc dở cười đã xảy ra...","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednld.googlevideo.com/videoplayback?id=d52d8edeeb5b5a29&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=eJ_ZXK6sFZbg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&dur=6320.843&lmt=1551045034608073&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773208&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=B240DE701077A5B5630C0DABEA2EDE938E47654FF4FBC0587337220FB40C18D7.A0B6AC4682187AA0F74C86968EC27479946193BE238D184B2AA7BA4641BD6C16&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nlk.googlevideo.com/videoplayback?id=d52d8edeeb5b5a29&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nlk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=eJ_ZXObPGZbg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6320.843&lmt=1551048782287590&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773208&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=D5B4DE7EEFDD0B249E8A171B4C2E9BF442C4EE03E09106C649ACB37BDFE6E0D4.3A941DB3D24E6100A187DEDEF0C8D49FA7839B82FC811F098C226213429AC5A5&key=us0#f720p","default":true}]},{"name":"Mùa Hạ, Chân Dung Tuổi 19","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mua-ha-chan-dung-tuoi-19_10608/xem-phim/"},"nameOrigin":"Edge of Innocence","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmua-ha-chan-dung-tuoi-19-edge-of-innocence-2016.jpg%3Fsize%3D300"},"directors":["Jung-Chi Chang"],"actors":["Trương Quốc Trụ","Đỗ Thiên Hạo","Hoàng Tử Thao","Lý Mộng","Dương Thái Ngọc"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":95,"desc":"Phim Mùa Hạ, Chân Dung Tuổi 19 / Edge of Innocence: Khang Kiều là một cậu thanh niên 19 tuổi rất yêu thích xe cơ giới, trong một lần phóng xe đi phượt gặp tai nạn bị thương phải vào viện. Trong những ngày nằm viện buồn chán, Khang Kiều dùng kính viễn vọng ngắm nhìn thế giới bên ngoài, liền để mắt đến một cô gái ở đối diện bệnh viện, Hạ Dĩnh Dĩnh. Khang Kiều dần nảy sinh tình cảm với cô gái mà mình không hề biết đến. Nhưng không ngờ vào một đêm mưa, cậu lại phát hiện ra một bí mật động trời của cô gái đó…","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6ns6.googlevideo.com/videoplayback?id=506270379fc72a8b&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns6&ms=nxu&mv=u&pl=25&sc=yes&ei=eJ_ZXPCbMPmY8gP-1IS4Cg&susc=ph&app=fife&mime=video/mp4&dur=6178.435&lmt=1552692545080740&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773208&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=6A193D77E2FF50071ECC9D0B137EF9E25A33F90A4724ECA08FE1C83E75842A0F.187C06BD08D289D3A718E06F5B51099463B9FFDD57D0CD12F37D3021EAD1E3AE&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5ednee.googlevideo.com/videoplayback?id=506270379fc72a8b&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednee&ms=nxu&mv=u&pl=25&sc=yes&ei=eJ_ZXJ_INMvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6178.435&lmt=1552694855304086&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773208&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=13423598235E81AC601C8B6F6C096A5D8C48816145D955CE098E518E50F2B4F8.19B38D4D5DE202B15F569F8E59F45C5CEB7751246D210D5BC8CA536BB96E23CF&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r5---sn-4g5e6ns6.googlevideo.com/videoplayback?id=506270379fc72a8b&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns6&ms=nxu&mv=u&pl=25&sc=yes&ei=eJ_ZXPzBONLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6178.435&lmt=1552694878373839&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773208&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=29CF8BEFE1D216FFBE8EB2C592EEBD8A719CF95BC963809254B46803F29BC0B8.E936A1D2561C3BC5F9C25835C8F6EF4FDB662D318AE3EDD58AACF3CB56A4B9E7&key=us0#f1080p","default":true}]},{"name":"Vịnh Xuân Bạch Hạc Quyền","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/vinh-xuan-bach-hac-quyen_10600/xem-phim/"},"nameOrigin":"The Scroll Of Wing Chun White Crane","year":"2014","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fvinh-xuan-bach-hac-quyen-the-scroll-of-wing-chun-white-crane-2014.jpg%3Fsize%3D300"},"directors":["Lương Gia Nhân"],"actors":["Dịch Dương","Dương Chính","Thẩm Phương Hi"],"genres":["Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Vịnh Xuân Bạch Hạc Quyền / The Scroll Of Wing Chun White Crane Ông nội của Trần Phàm và Trần Tinh vô tình có được bí kíp 108 chiêu Vịnh Xuân Bạch Hạc Quyền, ông quyết định quyên góp cho bảo tàng. Nhưng trên đường đi, bí kíp bị lấy cắp. Hai chị lên đường tìm bí kíp và hé lộ nhiều bí ẩn.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6ns6.googlevideo.com/videoplayback?id=8146d5e12ec835f8&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns6&ms=nxu&mv=u&pl=25&sc=yes&ei=eJ_ZXN3HOMKt8gOsnpT4Bg&susc=ph&app=fife&mime=video/mp4&dur=5583.330&lmt=1552792221251255&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773209&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=ADBA9D1C2ABA62CE73AE0F03A36667317760D90E6A525F288AA80F346242588A.736683DA16F8F550F07C24296413E287C611170BCB163B977604D3EE845D2967&key=us0#f360p","default":true}]},{"name":"Án Mạng Thôn Quê","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/an-mang-thon-que_10599/xem-phim/"},"nameOrigin":"Absurd Accid","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fan-mang-thon-que-absurd-accid-2017.jpg%3Fsize%3D300"},"directors":["Lý Vũ Hòa"],"actors":["Nhậm Tố Tịch","Cao Hiệp","Trần Tỉ Húc"],"genres":["Phim Hài Hước","Phim Hình Sự","Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Án Mạng Thôn Quê / Absurd Accid Ông chủ nhà trọ Dương Bách Vạn vì mắc bệnh liệt dương nên đâm ra đa nghi, cáu gắt. .Thậm chí, nghe lời người khác nói vợ mình ngoại tình mà Bách Vạn đã thuê người, cũng chính là vị trung y đang chữa bệnh cho mình, trừ khử vợ cho hả giận. Và rồi, những vụ án quái đảng cũng xảy ra sau đó.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nzl.googlevideo.com/videoplayback?id=281e11c556c2b2ae&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=eZ_ZXIH0IZmR1wLfn5GgBA&susc=ph&app=fife&mime=video/mp4&dur=11403.412&lmt=1552813274489972&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773209&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=EA7827E8BA764CDA66E2432C79ABD882D05BCD8870AB4C9FAADC1382A984ED3A.2B3D20B2BDECA3D700317A363FE1A5C490B2C401A60F54DBA3B85E12A20178A8&key=us0#f360p","default":true}]},{"name":"Ngôi Chùa Ma","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ngoi-chua-ma_10570/xem-phim/"},"nameOrigin":"A Ghost Story Xiang Yun Temple","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fngoi-chua-ma-a-ghost-story-xiang-yun-temple-2017.jpg%3Fsize%3D300"},"directors":["Lưu Hiên Dịch"],"actors":["Bành Ngu Khư","Hà Hân Tử","Trần Ngọc Dũng"],"genres":["Phim Cổ Trang","Phim Hài Hước","Phim Kinh Dị","Phim Tâm Lý","Phim Thần Thoại"],"countries":["Trung Quốc"],"duration":60,"desc":"phim Ngôi Chùa Ma / A Ghost Story Xiang Yun Temple: Mã Thiên Ý truyền nhân của gia tộc họ Mã chuyên trừ ma, vì tính cách ngỗ ngược mà bị cha đuổi đến Tường Vân Tự. Tại đây, có hàng loạt những câu chuyện dân gian kỳ dị và Thiên Ý cũng trở thành pháp sư trừ ma. Cho đến 1 ngày, có 1 vị khách đến thăm, những bí mật của ngôi chùa này mới dần hé lộ","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nes.googlevideo.com/videoplayback?id=035852dbfb33d00c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nes&ms=nxu&mv=u&pl=25&sc=yes&ei=65LZXM7nNJmV1wL9qaHgDA&susc=ph&app=fife&mime=video/mp4&dur=3959.675&lmt=1552706474589562&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769995&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=4DECF52AE8E2E25CD44D32006AC1D5933ECF8ACC20F2595C7DF4FA0FDDA8EAB9.7E587CD3B96D708A346A23D4C709F85C766E197EBA3EE077237849181CF693C0&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5edne6.googlevideo.com/videoplayback?id=035852dbfb33d00c&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=65LZXMOmO4HA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3959.675&lmt=1552708227675576&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769995&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=076597E3551495D9C904C172E3BF90FED50AB81F34419527C7CC37CA358D7B1F.4FB669CC13802791DDA68394EA55045FAB7E5D60774ECB0C48CB7B68D4F8DF7E&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r2---sn-4g5e6nes.googlevideo.com/videoplayback?id=035852dbfb33d00c&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nes&ms=nxu&mv=u&pl=25&sc=yes&ei=7JLZXM1Mg53yA4DFsagD&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3959.675&lmt=1552708227385586&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557769996&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=522A12E8B08BB0BABE4A9981D9F6AF7A6769DBAE432C099B70FBE22F0C555915.2E100665E0F7BC17A9BAE1174F8FFA96C7E86D91FE1D0EFBA5751696F2B49A46&key=us0#f1080p","default":true}]},{"name":"7 Giây Thần Thánh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/7-giay-than-thanh_10586/xem-phim/"},"nameOrigin":"Seventh Seconds Rescue","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2F7-giay-than-thanh-seventh-seconds-rescue-2017.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["An Hổ","Cù Cúc Huy","Vương Nguy"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":88,"desc":"Phim 7 Giây Thần Thánh / Seventh Seconds Rescue trong 1 lần thực hiện nhiệm vụ, anh chàng cảnh sát với biệt hiệu 2083. Kể từ đó, anh có khả năng chạm vào vật chứng thì có thể nhìn thấy 7 giây trước đó của nó. 1 vụ án nghiêm trọng của thành phố khi nhiều nơi liên tục xảy ra nổ bom, với khả năng kỳ diệu này liệu anh có bắt được thủ phạm.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednll.googlevideo.com/videoplayback?id=93389a49d62560c9&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ei=f5_ZXOPRBdLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&dur=5284.954&lmt=1551314955197318&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773215&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=354CF587B48F77B2BB63BBEC9479231F0580629E43D89078005F00E8796B009F.B40356506D37BF40933E41B9EC78AEFE5231099BC573DA6A21424A3B05D08D26&key=us0#f360p","default":true}]},{"name":"Hoa Cải Vàng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hoa-cai-vang_10594/xem-phim/"},"nameOrigin":"Canola","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhoa-cai-vang-canola-2016.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Kim Go Eun","Kim Hee Won","Youn Yuh Jung","Shin Eun Jung","Minho"],"genres":["Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":117,"desc":"Phim Hoa Cải Vàng / Calona: Bà Gye Choon được biết đến như một huyền thoại lặn biển tại đảo Jeju và cô cháu gái Hye Ji (Kim Go Eun) sống với bà. Cả hai bà cháu sống nương tựa vào nhau và chăm sóc lẫn nhau.Hye Ji là một nữ sinh trung học với một tâm hồn dữ dội và cô có một bí mật trong lòng. Một ngày, Hye Ji đột nhiên mất tích. Bà Gye Choon tìm mọi cách để tìm lại cô cháu gái duy nhất nhưng phải mất đến 12 năm họ mới gặp lại nhau. Bà Gye Choon không muốn tin vào những gì đã xảy ra trong những năm đó và liệu họ có thể quay lại cuộc sống như trước đây hay không là một dấu hỏi lớn.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednee.googlevideo.com/videoplayback?id=87a5fc21f538ebbd&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednee&ms=nxu&mv=u&pl=25&sc=yes&ei=f5_ZXM6YHbGL8gPr66LYBA&susc=ph&app=fife&mime=video/mp4&dur=6810.296&lmt=1552668743836755&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773215&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=58FB488DC127F0C34F143D1F000E60DF571F3CEE9D15FBA207CEE7A31668D881.49BF1BDF3D84A9F30DCC7E71BC0A744A5A1DF727160ED526D7B3374A33574B4F&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nl7.googlevideo.com/videoplayback?id=87a5fc21f538ebbd&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nl7&ms=nxu&mv=u&pl=25&sc=yes&ei=f5_ZXOSuKJmR1wLfn5GgBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6810.296&lmt=1552672070044718&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773215&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=2A131F464DD106EA0DCF385EAE4F7620315E0182123E8DB1CE3AE76ACE06FF1E.766197CC664DC5443F681C5DD8973F4BE166EB49FE85A4B48FD7626FA1859240&key=us0#f720p","default":true}]},{"name":"Thợ Săn Linh Hồn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tho-san-linh-hon_10562/xem-phim/"},"nameOrigin":"The Soul Hunter","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftho-san-linh-hon-the-soul-hunter-2017.jpg%3Fsize%3D300"},"directors":["Thẩm Dục Kiệt"],"actors":["Văn Trác","Lâu Giai Duyệt","Trương Khánh Khánh"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Trung Quốc"],"duration":60,"desc":"Phim Thợ Săn Linh Hồn / The Soul Hunter :Trong giới pháp thuật, anh chàng Tô Dương được biết đến là một “Thợ Săn Linh Hồn” vì sự tinh thông thuật thiên địa hơn người. Sau khi đến kim thành , anh bị cuốn vào hàng loạt chuyện thần bí. Bằng cách vận dụng sở trường kỹ năng âm dương ngũ hành vốn có, liệu anh có đủ sức chống lại thế lực ma quỷ, vạch trần sự thật.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsd.googlevideo.com/videoplayback?id=1950ee6055b258b8&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsd&ms=nxu&mv=u&pl=25&sc=yes&ei=f5_ZXJahOYuP1wKslpqYCA&susc=ph&app=fife&mime=video/mp4&dur=3883.212&lmt=1552334020272517&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=26B172E38001B0C4B6F789E2B3F1B7D9B8286CA486174244A0F20CFF656421CA.C85F59C7EE3965999DC4468871B825FACC93CF915AB8905FA29D52C14E2FD0D5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nz7.googlevideo.com/videoplayback?id=1950ee6055b258b8&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=gJ_ZXMWAA7GL8gPr66LYBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3883.212&lmt=1552335697749044&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1C8BA8FDA11CD5A7693B4E652BAC8427F8AC58901CECFC6DA0B1521452309782.C26CF99A5FD3412A114A5E63065012E8186ABB3C27454ED12BD5081C537C7C93&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5ednsd.googlevideo.com/videoplayback?id=1950ee6055b258b8&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsd&ms=nxu&mv=u&pl=25&sc=yes&ei=gJ_ZXKHUBcnF1gL-mYdw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=3883.212&lmt=1552335797479284&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=AEA0922ADB27AAF71D3CF5208B32B4C894932ECE04C263896C34189C031211A5.3B79085B1C7C8C6C7CCC91F5B45BD4937CE83C0D901D4364C44772A5FC78E677&key=us0#f1080p","default":true}]},{"name":"Tiên Cá Đi Học","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tien-ca-di-hoc_10587/xem-phim/"},"nameOrigin":"She's From Another Planet","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftien-ca-di-hoc-shes-from-another-planet-2016.jpg%3Fsize%3D300"},"directors":["Lâm Vân Tường"],"actors":["Trâu Dương","Văn Trác","Tào Hi Nguyệt"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":100,"desc":"Phim Tiên Cá Đi Học / She's From Another Planet Vì ham chơi mà cô gái Sunny bị trôi dạt lên đất liền , nhưng may mắn được Amy và Tề Tề cứu giúp . Để tìm được đường về nhà Sunny phải theo chân 2 cô bạn mới quen đến trường học tiếp cận cậu nam sinh đang giữ miếng vảy cá – vật giúp cô trở về biển khơi. Từ đây, Sunny vướng vào rắc rối và đối đầu với hiểm nguy rình rập quanh mình.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednll.googlevideo.com/videoplayback?id=98e91e07cf0da940&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ei=gJ_ZXPfIEMby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&dur=6019.912&lmt=1552353604417449&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=447CEDFB51656FCCFE1EEB1B6EEADFD3681047658DD8EE88C66A8CC51577613C.E42D02A34A88EC45ACD37B72376AC1BC36359100A28B5E7D6FACE5898FF9961C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nsy.googlevideo.com/videoplayback?id=98e91e07cf0da940&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsy&ms=nxu&mv=u&pl=25&sc=yes&ei=gJ_ZXNi8Gc-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6019.912&lmt=1552356532462665&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=7151C45BB318E1AAA62A01208B24D421AC468FE217D4901AD241CFA76888982F.64B421535F9E962674DD77E1EA450BCB6E02D6D5DF957F7FB67439E9FB6BF115&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r5---sn-4g5e6nsy.googlevideo.com/videoplayback?id=98e91e07cf0da940&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsy&ms=nxu&mv=u&pl=25&sc=yes&ei=gJ_ZXLv7H5bg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6019.912&lmt=1552356626774122&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773216&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=369B4F341C232E161B37ED33B7039FEAB70A8C08DDF1AEE32FFE69A53A6957F4.3745EA15E58AF397C76234A93ADE46706EBDD3A0C627C7FFA28936E7EEE60702&key=us0#f1080p","default":true}]},{"name":"Thiên Tài Bất Hảo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thien-tai-bat-hao_10475/xem-phim/"},"nameOrigin":"Bad Genius","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthien-tai-bat-hao-bad-genius-2017.jpg%3Fsize%3D300"},"directors":["Nattawut Poonpiriya"],"actors":["Chanon Santinatornkul","Eisaya Hosuwan","Teeradon Supapunpinyo"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Thái Lan"],"duration":130,"desc":"phim Thiên Tài Bất Hảo / Bad Genius kể về Lynn một sinh viên thiên tài,cô nhận được một nhiệm vụ dẫn cô tới Sydney, Australia để hoàn thành bài kiểm tra với giá trị hàng triệu Baht.Lynn và người bạn cùng lớp phải hoàn thành kỳ thi STIC quốc tế (SAT) và trả lời lại cho bạn bè của mình ở Thái Lan trước khi kỳ thi diễn ra một lần nữa ở quê nhà.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsz.googlevideo.com/videoplayback?id=03e376b71cd62df6&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=FZvZXIfyFpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&dur=7793.081&lmt=1555491569308257&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772085&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B8D8AF4091BC8901E3352253EDBB22D7025B093FDBDFDF808056A78BB1C26C0C.24EE366B72E29B0A16099297A13D353BAE0D3CCA8F5D653A02DF33FD5F32A23D&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednsz.googlevideo.com/videoplayback?id=03e376b71cd62df6&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=FZvZXPOHG5bg1wK2oo-ACg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7793.081&lmt=1555498053022665&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772085&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=34DD9B6902C7788551F05EE20FDFCD2B95F3A4A93A7BFD78B324A1ED1CA8AAD0.AF93C824756B18640C91B67F39511B6E7731C2A5CEB3BF3DEF3E381A13392943&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5ednsz.googlevideo.com/videoplayback?id=03e376b71cd62df6&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=FZvZXOu5HsKt8gOsnpT4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7793.081&lmt=1555498115015001&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772085&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=DA0613C306CD136493FA78406ADA3CE256FCF85FFEB5B23BD9F7AD5F795A3B93.1C7283A48E0381C99E526CB9377E21E7B1A15230BE240775D7DBC42E80CAB2E5&key=us0#f1080p","default":true}]},{"name":"Mẹ Ơi! Bố Đâu Rồi?","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/me-oi-bo-dau-roi_10519/xem-phim/"},"nameOrigin":"Making Family","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fme-oi-bo-dau-roi-making-family-2016.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Lý Trị Đình"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":99,"desc":"phim Mẹ Ơi! Bố Đâu Rồi? / Making Family kể về một phụ nữ thành đạt, quyết định sống độc thân và sinh con bằng phương pháp thụ tinh nhân tạo. Khi cậu bé lớn lên luôn có một ước mơ đơn giản là tìm gặp bố ruột.Một ngày, cậu bé bí mật rời Hàn Quốc và thực hiện chuyến đi tìm bố ở Trung Quốc. Tại đây, cậu bé gặp một người đàn ông đẹp trai, thành đạt và chưa bao giờ có hứng thú với việc lập gia đình. Khi người mẹ đến Trung Quốc tìm con, cậu bé đã tìm mọi cách cho hai người trở thành một cặp. Liệu nhiệm vụ của cậu bé có thành công?","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6nsd.googlevideo.com/videoplayback?id=8d1bd9b5d221a3f0&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsd&ms=nxu&mv=u&pl=25&sc=yes&ei=hZ_ZXI2nKZWt8gPf6bXIBg&susc=ph&app=fife&mime=video/mp4&dur=5978.975&lmt=1552388266959700&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773221&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=1A17D95AF25CDC8A2E9CD5CBF396825C22E39AC5F41D01B1774F3D5E14D6F963.093BC9E99F3CDDF015C1A7FAF331907FE627137FFF30E911B6D35624AB360C37&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednse.googlevideo.com/videoplayback?id=8d1bd9b5d221a3f0&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=hZ_ZXKKRMMeA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5978.975&lmt=1552390046004465&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773221&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=932351AD72FD08FD4DD4687A88D87712A0D20C72992CD4ACA649A1F30D437BE6.7B8D71EBA47868C6BFAF23C88CF8E1FD8BE095C10F1947E0931DBBAAB405F0B3&key=us0#f720p","default":true}]},{"name":"Bạn Trai Robot","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ban-trai-robot_10515/xem-phim/"},"nameOrigin":"The Machine Boyfriend","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fban-trai-robot-the-machine-boyfriend-2017.jpg%3Fsize%3D300"},"directors":["Sài Sở Nhiên"],"actors":["Hàn Chí Thạc","Thái Điệp","Triệu Uy Lâm"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Hồng Kong"],"duration":83,"desc":"phim Bạn Trai Robot / The Machine Boyfriend trong lúc tự tử vì tình, bỗng 1 anh chàng rô-bốt trần như nhộng từ đâu rơi xuống cứu cô nàng Tân Tư Á thoát chết. Vì xuyên không gặp trục trặc nên anh ta tạm sống chung vpows cô kèm điều kiện phải thực hiện nhưng yêu cầu cô đưa ra. 2 người nảy sinh tình cảm đồng thời anh chàng rô-bốt ấy biết được vì sao mình đặt chân đến đây.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednz7.googlevideo.com/videoplayback?id=35128d609b4aa9f9&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=hZ_ZXPv2LYKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&dur=5017.785&lmt=1551315568976450&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773221&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=CCBF65A317B90027A5A0D75AFB37B834E453E82188FC4C6DF98C2251455CEC37.B12A5E09DC5721711982FDE60027F3B488DF328E465ABDF7741383946B7725&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6n76.googlevideo.com/videoplayback?id=35128d609b4aa9f9&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=hZ_ZXMygNYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5017.785&lmt=1551317789064677&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773221&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=A1DB21B6AC0CBB977C0F6BCE763DE21835FCA6C4FC00C77D189B8AFCCD5EB536.1D0772FD159EA2FC2057B0577513E0B88ED6D34DC2FE46A3012BF509726894BF&key=us0#f720p","default":true}]},{"name":"Thor: Tận Thế Ragnarok","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thor-tan-the-ragnarok_10446/xem-phim/"},"nameOrigin":"Thor: Ragnarok","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthor-tan-the-ragnarok-thor-ragnarok-2017.jpg%3Fsize%3D300"},"directors":["Taiki Waititi"],"actors":["Chris Hemsworth","Mark Ruffalo","Idris Elba","Tom Hiddleston","Cate Blanchett","Anthony Hopkins","Karl Urban","Tessa Thompson","Jeff Goldblum"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":150,"desc":"Phim Thor: Tận Thế Ragnarok / Thor: Ragnarok Ở bên kia vũ trụ, Thor phải bước vào một cuộc chiến đầy khốc liệt với đối thủ mà anh sẽ gặp là một đồng đội cũ đến từ biệt đội Avenger – Hulk. Cuộc tìm kiếm sự sống còn của Thor khiến anh phải chạy đua với thời gian để ngăn chặn Hela tiêu diệt cả thế giới anh đang sống cùng nền văn minh Asgard.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nss.googlevideo.com/videoplayback?id=b689a62bf09a61b6&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nss&ms=nxu&mv=u&pl=25&sc=yes&ei=J5fZXOyuHcvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&dur=7237.102&lmt=1552659505061028&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771079&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=059651BD8E2004EA2686FDE97E559895A52EBB6CC1CEA5A704EF8AE874F0BC99.443D341C3522BC39A6C6258CC581C5AA40F9ECEE20D7725877F84D429972FDE5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5edn7z.googlevideo.com/videoplayback?id=b689a62bf09a61b6&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7z&ms=nxu&mv=u&pl=25&sc=yes&ei=J5fZXI3hIs2j8gOgkJagBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7237.102&lmt=1552663314172293&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771079&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8C451781C761081FB1145D22FEDD0D3E5B1D4F729ED51157BD4F6120713D0843.B3AB1C22C8F4F3F6A92FD9CE2D3487D5FB9B1CE38EBFA406F1DD0FE18C593431&key=us0#f720p","default":true}]},{"name":"Tam Giới Kỳ Hiệp Truyện","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tam-gioi-ky-hiep-truyen_10443/xem-phim/"},"nameOrigin":"San Jie Qi Xia Zhuan","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftam-gioi-ky-hiep-truyen-san-jie-qi-xia-zhuan-2017.jpg%3Fsize%3D300"},"directors":["Tiêu Dương"],"actors":["Lưu Dương","Bành Ngu Khư","Chu Giai Hi"],"genres":["Phim Cổ Trang","Phim Thần Thoại","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":72,"desc":"Phim Tam Giới Kỳ Hiệp Truyện kể về Giang vạn An, Lăng Duyệt và Đại Tráng bất ngờ xuyên không vào trò chơi “Thần Võ 2” qua viên đá Huyền Cơ. Bước vào thế giới mới, họ được xem như các “Hiệp Khách Tam Giới” với sứ mệnh đánh bại tộc Cửu Lê, ổn định trật tự Tam Giới. Đồng thời, phải tiềm được bảo vật thượng cổ thì mới có thể quay về.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednsy.googlevideo.com/videoplayback?id=adaceb27f4ec8818&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXOTTHJG01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&dur=4362.704&lmt=1552684581315544&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=105A2002DC3B86EF746DAC46C89CECAF12EA489257B2FC15EA1F9B390DE74DF2.E3F38D02AF9DFA68173DAA3FAC3C317498524903CF3E24BC14636AF5605FE402&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednsy.googlevideo.com/videoplayback?id=adaceb27f4ec8818&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXISXJM-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4362.704&lmt=1552688492438396&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1E88BED5B003F6BC6DDBD51B4E33A7D2EC9B5747421055E4042D4258AD5992A4.C6D7488DA4C0FCE981A6016EA41DD8E04D50F6D45210FDD9D3613F27BA622C6C&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5ednsy.googlevideo.com/videoplayback?id=adaceb27f4ec8818&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXKTCKpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4362.704&lmt=1552688566705046&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=B7A1F8313594089DDC82F0694794DB3DEA9D7DD91A66A2349BE629960D7C4B45.835AF1D0B1F497A22AC9C7458408EB3CDCFD14CDA94B829D71616AA74B12C3A8&key=us0#f1080p","default":true}]},{"name":"Bố Tướng Con Binh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bo-tuong-con-binh_10439/xem-phim/"},"nameOrigin":"Father and Son","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbo-tuong-con-binh-father-and-son-2017.jpg%3Fsize%3D300"},"directors":["Viên Vệ Đông"],"actors":["Nhậm Đạt Hoa","Đại Bằng","Kiều Sam","Phạm Vĩ"],"genres":["Phim Hài Hước"],"countries":["Trung Quốc"],"duration":105,"desc":"Phim Bố Tướng Con Binh / Father and Son luôn mong muốn lập nghiệp để đổi đời, Tiểu Binh chẳng những không thành công mà còn nợ nần khắp nói, là 1 kẻ thất bại điển hình. Khi bị anh Ok – ông chủ cho vay nặng lãi xiết nợ, Tiểu Binh bất đắc dĩ bày ra 1 kế để kiếm tiền., đó là làm tang lễ giả cho bố mình- người luôn là cái bóng ” anh hùng” anh ko thể vượt qua.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednek.googlevideo.com/videoplayback?id=8e4dad2322b858cb&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednek&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXN_WJoHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&dur=6345.502&lmt=1552411627634216&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=A03DBC7129A1F2BBBB3B49FCF4AC13A57B6733FC5C3B3632BB6D6DDE28C51ABD.2B23886856D8E514CF00E046462471168C39C99CB7D00C753D884C53C1BD789F&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nze.googlevideo.com/videoplayback?id=8e4dad2322b858cb&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXPWRKfmY8gP-1IS4Cg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6345.502&lmt=1552928845394525&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=B48FAA0569200C2E27BD17ABB99B3E1A1CCB499C891579E11C8112E4050F90D5.EC3CD68FAF69CB2FD238E4DDD5F79B714B794E7A0AEFD67B45EE6C2830C42D89&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r2---sn-4g5ednek.googlevideo.com/videoplayback?id=8e4dad2322b858cb&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednek&ms=nxu&mv=u&pl=25&sc=yes&ei=jZ_ZXJmbNcSD8gPjka6oAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6345.502&lmt=1552928956934492&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=D868A0B9535D1952CD16A46B5B4A93B06DDA01A9C59A7F95BEA500A3B7629C10.56E04FD8684940463C6647B517669BD2BDFDA47C1E259574B23908B475DB9058&key=us0#f1080p","default":true}]},{"name":"Vết Bớt Tai Ương","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/vet-bot-tai-uong_10440/xem-phim/"},"nameOrigin":"Disc Fairy","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fvet-bot-tai-uong-disc-fairy-2017.jpg%3Fsize%3D300"},"directors":["Cao Dục Tân"],"actors":["Minh Tuấn Thần","Quách Nhược Hàn","Y Na"],"genres":["Phim Hài Hước","Phim Kinh Dị"],"countries":["Trung Quốc"],"duration":87,"desc":"Phim Vết Bớt Tai Ương / Disc Fairy Một nhóm sinh viên thời dân quốc đến căn cổ của cậu bạn Phó Khải ở trên núi chơi. Vào ở ko lâu nhóm bạn phát hiện ngôi nhà cổ có nhiều bí mật ghê rợn. Họ quyết định chơi Điệp Tiên để giải đáp những tò mò của mình. Nhưng rồi tai họa ập đến khi từng người bị giết chết 1 cách bí ản.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6n76.googlevideo.com/videoplayback?id=4339d09f00beee5c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=jZ_ZXMC1J4mu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&dur=5235.078&lmt=1551325137438054&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=4D46A2500F0BD156D366253A057CE231B78F0179E75D19F193A780427A40699D.4D605E5C1BE6EA8FE05F670BB6ED855A367F2130B36E7F3289530632FF880805&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6n76.googlevideo.com/videoplayback?id=4339d09f00beee5c&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=jZ_ZXIWEMImu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5235.078&lmt=1551522315762991&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=4634D7142FEDDDAC56538F9BD6982B3438E057504BBA3E45B9B9681B9CF31752.3E69D6654748465C217C4A9F0ED311A3D34F94E4903AD5B68A53571FA47E9149&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r2---sn-4g5e6n76.googlevideo.com/videoplayback?id=4339d09f00beee5c&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=jZ_ZXK_8N4-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5235.078&lmt=1551522270696956&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773229&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=634C3E8B9A1CF9B751EB5EAF048D6DBED934669AFA9E5A6F17C4C4B293001975.DC9593C43C5EF4D5DF1C9F84B619D0AAEF663319FFB6381BA21052FAEF60556A&key=us0#f1080p","default":true}]},{"name":"Chân Ái Vô Song","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chan-ai-vo-song_10414/xem-phim/"},"nameOrigin":"Almost Perfect Love Actually","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchan-ai-vo-song-almost-perfect-love-actually-2017.jpg%3Fsize%3D300"},"directors":["Cao Phi"],"actors":["Đường Vũ Triết","Trương Ngữ Cách","Thanh Ngọc Văn"],"genres":["Phim Cổ Trang","Phim Hài Hước","Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":102,"desc":"Phim Chân Ái Vô Song Bộ / Almost Perfect Love Actually  kể về Phi Yên bỏ mặc chức tước quan chỉ huy 3000 ngự lâm quân, 1 lòng theo đại sư hàng ma Đế Thích Thiên học đạo với mong muốn diệt trừ yêu ma bảo vệ bách tính. Oái oăm thay chàng học mãi mà ko bắt được con yêu quái nào cho đến khi gặp được mỹ nữ Nhiếp Thanh Trần , một đặc vệ bí mật với pháp lực cao cường.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nsk.googlevideo.com/videoplayback?id=cf428a126a1e1942&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=jp_ZXOQaia7XAtuaqpgM&susc=ph&app=fife&mime=video/mp4&dur=6120.571&lmt=1552337208304873&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773230&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=5636E83D1E4A6CADB5071994AA4F35348EE6AE242A18F0C3E900EF723592B068.D8732EC0C25AABDEA3D197F363278D4C9945A6A6450F0B51F59373554216EA8B&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edns6.googlevideo.com/videoplayback?id=cf428a126a1e1942&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=jp_ZXIS3CK2S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6120.571&lmt=1552340365285265&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773230&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1AEB299771921BAD8C755AA96EB49DD3B953F30AC89571EB2EC9E222BD5F8C1C.2C288AB2C5855A7A61869C0C5758B924054312B5126A55107BBD5CCCAB4F27E6&key=us0#f720p","default":true}]},{"name":"Ông Hoàng Tốc Độ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ong-hoang-toc-do_10372/xem-phim/"},"nameOrigin":"The King of the Drift","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fong-hoang-toc-do-the-king-of-the-drift-2017.jpg%3Fsize%3D300"},"directors":["Viên Thước"],"actors":["An Hổ","Mộc Lam","Trương Giác"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":92,"desc":"Phim Ông Hoàng Tốc Độ / The King of the Drift kể về Anh chàng lái taxi Tần Hạo trong 1 lần phô diễn kỹ thuật lái xe cực đỉnh mà được đổi CDF thu nhận. Trước cuộc thi đua xe sắp diễn ra cộng thêm lời thách đấu của đối thủ – đội xe TNT- các thành viên trong đội xe CDF đã ra sức bồi dưỡng kỹ thuật drift xe thần thánh cho Tần Hạo nhưng lại gặp phải sự ngăn cản của bố anh.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nez.googlevideo.com/videoplayback?id=f05e7066bc44a32c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nez&ms=nxu&mv=u&pl=25&sc=yes&ei=kp_ZXKqDDNPI8gOtnJDoCg&susc=ph&app=fife&mime=video/mp4&dur=5539.050&lmt=1551203135292039&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773234&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=4EC44CB563E88EDCF24246F520498ED87241CF096ED6A1A1AD3E8277F6C64CFA.6D665E8E907D47E377F03CDA3210145A2A034451092EF7A5D9C5AA294E1B505B&key=us0#f360p","default":true}]},{"name":"Sát Phá Lang 3: Tham Lang","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sat-pha-lang-3-tham-lang_10371/xem-phim/"},"nameOrigin":"SPL III: Paradox","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsat-pha-lang-3-tham-lang-spl-iii-paradox-2017.jpg%3Fsize%3D300"},"directors":["Diệp Vỹ"],"actors":["Cổ Thiên Lạc","Tony jaa","Ngô Việt","Đặng Lệ Hân"],"genres":["Phim Hành Động","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":101,"desc":"Phim Sát Phá Lang 3: Tham Lang / Paradox ra mắt tại Trung Quốc vào giữa tháng 8 vừa qua. Nội dung phim xoay quanh câu chuyện truy tìm và trả thù kẻ bắt cóc con của Lee (Cổ Thiên Lạc). Trong quá trình sang Thái Lan tìm kiếm con gái mình, Lee còn phát hiện ra bí mật liên quan đến ứng cử viên thị trưởng của Bangkok.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednll.googlevideo.com/videoplayback?id=982ef3d975f055df&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ei=LpfZXLaRLJWt8gPf6bXIBg&susc=ph&app=fife&mime=video/mp4&dur=6028.875&lmt=1552205802901835&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771086&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=28A1CDC39B6F3AB8C7392EA1013D1B9D92DA6327863AAF114D129AFD2A98D2E1.90328C872589ACD75F093B6EE809A28BDCFBE8888A721521453B533FA11EE9FC&key=us0#f360p","default":true}]},{"name":"Thích Khách Phong Lưu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thich-khach-phong-luu_10360/xem-phim/"},"nameOrigin":"Romantic Assassin","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthich-khach-phong-luu-romantic-assassin-2017.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Trần Hổ","Vương Tiểu Nghị","Chu Giai Hi"],"genres":["Phim Cổ Trang","Phim Hài Hước","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":68,"desc":"Phim Thích Khách Phong Lưu / Romantic Assassin sát thủ Lâm Hổ nhận lệnh truy sát Châu Nhị. Trên đường đi tìm mục tiêu của mình, anh nhìn thấy người đẹp Thẩm Dung bị Vương phủ truy đuổi nên liền ra tay giúp dỡ. Trớ trêu thay, vì nhầm lẫn mà cô lại nghĩ Châu Nhị là ân nhân cứu mạng. Cứ như thế nhiều tình huống dở khóc dở cười xảy ra cuốn họ vào nhiều rắc rối.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nzz.googlevideo.com/videoplayback?id=8171530cd55f3967&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=kp_ZXK3FLpmR1wLfn5GgBA&susc=ph&app=fife&mime=video/mp4&dur=4125.071&lmt=1551248207654566&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773234&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=DA5FC5F6E9221BFC0F7B07AC374C11D95B73EA230073AC122EDC697B9D134184.06419BB3D9CF6C549D63BC5A4932C3EDFD67DF1FD60ACC9F3AB62082597563E1&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nzz.googlevideo.com/videoplayback?id=8171530cd55f3967&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=kp_ZXOCxM9LM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4125.071&lmt=1552227997483069&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773234&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=26265871F6AF4A118284FC5B573FBFD60DACD04298BE0EB24E0FACB4A55E822E.1163CECFB07CD1D73184D0791F88A16B34A3E5C4E6DECABA6D32F64823ECEA0D&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r1---sn-4g5e6nzz.googlevideo.com/videoplayback?id=8171530cd55f3967&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=kp_ZXOHTN5rj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4125.071&lmt=1552228072081270&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773234&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=C19981E2325C56FD175216937B686E8B83F9655259343463672AF26043275681.DB678BED53FD587477CCA1566182FBBB597A95B1F56A590877E841D0AF4EA661&key=us0#f1080p","default":true}]},{"name":"Cô Cảnh Sát Bướng Bỉnh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/co-canh-sat-buong-binh_10347/xem-phim/"},"nameOrigin":"Bad Cop 2","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-canh-sat-buong-binh-bad-cop-2-2016.jpg%3Fsize%3D300"},"directors":["Giang Khải"],"actors":["Lý Manh Manh","Trâu Dương","Văn Trác"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":80,"desc":"Phim Cô Cảnh Sát Bướng Bỉnh / Bad Cop 2: nữ cảnh sát trẻ tài năng nhưng ương ngạnh Dương Dương được giao nhiệm vụ đóng giả nữ sinh cấp 3 để điều tra sự mất tích của 2 học sinh tại ngôi trường này đồng thời bảo vệ thấy giáo Ngô Tà nhân chứng trong 1 vụ kiện.","embeds":[{"resolution":360,"embedUrl":"https://hls.hydrax.net/7UAqLip3Rbj2SAnjOyLYVzRtViIPD3nY7SexLqOtLUIqLm/0/playlist.m3u8#f720","default":true}]},{"name":"Tình Yêu Không Khoảng Cách","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tinh-yeu-khong-khoang-cach_10392/xem-phim/"},"nameOrigin":"Love Without Distance","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftinh-yeu-khong-khoang-cach-love-without-distance-2015.jpg%3Fsize%3D300"},"directors":["Lâm Ái Hoa"],"actors":["Mã Thiên Vũ","Lý Thạnh","Diêu Tinh Đồng","Ngô Trấn Vũ","Châu Vi Đồng"],"genres":["Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":103,"desc":"Tình Yêu Không Khoảng Cách /Love Without Distance kể về Thổ hào Trần (Ngô Trấn Vũ đóng) là thương nhân đã trải qua quá trình phấn đấu lận đận và đã thành công, lúc anh ấy quyết định kết hôn với bạn gái là Triệu Tiểu Vy (Diêu Tinh Đồng đóng), được bác sĩ cho biết anh ấy bị mắc bệnh nan y, anh ấy đã giấu Tiểu Vy về căn bệnh của mình và bắt đầu lo nghĩ cho cuộc đời của mình.Thổ hào Trần vì để hoàn thành di nguyên trước lúc lâm chung của mình, đã đến Ý một mình. Anh ấy cảm thấy bản thân nhất định phải làm một chuyện chấn động thế giới trước khi chết, nhất định phải để xí nghiệp của mình vang danh, nhưng hoàn cảnh văn hóa khác nhau là gây ra hàng loạt hiểu nhầm và truyện cười ra nước mắt khi thổ hào Trần ở nước ngoài... Tiểu Vy lúc đó đã điều tra ra sự thật, đến Ý tìm thổ hào Trần để nói với anh biết, bệnh nan y của anh ấy chỉ là chẩn đoán nhầm! Thời gian đó đã làm thay đổi lớn cuộc đời của thổ hào Trần: Công ty sắp phá sản, bạn bè bày mưu hãm hại. Thổ hào Trần như sống lại trong cuộc sống đầy biến động, cuối cùng có được một tình yêu tốt đẹp và tình bạn của chân thành của những người bạn thân.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5edns6.googlevideo.com/videoplayback?id=95b68ec6613133e8&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=k5_ZXN2fJcqc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&dur=6133.945&lmt=1551371847421493&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773235&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=16C7330A63CAB8F79C6BE9050E1C57403E42C2C3C90D4754B3926D0116D39C61.2D7A6EEEBD6D7F18C73650FF2AD3AE8EC8878278CBBC377894CB32968964315E&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edns6.googlevideo.com/videoplayback?id=95b68ec6613133e8&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=k5_ZXO7cJ7GL8gPr66LYBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6133.945&lmt=1552065072889224&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773235&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E0ED55C374D4C68326A8C4D2933DDFCEA7434B4670CC7B72526E3F09E86188A7.AE1DF91DCB1AEA3B09E81374E9AEFCAE03CBFD53EF219ACD574FA2DE6E289EB5&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5e6nzz.googlevideo.com/videoplayback?id=95b68ec6613133e8&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ei=k5_ZXKmIMcKt8gOsnpT4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6133.945&lmt=1552064978935319&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773235&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=31356D338397B2BA9F5F406B099EC524984636D9E3359E9C62452020B9988446.25CB5D53371F2E9CD57EBD225FDE5EF512138A573B4CA66B78C6B4911AC79F99&key=us0#f1080p","default":true}]},{"name":"Hàng Long Đại Sư","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hang-long-dai-su_10293/xem-phim/"},"nameOrigin":"Thợ Săn Rồng / Dragon Hunter","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhang-long-dai-su-tho-san-rong-dragon-hunter-2017.jpg%3Fsize%3D300"},"directors":["Hạng Thu Lương"],"actors":["Châu Tử Long","Hà Văn Huy","Nhạc Đông Phong"],"genres":["Phim Cổ Trang","Phim Thần Thoại","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":85,"desc":"Phim Hàng Long Đại Sư / Thợ Săn Rồng / Dragon Hunter thuật lại câu truyện yêu quái đột ngột kéo đến đe dọa chúng sinh, hòa thượng Lý Tu Duyên được giao trọng trách đi tìm Lạc Sắc đại sư để giúp đỡ. Trên đường đi anh gặp hồ ly Tiểu Cứu và từ đó anh biết thân phận thật của mình là Hàng Long La Hán chuyển thế.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nsy.googlevideo.com/videoplayback?id=5cd267ea971957c2&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsy&ms=nxu&mv=u&pl=25&sc=yes&ei=NZfZXKzkFZiJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&dur=5143.010&lmt=1552701150687747&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771093&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=75A32BB846EA0CFAF39CDCA8AA01B2E639276C3F3570B87A791FBEC99E943B7B.EA7CED0924AB588E3702122370E652BC63A3463153EAC6B0BBF57F0E484AFDF5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nsy.googlevideo.com/videoplayback?id=5cd267ea971957c2&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsy&ms=nxu&mv=u&pl=25&sc=yes&ei=NZfZXOb_Hc6k8gOH6qlg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5143.010&lmt=1552703111171802&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771093&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3D8310FBE44D14EBF5932FBC3F75ED76AF54DF01DAE2A18072508E36C4F4F716.4ACBCE5E18756750715D26F6B23A3426FD2E2D893679A878DCB1B6F74A607C28&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r1---sn-4g5e6nsy.googlevideo.com/videoplayback?id=5cd267ea971957c2&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsy&ms=nxu&mv=u&pl=25&sc=yes&ei=NZfZXOK_IIuv1wLzkojIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5143.010&lmt=1552703309606161&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771093&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1C4AABB229F3596698A68144C12AC88428BBF45299F7E7F57D4F19E73349D350.0229CB67B02382FC360BBBF13907204AFAD87CAC38CAFE008237D1A801D978D3&key=us0#f1080p","default":true}]},{"name":"Nghịch Lộ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nghich-lo_10294/xem-phim/"},"nameOrigin":"Wrong Way Driving","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnghich-lo-wrong-way-driving-2017.jpg%3Fsize%3D300"},"directors":["Diêm Học Khai"],"actors":["Hỏa Tịnh Nam","Phan Gia Tuấn","Vương Uy"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Hình Sự","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":96,"desc":"Phim Nghịch Lộ / Wrong Way Driving: Con gái của triệu phú Trương Chí Quốc bị bắt cóc đồi tiền chuộc, nhưng nhà tài phiệt lại không giám báo cảnh sát. Tuy nhiên, phía cảnh sát vẫn phát hiện được và lên kế hoạch kỹ càng, âm thầm giải cứu cô gái. Quá trình truy lùng bọn bắt cóc gặp phải nhiều khó khăn khi đối phương quá thông minh và xảo nguyệt.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nz7.googlevideo.com/videoplayback?id=e68993330b644ab7&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=oJzZXOSKHs-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&dur=5798.487&lmt=1552651089094702&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772480&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=52305EF95EE00F1CD7EB8D3E0185C5347DFECCBA423546782CA4584F0458CA93.36F538343D37962E71558C4C314A44F21EDDD36ADF1761CD0726F62180DE79F2&key=us0#f360p","default":true}]},{"name":"Bí Quả (Bản Điện Ảnh)","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bi-qua-ban-dien-anh_10310/xem-phim/"},"nameOrigin":"Secret Fruit","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbi-qua-ban-dien-anh-secret-fruit-2017.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Âu Dương Na Na","Trần Phi Vũ","Âu Thành Hàng","Trâu Nguyên Thanh"],"genres":["Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":99,"desc":"Phim Bí Quả ( Bản Điện Ảnh) / Secret Fruit tiếp tục trở lại màn ảnh Hoa Ngữ qua bản điện ảnh. Lần này, hai nhân vật chính Đoàn Bách Văn và Vu Trì Tử do Âu Dương Na Na cùng nam diễn viên Trần Phi Vũ thủ vai. Phim xoay quanh chàng trai 17 tuổi Đoàn Bách Văn. Cậu mồ côi mẹ từ nhỏ và thường xuyên bị bà mẹ kế bạo hành. Đoàn Bách Văn có một bí mật không thể chia sẻ cho ai.Đó là cậu đem lòng yêu đơn phương cô giáo Lý Nhị – người mà theo cậu, vừa trẻ, vừa xinh lại tốt bụng. Thế nhưng, Bách Văn không hề biết rằng, cô bạn Vu Trì Tử cũng có tình cảm với cậu – và đó là bí mật của cô ấy.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edn7l.googlevideo.com/videoplayback?id=83c2f3e119b300ab&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7l&ms=nxu&mv=u&pl=25&sc=yes&ei=l5_ZXNigMZvJ8gP8mKfYBw&susc=ph&app=fife&mime=video/mp4&dur=5946.003&lmt=1552504298553714&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773239&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=1008F1F6F1F952D9D3E6B6FB1AB16D4E9049DE84EDE52ADE131F850E60483212.8B4CD0D9424CD53263483F201980C6230C39D3CF04461445F7059AD282DD390C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edn7l.googlevideo.com/videoplayback?id=83c2f3e119b300ab&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7l&ms=nxu&mv=u&pl=25&sc=yes&ei=l5_ZXJu6N9CJ1wLo47_YAw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5946.003&lmt=1552508757625949&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773239&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3F771EF5F024905BC7D1C84141288F43EB3905A09A211D658DA0F711605940E2.1BFD1F03D5133D78315AE8DA7FC14F60B15E7FDF17AD7B4D670726D9E6219368&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r1---sn-4g5edn7l.googlevideo.com/videoplayback?id=83c2f3e119b300ab&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7l&ms=nxu&mv=u&pl=25&sc=yes&ei=l5_ZXJ_sOayj8gODuIrIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5946.003&lmt=1552508521698753&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773239&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1E1EB914D84D2416F8617D0F4BB90AE7BCDAFA38A42947BD499F09CED7D7DDEB.0EEECF9EF3A81D173289786B141C6D6A64D0CBEA6087439638580A489FEFFD07&key=us0#f1080p","default":true}]},{"name":"Vương Gia Bá Đạo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/vuong-gia-ba-dao_10332/xem-phim/"},"nameOrigin":"The Super Royal Highness","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fvuong-gia-ba-dao-the-super-royal-highness-2017.jpg%3Fsize%3D300"},"directors":["Vương Bình Nguyên"],"actors":["Dịch Bách Thần","Thượng Tư Kỳ","Vinh Khuê"],"genres":["Phim Cổ Trang","Phim Hài Hước","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":95,"desc":"Phim Vương Gia Bá Đạo / The Super Royal Highness kể về trong một lần được mỹ nhân cứu mạng, Ninh vương liền đem lòng yêu nàng say đắm. Thế nhưng, tiểu mỹ nhân lại vô cùng sợ con người, liên tục né tránh sự theo đuổi của vương gia. Sau khi biết được thân phận của người trong mộng, chàng trốn khỏi hoàng cung, bất chấp nguy hiểm cải trang thành yêu quái đến yêu giới tìm nàng.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edns6.googlevideo.com/videoplayback?id=1b83af60dccf91da&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=mJ_ZXISRDpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&dur=5713.571&lmt=1552343548972013&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773240&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=74D687AF7DE4221B59058F2F835A90B097406FE12CC02B29B01C8082A0E01EFA.11642ECD39B049B1C84AB652D1314A12EC3739E120FDEB346D035362F7B650F8&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edns6.googlevideo.com/videoplayback?id=1b83af60dccf91da&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=mJ_ZXOfcENLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5713.571&lmt=1552351544053589&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773240&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=99343316E5811BEECB1F13E68ABF060099A46699F986871ACED5483F59A70762.4F484B7394278B2ED613B8DC5C372DB3728DF419A4583D707EA7A5CEBDF81AAA&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r1---sn-4g5e6ne6.googlevideo.com/videoplayback?id=1b83af60dccf91da&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=mJ_ZXOT-EoHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5713.571&lmt=1552351613017736&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773240&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=76E3D4200E83F6D740541DAE35233006A594EDC48CDC91C16A9E5B00F9548490.C82E7DD0402F772BA226F824E2B7846067247E08FCF9689891B8CE72D576C6B3&key=us0#f1080p","default":true}]},{"name":"Sát Nhân Gunther","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sat-nhan-gunther_10268/xem-phim/"},"nameOrigin":"Killing Gunther","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsat-nhan-gunther-killing-gunther-2017.jpg%3Fsize%3D300"},"directors":["Taran Killam"],"actors":["Arnold Schwarzenegger","Allison Tolman","Bobby Moynihan","Cobie Smulders","Hannah Simone","Taran Killam"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":92,"desc":"Phim Sát Nhân Gunther / Killing Gunther kể về một nhóm sát nhân lập dị đang chán ngấy với Gunther, kẻ sát nhân vĩ đại nhất thế giới, và quyết định giết ông, nhưng kế hoạch của họ đã biến thành một loạt các cuộc đụng độ vớ vẩn bởi Gunther dường như luôn đi trước một bước.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/b9a0dc6e86f9cfb77104ab4527ab73bf/b9a0dc6e86f9cfb77104ab4527ab73bf.playlist.m3u8","default":true}]},{"name":"Trộm Đồ Của Kẻ Cắp","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/trom-do-cua-ke-cap_10212/xem-phim/"},"nameOrigin":"To Steal from a Thief","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftrom-do-cua-ke-cap-to-steal-from-a-thief-2016.jpg%3Fsize%3D300"},"directors":["Daniel Calparsoro"],"actors":["Luis Tosar","Raúl Arévalo","Rodrigo De la Serna"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":96,"desc":"Phim Trộm Của Kẻ Cắp bắt đầu từ một băng cướp được cầm đầu bởi một người đàn ông tên là El Uruguayo đã lén một ngân hàng ở Valencia để ăn cắp nhiều hộp an toàn nhất có thể và sau đó chạy trốn qua một đường hầm đào để kết nối tòa nhà với một ga tàu điện ngầm bị bỏ rơi.Tuy nhiên, nhân viên báo chí của Thủ tướng Chính phủ phát hiện ra những việc mà bọn trộm thực sự đã làm sau đó: họ muốn đưa tay vào hộp 314, tài sản của Gonzalo Soriano, cựu thành viên của chính phủ đã rơi vào tình trạng hôn mê sau tai nạn nghiêm trọng. Với thông tin thỏa hiệp. Kế hoạch hành động của băng cướp bắt đầu trở nên mất kiểm soát khi mà mưa to bất chợt đã khiến cho đường hầm bị ngập, nó khiến cho những thành viên trong băng không thể thoát ra ngoài, và phát hiện ra rằng chiếc hộp thực sự không có chứa tài liệu, nhưng có một ổ cứng gắn ngoài chứa dữ liệu về những cái tên quan trọng ở tất cả các cấp trong chính phủ của Tây Ban Nha. Đồng thời, một người cố vấn của chính phủ nhận nhiệm vụ đảm nhận việc kiểm soát các cuộc đàm phán, tìm kiếm để thu hồi chiếc hộp 314 cũng như những thông tin mật bằng bất cứ giá nào trước khi bọn cướp chạy trốn.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nsz.googlevideo.com/videoplayback?id=b3482b17ad815a32&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=n5_ZXMaVINCJ1wLo47_YAw&susc=ph&app=fife&mime=video/mp4&dur=5820.058&lmt=1551381168259725&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773247&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=666D6FC6C69532850EFCB7BD54629396AE8B29DF4C44B73D6F895D6AB2C1688F.11C57B0E68BE8C374FEB3986ECB8EAC08FA0EB155244A334B9AC70A8E9B0DC1A&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nsz.googlevideo.com/videoplayback?id=b3482b17ad815a32&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=n5_ZXLu4Isqc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5820.058&lmt=1551384672835650&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773247&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5E1450D1BFC07DFEE911DB9844B60E1D1B8CC1B5AA3134B216175888D1BB18CB.93D84CE3019343C9CE90CB23F5461A6CB66B1D98548E65F49B9EB953C3EE14A5&key=us0#f720p","default":true}]},{"name":"Hội Pháp Sư (Phần 2): Nước Mắt Rồng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/hoi-phap-su-phan-2-nuoc-mat-rong_10184/xem-phim/"},"nameOrigin":"Fairy Tail Movie 2: Dragon Cry","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhoi-phap-su-phan-2-nuoc-mat-rong-fairy-tail-movie-2-dragon-cry-2016.jpg%3Fsize%3D300"},"directors":["Tatsuma Minamikawa"],"actors":["Aya Hirano","Mai Nakahara","Yûichi Nakamura","Wataru Hatano","Yui Horie"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Hoạt Hình"],"countries":["Nhật Bản"],"duration":85,"desc":"Phim Hội Pháp Sư (Phần 2): Nước Mắt Rồng( Fairy Tail Movie 2: Dragon Cry ) 2017​ sau khi hội nghị lần thứ 25 năm nay của Weekly Shounen Magazine của Kodansha thông báo rằng một bộ phim hoạt hình thứ hai của Hiro MashimaFairy Tail manga đã được bật đèn xanh.Tạp chí này được ra mắt nghệ thuật imageboard rằng Mashima mình vẽ cho bộ phim. Vấn đề sắp tới cũng được xuất bản hai chương của manga","embeds":[{"resolution":360,"embedUrl":"https://redirector.googlevideo.com/videoplayback?id=17d851c499619577&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-i3b7kn7k&ms=nxu&mv=u&pl=48&sc=yes&ei=QJfZXK_yEInx4QLA87TACQ&susc=ph&app=fife&mime=video/mp4&dur=5101.307&lmt=1557253127226964&mt=1557763685&ipbits=0&keepalive=yes&ratebypass=yes&ip=2400:6540:0:ffff:0:25ff:fe0e:d07d&expire=1557771104&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=D9339F7989F40E916DD186BE0F67FD59B55E0248163128DFEEF4120D529E8AF5.189C1E4A84E4E76FC861AE00D15562747B245CAD79DC843501DF943138BAB997&key=us0","default":true},{"resolution":720,"embedUrl":"https://redirector.googlevideo.com/videoplayback?id=17d851c499619577&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-i3beln7s&ms=nxu&mv=u&pl=48&sc=yes&ei=QZfZXLa-Gpa04QL0yJrIDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5101.307&lmt=1557254595185584&mt=1557763685&ipbits=0&keepalive=yes&ratebypass=yes&ip=2400:6540:0:ffff:0:25ff:fe0e:d07d&expire=1557771105&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E9C3B7AF85CBE65AA6A07441EA9F7E568D21463D1D774A6132D53F2BF86F052B.58FB9CAE814CF6F78533315633208BA0AEE60A358D460E26104F7843A2294CEA&key=us0","default":true}]},{"name":"Đại Chiến Hành Tinh Khỉ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/dai-chien-hanh-tinh-khi_10155/xem-phim/"},"nameOrigin":"War for the Planet of the Apes","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdai-chien-hanh-tinh-khi-war-for-the-planet-of-the-apes-2017.jpg%3Fsize%3D300"},"directors":["Matt Reeves"],"actors":["Woody Harrelson","Steve Zahn","Terry Notary","Andy Serkis","Karin Konoval","Amiah Miller"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":100,"desc":"Phim Đại Chiến Hành Tinh Khỉ (War for Planet of the Apes) 2017 phần phim thứ 3 và cũng là cuối cùng của trilogy Planet of the Apes. Tiếp nối phần trước, sau khi quân đội biết sự tồn tại của xã hội loài khỉ dưới sự chỉ huy của Caesar, họ quyết định đến chiến đấu chống lại Caesar, nhóm lính được dẫn đầu bởi một vị tướng tàn bạo.Về phần vị vua khỉ của chúng ta, sau những mất mát của mình, anh ta dần trở nên đen tối hơn, có những suy nghĩ độc đoán hơn về con người và cách thống lĩnh của mình. Số phận của hai giống loài này phụ thuộc vào cuộc chiến cuối cùng này!","embeds":[{"resolution":360,"embedUrl":"https://3.bp.blogspot.com/K9O9ZnI9ig3wX2BHje1To14xE-95txxbjU1RNmQAVFM6_X5TSCjn2qdY7XJdf8lG0BptwypHWNYi6eW4uTZeQXNYi12gbHUdBWyaPW4RBLCF_fDqbtJt8tc6URay6KlTDaVHa3P9jw=m18","default":true},{"resolution":720,"embedUrl":"https://3.bp.blogspot.com/K9O9ZnI9ig3wX2BHje1To14xE-95txxbjU1RNmQAVFM6_X5TSCjn2qdY7XJdf8lG0BptwypHWNYi6eW4uTZeQXNYi12gbHUdBWyaPW4RBLCF_fDqbtJt8tc6URay6KlTDaVHa3P9jw=m22","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/war-for-the-planet-of-the-apes-2017/1"},{"name":"Robot Đại Chiến 5: Chiến Binh Cuối Cùng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/robot-dai-chien-5-chien-binh-cuoi-cung_10105/xem-phim/"},"nameOrigin":"Transformers 5: The Last Knight","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Frobot-dai-chien-5-chien-binh-cuoi-cung-transformers-5-the-last-knight-2017.jpg%3Fsize%3D300"},"directors":["Michael Bay"],"actors":["Mark Wahlberg","Isabela Moner","Peter Cullen"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"Phim Transformers 5 (2017): Phần tiếp theo về robot biến hình ăn khách. \"Chiến Binh Cuối Cùng\" phá nát những huyền thoại cốt lõi của loạt phim Transformers, và tái định nghĩa thế nào là anh hùng. Con người và các Transformer đang có chiến tranh, Optimus Prime đã biến mất.Chìa khóa để cứu tương lai của chúng ta đang được chôn vùi trong những bí mật của quá khứ, trong lịch sử ẩn còn được giữ kín của các Transformer trên Trái Đất. Trách nhiệm cứu thế giới đè lên vai của một đồng minh đặc biệt: Cade Yeager, người máy Bumblebee, một quý tộc Anh, và một Giáo sư đại học Oxford Trong đời ai cũng có khoảnh khắc chúng ta được chọn để tạo nên sự khác biệt. Trong Transformer: Chiến Binh Cuối Cùng, kẻ ác trở thành anh hùng. Anh hùng sẽ trở thành kẻ thủ ác. Chỉ một thế giới được tồn tại: của họ, hoặc của chúng ta.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nz7.googlevideo.com/videoplayback?id=e70d7381cf884199&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=wpzZXNmyAcqc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&dur=8788.102&lmt=1552700276976508&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772514&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=88370BCB6B28F1BF88DF892C5ED9EDF7AD5BE52EC7A72BB0B2D1DAF018BE0DBD.0D1264FF3511F8B89AD5DA3FA8C0E3765AA417714ADE33E1EE7E1A565A7739B9&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5e6nz7.googlevideo.com/videoplayback?id=e70d7381cf884199&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=wpzZXPjbCJG01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=8788.102&lmt=1552873676320568&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772514&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=4571E2E69BB2CE0B3449F9FEC8209FEC80479ADB0C988849ED88DAAD1237D25D.BEC28462607C8A65EA02667CABFDEC71E9130C5EF0CBCB2E5E0ED96D01616F5C&key=us0#f720p","default":true}]},{"name":"Sóng Dữ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/song-du_10088/xem-phim/"},"nameOrigin":"Shock Wave","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsong-du-shock-wave-2017.jpg%3Fsize%3D300"},"directors":["Khưu Lễ Đào"],"actors":["Lưu Đức Hoa","Ngô Trác Hy","Liêu Khải Trí"],"genres":["Phim Hành Động","Phim Hình Sự"],"countries":["Trung Quốc"],"duration":119,"desc":"Cheung Zoi-shan 1 chuyên viên cao cấp của Cục Xử lí vật nổ – Cảnh sát Hồng Kông, đã có 7 năm hoạt động bí mật trong băng đảng của trùm tội phạm bị truy nã gắt gao Crank. Cheung đã thành công trong việc phá án băng đảng và bắt giữ vài tên cướp trong đó có Biu, em trai của Cranky. Tuy nhiên, Cranky vẫn ở ngoài vòng pháp luật và hắn thề sẽ quay lại để trả thù.7 năm trôi qua và Cranky bắt đầu triển khai kế hoạch của mình – một loạt các vụ đánh bom khiến cho người dân Hồng Kông sống trong sợ hãi. Để duy trì luật pháp và an ninh xã hội, Cheung buộc phải khống chế được Cranky và ông sẵn sàng hy sinh cả tính mạng của mình để đương đầu với cuộc chiến chống lại kẻ đánh bom tàn nhẫn.","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5edne7.googlevideo.com/videoplayback?id=e43ade2d9f6902ad&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne7&ms=nxu&mv=u&pl=25&sc=yes&ei=q5_ZXNvLLcqc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&dur=7190.407&lmt=1552791510495697&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773259&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=1901ED57EB28898FA2B8179A6304E8716EA57B558D44425E0D1D7FA61FA529EE.112A82D5FD19134BA503C4CE337F7CD38D7791B5A8F2CFB2E2F066271ED03ED8&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6ne6.googlevideo.com/videoplayback?id=e43ade2d9f6902ad&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=q5_ZXJ_ZMNCJ1wLo47_YAw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7190.407&lmt=1552793559522213&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773259&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5ABFA8B22526C0F9AC213666DE71F66A7DE1E5ABF0B5FDF24C9736FC7E76180D.42FD973092C176902B8CF53F08AEE45EC05A8EF9E5C66E3D167997560584B72A&key=us0#f720p","default":true}]},{"name":"Thợ Săn Thời Gian","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tho-san-thoi-gian_10087/xem-phim/"},"nameOrigin":"Timing Raven","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftho-san-thoi-gian-timing-raven-2017.jpg%3Fsize%3D300"},"directors":["Lưu Gia Lương"],"actors":["Chu Giai Hi","Ngô Đông Ni","Vương Dã"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Khoa học Tài liệu","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":72,"desc":"Phim Thợ Săn Thời Gian Timing Raven 2 cô gái quyến rũ của đội hành động đặc biệt gồm Thu Mạt và La Lạp, một người bị thương một người thi mất không rõ khi đang thực hiện nhiệm vụ. Trong lúc tìm kiếm tung tích La Lạp, họ phát hiện một nhóm người đang thử nghiệm cổ máy điều chỉnh thời gian nhằm biến thời gian thành một món hàng đổi chác, trục lợi.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5ednsk.googlevideo.com/videoplayback?id=533788d9076966a3&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=q5_ZXNLDN4KC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&dur=4707.474&lmt=1551224332094173&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773259&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=72B23DB2D7E73525A8D733CB69D46A150A605723B0512D8E7AAED5D983E68C28.B34C88A20D8E22DEF4C97ACCD16A2C1519727CBCECAF7DAB7F5CCBF3C26D5E59&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5ednsk.googlevideo.com/videoplayback?id=533788d9076966a3&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=q5_ZXL74OdKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4707.474&lmt=1551225847919635&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773259&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=66F981938CC91EEC7C6E491493E31CCFE95507D7AF52777025C08593A92B89C9.EC5575BB7AE1C6967E1EDAD3AA4C43FB6F878B0FED5D70F9E07A75A5F85982A6&key=us0#f720p","default":true}]},{"name":"Cao Thủ Thái Cực Quyền","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cao-thu-thai-cuc-quyen_10060/xem-phim/"},"nameOrigin":"Tai Chi Pioneer","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcao-thu-thai-cuc-quyen-tai-chi-pioneer-2016.jpg%3Fsize%3D300"},"directors":["Sha Xuezhou"],"actors":["Sha Xuezhou","Zheng Shuang"],"genres":["Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":98,"desc":"Phim Cao Thủ Thái Cực Quyền Tai Chi Pioneer kể về Liễu Mục Phàm – một cao thủ thái cực quyền mở võ quán truyền dạy võ công với mong muốn giúp đỡ những người yếu đuối đòi lại công bằng, nêu cao tinh thần thượng võ. Thế nhưng các thế lực xấu xa liên tục tìm đến võ quán của anh gây sự khiến Mục Phàm và các đệ tử bị cuốn vào rắc rối. Liệu chính nghĩa có chiến thắng?","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednsk.googlevideo.com/videoplayback?id=934e6b88a6181926&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=SZfZXIDzHcby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&dur=5871.908&lmt=1551300380788351&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771113&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B705C2764878E7706E019B130E3E60B22339948DC76D0D8542070DE3D524173A.CA7D49905B7FA4667DAB0FA691F43F56E2AA582F56ACD9F0439E550530605B83&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednsk.googlevideo.com/videoplayback?id=934e6b88a6181926&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=SZfZXPrAIMvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5871.908&lmt=1551305773672885&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771113&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8144D143DD3BB62FADE064D04E666878A44255FB264F2CF6445BD8A630B74D8A.E5FB281A5F391DBA13EBC47E0CB5D5B1AD60D4D69F8447473DBF41F539BCC14C&key=us0#f720p","default":true}]},{"name":"Thế Giới Người Máy","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/the-gioi-nguoi-may_10008/xem-phim/"},"nameOrigin":"Blame! Movie","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthe-gioi-nguoi-may-blame-movie-2017.jpg%3Fsize%3D300"},"directors":["Hiroyuki Seshita"],"actors":["Kana Hanazawa","Takahiro Sakurai","Sora Amamiya"],"genres":["Phim Hành Động","Phim Hoạt Hình","Phim Viễn Tưởng"],"countries":["Nhật Bản"],"duration":106,"desc":"Trong tương lai công nghệ cao, nền văn minh nhân loại gắn liền với Internet – bước tiến tối thượng của con người. Trong quá khứ, một loại “bệnh truyền nhiễm” đã lây lan làm sập các hệ thống tự động, dẫn đến việc xuất hiện cấu trúc thành phố đa-tầng liên tục nhân bản vô hạn. Giờ đây, nhân loại đã mất kết nối với bộ phận điều khiển thành phố, và con người hiện đang bị hệ thống phòng ngự (gọi là Bộ Phận Bảo An) săn đuổi và tiêu diệt.Trong một góc phố nhỏ bé của thành phố, một vùng đất nhỏ mang tên Electro-Fishers hiện đang đứng trước sự diệt vong hoàn toàn khi bị bao vây bởi Bộ Phận Bảo An và sự đe dọa của nạn đói. Cô gái Zuru bắt đầu cuộc hành trình tìm thức ăn cho ngôi làng nhỏ của mình. Nhưng cô đã nhanh chóng đối diện với cái chết khi tòa tháp quan sát đã phát hiện ra cô và gửi Bộ Phận Bảo An đến để xóa sổ cô. Tất cả các cộng sự đã bị diệt sạch, và mọi lối thoát đều đã bị chặn. May thay, kẻ lang thang Killy đã xuất hiện giải cứu Zuru. Họ bắt đầu công cuộc đi tìm gene Net Terminal – chiếc chìa khóa khôi phục lại trật tự thế giới.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5e6nze.googlevideo.com/videoplayback?id=fb1924780ae32a9d&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=s5_ZXIfNO8by1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&dur=6333.451&lmt=1552815489229232&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773267&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=2513B62B82461A39637E45FCA244DA83017A7E46094AED72EFCCD2AD6938CD3A.DBE0B1634E9D20D8E9753C24A69C3AC1988DE173D0F99A95C10D622705634F52&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5ednsl.googlevideo.com/videoplayback?id=fb1924780ae32a9d&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=tJ_ZXJJy-ZjyA_7UhLgK&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6333.451&lmt=1552817929376807&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773268&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=890EAAA59778F443E6FA68E95F79D52CA98AEAFE3DFC7B711E7086764EDAA6D4.84E3E5AE885ACC5CCA8DD74ABA2A5A66DDA41B546B033D85BB03E81219DAD5A8&key=us0#f720p","default":true}]},{"name":"Ba Chàng Ngự Lâm 3","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ba-chang-ngu-lam-3_5657/xem-phim/"},"nameOrigin":"The Hangover 3","year":"2013","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fba-chang-ngu-lam-3-the-hangover-3-2013.jpg%3Fsize%3D300"},"directors":["Todd Phillips"],"actors":["Bradley Cooper","Ed Helms","Zach Galifianakis"],"genres":["Phim Hài Hước"],"countries":["Mỹ"],"duration":100,"desc":"Cuộc hành trình đầy tiếng cười nhưng cũng gay cấn không kém của bộ ba thân thiết bao gồm nha sĩ Stu (Ed Helms), chàng giáo viên điển trai (Bradley Cooper) Phil và chàng béo ngốc nghếch hay gây chuyện Alan (Zach Galifianakis) sẽ được tiếp tục. Bối cảnh câu chuyện diễn ra ở Las Vegas – thành phố được mệnh danh dành cho những trò vui bất tận và Tijuana (Mexico). Khác với mọi khi, lần này sẽ không có đám cưới, cũng chẳng có tiệc độc thân, nhưng những chuyện rắc rối vẫn có thể xảy đến chứ? Và khi “đàn sói” lên đường thì chắc chắn là có chuyện chẳng lành.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednsl.googlevideo.com/videoplayback?id=6615d242c111c64f&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=GqfZXJWuFpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&dur=6008.209&lmt=1552526340138587&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557775162&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=288C4CC8F0C5C9FE1ECCE40C0567C3F299C5A30A35057965C26239AF9C3C20EA.BA2E1235A93C9A76A8EB83076D75AAC730A49ABE9310376A4B9985828654A09E&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nzz.googlevideo.com/videoplayback?id=6615d242c111c64f&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzz&ms=nxu&mv=u&pl=25&sc=yes&ei=GqfZXIz1GKSK8gOIx6ngAg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6008.209&lmt=1552528306199026&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557775162&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=4157214E01C04C8CB0AA0DD6B8C7CDBC4CF960477804FDC08A9FD09EDAB9A826.92E46521D4832F54C2FDAC318A23ACB088B27A22CE04BED124DE137D0B56AB86&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r5---sn-4g5ednsl.googlevideo.com/videoplayback?id=6615d242c111c64f&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=GqfZXImrG4KC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6008.209&lmt=1552528458350737&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557775162&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=CBD7BEF26CA31A8BAD6B14DE8A99292E685FC7492C7FADBCD93BA56BB34D230F.3C0E095C874423FBC9E03411AAF119BB5E4B44BC65706C008C27E3C81B6042A8&key=us0#f1080p","default":true}]},{"name":"Tình Dục Là Chuyện Nhỏ Phần 1","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tinh-duc-la-chuyen-nho-phan-1_5445/xem-phim/"},"nameOrigin":"Sex Is Zero Phần 1","year":"2002","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftinh-duc-la-chuyen-nho-phan-1-sex-is-zero-phan-1-2003.jpg%3Fsize%3D300"},"directors":["Je-gyun Yun"],"actors":["Chang Jung Lim","Ji won Ha","Seong guk Choi"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":96,"desc":"Phim nói về môi trường sinh viên với bệnh “thèm sex” thấm sâu trong từng  người, đặc biệt là cánh mày râu. Các chàng thường tìm đĩa sex về xem và  “tự sướng”, hoặc đêm hôm dòm ngó các phòng để tìm cảm giác kích thích.  Bệnh hoạn hơn, có người kiếm một con búp bê lớn để làm tình như người  thật…Trong bối cảnh ấy, chàng trai 28 tuổi Eun-shik (Lim Chang Jung) vừa chân ướt chân ráo bước vào trường đại học. Eun-shik vừa giải ngũ sau khi  hoàn thành nghĩa vụ quân sự. Anh là thành viên của nhóm Cha Ryu và  thường xuyên tập luyện với nhóm này, bất chấp những đau đớn mà anh phải  chịu đựng. Một ngày nọ, anh gặp cô bạn Lee Eun-hyo xinh đẹp (Ha Ji Won),  một vận động viên nổi tiếng của môn aerobic. Cô nàng sở hữu một bộ ngực  nõn nà và thân hình ngon mắt khiến Eun-shik không lúc nào rời mắt khỏi  nàng.Nhưng người mà Eun-hyo thầm thương trộm nhớ lại là anh chàng người  hùng của trường, Sung-ok. Từ đó, Eun-shik chỉ còn biết đứng ngoài nhìn  bóng hồng của mình rơi vào vòng tay của anh chàng bảnh trai kia. Các anh bạn cùng phòng của Eun-shik cũng bắt đầu để ý những cô bạn gái  của Eun-hyo và tìm mọi cách “lên giường” với cô này như một chiến tích  tình trường.Trong khi đó “anh bạn già” Eun-shik có vẻ không gặp may mắn  trong việc giành tình cảm của người khác phái. Cuộc sống với anh vì thế  cũng không dễ dàng gì. Có lần anh chàng còn bị Eun-hyo “cao gối” trong  lần “sàm sỡ” với cô nàng trên xe buýt. Kết quả là Eun-hyo phải đưa  Eun-shik vào viện dưỡng thương. Eun-shik còn dính líu vào không ít những trò nhất quỷ nhì ma của đám bạn  cùng phòng. Thậm chí trong một lần tự tìm cảm giác bằng cách xem phim  sex, anh đã bị Eun-hyo bắt gặp trong sự bẽ bàng…Anh chàng tìm cách  chuồn qua cửa sổ tránh sự dị nghị của dư luận thì lại gặp hai cậu bạn  đang trèo qua hết cửa sổ này đến cửa sổ khác để nhòm vào phòng bạn bè  “xem sex trực tiếp”. Mấy cô bạn gái tai quái tình cờ nhìn thấy và gọi  cứu hỏa. Eun-shik với chiếc quần tụt tới tận mắt cá chân đã trở thành  trò cười hết sức kệch cỡm cho toàn trường. Cơ hội đến với Eun-shik khi Eun-hyo bị anh chàng Sung-ok bỏ rơi trong  đúng ngày sinh nhật. Đau đớn hơn, Eun-hyo biết mình có thai với Sung-ok.  Song cô không thể phá thai một mình, vì thế Eun-hyo đã nhờ đến sự giúp  đỡ của Eun-shik. Lẽ dĩ nhiên, anh chăm sóc cô một cách tận tình, đặc  biệt trong lần vì thi aerobic quá sức mà Eun-hyo bị ngất xỉu, phải đi  cấp cứu…Phim  cũng là một sự đánh thức  các cô gái trẻ dễ bị sa ngã vào những lời ngọt  ngào của những tên bề  ngoài bóng bẩy nhưng bên trong thì chỉ là rác  rưởi...Eun-sik đã mắng vào  mặt tên sở khanh đó trong tiếng nấc nghẹn  ngào. Cũng giống như hai bộ phim Wet Dreams 1 và 2 của đạo diễn Jung Cho-sin,  Sex is Zero là tác phẩm điện ảnh đậm chất hài hước trẻ trung với những  khuôn hình nóng bỏng đầy sức hẫp dẫn với giới trẻ. Bộ phim cũng là bước  đệm đưa tên tuổi của nữ diễn viên Ha Ji Won trở nên nổi tiếng trong giới  showbiz Hàn Quốc..","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5e6ne6.googlevideo.com/videoplayback?id=505c3d0611c0f6de&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=w53ZXNqxIpqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&dur=5527.185&lmt=1554762184647822&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557772771&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=D5B9B87113C536E06953F4A552C914C28D896AEA3E9E723AB6286C3AF660C5F8.79D6624BEA5FA283421FE0B0FF880B1E6E8A808E0D6ED1598D0A933AA4860CC8&key=us0","default":false},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6ne6.googlevideo.com/videoplayback?id=505c3d0611c0f6de&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=w53ZXJa6IoOd8gOAxbGoAw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5527.185&lmt=1554764099234033&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557772771&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=5A1241A763C8C65C30B5BFDD89A48AEFE8FE52FFF34BF59A60A242F338EABD2A.20649178E511C8F24792C6768EE31EDB8E99CE448E5CA6913FCD82E0C5499FC0&key=us0","default":true}]},{"name":"Liên Minh Anh Hùng Báo Thù","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/lien-minh-anh-hung-bao-thu_5172/xem-phim/"},"nameOrigin":"Ultimate Avengers The Movie","year":"2006","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Flien-minh-anh-hung-bao-thu-ultimate-avengers-the-movie-2006.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Phim Hoạt Hình","Phim Viễn Tưởng"],"genres":[""],"countries":["Mỹ"],"duration":71,"desc":"Trong năm 1945, Captain America, người lính Mỹ tạo ra với một huyết thanh Super-Soldier, đang chiến đấu với Đức Quốc xã trong Thế chiến II, và sau khi ngăn chặn một thảm họa hạt nhân, ông chỉ rơi vào vùng nước đóng băng của Bắc Đại Tây Dương, và đông lạnh trong lơ lửng, được hồi sinh trong thế kỷ hai mươi mốt của quân đội Mỹ, những người đang hy vọng rằng họ có thể tái tạo huyết thanh trong máu của Captain America để tạo ra nhiều siêu chiến binh. Nhưng bây giờ, với thế giới phải đối mặt với cái ác rất giống nhau, Captain America phải tăng trở lại là hy vọng cuối cùng của chúng ta về sự sống còn, và lãnh đạo một nhóm ý chí mạnh mẽ của siêu anh hùng ngày nay.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nsz.googlevideo.com/videoplayback?id=bc27052bd6ce869a&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=MabZXM_RM4qk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&dur=4962.986&lmt=1554292379258080&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774929&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=49BA76183875C22E45F5564BC78CC19100A97FBEFD3B3D727E211B555509CD89.BC213470E5EDA1FCD11E99E9391A1C3A67102C44A2CDE84520461BB82092AE2B&key=us0","default":false},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednsl.googlevideo.com/videoplayback?id=7201483732dfdb11&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=MabZXNTEM4eA1gK60JEo&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4962.986&lmt=1554293000496198&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774929&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=52E5FCB380A0866F2BF6AF1B47F455C701315C1DCBBF99C193056AC5BFA9CC18.C63DDE9402AA3C1105E8286064442BC71F5F73D046BAF85D2836EAB40CBBCF57&key=us0","default":true}]},{"name":"Bất Khả Xâm Phạm","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bat-kha-xam-pham_4979/xem-phim/"},"nameOrigin":"Unbreakable","year":"2000","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbat-kha-xam-pham-unbreakable-2001.jpg%3Fsize%3D300"},"directors":["M. Night Shyamalan"],"actors":["Bruce Willis","Samuel L. Jackson","Robin Wright"],"genres":["Phim Hành Động","Phim Tâm Lý","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":106,"desc":"Dunn là người sống sót duy nhất sau một tai nạn xe lửa thảm khốc. Tất cả hành khách trên chuyến xe lửa đều tử nạn, riêng anh trở về không một vết xây xước. Và anh gặp một con người kỳ lạ, sự ám ảnh của con người đó khiến anh phát hiện ra một bí mật liên quan đến chính con người anh và điều đó đã khiến cuộc đời anh thay đổi mãi mãi. Phim hơi có màu sắc kì bí, mang lại cảm giác hồi hộp và căng thẳng từ đầu đến cuối.","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5edn7e.googlevideo.com/videoplayback?id=b34e5b6aaf51eafb&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7e&ms=nxu&mv=u&pl=25&sc=yes&ei=Ip3ZXOqrEaSK8gOIx6ngAg&susc=ph&app=fife&mime=video/mp4&dur=6399.558&lmt=1552703216513828&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772610&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=BB44DD143AF929D739A9047A50D92F136352633A5D8285E87BBC8DD5ED9E04A2.BB1BF46FEC896F863FBCA515E45B62979558BD45AC9BE2B52F8263AEEFA09659&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5edn7e.googlevideo.com/videoplayback?id=b34e5b6aaf51eafb&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7e&ms=nxu&mv=u&pl=25&sc=yes&ei=Ip3ZXLX6FYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6399.558&lmt=1552705125487535&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772610&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=E2C4008ED28F6269209C5C237AF32D75523F87559331524BE4841066CF75FD6D.5ADAF536BAD161F33D8E0853F9A05E4FE8D0AC4F8E776DDCDFA02AE142609F0B&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r2---sn-4g5e6nes.googlevideo.com/videoplayback?id=b34e5b6aaf51eafb&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nes&ms=nxu&mv=u&pl=25&sc=yes&ei=Ip3ZXLL8Ga2S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6399.558&lmt=1552705118581377&mt=1557764641&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557772610&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=14BF5BDDA433BF167438210626CC85E059A5282B71F1F3B0A974BDC0AD9DDFE3.D705AEFAA9D8E1A0FF2220CD850928899ED84BC7E00B6BDA868E3DEC36629A08&key=us0#f1080p","default":true}]},{"name":"Quỷ Đỏ 1","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quy-do-1_4950/xem-phim/"},"nameOrigin":"Hellboy 1","year":"2004","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquy-do-1-hellboy-1-2004.jpg%3Fsize%3D300"},"directors":["Ron Perlman","John Hurt","Selma Blair"],"actors":["Phim Hành Động","Phim Phiêu Lưu"],"genres":[""],"countries":["Mỹ"],"duration":122,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/21745f07bc0c2a2bc1fcadd865040e37/21745f07bc0c2a2bc1fcadd865040e37.playlist.m3u8","default":true}]},{"name":"Quỷ Đỏ 2: Binh Đòan Địa Ngục","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quy-do-2-binh-doan-dia-nguc_4951/xem-phim/"},"nameOrigin":"Hellboy 2: The Golden Army","year":"2008","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquy-do-2-binh-doan-dia-nguc-hellboy-2-the-golden-army-2008.jpg%3Fsize%3D300"},"directors":["Ron Perlman","Selma Blair","Doug Jones"],"actors":["Phim Hành Động","Phim Phiêu Lưu"],"genres":[""],"countries":["Mỹ"],"duration":120,"desc":"Phần tiếp theo của Hellboy, do hãng Universal Picture sản xuất năm 2004, đạo diễn Guillermo Del Toro. Hellboy là một nhân vật có tướng tá dị hình, mà theo như Del Toro thì ông xây dựng nhân vật này từ 3 nhân vật khá “nổi tiếng” là Frankenstein, Dracula và Người sói.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/1dde73b4a4f03b95b00af1925fed919d/1dde73b4a4f03b95b00af1925fed919d.playlist.m3u8","default":true}]},{"name":"Má Mì Hot Girl","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ma-mi-hot-girl_4753/xem-phim/"},"nameOrigin":"Ma Mi","year":"2013","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fma-mi-hot-girl-ma-mi-2013.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Nhiều diễn viên"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":65,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://content.googleapis.com/drive/v2/files/0B6T-sJ-WwxsLaWJRRzNGWW1PcGM?alt=media&key=AIzaSyBMqv4dXnTJOGQtZZS3CBjvf748QvxSzF0","default":true}]},{"name":"Bánh Mỹ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/banh-my_4446/xem-phim/"},"nameOrigin":"American Pie","year":"1999","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbanh-my-american-pie-1999.jpg%3Fsize%3D300"},"directors":["Jason Biggs","Chris Klein","Thomas Ian Nicholas"],"actors":["Phim Hài Hước","Phim Tâm Lý"],"genres":[""],"countries":["Mỹ"],"duration":98,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednsz.googlevideo.com/videoplayback?id=934f933647cf9830&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=JofZXPndDoqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&dur=6831.148&lmt=1552827259619953&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557766982&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=198FBAC1A721B2F026007BA010A4D4B1ADE32BEFD9B5C2F2470D8AAF92A2EC36.390AA9CA62EF0C4D180748F5E4A19E938436CB24F2B6CCF30A9CF8314612A364&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednsz.googlevideo.com/videoplayback?id=934f933647cf9830&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsz&ms=nxu&mv=u&pl=25&sc=yes&ei=JofZXIjzFJG01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6831.148&lmt=1552834576515049&mt=1557758994&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557766982&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=779197A78BF71BBFFBBA9E8F6A78AEEFAF5594E9F785FE131CA954E55A2A0D21.182FE917AD2AABA0EB7F503B7F8FB0E87FA0E86C7C4DBD7C8820DF1A46082AD8&key=us0#f720p","default":true}]},{"name":"Khủng Long Đại Chiến","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/khung-long-dai-chien_4394/xem-phim/"},"nameOrigin":"Tarbosaurus 3D","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkhung-long-dai-chien-tarbosaurus-3d-2012.jpg%3Fsize%3D300"},"directors":["Han Sang-Ho"],"actors":["Goo Ja Hyeong","Lee Hyung Suk","Sin Yong woo"],"genres":["Phim Hoạt Hình","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":88,"desc":"Câu chuyện trong Tarbosaurus diễn ra ở thời điểm 80 triệu năm về trước. Lúc ấy, loài khủng long thống trị lãnh thổ Hàn Quốc cũng hệt như cách chúng tung hoành bên dưới mọi vùng trời còn lại của thế giới. Một phần lãnh địa khủng long mà bây giờ được biết đến dưới cái tên Jeonnam Yeosu là rừng “nhà” của giống loài đặc chủng: Tarbosaurus. Nhóc nhỏ tuổi nhất trong gia tộc Tarbosaurus là Đốm , một đứa trẻ hiếu động và rất tò mò. Cùng với mẹ và cặp sinh đôi, cậu bé sống hạnh phúc trong khu rừng, nhẫn nại học cách đi săn.Nhưng rồi một ngày kia tới, đánh dấu điểm khởi đầu cho hành trình trưởng thành dài đằng đẵng đầy đau khổ của Đốm. Con khủng long Tyrannosaur già xảo quyệt mang tên Một Mắt muốn tìm kiếm lãnh địa mới đã tấn công bầy Tarbosaurus. Hắn say sưa trong mùi vị chiến thắng, tận hưởng những giọt nước mắt chia ly khi cố tình bắt Đốm phải rời xa gia đình.Về phần Đốm, cậu nhóc lang thang và gặp gỡ một cô khủng long Tarbosaur lạc đàn khác. Mắt Ngọc trở thành bạn đồng hành sống còn trong suốt 2 thập kỷ và là mẹ lũ con của chính Đốm. Tuy nhiên, số phận lại một lần nữa xoay vần, những món nợ ân oán với Một Mắt chưa thể kết thúc ở đó. Những sự trả thù, cái chết, nỗi sợ hãi và đau buồn đang đón đợi Đốm ở phía trước, cũng như là hạnh phúc và hy vọng ...","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/66194035e217b50cb295ee7423365c73/66194035e217b50cb295ee7423365c73.playlist.m3u8","default":true}]},{"name":"Ngẩng Cao Đầu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ngang-cao-dau_4338/xem-phim/"},"nameOrigin":"Khi Cựu Binh Trở Về / Walking Tall","year":"2004","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fngang-cao-dau-walking-tall-2005.jpg%3Fsize%3D300"},"directors":["Kevin Bray"],"actors":["Dwayne JohnsoJohnny Knoxville"],"genres":["Phim Hành Động","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":86,"desc":"Chris Vaughn (The ROCK) là 1 binh sĩ giải ngũ, anh trở về thị trấn nhỏ quê anh để sống 1 cuộc sống mới, nhưng anh nhận ra rằng người bạn học con nhà giàu năm xưa với anh là Jay (Neal McDonough) lại là 1 tên trùm luôn làm những chuyện phạm pháp nơi thị trấn bé nhỏ ấy. Chris nhận thấy rằng quê anh giờ tràn ngập tội phạm, thuốc phiện và đầy bạo lực. Được sự giúp đỡ của người bạn cũ là Ray (Johnny Knoxville), Chris trở thành cảnh sát và anh thề rằng sẽ đưa thị trấn này trở nên bình yên như cũ. Việc anh làm đã khiến mạng sống của anh và gia đình anh trở nên nguy hiểm nhưng anh không hề bỏ cuộc chỉ vì muốn làm việc tốt cho nơi anh đã sinh ra và lớn lên...","embeds":[{"resolution":360,"embedUrl":"https://content.googleapis.com/drive/v2/files/0Bw_RYl3X9hE7bW1lTldvTVFKdjQ?alt=media&key=AIzaSyBMqv4dXnTJOGQtZZS3CBjvf748QvxSzF0","default":true}]},{"name":"Trận Chiến Thái Bình Dương","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tran-chien-thai-binh-duong_3735/xem-phim/"},"nameOrigin":"Pacific Rim","year":"2013","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftran-chien-thai-binh-duong-pacific-rim-2014.jpg%3Fsize%3D300"},"directors":["Guillermo del Toro"],"actors":["Burn GormanRon Perlman"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":114,"desc":"Mùa phim hè năm nay sẽ được kéo dài hơn khi sắp tới đây, một bom tấn về chủ đề hậu tận thế kết hợp với quái vật ngoài hành tinh sắp được ra mắt khán giả Việt.Pacific Rim – Siêu Đại Chiến - bom tấn trị giá 180 triệu USD sẽ mang đến quái vật hậu tận thế Kaiju đến màn ảnh rộng qua sự chỉ đạo tài tình của đạo diễn từng đoạt giải Oscar Guillermo del Toro.Pacific Rim là tác phẩm đặc biệt bởi khi bắt đầu được tiến hành, đạo diễn Guillermo khá kín tiếng, không hé lộ nhiều về bộ phim. Chỉ tới khi trailer đầu tiên ra mắt, người xem mới ngỡ ngàng về sự hoành tráng quy mô lớn của tác phẩm với những kỹ xảo hiệu ứng tối tân nhất.Kaiju là quái vật biển khổng lồ xuất hiện từ một kẽ nứt dưới Thái Bình Dương mang đến nỗi ác mộng cho con người. Để đánh bại Kaiju, loài người buộc phải nghĩ ra một phương án bằng việc sáng tạo nên các Jaegers - robot khổng lồ được điều khiển bởi con người.Cuộc chiến gay cấn giữa robot loài người và quái vật Kaiju diễn ra không cân sức, nhiệm vụ cuối cùng được giao cho 2 người phi công trẻ ngăn chặn thảm họa diệt vong bởi Kaiju. Guillermo del Toro  miêu tả quái vật trong phim mới của ông “là hào nhoáng và xinh đẹp” trong trận chiến hùng vĩ giữa đại dương giữa những cơn bão xoáy và dòng thác nước khổng lồ.Năm 2004 và 2008, Guillermo del Toro  mang đến hai phần phim viễn tưởng thần thoại Hellboy được khán giả đón nhận nhiệt tình. Năm 2007, với tác phẩm thần thoại Pan's Labyrinth tự mình đạo diễn và viết kịch bản, Guillermo đã đoạt giải Oscar cho Kịch bản gốc xuất sắc nhất cùng với 2 hạng mục khác.Là người có niềm đam mê với chủ đề quái vật, nhà làm phim người Mexico được nhà sản xuất khen ngợi sự nhiệt huyết khi cống hiến cho Pacific Rim, đây cũng là bộ phim đầu tiên ông bắt tay thực hiện trong vòng 5 năm qua.Xem Trận Chiến Thái Bình Dương 2","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6nl7.googlevideo.com/videoplayback?id=b0786cc927cae592&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nl7&ms=nxu&mv=m&pl=25&sc=yes&ei=u6DZXL1Ki4_XAqyWmpgI&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7876.905&lmt=1550299278564814&mt=1557766294&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773531&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=4D1AE9B34CA01047E6EDA12942B49B894B93104A9D26F2CA0E1FB52E1692BDCD.199F4C9428FAFECD8450EFE7F0AE26ED5169CB207A80CBB92682FDF2CD066B72&key=us0","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6nl7.googlevideo.com/videoplayback?id=b0786cc927cae592&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nl7&ms=nxu&mv=m&pl=25&sc=yes&ei=u6DZXPZDpIryA4jHqeAC&susc=ph&app=fife&mime=video/mp4&dur=7876.905&lmt=1550288140828514&mt=1557766175&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773531&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=5EEF73A2EFC71B358851462C971C21F6CDBA34CBE52B1975ED9F5BFA6AEC95D5.8FB760BD446B65AF793FC42F6444DCB82012CD5DC01955D235E3173BA2D130D9&key=us0","default":false}]},{"name":"Máy Xay Thịt Người","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/may-xay-thit-nguoi_3708/xem-phim/"},"nameOrigin":"Meat Grinder","year":"2009","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmay-xay-thit-nguoi-meat-grinder-2009.jpg%3Fsize%3D300"},"directors":["Mai Charoenpura","Anuway Niwartwong","Wiradit Srimalai"],"actors":["Phim Kinh Dị"],"genres":[""],"countries":["Thái Lan"],"duration":90,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://lh3.googleusercontent.com/z30KmIbPWmQdOxAb0ArvGLcP6kzNA65Ac9ECIce_j2BF_42ofibMqL4tna2lIKpq1Ko=m18","default":true}]},{"name":"Hàn Chiến","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/han-chien_3639/xem-phim/"},"nameOrigin":"Cold War","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fhan-chien-cold-war-2012.jpg%3Fsize%3D300"},"directors":["Lương Nhạc Dân"],"actors":["Quách Phú Thành","Lương Gia Huy","Lý Trị Đình","Bành Vu Yến","Lâm Gia Đống","Tiền Gia Lạc","An Chí Kiệt","Doãn Tử Duy"],"genres":["Phim Hành Động"],"countries":["Trung Quốc"],"duration":102,"desc":"Trung tâm báo án của Lực lượng Cảnh sát Hồng Kông đã nhận được những cuộc gọi điện thoại nặc danh, báo cáo một vụ bắt cóc tấn công 1 chiếc xe cảnh sát. Trong xe gồm 5 nhân viên cảnh sát cùng các vũ khí trang thiết bị đã trở thành con tin để bọn bắt cóc đòi tiền chuộc. Nhằm lúc Tổng trưởng cảnh sát đi công tác nước ngoài, vì vậy 2 phó tổng trưởng cảnh sát là Lý Văn Bân (Lương Gia Huy đóng) – thuộc phái diều hâu và Lưu Kiệt Huy (Quách Phú Thành đóng) được giao nhiệm vụ giải cứu con tin.Lúc đầu, Lý Văn Bân phụ trách chỉ huy, hành động giải cứu này được đặt tên là \"Hàn chiến\". Tuy nhiên, bọn bắt cóc lại nắm rất rõ tình hình của phía cảnh sát và luôn ra tay trước. Đội cảnh sát tinh nhuệ dù rất nỗ lực nhưng cũng thất bại. Mọi người bắt đầu nghi ngờ những quyết sách của Bân, sau đó bèn cử Huy tiếp nhận hành động này. Trong giờ khắc nguy cấp, 2 hổ cạnh tranh, nhưng Huy không hề e sợ. Không giống như các phương án mạnh bạo của Bân, Huy chọn cách chủ động liên lạc với bọn tội phạm, và hứa sẽ giao tiền chuộc cho chúng. Trong suốt quá trình giao tiền chuộc, Huy bố trí các manh mối để thuận tiện cho việc truy lùng thủ phạm về sau.Đáng tiếc, có kẻ cao tay hơn khiến Huy không những không tìm ra tung tích bọn bắt cóc mà còn để cho số tiền chuộc rất lớn ấy biến mất. Lực lượng Cảnh sát Hồng Kông rơi vào tình trạng nguy hiểm chưa từng có. Toàn bộ hành động giải cứu khiến ngân sách của chính phủ Hồng Kông thiệt hại 80 triệu HK$, hai sĩ quan cảnh sát hy sinh khi làm nhiệm vụ.Vụ việc làm rúng động không chỉ nội các Chính phủ mà còn Ủy ban Độc lập chống tham nhũng (ICAC), bởi ICAC đã nhận được tin báo của 1 người bí mật, nghi ngờ một trong hai phó tổng cảnh sát lạm dụng quyền lực mưu lợi riêng tư tại thời điểm quan trọng này.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nzs.googlevideo.com/videoplayback?id=309d071c68e63fc4&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=u&pl=25&sc=yes&ei=yajZXOHgOpfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=6119.526&lmt=1552079061198324&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557775594&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=27C22A1BA391CB7B06A77632F5960325361CE2AA06831AD79E3DD1F277BF9F7C.05E7170B96177D4CB06896B60218729BAC388569AD832716B48D2298270763C4&key=us0","default":false}]},{"name":"Kẻ Thực Thi Công Lý","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ke-thuc-thi-cong-ly_3532/xem-phim/"},"nameOrigin":"The Enforcer","year":"1976","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fke-thuc-thi-cong-ly-the-enforcer-1976.jpg%3Fsize%3D300"},"directors":["James Fargo"],"actors":["Clint Eastwood","Tyne Daly","Harry Guardino"],"genres":["Phim Hành Động"],"countries":["Mỹ"],"duration":96,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/874c788f1377a63bc44eb4e8b20eeebd/874c788f1377a63bc44eb4e8b20eeebd.playlist.m3u8","default":true}]},{"name":"Thám Tử Lừng Danh Alex","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tham-tu-lung-danh-alex_3527/xem-phim/"},"nameOrigin":"Alex Cross","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftham-tu-lung-danh-alex-cross-2012.jpg%3Fsize%3D300"},"directors":["Rob Cohen"],"actors":["Tyler Perry","Matthew Fox","Rachel Nichols"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Hình Sự","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":101,"desc":"Bộ phim lấy cảm hứng từ nhân vật thám tử lừng danh “Alex Cross” trong loạt tiểu thuyết ăn khách của nhà văn trinh thám nổi tiếng James Patterson. Trong phim, Alex Cross (Tyler Perry), một nhà tâm lý học đồng thời là một thám tử tài ba từng phục vụ trong ngành cảnh sát, buộc phải vào cuộc truy tìm tên giết người hàng loạt Picasso (Matthew Fox) sau cuộc gọi nhờ giúp đỡ của người bạn thân từ thuở nhỏ Tommy Kane (Edward Burns), đồng thời là đồng nghiệp cũ trong sở cảnh sát Detroit. Hai người còn có sự đồng hành của nữ thám tử Monica Ashe (Rachel Nichols).Trong quá trình điều tra và truy tìm dấu vết của tên sát nhân, Cross nhận được lời đe dọa tính mạng người thân trong gia đình. Với sự tức giận tột độ, Cross thề sẽ hạ gục kẻ sát nhân bằng bất cứ giá nào. Hai đối thủ lao vào trò chơi “mèo vờn chuột” với một bên truy lùng và bên kia trốn chạy.Phim là cuộc hành trình của vị thám tử tài ba Alex Cross, với những tình tiết trinh thám đầy ly kỳ, những tình huống truy đuổi nghẹt thở, những bí mật dần được hé lộ một cách đầy bất ngờ, hứa hẹn sẽ đáp ứng được sự mong đợi của khán giả điện ảnh yêu thích thể loại hành động, trinh thám.Một bộ phim dựng theo tiểu thuyết của James Patterson – một trong những nhà văn hàng đầu của thể loại trinh thám.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednz7.googlevideo.com/videoplayback?id=0589cb6dd9b54348&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=TKbZXM6rNYmu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&dur=6083.372&lmt=1552828981732708&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557774956&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=C27D24F18D19F2C0CF604A85DF39C3E6FF46A4159D5B7DC0C502AAB37C0539A7.E0B10D89735DCAB04E79FD37D51603A6A1FB7A210D31C4D085F2936817923463&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nze.googlevideo.com/videoplayback?id=0589cb6dd9b54348&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nze&ms=nxu&mv=u&pl=25&sc=yes&ei=TKbZXPriN9Wm8gPgxpioDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6083.372&lmt=1552833366586058&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557774956&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=497FB8ABB46D4BA0694A5CCA4DEEFE6BECD9D27868A68C6853DDF7E0164BCB0F.C16E42B0415A373E3AC3880147CD8C9ACC8E0BF6E3798322CED095DEE55B62EE&key=us0#f720p","default":true}]},{"name":"Ba Chàng Ngốc","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ba-chang-ngoc_2318/xem-phim/"},"nameOrigin":"The Three Stooges","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fba-chang-ngoc-the-three-stooges-2012.jpg%3Fsize%3D300"},"directors":["Bobby Farrelly,Peter Farrelly"],"actors":["Sean Hayes","Chris Diamantopoulos","Will Sasso"],"genres":["Phim Hài Hước"],"countries":["Mỹ"],"duration":92,"desc":"Cũng cái tên ‘Ba chàng ngốc’ nhưng là một phiên bản hoàn toàn khác, hoàn toàn mới của Hollywood . Nhiều người có thể nhớ tới bộ phim cùng tựa đề Việt của điện ảnh Ấn Độ vô cùng thành công năm 2009. Nhưng với “ Ba chàng ngốc ” lần này, khán giả sẽ được cười ở những tình huống rất khác, rất Mỹ .Đúng lúc này, trại trẻ mồ côi, ngôi nhà duy nhất của ba chàng ngốc đang đứng trước nguy cơ đóng cửa do thiếu thốn về tài chính. Nhiệm vụ cứu trại trẻ được trao lên đôi vai của 3 kẻ khờ. Trong 30 ngày, bắt buộc ba chàng phải kiếm được khoản tiền khổng lồ là 830.000 đô la. Lần đầu bước ra thế giới bên ngoài và sải bước trên những con phố của thành phố Big City , những anh hề này gặp một phụ nữ nóng bỏng có tên Lydia, cô ta đưa ra một đề nghị kiếm tiền khá dễ dàng cho họ. Tất cả những gì họ phải làm chỉ là kết liễu cuộc đời của người chồng khốn khổ, bệnh nặng của cô ta để kiếm được khoản tiền kếch xù có thể cứu lấy trại trẻ mồ côi.Rất cần tiền, khờ khạo, không manh mối, nhưng ba chàng ngốc cũng nhận thấy sự mờ ám trong kế hoạch của cô nàng xấu tính Lydia, đặc biệt là khi họ phát hiện ra mục tiêu của kế hoạch này lại chính là người bạn cũ Teddy, cũng từng sống tại trại trẻ mồ côi. Trong suốt bộ phim, hình ảnh ba chàng khờ khạo với những kiểu tóc không-thể-độc-đáo hơn cùng những tình tiết siêu hài hước sẽ khiến người xem “cười lăn, cười bò”.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557768554&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152352%26authkey%3DAOD3pmeLCpWGtsU&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}]},{"name":"Con Heo","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/con-heo_2236/xem-phim/"},"nameOrigin":"Madison County","year":"2011","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphim-con-heo-madison-county-2011.jpg%3Fsize%3D300"},"directors":["Katie StegemanNick Principe"],"actors":["Phim Kinh Dị","Phim Tâm Lý"],"genres":[""],"countries":["Mỹ"],"duration":null,"desc":"Một nhóm bạn trẻ đi dã ngoại ở vùng ngoại ô, trên đường họ đã ghé quá một thị trấn kì lạ, tại nơi đây họ đã gặp một kẻ giết người hàng loạt với bộ mặt nạ kì quái ..","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsk.googlevideo.com/videoplayback?id=96726947df12a892&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=WZfZXIaWOIf31gKYyp-YDg&susc=ph&app=fife&mime=video/mp4&dur=4922.119&lmt=1551330387643114&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771130&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=AB7550194A9541A84E878CB96359B27159AB9146B5012DB576979A461A7C44E6.713457E72CCDC497D0061D19ACAD411120803C89BFEC1BB1BEA32E0AD99DE80B&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednsk.googlevideo.com/videoplayback?id=96726947df12a892&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=WpfZXOe4A5mV1wL9qaHgDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4922.119&lmt=1551331538946070&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771130&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=63CD7495999A3EDCC4BF0913079CA67A6065BAAAB82717CE263AD1F93036B80A.B0498BEDE9509AEA7C88F9AD9957F8CFCA35525359FF1E5CBA02154BDCB0A87B&key=us0#f720p","default":true}]},{"name":"Biệt Đội Siêu Anh Hùng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/biet-doi-sieu-anh-hung_1816/xem-phim/"},"nameOrigin":"The Avengers","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbiet-doi-sieu-anh-hung-the-avengers-2012.jpg%3Fsize%3D300"},"directors":["Joss Whedon"],"actors":["Robert Downey","Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth","Scarlett Johansson","Jeremy Renner","Tom Hiddleston","Samuel L. Jackson"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":135,"desc":"The Avengers là một tập hợp những siêu anh hùng bao gồm: Captain America, Iron Man, Thor, Hulk,… Tuy nhiên, Captain America vẫn chưa công chiếu. Vì là tập hợp của một loạt siêu anh hùng trên nên việc đồng nhất về nhân vật cũng như cốt truyện, cách xây dựng là rất khó, điều đó nâng The Avengers trở thành một siêu phẩm hứa hẹn sẽ thu hút bất kỳ tín đồ nào của dòng phim này.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/4c18e7fee17d76f0d9d54c684e61c334/4c18e7fee17d76f0d9d54c684e61c334.playlist.m3u8","default":true}]},{"name":"Đi Khách","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/di-khach_1584/xem-phim/"},"nameOrigin":"The Girlfriend Experience","year":"2011","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdi-khach-the-girlfriend-experience-2011.jpg%3Fsize%3D300"},"directors":["Steven Soderbergh"],"actors":["Sasha Grey","Brian Koppelman","David Levien","Matt Damon"],"genres":["Phim Tâm Lý"],"countries":["Mỹ"],"duration":null,"desc":"Nữ diễn viên chính là “nữ hoàng film người lớn ” Sasha Grey , bộ film nói về cuộc đời của những cô gái gọi hạng sang …… Đời sống của những cô gái gọi hạng sang – những người đi khách với giá 10.000 USD/đêm và dễ dàng kiếm hơn 1 triệu USD/năm – sẽ được đạo diễn Steven Soderbergh đưa lên bộ phim mới nhất của ông: The Girlfriend Experience. Cách đây hơn 1 năm, Steven Soderbergh đã nói đến đề tài này nhưng mãi đến nay những chi tiết liên quan đến bộ phim trên mới rõ ràng hơn khi mà bộ film đc công chiếu tại liên hoan film Cannes. The Girlfriend Experience sẽ triển khai vào mùa hè 2009, ngay sau khi Steven Soderbergh hoàn tất bộ phim The Informant, có diễn viên Matt Damon thủ vai chính. Theo tạp chí Variety, kịch bản phim do bộ đôi Brian Koppelman, David Levien (đồng biên kịch phim Ocean’s 13) và Steven Soderbergh viết. Steven Soderbergh dự định tuyển diễn viên phim cấp ba đóng phim này thay vì mời các ngôi sao hạng A Hollywood…","embeds":[{"resolution":360,"embedUrl":"https://lh3.googleusercontent.com/9u996MG7486NB3XXupNnUfjeiIqfWSwxiQ6H05h0ItPrJYl9V6tLzg4FQ8I86Y4xj8Nt=m18","default":true},{"resolution":720,"embedUrl":"https://lh3.googleusercontent.com/9u996MG7486NB3XXupNnUfjeiIqfWSwxiQ6H05h0ItPrJYl9V6tLzg4FQ8I86Y4xj8Nt=m22","default":true}]},{"name":"Bạch Tuyết và Bảy Chú Lùn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bach-tuyet-va-bay-chu-lun_1000/xem-phim/"},"nameOrigin":"Snow White and the Seven Dwarfs","year":"1937","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbach-tuyet-va-bay-chu-lun-snow-white-and-the-seven-dwarfs.jpg%3Fsize%3D300"},"directors":["Adriana Caselotti","Harry Stockwell","Lucille LaVerne","Moroni Olsen","Billy Gilbert"],"actors":["Phim Hoạt Hình"],"genres":[""],"countries":["Mỹ"],"duration":83,"desc":"Ngày xửa ngày xưa, vào một ngày nọ, một hoàng hậu mải mê nhìn cảnh tuyết rơi tuyệt đẹp ngoài cửa sổ khi đan len. Vì quá say sưa ngắm nhìn, bà vô ý để que đan đam vào ngón tay và một giọt máu nhỏ xuống những bông tuyết đọng lại trên bậu cửa. Nhịn giọt máu đào trên nền tuyết trắng, bà tự nhủ: \"Ước gì mình có một đứa con gái có da trắng như tuyết, môi đỏ như son và tóc đen như mun\". Chẳng lâu sau, ước mơ của bà thành hiện thực. Hoàng hậu sinh hạ được một công chúa và đặt tên là Bạch Tuyết. Cũng không may, hoàng hậu qua đời ngay khi Bạch Tuyết chào đời. Và cuộc đời nàng công chúa xinh đẹp phải trải qua bao nhiêu biến cố dưới sự độc ác của bà dì ghẻ...","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/44939f374ac3fab046fa2f64326da883/44939f374ac3fab046fa2f64326da883.playlist.m3u8","default":true}]},{"name":"Bẩy Võ Sĩ Samurai","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bay-vo-si-samurai_831/xem-phim/"},"nameOrigin":"Seven Samurai","year":"1954","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbay-vo-si-samurai-seven-samurai.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Toshirô Mifune","Takashi Shimura","Keiko Tsushima"],"genres":["Phim Cổ Trang","Phim Võ Thuật"],"countries":["Nhật Bản"],"duration":202,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://4.bp.blogspot.com/KJepFH1Wqzn4Vpy4NiZhv36XI9X9Z6_PQV5oTgUM3i50eYcYdHNYQmmckbtMQ_dQaGvE1exY3KY=m18","default":false},{"resolution":720,"embedUrl":"https://4.bp.blogspot.com/KJepFH1Wqzn4Vpy4NiZhv36XI9X9Z6_PQV5oTgUM3i50eYcYdHNYQmmckbtMQ_dQaGvE1exY3KY=m18","default":false}]},{"name":"Trợ lý Ma Cà Rồng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tro-ly-ma-ca-rong_758/xem-phim/"},"nameOrigin":"Vampire's Assistant","year":"2009","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftro-ly-ma-ca-rong-2009-sub-viet-vampire-s-assistant-2009.jpg%3Fsize%3D300"},"directors":["John C. Reilly","Josh Hutcherson","Chris Massoglia","Jessica Carlson","Michael Cerveris","Ray Stevenson","Patrick Fugit","Daniel Newman","Morgan Saylor","Don McManus","Colleen Camp"],"actors":["Phim Hành Động","Phim Phiêu Lưu","Phim Kinh Dị"],"genres":[""],"countries":["Mỹ"],"duration":109,"desc":" Darren Shan là một cậu bé bình thường. Darren và cậu bạn Steve đã cố gắng làm việc chăm chỉ để có chiếc vé xem chương trình xiếc ảo thuật đang diễn ra trên phố. Họ cùng nhau đến rạp xiếc lưu động và xem show diễn \"Cirque du Freak\", nơi này họ thấy có nhiều hành động cực kỳ lạ lùng của những anh chàng người sói và người đàn bà có râu. Steve và Darren nghĩ rằng tất cả chỉ là một trò bịp bợm cho đến khi ma cà rồng-Larten Crepsley đến mang theo một nhện rất độc…","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/6ced503c83c9648cb83063e2c5265661/6ced503c83c9648cb83063e2c5265661.playlist.m3u8","default":true}]},{"name":"Kẻ Xấu Đẹp Trai","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ke-xau-dep-trai_516/xem-phim/"},"nameOrigin":"Megamind","year":"2010","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fke-xau-dep-trai-megamind.jpg%3Fsize%3D300"},"directors":["Brad Pitt","Will Ferre"],"actors":["Phim Hài Hước","Phim Hoạt Hình"],"genres":[""],"countries":["Mỹ"],"duration":96,"desc":"Megamind đưa người xem bước vào thế giới của những siêu nhân và ác nhân. Nhân vật chính của phim là Megamind - tên tội phạm thông minh nhất thế giới và cũng là kẻ thất bại nhất. Trong suốt nhiều năm liền, hắn cố gắng chinh phục thành phố Metro City nhưng đều bị siêu anh hùng khoác áo choàng Metro Man đánh bại. Trong khi Metro Man luôn được người dân thành phố tung hô và tán dương thì Megamind luôn bị mọi người căm ghét và xa lánh. Một ngày, âm mưu hoàn hảo của hắn đã hạ gục được Metro Man.Thành phố Metro City rơi vào tay Megamind. Tuy nhiên, sau khi Metro Man ra đi thì chẳng còn ai là đối thủ của Megamind nữa. Vì lâu ngày không được chiến đấu, hắn rơi vào tâm trạng buồn bã, chán nản và quyết định tự tạo ra một siêu anh hùng mới để chống lại mình. Tuy nhiên, tên siêu nhân mới được tạo nên lại trở thành một kẻ tội phạm và đi phá hoại khắp nơi. Lúc này, ác nhân Megamind buộc phải ra tay vì thành phố Metro City xinh đẹp. Sánh vai cùng với Megamind và Metro Man là nữ phóng viên gợi cảm Roxanne Ritchi. Một cuộc phiêu lưu mới bắt đầu diễn ra...Megamind có cách dẫn chuyện khá hấp dẫn và lôi cuốn ngay từ những giây phút đầu tiên. Thời ấu thơ của Megamind và Metro Man được giới thiệu với những nét đối lập nhau giữa siêu anh hùng và tội phạm tạo nên sắc thái hài hước, có phần châm biếm cho bộ phim. Những câu thoại hóm hỉnh của các nhân vật khiến khán giả bật cười liên tục trong suốt chiều dài hơn 90 phút phim. Tính cách các nhân vật chính được xây dựng rõ rệt nhưng đều toát lên vẻ hài hước, đáng yêu thu hút không chỉ trẻ em mà cả người lớn.Phần hình ảnh của Megamind được thực hiện rất trau chuốt, tỉ mỉ, đặc biệt là tạo hình của nhân vật chính - ác nhân Megamind. Chỉ đạo nghệ thuật Timothy J. Lamb cho biết: \"Thiết kế ban đầu của Megamind giống như một gã đầu to, nhưng thiết kế của nhân vật cần phải hài hòa với câu chuyện. Megamind vui tính và có cảm tình với Roxanne nên điều quan trọng là phải đảm bảo rằng thiết kế nhân vật phù hợp với tất cả yếu tố trong chuyện phim, chứ không chỉ đơn giản là một gã người ngoài hành tinh xanh lơ giận dữ\".Các nhân vật trong phim đều có những tạo hình riêng biệt, gây ấn tượng với khán giả. Nếu như ác nhân Megamind \"đập vào mắt người xem\" là chiếc đầu to dị thường và làn xa màu xanh lơ thì siêu nhân Metro Man là hình ảnh một chàng trai vạm vỡ dẻo mỏ, tự tin hơn người. Nhân vật nữ Roxanne Ritchi được xây dựng vừa có vẻ đẹp về ngoại hình, lại vừa mạnh mẽ ở tính cách khiến mọi chàng trai trong phim đều bị \"hạ gục\". Hiệu ứng 3D của phim có chiều sâu, màu sắc tươi sáng, sắc nét, đem lại cảm giác sống động cho khán giả.Âm nhạc trong phim do hai nhà soạn nhạc Hans Zimmer và Lorne Balfe đóng góp một phần rất quan trọng làm nên sức hấp dẫn của Megamind. Các giai điệu xuất hiện đúng lúc ở mỗi cảnh quay làm tăng hiệu quả cho cảm xúc người xem. Âm nhạc cũng thể hiện cho sự đối lập giữa các nhân vật trong Megamind và được lồng ghép một cách hợp lý. Đặc biệt, người hâm mộ vua nhạc Pop Michael Jackson cũng có cơ hội nghe lại ca khúc Bad nổi tiếng của anh khi xem bộ phim này.Vẫn là câu chuyện về cuộc chiến giữa cái Ác và cái Thiện nhưng Megamind không đi theo con đường thông thường của thể loại siêu nhân. Phim lấy nhân vật phản diện làm trung tâm câu chuyện và cho người xem thấy rằng không phải tất cả kẻ ác đều xấu, và không phải tất cả các anh hùng đều vĩ đại. Megamind là một ác nhân kém cỏi khi làm chuyện xấu xa, nhưng lại là một con người xuất chúng khi thực hiện điều tốt. Megamind đã phá vỡ nhiều quy tắc truyền thống của dòng phim siêu anh hùng và đưa tới cho khán giả những cái nhìn mới về các nhân vật này. Phim đi ngược lại những cái thông thường và biến sự \"ngược đời\" ấy trở thành một câu chuyện hấp dẫn, thuyết phục người xem.Mặc dù mô-típ của phim khá giống Despicable Me của hãng Universal nhưng Megamind khai thác nhiều hơn các khía cạnh khác nhau của chuyện \"người tốt muốn làm kẻ xấu\". Sự kết hợp giữa nhiều yếu tố như hành động, tình bạn chí thiết, tình yêu lãng mạn, hài hước, viễn tưởng đã khiến Megamind trở thành một tác phẩm thú vị, có ý nghĩa và lôi cuốn người xem tới những phút cuối cùng. Mặc dù đôi chỗ các tình tiết trong phim vẫn chưa được hợp lý, sự \"bất hợp lý\" đó lại trở nên hóm hỉnh, hài hước và tạo nên tiếng cười nơi khán giả.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/a2d1095401048cbcaf0b79cd9cd1587e/a2d1095401048cbcaf0b79cd9cd1587e.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/megamind-2010/1"},{"name":"Cuộc chiến chó mèo 2","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-chien-cho-meo-2_509/xem-phim/"},"nameOrigin":"Cats & Dogs: The Revenge of Kitty Galore","year":"2010","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-chien-cho-meo-2-cats-dogs-the-revenge-of-kitty-galore.jpg%3Fsize%3D300"},"directors":["James Marsden","Nick Nolte","Christina Applegate","Katt Williams","Bette Midler","Neil Patrick Harris","Sean Hayes","Wallace Shawn","Roger Moore","Joe Pantoliano"],"actors":["Phim Hài Hước","Phim Hoạt Hình"],"genres":[""],"countries":["Mỹ"],"duration":82,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/9b7d3fcf16774059aec1e59d68b37599/9b7d3fcf16774059aec1e59d68b37599.playlist.m3u8","default":true}]},{"name":"Mất Tích Ở Berlin","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mat-tich-o-berlin_10003/xem-phim/"},"nameOrigin":"Berlin Syndrome","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmat-tich-o-berlin-berlin-syndrome-2017.jpg%3Fsize%3D300"},"directors":["Cate Shortland"],"actors":["Teresa Palmer","Max Riemelt","Cem Tuncay","Lucie Aron","Matthias Habich"],"genres":["Phim Tâm Lý"],"countries":["Mỹ"],"duration":120,"desc":"Phim Mất Tích Ở Berlin (Berlin Syndrome) 2017 Khi Clare lần đầu tiên đến Berlin, ngay lập tức cô đã rơi vào tình yêu với Andi, một tình yêu nồng nàng và rạo rực đến nổi họ không thể tách rời nhau. Nhưng đằng sau tình yêu ngọt ngào đó là một chiếc bẫy đã được giăng từ trước. Mọi chuyện sẽ xảy ra như thế nào với Clare?","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednls.googlevideo.com/videoplayback?id=b60d3e738dfdad18&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednls&ms=nxu&mv=u&pl=25&sc=yes&ei=2onZXPOuHYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6957.255&lmt=1552016910359358&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767674&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8486BBFA16D4BEE57E59A0D8C69AC725676B134D2C87A12E8332576C0F3FC895.8F28FCE4B90CDC747DA6AEE4BC885149FE72D6739AF622CE1F28E91A4A824100&key=us0","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5ednsr.googlevideo.com/videoplayback?id=d048ae073ea167a1&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsr&ms=nxu&mv=u&pl=25&sc=yes&ei=2onZXLazHdPI8gOtnJDoCg&susc=ph&app=fife&mime=video/mp4&dur=6957.255&lmt=1552014874791557&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767674&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=A4208DABA6059BEB29BB6B75DDEB2AE735E0A12B21BB84BC9CA12B25AE8898ED.3BB0229FEFFA300C173570A339F7688D0ADBEBC3F452317362720EE58850AF3F&key=us0","default":false}]},{"name":"Cao Thủ Thái Cực Quyền","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cao-thu-thai-cuc-quyen_10060/xem-phim/"},"nameOrigin":"Tai Chi Pioneer","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcao-thu-thai-cuc-quyen-tai-chi-pioneer-2016.jpg%3Fsize%3D300"},"directors":["Sha Xuezhou"],"actors":["Sha Xuezhou","Zheng Shuang"],"genres":["Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":98,"desc":"Phim Cao Thủ Thái Cực Quyền Tai Chi Pioneer kể về Liễu Mục Phàm – một cao thủ thái cực quyền mở võ quán truyền dạy võ công với mong muốn giúp đỡ những người yếu đuối đòi lại công bằng, nêu cao tinh thần thượng võ. Thế nhưng các thế lực xấu xa liên tục tìm đến võ quán của anh gây sự khiến Mục Phàm và các đệ tử bị cuốn vào rắc rối. Liệu chính nghĩa có chiến thắng?","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednsk.googlevideo.com/videoplayback?id=934e6b88a6181926&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=SZfZXIDzHcby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&dur=5871.908&lmt=1551300380788351&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771113&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B705C2764878E7706E019B130E3E60B22339948DC76D0D8542070DE3D524173A.CA7D49905B7FA4667DAB0FA691F43F56E2AA582F56ACD9F0439E550530605B83&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednsk.googlevideo.com/videoplayback?id=934e6b88a6181926&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsk&ms=nxu&mv=u&pl=25&sc=yes&ei=SZfZXPrAIMvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5871.908&lmt=1551305773672885&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771113&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8144D143DD3BB62FADE064D04E666878A44255FB264F2CF6445BD8A630B74D8A.E5FB281A5F391DBA13EBC47E0CB5D5B1AD60D4D69F8447473DBF41F539BCC14C&key=us0#f720p","default":true}]},{"name":"Quá Nhanh Quá Nguy Hiểm 8","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/qua-nhanh-qua-nguy-hiem-8_9958/xem-phim/"},"nameOrigin":"Qua Nhanh Qua Nguy Hiem phan 8","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fqua-nhanh-qua-nguy-hiem-8-qua-nhanh-qua-nguy-hiem-phan-8-2017.jpg%3Fsize%3D300"},"directors":["F. Gary Gray"],"actors":["Vin Diesel","Dwayne Johnson","Jason Statham","Kurt Russell","Scott Eastwood","Lucas Black","Charlize Theron","Jordana Brewster","Elsa Pataky","Nathalie Emmanuel"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"Tiếp nối phần phim Fast & Furious 7 năm 2015 với thành công là một trong những bộ phim đạt doanh thu phòng vé một tỷ đô la nhanh nhất và là tít phim lớn thứ sáu mọi thời đại, phần mới nhất của một trong các loạt phim nổi tiếng và có sức sống bền bỉ nhất thế giới đã ra đời với tên gọi Fast & Furious 8.Dom và Letty hiện đang đi hưởng tuần trăng mật. Brian cùng Mia đã quyết định từ giã sự nghiệp. Các thành viên còn lại của nhóm cũng đã được minh oan và dần trở về với cuộc sống bình thường. Nhưng một người phụ nữ bí ẩn (do nữ diễn viên đoạt giải Oscar Charlize Theron thủ vai) đã dẫn dụ Dom vào thế giới tội phạm mà anh dường như không thể thoát ra được và thậm chí phản bội lại cả những người thân thiết nhất, họ sẽ phải trải qua những thử thách cam go mà họ chưa từng đối mặt.Từ bờ biển Cuba tới những con phố của New York cho đến đồng bằng băng giá của vùng cực biển Barents, đội ngũ ưu tú này sẽ tung hoành ngang dọc khắp địa cầu để ngăn chận âm mưu làm thế giới hỗn loạn của một kẻ vô chính phủ và mang người đàn ông đã gắn kết họ thành một gia đình trở về.Trong Fast & Furious 8, Vin Diesel sẽ trở lại cùng dàn sao từ các phần trước gồm Dwayne Johnson, Jason Statham, Michelle Rodriguez, Tyrese Gibson, Chris “Ludacris” Bridges, Nathalie Emmanuel, Elsa Pataky và Kurt Russell. Bên cạnh Theron, bộ phim còn chào đón thêm các diễn viên mới khác là Scott Eastwood và diễn viên đoạt giải Oscar Helen Mirren. Bộ phim được chỉ đạo bởi đạo diễn F. Gary Gray (Straight Outta Compton), thực hiện sản xuất là ê kíp cũ với các nhà sản xuất Neal H. Moritz, Michael Fottrell và Diesel.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5edns6.googlevideo.com/videoplayback?id=ad2cd0159dfce1ce&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=H6DZXPzQPNCJ1wLo47_YAw&susc=ph&app=fife&mime=video/mp4&dur=7686.524&lmt=1552837514046590&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773376&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=0112B1A3CA46AF6CD5CB3F9D94C7F4F55709331604E9865DDAD0CFC0E545F88E.D358CF0045B376D8D9250C510DEC5C0911BE5695F0CB97005DE2E60A0D00D5A6&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6ne6.googlevideo.com/videoplayback?id=ad2cd0159dfce1ce&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=IKDZXOTDBsby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7686.524&lmt=1553035438029493&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773376&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=D30D7353E889C9FBEEF02B3981B32821734688C75C14BB02D1CB345E04BBC8C2.8406683E30972E2A598DE5288543D211C8480C3412CC95D649916E8358F0489A&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5e6ne6.googlevideo.com/videoplayback?id=ad2cd0159dfce1ce&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ne6&ms=nxu&mv=u&pl=25&sc=yes&ei=IKDZXOOMCYmu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7686.524&lmt=1553035435218875&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773376&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=B49874D5A34981F54FB5AAC1156E837857E25F29A59612B5ED806D7D73C285EA.7FCF7C81C1222D0441BFD73A413C3EEA014B23D2804FBF1436D47CA8B9B88917&key=us0#f1080p","default":true}]},{"name":"Quái nhân Deadpool 2","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quai-nhan-deadpool-2_9953/xem-phim/"},"nameOrigin":"Deadpool 2","year":"2018","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquai-nhan-deadpool-2-deadpool-22-2018.jpg%3Fsize%3D300"},"directors":["David Leitch"],"actors":["Ryan Reynolds","David Harbour"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":null,"desc":" Nam diễn viên Ryan Reynolds đã tung ra đoạn video nhá hàng phim Deadpool 2 cực kỳ vui nhộn mang tên \"No Good Deed\". Anh khả ái đã trở lại và ăn hại hơn gấp bội phần, làm màu với chém gió thì nhiều mà hành động chẳng được bao nhiêu... Deadpool là nhân vật phản anh hùng (anti-hero) cực kỳ được yêu thích trong vũ trụ Marvel. Bộ phim solo của \"anh khả ái dọn dẹp ngang trái\" vào năm 2016 đã thành công rực rỡ với doanh thu lên đến 783 triệu USD. Deadpool 2 dự kiến sẽ công chiếu vào ngày 2/3/2018.","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5edn7s.googlevideo.com/videoplayback?id=df14eb763f72d088&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7s&ms=nxu&mv=u&pl=25&sc=yes&ei=H6DZXN-WIpfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=7169.323&lmt=1552703593483679&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773375&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=D393C121A19D48CF96B6517B8FDAC0412E623C6655274B5BBCD6F37A4CEEF430.0185BE9D4269EC08E8525654DF8A8BD883BC3F7367B02FBA0F805E8B504065EB&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5edn7s.googlevideo.com/videoplayback?id=df14eb763f72d088&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7s&ms=nxu&mv=u&pl=25&sc=yes&ei=H6DZXM-yK4KC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7169.323&lmt=1552711622146534&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773375&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=34762F9A1DF043069F2183BDD1A735BC4404164CF17DDCA3A3FAFC81E24FAD1B.B48BFBE22D7B7309BE06D9E8F02DA5EA69476354EC9B9DA96D9F939E22D08ADE&key=us0#f720p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/deadpool-2-2018/1"},{"name":"Cảnh Sát Siêu Nhiên","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/canh-sat-sieu-nhien_9844/xem-phim/"},"nameOrigin":"Paranormal Cop","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcanh-sat-sieu-nhien-paranormal-cop-2017.jpg%3Fsize%3D300"},"directors":["Từ Gia Huy"],"actors":["Lưu Vũ Kỳ","Lý Xán Sâm","Trần Dĩ Mạn"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Viễn Tưởng"],"countries":["Trung Quốc"],"duration":72,"desc":"Sau khi bị tai nạn trong lúc hạnh động, mắt phải của cảnh sát Lý Chí Minh có khả năng nhìn thấy những thứ mắt thường không thể nhìn thấy. Cùng lúc đó, vợ anh cũng mất tích một cách bí ẩn. Nhận thấy chuyện này liên quan đến vụ án phụ nữ mất tích hàng loạt gần đây. Càng bắt tay vào điều tra anh càng khám phá ra nhiều điều không ngờ tới","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6nsz.googlevideo.com/videoplayback?id=d296e71361be78cd&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsz&ms=nxu&mv=u&pl=25&sc=yes&ei=JqDZXJatG8nF1gL-mYdw&susc=ph&app=fife&mime=video/mp4&dur=4340.320&lmt=1552801877132527&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773382&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=3C3521B53268BB78CDD9E3057A8D2A46470B7910AE59FD7D9569A4047AC7B533.15F7692804B4DD3FE1D03366FA2AC3F632EF969E9D7E4B6C56462BEB8E53D092&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednsl.googlevideo.com/videoplayback?id=d296e71361be78cd&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=JqDZXM-AIaSK8gOIx6ngAg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4340.320&lmt=1552814854772606&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773382&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3C3A4251A01A9A7E85274850C6ADEE9BB2A14F94079FFC068E0E1F5D39ECFC45.DF7164B322E7CD09664853D4ADAD005AC1CE274F840E81C3770B6024FA4F579D&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r3---sn-4g5ednsl.googlevideo.com/videoplayback?id=d296e71361be78cd&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=u&pl=25&sc=yes&ei=JqDZXLu9I5rj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4340.320&lmt=1552814961671952&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773382&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=B7759B6A049C166E238823DB9BDB5D4B87169448C54825A2CC16F7F5B54F581C.026C24E571CA9BE4E445E00A6B05314FE7A2EFCB6D6A06648342236B4C65C682&key=us0#f1080p","default":true}]},{"name":"Phi Vụ Kim Cương","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phi-vu-kim-cuong_9827/xem-phim/"},"nameOrigin":"Diamond Cartel","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphi-vu-kim-cuong-diamond-cartel-2017.jpg%3Fsize%3D300"},"directors":["Salamat Mukhammed-Ali"],"actors":["Peter O'toole","Armand Assante","Olivier Gruner"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":100,"desc":"Phi vụ mua bán kim cương giữa hai ông trùm tội phạm bổng đổ bể khi số đá quý đó bị nữ sát thủ Aliya cướp đi. Trên đường trốn chạy bọn xã hội đen cùng tình nhân là Ruslan, quá khứ của Aliya từ từ được hé lộ, và kéo theo đó là những tranh chấp đổ máu để giành lấy kim cương lẫn tình yêu.","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5edned.googlevideo.com/videoplayback?id=e806e4a0f0c73e34&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edned&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=LKDZXJrKOsyX8gOqvqXIDw&susc=ph&app=fife&mime=video/mp4&dur=5979.347&lmt=1551839557156382&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773388&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=4CC572B3A73C79CF086BC35DC988EAE1EB42CEC8BEF5C4FA9D71FC05A351E2E4.CF8ECA1F02FFE7F187BB3C41E6EEC4465B1C318977B13B14E5E878695BA51934&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5edned.googlevideo.com/videoplayback?id=e806e4a0f0c73e34&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edned&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=LKDZXJeEPYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5979.347&lmt=1551841561118078&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773389&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=62D24FE08832268365B68D45D5F1D9BC2D1161BBE0C8170A570757C06DBA6796.09DE838B4D96B88750CA1B66B4B1CC6E41A7654DD7378CF4B4945501B73227F1&key=us0#f720p","default":true}]},{"name":"Giấc Mộng Tây Du 2: Thiết Phiến Công Chúa","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/giac-mong-tay-du-2-thiet-phien-cong-chua_9809/xem-phim/"},"nameOrigin":"The Dream Journey 2","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fgiac-mong-tay-du-2-thiet-phien-cong-chua-the-dream-journey-2-2017.jpg%3Fsize%3D300"},"directors":["Đàm Tiếu"],"actors":["Cửu Khổng","Tạ Miêu","Hoàng Nhất Lâm"],"genres":["Phim Cổ Trang","Phim Thần Thoại","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":91,"desc":"Phim Giấc Mộng Tây Du 2: Thiết Phiến Công Chúa: Tại ải Hỏa Diệm Sơn, nhằm phát huy hết pháp lực quạt ba tiêu, Tôn Ngộ Không phụng mệnh Bồ Tát xuyên không quay về 500 trước để lấy bằng được giọt nước mắt của Thiết Phiến công chúa. Từ đây, hành trình thử thách Ngộ Không vô cùng gian nan khi vừa phải thuyết phục công chúa, vừa đối đầu với bọn yêu quái xảo quyệt","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5e6nzl.googlevideo.com/videoplayback?id=707c704b86bb9461&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=iJfZXImZLJaw1wKDxYKgDw&susc=ph&app=fife&mime=video/mp4&dur=5460.172&lmt=1552662197511980&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771176&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=2C190EE253D3AA11205979B747EB4D4829778981E761809315DE17C622560C72.773CDDE2CB6E1EC0E6F27F46A1651BF73E9A9A617F633245F84D6DC1C6A4476F&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nzl.googlevideo.com/videoplayback?id=707c704b86bb9461&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzl&ms=nxu&mv=u&pl=25&sc=yes&ei=iJfZXNbmNYKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5460.172&lmt=1552684750207817&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771176&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=D081E72B7E39D565726EF9906B2C67B1BCD6CAEB301A70530BF8BCBB951A1C3B.BA7C19033F8FD516C34311479B32B4979B2AAE74048DA1E4A812E7DCC2F64CBB&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r6---sn-4g5edn7y.googlevideo.com/videoplayback?id=707c704b86bb9461&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7y&ms=nxu&mv=u&pl=25&sc=yes&ei=iJfZXNTvOJmR1wLfn5GgBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5460.172&lmt=1552684824171998&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771176&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=513D3F0375C049F31477B907217202C5488C75D227FB94EA2490300B67B347D4.1FE087876FC8B238D01EAC1C0CB460BAA2A9244061D894A1E6F69B8FAEA8C9FF&key=us0#f1080p","default":true}]},{"name":"Tin tặc mũ đen","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tin-tac-mu-den_9802/xem-phim/"},"nameOrigin":"Blackhat / Hacker Mũ Đen","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftin-tac-mu-den-blackhat-hacker-mu-den-2015.jpg%3Fsize%3D300"},"directors":["Michael Mann"],"actors":["Chris Hemsworth","Viola Davis"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":133,"desc":"Phim Hacker Mũ Đen kể về chàng tin tặc thiên tài Nicholas Hathaway (Chris Hemsworth thủ vai) được cơ quan chính phủ từ Mỹ và Trung Quốc thuê để truy tìm tổ chức tội phạm bí ẩn được cầm đầu bởi một tin tặc, đang gây ra hàng loạt sự kiện kinh hoàng. Chạy đua với thời gian, trước khi có thêm nhiều tội ác được gây ra, “tin tặc mũ đen” Chris Hemsworth phải dấn thân vào cuộc săn lùng nguy hiểm này với sự đồng hành của cộng sự xinh đẹp do Thang Duy thủ vai.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6nzs.googlevideo.com/videoplayback?id=b2806267c79d82dd&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=m&pl=25&sc=yes&ei=_qDZXInjIIzn1wLMsZmIAg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6456.122&lmt=1549969278389749&mt=1557766294&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773598&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=82A4EB323B6FCC283D8C75A45AB1FCA4EBF5A9F0679F3C82F281AE18229D53B5.47CF996FE541DA0C04ED0FF4D490ECF0D906B7FE1A8C1FD42F7965E358013477&key=us0","default":false},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nzs.googlevideo.com/videoplayback?id=b2806267c79d82dd&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nzs&ms=nxu&mv=m&pl=25&sc=yes&ei=_qDZXPD3IIuv1wLzkojIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6456.122&lmt=1549969498584810&mt=1557766354&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773598&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=496FB45885E6189D25FA002EECA3F3EB294F2A6EE1C8F57C3DE9E7CD98314A27.2037B8DBC48350C3C54A10C0E20ACC8E9F8E243C4A9F10A0F279BDC67DC8E4F8&key=us0","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5e6nss.googlevideo.com/videoplayback?id=0760d6a250bc354a&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nss&ms=nxu&mv=m&pl=25&sc=yes&ei=_qDZXO_tIMWK8gPLzbGYCw&susc=ph&app=fife&mime=video/mp4&dur=6456.122&lmt=1549961334036384&mt=1557766294&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773598&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=9C86F2123DB2A8C817AA631E3015FE73320A0B119CB6F271C51D7D64887ECAFA.735F51793203B65A43ECDB1D5CAC13DF75DC0F4DF418C936EF1B005B55819AAA&key=us0","default":false}]},{"name":"Moontrap Nền Văn Minh Đã Mất Từ Lâu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/moontrap-nen-van-minh-da-mat-tu-lau_9807/xem-phim/"},"nameOrigin":"Moontrap: Target Earth/Mục Tiêu Trái Đất Là Moontrap","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmoontrap-nen-van-minh-da-mat-tu-lau-moontrap-target-earthmuc-tieu-trai-dat-la-moontrap-2017.jpg%3Fsize%3D300"},"directors":["Robert Dyke"],"actors":["Sarah Butler","Charles Shaughnessy","Damon Dayoub"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":85,"desc":"Một tàu vũ trụ cổ đại lãng quên từ lâu đã phát hiện trên Trái Đất. Điều tra được thực hiện bởi Scout chở cô đến mặt trăng và rồi cô gặp các máy ấn tượng giữ gìn sự khôn ngoan của nền văn minh đã mất từ lâu.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednz7.googlevideo.com/videoplayback?id=2db8de98b03353d1&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=PKDZXNS2L8qc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&dur=5126.780&lmt=1552497560581023&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773404&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=59B4C6BD859F99D0340C541CC1CEEF0CD0E44BB5C4EB8944F17975F3B1284455.88AEB0E07C72674762E8592B77A500F24C4E4C922E3FAB0A4C72CE458FB52076&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nls.googlevideo.com/videoplayback?id=2db8de98b03353d1&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nls&ms=nxu&mv=u&pl=25&sc=yes&ei=PKDZXLj_NJvJ8gP8mKfYBw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5126.780&lmt=1552500211682653&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773404&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=93BF1011DC45C329ACC16444740A9E80DE066AE3D279C3F075ED8B3D4D4BD951.3AEE5F3EE26ECEAC3413FEE08B85D74F733D7A3BB3772DA55629AAFA007DC5CE&key=us0#f720p","default":true}]},{"name":"Mùa Săn Bắn: Hành Trình Ngớ Ngẫn","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/mua-san-ban-hanh-trinh-ngo-ngan_9772/xem-phim/"},"nameOrigin":"Open Season: Scared Silly","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmua-san-ban-hanh-trinh-ngo-ngan-open-season-scared-silly-2017.jpg%3Fsize%3D300"},"directors":["David Feiss"],"actors":["Will Townsend","Melissa Sturm","Trevor Devall"],"genres":["Phim Hài Hước","Phim Hoạt Hình","Phim Thuyết Minh","Phim Thiếu nhi"],"countries":["Mỹ"],"duration":84,"desc":"Elliot, Boog là hai người bạn thân tuy to xác nhưng rất yêu thương đồng loại, họ biết mùa săn bắn thú rừng đã đến cho nên Elliot, Boog đã quyết sẽ đi tránh nạn mà cũng như tạo cho mình một chuyến phiêu lưu đầy hài hước.Hai người đi đến đâu cũng làm náo động tới đó và kết bạn với rất nhiều sinh vật khác đặc biệt là những con thú nhỏ nhắn, sau đó họ trãi qua một cuộc phiêu lưu bay lượn trên trời bằng chiếc máy bay nhưng rồi lại xảy ra những tình huống dở khóc dở cười khiến họ cùng những người bạn gặp nạn phải gặp rắc rối.","embeds":[{"resolution":360,"embedUrl":"https://lh3.googleusercontent.com/zHMKTWm6pfbesj8rVkHWPp64DLAhTOYRUBYOMQy3DArzoRif-rrx0nsPrlwJK_8WgJ4BAF2mvrVIz0lSvTyRufiX4M_p61JG9IYEZroiGahr7rPUk5bwMzMmn2qzFq8Nw6EtAg=m18","default":false},{"resolution":720,"embedUrl":"https://lh3.googleusercontent.com/zHMKTWm6pfbesj8rVkHWPp64DLAhTOYRUBYOMQy3DArzoRif-rrx0nsPrlwJK_8WgJ4BAF2mvrVIz0lSvTyRufiX4M_p61JG9IYEZroiGahr7rPUk5bwMzMmn2qzFq8Nw6EtAg=m22","default":true},{"resolution":1080,"embedUrl":"https://lh3.googleusercontent.com/zHMKTWm6pfbesj8rVkHWPp64DLAhTOYRUBYOMQy3DArzoRif-rrx0nsPrlwJK_8WgJ4BAF2mvrVIz0lSvTyRufiX4M_p61JG9IYEZroiGahr7rPUk5bwMzMmn2qzFq8Nw6EtAg=m37","default":false}]},{"name":"Nữ Hoàng Tuyết 3: Lửa và Băng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nu-hoang-tuyet-3-lua-va-bang_9700/xem-phim/"},"nameOrigin":"The Snow Queen 3: Fire and Ice","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnu-hoang-tuyet-3-lua-va-bang-the-snow-queen-3-fire-and-ice-2017.jpg%3Fsize%3D300"},"directors":["Aleksey Tsitsilin"],"actors":["Garik Kharlamov","Ivan Okhlobystin"],"genres":["Phim Hành Động","Phim Hài Hước","Phim Hoạt Hình"],"countries":["Mỹ"],"duration":80,"desc":"Phim Nữ Hoàng Tuyết 3: Lửa và Băng, The Snow Queen 3: Fire and Ice 2016Vướng phải đủ loại rắc rối là món quà hiếm có của gia đình Kai và Gerda. Lần này, họ phải trưởng thành và đối mặt với những vấn đề mang tầm toàn cầu.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767185&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152399%26authkey%3DAHGL8emhSKiWSU0&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}]},{"name":"Liên Minh Công Lý Bóng Đêm","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/lien-minh-cong-ly-bong-dem_9654/xem-phim/"},"nameOrigin":"Justice League Dark","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Flien-minh-cong-ly-bong-dem-justice-league-dark-2017.jpg%3Fsize%3D300"},"directors":["Jay Oliva"],"actors":["Enrico Colantoni","Jason O'Mara","Matt Ryan","Camilla Luddington","Ray Chase","Roger Cross"],"genres":["Phim Hành Động","Phim Hoạt Hình","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":66,"desc":"Phim Liên Minh Công Lý Bóng Tối, Justice League Dark 2017 là những gì nó giống như cái tên. Đó là mặt trái của công lý.Một nhóm người hùng siêu nhiên người liên kết với nhau một cách lỏng lẻo để đưa vào nhằm chống lại các mối đe dọa huyền bí, các mối đe dọa siêu nhiên - mối đe dọa mà các Justice League thực tế có thể bất lực chống lại.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767185&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152379%26authkey%3DAEnqfX-gT2HQvWk&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/justice-league-dark-2017/1"},{"name":"Cuộc Chiến Thập Tự","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cuoc-chien-thap-tu_9696/xem-phim/"},"nameOrigin":"Cross Wars","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuoc-chien-thap-tu-cross-wars-2017.jpg%3Fsize%3D300"},"directors":["Patrick Durham"],"actors":["Danny Trejo","Vinnie Jones","Brian Austin Green"],"genres":["Phim Hành Động","Phim Hình Sự"],"countries":["Mỹ"],"duration":98,"desc":"Là một bộ phim Hành Động, Hình Sự Cross Wars - Cuộc Chiến Thập Tự 2017với sự tham gia của Calln (Brian Austin Green thủ vai) tái xuất cùng đồng đội của mình để chống lại kẻ thủ ác Gunnar (Vinnie Jones thủ vai) với sự giúp đỡ của Frank Nitti (Tom Sizemore) thám tử ở thành phố Los Angeles.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767185&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152394%26authkey%3DALNJ4s4ZGYQhHjw&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/cross-wars-2017/1"},{"name":"Thần Kiếm","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/than-kiem_9626/xem-phim/"},"nameOrigin":"Sword Master","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthan-kiem-sword-master-2016.jpg%3Fsize%3D300"},"directors":["Nhĩ Đông Thăng"],"actors":["Đang cập nhật"],"genres":["Phim Cổ Trang","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":90,"desc":"Phim Thần Kiếm, Sword Master kể về câu chuyện của Tam Thiếu Gia - một bậc thầy kiếm đạo với những tuyệt kỹ võ công không ai sánh bằng.Sau khi đã từ bỏ chốn trần gian vì mệt mỏi với thế sự, ông phải tái xuất giang hồ để đối đầu với những thế lực yêu binh quỷ tướng và giải cứu cố nhân.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednz7.googlevideo.com/videoplayback?id=f77b30bbef2cb792&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=m&pl=25&sc=yes&ei=sKPZXMDDBcvJ1wL45ongCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6460.000&lmt=1554772214504228&mt=1557767014&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774288&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=6F12866A8C373A575208A1775D33F83A2C972C69EE2A35381A850AD40F4ED725.211E3ED049609584D24183269EEA631CD28DBA0E79BB2DB9B2B50517632F1566&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednz7.googlevideo.com/videoplayback?id=f77b30bbef2cb792&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=m&pl=25&sc=yes&ei=sKPZXKumBseA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&dur=6460.000&lmt=1554769944629325&mt=1557767014&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774288&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=204374BA861C368305A70B62472443E803A31C27AE015C31E43CA44400E8F48A.9CC80A9F97FCAFD885CA6D22E6DAFBE21B311D3538EAB8E4DFE0B8486632C282&key=us0","default":false}]},{"name":"Phi Vụ Tống Tiền","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phi-vu-tong-tien_9613/xem-phim/"},"nameOrigin":"Arsenal","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphi-vu-tong-tien-arsenal-2017.jpg%3Fsize%3D300"},"directors":["Steven C. Miller"],"actors":["Nicolas Cage","John Cusack","Adrian Grenier","Johnathon Schaech","Lydia Hull"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":93,"desc":"Phi Vụ Tống Tiền, Arsenal (2017) ​là một bộ phim hành động vừa được ra mắt năm 2017 do Mỹ sản xuất xoay quanh câu chuyện về tình anh em của Jp và Mikey cũng như những khó khăn thử thách mà họ phải vượt qua.Trong phim tuy sau khi lớn lên cả ha đều có địa vị xã hội khác nhau nhưng tình cảm anh em giữa họ vẫn thân thiết như ngày nào, bằng chứng là khi biết tinh anh trai của mình bị bắt cóc Jp đã bất chấp nguy hiểm đánh đổi tất cả để đương đầu với tên trùm Eddie King cứu anh trai.","embeds":[{"resolution":360,"embedUrl":"link_video_chua_duoc_xu_ly","default":false}]},{"name":"Thám Tử Lừng Danh Conan: Cơn Ác Mộng Đen Tối","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tham-tu-lung-danh-conan-con-ac-mong-den-toi_9530/xem-phim/"},"nameOrigin":"Detective Conan: The Darkest Nightmare","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftham-tu-lung-danh-conan-con-ac-mong-den-toi-detective-conan-the-darkest-nightmare-2016.jpg%3Fsize%3D300"},"directors":["Kobun Shizuno"],"actors":["Nhiều diễn viên"],"genres":["Phim Hành Động","Phim Hoạt Hình","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Nhật Bản"],"duration":90,"desc":" Vào một đêm tối, cảnh sát Nhật Bản bị đột kích bởi một gián điệp. Những tài liệu mật của những cơ quan tình báo hàng đầu như : MI6 (Anh), BDN (Đức), CIA (Mỹ) và cơ quan FBI – Cục Điều Tra Liên Bang Mỹ có nguy cơ bị đánh cắp. Tuy nhiên những nhân viên an ninh phụ trách An Ninh Quốc Gia do Amuro chỉ huy đã xuất hiện kịp thời. Tên gián điệp đã đánh cắp một chiếc xe và tìm đường tẩu thoát. Trong lúc truy đuổi Amuro cùng các nhân viên an ninh và tên gián điệp đã bị mắc kẹt trên đường cao tốc dưới cái nóng gay gắt và trước khi xảy ra một vụ tai nạn liên hoàn, chiếc xe của tên gian điệp đã bị bắn rơi khỏi đường cao tốc bởi viên đạn từ khẩu súng trường của điệp viên FBI – Akai Shuuichi.Ngày hôm sau, Conan cùng các bạn đến thăm quan một thủy cung mới được tu sửa của Tokyo. Dưới đu quay khổng lồ, nơi thu hút khách du lịch của thủy cung, Conan bắt gặp một người phụ nữ xinh đẹp, quyến rũ bị thương và đang ở một mình. Đôi mắt của cô mang hai màu khác nhau. Nhưng cô gái đang trong tình trạng bị mất trí nhớ, cô thậm chí không thể nhớ tên của bản thân mình và chiếc điện thoại di động cô mang theo người cũng đã bị hỏng. Conan và các bạn của mình hứa sẽ giúp cô lấy lại trí nhớ, vì vậy họ đã ở lại cùng cô gái. Vermouth đã đứng sau quan sát mọi chuyện. Cô rút ra một khẩu súng giảm thanh, đồng thời nói với thiết bị liên lạc bí mật: “Đã diễn ra theo đúng kế hoạch, Gin.” Bộ phim  được công chiếu vào ngày 16 tháng 4 năm 2016 tại Nhật Bản. Phim sẽ có sự xuất hiện của các thành viên Tổ chức Áo đen đã từng xuất hiện trong series: Gin, Vodka, Vermouth, Chianti, Korn, Kir, và Bourbon. Đồng thời trang web cũng đưa ra những gợi ý nhắc đến sự xuất hiện của nhân vật Rum, người chưa từng xuất hiện trước đó.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednld.googlevideo.com/videoplayback?id=86561544e37e41b2&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=m&pl=25&sc=yes&ei=SKDZXIO-NKyj8gODuIrIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6692.223&lmt=1550334245288824&mt=1557766110&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773416&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=6BA3FE1125CE1380283DF88BF44495609AE068945FE1428483B440F113189A27.1AD40DA13D828021A28494EDFDC904C71C1993BD79B30E9E5C0B0D5E238853CA&key=us0","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5ednld.googlevideo.com/videoplayback?id=86561544e37e41b2&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=m&pl=25&sc=yes&ei=SKDZXNq8NM2H8gPs36TADg&susc=ph&app=fife&mime=video/mp4&dur=6692.223&lmt=1550327960276046&mt=1557766110&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773416&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=22170B72C78E731A16DBF4D285AF4E997F0DD823F96D8A7941B3860CEFA7EC3C.1A1183137E1026D1D9FCE8477723990D44062E8B2A4C3855242DF9FD449E6EDF&key=us0","default":false}]},{"name":"Nhóc Trùm","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nhoc-trum_9556/xem-phim/"},"nameOrigin":"The Boss Baby","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnhoc-trum-the-boss-baby-2017.jpg%3Fsize%3D300"},"directors":["Tom Mcgrath"],"actors":["Steve Buscemi","Tobey Maguire","Lisa Kudrow"],"genres":["Phim Hài Hước","Phim Hoạt Hình","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":100,"desc":"Phim The Boss Baby - Nhóc Trùm kể về câu chuyện cậu bé Tim 7 tuổi vốn dĩ đang có một cuộc sống rất ấm êm và đầy màu hồng thì bỗng dưng phải đối mặt với “biến cố” lớn trong đời: có một đứa em trai và phải học cách làm anh. Mọi khi cậu luôn là tâm điểm trong mắt bố mẹ, nhưng giờ đây Tim phải chấp nhận san sẻ tình yêu thương. Chưa hết, đứa em trai quái chiêu của cậu còn “thống trị” toàn bộ căn nhà, bắt nạt Tim và luôn khóc thét trước mặt bố mẹ để dành quyền được dỗ dành. Thế nhưng, em bé không còn “bé” như họ tưởng, “Nhóc trùm” nói giọng người lớn và cư xử như một dân anh chị, nhân vật bí ẩn bên trong lốt em bé này đến từ đâu và với mục đích gì?","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5e6n76.googlevideo.com/videoplayback?id=84b70dab4815a53d&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=m&pl=25&sc=yes&ei=uKPZXKdQla3yA9_ptcgG&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5873.278&lmt=1552001095661441&mt=1557767014&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774296&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=31C5997FB7712EB21B9569750A7A05C58D965CC448565C8B834E50640252966F.4045482A2761E9027D73CC878371DB913862D3FDF7FDEB78BBEE39025DC302E3&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5edns6.googlevideo.com/videoplayback?id=84b70dab4815a53d&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=m&pl=25&sc=yes&ei=uKPZXNWPAdPI8gOtnJDoCg&susc=ph&app=fife&mime=video/mp4&dur=5873.278&lmt=1551998222807793&mt=1557767014&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557774296&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B9A4D37BC1CF36E4DA7DD52FBF7E6780DBEE9D7A02C0FAB9596C6BD66EE22245.8F38B254E6A7F60AEB82BA8A92166498FA66920C066EE35AB4F8C97CFE8F071B&key=us0","default":false}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-boss-baby-2017/1"},{"name":"Sát Thủ Tái Xuất","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sat-thu-tai-xuat_9245/xem-phim/"},"nameOrigin":"Mechanic: Resurrection","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsat-thu-tai-xuat-mechanic-resurrection-2016.jpg%3Fsize%3D300"},"directors":["Dennis Gansel"],"actors":["Jason Statham","Jessica Alba","Tommy Lee Jones"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"Phim Mechanic: Resurrection -  Jason Statham dường như đã trở thành một thương hiệu uy tín cho những bom tấn hành động đỉnh cao của Holywood, điển hình như những siêu phẩm Furious 7, The Transporter, The Expendables… Vào tháng 8 tới đây, anh sẽ trở lại màn ảnh lớn với một nhân vật rất đậm chất Statham: chàng sát thủ Arthur Bishop khét tiếng trong MECHANIC: RESURRECTION.Arthur Bishop từng là một “thợ máy” – từ lóng mà giới Mafia dành cho những kẻ giết thuê máu lạnh. Sở trường của anh là tạo dựng những vụ thủ tiêu giết người như những tai nạn xấu số hoặc tự tử. MECHANIC: RESURRECTION, đã 5 năm kể từ khi anh lui về ở ẩn và tìm được tình yêu của đời mình: Gina (Jessica Alba thủ vai). Vậy nhưng quá khứ sát thủ có vẻ vẫn chưa từ bỏ anh khi Gina bị một băng đảng tội phạm bí ẩn bắt cóc và yêu cầu anh phải thực hiện 3 vụ ám sát. Tất nhiên, Bishop, gã sát thủ cứng đầu và kiêu hãnh, từ chối yêu cầu đó, bắt tay cùng một trong 3 nạn nhân trong danh sách đen, và bắt đầu cuộc săn giết bọn bắt cóc để cứu lấy mỹ nhân.Trong MECHANIC: RESURRECTION, người xem đã được tận mắt chứng kiến cảnh Bishop thể hiện kĩ năng ám sát một tên tài phiệt tại một hồ bơi nguy hiểm nhất nhì thế giới. Nhịp phim dồn dập pha chút hài hước, kết hợp với yếu tố hành động được nâng lên một tầm cao mới khiến người xem không thể chờ đợi để được ra rạp xem gã “thợ máy” này làm việc.MECHANIC: RESURRECTION được quay tại Bangkok, Thái Lan với sự chỉ đạo điện ảnh của Dennis Gansel (We Are The Night). Bộ phim có sự góp mặt của những tên tuổi gạo cội của Holywood như Jason Statham, Jessica Alba, Tommy Lee Jones, và sự xuất hiện đặc biệt của Dương Tử Quỳnh. Nối tiếp thành công 62 triệu USD doanh thu của phần một năm 2011","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5e6nez.googlevideo.com/videoplayback?id=b0f8adc5d6b7f05a&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nez&ms=nxu&mv=m&pl=25&sc=yes&ei=DprZXOC1Nsby1gKk_62QCg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5919.114&lmt=1548791516258151&mt=1557764512&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771822&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=0BFFAFE9D75FBECE65827605FDB1EE20FD4D426565EFB0F7DBED3A37631A46B0.01A116E6465A4FAB975F22BCE4ED4EA1BBFDF1E347FAF44EFB02D73A706C0D36&key=us0","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6nez.googlevideo.com/videoplayback?id=b0f8adc5d6b7f05a&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nez&ms=nxu&mv=m&pl=25&sc=yes&ei=DprZXO60NtKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&dur=5919.114&lmt=1548783669393727&mt=1557764512&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771822&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B6ACE03D5EA7298ADF7D706A64A6166E8AE8C4836E05DAACE4188364D0CF2415.578FA6A715EDA7061913A4B39F7EE2A56301EA6AC2D708D9541EF819FA5F8920&key=us0","default":false},{"resolution":1080,"embedUrl":"https://r1---sn-4g5e6nl6.googlevideo.com/videoplayback?id=addc50c1d4be5018&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nl6&ms=nxu&mv=m&pl=25&sc=yes&ei=DprZXPixNq2S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5919.114&lmt=1548788654330694&mt=1557764512&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557771822&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=D7A5C764A94356DA30F520691F2ADB2D722316A616360E4D48C685D58CC7B3BD.14DE55715C1C4F04D41040FE21DB2B948579451B06775041B51AC7FF7E252FDF&key=us0","default":false}]},{"name":"Jack Reacher: Không Quay Đầu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/jack-reacher-khong-quay-dau_9449/xem-phim/"},"nameOrigin":"Jack Reacher: Never Go Back","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fjack-reacher-khong-quay-dau-jack-reacher-never-go-back-2016.jpg%3Fsize%3D300"},"directors":["Edward Zwick"],"actors":["Tom Cruise","Cobie Smulders","Robert Knepper"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Phiêu Lưu"],"countries":["Mỹ"],"duration":118,"desc":"Jack Reacher (Tom Cruise) trở lại với thương hiệu riêng trong phần tiếp theo rất được mong đợi, Jack Reacher: Never Go Back. Câu chuyện chính lần này bắt đầu từ Susan Turner (Cobie Smulders) là thiếu tá quân đội, người đứng đầu đơn vị điều tra cũ của Reacher, bị bắt vì tội phản quốc. Biết rằng cô ấy vô tội, Reacher đã giải cứu cô ra khỏi nhà tù và phát hiện ra sự thật đằng sau một âm mưu chính phủ lớn để xóa tên của họ. Trên đường chạy trốn như kẻ đào tẩu khỏi luật pháp, Reacher phát hiện ra một bí mật tiềm ẩn từ quá khứ của mình mà có thể thay đổi cuộc sống của mình mãi mãi. Dựa trên \"Jack Reacher: Never Go Back,\" cuốn tiểu thuyết thứ 18 của tác giả Lee Child, đây là một trong những cuốn bán chạy nhất của Jack Reacher, phần truyện này đã có 100 triệu cuốn được bán trên toàn thế giới.Jack Reacher: Never Go Back có sự tham gia của các sao như: Aldis Hodge, Danika Yarosh, Patrick Heusinger, Holt McCallany và Robert Knepper. Bộ phim được đạo diễn bởi Edward Zwick (The Last Samurai, Blood Diamond), kịch bản do Richard Wenk (The Expendables 2, The Equalizer) và Marshall Herskovitz (Love & Other Drugs, The Last Samurai) cùng Zwick đảm nhận.Phim được sản xuất bởi Don Granger (Mission: Impossible - Rogue Nation, Jack Reacher), David Ellison Skydance Media và Dana Goldberg (Mission: Impossible - Rogue Nation, Geostorm), và Christopher McQuarrie (Mission: Impossible - Rogue Nation, Valkyrie ). Điều hành sản xuất sẽ do Paula Wagner (War of the Worlds, The Other) và Herb Gains (Thẩm phán, Non-Stop).","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5edned.googlevideo.com/videoplayback?id=c4cbf619fa1780ae&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edned&ms=nxu&mv=m&pl=25&sc=yes&ei=XIrZXIH-Gouv1wLzkojIBQ&susc=ph&app=fife&mime=video/mp4&dur=7089.098&lmt=1550657988586285&mt=1557760489&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767804&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=DAFF743A2B2D902ACCA26F3D3E25B0906EA011120FA82486803246DBAAC08FAA.7D20778FFBF029FF56FB824A9C1E773A653CBE0DB4AE201417C4FE61D7325AFD&key=us0","default":false},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6ney.googlevideo.com/videoplayback?id=c4cbf619fa1780ae&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ney&ms=nxu&mv=m&pl=25&sc=yes&ei=XIrZXKWrG8qc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7089.098&lmt=1550667401410267&mt=1557760489&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767804&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=9297F8A603152B621251BBEDA68D19D36DD55B2A475BE7314952742C328E0C4E.0F7441399889D688BA02DC72CB683662AB82DA19ADF2D82816AC9C5E15476FC2&key=us0","default":true}]},{"name":"Asura: Thành Phố Điên Rồ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/asura-thanh-pho-dien-ro_9458/xem-phim/"},"nameOrigin":"Asura: The City of Madness","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fasura-thanh-pho-dien-ro-asura-the-city-of-madness-2016.jpg%3Fsize%3D300"},"directors":["Sung-su Kim"],"actors":["Man sik Jeong","Jung min Hwang","Ji hun Ju","Jung Woo Sung"],"genres":["Phim Hành Động","Phim Hình Sự","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":136,"desc":" Sau sự kiện Toronto International Film Festival 2016 vừa qua đã có rất nhiều dự án phim của Hàn Quốc tung trailer cũng như hình ảnh, trong đó Asura: The City of Madness đã khiến những khán giả hâm mộ điện ảnh của xứ Hàn đứng ngồi không yên với 1 đoạn trailer ngắn của mình. Bộ phim quy tụ dàn diễn viên hạng A gồm Jung Woo Sung, Hwang Jung Min, Joo Ji Hoon, Kwak Do Won và Jung Man Sik xứng đáng là tác phẩm đáng được chờ đợi nhất vào nửa cuối năm ở Hàn Quốc. Ngoài dàn diễn viên đỉnh thì qua trailer chúng ta có thể thấy phim sẽ có một cốt truyện rất lôi cuốn, những cảnh quay chân thực, sắc nét cùng những pha hành động bạo lực cực chất. Chắc chắn các Fan của phim Hàn nói riêng và những người hâm mộ dòng phim hành động, đấu trí đỉnh cao nói chung sẽ phải háo hức và hào hứng chờ đón khi bộ phim được chính thức ra mắt. Asura: The City of Madness đã có buổi công chiếu sớm vào ngày 23.09 dành cho khách VIP cũng như nhiều ngôi sao nổi tiếng. Phim sẽ chính thức được ra mắt vào hôm nay 28.09 tại xứ Hàn và 14.10.2016 tại Mỹ.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767213&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152387%26authkey%3DAIsdychPrWGxs-g&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}]},{"name":"Trân Đánh Inchon","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tran-danh-inchon_9417/xem-phim/"},"nameOrigin":"Operation Chromite","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftran-danh-inchon-operation-chromite-2016.jpg%3Fsize%3D300"},"directors":["John H. Lee"],"actors":["Jin Se Yun","Lee Beom Soo","Lee Jung Jae"],"genres":["Phim Hành Động","Phim Chiến Tranh","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":110,"desc":"Phim Trận Đánh Inchon – là một trong những bộ phim điện ảnh đình đám nhất Hàn Quốc ra mắt vào cuối năm 2016, đây tác phẩm điện ảnh do Lee Jung Jae cùng hợp tác với ngôi sao hành động hàng đầu hollywood – Liam Neeson cùng thực hiện.Trận Đánh Incheon là bộ phim bom tấn về chiến tranh dựa trên những sự kiện có thật xảy ra trong trận đánh Inchon giữa quân đội hai miền Triều Tiên vào năm 1950. Tại đó, đại úy hải quân Jang Hak Soo cùng tướng Douglas MacArthur người Mỹ và 8 người lính Nam Hàn phải thực hiện một nhiệm vụ bí mật để có thể giúp cho các đồng đội hạ cánh an toàn.Đảm nhiệm vai chính trong Operation Chromite là tài tử Lee Jung Jae và ngôi sao Hollywood Liam Neeson. Nhân vật ông sẽ đảm nhiệm là viên tướng lừng danh Douglas MacArthur.","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5edne6.googlevideo.com/videoplayback?id=84a2cc25b409779b&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=WqDZXNzWKZfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=6634.800&lmt=1552708896004807&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773434&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=2DC231C40A92A2632A6FB5F63B44182CEDF184843F124B7D5355F8CA48E675CC.2E955F971E5DF8CCE9B07FACA861CA8061FF709986CAA1E6ED203CCBDE2E82BE&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5edne6.googlevideo.com/videoplayback?id=84a2cc25b409779b&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=WqDZXMSoLpfP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6634.800&lmt=1552711242447878&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773434&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=547BE1537125B7367E421514429EA30CF7C53549EF02C1180FA827C780EED82A.68CC183C5723870CDA04F3D8AE073A491F763CA6C135FD09AEA17F23F2ED306E&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r6---sn-4g5edne6.googlevideo.com/videoplayback?id=84a2cc25b409779b&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne6&ms=nxu&mv=u&pl=25&sc=yes&ei=WqDZXPTpMPmY8gP-1IS4Cg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6634.800&lmt=1552711355051257&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773434&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=24AC9D4636A05AF4C9DE8151FDF34A73F586922D6E5C8C4A34A9A1B61DDBC952.DD1CFFDD1365C55E61CC7F8370C5326721EBB864F63C4B7E9B8DD240978AD456&key=us0#f1080p","default":true}]},{"name":"Kho Tàng Đẫm Máu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/kho-tang-dam-mau_9416/xem-phim/"},"nameOrigin":"Warrant the Reborn","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkho-tang-dam-mau-warrant-the-reborn-2017.jpg%3Fsize%3D300"},"directors":["Zhou Xiaopeng"],"actors":["Enjie Lu","Qiang Zheng","Wei Dong Chen"],"genres":["Phim Phiêu Lưu","Phim Kinh Dị","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":90,"desc":"Kho Tàng Đẫm Máu – Warrant The Rebo là một bộ phim kinh dị do Trung Quốc sản xuất xoay quanh câu chuyện về một nhóm người đang muốn khám phá kho tàng của vua Càng Long.Trong phim nhóm người này đã tìm được một tấm bảng đò và lần theo dấu vết của tấm bảng đò họ đã bước chân đến một vùng quê hẻo lánh với vô vàng những điều kỳ lạ huyền bí xảy ra. Những chuyện kỳ lạ mà nhóm bạn này gặp phải là gì và liệu thật sự có kho báu như họ nghỉ hay không mời các bạn đón xem bộ phim Kho Tàng Đẫm Máu – Warrant The Rebo để biết được những diễn biến tiếp theo của câu chuyện nhé.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednss.googlevideo.com/videoplayback?id=6679751d2935842c&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednss&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=NYrZXICwC8-R8gPliLj4DQ&susc=ph&app=fife&mime=video/mp4&dur=5363.159&lmt=1551261089247775&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767765&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=3A29338A6D8938BD4443AD9D1AC1D3A92E90E88B41BD0A070D35666662FA0D2A.D9AB65CF5C48140D5EE19B7199C6BE1A0B86AFF3628E30B0CDC9D7C0CA9696AC&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nss.googlevideo.com/videoplayback?id=6679751d2935842c&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nss&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=NYrZXIPoDdKZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5363.159&lmt=1551267371164708&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767765&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=70A9BDE26DF4E42943D1D870B58426240F4005B6FB265C7CDEDC5AAFE970138D.D5571A104D2B230AD1F97A4365E459E4816EF1F740DF2656E1B6C6DEC4279CE2&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r5---sn-4g5ednss.googlevideo.com/videoplayback?id=6679751d2935842c&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednss&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=NYrZXOOvEIe11gLou7m4CQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5363.159&lmt=1551267605464132&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767765&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=A946F43D996BFDF41089F2A43B672C63199F693CC5BBD04FC53C8A94206E1569.349D7427A3C8917B96C875135F715295B5AFB58449499F281B8A41D90FA7F9A6&key=us0#f1080p","default":true}]},{"name":"Năm Mươi Sắc Thái Đen Tối","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nam-muoi-sac-thai-den-toi_9395/xem-phim/"},"nameOrigin":"Fifty Shades Darker","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnam-muoi-sac-thai-den-toi-fifty-shades-darker-2017.jpg%3Fsize%3D300"},"directors":["James Foley"],"actors":["Dakota Johnson","Jamie Dornan","Tyler Hoechlin"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":120,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednz7.googlevideo.com/videoplayback?id=c2a8e4cc7095c0c5&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=rpfZXPv-Kof31gKYyp-YDg&susc=ph&app=fife&mime=video/mp4&dur=7068.641&lmt=1552333589203973&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771214&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=48511415074E801C5B7D8EF7A6246AA47C0F7DCE77CFF23B6ED3DEF66EC584F1.B32D8DF5096F23CD7D7057E46DBC49C862D4A495FC04DDF2E1BDE62A9BB509&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5ednz7.googlevideo.com/videoplayback?id=c2a8e4cc7095c0c5&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=rpfZXKGfLcqc8gOd5ai4Bw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7068.641&lmt=1552339659643747&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771214&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=0BC5F2D28078E787010562EED76D25C00448913486CA96C129BCC54DDC245C7B.49F5CCC0300B0E86BF6F8508F7EE74A223FC16AA8F5ECA6792DBF750D69D8FC2&key=us0#f720p","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/fifty-shades-darker-2017/1"},{"name":"Cơ Trưởng Sully","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/co-truong-sully_9407/xem-phim/"},"nameOrigin":"Sully","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-truong-sully-sully-2016.jpg%3Fsize%3D300"},"directors":["Clint Eastwood"],"actors":["Tom Hanks"],"genres":["Phim Chiến Tranh","Phim Phiêu Lưu","Phim Khoa học Tài liệu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":100,"desc":"Phim Cơ Trưởng Sully - Sully xoang quanh câu truyện cơ trưởng \"Sully\" Sullenberger đáp chiếc máy bay trong tình trạng động cơ tê liệt hoàn toàn xuống con sông Hudson mà hơn 150 hành khách không một ai bị thiệt mạng . Tuy nhiên, trong khi Sully được công chúng và truyền thông tung hô như một anh hùng bởi tài nghệ chưa từng thấy từ trước đến nay, thì một cuộc điều tra được tiến hành có khả năng hủy hoại hoàn toàn danh tiếng cũng như sự nghiệp của ông.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767242&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152385%26authkey%3DANWZfSEQu1YS76Q&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/sully-2016/1"},{"name":"Tuyên Ngôn Độc Thân","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/tuyen-ngon-doc-than_9420/xem-phim/"},"nameOrigin":"How To Be Single","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftuyen-ngon-doc-than-how-to-be-single-2016.jpg%3Fsize%3D300"},"directors":["Christian Ditter"],"actors":["Dakota Johnson","Rebel Wilson","Leslie Mann"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Mỹ"],"duration":110,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767262&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152388%26authkey%3DAKA2gpg9RD3YV4g&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/how-to-be-single-2016/1"},{"name":"Vệ Sĩ Siêu Cấp","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ve-si-sieu-cap_9386/xem-phim/"},"nameOrigin":"The Super Bodyguard","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fve-si-sieu-cap-the-super-bodyguard-2017.jpg%3Fsize%3D300"},"directors":["Yue Song"],"actors":["Lý Du Phi","Trần Tuệ Lâm","Trâu Triệu Long"],"genres":["Phim Hành Động","Phim Tâm Lý","Phim Võ Thuật","Phim Thuyết Minh"],"countries":["Trung Quốc"],"duration":93,"desc":" Phim Vệ Sĩ Siêu Cấp - Phim xoay quanh câu chuyện báo thù của chàng trai giỏi võ (Nhạc Tùng) đang trên đường tìm kiếm vị sư huynh của mình Lý Giang (Thích Hành Vũ) vô tình trở thành vệ sĩ cho một thiên kim tiểu thư Lý Phỉ Phỉ (Lý Vũ Phỉ), làm những chuyện hết sức điên rồ. Phim với sự tham gia của các diễn viên chính: Nhạc Tùng, Thích Hành Vũ, Lý Vũ Phỉ, Trâu Triệu Long, Trần Huệ Mẫn…Chúc các bạn xem phim Vệ Sĩ Siêu Cấp vui vẻ!.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5ednsl.googlevideo.com/videoplayback?id=2e149a60341e16ce&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsl&ms=nxu&mv=m&pl=25&sc=yes&ei=PYrZXMjYFYuv1wLzkojIBQ&susc=ph&app=fife&mime=video/mp4&dur=5343.120&lmt=1550293402126404&mt=1557760489&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767773&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=ABF77D3037A3305DB4ED946FFEF7052823484DC3102595B7D09BFD2979A145D0.1DCFF34E2D46FFF1B1AFCDBF660FD6DC63F1F450352D98B8209E3CE9F207AC53&key=us0","default":false},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nle.googlevideo.com/videoplayback?id=efce4616b66d70a4&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nle&ms=nxu&mv=m&pl=25&sc=yes&ei=PYrZXKW_FY-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5343.120&lmt=1550302137053623&mt=1557760489&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767773&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3EBBC0C9D13B64641CC78A53BF0B8CF3D2016D28C5FEA0C911EDDCE90543FD3F.C799AC50393304931250CFBC86BA5844136245132E25E44C2E371B8448C7E717&key=us0","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5e6nle.googlevideo.com/videoplayback?id=efce4616b66d70a4&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nle&ms=nxu&mv=m&pl=25&sc=yes&ei=PYrZXOaRFqyj8gODuIrIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5343.120&lmt=1550302322512725&mt=1557760489&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557767773&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=6F98D62542589E1C7E72F7A8D7E72D842D815D700DE2536F74924BA35862FAE5.172EE89CF64327A0EEB6679D862B48584EA3CD4DE7699D9CFC7BA6638B7F6020&key=us0","default":false}]},{"name":"Người hầu gái","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nguoi-hau-gai_9315/xem-phim/"},"nameOrigin":"The Handmaid","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-hau-gai-the-handmaid-2016.jpg%3Fsize%3D300"},"directors":["Park Chan-Wook"],"actors":["Kim Min Hee","Kim Tae Ri","Ha Jung Woo","Cho Jin Woong"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":144,"desc":"Được ví như “50 sắc thái” của Hàn Quốc, bộ phim Người Hầu Gái - The Handmaiden đang làm mưa làm gió  ở hạng mục tranh giải chính - Cành Cọ Vàng - tại Liên hoan phim Cannes hồi tháng 5.Được dán nhãn 19+ với hàng loạt cảnh nóng “bỏng mắt” với chủ đề bạo dâm và đồng tính nữ không kém Kim Bình Mai hay 50 sắc thái, ngay khi vừa công chiếu, Người Hầu Gái đã gây sốt tại Hàn Quốc và lan rộng cả khu vực châu Á. Nội dung phim kể về cuộc sống Hàn Quốc những năm đầu thế kỷ 20 với ở vùng đất loạn ly, khi những lão quý tộc Triều Tiên cấu kết với giới quan lại người Nhật, còn những thân phận nhỏ bé rơi vào cảnh bế tắc. Một cô gái xuất thân thấp hèn, chuyên làm nghề móc túi tên Sook-hee được gã lừa đảo xưng là Bá tước Fujiwara thuê làm người hầu gái cho quý cô giàu có Hideko. Fujiwara cần Sook-hee làm cầu nối để độc chiếm tiểu thư Hideko trước thời điểm nàng nhận lời cầu hôn từ người chú dượng độc đoán Kouzuki. Khi cô hầu gái bé nhỏ đem lòng yêu cô chủ, bộ mặt thật của cả bốn người trong mối quan hệ phức tạp dần được phơi bày với nhiều bất ngờ gây rùng mình. Trong cuộc sống đầy mưu mô và nam trị, con người luôn phải lừa lọc nhau để sinh tồn và sự ngây thơ là tội lỗi. Bốn nhân vật chính trong phim - hầu gái Sook-hee, quý cô Hideko, đạo chích Fujiwara và người dượng độc đoán Kouzuki - tượng trưng cho các nhân vật trong thế giới này. Họ tạo thành bốn góc của một sơ đồ hình thang giả tưởng mà trong đó hai góc dưới yếm thế thuộc về Hideko và Sook-hee.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5ednsy.googlevideo.com/videoplayback?id=ee95725e0256833d&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsy&ms=nxu&mv=u&pl=25&sc=yes&ei=uJfZXMSqH5qJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&dur=8345.112&lmt=1551218210051403&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771224&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=4EB60BEB94CE66BD31848D0B95E41F52338F6AFBAE5F6F6B027E98B9F0E72E2A.6B9DDD3A3198ADED76B7DC613E2082EFC63117331DF7E99B11D044815C73825C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6nld.googlevideo.com/videoplayback?id=ee95725e0256833d&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nld&ms=nxu&mv=u&pl=25&sc=yes&ei=uJfZXPHbIZiJ1wL0yIXQDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=8345.112&lmt=1551561267516896&mt=1557763685&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557771224&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=404670C2E711C0AF3ADCC0E8684A4AA111304ADADA2281B5A83722DBAFA3938B.C6E2722A4F1C3E14F322AE7FB89A750E1E1DC27B79B3756253967AE7B6AA1738&key=us0#f720p","default":true}]},{"name":"Star Trek: Kẻ Phản Bội","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/star-trek-ke-phan-boi_9305/xem-phim/"},"nameOrigin":"Star Trek: Renegades","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fstar-trek-ke-phan-boi-star-trek-renegades-2015.jpg%3Fsize%3D300"},"directors":["Tim Russ"],"actors":["Adrienne Wilkinson","Walter Koenig"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":88,"desc":"Star Trek: Kẻ Phản Bội - Star Trek: Renegades :Đã gần mười năm sau khi Voyager trở về từ vùng đồng bằng Quadrant, và Liên Đoàn đang trong một cuộc khủng hoảng. Nhà cung cấp chính của Liên đoàn chất tinh thể Dilithium bỗng dưng biến mất. Không gian và thời gian đã cách ly vài hành tinh tiếp xúc với bên ngoài, và hiện tượng này không bình thường chút nào: Có kẻ nào hoặc vật gì đó đã khiến nó xảy ra. Cần phải có những biện mạnh mẽ và quyết liệt cũng như bí mật để tìm cho được nguyên nhân và lũ phản bội. Nội dung Star Trek: Kẻ Phản Bội - Star Trek: Renegades :Đã gần mười năm sau khi Voyager trở về từ vùng đồng bằng Quadrant, và Liên Đoàn đang trong một cuộc khủng hoảng. Nhà cung cấp chính của Liên đoàn chất tinh thể Dilithium bỗng dưng biến mất. Không gian và thời gian đã cách ly vài hành tinh tiếp xúc với bên ngoài, và hiện tượng này không bình thường chút nào: Có kẻ nào hoặc vật gì đó đã khiến nó xảy ra. Cần phải có những biện mạnh mẽ và quyết liệt cũng như bí mật để tìm cho được nguyên nhân và lũ phản bội.","embeds":[{"resolution":360,"embedUrl":"https://lh3.googleusercontent.com/I327gWKzLUHtV7_SsncJn4rObUkrj4oaQznmzy56NXm9dL3W2zL3KKPbvRv7yBF1zMHtFCgU2SayMsiwIjlG0f4MYTj_A7_uYl4Uer2yJhibx9cXQlLaYtN57zBHkMhlcITTwg=m18","default":false},{"resolution":720,"embedUrl":"https://lh3.googleusercontent.com/I327gWKzLUHtV7_SsncJn4rObUkrj4oaQznmzy56NXm9dL3W2zL3KKPbvRv7yBF1zMHtFCgU2SayMsiwIjlG0f4MYTj_A7_uYl4Uer2yJhibx9cXQlLaYtN57zBHkMhlcITTwg=m22","default":true}]},{"name":"Phù Thủy Tối Thượng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phu-thuy-toi-thuong_9303/xem-phim/"},"nameOrigin":"Doctor Strange","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphu-thuy-toi-thuong-doctor-strange-2016.jpg%3Fsize%3D300"},"directors":["Scott Derrickson"],"actors":["Benedict Cumberbatch","Rachel McAdams","Benedict Wong"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":110,"desc":"Phim Phù Thủy Tối Thượng - Doctor Strange kể về  Bác sĩ Stephen Strange là một trong những bác sĩ phẫu thuật tài năng nhất trên thế giới này. Tuy nhiên, thảm họa xảy ra khi đôi tay của Strange vỡ nát và trở nên vô dụng sau một tai nạn xe hơi thảm khốc. Dồn hết tài năng và kinh nghiệm của mình để hàn gắn cơ thể nhưng không thành công, vị bác sĩ tài ba trở nên thất vọng và chán nản. Ông nghĩ ông mất tất cả cho đến khi một ông lão bí ẩn truyền niềm tin cho ông, chữa lành vết thương cho ông ở Tibet. Nhưng trước khi lành vết thương, Strange phải trao quà cho người khác và học cách chấp nhận những điều tưởng chừng không thể chấp nhận được. Đó là món quà phép thuật.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nsk.googlevideo.com/videoplayback?id=0e0bbb18ae46e689&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=OJDZXJaoD4eA1gK60JEo&susc=ph&app=fife&mime=video/mp4&dur=6898.718&lmt=1557051508587575&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557769304&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=E7CB6EDB2E9F66BF096940F6022522FBE78B03228BA0804B09586DC4F029E40C.DE9FDB8D9EA63CC4DB329C8BAC33C15D277069A24BBA9699CE793F60B2069E80&key=us0","default":false},{"resolution":720,"embedUrl":"https://r5---sn-4g5e6nsk.googlevideo.com/videoplayback?id=0e0bbb18ae46e689&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=OJDZXNO_D62S8gOI07awBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6898.718&lmt=1557054189498086&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557769304&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=06E777D308128CE0B9A279A32C2840F378B65B5B268A1A54C655F4F1A82BE9A0.6D7E023C44AA6179906D8B5089571CDBD077580E03E80F9D55FBBBB70F8EF9BB&key=us0","default":false},{"resolution":1080,"embedUrl":"https://r3---sn-4g5edne7.googlevideo.com/videoplayback?id=83c36274a7896582&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edne7&ms=nxu&mv=u&pl=25&sc=yes&ei=OJDZXPK_D4uv1wLzkojIBQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6898.718&lmt=1557053502276152&mt=1557761886&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557769304&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3939EE06F8833381C598CF5EEFB15FA99E2E676ED63F909FAF5024C1F9E62FE3.9D37E610A3A4A90A9C6352EA2CBAB58DB542B0A7E48F983B8CF578BAD90FFF85&key=us0","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/doctor-strange-2016/1"},{"name":"Ben Hur","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ben-hur_9314/xem-phim/"},"nameOrigin":"Ben Hur","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fben-hur-ben-hur-2017.jpg%3Fsize%3D300"},"directors":["Timur Bekmambetov"],"actors":["Jack Huston","Nazanin Boniadi","Ayelet Zurer"],"genres":["Phim Hành Động","Phim Chiến Tranh","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":123,"desc":" Nhà quý tộc Judah Ben-Hur (Jack Huston) bị người bạn thời thơ ấu và cũng là người em trai nuôi Messala (Toby Kebbell) cáo buộc tội ám sát không thành. Sau nhiều năm lênh đênh trên biển làm nô lệ cho người La Mã, Ben-Hur sống sót và quay trở lại quê nhà để trả thù. Ben-Hur đã thách thức người em trai nuôi của mình trong một cuộc đua xe ngựa. Với những thay đổi mãi mãi sau cuộc gặp gỡ với Chúa Giêsu thành Nazareth, liệu Ben-Hur có thể trả thù thành công?","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767274&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152405%26authkey%3DAO89UBDOcOf3y30&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/ben-hur-2016/1"},{"name":"Mưu Sát Tuổi Xuân","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/muu-sat-tuoi-xuan_9273/xem-phim/"},"nameOrigin":"Kill Time","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fmuu-sat-tuoi-xuan-kill-time-2016.jpg%3Fsize%3D300"},"directors":["Trần Quả"],"actors":["Angelababy","Trương Siêu","Trần Kinh Thiên"],"genres":["Phim Hình Sự","Phim Kinh Dị","Phim Tâm Lý"],"countries":["Trung Quốc"],"duration":127,"desc":" Phim Mưu Sát Tuổi Xuân - Kill Time 2016: Chuyển thể từ tiểu thuyết cùng tên, kể về cô gái Điền Tiểu Mạch (Angelababy) sắp cưới vị hôn phu Thịnh Tán (Trương Siêu), nhưng cái chết của cảnh sát Điền (Doãn Chú Thắng) – cha của Tiểu Mạch đã làm vỡ tan niềm hạnh phúc yên bình kia. Khi đang soạn lại các di vật của cha, Điền Tiểu Mạch tình cờ phát hiện ra cuốn sổ tay ghi chép các vụ án của cảnh sát Điền, rồi cứ thế rơi vào vòng xoáy của một vụ án bí ẩn chưa có lời giải từ mười năm trước. Chính vụ án đó cũng đưa cô trở về với những kí ức của mối tình đầu sâu sắc mà cũng đầy đau khổ. Cùng lúc đó, Tiểu Mạch được cô bạn thân Tiền Linh (Nhiệt Y Trát) tiết lộ về một cửa hàng online tên “miền ma nữ”, nơi bạn có thể mua được mọi thứ, thậm chí là cả những kí ức về tình yêu. Nhưng khi cô mua về một chiếc khăn lụa màu tím thần bí, thì hàng loạt các sự việc kì lạ đã xảy ra, mọi thứ dường như đều có liên quan đến vụ án bí ẩn kia và cậu bạn trai thời niên thiếu – Thu Thu (Nguyễn Kinh Thiên).","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednll.googlevideo.com/videoplayback?id=2d830c5b686ea808&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=8KDZXKHBINLM1wLQyZz4Bg&susc=ph&app=fife&mime=video/mp4&dur=7679.628&lmt=1551376483836390&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773584&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=A5A01031D94D4AA0ED7EDBCC675B4E367FB0E7EA664C810009B9817CEC975742.CD24D3EB64B067C53DB801E0D1BEB62CC57762DF2621D7E1096EA21ED03AADD6&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nle.googlevideo.com/videoplayback?id=2d830c5b686ea808&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nle&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=8KDZXODzIoHA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7679.628&lmt=1551565960870819&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773584&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=63C3A5246BB43244F134AEDBFF0BA2A51681D036D42566A28E5B3CB21497FC4F.20D5291DC2CD56A5C0F9CA8F87505759A64AC65C7D746B8B1B0C663723805E95&key=us0#f720p","default":true},{"resolution":1080,"embedUrl":"https://r4---sn-4g5ednll.googlevideo.com/videoplayback?id=2d830c5b686ea808&itag=37&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednll&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=8KDZXO6zJZqJ1gKvwrPIDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7679.628&lmt=1551566120549244&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773584&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=5D9EBB62653466D3DE7B4B6BB7912B7BA384DB79CFFB4D75D5D71741160EC85E.B35E6CDD7F77248E3300BB35DD889152125851A0EECDE3836CF4A1FAC46259C2&key=us0#f1080p","default":true}]},{"name":"Cánh Đồng Nhỏ: Đông/Xuân","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/canh-dong-nho-dong-xuan_9159/xem-phim/"},"nameOrigin":"Little Forest 2: Winter/Spring","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdownload-canh-dong-nho-dongxuan-little-forest-2-winterspring-2015.jpg%3Fsize%3D300"},"directors":["Jun'ichi Mori"],"actors":["Ai Hashimoto","Mayu Matsuoka","Yôichi Nukumizu"],"genres":["Phim Tâm Lý"],"countries":["Nhật Bản"],"duration":120,"desc":"Manga thể loại slice-of-life tựa Little Forest của tác giả Daisuke Igarashi vừa nhận được lời mời chuyển thể thành live-action. Ai Hashimoto (diễn viên live-action I’ll Give It My All… Tomorrow, Another) sẽ nhận vai chính Ichiko.Cốt truyện nói về Ichiko sau khi rời khỏi thành phố để sống độc lập trong cộng đồng Komori ở Tohoku (Little Forest). Câu chuyện nói về bản chất và thực phẩm thay đổi theo mùa trong khi Ichiko thì nấu ăn mỗi ngày để duy trì cuộc sống độc lập của mình. Igarashi (tác giả Children of the Sea, Hanashippanashi) đã từng sống cuộc sống độc lập như Ichiko. Kinh nghiệm từ cuộc sống trong túp lều trên núi ở tỉnh Iwate Tohoku đã truyền cảm hứng cho câu chuyện.","embeds":[{"resolution":360,"embedUrl":"https://ia801906.us.archive.org/6/items/5459OtherYAMATO/13032--Other--Little.Forest.Winter.Spring.mp4","default":true}]},{"name":"X men: Ngày Cũ Của Tương Lai","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/x-men-ngay-cu-cua-tuong-lai_7583/xem-phim/"},"nameOrigin":"X Men: The Day Of Future Past","year":"2014","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fx-men-ngay-cu-cua-tuong-lai-x-men-the-day-of-future-past-2014.jpg%3Fsize%3D300"},"directors":["Bryan Singer"],"actors":["Phạm Băng Băng","Ian McKellen","Halle Berry","Hugh Jackman","Ellen Page","Jennifer Lawrence","Peter Dinklage"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":null,"desc":"Ngày Cũ Của Tương Lai - X-men: Days of Future Past: Chuyến hành trình trở về quá khứ của những dị nhân đã cận kề. Những nhân vật quen thuộc của chúng ta một lần nữa sẽ quay trở lại màn ảnh rộng, sát cánh cùng chính con người trẻ tuổi của họ để tạo nên một lực lượng hùng mạnh nhằm thay đổi quá khứ tàn khốc và cứu lấy tương lai của giống loài mình. Trong phần này, cuộc chiến giữa con người và dị nhân sẽ được nhân rộng ra khắp thế giới với sự góp mặt của dàn diễn viên hùng hậu (Patrick Stewart, Ian McKellen, Hugh Jackman, Jennifer Lawrence, Michael Fassbender, Phạm Băng Băng…) và những cảnh quay vô cùng hoành tráng.  Với sự xuất hiện của trailer đầu tiên, bộ phim đã làm dấy lên sự mong đợi to lớn ở người hâm mộ. Và để làm dịu đi sức nóng cho sự ra mắt chính thức sắp đến, đội ngũ làm phim của X-MEN: NGÀY CŨ CỦA TƯƠNG LAI tiếp tục cho ra mắt trailer thứ 2 cực kỳ ấn tượng với những thước phim súc tích về cuộc chiến vĩ đại giữa quá khứ và thực tại.  Dưới tài chỉ đạo của đạo diễn Bryan Singer, những dị nhân sẽ quay lại màn ảnh rộng trong một phần phim hoàn toàn mới mang tên X-MEN: NGÀY CŨ CỦA TƯƠNG LAI. Trong phần này, những siêu dị nhân sẽ phải chung sức đối đầu với một cuộc chiến sinh tử vì sự tồn vong của tất cả sinh linh trên trái đất tại cả hai cột mốc thời gian. Hãy còn đón xem cuộc chiến sinh tử giữa con người và dị nhân vào tháng 5 này để chìm đắm trong câu chuyện tuyệt vời và những góc quay hoàn hảo, đậm chất Hollywood của bộ phim bom tấn hàng đầu 2015 này.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/e21837b9cbf3c9332a0f3faeb9d1e18a/e21837b9cbf3c9332a0f3faeb9d1e18a.playlist.m3u8","default":true}]},{"name":"Phù Thủy","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phu-thuy_9128/xem-phim/"},"nameOrigin":"The Witch","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphu-thuy-the-witch-2017.jpg%3Fsize%3D300"},"directors":["Robert Eggers"],"actors":["Anya Taylor Joy","Ralph Ineson","Kate Dickie"],"genres":["Phim Kinh Dị","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":92,"desc":"","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5edney.googlevideo.com/videoplayback?id=8f6874cf0894ca68&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edney&ms=nxu&mv=u&pl=25&sc=yes&ei=GqHZXJ6DMIKC8gOPhZOwDQ&susc=ph&app=fife&mime=video/mp4&dur=5546.666&lmt=1552560254402472&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773626&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=65500C25FDE5CFB8538E46D12C02477C536E51385D1AC43B9A15A25710B7F5C0.E72FC6978F45BA02CB3D6149A6D592BE6102AA9335C95DEC1186A2085E599BFA&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6n76.googlevideo.com/videoplayback?id=8f6874cf0894ca68&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n76&ms=nxu&mv=u&pl=25&sc=yes&ei=GqHZXK7KN4nG1wL4lbfwDg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5546.666&lmt=1552562977432020&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773626&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=98A1639E58EF84C8E5889818923313AAE4CB21CABE3A897FC0D3E22E18BEF172.0EB8C31CB4A04F0193FFF13C95128ECD08773D4DEEF061CD4F83EEB8A13C82&key=us0#f720p","default":true}]},{"name":"Pháp Sư Côn Đồ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/phap-su-con-do_9144/xem-phim/"},"nameOrigin":"Man On The Edge","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphap-su-con-do-man-on-the-edge-2016.jpg%3Fsize%3D300"},"directors":["Jo Jin-Gyu"],"actors":["Park Shin Yang","Kim Jung Tae"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Hàn Quốc"],"duration":127,"desc":"Gwang Ho (Park Shin Yang) là cánh tay phải đáng tin cậy của một ông trùm xã hội đen. Trong một lần dùng tay đỡ lưỡi dao cho thủ lĩnh của mình, đường định mệnh trong lòng bàn tay của Gwang Ho đã thay đổi. Sau đó, một loạt các sự kiện kỳ lạ xảy đến khiến Gwang Ho quyết định tìm gặp các thầy bói. Họ phán rằng anh đã bị ma nhập và muốn được yên phải thực hiện một nghi lễ. Thế là Gwang Ho bắt đầu sống một cuộc đời hai mặt - một kẻ thô lỗ, ngang tàng bỗng chốc phải trở thành thầy cúng nhằm cứu rỗi chính mình. Tuy nhiên, nhiệm vụ giải thoát cho các linh hồn không hề đơn giản và chiếc mặt nạ che giấu thân phận pháp sư đang có nguy cơ bại lộ","embeds":[{"resolution":360,"embedUrl":"https://lh3.googleusercontent.com/4lkSh0mX_oUqb1Mqu4LkCKa27Zswtt3rRBI9s_B5sd_v3aZL4-kaHDoEMKk-FCUxQR1x-kxrfqAQbnKnc6iEyxv9p-_3k2JI6vRIoE-CZmaIssH_rK5sLEglFY81qr39l31zfQ=m18","default":false},{"resolution":720,"embedUrl":"https://lh3.googleusercontent.com/4lkSh0mX_oUqb1Mqu4LkCKa27Zswtt3rRBI9s_B5sd_v3aZL4-kaHDoEMKk-FCUxQR1x-kxrfqAQbnKnc6iEyxv9p-_3k2JI6vRIoE-CZmaIssH_rK5sLEglFY81qr39l31zfQ=m22","default":true}]},{"name":"Không Thể Nào Quên","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/khong-the-nao-quen_9096/xem-phim/"},"nameOrigin":"Unforgett Ble","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkhong-the-nao-quen-unforgett-ble-2016.jpg%3Fsize%3D300"},"directors":["Lee Eun-Hee"],"actors":["Do Kyung Soo","Kim So Hyun","Yeon Jun Suk"],"genres":["Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":112,"desc":"Unforgettable (Pure Love) tái hiện lại mối tình đầu ngây ngô, tình bạn vô tư của lũ trẻ năm 1991, những kỉ niệm đó tình cờ ùa về khi một MC chương trình phát thanh nhận được bức thư kể lại hồi ức tuổi thơ. Đài phát thanh chính là phương tiện kết nối quá khứ và hiện tại, giúp họ trở về những ký ức tươi đẹp, trong sáng nhưng cũng đầy dữ dội của tuổi trẻ vào 23 năm trước.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednsd.googlevideo.com/videoplayback?id=d1d4c59c4fcca48f&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednsd&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=IaHZXL7ZMKyj8gODuIrIBQ&susc=ph&app=fife&mime=video/mp4&dur=6819.747&lmt=1551388735884441&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773633&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,dur,lmt&signature=1BD34B6F6C5FF922FBA54EB673A149FBBFB4B78A910D5E04B01D19795844BFFC.EB4EB5144506320F2852C1439292264A4F2517A5A2FA5C0EFCA747FCA852C38C&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6nlk.googlevideo.com/videoplayback?id=d1d4c59c4fcca48f&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nlk&ms=nxu&mv=u&pl=25&sc=yes&ttl=transient&ei=IaHZXMvENtWm8gPgxpioDQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6819.747&lmt=1551391011751033&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773633&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ttl,ei,susc,app,mime,cnr,dur,lmt&signature=9314348E6D6DCFC75400BCFD192EC27B7DD09042F6BCCCC372E04138A6326440.1E02172F9803481F3F81C54C8884BCE4B03AB857AC022FEE5FF48AE42922AD0F&key=us0#f720p","default":true}]},{"name":"Robo Trái Cây: Cuộc Đào Thoát Vĩ Đại","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/robo-trai-cay-cuoc-dao-thoat-vi-dai_9090/xem-phim/"},"nameOrigin":"Fruity Robo: The Great Escape","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Frobo-trai-cay-cuoc-dao-thoat-vi-dai-fruity-robo-the-great-escape-2016.jpg%3Fsize%3D300"},"directors":["Wang Wei"],"actors":["Ju Yuebin","Zhu Liqing","Lai HongYu"],"genres":["Phim Hành Động","Phim Hoạt Hình"],"countries":["Trung Quốc"],"duration":98,"desc":"Phim Robo Trái Cây: Cuộc Đào Thoát Vĩ Đại - Fruity Robo: The Great Escape (2016): Câu chuyện xảy ra ở một hàng hoa quả trong thị trấn nhỏ vùng nông thôn. Chủ nhân của cửa hàng này là một cậu bé mắc bệnh nặng nhưng vẫn rất yêu đời và nhiệt tình. Ở thị trấn nhỏ này đột nhiên xuất hiện một lũ chuột đáng ghét, chúng phá phách làm loạn mọi ngõ ngách thị trấn. Cậu bé này đã cùng với ROBO trái cây- Cam Lưu Hương dẫn dắt dân làng Hoa quả đấu tranh ác liệt với bọn chuột và thoát ra khỏi sự khống chế của chúng...","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5e6n7r.googlevideo.com/videoplayback?id=cf97b820a001eda1&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6n7r&ms=nxu&mv=u&pl=25&sc=yes&ei=IaHZXIuPF5fP1wKPqJ6YAQ&susc=ph&app=fife&mime=video/mp4&dur=5851.591&lmt=1552401877543208&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773633&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B6A83081E0C98F75CE3776A7E4D962090631773A484D034ED5A857B1E6B49143.4EC940E59450B0B18DD4E32A8FA4A34753930884EC3C1F032A77385130298CC5&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5ednz7.googlevideo.com/videoplayback?id=cf97b820a001eda1&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednz7&ms=nxu&mv=u&pl=25&sc=yes&ei=IaHZXI_KGYqk8gPW1pCgCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5851.591&lmt=1552410532534882&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773633&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=8AD39EF157C51BBE8BFFF517F9B88555475E6E8E95EA3ADAFA8E3F9E02558348.E7E63DEE927F38E3090F478657AE42ECED2CCD13F2188427F30629D04BE5365F&key=us0#f720p","default":true}]},{"name":"Quái Trận Đồ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quai-tran-do_9053/xem-phim/"},"nameOrigin":"Strange Battle","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquai-tran-do-strange-battle-2016.jpg%3Fsize%3D300"},"directors":["Đang cập nhật"],"actors":["Từ Thiếu Cường","Vương Tiểu Nghị","Huỳnh Bạch Lộ"],"genres":["Phim Kinh Dị"],"countries":["Trung Quốc"],"duration":87,"desc":"Strange Battle 2016 dựa trên một sự việc kì lạ xảy ra tại Tương Tây vào năm 1945, bộ phim lần đầu tiên vén bức màn bí mật sự thật kinh hoàng về xuất hiện của ma cà rồng và một loại trùng độc của người dân tộc Mèo. Phim là sự sáng tạo kết hợp bởi nhiều yếu tố thần bí chủ yếu tập trung khám phá sự thần bí của trùng độc, hé lộ những ẩn dấu trong truyền thuyết ma cà rồng, sự xuất hiện của chuông gọi hồn, những con ma cà rồng của vùng núi Tương Tây và các làng cổ người Mèo sẽ thu hút người xem từ đầu đến cuối.","embeds":[{"resolution":360,"embedUrl":"https://r3---sn-4g5e6nsr.googlevideo.com/videoplayback?id=196cee7eeaab3a22&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsr&ms=nxu&mv=u&pl=25&sc=yes&ei=cIrZXJ_UKdPI8gOtnJDoCg&susc=ph&app=fife&mime=video/mp4&dur=5161.192&lmt=1550964735930957&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767824&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=B3E23399B512BD9F5C057D5C5AD74F98AAC9DF982FCFB493B4430B6C3020A02E.C0E393D65275D7991B4E9111F62A2514DA382B97B728A13E7477713C6790B6E0&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r3---sn-4g5e6nsr.googlevideo.com/videoplayback?id=196cee7eeaab3a22&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsr&ms=nxu&mv=u&pl=25&sc=yes&ei=cIrZXLr2LseA1wL10ruYCw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5161.192&lmt=1550968760510941&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767824&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=A03CAFEBB45E08DF7105FCD28F85A73516AB12F7FBB8E1C2B41635AB4AEC4E28.6B25ECD553181C922E11D94E62C23D165FE17F76549D478AA568B1D9A0BB5D68&key=us0#f720p","default":true}]},{"name":"Kong: Đảo đầu lâu","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/kong-dao-dau-lau_9042/xem-phim/"},"nameOrigin":"Kong: Skull Island","year":"2017","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkong-2016-dao-dau-lau-kong-skull-islandkong-dao-dau-lau-2016.jpg%3Fsize%3D300"},"directors":["Jordan Vogt-Roberts"],"actors":["Tom Hiddleston Brie Larson Toby Kebbell Corey Hawkins John C. Reilly Tom Wilkinson Thomas Mann John Goodman Samuel L. Jackson"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Kinh Dị","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":180,"desc":"Kong: Skull Island là bộ phim mới nhất về quái vật huyền thoại của Hollywood kể từ King Kong (2005). Phim lấy bối cảnh chủ yếu tại hòn đảo Đầu Lâu, quê hương của vua loài khỉ. Dự án có sự tham gia của nhiều ngôi sao Hollywood như Tom Hiddleston, Samuel L. Jackson, Brie Larson và John Goodman.Phim được bấm máy tại Australia, Việt Nam và quần đảo Hawaii, nước Mỹ.Australia trở thành điểm đến mới ưa thích dành cho các bom tấn Hollywood. Sau Thor: Ragnarok (2017) và tập phim Alien mới, Kong: Skull Island là dự án tiếp theo tìm đến xứ sở chuột túi. Đội ngũ sản xuất đang tất bật hoàn tất quá trình tiền kỳ để bộ phim có thể bấm máy trong đầu năm 2016.Không chỉ Australia, đoàn làm phim Kong: Skull Island còn đặt chân tới quần đảo Hawaii và Việt Nam trong thời gian tới. Cách đây một năm, bộ phim Pan của Warner Bros. từng tới hang Én, vịnh Hà Long và tỉnh Ninh Bình để bấm máy. Đáng tiếc là tác phẩm giả tưởng lại không được khán giả trên toàn thế giới đón nhận.Tiết lộ về phim trường 'Kong: Skull Island' tại Ninh BìnhBối cảnh quay của phim “Kong: Skull Island” tại Khu du lịch Tràng An – Ninh Bình đã được hoàn thiện, gần hai mươi nóc nhà tre đang chờ đón đoàn làm phim khởi quay bắt đầu từ ngày 27.2.Địa điểm chọn cho bối cảnh của phim là một hòn đảo được bao bọc bởi con sông Sào Khê và những dãy núi. Con đường đến hòn đảo có thể di chuyển bằng hai lối đi. Một lối đi bằng đường bộ, rẽ trái từ hướng đi TP Ninh Bình vào khu du lịch Tràng An. Ô tô có thể đi vào tận nơi của hòn đảo. Lối đi thứ hai là đến bến thuyền Tràng An, đi thuyền qua hang Vạng rồi đến hòn đảo.Diện tích hòn đảo khá rộng, nằm lọt thỏm giữa sự hùng vĩ của những dãy núi với một màu xanh ngút ngàn của cây, mênh mông sóng nước của con sông Sào Khê, khiến cho vẻ đẹp của hòn đảo trở nên hoang sơ, kỳ vĩ.Những túp lều được dựng lên bằng những phiên tre và cọc tre bên cạnh là những bếp lò được đắp đất trông như mai rùa. Hàng chục cột gỗ màu ghi sẫm có nét gân và trên đầu cột gỗ khắc hình giống như biểu tưởng của người da đỏ đã dựng lên. Theo kịch bản của bộ phim, có đoạn Kong sẽ xuất hiện tại một ngôi làng bộ tộc châu Á và phá phách và tàn sát ngôi làng.Nhiều khán giả thích tò mò khi muốn biết đoàn làm phim đã dựng bối cảnh như thế nào nhưng Ban quản lý dự án đoàn làm phim “Kong: Skull Island” cũng như bảo vệ ở đây bảo vệ khá nghiêm ngặt hòn đảo.Ngay từ lối vào độc đạo của đường bộ đã có tấm biển không phận sự miễn vào. Còn lối đi đường sông thì có tấm biển rất to cả bằng tiếng Anh và tiếng Việt cùng với hình ảnh cấm quay, phim chụp ảnh. Có một chiếc ca nô dành cho người quản lý người Pháp, gốc Việt tuần tra quanh đảo, nếu thấy có biểu hiện hay sự lén lút chụp ảnh ở bất kỳ hướng, họ sẽ mời lên “làm việc”.Đội ngũ bảo vệ luôn trực chờ và yêu cầu chủ thuyền cập vào đảo để kiểm tra máy ảnh, xóa ảnh nếu như để du khách cầm máy ảnh và chụp bối cảnh trong đảo.","embeds":[{"resolution":360,"embedUrl":"https://r6---sn-4g5e6ney.googlevideo.com/videoplayback?id=b0d544e5cb061806&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ney&ms=nxu&mv=u&pl=25&sc=yes&ei=I5_ZXNuDE4HA8gOosrGwCA&susc=ph&app=fife&mime=video/mp4&dur=7101.381&lmt=1552422131306885&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773123&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=C2718E0957DB8AAD3FF594E7A938E3BFAD0FD099CBF1FBB4BAA1727E2CEB082E.46995AD3F3903FF04062F7A99A3C90E6F19936BDDEB4A78DE7FE718CF4EB5CA7&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r6---sn-4g5e6ney.googlevideo.com/videoplayback?id=b0d544e5cb061806&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ney&ms=nxu&mv=u&pl=25&sc=yes&ei=I5_ZXPuxGZrj1wLHyrjYAQ&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7101.381&lmt=1552424207372503&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773123&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=AECF9809CFA14997E10C49C6F9DE55FD7EE4B5AB54B4D94EB2531AE7CE482361.9B7F0F68E503CD19FC9739C82D639AC1484E1CA7C0418F9F1B79F0FA95D3559F&key=us0#f720p","default":true}]},{"name":"Sui Gia Đại Chiến 2","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sui-gia-dai-chien-2_9043/xem-phim/"},"nameOrigin":"Enemies In Law","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsui-gia-dai-chien-2-enemies-in-law-2016.jpg%3Fsize%3D300"},"directors":["Kim Jin-Young"],"actors":["Hong Jong Hyun","Jin Se Yun"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":119,"desc":"Chul-Soo (Hong Jong-Hyun) là con trai duy nhất của gia đình truyền thống trộm. Anh ấy trúng tiếng sét ái tình với (Jin Se-Yun) một cảnh sát. Gia đình cô ấy cũng là gia đình cảnh sát truyền thống. Để được sự cho phép kết hôn của gia đình,  Chul-Soo đã phải cố gắng vượt qua kì thi cảnh sát, nhưng bị 2 gia đình ngăn cản.","embeds":[{"resolution":360,"embedUrl":"https://r1---sn-4g5edns7.googlevideo.com/videoplayback?id=212722c7523875d0&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=u&pl=25&sc=yes&ei=K6HZXMn1HpnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&dur=7141.715&lmt=1552373171063341&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773643&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=2EE7BA42FA378455B38AFB0E771326DD384B9A542D42C5EF4545450D14FC9992.260DE3FB117BA2FB47821EBEC1FA5D64DDE9515CDEF67D86DCC4398AFA3B0CC1&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r1---sn-4g5edns7.googlevideo.com/videoplayback?id=212722c7523875d0&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=u&pl=25&sc=yes&ei=K6HZXMi1IZnY1wLIyaLwBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7141.715&lmt=1552376286685760&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557773643&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=300AE1D8653569EC9AEBE4FC4A459F9A602DCA8DCF8DEFE6C479203902CB6FD7.6990CA9DAD28D5F3C851FD032AE422385C89A5C187885862163C3E9DB5A1D6F5&key=us0#f720p","default":true}]},{"name":"45 Ngày Định Mệnh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/45-ngay-dinh-menh_9022/xem-phim/"},"nameOrigin":"The Lobster","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2F45-ngay-dinh-menh-the-lobster-2015.jpg%3Fsize%3D300"},"directors":["Yorgos Lanthimos"],"actors":["Jacqueline Abrahams","Roger Ashton Griffiths","Jessica Barden"],"genres":["Phim Hài Hước","Phim Tâm Lý"],"countries":["Mỹ"],"duration":118,"desc":"Trong The Lobster, bối cảnh là thế giới tương lai được gọi tên là Thành Phố, những người độc thân sinh sống tại đó đều không có tên riêng mà được gọi là Cô Cận Thị, Cô Máu Cam, Cô Bánh Quy, Anh Nói Đớt, Anh Thọt… Riêng nhân vật của Colin Farrell tên là David.Theo luật lệ của Thành Phố, tất cả bị đưa đến Khách Sạn và buộc phải tìm được bạn tình trong thời hạn 45 ngày. Nếu thất bại, họ sẽ bị biến thành thú và đuổi vào Rừng","embeds":[{"resolution":360,"embedUrl":"https://3.bp.blogspot.com/ON_PNTR7oNFJyIW0bdJBV0_ryQDgCTJilrrWPWBEvwVQjlkrpur72bKn0iUTBihH9WqZpWXT-jT98cCrkDH-hJNZbQ1lDr1CMpJ8MnczPwL4hBjWLXDIBJBS0XA7RjZkG0wes6M-gg=m18","default":true},{"resolution":720,"embedUrl":"https://3.bp.blogspot.com/ON_PNTR7oNFJyIW0bdJBV0_ryQDgCTJilrrWPWBEvwVQjlkrpur72bKn0iUTBihH9WqZpWXT-jT98cCrkDH-hJNZbQ1lDr1CMpJ8MnczPwL4hBjWLXDIBJBS0XA7RjZkG0wes6M-gg=m18","default":true},{"resolution":1080,"embedUrl":"https://3.bp.blogspot.com/ON_PNTR7oNFJyIW0bdJBV0_ryQDgCTJilrrWPWBEvwVQjlkrpur72bKn0iUTBihH9WqZpWXT-jT98cCrkDH-hJNZbQ1lDr1CMpJ8MnczPwL4hBjWLXDIBJBS0XA7RjZkG0wes6M-gg=m22","default":true},{"resolution":1440,"embedUrl":"https://3.bp.blogspot.com/ON_PNTR7oNFJyIW0bdJBV0_ryQDgCTJilrrWPWBEvwVQjlkrpur72bKn0iUTBihH9WqZpWXT-jT98cCrkDH-hJNZbQ1lDr1CMpJ8MnczPwL4hBjWLXDIBJBS0XA7RjZkG0wes6M-gg=m22","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/the-lobster-2015/1"},{"name":"Quái Nhân (Phần 1)","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/quai-nhan-phan-1_9019/xem-phim/"},"nameOrigin":"Deadpool","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fquai-nhan-phan-1-deadpool-2016.jpg%3Fsize%3D300"},"directors":["Tim Miller"],"actors":["Ryan Reynolds","Morena Baccarin","T.J. Miller"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":108,"desc":"Nằm trong top 200 nhân vật truyện tranh vĩ đại nhất mọi thời đại do tạp chí Wizard bình chọn, DEADPOOL được biết đến là một trong những siêu anh hùng, dị nhân nổi tiếng nhất trong thế giới Marvel. Không “phụ kiện” – búa, khiêng hay áo ráp như Thor, Captain American, Iron Man, DEADPOOL đơn thuần là một cựu chiến binh đặc nhiệm, tình nguyện tham gia vào chương trình thử nghiệm vũ khí Weapon X. Sau khi hoàn thành quá trình thử nghiệm, anh đã “khám phá” ra những siêu năng lực đặc biệt mới của bản thân.Bộ phim  xoay quanh câu chuyện về Wade Wilson – kẻ ban đầu nằm trong Lực Lượng Đặc Biệt sau đó trở thành một tay lính đánh thuê. Sau khi trải qua một cuộc thử nghiệm tàn khốc, anh có được năng lực tự phục hồi phi thường, từ đó lấy biệt danh Deadpool. Mang trong mình khả năng mới và khiếu hài hước dị thường, Deadpool quyết săn lùng người đàn ông đã hủy hoại cả cuộc đời mình.Xem Quái Nhân (Phần 2) Deadpool 2","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/db8c2e41be1e54232de5b5954f62b6e6/db8c2e41be1e54232de5b5954f62b6e6.playlist.m3u8","default":true}],"subUrl":"https://www.studyphim.vn/movies/getSubtitle/vi/deadpool-2016/1"},{"name":"Truy Sát Băng Đảng","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/truy-sat-bang-dang_8966/xem-phim/"},"nameOrigin":"Kill Kane","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftruy-sat-bang-dang-kill-kane-2016.jpg%3Fsize%3D300"},"directors":["Adam Stephen Kelly"],"actors":["Vinnie Jones","Sean Cronin","Nicole Faraday"],"genres":["Phim Hành Động","Phim Hình Sự"],"countries":["Mỹ"],"duration":74,"desc":"Kill Kane 2016: Câu chuyện xảy ra ở một thành phố đầy rẫy bạo lực, một giáo viên - Ray Brookes sống trong thành phố này, vợ và con của anh đã bị một băng đảng khét tiếng giết chết. Anh không tin vào hệ thống luật pháp trong thành phố có thể giúp anh giành lại công lý cũng như chẳng còn gì để mất, nên anh đã tự mình đi tìm băng đảng khét tiếng đó và trả thù, giành lại công lý.","embeds":[{"resolution":360,"embedUrl":"https://yt3.ggpht.com/AJBK-6d3qEvjPyqSwcWurz0K899f91Ikv6bkOTv5TTa3d3AEkagTXdGWZRzTfQLUFaWQVgI5_DJxFYHDkmW2Z3BpOd0CxomeRITAX1WdKEj7PG4w3y5X2iGCStJ2d-CAgIHyMVxPng=m18","default":false}]},{"name":"Vén Màn Tội Ác","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/ven-man-toi-ac_8977/xem-phim/"},"nameOrigin":"The Veil","year":"2016","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fven-man-toi-ac-the-veil-2017.jpg%3Fsize%3D300"},"directors":["Phil Joanou"],"actors":["Jessica Alba","Thomas Jane","Lily Rab"],"genres":["Phim Kinh Dị"],"countries":["Mỹ"],"duration":93,"desc":"Chuyện phim kể về một người duy nhất sống sót trong vụ tự sát ở một giáo phái lạ cách đây 30 năm. Và rồi người này quay lại đó cùng với một đoàn làm phim tài liệu.","embeds":[{"resolution":360,"embedUrl":"https://3.bp.blogspot.com/WuynR9cpx4CfZzmGX1uWohIitmmc-dFhxdE4o2U0LV9J2k7d5P-MjQFBgrBur0Bwh2GJyXTTo7pdjTQgbItMecVipnOsYNK9=m18","default":false},{"resolution":720,"embedUrl":"https://3.bp.blogspot.com/WuynR9cpx4CfZzmGX1uWohIitmmc-dFhxdE4o2U0LV9J2k7d5P-MjQFBgrBur0Bwh2GJyXTTo7pdjTQgbItMecVipnOsYNK9=m22","default":true}]},{"name":"Câu Chuyện Lúc Nửa Đêm","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cau-chuyen-luc-nua-dem_8827/xem-phim/"},"nameOrigin":"Goosebumps","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcau-chuyen-luc-nua-dem-goosebumps-2017.jpg%3Fsize%3D300"},"directors":["Rob Letterman"],"actors":["Jack Black","Dylan Minnette","Odeya Rush"],"genres":["Phim Hài Hước","Phim Phiêu Lưu","Phim Kinh Dị","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":103,"desc":"Dựa trên bộ truyện kinh dị nổi tiếng cùng tên của tác giả R.L. Stine, Goosebumps (Câu Chuyện Lúc Nửa Đêm) sẽ đưa hàng loạt những quái vật đầu sỏ, quái đản và ranh ma sống dậy trên màn ảnh trong mùa Halloween 2015. Jack Black cùng những người bạn của anh sẽ có một cuộc phiêu lưu đầy vất vả để đưa bộ sậu này trở lại với thế giới của chúng.  Những người từng bị mê hoặc bộ truyện kinh dị - hài hước Goosebumps chắc chắn sẽ vô cùng thích thú khi được chứng kiến cuộc đổ bộ của hàng loạt quái vật quen thuộc trong trailer mới nhất của phim. Mở đầu trailer, nhà văn R.L. Stine (do Jack Black thủ vai) xuất hiện đầy bí ẩn, kỳ quái và có phần “nguy hiểm”. Những hiện tượng lạ xảy ra bên trong nhà của R.L. Stine đã khiến cậu bé hàng xóm - Zach Cooper (Dylan Minnette đóng) tò mò và nghi ngại. Lo sợ cô bé Hannah gặp phải nguy hiểm khi ở chung với người cha kỳ dị, Zach cùng bạn đã đột nhập vào nhà của R.L. Stine. Trong lúc truy tìm bằng chứng bên trong căn nhà, Zach phát hiện một cuốn sách duy nhất đã được khóa kín. Táy máy và hiếu kỳ, Zach mở khóa cuốn sách và thả toàn bộ những quái vật đang bị nhốt bên trong. Cuộc chiến giữa tác giả của bộ truyện - R.L. Stine và những quái vật do chính ông tạo ra bắt đầu.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5edn7y.googlevideo.com/videoplayback?id=adb933e64bdbd366&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edn7y&ms=nxu&mv=u&pl=25&sc=yes&ei=ZKHZXOiFC5G01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6192.390&lmt=1548699113334575&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773700&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=1FFA53550475687C676B6FDCF8DFC9E74AB4B11DE70CA4104C6E00BA935392B3.A4102D246D4D045C5C30564F53B6952F5EF1B5D8CD639C354126F1C68157DF5D&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5e6nz7.googlevideo.com/videoplayback?id=adb933e64bdbd366&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nz7&ms=nxu&mv=u&pl=25&sc=yes&ei=ZKHZXMaYC9KZ8gOw9qWABg&susc=ph&app=fife&mime=video/mp4&dur=6192.390&lmt=1548694602024557&mt=1557765619&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557773700&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=5D9A194F8E4C574E1FB270F0D6CAB61245E572F4CCB3AAA5605FDC5BAC2786F2.1D57A344DFF0BFF0F8C810A4221BE40A229D5E7915F2912199EDEDC134F91935&key=us0","default":false}]},{"name":"Chuyện Ấy Khi Tôi 19","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/chuyen-ay-khi-toi-19_8662/xem-phim/"},"nameOrigin":"Nineteen: Shh! No Imagining","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchuyen-ay-khi-toi-19-nineteen-shh-no-imagining-2015.jpg%3Fsize%3D300"},"directors":["Noh Jin-soo"],"actors":["Choi Won joon","Han Se I","Lee Jae in","Jang Moon yeong"],"genres":["Phim Hài Hước","Phim Tâm Lý","Phim Thuyết Minh"],"countries":["Hàn Quốc"],"duration":78,"desc":"Phim Làm chuyện ấy khi tôi 19 (Nineteen: Shh! No Imagining) của đạo diễn Noh Jin-soo và cùng các diễn viên nổi tiếng như Choi Won-joon, Han Se-i, Kim Min-gi, Lee Jae-in, Kim Cheong-soon, Jang Moon-yeong. Phim kể về cuộc tình của những bạn trẻ mới lớn khi mà tình cờ cờ họ khám phá lẫn nhau.","embeds":[{"resolution":360,"embedUrl":"https://r4---sn-4g5ednld.googlevideo.com/videoplayback?id=1a87f0c7a2df9963&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=u&pl=25&sc=yes&ei=GJbZXLL7Dc2H8gPs36TADg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=4695.167&lmt=1550154290840171&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557770808&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=78F875D21A74D989CA1D0A7DD8F5B197407A21B9B100C98A8CE4EA3D4A1C6EF9.545176F557ACDB5E60B367BB408D4C1AEC54267C760A71FB4B6097DBF21819D1&key=us0","default":true},{"resolution":720,"embedUrl":"https://r4---sn-4g5ednld.googlevideo.com/videoplayback?id=1a87f0c7a2df9963&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednld&ms=nxu&mv=u&pl=25&sc=yes&ei=GJbZXNb0DY-T8gP_uZzIAQ&susc=ph&app=fife&mime=video/mp4&dur=4695.167&lmt=1550148767441539&mt=1557762830&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557770808&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=AAB06F9ECCCC8D5B597C78B1441FA608B98896428EB3BA85735F9541CD63B6CC.7F6E7E9CB41FB6D9C5ACB06A390E44DAAE415762150D461527E8B11FD63775DA&key=us0","default":false}]},{"name":"Thế Giới Khủng Long","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/the-gioi-khung-long_8527/xem-phim/"},"nameOrigin":"Jurassic World","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthe-gioi-khung-long-jurassic-world-2015.jpg%3Fsize%3D300"},"directors":["Colin Trevorrow"],"actors":["Chris Pratt","Bryce Dallas Howard","Ty Simpkins"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":["Mỹ"],"duration":124,"desc":"Katie (Lucy Hale) và Sara (Phoebe Strole) đã là bạn từ thời thơ ấu. Họ bước vào đại học với nhau, nơi 22 năm trước (1993), cánh cửa “Jurassic Park” (Tựa Việt: Công viên kỷ Jura) lần đầu tiên mở ra trên màn ảnh rộng, cuốn khán giả vào một thế giới của những trò chơi đầy mạo hiểm. Bộ phim viễn tưởng – phiêu lưu của đạo diễn lừng danh Steven Spielberg này được dựa theo cuốn tiểu thuyết cùng tên của nhà văn Michael Crichton, với câu chuyện xảy ra sau khi con người “tái sinh” thành công loài khủng long từ ADN mà muỗi hút được trong hổ phách. Một công viên giải trí mở ra trên hòn đảo gần Costa Rica để du khách được dịp thỏa mãn sự hiếu kỳ, nhưng đồng thời, những nguy hiểm cũng bắt đầu từ đây.Sự thành công cả về mặt thương mại và giải trí của Jurassic Park đã thôi thúc các nhà làm phim sản xuất tiếp phần 2 “The Lost World: Jurassic Park” (1997) và “Jurassic Park III” (2001).Trong năm 2015, khán giả sẽ được quay trở lại với thế giới khủng long đã làm nên hiện tượng trên toàn thế giới với quy mô lớn hơn, hoành tráng hơn và đồng thời kịch tính hơn với phần thứ 4 của series có tựa đề JURASSIC WORLD: THẾ GIỚI KHỦNG LONG.Cánh cửa Jurassic World mở ra cũng là lúc biết bao ký ức về công viên kỷ Jura ùa về, nhưng quy mô nơi đây đã lớn hơn với nhiều trò chơi hoành tráng hơn, mạo hiểm hơn. Công viên mới này được sở hữu bởi Tập đoàn Masrani, và đội ngũ nhân viên của Jurassic World vẫn đang tiếp tục nghiên cứu một loại gien lai nhằm tạo ra một loài khủng long mới. Những nỗ lực này dường như đem lại kết quả ngược với mong đợi, khi con khủng long có trí thông minh vượt bậc đang được thí nghiệm đã thoát ra và “sẽ giết bất cứ thứ gì di chuyển”. Khán giả đã được chứng kiến những cảnh rượt đuổi đầy kịch tính và phần đồ họa đẹp mắt, hứa hẹn một mùa hè bùng nổ với JURASSIC WORLD: THẾ GIỚI KHỦNG LONG.","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767469&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152365%26authkey%3DAPXKqMisJx-qKps&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}]},{"name":"Biệt Đội Siêu Anh Hùng: Đế Chế Ultron","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/biet-doi-sieu-anh-hung-de-che-ultron_8466/xem-phim/"},"nameOrigin":"Avengers: Age of Ultron","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fbiet-doi-sieu-anh-hung-de-che-ultron-avengers-age-of-ultron-2015.jpg%3Fsize%3D300"},"directors":["Joss Whedon"],"actors":["Robert Downey Jr.","Chris Evans","Mark Ruffalo"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":141,"desc":"Những bộ phim của Marvel chưa bao giờ thôi \"khuynh đảo\" fan hâm mộ, dù mới chỉ đang nằm trong máy quay hay khi đã thực sự ra rạp. Bởi vậy nên mặc dù đến tận tháng 5.2015 mới công chiếu, nhưng tên của bom tấn AVENGERS: AGE OF ULTRON chắc chắn đã rất quen thuộc với nhiều khán giả. Đây là phần tiếp theo của bom tấn The Avengers vô cùng thành công vào năm 2012. Trong phần 2 này, khán giả chắc chắn sẽ bất ngờ khi chứng kiến 'Iron Man’ Tony Stark (Robert Downey Jr.) sẽ trở thành “kẻ xấu”. Thực ra, vai phản diện thực sự của phim chính là một con robot mang tên Ultron do Tony chế tạo. Mệt mỏi vì công việc của một nhà sáng chế, doanh nhân và cả trách nhiệm của một siêu anh hùng, anh đã quyết định tạo ra Ultron để thay mình bảo vệ thế giới. Nhưng ý tưởng đã thất bại, Ultron trở nên mất kiểm soát và biến thành một cỗ máy sát nhân máu lạnh. Khi hòa bình lại bị đe dọa, đó cũng là lúc biệt đội Avengers phải trở lại và ra tay. Ngoài ra, khán giả chắc chắn sẽ chờ đợi xem có sự thay đổi nào trong tạo hình của các nhân vật như Thor (Chris Hemsworth), Captain America (Chris Evans), Bruce Banner/Hulk (Mark Ruffalo) hay Natasha Romanoff/Black Widow (Scarlett Johansson). Đáng chú ý nhất là trường hợp của Scarlett, cô mang thai con đầu lòng đúng lúc bộ phim sắp khởi quay. Để giúp cô vượt qua những màn hành động dày đặc trong phim, nhà sản xuất đã phải thuê đến 3 diễn viên đóng thế với ngoại hình gần tương tự Scarlett. Đồng thời, những bộ phục trang Black Widow cũng được thiết kế đặc biệt để phù hợp với sự thay đổi về hình thể trong suốt thời gian quay phim của Scarlett. ","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/44e521d6425291069642abdb11dd614f/44e521d6425291069642abdb11dd614f.playlist.m3u8","default":true}]},{"name":"Người Thừa Kế Vũ Trụ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/nguoi-thua-ke-vu-tru_8440/xem-phim/"},"nameOrigin":"Jupiter Ascending","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-thua-ke-vu-tru-jupiter-ascending-2015.jpg%3Fsize%3D300"},"directors":["Andy Wachowski"],"actors":["Channing Tatum","Mila Kunis","Eddie Redmayne"],"genres":["Phim Hành Động","Phim Viễn Tưởng"],"countries":["Mỹ"],"duration":127,"desc":"Trong Jupiter Ascending bộ phim mới nhất từ hai nhà đạo diễn lừng danh – tác giả của loạt phim “The Matrix” này, nhân vật chính Jupiter Jones (Mila Kunis thủ vai) được sinh ra dưới bầu trời đêm với điềm báo rằng định mệnh của cô sẽ gắn liền với những điều vĩ đại. Giờ đây khi đã lớn, Jupiter vẫn mơ về các vì sao nhưng lại tỉnh giấc giữa thực tại lạnh lẽo với công việc tầm thường lau dọn nhà vệ sinh và thường xuyên gặp phải các sự cố liên miên. Chỉ khi Caine (Channing Tatum), một thợ săn là cựu chiến binh kiêm kỹ sư cơ khí đáp phi thuyền xuống Trái Đất để truy tìm dấu vết của Jupiter thì cô mới lờ mờ nhận ra định mệnh vẫn đang chờ đón ở phía trước – những dấu hiệu đặc trưng từ khi mới ra đời đã cho biết cô là thế hệ tiếp theo kế thừa một di sản có nguồn sức mạnh siêu việt sẽ thay đổi cả trật tự của vũ trụ.  ","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5e6nsk.googlevideo.com/videoplayback?id=810402a33a037edc&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nsk&ms=nxu&mv=u&pl=25&sc=yes&ei=0orZXPf6FZG01wKllZHoCA&susc=ph&app=fife&mime=video/mp4&dur=7654.318&lmt=1552566136914721&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767922&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=484D2735A9CB5F1913222730C4674444590968CE112797A246C3459365704735.9BCC108ECB28560EA02D02CDF7F7485C2EF6F3247C791B885266B95BEADE48E3&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5ednek.googlevideo.com/videoplayback?id=810402a33a037edc&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednek&ms=nxu&mv=u&pl=25&sc=yes&ei=0orZXIyjGJaw1wKDxYKgDw&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7654.318&lmt=1552572086818316&mt=1557760027&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557767922&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=11F3CEDE6B4F499B6C72B21B74956F5A9F281D31C8891628F247DC2D2C39E539.6D62D2CCAD7A0F8D5E23E8F50DDEF3B7FB10BE83DE55D1AD1E802B4CFD8B742B&key=us0#f720p","default":true}]},{"name":"Thiết Quyền Vương 2","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/thiet-quyen-vuong-2_8400/xem-phim/"},"nameOrigin":"The Man with the Iron Fists 2","year":"2015","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fthiet-quyen-vuong-2-the-man-with-the-iron-fists-2-2015.jpg%3Fsize%3D300"},"directors":["Roel Reiné"],"actors":["Sahajak Boonthanakit","Pim Bubear","Ocean Hou"],"genres":["Phim Hành Động","Phim Võ Thuật"],"countries":["Mỹ"],"duration":90,"desc":"Phim The Man with the Iron Fists 2 xoay quanh người đàn ông Blacksmith bị thương ngã xuống con suối và trôi dạt đến ngôi làng nhỏ. Con gái của Lee Kung phát hiện ra Blacksmith và mang anh về nhà chữa trị vết thương. Cuộc chạm trán với Blacksmith khiến cho thân thế từng là sát thủ lẫy lừng chốn giang hồ của Lee Kung có nguy cơ bị lộ. Từ lâu, sau nhiều nợ máu, Kung gác kiếm quy ẩn ở ngôi làng này bên vợ và đứa con gái. Lúc này, khi ngôi làng của anh bị một đạo quân về trấn áp, đe dọa áp bức người dân để khai thác khoáng sản, Blacksmith động viên Lee Kung hé lộ thân phận để đồng lòng cùng dân làng đứng lên chống lại kẻ thù.","embeds":[{"resolution":360,"embedUrl":"https://xpsp2p1.playphim.info/hls/fc3d604db45555592403102451967632/fc3d604db45555592403102451967632.playlist.m3u8","default":true}]},{"name":"Sát Thủ Chuyên Nghiệp","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/sat-thu-chuyen-nghiep_7588/xem-phim/"},"nameOrigin":"Léon: The Professional","year":"1994","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fsat-thu-chuyen-nghiep-leon-the-professional-1994.jpg%3Fsize%3D300"},"directors":["Jean Reno","Gary Oldman","Natalie Portman"],"actors":["Phim Hình Sự","Phim Tâm Lý"],"genres":[""],"countries":["Mỹ"],"duration":136,"desc":"Léon (còn có tên The Professional hay Léon: Professional) là một phim tâm lí hình sự của Pháp với lời thoại bằng tiếng Anh do đạo diễn người Pháp Luc Besson viết kịch bản và đạo diễn. Các diễn viên tham gia trong phim bao gồm diễn viên Pháp kì cựu Jean Reno, Gary Oldman và nữ diễn viên trẻ Natalie Portman trong bộ phim đầu tay của cô. Phim được đề cử 7 giải César, trong năm 2008, tạp chí Empire đã xếp hạng ở vị trí 227 trong danh sách 500 phim hay nhất của mọi thời đại, được đánh giá rất cao trên Imdb.com, được chấm 8.6/10 và đứng thứ 34 trong Top 250 phim hay nhất mọi thời đại.Léon Montana (Jean Reno) là một sát thủ chuyên nghiệp nhưng mù chữ (hoặc \"Người lau dọn\" như ông ta tự nói về mình), sống một cuộc sống cô độc tại khu phố người Ý ở New York. Công việc của ông luôn được giao bởi \"ông trùm\" Tony (Dany Aiello), chủ nhà hàng \"Supreme Macaroni Company\". Mỗi ngày, ông dùng cuộc sống lặng lẽ của mình vào việc tập luyện Calisthenics, chăm sóc một cái cây mà ông ta cho là \"người bạn tốt nhất\", nghe nhạc Gene Kelly, và chỉ ngủ ở tư thế ngồi trên ghế.Vào một ngày, ông gặp Mathilda Lando (Natalie Portman), một cô bé 12 tuổi sống trong một gia đình không hạnh phúc chung hành lang với căn hộ của ông, đang hút thuốc. Người cha hay mắng chửi và người mẹ sống một sống tự hưởng thụ thậm chí không biết đến việc cô bé đã bỏ học đến 2 tuần liên tiếp, khi cô bé giả giọng mẹ trả lời với giáo viên qua điện thoại rằng: \"con bé chết rồi\". Cha của Mathilda nằm trong đường dây thuốc phiện của những đặc vụ DEA tha hóa, những kẻ thuê hắn tàng trữ hàng trong khu phố người Ý. Sau khi phát hiện hắn trộm bớt ma túy của mình, nhóm đặc vụ này, dẫn đầu bởi tên nghiện thuốc phiện nặng Norman Stansfield (Gary Oldman), xông vào căn hộ của Mathilda và giết cả gia đình cô bé. Chỉ mình cô sống sót nhờ xuống của hàng tạp hóa, cô bé về nhà khi những kẻ sát nhân còn ở đó và bất đắc dĩ cô phải trốn vào căn hộ của Léon để tránh sự sát hại của chúng.Mathilda phát hiện Léon là một sát thủ, cô bé cầu xin ông chăm sóc và huấn luyện cô những kĩ năng để trở thành \"người lau dọn\", cô muốn trả thù cho em trai 4 tuổi của mình, người duy nhất mà cô bé yêu thương thật sự trong gia đình. Sau nhiều lần bị từ chối, cuối cùng Mathilda cũng được Léon dạy cách sử dụng súng và thực hiện nhiều phi vụ với Léon, đổi lại việc cô phải làm việc nhà và dạy chữ cho Léon. Nhiều lần Mathilda nói yêu Léon nhưng ông chỉ phớt lờ đi.Sau khi đột nhập lại vào nhà cũ và tìm được số tiền của cha mình, cô bé đề nghị Léon nhận lấy số tiền và giết \"Stan\"(Stanfield). Léon từ chối và nói với Mathilda rằng trả thù là điều tồi tệ nhất, rằng ngay cả khi làm được điều đó đi nữa thì cuộc sống người ta vẫn thế, và mỗi đêm ta sẽ phải ngủ với chỉ một con mắt nhắm.Mathilda quyết định trả thù một mình, nhưng cô bé nhanh chóng bị Stan phát hiện và bắt giữ tại văn phòng của hắn, cùng lúc khi Léon giết chết 2 thủ hạ của hắn ở khu phố người Hoa. Léon sau khi đọc được dòng chữ Mathilda để lại ở nhà đã lập tức đến giải cứu cô bé. Đêm đó, Mathilda lại một lần nữa nói yêu Léon nhưng ông từ chối, trả lời câu hỏi tại sao của Mathilda, Léon kể tấn bi kịch của đời mình...Tức giận vì tên \"Sát thủ người Ý\", Stan đến nhà hàng của Tony và tra tấn ông đến khi Tony khai ra nơi ở của Léon. Sau khi bắt được Mathilda làm con tin, Stan cử một biệt đội đến 200 người tới để giết Léon. Thoát được vòng vây của cảnh sát, Léon cứu được Mathilda và tạo đường thoát cho cô bé bằng đường ống nước. Ông cầu xin cô bé chạy thoát và nói với Mathilda rằng cô đã cho ông biết hương vị của cuộc sống. Léon sau đó cải trang thành cảnh sát bị thương để thoát ra ngoài nhưng bị Stan phát hiện và sát hại. Trước khi chêt dưới tay Stan, Léon nói với Stan ông có một món đồ từ Mathilda và nhét vào tay Stan cái khóa an toàn của lựu đạn (The ring trick), cả hai sau đó cùng chết trong vụ nổ.Mathilda, sau khi thoát ra ngoài, đã đến chỗ của Tony để lấy số tiền Léon để lại, nhưng Tony chỉ đưa cho cô bé một số tiền nhỏ và đuổi cô đi. Không còn nơi nào để đi, cô bé đến New Jersey để quay lại trường cũ. Sau khi kể lại câu chuyện của Léon cho hiệu trưởng, cô bé được phép ở lại trường. Phim kết thúc với cảnh Mathilda ra vườn sau của ngôi trường và trồng xuống đất chậu cây của Léon, như cô bé đã từng nói với Léon, hãy cho nó mọc rễ.","embeds":[{"resolution":360,"embedUrl":"https://r5---sn-4g5edns7.googlevideo.com/videoplayback?id=38114421c759add8&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=m&pl=25&sc=yes&ei=F4bZXOnrNImu1wLbmqqYDA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=7969.158&lmt=1555999767274332&mt=1557759426&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766711&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=AF7DCC666D437D22086612EC5E86A49E4C8AE8870629D6C9ACBF1D92731C9429.7C8ABF4C98EA5DD5018D8733CEFCCCA8E1206BF02B31F9461387297FA1F9E0E7&key=us0","default":true},{"resolution":720,"embedUrl":"https://r5---sn-4g5edns7.googlevideo.com/videoplayback?id=38114421c759add8&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns7&ms=nxu&mv=m&pl=25&sc=yes&ei=F4bZXNq2NMWK8gPLzbGYCw&susc=ph&app=fife&mime=video/mp4&dur=7969.158&lmt=1555996887031903&mt=1557759426&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1557766711&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=A02102009916FE85C7E0E94B71A08BF099697F52207A8B770375C5EE944EB1D8.B5368640B91C57DCE843E9BF82A886E7940F7BBAFBD087F26A4D9665109BB6C6&key=us0","default":false}]},{"name":"Bộ Tứ","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/bo-tu_7222/xem-phim/"},"nameOrigin":"Yozakura Quartet Tsuki ni Naku","year":"2012","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fyozakura-quartet-tsuki-ni-naku-yozakura-quartet-tsuki-ni-naku-2012.jpg%3Fsize%3D300"},"directors":["Nhiều Diễn Viên"],"actors":["Phim Hoạt Hình"],"genres":[""],"countries":["Nhật Bản"],"duration":30,"desc":"Câu chuyện xoay quanh bộ tứ và chuyến đi chơi của họ","embeds":[{"resolution":360,"embedUrl":"https://00e9e64bacb7fa9b21fd04dc628260bb2092e96aaf2c75f7e6-apidata.googleusercontent.com/download/drive/v3beta/files/0BwdfG92VSyIVWl9aRHFZN2x2N1E?qk=AD5uMEsUJVC0OFcOCVpwRnFQlvx4beFn5y3QYP7AFvFjl8zk6TD90Exuw3sRQJaUTQ37QznzZrM_W7Sw7F1trfYhGKov21MdWbl6SinmKX8Qrs-KZLyDrGSy4x40svwLDKBMYbPOyBbqe8mdTHeSTJSw2fXKPk7RK7svdsD_Yjhw-3xsk01YAXHgyzjb84PAUweSdKXH1PR9uzL-SU5l10CIBFejzAMM7n8e20RofTpi_XngC9p9OiBfI7k-woC6FkKrYWXXTIbW","default":true}]},{"name":"Lâm Thế Vinh","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/lam-the-vinh_6672/xem-phim/"},"nameOrigin":"Magnificent Butcher","year":"1979","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Flam-the-vinh-magnificent-butcher-1979.jpg%3Fsize%3D300"},"directors":["Sammo Hung Kam Bo","Hoi Sang Lee","Pai Wei","Biao Yuen"],"actors":["Phim Cổ Trang","Phim Hoạt Hình"],"genres":[""],"countries":["Trung Quốc"],"duration":108,"desc":"Bộ phim hành động, võ thuật, hài hước của Hồng Kông, với sự góp mặt của ngôi sao điện ảnh như: Hồng Kim Bảo, Nguyên Bưu..","embeds":[{"resolution":360,"embedUrl":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1557767811&rver=7.1.6819.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152375%26authkey%3DAHo-reF9X3soPQc&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","default":true}]},{"name":"Chạm Vào Bóng Tối","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/cham-vao-bong-toi_6551/xem-phim/"},"nameOrigin":"Dark Touch","year":"2013","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcham-vao-bong-toi-dark-touch-2013.jpg%3Fsize%3D300"},"directors":["Clare Barrett","Padraic Delaney","Robert Donnelly","Richard Dormer"],"actors":["Phim Kinh Dị"],"genres":[""],"countries":["Mỹ"],"duration":90,"desc":"Trong một thị trấn xa xôi ở Ai-len, cô bé Neve mười một tuổi là người sống sót duy nhất của một vụ thảm sát đẫm máu. Cha mẹ và em trai cô bé bị sát hại. Nghi ngờ một nhóm những kẻ giết người, cảnh sát đã bỏ qua lời giải thích của Neve rằng ngôi nhà chính là thủ phạm gây ra bi kịch này. Nat and Lucas nhận nuôi cô bé, họ cố gắng cho cô bé 1 cuộc sống bỉnh thường, cố hàn gắn vết thương trong cô nhưng Neve không thể tìm thấy sự yên bình .Thế lực hắc ám lại tiếp tục trỗi dậy","embeds":[{"resolution":360,"embedUrl":"https://r2---sn-4g5ednse.googlevideo.com/videoplayback?id=dccea3f85533c87e&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5ednse&ms=nxu&mv=u&pl=25&sc=yes&ei=qabZXIG2LtWm8gPgxpioDQ&susc=ph&app=fife&mime=video/mp4&dur=5488.198&lmt=1551221379527512&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557775049&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=C177CCC712E8BD4FEA160BAF7E8D90980C440F55E65677A159934E1D9418A934.C03129585D87F1E0FBF555652E8702678B01D8F98C4A47846459625F7E9F5D1F&key=us0#f360p","default":true},{"resolution":720,"embedUrl":"https://r2---sn-4g5e6ns6.googlevideo.com/videoplayback?id=dccea3f85533c87e&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6ns6&ms=nxu&mv=u&pl=25&sc=yes&ei=qabZXI7tMLGL8gPr66LYBA&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=5488.198&lmt=1551223746762139&mt=1557767420&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.58.181&expire=1557775049&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=3E29AA6B34BF53E8FC18866928DE2AC44A9FB5D7F6EB8739548D43318425BAB0.38DC3EC8D355011180C98997BAC8EA0634CB66B15A7F7F16D23EFCAE559E24EC&key=us0#f720p","default":true}]},{"name":"Cô Gái Flower","provider":{"name":"phim3s","viewUrl":"https://phim3s.pw/phim-le/co-gai-flower_6456/xem-phim/"},"nameOrigin":"Kowarekake no Orgel","year":"2009","thumbnails":{"medium":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkowarekake-no-orgel-kowarekake-no-orgel-2009.jpg%3Fsize%3D300"},"directors":["Nhiều Diễn Viên"],"actors":["Phim Hoạt Hình"],"genres":[""],"countries":["Nhật Bản"],"duration":28,"desc":"Câu chuyện xoay quanh Keiichiro, một chàng thanh niên trẻ sống độc thân. Anh đã phải trả qua rất nhiều nỗi đau trong cuộc đời mình kể từ khi gia đình anh chết bởi tai nạn giao thông mà anh là người duy nhất sống sót. Một ngày mưa khi anh đang tìm nơi trú ẩn trong một ngôi đền cũ. Anh đã phát hiện ra một cô gái nhỏ đang ngồi trên ghế và bị bao quanh bởi rác thải. Bản thân cô bé cũng là \"rác\" - một con robot đã bị người khác bỏ rơi ở đây. Anh đã đưa cô robot đến tiệm sửa chữa nhưng câu trả lời anh nhận được là không thể sửa được. Khi về đến nhà, anh đã để cô robot vào căn phòng tắm dơ bẩn. Đến sang hôm sau Keiichiro nhìn thấy cô bé robot trong nhà bếp và đang chuẩn bị bữa sáng. Cô bé quên mất tên của mình nên Keiichiro đã dựa theo bông hoa hướng dương trong phòng và đặt tên cô bé là Flower. Và cuộc sống của hai người bắt đầu diễn ra...","embeds":[{"resolution":360,"embedUrl":"https://00e9e64bac1a7e292dab77f4561ec1eb613a579af477885c83-apidata.googleusercontent.com/download/drive/v3beta/files/0B5JHaInEzQOIUXdaUFlweXZxeEk?qk=AD5uMEuWdTeyMdWmqOuFyYKXK-h29EO5WnWu6zIQtaguuRjgmb9cmNqkgpe-h3S25onVw7-HZDBqSE3tlXBk-4J1KUPeNx36jblIJh0wSSVbfPyuJ0KC5BlPK0FaW2_tkI4TpTClu6OyL5JXhweSyhzg15M7jxS6cmzFUU3mmSEmZjIq6wdB8_HcFkk1oFJSXmDmG1JJ9dC0O-Uq7LuVt9s_8SmWt7ejIijcRXHOSDYKj8E2UFsWCjG3B0hlZjZkXBojtH1l_4ko","default":true}]}]

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("log-to-file");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("mongoose-float");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("role-acl");

/***/ })
/******/ ]);