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
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
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

var _logToFile = __webpack_require__(121);

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
exports.logPost = logPost;
exports.setSlugUrl = setSlugUrl;

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logPost(schema, options) {
	schema.post('init', function (doc) {
		console.log(`${options.schemaName || 'Model'}: ${doc.name || doc.title || doc._id} has been initialized`);
	});

	schema.post('validate', function (doc) {
		console.log(`${options.schemaName || 'Model'}: ${doc.name || doc.title || doc._id} has been validated`);
	});

	schema.post('save', function (doc) {
		console.log(`${options.schemaName || 'Model'}: ${doc.name || doc.title || doc._id} has been saved`);
	});

	schema.post('remove', function (doc) {
		console.log(`${options.schemaName || 'Model'}: ${doc.name || doc.title || doc._id} has been removed`);
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
		if (this.nameOrigin) {
			if (schema.paths.slugOrigin) {
				this.slugOrigin = (0, _slugify2.default)(this.nameOrigin);
			}
		}
		next();
	});
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 11 */
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
	const sort = req.query.sort || '-createdAt';

	req.parsedParams = {
		page,
		limit,
		sort
	};

	if (offset) {
		req.parsedParams.offset = offset;
	}
	next();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.accessControl = accessControl;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _accessControlService = __webpack_require__(109);

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
/* 13 */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),
/* 14 */
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
	UPLOAD_VBEE_TOKEN: '30065a2c-cdf1-4316-8827-488557133f54'
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authFacebook = exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(37);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(127);

var _passportFacebook = __webpack_require__(125);

var _passportJwt = __webpack_require__(126);

var _userModel = __webpack_require__(24);

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _helper = __webpack_require__(1);

var _axios = __webpack_require__(35);

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
/* 16 */
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
exports.existMember = existMember;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followMovieModel = __webpack_require__(20);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _likeModel = __webpack_require__(22);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _memberModel = __webpack_require__(23);

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
		res.followUser = await _followMovieModel2.default.findOne(Object.assign({}, req.body, { user: req.user }));

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
exports.ownMovie = ownMovie;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieModel = __webpack_require__(21);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFloat = __webpack_require__(122);

var _mongooseFloat2 = _interopRequireDefault(_mongooseFloat);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId; /**
                                                            * @typedef movies
                                                            * @property {string} _id
                                                            * @property {string} movieName
                                                            */

// import validator from 'validator'
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
		type: Boolean
	}
});

let movieSchema = new _mongoose.Schema({
	name: {
		type: String,
		unique: true,
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
		type: Date,
		trim: true
	},
	category: {
		type: String,
		enum: ['single', 'series'],
		default: 'single',
		trim: true
	},
	countries: {
		type: Array,
		// ref: 'Country',
		// autopopulate: true,
		trim: true
	},
	uploader: {
		type: ObjectId,
		ref: 'User',
		autopopulate: true,
		required: [true, 'Uploader is required!'],
		// hung-dev
		default: '5ca016de421fa21ea0524815',
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
		unique: true,
		trim: true
	},
	slugOrigin: {
		type: String,
		unique: true,
		trim: true
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
	// series: {
	// 	type: ObjectId,
	// 	ref: 'Series',
	// 	trim: true
	// },
	isAdult: {
		type: Boolean,
		default: false
	},
	subUrl: {
		type: String,
		trim: true
	},
	enSubUrl: {
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

movieSchema.pre('save', function (next) {
	if (this.country) {
		this.countries.push(this.country);
	}
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = __webpack_require__(113);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(36);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(120);

var _lodash2 = _interopRequireDefault(_lodash);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

var _regex = __webpack_require__(25);

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
		default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg'
	},
	token: {
		type: String,
		trim: true
	},
	uploadedCount: {
		type: Number,
		trim: true
	}
}, {
	timestamps: true
});

userSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

userSchema.pre('save', function (next) {
	console.log(this);
	if (this.isModified('password')) {
		this.password = this._hashPassword(this.password);
	}

	return next();
});

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
		return _lodash2.default.pick(this, ['_id', 'email', 'name', 'gender', 'role', 'avatarUrl', 'provider']);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const countryCodeReg = exports.countryCodeReg = /^\w{2}$/;

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(9);

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
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRequest = createRequest;
exports.acceptRequest = acceptRequest;
exports.getRequestsByUserId = getRequestsByUserId;
exports.getFriendsByUserId = getFriendsByUserId;
exports.getRelationshipsStats = getRelationshipsStats;
exports.getRelationships = getRelationships;
exports.getRelationshipById = getRelationshipById;
exports.createRelationship = createRelationship;
exports.updateRelationship = updateRelationship;
exports.deleteRelationship = deleteRelationship;

var _relationshipModel = __webpack_require__(99);

var _relationshipModel2 = _interopRequireDefault(_relationshipModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _relationshipUtil = __webpack_require__(101);

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
		let _ref = await _relationshipModel2.default.paginate({}, req.parsedParams),
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkSynthesis = checkSynthesis;
exports.uploadVoiceover = uploadVoiceover;
exports.callbackSynthesis = callbackSynthesis;
exports.getVoiceoversStats = getVoiceoversStats;
exports.getVoiceovers = getVoiceovers;
exports.getVoiceoverById = getVoiceoverById;
exports.createVoiceover = createVoiceover;
exports.updateVoiceover = updateVoiceover;
exports.deleteVoiceover = deleteVoiceover;

var _voiceoverModel = __webpack_require__(107);

var _voiceoverModel2 = _interopRequireDefault(_voiceoverModel);

var _movieModel = __webpack_require__(21);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _synthesisService = __webpack_require__(34);

var synthesisService = _interopRequireWildcard(_synthesisService);

var systhesisService = _interopRequireWildcard(_synthesisService);

var _fileService = __webpack_require__(110);

var fileService = _interopRequireWildcard(_fileService);

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _helper = __webpack_require__(1);

var _request = __webpack_require__(38);

var _request2 = _interopRequireDefault(_request);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

var _multiparty = __webpack_require__(124);

var _multiparty2 = _interopRequireDefault(_multiparty);

var _util = __webpack_require__(129);

var _util2 = _interopRequireDefault(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @group voiceovers - Operations about voiceovers
 *
 */

/* eslint-disable no-unused-vars */
async function checkSynthesis(req, res, next) {
	try {
		let voiceoverChecked = await synthesisService.checkSynthesis(req.params.requestId);

		let voiceover = await _voiceoverModel2.default.find({
			requestId: voiceoverChecked.requestId
		});

		if (voiceover.status !== 'done' && voiceoverChecked && voiceoverChecked.status == 'done') {
			voiceover = Object.assign(voiceover, voiceoverChecked);
			await voiceover.save();
			res.voiceover = voiceover;
		} else {
			res.voiceover = voiceoverChecked;
		}

		let file = await fileService.uploadFile('test', false, 'https://i.vimeocdn.com/portrait/25122243_300x300');
		// console.log(file)
		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function uploadVoiceover(req, res, next) {
	try {
		var form = new _multiparty2.default.Form();

		// await form.parse(req, async function(err, fields, files) {
		// 	// 	res.writeHead(200, { 'content-type': 'text/plain' })
		// 	// 	res.write('received upload:\n\n')
		// 	// 	res.end(util.inspect({ fields: fields, files: files }))
		// 	console.log(files.file)
		// await request.post(
		// 	{
		// 		url: 'https://upload.vbee.vn/api/v1/upload/file',
		// 		headers: {
		// 			authorization: cons.UPLOAD_VBEE_TOKEN
		// 		},
		// 		formData: {
		// 			path: '/test',
		// 			overwrite: 'false',
		// 			file: request(
		// 				'https://raw.githubusercontent.com/svenhornberg/pipeupload/master/LICENSE'
		// 			)
		// 		}
		// 	},
		// 	(error, response, body) => {
		// 		console.error('error:', error) // Print the error if one occurred
		// 		console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
		// 		console.log('body:', body) // Prin
		// 		res.file = JSON.parse(body)
		// 		next()
		// 	}
		// )
		// fileService.uploadFile(
		// 	'test',
		// 	'false',
		// 	'https://raw.githubusercontent.com/svenhornberg/pipeupload/master/LICENSE',
		// 	function(uploadedFile) {
		// 		console.log(uploadedFile)
		// 	}
		// )
		// console.log('object')

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

		fileService.uploadFile('/voiceovers', 'false', synthesised.downloadUrl, async function (uploadedFile) {
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

async function getVoiceovers(req, res, next) {
	const limit = parseInt(req.query.limit, 0);
	const skip = parseInt(req.query.skip, 0);

	try {
		res.voiceovers = await _voiceoverModel2.default.find(Object.assign({}, req.query));

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
		if (res.movie.subUrl) {
			let requestSysthesis = await systhesisService.requestSynthesis(res.movie.subUrl, null);

			let vc = await _voiceoverModel2.default.create({
				requestId: requestSysthesis.requestId,
				movie: res.movie._id,
				uploader: req.user || ''
			});
		}
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
exports.requestSynthesis = requestSynthesis;
exports.requestResynthesis = requestResynthesis;
exports.checkSynthesis = checkSynthesis;
exports.doneSynthesis = doneSynthesis;

var _axios = __webpack_require__(35);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import HTTPStatus from 'http-status'

async function requestSynthesis(subUrl, voice = 'hn_male_xuantin_vdts_48k-hsmm') {
	let url = 'http://api.thuyetminhphim.vn/synthesis';
	let callback = 'http://api-social.thuyetminhphim.com/api/voiceovers/callback';
	return await _axios2.default.get(`${url}?SUBTITLE_URL=${subUrl}&VOICE=${voice}&CALLBACK=${callback}`).then(function (response) {
		return response.data;
	}).catch(function (e) {
		console.log('error', e);
		throw e;
	});
} /* eslint-disable no-console */
async function requestResynthesis(requestId) {
	return await _axios2.default.get(`http://api.thuyetminhphim.vn/resynthesis?request_id=${requestId}`).then(function (response) {
		return response.data;
	}).catch(function (e) {
		console.log('error', e);
		throw e;
	});
}

async function checkSynthesis(requestId) {
	return await _axios2.default.get('http://api.thuyetminhphim.vn/check?request_id=' + requestId).then(function (response) {
		return response.data;
	}).catch(function (e) {
		// eslint-disable-next-line no-console
		console.log('error', e);
		throw e;
	});
}

function doneSynthesis(movieId, subUrl) {}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(14);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _morgan = __webpack_require__(123);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(114);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(115);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(119);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(37);

var _passport2 = _interopRequireDefault(_passport);

var _cors = __webpack_require__(117);

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = __webpack_require__(116);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _authMiddleware = __webpack_require__(48);

var _actorRoute = __webpack_require__(51);

var _actorRoute2 = _interopRequireDefault(_actorRoute);

var _countryRoute = __webpack_require__(55);

var _countryRoute2 = _interopRequireDefault(_countryRoute);

var _directorRoute = __webpack_require__(60);

var _directorRoute2 = _interopRequireDefault(_directorRoute);

var _followMovieRoute = __webpack_require__(64);

var _followMovieRoute2 = _interopRequireDefault(_followMovieRoute);

var _followUserRoute = __webpack_require__(68);

var _followUserRoute2 = _interopRequireDefault(_followUserRoute);

var _relationshipRoute = __webpack_require__(100);

var _relationshipRoute2 = _interopRequireDefault(_relationshipRoute);

var _genreRoute = __webpack_require__(73);

var _genreRoute2 = _interopRequireDefault(_genreRoute);

var _groupRoute = __webpack_require__(76);

var _groupRoute2 = _interopRequireDefault(_groupRoute);

var _likeRoute = __webpack_require__(80);

var _likeRoute2 = _interopRequireDefault(_likeRoute);

var _memberRoute = __webpack_require__(84);

var _memberRoute2 = _interopRequireDefault(_memberRoute);

var _movieRoute = __webpack_require__(88);

var _movieRoute2 = _interopRequireDefault(_movieRoute);

var _postRoute = __webpack_require__(92);

var _postRoute2 = _interopRequireDefault(_postRoute);

var _rateRoute = __webpack_require__(96);

var _rateRoute2 = _interopRequireDefault(_rateRoute);

var _userRoute = __webpack_require__(104);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _voiceoverRoute = __webpack_require__(108);

var _voiceoverRoute2 = _interopRequireDefault(_voiceoverRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
	app.use(_authMiddleware.getUser);
	app.use(_constants2.default.API_PREFIX + '/actors', _actorRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/countries', _countryRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/directors', _directorRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/follows/movies', _followMovieRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/follows/users', _followUserRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/relationships', _relationshipRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/genres', _genreRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/groups', _groupRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/likes', _likeRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/members', _memberRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/posts', _postRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/movies', _movieRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/rates', _rateRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/users', _userRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/voiceovers', _voiceoverRoute2.default);
};
// ((following)|(followers)|(actor)|(actors)|(country)|(countries)|(director)|(directors)|(genre)|(genres)|(group)|(groups)|(like)|(likes)|(member)|(members)|(movie)|(movies)|(post)|(posts)|(rate)|(rates)|(user)|(users)|(voiceover)|(voiceovers)|(followMovie)|(followUser)): res.
/* eslint-disable no-console */

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("express-list-endpoints");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(39);

var _middleware = __webpack_require__(40);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(41);

var _modules2 = _interopRequireDefault(_modules);

var _expressListEndpoints = __webpack_require__(42);

var _expressListEndpoints2 = _interopRequireDefault(_expressListEndpoints);

var _https = __webpack_require__(43);

var _https2 = _interopRequireDefault(_https);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fileUpload from 'express-fileupload'
const app = (0, _express2.default)();
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

app.get('/api', (req, res) => {
	res.send((0, _expressListEndpoints2.default)(app));
});

(0, _modules2.default)(app);

// https
// 	.createServer(
// 		{
// 			key: fs.readFileSync('./src/config/cert.key'),
// 			cert: fs.readFileSync('./src/config/cert.pem')
// 			// passphrase: 'server'
// 		},
// 		app
// 	)
app.listen(_constants2.default.PORT, err => {
	if (err) {
		throw err;
	} else {
		// eslint-disable-next-line no-console
		console.log(`\tRunning on ${_constants2.default.HOST}:${_constants2.default.PORT}`);
	}
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{ "name": "Hoàng Bột" }, { "name": "Matthew Morrison" }, { "name": "Ron Smoorenburg" }, { "name": "Tom Pelphrey" }, { "name": "Alexander Skarsgård" }, { "name": "Daniel Fathers" }, { "name": "Paul Rudd" }, { "name": "Robert Sheehan" }, { "name": "Louis Mandylor" }, { "name": "Scott Adkins" }, { "name": "Tony Todd" }, { "name": "Vladimir Kulich" }, { "name": "Jacob Lohmann" }, { "name": "Jakob Cedergren" }, { "name": "Jessica Dinnage" }, { "name": "Morten Suurballe" }, { "name": "Adria Arjona" }, { "name": "Ben Affleck" }, { "name": "Charlie Hunnam" }, { "name": "Oscar Isaac" }, { "name": "Israel Broussard" }, { "name": "Jessica Rothe" }, { "name": "Ruby Modine" }, { "name": "Suraj Sharma" }, { "name": "Chih Wei Tang" }, { "name": "Hang Cai" }, { "name": "Heng Yu" }, { "name": "Xuan Gu" }, { "name": "Linda Cardellini" }, { "name": "Mahershala Ali" }, { "name": "Sebastian Maniscalco" }, { "name": "Viggo Mortensen" }, { "name": "Famke Janssen" }, { "name": "Peter Facinelli" }, { "name": "Richard Dreyfuss" }, { "name": "Ron Perlman" }, { "name": "Collin Chou" }, { "name": "John Demita" }, { "name": "Kent Cheng" }, { "name": "Lý Liên Kiệt" }, { "name": "Deborah Ann Woll" }, { "name": "Logan Miller" }, { "name": "Taylor Russell" }, { "name": "Tyler Labine" }, { "name": "Iko Uwais" }, { "name": "Tiger Hu Chen" }, { "name": "Tony Jaa" }, { "name": "Isabela Moner" }, { "name": "Mark Wahlberg" }, { "name": "Octavia Spencer" }, { "name": "Rose Byrne" }, { "name": "Chi Pu" }, { "name": "Jung Chae Yeon" }, { "name": "Lee Su Ryeon" }, { "name": "San E" }, { "name": "đang cập nhập" }, { "name": "India Eisley" }, { "name": "Jason Isaacs" }, { "name": "Mira Sorvino" }, { "name": "Penelope Mitchell" }, { "name": "Crispin Freeman" }, { "name": "Daniel Dae Kim" }, { "name": "John Cho" }, { "name": "Rebecca Hall" }, { "name": "Grégoire Isvarine" }, { "name": "Lou Castel" }, { "name": "Marie Mottet" }, { "name": "Noémie Schmidt" }, { "name": "Aamir Khan" }, { "name": "Amitabh Bachchan" }, { "name": "Fatima Sana Shaikh" }, { "name": "Katrina Kaif" }, { "name": "Adriana Ugarte" }, { "name": "Albert Pérez" }, { "name": "Francesc Orella" }, { "name": "Javier Gutiérrez" }, { "name": "Arielle Tuliao" }, { "name": "Bryce Dallas Howard" }, { "name": "Chris Bauer" }, { "name": "Jennifer Gibson" }, { "name": "Bae Doo Na" }, { "name": "Cho Jung Seok" }, { "name": "Kim So Jin" }, { "name": "Song Kang Ho" }, { "name": "Alice Isaaz" }, { "name": "Cécile De France" }, { "name": "Edouard Baer" }, { "name": "Natalia Dontcheva" }, { "name": "Jerry O'connell" }, { "name": "Patrick Fabian" }, { "name": "Rainn Wilson" }, { "name": "Rebecca Romijn" }, { "name": "Ahn Sung Bong" }, { "name": "Ha Jung Woo" }, { "name": "Lee Sun Kyun" }, { "name": "Shin Hyun Bin" }, { "name": "Joey Ansah" }, { "name": "Louis Ashbourne Serkis" }, { "name": "Rebecca Ferguson" }, { "name": "Tom Taylor" }, { "name": "Jung Jae Young" }, { "name": "Kim Nam Gil" }, { "name": "Lee Soo kyung" }, { "name": "Uhm Ji Won" }, { "name": "Alessandro Roja" }, { "name": "Carolina Crescentini" }, { "name": "Claudio Camilli" }, { "name": "Euridice Axen" }, { "name": "Jang Gwang" }, { "name": "Jung Ji Hoon" }, { "name": "Lee Soon Jae" }, { "name": "Sung Byoung Sook" }, { "name": "Amyra Dastur" }, { "name": "Aparshakti Khurana" }, { "name": "Rishi Kapoor" }, { "name": "Sheeba Chaddha" }, { "name": "America Ferrera" }, { "name": "Cate Blanchett" }, { "name": "F. Murray Abraham" }, { "name": "Jay Baruchel" }, { "name": "Đang cập nhật" }, { "name": "Kelly Macdonald" }, { "name": "Ralph Fiennes" }, { "name": "Will Ferrell" }, { "name": "Charlyne Yi" }, { "name": "Jason Sudeikis" }, { "name": "John Krasinski" }, { "name": "Carolyn Chen" }, { "name": "Emerson Tsai" }, { "name": "Eugenie Liu" }, { "name": "Tống Vân Hoa" }, { "name": "Inuko Inuyama" }, { "name": "James Carter Cathcart" }, { "name": "Megumi Hayashibara" }, { "name": "Unshô Ishizuka" }, { "name": "Alain Hernández" }, { "name": "Aura Garrido" }, { "name": "Ben Temple" }, { "name": "Leticia Etala" }, { "name": "John Malkovich" }, { "name": "Sandra Bullock" }, { "name": "Sarah Paulson" }, { "name": "Trevante Rhodes" }, { "name": "Billy Howle" }, { "name": "Chris Pine" }, { "name": "Sam Spruell" }, { "name": "Stephen Dillane" }, { "name": "Kar Ying Law" }, { "name": "Sing Hom" }, { "name": "Soda Voyu" }, { "name": "Ting Hu Zhang" }, { "name": "Harumi Syuhama" }, { "name": "Kazuaki Nagaya" }, { "name": "Mao" }, { "name": "Takayuki Hamatsu" }, { "name": "Colin Woodell" }, { "name": "Joseph Lee" }, { "name": "Sara Sohn" }, { "name": "Chiwetel Ejiofor" }, { "name": "Felix Lemburo" }, { "name": "Maxwell Simba" }, { "name": "Robert Agengo" }, { "name": "Jeff Goldblum" }, { "name": "Jodie Foster" }, { "name": "Sofia Boutella" }, { "name": "Sterling K. Brown" }, { "name": "Adam Ferency" }, { "name": "Joanna Kulig" }, { "name": "Slavko Sobin" }, { "name": "Tomasz Kot" }, { "name": "Ashley Tisdale" }, { "name": "Demi Lovato" }, { "name": "Sia" }, { "name": "Wilmer Valderrama" }, { "name": "Jake Eng" }, { "name": "Mark Lee" }, { "name": "Tosh Chan" }, { "name": "Yann Yann Yeo" }, { "name": "Brittany Ashworth" }, { "name": "Grégory Fitoussi" }, { "name": "Javier Botet" }, { "name": "Jay Benedict" }, { "name": "Channing Tatum" }, { "name": "Common" }, { "name": "James Corden" }, { "name": "Zendaya" }, { "name": "Craig Conway" }, { "name": "Olga Kurylenko" }, { "name": "Rosie Fellner" }, { "name": "Alex" }, { "name": "Banita Sandhu" }, { "name": "Nikita Anand" }, { "name": "Varun Dhawan" }, { "name": "Rikiya Koyama" }, { "name": "Ryôtarô Okiayu" }, { "name": "Tôru Furuya" }, { "name": "Dong Hyun Bae" }, { "name": "Lee Chun Hee" }, { "name": "Lee Gyu Han" }, { "name": "Nam Gyu Ri" }, { "name": "Bao Bối Nhĩ" }, { "name": "Clara Lee" }, { "name": "Tiểu Tống Giai" }, { "name": "Yasuaki Kurata" }, { "name": "Clancy Brown" }, { "name": "Tim Blake Nelson" }, { "name": "Willie Watson" }, { "name": "Chloë Grace Moretz" }, { "name": "Quinn Shephard" }, { "name": "Steven Hauck" }, { "name": "Hàn Canh" }, { "name": "Rhydian Vaughan" }, { "name": "Tomohisa Yamashita" }, { "name": "Chris Hemsworth" }, { "name": "Emma Thompson" }, { "name": "Kumail Nanjiani" }, { "name": "Tessa Thompson" }, { "name": "Alyson Walker" }, { "name": "Ian Butcher" }, { "name": "Meelah Adams" }, { "name": "Tony Giroux" }, { "name": "Gal Gadot" }, { "name": "John C. Reilly" }, { "name": "Sarah Silverman" }, { "name": "Taraji P. Henson" }, { "name": "Lâm Doãn" }, { "name": "Vương Đại Lục" }, { "name": "Nhậm Đạt Hoa" }, { "name": "Từ Tranh" }, { "name": "Vương Lệ Khôn" }, { "name": "Zhu Zhu" }, { "name": "Jung Yeon Joo" }, { "name": "Song Kang" }, { "name": "Park Jun Myun" }, { "name": "Lee Yong Nyeo" }, { "name": "Gerard Butle" }, { "name": "Peter Mullan" }, { "name": "Søren Malling" }, { "name": "Han Ji Min" }, { "name": "Lee Byung hun" }, { "name": "Park Jung Min" }, { "name": "Youn Yuh Jung" }, { "name": "Brie Larson" }, { "name": "Evangeline Lilly" }, { "name": "Karen Gillan" }, { "name": "Châu Đông Vũ" }, { "name": "Cheney Chen" }, { "name": "Cổ Thiên Lạc" }, { "name": "Denzel Washington" }, { "name": "Melissa Leo" }, { "name": "Hải Nhĩ Phu" }, { "name": "Lữ Luật Lai" }, { "name": "Ngô Siêu" }, { "name": "Vương Lực Khả" }, { "name": "Wendi Mclendon Covey" }, { "name": "Madison Iseman" }, { "name": "Jeremy Ray Taylor" }, { "name": "Caleel Harris" }, { "name": "Ken Jeong" }, { "name": "Chris Parnell" }, { "name": "Bryce Cass" }, { "name": "Peyton Wich" }, { "name": "Jessi Goei" }, { "name": "Drew Scheid" }, { "name": "Jack Black" }, { "name": "Shari Headley" }, { "name": "Christian Finlayson" }, { "name": "Matthew J. Vasquez" }, { "name": "Courtney Lauren Cummings" }, { "name": "Tyler Silva" }, { "name": "Sydney Bullock" }, { "name": "Barry W. Jerald Jr." }, { "name": "Katie Douglas" }, { "name": "Kiana Madeira" }, { "name": "Peter Outerbridge" }, { "name": "Sara Canning" }, { "name": "Choi Yoo Ri" }, { "name": "Lee Yoo Young" }, { "name": "Ma Dong Seok" }, { "name": "Nguyễn Kinh Thiên" }, { "name": "Peng Lin" }, { "name": "Po Hung Lin" }, { "name": "Thành Long" }, { "name": "Alice Braga" }, { "name": "Anya Taylor Joy" }, { "name": "Charlie Heaton" }, { "name": "Maisie Williams" }, { "name": "Dustin Demri Burns" }, { "name": "Justin Theroux" }, { "name": "Kate McKinnon" }, { "name": "Mila Kunis" }, { "name": "Jake Gyllenhaal" }, { "name": "Rene Russo" }, { "name": "Tom Sturridge" }, { "name": "Toni Collette" }, { "name": "Katheryn Winnick" }, { "name": "Mads Mikkelsen" }, { "name": "Matt Lucas" }, { "name": "Vanessa Hudgens" }, { "name": "Kim Sae Ron" }, { "name": "Lee Sang Yeob" }, { "name": "Shin Se Hwi" }, { "name": "Jin Seon Kyu" }, { "name": "Oh Hee Joon" }, { "name": "Yoon Byung Hee" }, { "name": "Jung Soo Han" }, { "name": "Yoo Ha Bok" }, { "name": "Son Eun Seo" }, { "name": "Seo Jung Yeon" }, { "name": "Bae Jin Ah" }, { "name": "Son Young Soon" }, { "name": "Kim Min Che" }, { "name": "Lee Sang Hee" }, { "name": "Lee Dong Yong" }, { "name": "Lee Sang Hoon" }, { "name": "Kwon Hyuk Bum" }, { "name": "Yang Jae Young" }, { "name": "Asa Butterfield" }, { "name": "Nina Dobrev" }, { "name": "Bruce Khan" }, { "name": "Park Hee Soon" }, { "name": "Yoon Jin Seo" }, { "name": "Kim In Kwon" }, { "name": "Park Chul Min" }, { "name": "Bashir Salahuddin" }, { "name": "Charlize Theron" }, { "name": "David Oyelowo" }, { "name": "Joel Edgerton" }, { "name": "Benedict Hardie" }, { "name": "Harrison Gilbertson" }, { "name": "Logan Marshall Green" }, { "name": "Steve Danielsen" }, { "name": "Amy Manson" }, { "name": "Kevin Guthrie" }, { "name": "Paul Brannigan" }, { "name": "Sheila Hancock" }, { "name": "Brynie Furstenberg" }, { "name": "Hani Furstenberg" }, { "name": "Ishai Golan" }, { "name": "Lenny Ravich" }, { "name": "ngô minh đạt" }, { "name": "Jin Young" }, { "name": "Lee Soo Min" }, { "name": "Park Sung Woong" }, { "name": "Ra Mi Ran" }, { "name": "Adam Devine" }, { "name": "Liam Hemsworth" }, { "name": "Priyanka Chopra" }, { "name": "Rebel Wilson" }, { "name": "Bojana Novakovic" }, { "name": "Delroy Lindo" }, { "name": "Josh Stewart" }, { "name": "Melissa Bolona" }, { "name": "David Torok" }, { "name": "Jingwen E." }, { "name": "Kai Man Tin" }, { "name": "Vương Bảo Cường" }, { "name": "Guangjie Li" }, { "name": "Jing Wu" }, { "name": "Man Tat Ng" }, { "name": "Mike Kai Sui" }, { "name": "David Castañeda" }, { "name": "Elijah Rodriguez" }, { "name": "Jean Claude Van Damme" }, { "name": "Joana Metrass" }, { "name": "Lưu Diệc Phi" }, { "name": "Nghiêm Khoan" }, { "name": "Bille August" }, { "name": "Vivian Wu" }, { "name": "Shameik Moore" }, { "name": "Liev Schreiber" }, { "name": "Richard Elfyn" }, { "name": "Dan Stevens" }, { "name": "Paul Higgins" }, { "name": "Chung Tử Đơn" }, { "name": "Huỳnh Thánh Y" }, { "name": "Kim Yun Seok" }, { "name": "Ju Ji Hoon" }, { "name": "Moon Jeong Hee" }, { "name": "Lee Bong Ryun" }, { "name": "Kim Jong Soo" }, { "name": "Bae Hae Sun" }, { "name": "Joo Jin Mo" }, { "name": "Ko Chang Seok" }, { "name": "Heo Jin" }, { "name": "Kwon So Hyun" }, { "name": "Kim Joong Ki" }, { "name": "Kim Young Woong" }, { "name": "Jeong Gi Seop" }, { "name": "Jeon Kuk Hwan" }, { "name": "Lee Yoo Joon" }, { "name": "Won Hyun Joon" }, { "name": "Kim Mi Kyung" }, { "name": "Kim Mi Hwa" }, { "name": "Han Chul Woo" }, { "name": "Choi Kwang Je" }, { "name": "Châu Tấn" }, { "name": "Hồ Ca" }, { "name": "Tần Hạo" }, { "name": "Trương Tử Phong" }, { "name": "Ngô Ngạn Muội" }, { "name": "Đặng Ân Hi" }, { "name": "Margaret Qualley" }, { "name": "Anthony Mackie" }, { "name": "Danny Huston" }, { "name": "Teagan Johnson" }, { "name": "Noomi Rapace" }, { "name": "Sophie Nélisse" }, { "name": "Indira Varma" }, { "name": "Charley Palmer Rothwell" }, { "name": "Eoin Macken" }, { "name": "Akin Gazi" }, { "name": "George Georgiou" }, { "name": "Olivia Jewson" }, { "name": "Abdellatif Chaouqi" }, { "name": "Huw Parmenter" }, { "name": "Cherise Silvestri" }, { "name": "Sargon Yelda" }, { "name": "Robin Kermode" }, { "name": "Jonathan Jude" }, { "name": "Anna Marie Sullivan" }, { "name": "Nobunaga Shimazaki" }, { "name": "Marina Inoue" }, { "name": "Sora Amamiya" }, { "name": "Misuzu Togashi" }, { "name": "Ayana Taketatsu" }, { "name": "Iori Nomizu" }, { "name": "Asami Sanada" }, { "name": "Maaya Uchida" }, { "name": "Sarah Emi Bridcutt" }, { "name": "Minori Chihara" }, { "name": "Viktoriya Agalakova" }, { "name": "Efim Petrunin" }, { "name": "Sesil Plezhe" }, { "name": "Nikita Elenev" }, { "name": "Sofia Shidlovskaya" }, { "name": "Igor Khripunov" }, { "name": "Lee Mi Do" }, { "name": "Jung So Min" }, { "name": "Lee Il Hwa" }, { "name": "Yoon Je Moon" }, { "name": "Shin Goo" }, { "name": "Kang Ki Young" }, { "name": "Bành Vu Yến" }, { "name": "Wen Jiang" }, { "name": "Fan Liao" }, { "name": "Qing Xu" }, { "name": "Jiali Ding" }, { "name": "Meng Li" }, { "name": "Sam Palladio" }, { "name": "Nick Sagar" }, { "name": "Sara Stewart" }, { "name": "Robin Soans" }, { "name": "Quách Phú Thành" }, { "name": "Châu Nhuận Phát" }, { "name": "Kartik Aaryan" }, { "name": "Nushrat Bharucha" }, { "name": "Sunny Singh Nijjar" }, { "name": "Vic Mignogna" }, { "name": "Christopher Sabat" }, { "name": "Jason Douglas" }, { "name": "Sean Schemmel" }, { "name": "Monica Rial" }, { "name": "Dameon Clarke" }, { "name": "Ian Sinclair" }, { "name": "Masako Nozawa" }, { "name": "Alexis Tipton" }, { "name": "Kôichi Yamadera" }, { "name": "Sonny Strait" }, { "name": "Tomokazu Sugita" }, { "name": "Chris Ayres" }, { "name": "Ryô Horikawa" }, { "name": "Aya Hisakawa" }, { "name": "Ryûsei Nakao" }, { "name": "Bin Shimada" }, { "name": "Kara Edwards" }, { "name": "Đào Điển" }, { "name": "Thẩm Đạt Uy" }, { "name": "Tôn Diệp" }, { "name": "Hailee Steinfeld" }, { "name": "John Cena" }, { "name": "Kenneth Choi" }, { "name": "Park Bo Young" }, { "name": "Kim Young Kwang" }, { "name": "Ko Kyu Pil" }, { "name": "Chuan jun Wang" }, { "name": "Yiwei Zhou" }, { "name": "Xinming Yang" }, { "name": "Beibi Gong" }, { "name": "Stephen Lang" }, { "name": "Hugo Weaving" }, { "name": "Hera Hilmar" }, { "name": "Frankie Adams" }, { "name": "Sylvester Stallone" }, { "name": "Ryan Guzman" }, { "name": "Meadow Williams" }, { "name": "Kim Hae Sook" }, { "name": "Kim Sung Ryoung" }, { "name": "Kim Hee Ae" }, { "name": "Ye Soo Jung" }, { "name": "Moon Sook" }, { "name": "Jeff Bridges" }, { "name": "Dakota Johnson" }, { "name": "Jon Hamm" }, { "name": "Cynthia Erivo" }, { "name": "Yaya Urassaya Sperbund" }, { "name": "Sunny Suwanmethanont" }, { "name": "Nichkhun Horvejkul" }, { "name": "Thư Kỳ" }, { "name": "Trương Nghệ Hưng" }, { "name": "Hewei Yu" }, { "name": "Xun Wang" }, { "name": "Qinqin Li" }, { "name": "Hu Guan" }, { "name": "Jing Liang" }, { "name": "You Lin Lee" }, { "name": "Teddy Chan" }, { "name": "Xiaohang Fang" }, { "name": "Wenting Hao" }, { "name": "Yanqing Liu" }, { "name": "Hao Ning" }, { "name": "Dolph Lundgren" }, { "name": "Jason Momoa" }, { "name": "Amber Heard" }, { "name": "Tabu" }, { "name": "Radhika Apte" }, { "name": "Ayushmann Khurrana" }, { "name": "Shay Mitchell" }, { "name": "Louis Herthum" }, { "name": "Stana Katic" }, { "name": "Gijs Scholten Van Aschat" }, { "name": "Lexie Roth" }, { "name": "Grey Damon" }, { "name": "Kirby Johnson" }, { "name": "Nick Thune" }, { "name": "Maximillian Mcnamara" }, { "name": "Jacob Ming Trent" }, { "name": "James A. Watson Jr." }, { "name": "Marianne Bayard" }, { "name": "Adrian M. Mompoint" }, { "name": "Matt Mings" }, { "name": "Guy Clemens" }, { "name": "Sean Burns" }, { "name": "J.p. Valenti" }, { "name": "Arthur Hiou" }, { "name": "Lisa Wynn" }, { "name": "Kenneth Israel" }, { "name": "Larry Eudene" }, { "name": "Alice Lowe" }, { "name": "Fionn Whitehead" }, { "name": "Craig Parkinson" }, { "name": "John Abraham" }, { "name": "Shruti Haasan" }, { "name": "Nathalia Kaur" }, { "name": "Nishikant Kamat" }, { "name": "Gary Oldman" }, { "name": "Gerard Butler" }, { "name": "Jason Schwartzman" }, { "name": "Robert Capron" }, { "name": "Jenny Slate" }, { "name": "Jacki Weaver" }, { "name": "J.b. Smoove" }, { "name": "Christian Bale" }, { "name": "Benedict Cumberbatch" }, { "name": "Adam Driver" }, { "name": "John David Washington" }, { "name": "Laura Harrier" }, { "name": "Jang Young Nam" }, { "name": "Lee Hee Joon" }, { "name": "Kim Shi A" }, { "name": "Baek Soo Jang" }, { "name": "Johnny Depp" }, { "name": "Eddie Redmayne" }, { "name": "Zoë Kravitz" }, { "name": "Callum Turner" }, { "name": "Carmen Ejogo" }, { "name": "Wolf Roth" }, { "name": "Matthew Modine" }, { "name": "James Remar" }, { "name": "Tom Sizemore" }, { "name": "John Travolta" }, { "name": "Jennifer Esposito" }, { "name": "Trần Quốc Khôn" }, { "name": "Triệu Văn Trác" }, { "name": "Prakash Raj" }, { "name": "Mahesh Babu" }, { "name": "Sarath Kumar" }, { "name": "Kiara Advani" }, { "name": "Devaraj" }, { "name": "Rajsekhar Aningi" }, { "name": "Judy Greer" }, { "name": "Haluk Bilginer" }, { "name": "Jamie Lee Curtis" }, { "name": "Andi Matichak" }, { "name": "James Jude Courtney" }, { "name": "Nick Castle" }, { "name": "Ray Sahetapy" }, { "name": "Chelsea Islan" }, { "name": "Pevita Pearce" }, { "name": "Karina Suwandhi" }, { "name": "Samo Rafael" }, { "name": "Hadijah Shahab" }, { "name": "Kim Min Kyu" }, { "name": "So Joo Yeon" }, { "name": "Choi Hee Jin" }, { "name": "Kim Young" }, { "name": "Kim Tae Min" }, { "name": "Park Jin" }, { "name": "Betty Gabriel" }, { "name": "Chelsea Alden" }, { "name": "Yuan Nie" }, { "name": "Lu Zhang" }, { "name": "Zhaoqi Shi" }, { "name": "Kevin Cheng" }, { "name": "Lan Qin" }, { "name": "Wei Gan" }, { "name": "Sam Elliott" }, { "name": "Bradley Cooper" }, { "name": "Lady Gaga" }, { "name": "Dave Chappelle" }, { "name": "Hồ Quân" }, { "name": "Tôn Lệ" }, { "name": "Đặng Siêu" }, { "name": "Trịnh Khải" }, { "name": "Jo Jae Yun" }, { "name": "Yoon Kye Sang" }, { "name": "Choi Gwi Hwa" }, { "name": "Min Ren" }, { "name": "Yunlai Xin" }, { "name": "Ruonan Zhang" }, { "name": "Yingbo Zhao" }, { "name": "Danni Zhu" }, { "name": "Han Go Eun" }, { "name": "Kim Byung Gi" }, { "name": "Joo Woo Jae" }, { "name": "Lee Hye Ran" }, { "name": "Kim Ye Ryung" }, { "name": "Chu Nhân" }, { "name": "KAI CHUNG CHEUNG" }, { "name": "Jang Dong Gun" }, { "name": "Hyun Bin" }, { "name": "Son Na Eun" }, { "name": "Seo Young Hee" }, { "name": "Lee Tae Ri" }, { "name": "Bryan Cranston" }, { "name": "Edward Norton" }, { "name": "Koyu Rankin" }, { "name": "Kim Sung Kyung" }, { "name": "Jin Kyung" }, { "name": "Kim Sang Ho" }, { "name": "Lee Sung Min" }, { "name": "Kwak Si Yang" }, { "name": "Park Bom" }, { "name": "Mã Tư Thuần" }, { "name": "Trương Nhược Quân" }, { "name": "Lý Hiện" }, { "name": "Toshiyuki Nishida" }, { "name": "Takeshi Kitano" }, { "name": "Nao Ômori" }, { "name": "Pierre Taki" }, { "name": "Sansei Shiomi" }, { "name": "Tatsuo Nadaka" }, { "name": "Cao Dĩ Tường" }, { "name": "Leehom Wang" }, { "name": "Victoria Song" }, { "name": "Karena Ng" }, { "name": "Ed Helms" }, { "name": "Annabelle Wallis" }, { "name": "Rami Malek" }, { "name": "Christopher Fulford" }, { "name": "Joe David Walters" }, { "name": "Brian Vernel" }, { "name": "Damijan Oklopdzic" }, { "name": "James Franco" }, { "name": "Dennis Quaid" }, { "name": "Jack Reynor" }, { "name": "Carrie Coon" }, { "name": "Ian Matthews" }, { "name": "Phàn Thiếu Hoàng" }, { "name": "Thích Ngạn Năng" }, { "name": "Xa Vĩnh Lợi" }, { "name": "Stephen Rea" }, { "name": "Barry Keoghan" }, { "name": "Moe Dunford" }, { "name": "James Frecheville" }, { "name": "Freddie Fox" }, { "name": "Tom Hardy" }, { "name": "Riz Ahmed" }, { "name": "Michelle Williams" }, { "name": "Mitsuki Takahata" }, { "name": "Masato Sakai" }, { "name": "Sakura Ando" }, { "name": "Yûsuke Iseya" }, { "name": "Kanata Hongô" }, { "name": "Mari Hamada" }, { "name": "Ayaka Miyoshi" }, { "name": "Moon Chae Won" }, { "name": "Ji Sung" }, { "name": "Cho Seung Woo" }, { "name": "Yoo Jae Myung" }, { "name": "Baek Yoon Sik" }, { "name": "Trịnh Y Kiện" }, { "name": "Xa Thi Mạn" }, { "name": "Trần Tiểu Xuân" }, { "name": "Michael Tse" }, { "name": "Kar Lok Chin" }, { "name": "Jerry Lamb" }, { "name": "Jennifer Garner" }, { "name": "Tyson Rittler" }, { "name": "Stanley Tucci" }, { "name": "Will Arnett" }, { "name": "Ludacris" }, { "name": "Natasha Lyonne" }, { "name": "Gabriel Iglesias" }, { "name": "Jordin Sparks" }, { "name": "Shraddha Kapoor" }, { "name": "Rajkummar Rao" }, { "name": "Pankaj Tripathi" }, { "name": "Dermot Mulroney" }, { "name": "Richard Harmon" }, { "name": "Bella Thorne" }, { "name": "Rowan Atkinson" }, { "name": "Ben Miller" }, { "name": "Mimi Chi Yan Kung" }, { "name": "Carlos Chan" }, { "name": "Carmen Soup" }, { "name": "Trương Hiếu Toàn" }, { "name": "Quế Luân Mỹ" }, { "name": "Trần Học Đông" }, { "name": "Tưởng Mộng Điệp" }, { "name": "Vương Uyên Tuệ" }, { "name": "Đậu Bá Lâm" }, { "name": "Soo Ae" }, { "name": "Park Hae il" }, { "name": "Alex Neustaedter" }, { "name": "Becky G" }, { "name": "Alex MacNicoll" }, { "name": "Bruce Willis" }, { "name": "Lưu Diệp" }, { "name": "Tạ Đình Phong" }, { "name": "Alexander Petrov" }, { "name": "Taisiya Vilkova" }, { "name": "Nam Joo Hyuk" }, { "name": "Jo In Sung" }, { "name": "Kim Myung Min" }, { "name": "Kim In kwon" }, { "name": "Choi Woo Sik" }, { "name": "Hyeri" }, { "name": "Kyle MacLachla" }, { "name": "Lauren Cohan" }, { "name": "Michelle Yeoh" }, { "name": "Constance Wu" }, { "name": "Henry Golding" }, { "name": "Son Ye Jin" }, { "name": "Julian Cheung" }, { "name": "Stephy Tang" }, { "name": "Chung Chi Cheung" }, { "name": "Keegan Michael Key" }, { "name": "Boyd Holbrook" }, { "name": "Shin Da Eun" }, { "name": "Jo Min Soo" }, { "name": "Kim Da Mi" }, { "name": "Go Min Si" }, { "name": "Eero Aho" }, { "name": "Johannes Holopainen" }, { "name": "Jussi Vatanen" }, { "name": "Julie Estelle" }, { "name": "Joe Taslim" }, { "name": "Thi Triển" }, { "name": "Lan Lam" }, { "name": "Văn Mộng" }, { "name": "Lâu Nghệ Tiêu" }, { "name": "Tôn Nghệ Châu" }, { "name": "Trần Hách" }, { "name": "Viên Hoằng" }, { "name": "Nakagawa Taishi" }, { "name": "Dean Fujioka" }, { "name": "Chinen Yuri" }, { "name": "Mano Erina" }, { "name": "Komatsu Nana" }, { "name": "Jessica Mila" }, { "name": "Bianca Hello" }, { "name": "Denny Sumargo" }, { "name": "Josh Brolin" }, { "name": "Benicio Del Toro" }, { "name": "Jeffrey Donovan" }, { "name": "Riley Keough" }, { "name": "Jeffrey Wright" }, { "name": "Beckam Crawford" }, { "name": "Michael Tayles" }, { "name": "Issac Bird" }, { "name": "Marisa Tomei" }, { "name": "Mo McRae" }, { "name": "Steve Harris" }, { "name": "Patch Darragh" }, { "name": "Luna Lauren Velez" }, { "name": "Jermel Howard" }, { "name": "Michael Fassbender" }, { "name": "Alicia Vikander" }, { "name": "Rachel Weisz" }, { "name": "Brad Pitt" }, { "name": "Marion Cotillard" }, { "name": "Jared Harris" }, { "name": "Nicolas Cage" }, { "name": "Thomas Jane" }, { "name": "Mario Van Peebles" }, { "name": "Jane Levy" }, { "name": "Dylan Minnette" }, { "name": "Eric Roberts" }, { "name": "Joey Morgan" }, { "name": "Omar Chaparro" }, { "name": "Jun Kunimura" }, { "name": "Jung min Hwang" }, { "name": "Woo hee Chun" }, { "name": "Teresa Palmer" }, { "name": "Gabriel Bateman" }, { "name": "Alexander Dipersia" }, { "name": "Billy Burke" }, { "name": "Maria Bello" }, { "name": "Rolando Boyce" }, { "name": "Kim Jung Tae" }, { "name": "Kim Seung Woo" }, { "name": "Lee Han Wi" }, { "name": "Shin Kang Woo" }, { "name": "Hyuk" }, { "name": "Moon Yong Suk" }, { "name": "Oh Man Seok" }, { "name": "Kim Min Kyung" }, { "name": "Emma Roberts" }, { "name": "Dave Franco" }, { "name": "Keanu Reeves" }, { "name": "Ian McShane" }, { "name": "Ruby Rose" }, { "name": "Dina Meyer" }, { "name": "AnnaLynne McCord" }, { "name": "George MacKay" }, { "name": "Samantha Isler" }, { "name": "Sam Neill" }, { "name": "Julian Dennison" }, { "name": "Rima Te Wiata" }, { "name": "Rudolf Martin" }, { "name": "Christoph Letkowski" }, { "name": "Svenja Jung" }, { "name": "Uta Bonz" }, { "name": "Paul Boche" }, { "name": "Constantin Lücke" }, { "name": "Waléra Kanischtscheff" }, { "name": "Jack Nicholson" }, { "name": "Morgan Freeman" }, { "name": "Sean Hayes" }, { "name": "Anna Kendrick" }, { "name": "J.K. Simmons" }, { "name": "Narges Rashidi" }, { "name": "Avin Manshadi" }, { "name": "Bobby Naderi" }, { "name": "Hollie Burrows" }, { "name": "James Cooke" }, { "name": "Liam Dascombe" }, { "name": "Vikram Prabhu" }, { "name": "Ranya Rao" }, { "name": "Karunas" }, { "name": "Zachary Quinto" }, { "name": "Karl Urban" }, { "name": "Bạch Kính Đình" }, { "name": "Quách Thù Đồng" }, { "name": "Lý Hồng Nghị" }, { "name": "Vương Hạc Nhuận" }, { "name": "Đinh Quan Sâm" }, { "name": "Triệu Văn Long" }, { "name": "Tô Hữu Bằng" }, { "name": "Liễu Nham" }, { "name": "Lâm Canh Tân" }, { "name": "Nhiều diễn viên" }, { "name": "Trần Khôn" }, { "name": "Bạch Bách Hà" }, { "name": "Jin mo Joo" }, { "name": "Dong won Kang" }, { "name": "Sabrina Carpenter" }, { "name": "Sofia Carson" }, { "name": "Nikki Hahn" }, { "name": "Kaya Scodelario" }, { "name": "Orlando Bloom" }, { "name": "Tom Cruise" }, { "name": "Cobie Smulders" }, { "name": "Robert Knepper" }, { "name": "Trần Vỹ Đình" }, { "name": "Đường Nghệ Hân" }, { "name": "Jessica" }, { "name": "Christian Clavier" }, { "name": "Isabelle Nanty" }, { "name": "Pierre François Martin Laval" }, { "name": "Kev Adams" }, { "name": "Arnaud Ducret" }, { "name": "Pio Marmaï" }, { "name": "Franck Gastambide" }, { "name": "Camille Cottin" }, { "name": "Bae Sung Woo" }, { "name": "Yoon Kyun Sang" }, { "name": "Cheeranun Yusanont" }, { "name": "Kom Chuancheun" }, { "name": "Nutchapatchara Wongsuwan" }, { "name": "Pitsanu NimSakul" }, { "name": "Anime" }, { "name": "Dany Boon" }, { "name": "Alice Pol" }, { "name": "Kad Merad" }, { "name": "Kang Dong Won" }, { "name": "Man sik Jeong" }, { "name": "Ji hun Ju" }, { "name": "Jung Woo Sung" }, { "name": "Jason Statham" }, { "name": "Jessica Alba" }, { "name": "Tommy Lee Jones" }, { "name": "Jason Biggs" }, { "name": "Janet Montgomery" }, { "name": "Paul Dano" }, { "name": "Daniel Radcliffe" }, { "name": "Mary Elizabeth Winstead" }, { "name": "Doona Bae" }, { "name": "Jung woo Ha" }, { "name": "Dal su Oh" }, { "name": "Louis Koo" }, { "name": "Ching Wan Lau" }, { "name": "Eddie Peng" }, { "name": "Chris Pratt" }, { "name": "Ethan Hawke" }, { "name": "Pierce Brosnan" }, { "name": "Jason Barry" }, { "name": "Karen Moskow" }, { "name": "Dev Patel" }, { "name": "Jeremy Irons" }, { "name": "Malcolm Sinclair" }, { "name": "Galen T. Chu" }, { "name": "Đồng Phi" }, { "name": "Lâm Thu Nam" }, { "name": "Lưu Nhuế Lân" }, { "name": "Brendan Fletcher" }, { "name": "Dan Shea" }, { "name": "Loretta Walsh" }, { "name": "Melissa McCarthy" }, { "name": "Kristen Bell" }, { "name": "Peter Dinklage" }, { "name": "Kurt Russell" }, { "name": "Douglas M. Griffin" }, { "name": "Tom Hanks" }, { "name": "Felicity Jones" }, { "name": "Ben Foster" }, { "name": "La Tường" }, { "name": "Trạch Tử Mạnh" }, { "name": "Trần Mỹ Hành" }, { "name": "Triệu Cát" }, { "name": "Charles Dance" }, { "name": "Kristen Wiig" }, { "name": "Zach Woods" }, { "name": "Karan Soni" }, { "name": "Frank Grillo" }, { "name": "Elizabeth Mitchell" }, { "name": "Mykelti Williamson" }, { "name": "Renée Zellweger" }, { "name": "Gemma Jones" }, { "name": "Jim Broadbent" }, { "name": "Joe Manganiello" }, { "name": "Mandy Patinkin" }, { "name": "Ngô Kinh" }, { "name": "Lưu Thanh Vân" }, { "name": "Giang Sơ Ảnh" }, { "name": "Khương Hạo Văn" }, { "name": "Ngô Đình Diệp" }, { "name": "Viên Tuyền" }, { "name": "Liêu Khải Trí" }, { "name": "Jamie Dornan" }, { "name": "Tyler Hoechlin" }, { "name": "Jin Se Yun" }, { "name": "Lee Beom Soo" }, { "name": "Lee Jung Jae" }, { "name": "Emma Watson" }, { "name": "Daniel Brühl" }, { "name": "Michael Nyqvist" }, { "name": "Allie Marie Evans" }, { "name": "Patrick Johnson" }, { "name": "Peter O'Brien" }, { "name": "Alexander Black" }, { "name": "Sarita Choudhury" }, { "name": "Amy Adams" }, { "name": "Michael Shannon" }, { "name": "Viên San San" }, { "name": "Park Chan Yeol" }, { "name": "Seo Ju Hyun" }, { "name": "Khương Triều" }, { "name": "Ji Soo – Yong Bi" }, { "name": "Suho – Sang Woo" }, { "name": "Ryoo Joon Yeol – Ji Gong" }, { "name": "Kim Hee Chan – Doo Man" }, { "name": "Jordan Peele" }, { "name": "Tiffany Haddish" }, { "name": "Stephanie Sigman" }, { "name": "Alicia Vela Bailey" }, { "name": "Miranda Otto" }, { "name": "Enjie Lu" }, { "name": "Qiang Zheng" }, { "name": "Wei Dong Chen" }, { "name": "Leslie Mann" }, { "name": "Sunny Suwanmethanon" }, { "name": "Davika Hoorne" }, { "name": "Ferdia Walsh Peelo" }, { "name": "Aidan Gillen" }, { "name": "Maria Doyle Kennedy" }, { "name": "Britt Robertson" }, { "name": "Peggy Lipton" }, { "name": "Gugu Mbatha Raw" }, { "name": "Hướng Tá" }, { "name": "Huỳnh Hiểu Minh" }, { "name": "Lương Gia Huy" }, { "name": "Phạm Băng Băng" }, { "name": "Henry Thomas" }, { "name": "Doug Jones" }, { "name": "Elizabeth Reaser" }, { "name": "Jennifer Lawrence" }, { "name": "Michael Sheen" }, { "name": "Jonathan Groff" }, { "name": "Frankie J. Alvarez" }, { "name": "Murray Bartlett" }, { "name": "JESSE METCALFE" }, { "name": "MEGHAN ORY" }, { "name": "Elle Fanning" }, { "name": "Christina Hendricks" }, { "name": "Dwayne Johnson" }, { "name": "Kevin Hart" }, { "name": "Danielle Nicolet" }, { "name": "Atsuko Tanaka" }, { "name": "Akio Otsuka" }, { "name": "Lu Han" }, { "name": "Tỉnh Bách Nhiên" }, { "name": "Ed Westwick" }, { "name": "Phoebe Tonkin" }, { "name": "Jeremy Sumpter" }, { "name": "Cẩm Vinh" }, { "name": "Đằng Cách Nhĩ" }, { "name": "Alycia Debnam Carey" }, { "name": "William Moselley" }, { "name": "Milo Cawthorne" }, { "name": "James Blake" }, { "name": "Kimberley Crossman" }, { "name": "Sam Berkley" }, { "name": "Daniel Cresswell" }, { "name": "Delaney Tabron" }, { "name": "Stephen Ure" }, { "name": "Colin Moy" }, { "name": "Jodie Rimmer" }, { "name": "Nick Hoskins Smith" }, { "name": "Erroll Shand" }, { "name": "Kate Elliott" }, { "name": "Aaron McGregor" }, { "name": "Andrew Laing" }, { "name": "Tim Foley" }, { "name": "Kris Wu" }, { "name": "Rhona Mitra" }, { "name": "Thành Long" }, { "name": "Milla Jovovich" }, { "name": "Dave Bautista" }, { "name": "Alain Moussi" }, { "name": "Gina Carano" }, { "name": "Van Damme" }, { "name": "Lý Du Phi" }, { "name": "Trần Tuệ Lâm" }, { "name": "Trâu Triệu Long" }, { "name": "Ju hyuk Kim" }, { "name": "So hee Kim" }, { "name": "Yu hwa Choi" }, { "name": "Vladimir Mashkov" }, { "name": "Agne Grudyte" }, { "name": "Sergey Shakurov" }, { "name": "Trương Gia Huy" }, { "name": "Ngô Trấn Vũ" }, { "name": "Trần Hào" }, { "name": "Rose McGowan" }, { "name": "Rachel Nichols" }, { "name": "Idris Elba" }, { "name": "Richard Madden" }, { "name": "Kelly Reilly" }, { "name": "Dương Mịch" }, { "name": "Ngô Diệc Phàm" }, { "name": "Vương Nguyên (Tfboys)" }, { "name": "Jung Yu Mi" }, { "name": "Gong Yoo" }, { "name": "Baek Jin Hee" }, { "name": "Seth Rogen" }, { "name": "Zac Efron | See full cast & crew" }, { "name": "Erin Moriarty" }, { "name": "Mel Gibson" }, { "name": "Trương Học Hữu" }, { "name": "Matt Damon" }, { "name": "Julia Stiles" }, { "name": "Seung Ho Yoo" }, { "name": "Jae Hyeon Jo" }, { "name": "Suk Ho Jun" }, { "name": "Chang Seok Ko" }, { "name": "Kim Min Seok" }, { "name": "Mi Ran Ra" }, { "name": "Dan Chupong" }, { "name": "Nathan Jones" }, { "name": "Damian Mavis" }, { "name": "Kessarin Ektawatk" }, { "name": "Scott Glenn" }, { "name": "Chris O'Donnell" }, { "name": "Bill Paxton" }, { "name": "Ngọc Trai" }, { "name": "Ngô Thanh Vân" }, { "name": "Thành Lộc" }, { "name": "Will" }, { "name": "Phạm Lưu Tuấn Tài" }, { "name": "Chyler Leigh" }, { "name": "Jaime Pressly" }, { "name": "Chris Evans" }, { "name": "Jackie Chan" }, { "name": "Andy Lau and Sammo Hung Kam Bo" }, { "name": "Christopher Meloni" }, { "name": "Lưu Đức Hoa" }, { "name": "Hồng Kim Bảo" }, { "name": "Trần Phái Nghiên" }, { "name": "Min sik Choi" }, { "name": "Hong pa Kim" }, { "name": "Vương Lạc Đan" }, { "name": "Châu Du Dân" }, { "name": "Bào Khởi Tịnh" }, { "name": "Thiên Tâm" }, { "name": "Thiệu Mỹ Kỳ" }, { "name": "Woody Harrelson" }, { "name": "Ellen DeGeneres" }, { "name": "Albert Brooks" }, { "name": "Torbin Xan Bullock" }, { "name": "Lisa Brenner" }, { "name": "Samuel Larsen" }, { "name": "Todd Lowe" }, { "name": "Trương Trí Lâm" }, { "name": "Trần Kiều Ân" }, { "name": "Tiết Giia Yến" }, { "name": "Đường Văn Long" }, { "name": "Jared Leto" }, { "name": "Lý Thẩm" }, { "name": "Đàm Tùng Vận" }, { "name": "Angelababy" }, { "name": "Ngô Thiến" }, { "name": "Margot Robbie" }, { "name": "Samuel L. Jackson" }, { "name": "Triệu Vy" }, { "name": "Chung Hán Lương" }, { "name": "Rachel McAdams" }, { "name": "Benedict Wong" }, { "name": "Rossif Sutherland" }, { "name": "Douangmany Soliphanh" }, { "name": "Sara Botsford" }, { "name": "Chương Tử Di" }, { "name": "Đồng Lệ Á" }, { "name": "Lương Tịnh" }, { "name": "Shailene Wood" }, { "name": "Joseph Gordon Levitt" }, { "name": "Tom Wilkinso" }, { "name": "Christy Meyer" }, { "name": "Adrienne Wilkinson" }, { "name": "Walter Koenig" }, { "name": "Sanzhar Madiyev" }, { "name": "Anton Pampushnyy" }, { "name": "Sebastien Sisak" }, { "name": "Valeriya Shkirando" }, { "name": "Alina Kiziyarova" }, { "name": "Michael Jai White" }, { "name": "Max Ryan" }, { "name": "Han Hye Rin" }, { "name": "Ahn Sung Ki" }, { "name": "Đỗ Văn Trạch" }, { "name": "Philip Keung" }, { "name": "Gregory Wong" }, { "name": "Asami" }, { "name": "Kirara Asuka" }, { "name": "Jack Huston" }, { "name": "Nazanin Boniadi" }, { "name": "Ayelet Zurer" }, { "name": "Kim Min Hee" }, { "name": "Kim Tae Ri" }, { "name": "Cho Jin Woong" }, { "name": "Lena Headey" }, { "name": "Aaron Paul" }, { "name": "Sean Bean" }, { "name": "Jon Campling" }, { "name": "Kezia Burrows" }, { "name": "Will Bowden" }, { "name": "Neil Newbon" }, { "name": "Andrea Tivadar" }, { "name": "Amanda Piery" }, { "name": "Edward Saxby" }, { "name": "Joo Won – Jang Woo Yu Hae Jin – Dược sỹ Min Lee Yoo Young – Shi Eun Ryoo Hye Young – Eun Ji" }, { "name": "Đoàn Dịch Hồng" }, { "name": "Quách Đào" }, { "name": "Lữ Tụng Hiền" }, { "name": "Ngô Ngạn Tổ" }, { "name": "Cảnh Điềm" }, { "name": "Analeigh Tipton" }, { "name": "Sofia Black D'Elia" }, { "name": "Michael Kelly" }, { "name": "Eva Green" }, { "name": "Kim Dickens" }, { "name": "Kathryn Hahn" }, { "name": "Lance Henriksen" }, { "name": "Johnny Strong" }, { "name": "Martin Sheen" }, { "name": "Marlon Brando" }, { "name": "Robert Duvall" }, { "name": "Katherine Waterston" }, { "name": "Dan Fogler" }, { "name": "Alison Sudol" }, { "name": "and Colin Farrell" }, { "name": "Cao Viên Viên" }, { "name": "Dương Thiên Hoa" }, { "name": "Kylie Rogers" }, { "name": "Martin Henderson" }, { "name": "Yoshimasa Hosoya" }, { "name": "Inori Minase" }, { "name": "Ben Whishawlan Richmen" }, { "name": "Louis C.K." }, { "name": "Eric Stonestreet" }, { "name": "Stuart Graham" }, { "name": "Laine Megaw" }, { "name": "Brian Milligan" }, { "name": "Liam McMahon" }, { "name": "Karen Hassan" }, { "name": "Frank McCusker" }, { "name": "Lalor Roddy" }, { "name": "Helen Madden" }, { "name": "Des McAleer" }, { "name": "Geoff Gatt" }, { "name": "Rory Mullen" }, { "name": "Ben Peel" }, { "name": "Helena Bereen" }, { "name": "Paddy Jenkins" }, { "name": "Lambert Wilson" }, { "name": "Virginie Ledoyen" }, { "name": "Guillaume Gouix" }, { "name": "Vương Truyền Nhất" }, { "name": "Lý Yến Chinh" }, { "name": "Sử Đại Tây" }, { "name": "Đậu Trí Khổng" }, { "name": "Phim Hành Động" }, { "name": "Phim Hoạt Hình" }, { "name": "Phim Phiêu Lưu" }, { "name": "Ara Go" }, { "name": "Seong gyoon Kim" }, { "name": "Je hoon Lee" }, { "name": "Anton Yelchin" }, { "name": "Imogen Poots" }, { "name": "Alia Shawkat" }, { "name": "Hiếu Long" }, { "name": "Tào Mộng Cách" }, { "name": "Dương Tử Thâm" }, { "name": "Vu Ba" }, { "name": "Châu Vũ Đồng" }, { "name": "Vương Đức Thuận" }, { "name": "Lý Thanh" }, { "name": "Mia Wasikowska" }, { "name": "Helena Bonham Carter" }, { "name": "Nicholas Hoult" }, { "name": "Vernetta Lopez" }, { "name": "Scott Lawrence" }, { "name": "Jamie Bernadette" }, { "name": "Katie Carpenter" }, { "name": "Gema Calero" }, { "name": "Nick Cheung" }, { "name": "Qi Shu" }, { "name": "Jing Wong" }, { "name": "Ngôn Thừa Húc" }, { "name": "Giản Đình Nhuế" }, { "name": "Lý Ngọc Tỷ" }, { "name": "Lee Min ho" }, { "name": "Wallace Chung" }, { "name": "Tiffany Tang" }, { "name": "Ngô Thiên Ngữ" }, { "name": "Minami Hamabe" }, { "name": "Marie Iitoyo" }, { "name": "Airi Matsui" }, { "name": "Maika Monroe" }, { "name": "Roland Emmerich" }, { "name": "Joey King" }, { "name": "Ryan Reynolds" }, { "name": "Kevin Costner" }, { "name": "Naomi Watts" }, { "name": "Chris Cooper" }, { "name": "Rita Blanco" }, { "name": "Joaquim de Almeida" }, { "name": "Roland Giraud" }, { "name": "Jesse Metcalfe" }, { "name": "Jessica Harmon" }, { "name": "Keegan Connor Tracy" }, { "name": "Trương Siêu" }, { "name": "Trần Kinh Thiên" }, { "name": "Hà Nhuận Đông" }, { "name": "Lý Đông Học" }, { "name": "Hạ Tử Đồng" }, { "name": "Dương Kỳ Minh" }, { "name": "Điền Nguyên" }, { "name": "Tạ Miêu" }, { "name": "Trương Hách" }, { "name": "Tiêu Ân Na" }, { "name": "Megan Fox" }, { "name": "Stephen Amell" }, { "name": "Taron Egerton" }, { "name": "Hugh Jackman" }, { "name": "Tom Costello" }, { "name": "Tống Dực Phi" }, { "name": "Lí Hồng Đào" }, { "name": "Chu Giai Hi" }, { "name": "Sigourney Weaver" }, { "name": "Jennifer Love Hewitt" }, { "name": "Gene Hackman" }, { "name": "Arun Bali" }, { "name": "Meera Chopra" }, { "name": "Gajendra Chouhan" }, { "name": "Nhậm Hiền Tề" }, { "name": "Lâm Gia Đống" }, { "name": "Ron Allen" }, { "name": "George Babbit" }, { "name": "Laila Berzins" }, { "name": "Will Smith" }, { "name": "Cara Delevingne" }, { "name": "Josh Barnett" }, { "name": "Gillian White" }, { "name": "Ploychompoo" }, { "name": "Pongsakorn Tosuwan" }, { "name": "Kate Bosworth" }, { "name": "Devon Sawa" }, { "name": "Owen Teague" }, { "name": "John Cusack" }, { "name": "Melanie Stone" }, { "name": "Adam Johnson" }, { "name": "Jake Stormoen" }, { "name": "Emilia Clarke" }, { "name": "Sam Claflin" }, { "name": "Jenna Coleman" }, { "name": "Thanh Long" }, { "name": "Pimchanok LerwisetpibolThana Aiemniyom" }, { "name": "Johnathan Samson" }, { "name": "Yui Tsutsumi" }, { "name": "Vera Farmiga" }, { "name": "Patrick Wilson" }, { "name": "Frances O'Connor" }, { "name": "Madison Wolfe" }, { "name": "Simon McBurney" }, { "name": "Franka Potente" }, { "name": "Kristian Brodie" }, { "name": "Yvonne Strahovski" }, { "name": "Adrien Brody" }, { "name": "Jennifer Beals" }, { "name": "Châu Tinh Trì" }, { "name": "La Chí Tường" }, { "name": "Trương Vũ Kỳ" }, { "name": "Travis Fimmel" }, { "name": "Robert Kazinsky" }, { "name": "Anders Dahlberg" }, { "name": "Åsmund Brede Eike" }, { "name": "Elg Elgesem" }, { "name": "Tina Fey" }, { "name": "Martin Freeman" }, { "name": "Đỗ Thiên Hạo" }, { "name": "Tần Lam" }, { "name": "Trần Hiểu" }, { "name": "Jesse Eisenberg" }, { "name": "Mark Ruffalo" }, { "name": "Keanu Reeves Charlize Theron Jason Isaacs" }, { "name": "Leonardo DiCaprio" }, { "name": "Kate Winslet" }, { "name": "Billy Zane" }, { "name": "Michael Martin" }, { "name": "Kristen Stewart" }, { "name": "Robert Pattinson" }, { "name": "Justin Chon" }, { "name": "Shailene Woodley" }, { "name": "Theo James" }, { "name": "Jeff Daniels" }, { "name": "Sidharth Malhotra" }, { "name": "Fawad Khan" }, { "name": "Alia Bhatt" }, { "name": "Leon Dai" }, { "name": "Chris Lee" }, { "name": "George Clooney" }, { "name": "Julia Roberts" }, { "name": "Jack O'Connell" }, { "name": "Su jeong Lim" }, { "name": "Jung suk Jo" }, { "name": "Jin wook Lee" }, { "name": "Lanyi Zhang" }, { "name": "Jiang Xinqi" }, { "name": "John Goodman" }, { "name": "John Gallagher Jr." }, { "name": "Kristen StewartAshley Greene" }, { "name": "Taylor Lautner" }, { "name": "Tao liang Tan" }, { "name": "James Tien and Wei Yang" }, { "name": "Motoki Fukami" }, { "name": "Elaiza Ikeda" }, { "name": "Megumi Kagurazaka" }, { "name": "Barry Watson" }, { "name": "Esmé Bianco" }, { "name": "Gavin Lewis" }, { "name": "Willem Dafoe" }, { "name": "Charlotte Gainsbourg" }, { "name": "Storm Acheche Sahlstrøm" }, { "name": "Vincent Cassel" }, { "name": "Léa Seydoux" }, { "name": "André Dussollier" }, { "name": "Sharlto Copley" }, { "name": "Tim Roth" }, { "name": "Haley Bennett" }, { "name": "Ansel Elgort" }, { "name": "Nat Wolff" }, { "name": "BoA" }, { "name": "Uyển Quỳnh Đan" }, { "name": "Đàm Diệu Văn" }, { "name": "Alden Ehrenreich" }, { "name": "Josh Gad" }, { "name": "Danny McBride" }, { "name": "Lê Minh" }, { "name": "Dư Thiếu Quần" }, { "name": "Shane West" }, { "name": "Mandy Moore" }, { "name": "Sharman Joshi" }, { "name": "Zarine Khan" }, { "name": "Karan Singh Grover" }, { "name": "Sam Rockwell" }, { "name": "Hilary Swank" }, { "name": "James Marsters" }, { "name": "Jeffrey Dean Morgan" }, { "name": "Janet McTeer" }, { "name": "Tom Hiddleston" }, { "name": "Young nam Jang" }, { "name": "Ho bin Jeong" }, { "name": "Yun seok Kim" }, { "name": "Halle Berry" }, { "name": "Ian McKellen" }, { "name": "Patrick Stewart" }, { "name": "Ellen Page" }, { "name": "preechaya pongthananikorn" }, { "name": "sunny suwanmethanont" }, { "name": "aoi sora" }, { "name": "popetorn soonthornyanakij" }, { "name": "Vanessa Kirby" }, { "name": "David Ajala" }, { "name": "Deborah Rosan" }, { "name": "Tom McKay" }, { "name": "Mike Noble" }, { "name": "Bentley Kalu" }, { "name": "Toby Jones" }, { "name": "Nick Frost" }, { "name": "Richard Armitage" }, { "name": "Ko Ah Sung" }, { "name": "Sacha Baron Cohen" }, { "name": "Mark Strong" }, { "name": "Eve Mauro" }, { "name": "Danny Trejo" }, { "name": "Rocky Myers" }, { "name": "Steven Seagal" }, { "name": "Pim Bubear" }, { "name": "Amanda Schull" }, { "name": "Rebecca De Mornay" }, { "name": "Nopachai Chaiyanam" }, { "name": "Djuangjai Hirunsri" }, { "name": "Mario Maurer" }, { "name": "Han Hyo Joo" }, { "name": "Kim Dae Myung" }, { "name": "Do Ji Han" }, { "name": "Park Shin Hye" }, { "name": "Park Seo Joon" }, { "name": "James McAvoy" }, { "name": "Taylor Kitsch" }, { "name": "Tạ Na" }, { "name": "Hà Cảnh" }, { "name": "Ngô Hân" }, { "name": "Lý Duy Gia" }, { "name": "Đỗ Hải Đào" }, { "name": "Pablo Schreiber" }, { "name": "James Badge Dale" }, { "name": "Ai Hashimoto" }, { "name": "Mayu Matsuoka" }, { "name": "Yôichi Nukumizu" }, { "name": "Đồng Đại Vĩ" }, { "name": "Heather Lind" }, { "name": "Emory Cohen" }, { "name": "Do Kyung Soo" }, { "name": "Kim So Hyun" }, { "name": "Yoo Yeon Seok" }, { "name": "Brian Cox" }, { "name": "Simon Yam" }, { "name": "Kiu Wai Miu" }, { "name": "Fala Chen" }, { "name": "Bo" }, { "name": "yuan Chan" }, { "name": "Ka" }, { "name": "lun Cheung" }, { "name": "Kuen Cheung" }, { "name": "Matt Schulze" }, { "name": "Francois Berleand (II)" }, { "name": "Ric Young (II)" }, { "name": "Doug Rand" }, { "name": "Elyas M'Barek" }, { "name": "Jella Haase" }, { "name": "Karoline" }, { "name": "Ngưu Manh Manh" }, { "name": "Tăng Chí Vỹ" }, { "name": "Chen Sicheng" }, { "name": "Vương Đông Phương" }, { "name": "Elma Begovic" }, { "name": "Annette Wozniak" }, { "name": "Denise Yuen" }, { "name": "Himesh Reshammiya" }, { "name": "Farah Karimaee" }, { "name": "Naseeruddin Shah" }, { "name": "Nguyên Bưu" }, { "name": "Jason Stathammber Valletta" }, { "name": "Mike Powers" }, { "name": "Devon Aoki" }, { "name": "Sarah Carter" }, { "name": "Ben Stiller" }, { "name": "Owen Wilson" }, { "name": "Penélope Cruz" }, { "name": "Park Shin Yang" }, { "name": "Camilla Belle" }, { "name": "Steven Strait" }, { "name": "Marco Khan" }, { "name": "Vanness Wu" }, { "name": "Shawn Yue" }, { "name": "Yu Xia" }, { "name": "Ralph Ineson" }, { "name": "Kate Dickie" }, { "name": "Olivia Munn" }, { "name": "Tạ Dung Nhi" }, { "name": "Mik Thongraya" }, { "name": "Dương Hạnh" }, { "name": "Kate Siegel" }, { "name": "Michael Trucco" }, { "name": "Kabby Borders" }, { "name": "Mirela Burke" }, { "name": "Hunter Canedy" }, { "name": "Ruby Lin" }, { "name": "Tony Yo ning Yang" }, { "name": "Ryôhei Suzuki" }, { "name": "Kentarô Sakaguchi" }, { "name": "Sawa Suzuki" }, { "name": "Gerardo Taracena" }, { "name": "Raoul Trujillo" }, { "name": "Dalia Hernández" }, { "name": "Mario Casas" }, { "name": "Macarena García" }, { "name": "Daniel O'Neill" }, { "name": "Priya Suandokemai" }, { "name": "Gwion Jacob Miles" }, { "name": "Robert De Niro" }, { "name": "Zac Efron" }, { "name": "Zoey Deutch" }, { "name": "Leslie Cheung" }, { "name": "Maggie Cheung" }, { "name": "Andy Lau" }, { "name": "Scarlett Johansson" }, { "name": "Robert Downey Jr." }, { "name": "Jon Favreau" }, { "name": "Vince Vaughn" }, { "name": "Baihe Bai" }, { "name": "Kun Chen" }, { "name": "Hao Qin" }, { "name": "Chung Tử Ðơn" }, { "name": "Waise Lee Chi Hung" }, { "name": "Norman Chu" }, { "name": "Vu Thừa Huệ" }, { "name": "Tống Dương" }, { "name": "Lý Trình Viện" }, { "name": "Cảnh Lạc" }, { "name": "Han Chae Young" }, { "name": "Billy Lau" }, { "name": "Chin Siu Ho" }, { "name": "Siu hou Chin" }, { "name": "Yusi Peng" }, { "name": "Zhang He" }, { "name": "Lý Nhược Đồng" }, { "name": "Dayo Wong Chi Wah" }, { "name": "Lương Hán Văn" }, { "name": "Lam Kwok Bun" }, { "name": "Alexis Peterman" }, { "name": "Matt Rippy" }, { "name": "Nigel Barber" }, { "name": "Kirsten Dunst" }, { "name": "Amber Kuo" }, { "name": "Kai Chung Cheung" }, { "name": "Abby" }, { "name": "Jiang Wenxuan" }, { "name": "Miao Qing" }, { "name": "Liu Liyuan" }, { "name": "Song Wei" }, { "name": "Blake Anderson" }, { "name": "Tyree Brown" }, { "name": "David Cowgill" }, { "name": "Farhan Akhtar" }, { "name": "Aditi Rao Hydari" }, { "name": "Henry Cavill" }, { "name": "Rupert Evans" }, { "name": "James Russell" }, { "name": "Casey Affleck" }, { "name": "Kana Hanazawa" }, { "name": "Taiten Kusunoki" }, { "name": "Chelsey Crisp" }, { "name": "Riley Smith" }, { "name": "Michael Steger" }, { "name": "Kim Ji Ho" }, { "name": "Park Yong Woo" }, { "name": "Park Hae Joon" }, { "name": "Joo Da Young" }, { "name": "David Lee" }, { "name": "Ramin Karimloo" }, { "name": "Sierra Boggess" }, { "name": "Hadley Fraser" }, { "name": "Wendy Ferguson" }, { "name": "Gareth Snook" }, { "name": "Wynne Evans" }, { "name": "Liz Robertson" }, { "name": "Barry James" }, { "name": "Sergei Polunin" }, { "name": "Yeon Jun Suk" }, { "name": "Jessica Chastain" }, { "name": "Akshay Kumar" }, { "name": "Nimrat Kaur" }, { "name": "Taranjit Kaur" }, { "name": "Nhiều Diễn Viên" }, { "name": "Joseph Fiennes" }, { "name": "Tom Felton" }, { "name": "Peter Firth" }, { "name": "Neel Sethi" }, { "name": "Bill Murray" }, { "name": "Ben Kingsley" }, { "name": "Rosario Dawson" }, { "name": "Christopher Gorham" }, { "name": "Shemar Moore" }, { "name": "Sarah Rose Denton" }, { "name": "Lucy Clarvis" }, { "name": "Lawrence Weller" }, { "name": "Ju Yuebin" }, { "name": "Zhu Liqing" }, { "name": "Lai HongYu" }, { "name": "Rob Van Dam" }, { "name": "Tim Abell" }, { "name": "Sarah Bolger" }, { "name": "Carly Adams" }, { "name": "Carl Bailey" }, { "name": "Claire Forlani" }, { "name": "Mark Paul Gosselaar" }, { "name": "Natalie Dormer" }, { "name": "Stephanie Vogt" }, { "name": "Chris O'Dowd" }, { "name": "Guillaume Canet" }, { "name": "Jae mo Ahn" }, { "name": "Kil kang Ahn" }, { "name": "Richard Epcar" }, { "name": "Matthew Zuk" }, { "name": "Gabriela Lopez" }, { "name": "Dani Rovira" }, { "name": "Michelle Jenner" }, { "name": "Carme Calvell" }, { "name": "Iris Chung" }, { "name": "Dominic Ho" }, { "name": "Tony Ho" }, { "name": "Edgar Ramirez" }, { "name": "Luke Bracey" }, { "name": "Ray Winstone" }, { "name": "Rob Schneider" }, { "name": "Heather Graham" }, { "name": "Omar Sy" }, { "name": "Izïa Higelin" }, { "name": "Michaël Grégorio" }, { "name": "Alec Baldwin" }, { "name": "Bryn Apprill" }, { "name": "Kumiko Asô" }, { "name": "Morgan Berry" }, { "name": "Mia Goth" }, { "name": "Martin McCann" }, { "name": "Andrew Simpson" }, { "name": "Lizzy Caplan" }, { "name": "Lưu Gia Linh" }, { "name": "Lý Vũ Xuân" }, { "name": "Aaron Eckhart" }, { "name": "Từ Thiếu Cường" }, { "name": "Vương Tiểu Nghị" }, { "name": "Huỳnh Bạch Lộ" }, { "name": "Paul Gross" }, { "name": "Christine Horne" }, { "name": "Jason Lee" }, { "name": "Jesica Ahlberg" }, { "name": "Josh Green" }, { "name": "Jean Paul Rouve" }, { "name": "Vanessa Guide" }, { "name": "Steve Daron" }, { "name": "Guisela Moro" }, { "name": "Burt Reynolds" }, { "name": "Josh Hutcherson" }, { "name": "Charlie Weber" }, { "name": "Tom Ainsley" }, { "name": "Brenton Thwaites" }, { "name": "Nikolaj Coster Waldau" }, { "name": "Ginnifer Goodwin" }, { "name": "Jason Bateman" }, { "name": "Nhâm Đạt Hoa" }, { "name": "Hoắc Kiến Hoa" }, { "name": "Michael Keaton" }, { "name": "Narikun Ketprapakorn" }, { "name": "Thanapob Leeratanakajorn" }, { "name": "Thiti Mahayotaruk" }, { "name": "Lily James" }, { "name": "Sam Riley" }, { "name": "Will Kemp" }, { "name": "Brinna Kelly" }, { "name": "William Forsythe" }, { "name": "aomi Watts" }, { "name": "Andy Serkis" }, { "name": "Jamie Bell" }, { "name": "Rooney Mara" }, { "name": "Sibelle Hu" }, { "name": "Cynthia Rothrock" }, { "name": "Kara Hui" }, { "name": "Hong Jong Hyun" }, { "name": "Sarah Snook" }, { "name": "Jessica Brown Findlay" }, { "name": "Ana de Armas" }, { "name": "Christopher McDonald" }, { "name": "Johnny Messner" }, { "name": "Mickey Rourke" }, { "name": "Dương Tử Quỳnh" }, { "name": "Saoirse Ronan" }, { "name": "Domhnall Gleeson" }, { "name": "Brandon Routh" }, { "name": "Yuqi Zhang" }, { "name": "Russell Wong" }, { "name": "Demi Moore" }, { "name": "Kiefer Sutherland" }, { "name": "Donald Sutherland" }, { "name": "Josh Duhamel" }, { "name": "Anthony Hopkins" }, { "name": "Al Pacino" }, { "name": "Jeong min Hwang" }, { "name": "Sung ha Jo" }, { "name": "In kwon Kim" }, { "name": "David Thewlis" }, { "name": "Devon Bostick" }, { "name": "Aaron Ashmore" }, { "name": "Reiko Aylesworth" }, { "name": "Steven Pasquale" }, { "name": "Shareeka Epps" }, { "name": "Tom Hiddleston Brie Larson Toby Kebbell Corey Hawkins John C. Reilly Tom Wilkinson Thomas Mann John Goodman Samuel L. Jackson" }, { "name": "Nicole Kidman" }, { "name": "Jacqueline Abrahams" }, { "name": "Roger Ashton Griffiths" }, { "name": "Jessica Barden" }, { "name": "Sanaa Lathan" }, { "name": "Raoul Bova" }, { "name": "Scott Eastwood" }, { "name": "Angela Sarafyan" }, { "name": "Justin Arnold" }, { "name": "Phùng Thiệu Phong" }, { "name": "Củng Lợi" }, { "name": "Teodora Duhovnikova" }, { "name": "Alon Aboutboul" }, { "name": "Ice Cube" }, { "name": "Tika Sumpter" }, { "name": "Heather Sossaman" }, { "name": "Matthew Bohrer" }, { "name": "Courtney Halverson" }, { "name": "Bai Ling" }, { "name": "Amin Joseph" }, { "name": "Jung Woo" }, { "name": "Angelina Jolie" }, { "name": "Dustin Hoffman" }, { "name": "Michael B. Jordan" }, { "name": "Jacob Tremblay" }, { "name": "Sean Bridgers" }, { "name": "Morena Baccarin" }, { "name": "T.J. Miller" }, { "name": "Trương Mạn Ngọc" }, { "name": "Địch Long" }, { "name": "Yuliya Peresild" }, { "name": "Evgeniy Tsyganov" }, { "name": "Joan Blackham" }, { "name": "Vinnie Jones" }, { "name": "Sean Cronin" }, { "name": "Nicole Faraday" }, { "name": "Luis Tosar" }, { "name": "Elvira Mínguez" }, { "name": "Rossy de Palma" }, { "name": "Quim Gutiérrez" }, { "name": "Carlos Areces" }, { "name": "Liêu Phàm" }, { "name": "Tống giai" }, { "name": "Tưởng Văn Lệ" }, { "name": "Lily Rab" }, { "name": "Jason O'Mara" }, { "name": "Stuart Allan" }, { "name": "Kevin Chapman" }, { "name": "Kelly Blatz" }, { "name": "Billy Bob Thornton" }, { "name": "Phan Hồng" }, { "name": "Kim Sĩ Kiệt" }, { "name": "Hình Giai Đống" }, { "name": "Tim Robbins" }, { "name": "Sun kyun Lee" }, { "name": "Go eun Kim" }, { "name": "Hyeong seong Jang" }, { "name": "Salman Khan" }, { "name": "Kareena Kapoor" }, { "name": "Harshaali Malhotra" }, { "name": "Shin Min Ah" }, { "name": "Jo Jung Suk" }, { "name": "Shôta Sometani" }, { "name": "Eri Fukatsu" }, { "name": "Đinh Tử Tuấn" }, { "name": "Lê Tư" }, { "name": "Lý Tụ Hiền" }, { "name": "Tobey Maguire" }, { "name": "Peter Sarsgaard" }, { "name": "Anne Hathaway" }, { "name": "Jack Madigan" }, { "name": "Cao Thành Long" }, { "name": "Lưu Vũ Thỉnh" }, { "name": "Bành Ngu Khư" }, { "name": "Lưu Hạo Nhiên" }, { "name": "Emily Browning" }, { "name": "Mark Rylance" }, { "name": "Alan Alda" }, { "name": "Zhang Shiyu" }, { "name": "Qu Yu tong" }, { "name": "Carrie Ng" }, { "name": "Sammy Hung Tin Chiu" }, { "name": "Kabby Hui" }, { "name": "Rupert Grint" }, { "name": "Steve Carell" }, { "name": "Ryan Gosling" }, { "name": "Joo Won" }, { "name": "(Fx) Sulli" }, { "name": "Ahn Jae Hyun" }, { "name": "Bang Sung Joon" }, { "name": "Lee David" }, { "name": "Jo Sung Ha" }, { "name": "Guy Pearce" }, { "name": "Scoot McNairy" }, { "name": "Trương Hàm Dư" }, { "name": "Lý Dịch Phong" }, { "name": "Hứa Tình" }, { "name": "Phùng Tiểu Cương" }, { "name": "Charlie Chin" }, { "name": "Dorothy Chi hsia Yu" }, { "name": "Hua Yueh" }, { "name": "Phạm Vỹ" }, { "name": "Giang San" }, { "name": "Tiêu Du Trân" }, { "name": "Vương Nhất Minh" }, { "name": "Trương Gia Dịch" }, { "name": "Từ Tịnh Lôi" }, { "name": "Nhiệt Y Trát" }, { "name": "Tùng San" }, { "name": "Walton Goggins" }, { "name": "Tiểu Thẩm Dương" }, { "name": "Đổng Thành Bằng" }, { "name": "Thích Tiểu Long" }, { "name": "Đàm Tiểu Long" }, { "name": "Từ Khiết Nhi" }, { "name": "Viên Hiểu Siêu" }, { "name": "Lưu Thừa Tuấn" }, { "name": "Hùng Đại Lâm" }, { "name": "Bo lin Chen" }, { "name": "Wenbo Ding" }, { "name": "Zhenyu Qiao" }, { "name": "Jean Reno" }, { "name": "Alban Lenoir" }, { "name": "Caterina Murino" }, { "name": "Song Seung Hun" }, { "name": "Giang Ngữ Thần" }, { "name": "Jia (Miss A)" }, { "name": "Âu Đệ" }, { "name": "Ha Jung woo" }, { "name": "Ha Ji won" }, { "name": "Nam Darum" }, { "name": "No Kang Min" }, { "name": "Jeon Hyeon Seok" }, { "name": "Seong Dong il" }, { "name": "Jeong Man sik" }, { "name": "Kim Seong gyoon" }, { "name": "Lưu Đức Hòa" }, { "name": "Kate Mara" }, { "name": "Mimi Rogers" }, { "name": "Ajay Devgn" }, { "name": "Shriya Saran" }, { "name": "Phim Kinh Dị" }, { "name": "Park Geun Hyung" }, { "name": "Park Chanyeol" }, { "name": "Nguyên Bữu" }, { "name": "Dương Lệ Thanh" }, { "name": "Matthew Reese" }, { "name": "Danielle Chuchran" }, { "name": "Ha Ji Won" }, { "name": "Lim Chang Jung" }, { "name": "Park Chang Ik" }, { "name": "Park Yoo Sun" }, { "name": "Kang Ye Won" }, { "name": "Lee Hun" }, { "name": "Ngải Uy" }, { "name": "Lư Hải Bằng" }, { "name": "Liên Thi Nhã" }, { "name": "Yoo" }, { "name": "Jeong Kim" }, { "name": "Ye Ji Seo" }, { "name": "Ho Joon Son" }, { "name": "Colin Farrell" }, { "name": "Abbie Cornish" }, { "name": "Cillian Murphy" }, { "name": "Brendan Gleeson" }, { "name": "Amanda Abbington" }, { "name": "Rupert Graves" }, { "name": "Una Stubbs" }, { "name": "Lương Siêu" }, { "name": "Ben Collins" }, { "name": "Peter Miles" }, { "name": "Evangelos Grecos" }, { "name": "Jennifer Jason Leigh" }, { "name": "Ke Bai" }, { "name": "Xunzimo Liu" }, { "name": "Tianyu Ma" }, { "name": "Im Ju Hwan" }, { "name": "Lee Won Geun" }, { "name": "Elijah Wood" }, { "name": "Alison Pill" }, { "name": "Hao Lei" }, { "name": "Marika Itô" }, { "name": "Seiko Ozone" }, { "name": "Taichi Yamada" }, { "name": "Lâm Chánh Anh" }, { "name": "Suriya" }, { "name": "Samantha Ruth Prabhu" }, { "name": "Vidyut Jamwal" }, { "name": "Ip Chun" }, { "name": "Siu Wong Fan" }, { "name": "Yi Huang" }, { "name": "Tin Chiu Hung" }, { "name": "Lee Seung Gi" }, { "name": "Lee Seo Jin" }, { "name": "Hwa Young" }, { "name": "Son Ga In" }, { "name": "Lee Dong Hae" }, { "name": "Nam Ji Hyun" }, { "name": "Song Seung Hyun" }, { "name": "Will Poulter" }, { "name": "Alison Brie" }, { "name": "Charlotte Le Bon" }, { "name": "Guillaume Baillargeon" }, { "name": "Hoàng Hồng Thăng" }, { "name": "Vương Dương Minh" }, { "name": "Thái Chấn Nam" }, { "name": "Emily Blunt" }, { "name": "Dee Bradley Baker" }, { "name": "Jeff Bennett" }, { "name": "Beau Black" }, { "name": "Honghui Xu" }, { "name": "Seong woo Bae" }, { "name": "Son Hyun joo" }, { "name": "Jang In sub" }, { "name": "Adam Sandler" }, { "name": "Terry Crews" }, { "name": "Jorge Garcia" }, { "name": "Yi Yan Jiang" }, { "name": "Ka Tung Lam" }, { "name": "Mạc Tiểu Kỳ" }, { "name": "Mã Dục Kha" }, { "name": "Phan Việt Minh" }, { "name": "Grace Wang" }, { "name": "Lâm Tuyết" }, { "name": "Kellan Lutz" }, { "name": "Cao Vân Tường" }, { "name": "Hùng Nãi Cẩn" }, { "name": "Lưu Ngôn Ngữ" }, { "name": "Sienna Miller" }, { "name": "Daisy Ridley" }, { "name": "John Boyega" }, { "name": "Tye Sheridan" }, { "name": "Meng Meng Liu" }, { "name": "Ning Li" }, { "name": "Enhe Kang" }, { "name": "Weixun Zhang" }, { "name": "RenLiang Qiao" }, { "name": "Zhang Xinyu" }, { "name": "French Stewart" }, { "name": "Erick Avari" }, { "name": "Barbara Babcock" }, { "name": "Odeya Rush" }, { "name": "Christina Cabot" }, { "name": "Mos Def" }, { "name": "Jason Segel" }, { "name": "Anna Chlumsky" }, { "name": "Jonathan Bennett" }, { "name": "Talulah Riley" }, { "name": "Rosa Salazar" }, { "name": "Lữ Duật Lai" }, { "name": "Tạ Quân Hào" }, { "name": "Trương Duệ Gia" }, { "name": "Trần Đăng" }, { "name": "Mã Lệ" }, { "name": "Duẫn Chính" }, { "name": "Macaulay Culkin" }, { "name": "Joe Pesci" }, { "name": "Daniel Stern" }, { "name": "John Heard" }, { "name": "Roberts Blossom" }, { "name": "Kodi Smit McPhee" }, { "name": "Ben Mendelsohn" }, { "name": "Wallace Shawn" }, { "name": "Kristoffer Joner" }, { "name": "Thomas Bo Larsen" }, { "name": "Ane Dahl Torp" }, { "name": "Levi Miller" }, { "name": "Garrett Hedlund" }, { "name": "Jennifer Ehle" }, { "name": "Kevin Durand" }, { "name": "Mélanie St Pierre" }, { "name": "Abby Feng" }, { "name": "Yunqi Guo" }, { "name": "Musi Ni" }, { "name": "Jiahao Song" }, { "name": "Hanfeng" }, { "name": "Catherine O’Hara" }, { "name": "Tara Basro" }, { "name": "Christine Hakim" }, { "name": "Eva Celia Latjuba" }, { "name": "Lập Uy Liêm" }, { "name": "Chu Châu" }, { "name": "Ronald Cheng" }, { "name": "Mark Wu" }, { "name": "Archie Kao" }, { "name": "Anita Yuen" }, { "name": "Zimu Zhang" }, { "name": "Anushka Shetty" }, { "name": "Allu Arjun" }, { "name": "Rana Daggubati" }, { "name": "Cheon hee Lee" }, { "name": "Kwang Soo Lee" }, { "name": "Bo yeong Park" }, { "name": "Alex D. Linz" }, { "name": "Olek Krupa" }, { "name": "Rya Kihlstedt" }, { "name": "Laia Costa" }, { "name": "Frederick Lau" }, { "name": "Franz Rogowski" }, { "name": "James Ransone" }, { "name": "Shannyn Sossamon" }, { "name": "Robert Daniel Sloan" }, { "name": "Chin Han" }, { "name": "Ngô Thanh Liên" }, { "name": "Trương Bá Chi" }, { "name": "Frances McDormand" }, { "name": "Maleah Nipay Padilla" }, { "name": "KIKO MIZUHARA" }, { "name": "KANATA HONGO" }, { "name": "RINA TAKEDA" }, { "name": "SATOMI ISHIHARA" }, { "name": "Mark Chao" }, { "name": "Jin Chen" }, { "name": "Li Feng" }, { "name": "Andy Samberg" }, { "name": "Selena Gomez" }, { "name": "Airi Taira" }, { "name": "Ren Kiriyama" }, { "name": "Nonoka Ono" }, { "name": "Sang Woo Kwon" }, { "name": "Young hee Seo" }, { "name": "Dong il Sung" }, { "name": "Hershel Peppers" }, { "name": "Jet Li" }, { "name": "Charlton HestonJames Coburn" }, { "name": "Đồng Đại Vi" }, { "name": "Sung Kang" }, { "name": "Nick Chinlund" }, { "name": "Caitlin Keats" }, { "name": "Phim Hài Hước" }, { "name": "Jackie Shroff" }, { "name": "Haruma Miura" }, { "name": "Kiko Mizuhara" }, { "name": "Jennifer Aniston" }, { "name": "Reina Triendl" }, { "name": "Mariko Shinoda" }, { "name": "Erina Mano" }, { "name": "Chia Liang Liu" }, { "name": "Jung Yuen" }, { "name": "Lars Mikkelsen" }, { "name": "Pilou Asbæk" }, { "name": "Gustav Dyekjær Giese" }, { "name": "Nickie Bryar" }, { "name": "Feodor Chin" }, { "name": "Nika Futterman" }, { "name": "Devin Brochu" }, { "name": "Natalie Portma" }, { "name": "Shia LaBeouf" }, { "name": "John Turturro" }, { "name": "Tyrese Gibson" }, { "name": "Rosie Huntington Whiteley" }, { "name": "Patrick Dempsey" }, { "name": "Rich Hutchman" }, { "name": "Kevin Dunn" }, { "name": "John Malkovic" }, { "name": "Daniel Craig" }, { "name": "Mathieu Amalric" }, { "name": "Gemma Arterton" }, { "name": "Giang Nhất Yến" }, { "name": "Huỳnh Thu Sinh" }, { "name": "Ngô Tú Ba" }, { "name": "Rupert Friend" }, { "name": "Hannah Ware" }, { "name": "Phim Võ Thuật" }, { "name": "Saif Ali Khan" }, { "name": "Sabyasachi Chakraborty" }, { "name": "Thiệu Binh" }, { "name": "Đổng Tuyền" }, { "name": "Bành Ba" }, { "name": "Armie Hammer" }, { "name": "Hayden Christensen" }, { "name": "Jordana Brewster" }, { "name": "Monica Engesser" }, { "name": "Amelia Haberman" }, { "name": "James Ray" }, { "name": "Phim Cổ Trang" }, { "name": "Trịnh Trung Cơ" }, { "name": "William Shatner" }, { "name": "Leonard Nimoy" }, { "name": "DeForest Kelley" }, { "name": "Jonathan Frakes" }, { "name": "Brent Spiner" }, { "name": "Abraham Attah" }, { "name": "Emmanuel Affadzi" }, { "name": "Ricky Adelayitor" }, { "name": "Chang Yiran" }, { "name": "Jiajia Liu" }, { "name": "Ying Fei" }, { "name": "Ward Horton" }, { "name": "Alfre Woodard" }, { "name": "Holly Valance" }, { "name": "Vincent Pastore" }, { "name": "Corinna Harney" }, { "name": "Ngô Tôn" }, { "name": "Malcolm McDowell" }, { "name": "Lilian Prent" }, { "name": "Jan Josef Liefers" }, { "name": "Christoph Maria Herbst" }, { "name": "Chen Chang" }, { "name": "Satoshi Tsumabuki" }, { "name": "Dylan O'Brien" }, { "name": "Thomas Brodie Sangster" }, { "name": "Connie Britton" }, { "name": "Taissa Farmiga" }, { "name": "Malin Akerman" }, { "name": "Adam DeVine" }, { "name": "Boran Jing" }, { "name": "Miroslav Karel" }, { "name": "Anthony Ilott" }, { "name": "Aqueela Zoll" }, { "name": "Sadie Katz" }, { "name": "Kate Beckinsale" }, { "name": "Robin Williams" }, { "name": "Simon Pegg" }, { "name": "Randy Orton" }, { "name": "Wes Studi" }, { "name": "Helen McCrory" }, { "name": "Jeremy Irvine" }, { "name": "Phoebe Fox" }, { "name": "Vin Diesel" }, { "name": "Rose Leslie" }, { "name": "Alan Tang" }, { "name": "Brigitte Lin" }, { "name": "Elsie Chan" }, { "name": "Lake Bell" }, { "name": "Mike Tyson" }, { "name": "Trương Tấn" }, { "name": "Xin Gao" }, { "name": "Christoph Waltz" }, { "name": "Michael Douglas" }, { "name": "Corey Stoll" }, { "name": "Cynthia Khan" }, { "name": "Gary Chow" }, { "name": "Prabhas" }, { "name": "Katrina Law" }, { "name": "Lochlyn Munro" }, { "name": "Victoria Pratt" }, { "name": "Michael Gross" }, { "name": "Jamie Kennedy" }, { "name": "Ernest Ndhlovu" }, { "name": "Ji hyun Jun" }, { "name": "Jung jae Lee" }, { "name": "Jason Clarke" }, { "name": "Ang Phula Sherpa" }, { "name": "Thomas M. Wright" }, { "name": "Stephanie Honoré" }, { "name": "Jerome Andries" }, { "name": "Sue Lynn Ansari" }, { "name": "James Purefoy" }, { "name": "Laura Linney" }, { "name": "Hiroyuki Sanada" }, { "name": "Ed Speleers" }, { "name": "Holly Weston" }, { "name": "Elliot Cowan" }, { "name": "Kane Hodder" }, { "name": "Bill Moseley" }, { "name": "Olivia Alexander" }, { "name": "Isla Fisher" }, { "name": "Jim Parsons" }, { "name": "Anson Mount" }, { "name": "Matthew Goode" }, { "name": "Joe Cole" }, { "name": "Hong Zhou" }, { "name": "Eunsung Kim" }, { "name": "Lee Chae young" }, { "name": "Al Pacinondy Garcia" }, { "name": "James Caan" }, { "name": "Thomas Haden Church" }, { "name": "Josh Wiggins" }, { "name": "Luke Kleintank" }, { "name": "Tony Revolori" }, { "name": "Kiersey Clemon" }, { "name": "Chao Deng" }, { "name": "Yihong Duan" }, { "name": "Tao Guo" }, { "name": "Aaron Stielstra" }, { "name": "Michael Segal" }, { "name": "Marius Bizau" }, { "name": "Lorenza Izzo" }, { "name": "Bruce Payne" }, { "name": "Mark Adams" }, { "name": "Adrian Grenier" }, { "name": "Kevin Connolly" }, { "name": "Jerry Ferrara" }, { "name": "Miles Teller" }, { "name": "Max Rhyser" }, { "name": "Ashton Leigh" }, { "name": "Boomer Tibb" }, { "name": "Daniel MacPherson" }, { "name": "Grace Huang" }, { "name": "Luke Hemsworth" }, { "name": "Brittany Allen" }, { "name": "Freddie Stroma" }, { "name": "Jesse Moss" }, { "name": "Krysten Ritter" }, { "name": "Viktor Bychkov" }, { "name": "Emma Cerná" }, { "name": "Aleksey Chadov" }, { "name": "Ali Larter" }, { "name": "Max Rose" }, { "name": "Chloe Perrin" }, { "name": "Ariel Levy" }, { "name": "Aaron Burns" }, { "name": "Zan Ban" }, { "name": "Zhao Chunyang" }, { "name": "Dongping Gao" }, { "name": "Yayan Ruhian" }, { "name": "Rirî Furankî" }, { "name": "Mio Yûki" }, { "name": "Robin Das" }, { "name": "Zachary Coffin" }, { "name": "Dustin Nguyen" }, { "name": "Sahajak Boonthanakit" }, { "name": "Sarah Butler" }, { "name": "Gabriel Hogan" }, { "name": "Doug McKeon" }, { "name": "Bipasha Basu" }, { "name": "Sulabha Arya" }, { "name": "Matt Winston" }, { "name": "Camille Balsamo" }, { "name": "Chung Hân Đồng" }, { "name": "Kiều Chấn Vũ" }, { "name": "Mayuko Iwasa" }, { "name": "Minehiro Kinomoto" }, { "name": "Nao Nagasawa" }, { "name": "Oona Laurence" }, { "name": "Mike Doyle" }, { "name": "Estella Warren" }, { "name": "Massimo Dobrovic" }, { "name": "Choi Won joon" }, { "name": "Han Se I" }, { "name": "Lee Jae in" }, { "name": "Jang Moon yeong" }, { "name": "Sara Malakul Lane" }, { "name": "Lily Brooks O'Briant" }, { "name": "Pierre Coffin" }, { "name": "Prama Immanothai" }, { "name": "Focus Jirakul" }, { "name": "Chonnikan Netjui" }, { "name": "Stefanie Scott" }, { "name": "Angus Sampson" }, { "name": "Jim Carrey" }, { "name": "Rob Riggle" }, { "name": "Amy Poehler" }, { "name": "Bill Hader" }, { "name": "Lewis Black" }, { "name": "Song Hye Kyo" }, { "name": "Nagasawa Masami" }, { "name": "Takeshi Kaneshiro" }, { "name": "Ed Skrein" }, { "name": "Loan Chabanol" }, { "name": "Ray Stevenson" }, { "name": "Togo Igawa" }, { "name": "Christian Howard" }, { "name": "Mike Moh" }, { "name": "Jeremy Renner" }, { "name": "Jin Goo" }, { "name": "Lee Hyun Woo" }, { "name": "Mu Yeol Kim" }, { "name": "Kevin James" }, { "name": "Michelle Monaghan" }, { "name": "Jessica Lowndes" }, { "name": "Freida Pinto" }, { "name": "Ryan Kwanten" }, { "name": "Mischa Barton" }, { "name": "Luke Goss" }, { "name": "Ving Rhames" }, { "name": "Grace Phipps" }, { "name": "Spencer Breslin" }, { "name": "Maestro Harrell" }, { "name": "Jude Law" }, { "name": "Christina Applegate" }, { "name": "Skyler Gisondo" }, { "name": "Jonah Hill" }, { "name": "Lauren Ambrose" }, { "name": "Wes Ramsey" }, { "name": "Christopher Backus" }, { "name": "Steve Agee" }, { "name": "Nick Damici" }, { "name": "Kevin Duran" }, { "name": "Arnold Schwarzenegger" }, { "name": "Kit Harington" }, { "name": "Tuppence Middleton" }, { "name": "Lara Pulver" }, { "name": "Jonathan Good" }, { "name": "Roger R. Cross" }, { "name": "Daniel Cudmore" }, { "name": "Carla Gugino" }, { "name": "Alexandra Daddario" }, { "name": "Hugh Laurie" }, { "name": "Natalie Martinez" }, { "name": "Matt Mercer" }, { "name": "Marianna Palka" }, { "name": "Morgan Peter Brown" }, { "name": "Rashida Jones" }, { "name": "Lauren Gottlieb" }, { "name": "Salma Hayek" }, { "name": "Tăng Chí Vĩ" }, { "name": "Ngô Quân Như" }, { "name": "Thang Duy" }, { "name": "James Marsden" }, { "name": "Timothy Woodward Jr" }, { "name": "Andrew Cheney" }, { "name": "John Rhys Davies" }, { "name": "Kara Killmer" }, { "name": "Phim Tâm Lý" }, { "name": "Tuva Novotny" }, { "name": "Fridtjov Såheim" }, { "name": "Anders Baasmo Christiansen" }, { "name": "Jennifer Lopez" }, { "name": "Viola Davis" }, { "name": "Shea Whigham" }, { "name": "Allari Naresh" }, { "name": "Allari Naresh Sakshi Chaudhary" }, { "name": "Sarah Wayne Callies" }, { "name": "Veronica Ferres" }, { "name": "Lauren Beatty" }, { "name": "Hans Zhang Han" }, { "name": "Zhang Li" }, { "name": "Fan Chih Wei" }, { "name": "Kong Wei" }, { "name": "Kevin Sorbo" }, { "name": "Peter Fonda" }, { "name": "Andrew Galligan" }, { "name": "Matt Bomer" }, { "name": "Trương Chấn" }, { "name": "Lâm Chí Linh" }, { "name": "Vương Học Kỳ" }, { "name": "Jacky Cheung" }, { "name": "Dermot Magennis" }, { "name": "Callum Maloney" }, { "name": "Tara Flynn" }, { "name": "Jaime King" }, { "name": "Madeleine Stack" }, { "name": "Phim Viễn Tưởng" }, { "name": "Matthew Fox" }, { "name": "Quinn McColgan" }, { "name": "Angela Baby" }, { "name": "Paul Walker" }, { "name": "Michelle Rodriguez" }, { "name": "Chris Bridges" }, { "name": "Lucas Black" }, { "name": "Ko Shibasaki" }, { "name": "Rihanna" }, { "name": "Steve Martin" }, { "name": "Masachika Ichimura" }, { "name": "Yumi Kakazu" }, { "name": "Reese Witherspoon" }, { "name": "Sofía Vergara" }, { "name": "Matthew Del Negro" }, { "name": "Philip Davis" }, { "name": "Dexter Fletcher" }, { "name": "Patrick Bergin" }, { "name": "Junior N.T.R." }, { "name": "Kajal Agarwal" }, { "name": "Ali" }, { "name": "Lim Soo Jung" }, { "name": "Lee Geung Young" }, { "name": "Min ho Lee" }, { "name": "Rae won Kim" }, { "name": "Jin young Jung" }, { "name": "Jun'ichi Okada" }, { "name": "Mao Inoue" }, { "name": "Dong seok Ma" }, { "name": "Daniel Choi" }, { "name": "Teerapat Lohanan" }, { "name": "Pongsatorn Sripinta" }, { "name": "Withawat Thaokhamlue" }, { "name": "Michael Rene Walton" }, { "name": "Vivica A. Fox" }, { "name": "Judi Dench" }, { "name": "Steve Coogan" }, { "name": "Sophie Kennedy Clark" }, { "name": "Clifton Collins Jr." }, { "name": "Jessica Cook" }, { "name": "Tony de Maeyer" }, { "name": "Nghê Ni" }, { "name": "Trình Vũ Mông" }, { "name": "Michel Diercks" }, { "name": "Pit Bukowski" }, { "name": "Uwe Preuss" }, { "name": "Sterling Jerins" }, { "name": "Ty Simpkins" }, { "name": "Keir Gilchrist" }, { "name": "Olivia Luccardi" }, { "name": "Dean Cain" }, { "name": "Paul Wight" }, { "name": "Michael Eklund" }, { "name": "Onni Tommila" }, { "name": "Tom Arnold" }, { "name": "Drake Bell" }, { "name": "Miranda Cosgrove" }, { "name": "Woo bin Kim" }, { "name": "Jun Ho Lee" }, { "name": "Ha Neul Kang" }, { "name": "Paddy Wallace" }, { "name": "Parker Sawyers" }, { "name": "Bashar Rahal" }, { "name": "Liam Neeson" }, { "name": "Ed Harris" }, { "name": "Joel Kinnaman" }, { "name": "Reese Hartwig" }, { "name": "Sixuan Chen" }, { "name": "Mark Cheng" }, { "name": "Jamie Cheung" }, { "name": "Raini Rodriguez" }, { "name": "Eduardo Verástegui" }, { "name": "Rutger Hauer" }, { "name": "Aurélie Meriel" }, { "name": "Seth Macfarlane" }, { "name": "Amanda Seyfried" }, { "name": "Tom Schilling" }, { "name": "Wotan Wilke Möhring" }, { "name": "An Chí Kiệt" }, { "name": "Darren Shahlavi" }, { "name": "Charlotte Peters" }, { "name": "Blake Lively" }, { "name": "Michiel Huisman" }, { "name": "Harrison Ford" }, { "name": "Idina Menzel" }, { "name": "Rosemarie DeWitt" }, { "name": "Kennedi Clement" }, { "name": "Olivia Wilde" }, { "name": "Mark Duplass" }, { "name": "Evan Peters" }, { "name": "Diệp Tuyền" }, { "name": "Tiêu Ân Tuấn" }, { "name": "Andrew Lin" }, { "name": "Sean Penn" }, { "name": "Jasmine Trinca" }, { "name": "Mélanie Laurent" }, { "name": "Sarah Gadon" }, { "name": "Ewan McGregor" }, { "name": "Brendan Kerkvliet" }, { "name": "Clive Owen" }, { "name": "Aksel Hennie" }, { "name": "Takamasa Ishihara" }, { "name": "David Rawle" }, { "name": "Lisa Hannigan" }, { "name": "Roger Carel" }, { "name": "Lorànt Deutsch" }, { "name": "Laurent Lafitte" }, { "name": "Ben Barnes" }, { "name": "Julianne Moore" }, { "name": "Abigail Breslin" }, { "name": "Joely Richardson" }, { "name": "Li Siru" }, { "name": "Wang Chong" }, { "name": "Zhou Ting" }, { "name": "Jin Ji Hee" }, { "name": "Ga In" }, { "name": "Joo Sang Wook" }, { "name": "Chae Sang Woo" }, { "name": "Choi Seong Min" }, { "name": "Ocean Hou" }, { "name": "Tom Prior" }, { "name": "Gabriella Wright" }, { "name": "Jennifer Blanc" }, { "name": "Yeong cheol Kim" }, { "name": "Jessica Lange" }, { "name": "Keira Knightley" }, { "name": "Peyman Moaadi" }, { "name": "Lane Garrison" }, { "name": "Marie Avgeropoulos" }, { "name": "Adam Rayner" }, { "name": "Jacky Wu" }, { "name": "Kevin Lee" }, { "name": "Michelle Hu" }, { "name": "Meryl Streep" }, { "name": "Sheila Vand" }, { "name": "Arash Marandi" }, { "name": "Marshall Manesh" }, { "name": "Mike 'The Miz' Mizanin" }, { "name": "Josh Blacker" }, { "name": "Matthew MacCaull" }, { "name": "Rodrigo Santoro" }, { "name": "Min Hee Kim" }, { "name": "Brian Tee" }, { "name": "An Dĩ Hiên" }, { "name": "Trương Hình Dư" }, { "name": "Troy Baker" }, { "name": "Kevin Conroy" }, { "name": "Józef Pawlowski" }, { "name": "Zofia Wichlacz" }, { "name": "Anna Próchniak" }, { "name": "Triệu Hựu Đình" }, { "name": "Trương Quân Ninh" }, { "name": "Quan Dĩnh" }, { "name": "Tu Kiệt Giai" }, { "name": "Jake Gylle" }, { "name": "Daniel Garcia" }, { "name": "Gambler" }, { "name": "Dư Văn Lạc" }, { "name": "Tatsuya Fujiwara" }, { "name": "Takeru Satô" }, { "name": "Emi Takei" }, { "name": "Colin Firth" }, { "name": "Michael Caine" }, { "name": "Kyle Gallner" }, { "name": "jacky chan" }, { "name": "thành long" }, { "name": "William Fichtner" }, { "name": "Jack Davenport" }, { "name": "Geoffrey Rush" }, { "name": "Phim Âm Nhạc" }, { "name": "Zoe Saldana" }, { "name": "Sam Worthington" }, { "name": "Ryu Seung Ryong" }, { "name": "Jin woong Jo" }, { "name": "Quang Tèo" }, { "name": "Bình Trọng" }, { "name": "NS. Chiến Thắng" }, { "name": "Matthew McConaughey" }, { "name": "Kang Don Won" }, { "name": "Kim Xuyến" }, { "name": "Công Lý" }, { "name": "Matt Lanter" }, { "name": "Sumalee Montano" }, { "name": "Quốc Anh" }, { "name": "Chiến Thắng" }, { "name": "Hán Văn Tình" }, { "name": "Thu Hương" }, { "name": "NS.Phạm Bằng" }, { "name": "Michael Angarano" }, { "name": "Dominik García Lorido" }, { "name": "Từ Phàm" }, { "name": "Trương Tịnh Sơ" }, { "name": "Trần Đạo Minh" }, { "name": "Lý Thần" }, { "name": "Lục Nghị" }, { "name": "Trúc Mai" }, { "name": "Thu Huyền" }, { "name": "Bill Nighy" }, { "name": "Kaitlyn Dever" }, { "name": "Forest Whitaker" }, { "name": "Maggie Grac" }, { "name": "Justin Long" }, { "name": "Michael Parks" }, { "name": "Haley Joel Osment" }, { "name": "Jessica Cambensy" }, { "name": "Abby Fung" }, { "name": "Chang Ha" }, { "name": "Phim Hình Sự" }, { "name": "Richard Sammel" }, { "name": "Alice Taglioni" }, { "name": "Simon Abkarian" }, { "name": "Phim Chiến Tranh" }, { "name": "Chingmy Yau" }, { "name": "Tze Miu" }, { "name": "Deannie Yip" }, { "name": "Victor Webster" }, { "name": "Ellen Hollman" }, { "name": "Nam gil Kim" }, { "name": "Ye jin Son" }, { "name": "Hae jin Yoo" }, { "name": "Tully Banta Cain" }, { "name": "Paul Ben Victo" }, { "name": "Kevin Wu" }, { "name": "Harry Shum Jr." }, { "name": "Alfie Allen" }, { "name": "Phim Thuyết Minh" }, { "name": "Sheila Kelley" }, { "name": "Keiko Kitagawa" }, { "name": "Shunji Igarashi" }, { "name": "Kento Kaku" }, { "name": "Natsuki Katô" }, { "name": "Fumino Kimura" }, { "name": "Osamu Mukai" }, { "name": "Logan Lerman" }, { "name": "James Gandolfini" }, { "name": "David Harbour" }, { "name": "Mireille Enos" }, { "name": "Jamie Blackley" }, { "name": "Tobias Moretti" }, { "name": "Helmuth Häusler" }, { "name": "Matthias Schweighöfer" }, { "name": "August Diehl" }, { "name": "Anna Bederke" }, { "name": "Won Bin" }, { "name": "Rosamund Pike" }, { "name": "Neil Patrick Harris" }, { "name": "Fred Cavayé" }, { "name": "Lea Thompson" }, { "name": "Cassi Thomson" }, { "name": "Justin Chatwin" }, { "name": "Jamie Chung" }, { "name": "Marton Csokas" }, { "name": "Donnie Yen" }, { "name": "Charlie Yeung" }, { "name": "Baoqiang Wang" }, { "name": "Kaito Ishikawa" }, { "name": "Kenji Akabane" }, { "name": "Kensho Ono" }, { "name": "Vegar Hoel" }, { "name": "Ørjan Gamst" }, { "name": "Martin Starr" }, { "name": "Tadanobu Asano" }, { "name": "Rie Miyazawa" }, { "name": "Machiko Ono" }, { "name": "Essie Davis" }, { "name": "Noah Wiseman" }, { "name": "Daniel Henshall" }, { "name": "William H. Macy" }, { "name": "Philip Baker Hall" }, { "name": "Timothy Olyphant" }, { "name": "Andy Richter" }, { "name": "Tom McGrath" }, { "name": "Chris Miller" }, { "name": "Christopher Knights" }, { "name": "Scott Adkins and Ben Cross" }, { "name": "Mykel Shannon Jenkins" }, { "name": "Mark Ivanir" }, { "name": "Hristo Shopov" }, { "name": "Melissa George" }, { "name": "Jimmy Bennett" }, { "name": "Chutavuth Pattarakampol" }, { "name": "Supassra Thanachat" }, { "name": "Noah Taylor" }, { "name": "Olivia Cooke" }, { "name": "Ana Coto" }, { "name": "Daren Kagasoff" }, { "name": "Phim Khoa học Tài liệu" }, { "name": "Noel Clarke" }, { "name": "Ian Somerhalder" }, { "name": "Kim Coates" }, { "name": "Shawn Roberts" }, { "name": "Ryan Potter" }, { "name": "Scott Adsit" }, { "name": "Jack Kilmer" }, { "name": "Olivia Crocicchia" }, { "name": "Ellar Coltrane" }, { "name": "Patricia Arquette" }, { "name": "Chad Anderson" }, { "name": "Lexi Atkins" }, { "name": "Brent Briscoe" }, { "name": "Bill Burr" }, { "name": "Park Sang Joon" }, { "name": "Johnathon Schaech" }, { "name": "Lee Jung jae" }, { "name": "Kim Hyang Gi" }, { "name": "Kim Dong Wook" }, { "name": "Steve Buscemi" }, { "name": "Yuki Yamada" }, { "name": "Jumpei Mizobata" }, { "name": "Mikie Hara" }, { "name": "Dongyu Zhou" }, { "name": "Yi Feng Li" }, { "name": "Cherami Leigh" }, { "name": "Bryce Papenbrook" }, { "name": "Johnny Yong Bosch" }, { "name": "Masami Nagasawa" }, { "name": "Sota Fukushi" }, { "name": "Hana Sugisaki" }, { "name": "Yôsuke Eguchi" }, { "name": "Miyavi" }, { "name": "Ashley Greene" }, { "name": "Yuki Furukawa" }, { "name": "Takemi Fujii" }, { "name": "Hiroshi Abe" }, { "name": "Yoko Maki" }, { "name": "Satomi Kobayashi" }, { "name": "AnnaSophia Robb" }, { "name": "Isabelle Fuhrman" }, { "name": "Victoria Moroles" }, { "name": "Jo Bok Rae" }, { "name": "Kim Sang Kyung" }, { "name": "Yeon Woo Jin" }, { "name": "Kang Min Hyuk" }, { "name": "Shim Eun Kyung" }, { "name": "Ilya Malakov" }, { "name": "Aleksey Serebryakov" }, { "name": "Aleksandr Ilin" }, { "name": "Timofey Tribuntsev" }, { "name": "Yuliya Khlynina" }, { "name": "Andrey Burkovskiy" }, { "name": "Igor Savochkin" }, { "name": "Polina Chernyshova" }, { "name": "Aleksandr Tsoy" }, { "name": "Viktor Proskurin" }, { "name": "Sergey Koltakov" }, { "name": "Julia Pisarenko" }, { "name": "Fedor Starykh" }, { "name": "Minami Takayama" }, { "name": "Kappei Yamaguchi" }, { "name": "Wakana Yamazaki" }, { "name": "Ken'ichi Ogata" }, { "name": "Chân Tử Đan" }, { "name": "Lưu Dĩ Hào" }, { "name": "Nghiêm Chính Lam" }, { "name": "Lý Thuyên" }, { "name": "David Tennant" }, { "name": "Kerry Condon" }, { "name": "Jacqueline Byers" }, { "name": "Carlito Olivero" }, { "name": "Lee Byung Hun" }, { "name": "Ko Soo" }, { "name": "Song Young Chang" }, { "name": "Jo Woo Jin" }, { "name": "Disha Patani" }, { "name": "Deepak Dobriyal" }, { "name": "Darshan Kumaar" }, { "name": "Indraneel Bhattacharya" }, { "name": "Andrea Riseborough" }, { "name": "Linus Roache" }, { "name": "Olwen Fouere" }, { "name": "Ned Dennehy" }, { "name": "Richard Brake" }, { "name": "Donald Glover" }, { "name": "Yuko Takeuchi" }, { "name": "Tsutomu Yamazaki" }, { "name": "Kenny Lin" }, { "name": "Sichun Ma" }, { "name": "Ann Dowd" }, { "name": "Alex Wolff" }, { "name": "BriAnn Rachele" }, { "name": "Fiona Sit" }, { "name": "Jack Kao" }, { "name": "Shao Huai Chang" }, { "name": "Tien Niu" }, { "name": "Jacky Cai" }, { "name": "Tai Bo" }, { "name": "Yi Hang He" }, { "name": "Joy Sheng" }, { "name": "Sean Liu" }, { "name": "Phoebe Yuan" }, { "name": "Yi Chung Chang Chien" }, { "name": "Wei Ni Chang" }, { "name": "Jerry Chen" }, { "name": "Temuera Morrison" }, { "name": "DAN EWING" }, { "name": "STEPHANIE JACOBSEN" }, { "name": "RHIANNON FISH" }, { "name": "ZACHARY GARRED" }, { "name": "JACK KAO KUO HSIN" }, { "name": "CHEN NAN TSAI" }, { "name": "PENG SUN" }, { "name": "Trương Lượng" }, { "name": "Lâm Lộ Địch" }, { "name": "Tomokazu Seki" }, { "name": "Subaru Kimura" }, { "name": "Wasabi Mizuta" }, { "name": "JUNG JIN YOUNG" }, { "name": "Jung Hae In" }, { "name": "Kim Won Hae" }, { "name": "Kim Ju Hyeok" }, { "name": "Jung Sang Hoon" }, { "name": "Minnie Driver" }, { "name": "Natassia Malthe" }, { "name": "Leonor Varela" }, { "name": "Jóhannes Haukur Jóhannesson" }, { "name": "Sammi Cheng" }, { "name": "Kwok Keung Cheung" }, { "name": "Sui Man Chim" }, { "name": "Ada Choi" }, { "name": "Philippe Joly" }, { "name": "Colin David Herbert Blackwell" }, { "name": "Chi Wah Wong" }, { "name": "Cecilia So" }, { "name": "Sze Kwan Cheng" }, { "name": "Lawrence Cheng" }, { "name": "Justin Cheung" }, { "name": "Michael Hui" }, { "name": "Rani Mukerji" }, { "name": "Neeraj Kabi" }, { "name": "Jannat Zubair Rahmani" }, { "name": "Bạch Vũ" }, { "name": "Hoàng Dung" }, { "name": "Khương Chấn Hạo" }, { "name": "Yoshitaka Yuriko" }, { "name": "Kenichi Matsuyama" }, { "name": "Kaya Kiyohara" }, { "name": "Matsuzaka Tori" }, { "name": "Aimi Satsukawa" }, { "name": "Matt Barr" }, { "name": "Kate Upton" }, { "name": "Matt Jones" }, { "name": "Kal Penn" }, { "name": "Ron Livingston" }, { "name": "Mackenzie Davis" }, { "name": "ASHER MILES FALLICA" }, { "name": "Lia Frankland" }, { "name": "Lee Yeon hee" }, { "name": "Dong Il Sung" }, { "name": "Dam Bi Son" }, { "name": "Griffin Dunne" }, { "name": "Deidre Goodwin" }, { "name": "Daniella Rabbani" }, { "name": "Brian J. Carter" }, { "name": "Gemma Forbes" }, { "name": "Conan" }, { "name": "Ran" }, { "name": "Shinichi" }, { "name": "Haibara" }, { "name": "Kim Min Jae" }, { "name": "Sung Dong Il" }, { "name": "Na Moon Hee" }, { "name": "Lee Sung Kyung" }, { "name": "Yu Hae Jin" }, { "name": "Aleksey Faddeev" }, { "name": "Aleksandr Kuznetsov" }, { "name": "Yuriy Tsurilo" }, { "name": "Izmaylova Vasilisa" }, { "name": "Vladimir Ilin" }, { "name": "Yuriy Itskov" }, { "name": "Ike Barinholtz" }, { "name": "Bernard Farcy" }, { "name": "Anouar Toubali" }, { "name": "Edouard Montoute" }, { "name": "Eric Fraticelli" }, { "name": "Dịch Bách Thần" }, { "name": "Chu Tiển" }, { "name": "Khảm Bôn Bôn" }, { "name": "Ngu Y Kiệt" }, { "name": "Lý Thụy Siêu" }, { "name": "Rajit Kapoor" }, { "name": "Vicky Kaushal" }, { "name": "Phùng Húc Đông" }, { "name": "Trinh Kim Minh" }, { "name": "Vân Tường" }, { "name": "Cha Seung Won" }, { "name": "Ryoo Joon Yeol" }, { "name": "Jin Seo Yeon" }, { "name": "Chrissie Chau" }, { "name": "Francis Ng" }, { "name": "Sam Lee" }, { "name": "Roland Møller" }, { "name": "Robert Englund" }, { "name": "Emily Haine" }, { "name": "Grayson Gabriel" }, { "name": "Gabrielle Haugh" }, { "name": "Logan Creran" }, { "name": "Alessandro Nivola" }, { "name": "Điền Tráng Tráng" }, { "name": "Zheming Qu" }, { "name": "Wes Chatham" }, { "name": "Baylee Curran" }, { "name": "Trường Giang" }, { "name": "Thanh Thúy" }, { "name": "Đức Thịnh" }, { "name": "Mai Tài Phến" }, { "name": "Carmen Machi" }, { "name": "Adriana Ozores" }, { "name": "Aitana Sánchez Gijón" }, { "name": "Sophie Skelton" }, { "name": "Michael Rainey Jr." }, { "name": "Dwayne Cameron" }, { "name": "Weston Cage" }, { "name": "Andy Nyman" }, { "name": "Paul Whitehouse" }, { "name": "Lý Hân Trạch" }, { "name": "Phó Dương Dương" }, { "name": "Trương Duyệt Nam" }, { "name": "Michael Peña" }, { "name": "Mike Colter" }, { "name": "Emma Booth" }, { "name": "Tom Riley" }, { "name": "Ji Hyun Woo" }, { "name": "Lee Seung Wook" }, { "name": "Kim Hak Cheol" }, { "name": "Jim Gaffigan" }, { "name": "Eddie Marsan" }, { "name": "Lucy Hale" }, { "name": "Landon Liboiron" }, { "name": "Tyler Posey" }, { "name": "Violett Beane" }, { "name": "Sophia Ali" }, { "name": "Dean Norris" }, { "name": "Jaeden Lieberher" }, { "name": "Lee Pace" }, { "name": "Thích Lam Duẫn" }, { "name": "Rafe Spall" }, { "name": "Justice Smith" }, { "name": "NADIYA DOROFEEVA" }, { "name": "OLEKSIY ZAVHORODNIY" }, { "name": "YEVHEN MALUKHA" }, { "name": "SERHIY PRYTULA" }, { "name": "Bành Kính Từ" }, { "name": "Từ Nam" }, { "name": "Alex Essoe" }, { "name": "Perla Haney Jardine" }, { "name": "Dylan McTee" }, { "name": "Andrew Rothenberg" }, { "name": "Andy Garcia" }, { "name": "Grace Byers" }, { "name": "Vincent Spano" }, { "name": "Ana Ularu" }, { "name": "Boris Gulyarin" }, { "name": "Noriaki Sugiyama" }, { "name": "Noriko Shitaya" }, { "name": "Katee Sackhoff" }, { "name": "Julie Cox" }, { "name": "Steven Cree" }, { "name": "Ray Fearon" }, { "name": "Noush Skaugen" }, { "name": "Diane Kruger" }, { "name": "Numan Acar" }, { "name": "Denis Moschitto" }, { "name": "Ranveer Singh" }, { "name": "Deepika Padukone" }, { "name": "Shahid Kapoor" }, { "name": "Stephanie Pearson" }, { "name": "Kelly Connaire" }, { "name": "Rod Hernandez" }, { "name": "Im Si Wan" }, { "name": "Sol Kyung gu" }, { "name": "Ko Chang seok" }, { "name": "So Ji Sub" }, { "name": "Lee Joon Hyuk" }, { "name": "Son Yeo Eun" }, { "name": "Lee You Jin" }, { "name": "Kelly Asbury" }, { "name": "Mary J. Blige" }, { "name": "Chris Rock" }, { "name": "Rachel Dratch" }, { "name": "Allison Strong" }, { "name": "Roland Buck Iii" }, { "name": "Kim Hee Won" }, { "name": "Oh Ha Nee" }, { "name": "Lee Hak Joo" }, { "name": "Max Irons" }, { "name": "Mike Myers" }, { "name": "Katarina Cas" }, { "name": "Richard Ayoade" }, { "name": "Jim Sturgess" }, { "name": "Luke Evans" }, { "name": "Dominic Cooper" }, { "name": "Bradley Coope" }, { "name": "Caity Lotz" }, { "name": "Camilla Luddington" }, { "name": "Scott Michael Foster" }, { "name": "Anupam Kher" }, { "name": "Jae yeong Jeong" }, { "name": "Jo Jung suk" }, { "name": "Keri Russell" }, { "name": "lly" }, { "name": "Masahiro Higashide" }, { "name": "Ryusuke Ito" }, { "name": "Chris Sarandonndre the Giant" }, { "name": "Phim TV Show" }, { "name": "DMX" }, { "name": "Kelly Hu" }, { "name": "Anthony Anderson" }, { "name": "Matt Walsh" }, { "name": "Jake Johnson" }, { "name": "Damon Wayans Jr." }, { "name": "Bi Rain" }, { "name": "50 Cent" }, { "name": "Peter Stormare" }, { "name": "Danny Glover" }, { "name": "Jun Sang Yu" }, { "name": "Kim Basinger" }, { "name": "John Hurt" }, { "name": "Andy On" }, { "name": "Kate Hudson" }, { "name": "Tom Wilkinson" }, { "name": "Adam Levine" }, { "name": "Lorna Raver" }, { "name": "Philip Seymour Hoffman" }, { "name": "Richard Jenkins" }, { "name": "Antonio Banderas" }, { "name": "Birgitte Hjort Sørensen" }, { "name": "Dylan McDermott" }, { "name": "Zach Gilfor" }, { "name": "Eric Bana" }, { "name": "Édgar Ramírez" }, { "name": "Mi Yang" }, { "name": "Chao Liang" }, { "name": "Yan Liu" }, { "name": "Jacqueline Fernandez" }, { "name": "Nawazuddin Siddiqui" }, { "name": "Cameron Diaz" }, { "name": "Rob Corddry" }, { "name": "Trần Tĩnh" }, { "name": "Juno Temple" }, { "name": "Ye ri Han" }, { "name": "Man shik Jeong" }, { "name": "Beau Knapp" }, { "name": "Lương Triều Vỹ" }, { "name": "Truong Mạn Ngọc" }, { "name": "Zang Ziyi" }, { "name": "Phim Thần Thoại" }, { "name": "Bingbing Fan" }, { "name": "Xiaoming Huang" }, { "name": "Wenzhuo Zhao" }, { "name": "Yoo In Na" }, { "name": "Jin Lee Han" }, { "name": "Namgung Min" }, { "name": "Nicola Peltz" }, { "name": "Alex Fong Lik Sun" }, { "name": "Lam Suet" }, { "name": "Renata Tan" }, { "name": "Wayne Liu" }, { "name": "He Meitian" }, { "name": "Mike Dopud" }, { "name": "David Belle" }, { "name": "RZA" }, { "name": "Seth MacFarlane" }, { "name": "Đang Cập Nhật" }, { "name": "Viva Bianca" }, { "name": "Hanna Mangan Lawrence" }, { "name": "Aaron Taylor Johnson" }, { "name": "Elizabeth Olsen" }, { "name": "Watanabe Ken" }, { "name": "Juliette Binoche" }, { "name": "David Strathairn" }, { "name": "Sally Hawkins" }, { "name": "Cameron 'CJ' Adams" }, { "name": "Brian Markinson" }, { "name": "Richard T. Jones" }, { "name": "Hyuk Jang" }, { "name": "Andrew William Brand" }, { "name": "In Pyo Cha" }, { "name": "Drew Barrymore" }, { "name": "Scott Mechlowicz" }, { "name": "Alphonso McAuley" }, { "name": "Winter Ave Zoli" }, { "name": "Michael York" }, { "name": "Finn Jones" }, { "name": "Grace Van Dien" }, { "name": "Catherine Oxenberg" }, { "name": "Jung Joon Ho" }, { "name": "Song Yoon Ah" }, { "name": "Lea Michele" }, { "name": "Kelsey Grammer" }, { "name": "Dan Aykroyd" }, { "name": "Jason Wong" }, { "name": "Asen Asenov" }, { "name": "Daniel Coetzer" }, { "name": "Christian Slater" }, { "name": "Emily Tennant" }, { "name": "Mary Louise Parker" }, { "name": "Olivia Colman" }, { "name": "Ruth Wilson" }, { "name": "Richard Coyle" }, { "name": "Claire Foy" }, { "name": "Yasmine Al Masri" }, { "name": "Abhishek Bachchan" }, { "name": "Joey Lauren Adams" }, { "name": "Elizabeth Gillies" }, { "name": "Parker Young" }, { "name": "Emily Watson" }, { "name": "Winona Ryder" }, { "name": "Shin Hye Park" }, { "name": "Won sang Park" }, { "name": "Katie Crown" }, { "name": "Brian Doe" }, { "name": "Patrick Gilmore" }, { "name": "Michelle Chen" }, { "name": "Qing Ye" }, { "name": "Siu Lung Sik" }, { "name": "Sebastian Stan" }, { "name": "Andrew Garfield" }, { "name": "Emma Stone" }, { "name": "Jamie Foxx" }, { "name": "Natalie Portman" }, { "name": "Ty Burrell" }, { "name": "Max Charles" }, { "name": "Stephen Colbert" }, { "name": "Dada Chan" }, { "name": "Lương Vịnh Kì" }, { "name": "Arjun Kapoor" }, { "name": "Amrita Singh" }, { "name": "Huỳnh Tông Trạch – Trác Úc" }, { "name": "Hồ Định Hân – Phương Minh Du" }, { "name": "Randeep Hooda" }, { "name": "Durgesh Kumar" }, { "name": "Chung Tử Đan" }, { "name": "Châu Dương." }, { "name": "Christian Oliver" }, { "name": "Les Brandt" }, { "name": "Cary Hiroyuki Tagawa" }, { "name": "Terrence Howard" }, { "name": "Macon Blair" }, { "name": "Devin Ratray" }, { "name": "Amy Hargreaves" }, { "name": "Sinjai Plengpanit" }, { "name": "Supanart Jittaleela" }, { "name": "Ray MacDonald" }, { "name": "Elle FanningKyle Chandler" }, { "name": "Mitsuki Koga" }, { "name": "Yoshiyuki Yamaguchi" }, { "name": "Masanori Mimoto" }, { "name": "Eun kyung Shim" }, { "name": "Mun hee Na" }, { "name": "In hwan Park" }, { "name": "Dong il Song" }, { "name": "Hạ Vũ" }, { "name": "Dương Thái Ni" }, { "name": "Dư Nam" }, { "name": "Nghê Đại Hồng và Trương Lập" }, { "name": "John Hennigan" }, { "name": "Marcus Shirock" }, { "name": "James Woods" }, { "name": "Luci Christian" }, { "name": "David Matranga" }, { "name": "Elizabeth Bunch" }, { "name": "Jeremy McWilliams" }, { "name": "Lynsey Taylor Mackay" }, { "name": "Alexa Vega" }, { "name": "Beau Bridges" }, { "name": "Aidan Quinn" }, { "name": "Josh Henderson" }, { "name": "Sullivan Stapleton" }, { "name": "Roxanne McKee" }, { "name": "Michelle Fairley" }, { "name": "Danny Webb" }, { "name": "Uma Thurman" }, { "name": "David Carradine" }, { "name": "Michael Madsen" }, { "name": "John Jarratt" }, { "name": "Ryan Corr" }, { "name": "Shannon Ashlyn" }, { "name": "Mindy Robinson" }, { "name": "Freya Tingley" }, { "name": "Gaia Weiss" }, { "name": "Wanida Termthanaporn" }, { "name": "Kunatip PinPradub" }, { "name": "Puvadol Vechwongsa" }, { "name": "Kittipat Samarntragulchai" }, { "name": "Pongpitch Preechaborisuthikul" }, { "name": "Jemaine Clement" }, { "name": "Kristina Anapau" }, { "name": "James C. Burns" }, { "name": "Tina Casciani" }, { "name": "Uma ThurmanMichael Madsen" }, { "name": "Lucy Liu" }, { "name": "Vivica A Fox" }, { "name": "Samuel L Jackson" }, { "name": "Kuriyama Chiaki" }, { "name": "Bella Boyd" }, { "name": "Russell Crowe" }, { "name": "Jennifer Connelly" }, { "name": "Bak Ming Wong" }, { "name": "Eric Tsang" }, { "name": "Sandra Ng Kwan Yue" }, { "name": "Arifin Putra" }, { "name": "Michael Fassbender và Jamie Bell" }, { "name": "Kevin Spacey" }, { "name": "Goran Visnjic" }, { "name": "Terence Stamp" }, { "name": "Will Yun Lee" }, { "name": "Eliza Bennett" }, { "name": "Jane March" }, { "name": "Jamie Thomas King" }, { "name": "Gerard Butlerm" }, { "name": "Gloria Reuben" }, { "name": "Josh Hartnett" }, { "name": "Alexis Bledel" }, { "name": "Elizabeth Banks" }, { "name": "Gillian Jacobs" }, { "name": "Sarah Wright" }, { "name": "Ty Simpkins |" }, { "name": "Stella Maeve" }, { "name": "Alexander Nifong" }, { "name": "J. Mallory McCree" }, { "name": "Kris Holden Ried" }, { "name": "Emily Hampshire" }, { "name": "Claudia Bassols" }, { "name": "Catbus" }, { "name": "Satsuki Kusakabe" }, { "name": "Mei Kusakabe" }, { "name": "Noriko Hidaka" }, { "name": "Hitoshi Takagi" }, { "name": "Tanie Kitabayashi" }, { "name": "Tsuyoshi Kusanagi" }, { "name": "Yui Aragaki" }, { "name": "Takao Osawa" }, { "name": "Stellan Skarsgård" }, { "name": "Michael Dorman" }, { "name": "Aiysha Hart" }, { "name": "Paddy Considine" }, { "name": "Faraz Ayub" }, { "name": "Suthep Po ngam" }, { "name": "Theeradanai Suwannahom" }, { "name": "Shahkrit Yamnarm" }, { "name": "Ryosuke Yamada" }, { "name": "Hiroki Narimiya" }, { "name": "Kelvin Kwan" }, { "name": "Teddy Robin Kwan" }, { "name": "Diogo Morgado" }, { "name": "Amber Rose Revah" }, { "name": "Sebastian Knapp" }, { "name": "Bonnie Lee Bouman" }, { "name": "Dylan Edy" }, { "name": "Michael Everson" }, { "name": "Sunil Shetty" }, { "name": "Hồ Quan" }, { "name": "Yoo Gong" }, { "name": "Jae yun Jo" }, { "name": "Seong ha Jo" }, { "name": "Sonam Kapoor" }, { "name": "Pavan Malhotra" }, { "name": "Shengyi Huang" }, { "name": "Yu Kang" }, { "name": "Sharni Vinson" }, { "name": "Joe Swanberg" }, { "name": "AJ Bowen" }, { "name": "Spencer Locke" }, { "name": "Kenneth Branagh" }, { "name": "Eliza Taylor" }, { "name": "Bob Morley" }, { "name": "Lili Taylor" }, { "name": "Ashley Hinshaw" }, { "name": "Albert Dupontel" }, { "name": "Sandrine Kiberlain" }, { "name": "Nicolas Marié" }, { "name": "Connie Nielsen" }, { "name": "Chia Hui Liu" }, { "name": "Ammara Siripong" }, { "name": "Samuel L. JacksonJulia Margulies" }, { "name": "Paul Logan" }, { "name": "Ralitsa Paskaleva" }, { "name": "Borislav Iliev" }, { "name": "Gattlin Griffith" }, { "name": "Lucy Fry" }, { "name": "Danila Kozlovsky" }, { "name": "Pål Sverre Hagen" }, { "name": "Nicolai Cleve Broch" }, { "name": "Bjørn Sundquist" }, { "name": "Kathy Borland (english adaptation)" }, { "name": "Abraham Vurnbrand" }, { "name": "Rebecca Da Costa" }, { "name": "Crispin Glover" }, { "name": "Hannah Hoekstra" }, { "name": "Isis Cabolet" }, { "name": "Robert de Hoog" }, { "name": "Fumi Nikaidô" }, { "name": "Isao Natsuyagi" }, { "name": "Kim Kap Soo" }, { "name": "Lâm Y Thần" }, { "name": "Miyazaki Aoi" }, { "name": "Mukai Osamu" }, { "name": "Thích Hạng Vũ" }, { "name": "Trương Nhã Mai" }, { "name": "Joaquin Phoenix" }, { "name": "Michael Cera" }, { "name": "Tanya van Graan" }, { "name": "Cam Gigandet" }, { "name": "Thomas Gibson" }, { "name": "Toby Stephens" }, { "name": "Sam Hazeldine" }, { "name": "Kokone Hamada" }, { "name": "Aya Ueto" }, { "name": "Kayoko Kishimoto" }, { "name": "Tom Benedict Knight" }, { "name": "Simon Phillips" }, { "name": "Christina Bellavia" }, { "name": "Jin gu Yeo" }, { "name": "Mạc Văn Úy" }, { "name": "Kang ho Song" }, { "name": "Jung Jae Lee" }, { "name": "Yun shik Baek" }, { "name": "Richard E. Grant" }, { "name": "Demian Bichir" }, { "name": "Seishirô Katô" }, { "name": "Roi Hayashi" }, { "name": "Roy Hayashi" }, { "name": "Craig T. Nelson" }, { "name": "Holly Hunter" }, { "name": "Mi seon Jeon" }, { "name": "Jung Hee Moon" }, { "name": "Hyeon ju Son" }, { "name": "Duncan Casey" }, { "name": "Lee Charles" }, { "name": "Greg Pearson" }, { "name": "Mark Webber" }, { "name": "Devon Graye" }, { "name": "T.O.P" }, { "name": "Seung Hyun Choi" }, { "name": "An Duyệt Khê" }, { "name": "Đổng Tử Kiện" }, { "name": "Nadech Kugimiya" }, { "name": "Kobori" }, { "name": "Arewadee Decubes" }, { "name": "Angsumalin" }, { "name": "Tilda Swinton" }, { "name": "Quách Thái Khiết" }, { "name": "Phòng Tổ Danh" }, { "name": "Ben Diskin" }, { "name": "Kate Higgins" }, { "name": "Lindsay Torrance" }, { "name": "Jason Dohring" }, { "name": "Enrico Colantoni" }, { "name": "Andrew Divoff" }, { "name": "Dominic Purcell" }, { "name": "Adam Beach" }, { "name": "Michael Ironside" }, { "name": "Mae Whitman" }, { "name": "Brendan Fraser" }, { "name": "Kohtee Aramboy" }, { "name": "Sudarat Butrprom" }, { "name": "Kom Chauncheun" }, { "name": "Hoàng Dụ Tường" }, { "name": "Trương Dung Dung" }, { "name": "Jennifer Carpenter" }, { "name": "Brian Bloom" }, { "name": "John Eric Bentley" }, { "name": "Annie Rose Buckley" }, { "name": "Tae seong Jang" }, { "name": "Sang wook Joo" }, { "name": "Dae Hyeon" }, { "name": "Dane DeHaan" }, { "name": "Michael C. Hall" }, { "name": "Charlie Rowe" }, { "name": "Angourie Rice" }, { "name": "Diệp Sơn Hào" }, { "name": "Diêu Thần" }, { "name": "Lã Lương Vỹ" }, { "name": "Lâm Gia Đốn" }, { "name": "Y Tử Duy" }, { "name": "Cuba Gooding Jr." }, { "name": "Dennis Haysbert" }, { "name": "LisaGay Hamilton" }, { "name": "Sean Astin" }, { "name": "Currie Graham" }, { "name": "Ryan Donowho |" }, { "name": "James D'Arcy" }, { "name": "Sophie Lowe" }, { "name": "Daryl Sabara" }, { "name": "Hae suk Kim" }, { "name": "Sang ho Kim" }, { "name": "Mi ran Ra" }, { "name": "Iain De Caestecker" }, { "name": "Alice Englert" }, { "name": "Allen Leech" }, { "name": "Benedict Lim" }, { "name": "Danil Ishutin" }, { "name": "Clinton Loomis" }, { "name": "Matthew Lillard" }, { "name": "John DiMaggio" }, { "name": "Grey DeLisle" }, { "name": "Kim Choong ryeol" }, { "name": "Lee Gyoo bok" }, { "name": "Carice van Houten" }, { "name": "Diedrich Bader" }, { "name": "Laura Bailey" }, { "name": "Dante Basco" }, { "name": "Cao Hổ" }, { "name": "Đỗ Vấn Trạch" }, { "name": "Brandon Anthony" }, { "name": "Carson Holden" }, { "name": "D'Angelo Midili" }, { "name": "Torsten Voges" }, { "name": "Jonathan Banks" }, { "name": "Bryan Larkin" }, { "name": "Iván Kamarás" }, { "name": "Michael McKell" }, { "name": "Yû Aoi" }, { "name": "Ayano Fukuda" }, { "name": "Arata Furuta" }, { "name": "Quan Sở Huy" }, { "name": "La Lực Uy" }, { "name": "LiênThi Nhã" }, { "name": "Adam Brody" }, { "name": "Rob Huebel" }, { "name": "James Cosmo" }, { "name": "Michael Culkin" }, { "name": "Ross Nathan" }, { "name": "Sam Pancake" }, { "name": "Ben Begley" }, { "name": "Herbert Russell" }, { "name": "Bruce Dern" }, { "name": "Will Forte" }, { "name": "June Squibb" }, { "name": "Piolo Pascual" }, { "name": "Gerald Anderson" }, { "name": "Joel Torre" }, { "name": "Châu Kiệt Luân" }, { "name": "Alan Ko" }, { "name": "Châu Tú Na" }, { "name": "Dada Lo" }, { "name": "Hidy Yu" }, { "name": "Zach Callison" }, { "name": "Jon Daly" }, { "name": "Melonie Diaz" }, { "name": "Kyle Chandle" }, { "name": "Jeremy Ray Valdez" }, { "name": "Walter Perez" }, { "name": "Fernanda Romero" }, { "name": "Yuliya Snigir" }, { "name": "Lee Min Ho" }, { "name": "Choi Jin Hyuk" }, { "name": "Kim Sung Ryung" }, { "name": "Kim Woo Bin" }, { "name": "Kim Ji Won" }, { "name": "Yoon Son Ha" }, { "name": "Choi Woon Young" }, { "name": "Kang Ha Neul" }, { "name": "Park Hyung Shik" }, { "name": "Im Joo Eun" }, { "name": "Nawat Kulratanarat" }, { "name": "Rhatha Pho ngam" }, { "name": "Wiraporn Jiravechsoontornkul" }, { "name": "Anon Saisangcharn" }, { "name": "Duek mun Choi" }, { "name": "Jin ho Choi" }, { "name": "Trương Tử Lâm" }, { "name": "Lương Vịnh Kỳ" }, { "name": "Emile Hirsch" }, { "name": "Lý Tâm Khiết" }, { "name": "Joseph Morgan" }, { "name": "Thomas Kretschmann" }, { "name": "Alexandra Lesch" }, { "name": "Kristiana Rohder" }, { "name": "Lara Baum" }, { "name": "Robert Redford" }, { "name": "Clare Kramer" }, { "name": "Lin Shaye" }, { "name": "Greg Grunberg" }, { "name": "Ray Wise" }, { "name": "Quan Chi Lâm" }, { "name": "Triêu Vy" }, { "name": "William Chan" }, { "name": "Christine Kuo" }, { "name": "Michelle Wai" }, { "name": "Terence Chui" }, { "name": "Oscar Leung" }, { "name": "Alien Sun" }, { "name": "Yanina Studilina" }, { "name": "Philippe Reinhardt" }, { "name": "Maaya Sakamoto" }, { "name": "Vithaya Pansringarm" }, { "name": "Vilde Zeiner" }, { "name": "Agnes Kittelsen" }, { "name": "Orlando Jones" }, { "name": "Tom Everett Scott" }, { "name": "Amy Seimetz" }, { "name": "Frank Mosley" }, { "name": "Shane Carruth" }, { "name": "Nanako Matsushima" }, { "name": "Takao Ohsawa" }, { "name": "Gorô Kishitani" }, { "name": "Kyra Sedgwick" }, { "name": "Madison Pettis" }, { "name": "Roselyn Sanchez" }, { "name": "Sylvia Hoeks" }, { "name": "Maiara Walsh" }, { "name": "Brant Daugherty" }, { "name": "Cody Christian" }, { "name": "Bongkoj Khongmalai" }, { "name": "Rit Luecha" }, { "name": "Chalad Na Songkhla" }, { "name": "Kevin McKidd" }, { "name": "Genesis Rodriguez" }, { "name": "Nick Gomez" }, { "name": "Judd Lormand" }, { "name": "Paula Patton" }, { "name": "Tim Allen" }, { "name": "Joan Cusack" }, { "name": "Tom Welling" }, { "name": "Lâm Phong" }, { "name": "Từ Tử San" }, { "name": "Thịnh Quân" }, { "name": "Kyung gu Sol" }, { "name": "So ri Moon" }, { "name": "Daniel Henney" }, { "name": "Ranbir Kapoor" }, { "name": "Madhuri Dixit" }, { "name": "Ashley Sommers" }, { "name": "Carlos Alazraqui" }, { "name": "Dane Cook" }, { "name": "Stacy Keach" }, { "name": "Michelle Pfeiffer" }, { "name": "Dianna Agron" }, { "name": "Matthew Marsden" }, { "name": "Kristanna Loken" }, { "name": "Christian Pitre" }, { "name": "Weerachai Hattagowit" }, { "name": "Sharon Hinnendael" }, { "name": "Kaniehtiio Horn" }, { "name": "C.C. Sheffield" }, { "name": "Kelly Preston" }, { "name": "Danielle Panabaker" }, { "name": "Lily Collins" }, { "name": "Jamie Campbell Bower và Robert Sheehan" }, { "name": "Chương Hàm Du" }, { "name": "Traylor Howard" }, { "name": "Alan Cumming" }, { "name": "Al Pacino Cosgrove" }, { "name": "Will Payne" }, { "name": "Jaime Murray" }, { "name": "Sean Power" }, { "name": "Gianni Capaldi" }, { "name": "Bruce Greenwood" }, { "name": "Parker Posey" }, { "name": "Callum Blue" }, { "name": "Anthony Michael Hall" }, { "name": "Maxim Roy" }, { "name": "Ted Whittall" }, { "name": "Allison Janney" }, { "name": "Frank Welker" }, { "name": "Mindy Cohn" }, { "name": "Nick Robinson" }, { "name": "Gabriel Basso" }, { "name": "Moises Arias" }, { "name": "Jonah Bobo" }, { "name": "Haley Ramm" }, { "name": "Martin Copping" }, { "name": "Clare Niederpruem" }, { "name": "Woong in Jung" }, { "name": "Hwang Jung Min" }, { "name": "Yo won Lee" }, { "name": "Jun Sang Yoo" }, { "name": "Jemma Dallender" }, { "name": "Joe Absolom" }, { "name": "Yavor Baharov" }, { "name": "Aleksandar Aleksiev" }, { "name": "Mary Stockley" }, { "name": "Ted Levine" }, { "name": "Joe Anderson" }, { "name": "Kevin Zegers" }, { "name": "Laurence Fishburne" }, { "name": "Marrese Crump" }, { "name": "JeeJa Yanin" }, { "name": "Christopher Mintz Plasse" }, { "name": "Jiao Xu" }, { "name": "Hee won Kim" }, { "name": "John Ratzenberger" }, { "name": "Michael Teigen" }, { "name": "Jason Earles" }, { "name": "Karel Roden" }, { "name": "Joshua Sasse" }, { "name": "Robert Gwilym" }, { "name": "Carrie Anne Moss" }, { "name": "Kevin Dillon" }, { "name": "Brandon T. Jackson" }, { "name": "Claudio Santamaria" }, { "name": "Jennifer Ulrich" }, { "name": "Elio Germano" }, { "name": "Eriko Hatsune" }, { "name": "Fernando Alves Pinto" }, { "name": "Alessandra Negrini" }, { "name": "Caco Ciocler" }, { "name": "Megumi Oohara" }, { "name": "Hyo ju Han" }, { "name": "Woo sung Jung" }, { "name": "Paul Giamatti" }, { "name": "Maya Rudolph" }, { "name": "Max Burkholder" }, { "name": "Sienna Guillory" }, { "name": "Clive Russell" }, { "name": "Rebecca Ferdinando" }, { "name": "Mingus Johnston" }, { "name": "Katherine Heigl" }, { "name": "Diane Keaton" }, { "name": "Helen Mirren" }, { "name": "Byung hun Lee" }, { "name": "Demian Bichi" }, { "name": "Patitta Attayatamavitaya" }, { "name": "Supachai Girdsuwan" }, { "name": "Setsit Limkasitdej" }, { "name": "Caleb Landry" }, { "name": "Kevin Bacon" }, { "name": "Hyeon woo Kim" }, { "name": "Hae hyo Kwon" }, { "name": "Si young Lee" }, { "name": "Gon" }, { "name": "Killua and Leorio" }, { "name": "Veronica Diaz Carranza" }, { "name": "Melissa Cordero" }, { "name": "Q'orianka Kilcher" }, { "name": "Lindsay Lohan" }, { "name": "James Deen" }, { "name": "Nolan Gerard Funk" }, { "name": "Michael Clarke Duncan" }, { "name": "Luke Treadaway" }, { "name": "Emily Atack" }, { "name": "Craig Fairbrass" }, { "name": "Simon Rex" }, { "name": "Charlie Sheen" }, { "name": "Jacob Lofland" }, { "name": "Wesley Snipes" }, { "name": "Kevin Howarth" }, { "name": "Joo hyun Jo" }, { "name": "Se hong Jeon" }, { "name": "Gwang il Lee" }, { "name": "Matt Doran" }, { "name": "David Field" }, { "name": "Jin mo Ju" }, { "name": "So yeon Kim" }, { "name": "Hee soon Park" }, { "name": "Shin Ha Kyun" }, { "name": "Jo Eun Ji" }, { "name": "Oh Jung Se" }, { "name": "Helene Bergsholm" }, { "name": "Malin Bjørhovde" }, { "name": "Henriette Steenstrup" }, { "name": "David Chokachi" }, { "name": "Tia Carrere" }, { "name": "Meghan McLeod" }, { "name": "Ryan Goslingm" }, { "name": "Kim Seul gi I" }, { "name": "Ko Kyeong pyo" }, { "name": "Lee Se yeong" }, { "name": "Lee Soo hyeok" }, { "name": "Park Seong woong" }, { "name": "Seong Joon" }, { "name": "Bemin Epps" }, { "name": "Justin Chambers" }, { "name": "C. Thomas Howell" }, { "name": "Lauren Ashley Carter" }, { "name": "Kaitlin Cullum" }, { "name": "Miracle Laurie" }, { "name": "Krisada Sukosol Clapp" }, { "name": "Somchai Kemglad" }, { "name": "Sakarin Suthamsamai" }, { "name": "BiaSean Brosnan" }, { "name": "Van Dammep" }, { "name": "Tom Wilson" }, { "name": "Garrison Keillor" }, { "name": "Trịnh Tú Văn" }, { "name": "Kuralay AnarbekovaAliya Telebarisova" }, { "name": "Nathalie Emmanuel" }, { "name": "Milo Ventimiglia" }, { "name": "Say Gupta" }, { "name": "Stephen Moyer" }, { "name": "Mia Kirshner" }, { "name": "Allie MacDonald" }, { "name": "Chadwick Boseman" }, { "name": "Nicole Beharie" }, { "name": "Ryusei Nakao" }, { "name": "Byron J. BrochmanPauline Egan" }, { "name": "Jeronimo Garcia" }, { "name": "Victor Golez" }, { "name": "Katharine Isabellen Fehr" }, { "name": "Nicola Posener" }, { "name": "Vidal Sancho" }, { "name": "David Haydn" }, { "name": "Kippei Shîna" }, { "name": "Duy Ni" }, { "name": "Matilda Anna Ingrid Lutz" }, { "name": "Kevin Janssens" }, { "name": "Vincent Colombe" }, { "name": "Michael Beach" }, { "name": "Danielle Savre" }, { "name": "Rob Mayes" }, { "name": "Sung Hoon" }, { "name": "Jo Han Sun" }, { "name": "Lee Kyoung Young" }, { "name": "Jeon Kwang Leol" }, { "name": "Kim Moo Yul" }, { "name": "Lim Won Hee" }, { "name": "Jasmine Waltz" }, { "name": "Park Ji Hyun" }, { "name": "Park Sung Hoon" }, { "name": "Wi Ha Joon" }, { "name": "Oh Ah Yeon" }, { "name": "Moon Ye Won" }, { "name": "Yoo Je Yoon" }, { "name": "Oprah Winfrey" }, { "name": "Mindy Kaling" }, { "name": "Jacqueline Bisset" }, { "name": "Belçim Bilgin" }, { "name": "Rachel Wilson" }, { "name": "Anushka Sharma" }, { "name": "Parambrata Chatterjee" }, { "name": "Rajat Kapoor" }, { "name": "Ritabhari Chakraborty" }, { "name": "Alex Roe" }, { "name": "Abby Ryder Fortson" }, { "name": "Travis Tritt" }, { "name": "Peter Cambor" }, { "name": "Bailee Madison" }, { "name": "Lewis Pullman" }, { "name": "Emma Bellomy" }, { "name": "Damian Maffei" }, { "name": "Trương Ngải Gia" }, { "name": "Karl Maka" }, { "name": "Sam Hui (Hứa Quán Kiệt)" }, { "name": "Emily Ratajkowski" }, { "name": "Anthony Hayes" }, { "name": "Susie Porter" }, { "name": "Tak Sakaguchi" }, { "name": "Yura Kondo" }, { "name": "Takumi Saitoh" }, { "name": "Vincent D'Onofrio" }, { "name": "Elisabeth Shue" }, { "name": "Camila Morrone" }, { "name": "Robert Downey Jr" }, { "name": "Ryoo Seung Ryong" }, { "name": "Ko Gyung Pyo" }, { "name": "Song Sae Byeok" }, { "name": "Billy Magnussen" }, { "name": "Scott Shepherd" }, { "name": "Ava Cooper" }, { "name": "Stella Cooper" }, { "name": "David Midthunder" }, { "name": "Nhạc Vân Bằng" }, { "name": "Jeremy Strong" }, { "name": "Dominic Power" }, { "name": "Aaron McCusker" }, { "name": "Alaa Safi" }, { "name": "Arkie Reece" }, { "name": "Gou Ayano" }, { "name": "Yuu Shirota" }, { "name": "Tetsuji Tamayama" }, { "name": "Yudai Chiba" }, { "name": "Takeru Satoh" }, { "name": "Rina Kawaei" }, { "name": "Zaira Wasim" }, { "name": "Meher Vij" }, { "name": "Raj Arjun" }, { "name": "Billy Brown" }, { "name": "Vanessa Williams" }, { "name": "Seung ryong Ryu" }, { "name": "Jung min Park" }, { "name": "Finn Scicluna O'Prey" }, { "name": "Emm Wiseman" }, { "name": "Jamie Lee Money" }, { "name": "Kim Kang Woo" }, { "name": "Jo Jae Hyun" }, { "name": "Park Shi Yeon" }, { "name": "Lee Won Jong" }, { "name": "Jang Hye Jin" }, { "name": "Afiya Bennett" }, { "name": "Morgan Allen" }, { "name": "Jeffrey Men" }, { "name": "James Tam" }, { "name": "Fayssal Bazzi" }, { "name": "Colin Moody" }, { "name": "Lý Tuấn Vĩ" }, { "name": "Triệu Tân" }, { "name": "Triệu Văn Kỳ" }, { "name": "Han Ji An" }, { "name": "Lee Ji Hoon" }, { "name": "Seo Hyun Woo" }, { "name": "Eloise Mumford" }, { "name": "Eric Johnson" }, { "name": "Rita Ora" }, { "name": "Diêm Lộc Dương" }, { "name": "Lý Quả" }, { "name": "Trang Sâm" }, { "name": "Jung Ryeo Won" }, { "name": "Lee Moon Sik" }, { "name": "Im Chang Jung" }, { "name": "Kim Do Hoon" }, { "name": "Alexis Knapp" }, { "name": "Kai Wang" }, { "name": "Darren Wang" }, { "name": "So Jin Sub" }, { "name": "Noah Jupe" }, { "name": "Park Ki woong" }, { "name": "Park Hae Jin" }, { "name": "Oh Yeon Seo" }, { "name": "Yu In Young" }, { "name": "Sandara Park" }, { "name": "Oh Jong Hyuk" }, { "name": "Moon Ji Yoon" }, { "name": "Kim Hyun Jin" }, { "name": "Rie Kugimiya" }, { "name": "Wataru Takagi" }, { "name": "O'Shea Jackson Jr." }, { "name": "Alexander Siddig" }, { "name": "Jannik Schümann" }, { "name": "Reda Kateb" }, { "name": "Cole Hauser" }, { "name": "Shawn Ashmore" }, { "name": "Trần Dịch Tấn" }, { "name": "Lý Nhất Đồng" }, { "name": "Lý Vinh Hạo" }, { "name": "Maggie Grace" }, { "name": "Toby Kebbell" }, { "name": "Ben Cross" }, { "name": "Kiele Sanchez" }, { "name": "Darby Camp" }, { "name": "Gralen Bryant Banks" }, { "name": "Will Rothhaar" }, { "name": "Hugh Grant" }, { "name": "Ben Whishaw" }, { "name": "Michael Gambon" }, { "name": "Olivia Chenery" }, { "name": "Ruby Bustamante" }, { "name": "Jason Maza" }, { "name": "David Gyasi" }, { "name": "Sonoya Mizuno" }, { "name": "John Schwab" }, { "name": "Charlie Day" }, { "name": "Tian Jing" }, { "name": "Levi Meaden" }, { "name": "Kim Eui sung" }, { "name": "Jung woo Sung" }, { "name": "kwak do won" }, { "name": "Park Eun Hye" }, { "name": "Ahn Mi Na" }, { "name": "Trần Hạo Dân" }, { "name": "Lâm Tử Thông" }, { "name": "Phạm Mộng" }, { "name": "Elsa Pataky" }, { "name": "Taylor Sheridan" }, { "name": "Thich Nhát Hanh" }, { "name": "Brother Pháp De" }, { "name": "Lee Min Ki" }, { "name": "Oh Dal su" }, { "name": "Kim Bum" }, { "name": "Kim Jung Hwa" }, { "name": "Hong Chau" }, { "name": "Rolf Lassgård" }, { "name": "Gabriel Byrne" }, { "name": "Mark Addy" }, { "name": "Sibylla Deen" }, { "name": "Lupita Nyong'o" }, { "name": "Daniel Kaluuya" }, { "name": "Angela Bassett" }, { "name": "Danai Gurira" }, { "name": "Giancarlo Esposito" }, { "name": "Ki Hong Lee" }, { "name": "Katherine McNamara" }, { "name": "Barry Pepper" }, { "name": "Lý Tương" }, { "name": "Phan Nguyễn" }, { "name": "Lý Tử" }, { "name": "Bill Milner" }, { "name": "David Bradley" }, { "name": "Charlotte Vega" }, { "name": "Eugene Simon" }, { "name": "Leigh Whannell" }, { "name": "Vương Thụy Xương" }, { "name": "Vu Nghị" }, { "name": "Hà Hoa" }, { "name": "Dong xue Li" }, { "name": "Janicke Askevold" }, { "name": "Eriq Ebouaney" }, { "name": "Triệu Đông Trạch" }, { "name": "Ngưu Hiểu Lâm" }, { "name": "Trương Dương" }, { "name": "Dominic West" }, { "name": "Kristin Scott Thomas" }, { "name": "Hannah John Kamen" }, { "name": "Satomi Ishihara" }, { "name": "Satoshi Ohno" }, { "name": "Yuri Chinen" }, { "name": "Trùng Thiệu Phong" }, { "name": "Sophon Sakdaphisit" }, { "name": "Numthip Jongrachatawiboon" }, { "name": "Apichaya Thongkham" }, { "name": "Panisara Rikulsurakan" }, { "name": "Huy Xán" }, { "name": "Hà Ất Hiên" }, { "name": "Lưu Hán Triệu" }, { "name": "Alex Pettyfer" }, { "name": "Emily Althaus" }, { "name": "Gene Jones" }, { "name": "Lý Băng Băng" }, { "name": "Yasmin Kassim" }, { "name": "Leslie Bibb" }, { "name": "Stephen McHattie" }, { "name": "Nicholas Campbell" }, { "name": "Matt Craven" }, { "name": "Vicky Krieps" }, { "name": "Lesley Manville" }, { "name": "Daniel Day Lewis" }, { "name": "Sophie Cookson" }, { "name": "Corneliu Ulici" }, { "name": "Ada Lupu" }, { "name": "Catalin Babliuc" }, { "name": "Arsher Ali" }, { "name": "Robert James Collier" }, { "name": "La Trọng Khiêm" }, { "name": "Triệu Lệ Dĩnh" }, { "name": "Jeff Fahey" }, { "name": "Marc McKevitt Ewins" }, { "name": "Olatunde Osunmi" }, { "name": "Cas APaul Birchardtelli" }, { "name": "Mario MaurerJoross Gamboa" }, { "name": "Zhao Yihuan" }, { "name": "Chaney Qiu" }, { "name": "Wen Zhuo" }, { "name": "Liu Huipu" }, { "name": "Vency Wen" }, { "name": "Billy Crystal" }, { "name": "Casper Van Dien" }, { "name": "Sarah Lieving" }, { "name": "Aditya Roy Kapoor" }, { "name": "Shaad Randhawa" }, { "name": "Carsten BjørnlundMarina Bouras" }, { "name": "Barry Sloane" }, { "name": "Shiloh Fernandez" }, { "name": "Jessica Lucas" }, { "name": "Lou Taylor Pucci" }, { "name": "Đông Phi" }, { "name": "Hà Văn Phi" }, { "name": "Lương Liệt Duy" }, { "name": "Thẩm Chấn Thiên" }, { "name": "Nattapong Chartpong" }, { "name": "Sean Elliot" }, { "name": "Rose Sirna" }, { "name": "Puttipong Pormsaka Na SakoWasin Pokpong" }, { "name": "Jane Lynch" }, { "name": "Pamela Adlon" }, { "name": "Senem Temiz" }, { "name": "Vicky McClure" }, { "name": "Gemma ArtertonJustin Timberlake" }, { "name": "Văn Chương" }, { "name": "Lưu Thi Thi" }, { "name": "Trần Nghiên Hy" }, { "name": "Angel LocsiDingdong Dantes" }, { "name": "Spike Jonze" }, { "name": "José Garcia" }, { "name": "Michaël Youn" }, { "name": "Isabelle Funaro" }, { "name": "Daniella Kertesz" }, { "name": "Gareth John Bale" }, { "name": "Ian Dicks" }, { "name": "Nick Renaud" }, { "name": "Henry Monfries" }, { "name": "Gemmenne de la Peña" }, { "name": "Karoline Herfurth" }, { "name": "Harriet MacMasters Green" }, { "name": "Sabrina Jolie Perez" }, { "name": "Jarreth J. Merz" }, { "name": "Cherrie Ying" }, { "name": "Zhang Duo" }, { "name": "Wang Zizi" }, { "name": "Shôta Matsuda" }, { "name": "Nozomi Sasaki" }, { "name": "Sei Ando" }, { "name": "Julie Delpy" }, { "name": "Seamus Davey Fitzpatrick" }, { "name": "Ashley Scott" }, { "name": "Bailey Chas" }, { "name": "Danica McKellar" }, { "name": "Kenneth Mitchell" }, { "name": "AKen Jeong" }, { "name": "Emmanuelle Vaugier" }, { "name": "Evert McQueen" }, { "name": "Kenny Kwann Zhang" }, { "name": "Jason Griffith" }, { "name": "Rica Matsumoto" }, { "name": "Đồng Đại Vy" }, { "name": "Tư Cầm Cao Oa" }, { "name": "Kelsy AbbottFachry Albar" }, { "name": "Adrián Suar" }, { "name": "Carla Peterson" }, { "name": "Julieta Díaz" }, { "name": "Maria Ehrich" }, { "name": "Jannis Niewöhner" }, { "name": "Daniel Giménez Cacho" }, { "name": "Ebon Moss Bachrach" }, { "name": "Vinessa Shaw" }, { "name": "Huỳnh Nhật Hoa" }, { "name": "Lữ Lương Vỹ" }, { "name": "Mạc Thiếu Thông" }, { "name": "Anne Curtisnn" }, { "name": "Adelaide Clemens" }, { "name": "Derek Magyar" }, { "name": "Jaideep Ahlawat" }, { "name": "Dimple Bagrey" }, { "name": "Sukhwinder Chahal" }, { "name": "Kan Iyer" }, { "name": "David Duchovny" }, { "name": "Joe Estevez" }, { "name": "Dan Haggerty" }, { "name": "Thomas Downey" }, { "name": "Danielle Harris" }, { "name": "Zach Galligan" }, { "name": "Elisabeth Harnois" }, { "name": "Val Kilmer" }, { "name": "Diora Baird" }, { "name": "Michelle Trachtenberg" }, { "name": "Mason Cook" }, { "name": "Ileana" }, { "name": "Rajendraprasad" }, { "name": "Steve Bacic" }, { "name": "Christian SlaterAmy Matysio" }, { "name": "Tomoyuki Morikawa" }, { "name": "Chie Nakamura" }, { "name": "Junko Takeuchi" }, { "name": "Ratklao Amaradit" }, { "name": "Savika Chaiyadej" }, { "name": "Eva Mendes" }, { "name": "Anthony Pizza" }, { "name": "Graham Phillips" }, { "name": "Jaden Smith" }, { "name": "Takayuki Yamada" }, { "name": "Ruth Sundell" }, { "name": "Daniel Genalo" }, { "name": "Ivan Trojan" }, { "name": "Sebastian Koch" }, { "name": "Sona Norisová" }, { "name": "Wei LeeQuan Ren" }, { "name": "Quách Kinh Phi" }, { "name": "Tề Khê" }, { "name": "Toda Erika" }, { "name": "Kase Ryo" }, { "name": "Yahya Gaier" }, { "name": "Mimoun Ouled Radi" }, { "name": "Sergio Hasselbaink" }, { "name": "Marty Adams" }, { "name": "Shaun Benson" }, { "name": "Meghan Heffern" }, { "name": "Zach Galifianakis" }, { "name": "Trịnh Thiếu Thu" }, { "name": "Phó Tân Bác" }, { "name": "Huỳnh Tông Trạch" }, { "name": "Đạng Lệ Hân" }, { "name": "Jason Momo" }, { "name": "Ye Liu" }, { "name": "Hanyu Zhang" }, { "name": "Bo Huang" }, { "name": "Chie Tanaka" }, { "name": "Katie Aselton" }, { "name": "Penelope Ann Miller" }, { "name": "David Eigenberg" }, { "name": "Kenneth Adams" }, { "name": "Joshua Michael Allen" }, { "name": "Sada Alpat" }, { "name": "Cindy Busby" }, { "name": "Raj Babbar" }, { "name": "Mahie Gill" }, { "name": "Mugdha Godse" }, { "name": "Beyoncé Knowles" }, { "name": "Dương Thừa Lâm" }, { "name": "Luke Kirby" }, { "name": "Ruth Negga" }, { "name": "Peter Falk" }, { "name": "Wai Man Chan" }, { "name": "Patrick Tam" }, { "name": "Kwok Cheung Tsang" }, { "name": "Christopher Lloyd" }, { "name": "Martha MacIsaac" }, { "name": "Tôn Hồng Lôi" }, { "name": "Huỳnh Dịch" }, { "name": "Tia Bajpai" }, { "name": "Vidya Malvade" }, { "name": "Aftab Shivdasan" }, { "name": "Jira Maligool" }, { "name": "rapper Ludacris" }, { "name": "Kamal Hassan" }, { "name": "Rahul Bose" }, { "name": "Pooja Kumar" }, { "name": "Vương Tử Văn" }, { "name": "Sergey Puskepalis" }, { "name": "Anatoliy Belyy" }, { "name": "Svetlana Khodchenkova" }, { "name": "Hyeon sang Kwon" }, { "name": "Bo ra Nam" }, { "name": "Yoo Oh Seong" }, { "name": "Yoo Seon" }, { "name": "Nicolás Martínez" }, { "name": "Eli Roth" }, { "name": "Spencer Treat Clark" }, { "name": "Nick Eversman" }, { "name": "Alan Drake" }, { "name": "Kiran Shah" }, { "name": "Sheri Moon Zombie" }, { "name": "Bruce Davison" }, { "name": "Jeff Daniel Phillips" }, { "name": "Tómas Lemarquis" }, { "name": "MohaHarsh Chhaya" }, { "name": "Vibha Chhibber" }, { "name": "Jon Bernthal" }, { "name": "Susan Sarandon" }, { "name": "Paresh Rawal" }, { "name": "Rajeev Khandelwal" }, { "name": "Tena Desae" }, { "name": "Dakota Fanning" }, { "name": "Amrita Puri" }, { "name": "Sushant Singh Rajput" }, { "name": "Amit Sadh" }, { "name": "Christopher Walken Kilcher" }, { "name": "John Henshaw" }, { "name": "Gary Maitland" }, { "name": "Chapman To" }, { "name": "Simon Lui" }, { "name": "Shiou Yun Chang" }, { "name": "Akira Chen" }, { "name": "Lawrence Ko" }, { "name": "Shahid KapoorPrachi Desai" }, { "name": "Eileen Davies" }, { "name": "Steve Oram" }, { "name": "BreRob Corddry" }, { "name": "Richard Gere" }, { "name": "Anthony LaPaglia" }, { "name": "Chris Colfer" }, { "name": "Luca Argentero" }, { "name": "Laura Chiatti" }, { "name": "Julianne Hough" }, { "name": "Imran KhaPaj Kapur" }, { "name": "Caleb Landry Jones" }, { "name": "Lisa Berry" }, { "name": "Samantha Mathis" }, { "name": "Jason Beghe" }, { "name": "Esai Morales" }, { "name": "Erin Karpluk" }, { "name": "Edward Furlong" }, { "name": "Mitsu Dakihiro Mayama" }, { "name": "Takuma Hiraoka" }, { "name": "Brittany Snow" }, { "name": "Jeffrey Combs" }, { "name": "Jonny Coyne" }, { "name": "Bill Murra" }, { "name": "Muku Michael Dewil" }, { "name": "Alex Carter" }, { "name": "Monica Keena" }, { "name": "Alex Arleo" }, { "name": "Mao Thuấn Quân" }, { "name": "Alex Hafnerntonio de la Torre" }, { "name": "Brian Geraghty" }, { "name": "Catherine Keener" }, { "name": "Christopher Stadulis" }, { "name": "Stephen Dorff" }, { "name": "JR Bourne" }, { "name": "Bernard Alane" }, { "name": "Isabelle Spade" }, { "name": "Kacey Mottet Klein" }, { "name": "Ario Bayundre" }, { "name": "Janice Man" }, { "name": "Bill Pullman" }, { "name": "Chang Jung Lim" }, { "name": "Ji won Ha" }, { "name": "Seong guk Choi" }, { "name": "Prabhu Deva" }, { "name": "Ganesh Acharya" }, { "name": "Kay Kay Menon" }, { "name": "Ajith Kumar" }, { "name": "Parvathy Omanakuttan" }, { "name": "Bruna Abdullah" }, { "name": "Hae il Park" }, { "name": "Kim Go Eun" }, { "name": "Harish Shar" }, { "name": "Belén Rueda" }, { "name": "Hugo Silva" }, { "name": "Tom Frederic" }, { "name": "Gil Kolirin" }, { "name": "Christian Contreras" }, { "name": "America Olivo" }, { "name": "Nora Arnezeder" }, { "name": "Kelly Carlson" }, { "name": "Robert Patrick" }, { "name": "David Lyons" }, { "name": "Sra Noithai" }, { "name": "Matt Bellefleur" }, { "name": "George Canyon" }, { "name": "Gabriel Carter" }, { "name": "Marianne Farley" }, { "name": "Quinn Lord" }, { "name": "Francis X. McCarthy" }, { "name": "Phương Lực Thân" }, { "name": "Lưu Vũ Kỳ" }, { "name": "Sara Loren" }, { "name": "Lee Bum Soo" }, { "name": "Yoon Jung Hee" }, { "name": "Trey Songz" }, { "name": "Erica Leerhsen" }, { "name": "Henry Rollins" }, { "name": "Daniella Alonso" }, { "name": "Steve Braun" }, { "name": "Ewen Bremner" }, { "name": "Jonny Lee Miller" }, { "name": "Juliette Binoche Kulig" }, { "name": "Cha Tae hyeon" }, { "name": "Kang Ye won" }, { "name": "Lee Moon soo" }, { "name": "Jang Young nam and Cheon Bo geun" }, { "name": "John Noble" }, { "name": "Megumi Hayashibara Kitaohgi" }, { "name": "Jeremy Sisto" }, { "name": "Eliza Dushku" }, { "name": "Desmond Harrington" }, { "name": "Kim Hyeon Jeong" }, { "name": "Lee Je yong" }, { "name": "Kim Dae wu" }, { "name": "Hayley Atwell" }, { "name": "Damian Lewis" }, { "name": "Trần Ý Hàm" }, { "name": "Trịnh Nguyên Sướng" }, { "name": "Petchtai Wongkamlao" }, { "name": "Jacqueline Apitananon" }, { "name": "Manoj Bajpayee" }, { "name": "Richa Chadda" }, { "name": "Blake Freeman" }, { "name": "Jason Mewes" }, { "name": "Mindy Sterling" }, { "name": "Lauren Holly" }, { "name": "Samuel l. jackson" }, { "name": "Ice cube" }, { "name": "Willem dafoe" }, { "name": "Nick Nolte" }, { "name": "Silje Reinåmo" }, { "name": "Erlend Nervold" }, { "name": "Jon Sigve Skard" }, { "name": "Barbra Streisand" }, { "name": "Julene Renee Preciado" }, { "name": "Jared Gilman" }, { "name": "MaliJohn Cusack" }, { "name": "Liam Cunningham" }, { "name": "Ông Hồng" }, { "name": "Tống Mạnh Chung" }, { "name": "Lương Tư Hạo" }, { "name": "Hal Holbrook" }, { "name": "Lincoln Burrows Wentworth Miller" }, { "name": "Michael Scofield Amaury Nolasco" }, { "name": "Fernando Sucre" }, { "name": "Hà Siêu Nghi" }, { "name": "Diego Boneta" }, { "name": "Robert Amstler" }, { "name": "Nadia Lanfranconi" }, { "name": "John J. Welsh" }, { "name": "Won yeong Choi" }, { "name": "Bren Maher" }, { "name": "Trần Nghiên Hi" }, { "name": "Kha Chấn Đông" }, { "name": "Ngạo Khuyển" }, { "name": "Hác Thiệu Văn" }, { "name": "Abbas Alibhai Burmawallalibhai Burmawalla" }, { "name": "Ah jung Kim" }, { "name": "Yong geon Kim" }, { "name": "Sa rang Kim" }, { "name": "Jun Gyu Park" }, { "name": "Hyeok jae Lee" }, { "name": "Ha Neul Kim" }, { "name": "Ji Hwan Kang" }, { "name": "Seung yong Ryoo" }, { "name": "Jonny Weston" }, { "name": "Peter Holden" }, { "name": "Jang Mi In Nae" }, { "name": "Kwon Min" }, { "name": "Marlon Wayans" }, { "name": "Essence Atkins" }, { "name": "Marlene Forte" }, { "name": "Seann William Scott" }, { "name": "Marit ThoreseDaniel Wu" }, { "name": "Tsutomu Tatsumi" }, { "name": "Ayano Shiraishi" }, { "name": "Yoshiko Shinohara" }, { "name": "Holt McCallany" }, { "name": "Lucas Till" }, { "name": "Robin Wright" }, { "name": "Mickey Rooney" }, { "name": "Pearl Bailey" }, { "name": "Reba McEntire" }, { "name": "Patrick Swayze" }, { "name": "Michael Pena" }, { "name": "and Emma Stone" }, { "name": "Jon Voight" }, { "name": "Iain Glen" }, { "name": "Monica Bellucci" }, { "name": "Ciarán Hinds" }, { "name": "Kaori Momoi" }, { "name": "Erika Sawajiri" }, { "name": "Vijay" }, { "name": "Sathyan" }, { "name": "Ram Charan" }, { "name": "Amala Paul" }, { "name": "BeOlga Kurylenko" }, { "name": "ANeil Patrick Harris" }, { "name": "Hank Azaria" }, { "name": "Jayma Mays" }, { "name": "Blair Brown" }, { "name": "The Dalai Lama" }, { "name": "David Schwimmer" }, { "name": "Jada Pinkett Smith" }, { "name": "Danny Jacobs" }, { "name": "Cedric the Entertainer" }, { "name": "Hayato Ichihara" }, { "name": "Erika Toda" }, { "name": "Shinnosuke Abe" }, { "name": "Đặng Gia Giai" }, { "name": "Trần Chí Bằng" }, { "name": "Hilary Duff" }, { "name": "Chad Michael Murray" }, { "name": "Jennifer Coolidge" }, { "name": "Ray Liotta" }, { "name": "Michael Chiklis" }, { "name": "Sean Faris" }, { "name": "Al Pacinolarkin" }, { "name": "Trần Y Hàm" }, { "name": "Trần Bách Lâm" }, { "name": "Quách Tuyết Phù" }, { "name": "Irene MoDerek de Lint" }, { "name": "Isidora Simijonovic Mikitisin" }, { "name": "Christy Chung" }, { "name": "Jue Huang" }, { "name": "Aaron Kwok" }, { "name": "Choi Daniel" }, { "name": "Jo Yoon Hee" }, { "name": "Keri RussellJosh Hamilton" }, { "name": "Mira Nair" }, { "name": "Helena Kriel" }, { "name": "Eric F. Adams" }, { "name": "Marcelle Baer" }, { "name": "Edrick Browne" }, { "name": "Clive OweGillianderson" }, { "name": "Helena BoRalph Fiennes" }, { "name": "Robbie Coltrane" }, { "name": "Craig Robinson" }, { "name": "và Martin Star." }, { "name": "Ryu Seung Bum" }, { "name": "Kim Ok Bin" }, { "name": "Jamie FoxxJames Woods" }, { "name": "Jake Weber" }, { "name": "Lance Reddick" }, { "name": "Tao Okamoto" }, { "name": "Hoàng Tông Trạch" }, { "name": "Hà Vận Thi" }, { "name": "Phùng Tôi Phàm" }, { "name": "Hạ Như Chi" }, { "name": "Lâm Tông Nhâ" }, { "name": "Devon Werkheiser" }, { "name": "Nicole Forester" }, { "name": "Justin Deeley" }, { "name": "Caitlin Carmichael" }, { "name": "David Kross" }, { "name": "Florian David Fitz" }, { "name": "Karl Markovics" }, { "name": "Isabel Christine Andreasen" }, { "name": "Ingrid Bolsø Berdal" }, { "name": "Kristian Espedal" }, { "name": "Mike Möller" }, { "name": "Volkram Zschiesche" }, { "name": "Oliver Juhrs" }, { "name": "Stephen Cloud" }, { "name": "Trương Vũ Ỷ" }, { "name": "Asia Argento" }, { "name": "Kim Sung Kyun" }, { "name": "Kim Yunjin" }, { "name": "Joko Ar" }, { "name": "Katharine Isabelle" }, { "name": "Antonio Cupo" }, { "name": "Tristan Risk" }, { "name": "Uhm Tae Woong" }, { "name": "Jung Ryu Won" }, { "name": "Jessica Biel" }, { "name": "Jodelle Ferland" }, { "name": "William B. Davis" }, { "name": "Seol Kyeong gu" }, { "name": "Son Ye jin" }, { "name": "Kim Sang kyeong" }, { "name": "Yamada Ryosuke" }, { "name": "Haruna Kawaguchi" }, { "name": "Arioka Daiki" }, { "name": "Từ Nhược Tuyên" }, { "name": "Paul Schneider" }, { "name": "Kevin Heffernan" }, { "name": "Viên Vịnh Nghi" }, { "name": "Vương Tổ Lam" }, { "name": "Paoli Dam" }, { "name": "Nikhil Dwivedi" }, { "name": "Gulshan Devaiah" }, { "name": "Joshua Jackson" }, { "name": "Hideaki Itô" }, { "name": "Ai Katô" }, { "name": "Ryûta Satô" }, { "name": "Cecilia Cheung" }, { "name": "Siu Fai Cheung" }, { "name": "Lưu Đức Hoà" }, { "name": "Dreama Walker" }, { "name": "Pat Healy" }, { "name": "Lauren Graham" }, { "name": "Johnny Simmons" }, { "name": "Fatima Ptacek" }, { "name": "Shawn Christensen" }, { "name": "Kim Allen" }, { "name": "Jackie Channd Jim Broadbent" }, { "name": "Billy Campbell" }, { "name": "Jesse Johnson" }, { "name": "Geraldine Hughes" }, { "name": "Tobias Zilliacus" }, { "name": "Mikael Persbrandt" }, { "name": "Lena Olin" }, { "name": "Juno TempleAlexis Bledel" }, { "name": "Alan Rickman" }, { "name": "Abigail Spencer" }, { "name": "Steve Austin" }, { "name": "Eric Keenleyside" }, { "name": "Ajay DevgnSonakshi Si" }, { "name": "Kristen ConnollyJane McNeill" }, { "name": "Kesarin Chaichalermpol" }, { "name": "Lưu Ngân Ngân" }, { "name": "Thị Tuyên Như" }, { "name": "Cha Tae Hyun" }, { "name": "Do Kyung soo D.O EXO" }, { "name": "Kim Yong Hwa" }, { "name": "Jacqueline McKenzie" }, { "name": "Hayley McElhinney" }, { "name": "Myles Pollard" }, { "name": "Justin Timberlake" }, { "name": "Woody Allen" }, { "name": "Diêm Ni" }, { "name": "Phan Bâng Long" }, { "name": "Dương Hựu Ninh" }, { "name": "Vương Cảnh Xuân" }, { "name": "Đoàn Dịch" }, { "name": "Hoành" }, { "name": "Greg Kinnear" }, { "name": "Djimon Hounsou" }, { "name": "Joe Wright" }, { "name": "Ngô Vũ Sâm" }, { "name": "Shelley Hennig" }, { "name": "James Arnold Taylor" }, { "name": "Kate Micucci" }, { "name": "Kevin Michael Richardson" }, { "name": "Sajjad Delafrooz" }, { "name": "Lưu Địch" }, { "name": "Uông Tình" }, { "name": "Vệ Diên Khản" }, { "name": "Tsubasa Honda" }, { "name": "Kar Yan Lam" }, { "name": "Ethan Juan" }, { "name": "Shi Shi Liu" }, { "name": "Jingfei Guo" }, { "name": "Miêu Kiều Vỹ" }, { "name": "Tang Bình" }, { "name": "Viên Gia Mẫn" }, { "name": "Trương Thiên Dương" }, { "name": "Hà Hoằng San" }, { "name": "Vạn Thương" }, { "name": "Josh O'Connor" }, { "name": "Harry Lister Smith" }, { "name": "Ian Hart" }, { "name": "Alec Secareanu" }, { "name": "Thư Nhã" }, { "name": "Tề Siêu" }, { "name": "Trương Phong" }, { "name": "Stephen Chbosky" }, { "name": "Izabela Vidovic" }, { "name": "Takumi Saito" }, { "name": "Takahiro" }, { "name": "Hiroomi Tosaka" }, { "name": "Noémie Nakai" }, { "name": "Christina Cox" }, { "name": "David Forseth" }, { "name": "Svetlana Ivanova" }, { "name": "Meg Foster" }, { "name": "Victor Salva" }, { "name": "Stan Shaw" }, { "name": "Brandon Smith" }, { "name": "Ái Phỉ Nhi" }, { "name": "Cát Tranh" }, { "name": "Yoo Ji Tae" }, { "name": "An Se‑Ha" }, { "name": "Hứa Minh Hổ" }, { "name": "Phiền Nhị" }, { "name": "Trương Thiên Kỳ" }, { "name": "Kaitlyn Boyé" }, { "name": "Damien Garvey" }, { "name": "Olga Miller" }, { "name": "Kim Gyngell" }, { "name": "Óscar Barberán" }, { "name": "Luis Posada" }, { "name": "Miguel Ángel Jenner" }, { "name": "José Corbacho" }, { "name": "Kim Hye Soo" }, { "name": "Piercey Dalton" }, { "name": "Patricia Bethune" }, { "name": "Lâm Tử Hoành" }, { "name": "Đường Chấn Cương" }, { "name": "Blanca Portillo" }, { "name": "Antonio Dechent" }, { "name": "Vicente Romero" }, { "name": "Marc Domènech" }, { "name": "Nausicaa Bonnín" }, { "name": "Andrés Herrera" }, { "name": "Ứng Hạo Minh" }, { "name": "Tu Kiệt Khải" }, { "name": "Nam Sanh" }, { "name": "Ngô Dạng" }, { "name": "Lý Vỹ" }, { "name": "Yuki Kaji" }, { "name": "Mamoru Miyano" }, { "name": "Bạch Tử Hiên" }, { "name": "Lý Ba Nhi" }, { "name": "Đỗ Ngọc Minh" }, { "name": "Garret Dillahunt" }, { "name": "Jill Wagner" }, { "name": "Từ Cẩm Giang" }, { "name": "Cố Vũ Phong" }, { "name": "Túng Hân Hân" }, { "name": "Quách Vỹ" }, { "name": "Lý Trị Đình" }, { "name": "Chu Đông Vũ" }, { "name": "Ngũ Bách" }, { "name": "Ngụy Lộ" }, { "name": "Trương Nghệ Kiển" }, { "name": "Christopher Lambert" }, { "name": "Seo Young Hwa" }, { "name": "Do Kyung soo" }, { "name": "Kim Dong Young" }, { "name": "Park Soo Young" }, { "name": "Lucy Punch" }, { "name": "Sarah Parish" }, { "name": "Faye Marsay" }, { "name": "David Warner" }, { "name": "Tobin Bell" }, { "name": "Matt Passmore" }, { "name": "Callum Keith Rennie" }, { "name": "Tưởng Mộng Tiệp" }, { "name": "Shuhei Nomura" }, { "name": "Kentaro" }, { "name": "Yuina Kuroshima" }, { "name": "Tina Tamashiro" }, { "name": "Yuna Taira" }, { "name": "Yuri Tsunematsu" }, { "name": "Nhiệt Ny Trát" }, { "name": "Triệu Bổn Sơn" }, { "name": "Trần Lâm" }, { "name": "Khưu Hạo Kỳ" }, { "name": "Văn Kỳ" }, { "name": "Ngũ Doãn Long" }, { "name": "Trương Cẩm Tình" }, { "name": "Từ Đông Đông" }, { "name": "James Urbaniak" }, { "name": "Damian Young" }, { "name": "Douglas Booth" }, { "name": "Jerome Flynn" }, { "name": "Robert Gulaczyk" }, { "name": "Lương Tịnh Kháng" }, { "name": "Nghiêm Mễ Lạp" }, { "name": "Trương Lâm Nghệ" }, { "name": "Harry Dean Stanton" }, { "name": "David Lynch" }, { "name": "Ed Begley Jr." }, { "name": "Tom Skerritt" }, { "name": "Beth Grant" }, { "name": "Algee Smith" }, { "name": "Carter Roy" }, { "name": "Alena von Stroheim" }, { "name": "Chris O'Brien" }, { "name": "Hứa Vĩ Ninh" }, { "name": "Cao Tuệ Quân" }, { "name": "Hoàng Hà" }, { "name": "Chiêm Uyển Nho" }, { "name": "Ngô Niệm Hiên" }, { "name": "Kim Quang Minh" }, { "name": "Lưu Lị Nhân" }, { "name": "Trần Viên" }, { "name": "Wei ning Hsu" }, { "name": "Kaiser Chuang" }, { "name": "Chia Yen Ko" }, { "name": "Christopher Ming Shun Lee" }, { "name": "Mason Lee" }, { "name": "Phương Trung Tín" }, { "name": "Lâm Thân" }, { "name": "Hứa Kinh Xuyên" }, { "name": "Lương Tuấn Nhất" }, { "name": "Maria Canals Barrera" }, { "name": "Pat Boone" }, { "name": "Robin Givens" }, { "name": "Melissa Joan Hart" }, { "name": "Brad Heller" }, { "name": "Mark Hamill" }, { "name": "Carrie Fisher" }, { "name": "Kelly Marie Tran" }, { "name": "Missi Pyle" }, { "name": "Nhậm Tố Tịch" }, { "name": "Cao Hiệp" }, { "name": "Trần Tỉ Húc" }, { "name": "Dịch Dương" }, { "name": "Dương Chính" }, { "name": "Thẩm Phương Hi" }, { "name": "Bridget Regan" }, { "name": "Trương Quốc Trụ" }, { "name": "Hoàng Tử Thao" }, { "name": "Lý Mộng" }, { "name": "Dương Thái Ngọc" }, { "name": "Emilio Rivera" }, { "name": "Luke Grimes" }, { "name": "Dax Shepard" }, { "name": "Kurtwood Smith" }, { "name": "Kimberly Quinn" }, { "name": "Hầu Dũng" }, { "name": "Kim Thần" }, { "name": "Đại Trương Vỹ" }, { "name": "Bobby Cannavale" }, { "name": "Boris Kodjoe" }, { "name": "Takafumi Hatano" }, { "name": "Hajime Hashimoto" }, { "name": "Văn Trác" }, { "name": "Lâu Giai Duyệt" }, { "name": "Trương Khánh Khánh" }, { "name": "Ngô Việt" }, { "name": "Diego Luna" }, { "name": "Kiersey Clemons" }, { "name": "Morakot Liu" }, { "name": "Eisaya Hosuwan" }, { "name": "Nutthasit Kotimanuswanich" }, { "name": "Ploy Sornarin" }, { "name": "Peem Jaiyen" }, { "name": "La Gia Anh" }, { "name": "Tạ Y Lâm" }, { "name": "Giả Chính Vũ" }, { "name": "Tống Tinh Nghiên" }, { "name": "Trịnh Húc Đông" }, { "name": "Trâu Dương" }, { "name": "Tào Hi Nguyệt" }, { "name": "Tom Holland" }, { "name": "Diana Rigg" }, { "name": "Camilla Rutherford" }, { "name": "Olivia Williams" }, { "name": "Ali Fazal" }, { "name": "Trương Hàn" }, { "name": "Chu Nhất Long" }, { "name": "Liễu Ni Na" }, { "name": "Rachelle Lefevre" }, { "name": "Sarah Dugdale" }, { "name": "Jared Abrahamson" }, { "name": "Lucy Boynton" }, { "name": "Jamie Clayton" }, { "name": "Shin Eun Jung" }, { "name": "Minho" }, { "name": "Hà Hân Tử" }, { "name": "Trần Ngọc Dũng" }, { "name": "Timothée Chalamet" }, { "name": "Michael Stuhlbarg" }, { "name": "Eric Balfour" }, { "name": "Donald Faison" }, { "name": "Scottie Thompson" }, { "name": "Chiara Aurelia" }, { "name": "Masataka Kubota" }, { "name": "Aoi Yu" }, { "name": "Fumika Shimizu" }, { "name": "Yo Oizumi" }, { "name": "An Hổ" }, { "name": "Cù Cúc Huy" }, { "name": "Vương Nguy" }, { "name": "Raffey Cassidy" }, { "name": "Alicia Silverstone" }, { "name": "Sarah Natochenny" }, { "name": "Sarah Lind" }, { "name": "Jakob Davies" }, { "name": "Hugh Dillon" }, { "name": "Vicellous Shannon" }, { "name": "Kurt Max Runte" }, { "name": "Masaki Okada" }, { "name": "Masaki Suda" }, { "name": "Shun Oguri" }, { "name": "Hà Khiết Văn" }, { "name": "Supriya Pilgaonkar" }, { "name": "Đồ Lê Mạn" }, { "name": "Ezra Miller" }, { "name": "Diane Lane" }, { "name": "Ray Fisher" }, { "name": "Phó Bác Văn" }, { "name": "Quỷ Quan Lâm" }, { "name": "Trần Bội Tư" }, { "name": "Tân Kiều" }, { "name": "Katie Holmes" }, { "name": "Thái Trác Nghiên" }, { "name": "Lan Law" }, { "name": "Hàn Chí Thạc" }, { "name": "Thái Điệp" }, { "name": "Triệu Uy Lâm" }, { "name": "Park Ha Sun" }, { "name": "Hà Vân Vĩ" }, { "name": "Trương Nhất Long" }, { "name": "Tony jaa" }, { "name": "Jack Ma" }, { "name": "Trình Tiểu Đông" }, { "name": "Trình Hạo Phong" }, { "name": "Hoa Thiếu" }, { "name": "Trịnh Quốc Lâm" }, { "name": "Charles Aitken" }, { "name": "Rachel Matthews" }, { "name": "Jason Bayle" }, { "name": "Takuya Kimura" }, { "name": "Kristin Chenoweth" }, { "name": "Chanon Santinatornkul" }, { "name": "Teeradon Supapunpinyo" }, { "name": "Bing He" }, { "name": "Jet Chao" }, { "name": "Ray Wang" }, { "name": "Rose McIver" }, { "name": "Alice Krige" }, { "name": "Ben Lamb" }, { "name": "Maika Yamamoto" }, { "name": "Mei Nagano" }, { "name": "Shohei Miura" }, { "name": "Alan Shirahama" }, { "name": "Ryuta Sato" }, { "name": "Naomi Nishida" }, { "name": "Dominik Kowalczyk" }, { "name": "Ewa Blaszczyk" }, { "name": "Magdalena Niec" }, { "name": "Marcos A. Ferraez" }, { "name": "Benjamin A. Hoyt" }, { "name": "Alison Fernandez" }, { "name": "Mai Kadowaki" }, { "name": "Tống Hiểu Phong" }, { "name": "Đường Na" }, { "name": "Trương Gia Hào" }, { "name": "Josh Grelle" }, { "name": "Hoàng Hoành" }, { "name": "Lưu Hướng Kinh" }, { "name": "Vương Hải Yến" }, { "name": "Nhạc Đông Phong" }, { "name": "Vương Hồng Thiên" }, { "name": "Paul Anderson" }, { "name": "Nathalie Boltt" }, { "name": "Kazuya Kamenashi" }, { "name": "Mahiro Takasugi" }, { "name": "Tao Tsuchiya" }, { "name": "Daigo Nishihata" }, { "name": "Kim Rae Won" }, { "name": "Baek Bong Ki" }, { "name": "Lily Sullivan" }, { "name": "Greg McLean" }, { "name": "Mizuki Yamamoto" }, { "name": "Maeda Makkenyu" }, { "name": "Đại Bằng" }, { "name": "Kiều Sam" }, { "name": "Phạm Vĩ" }, { "name": "Lưu Vũ Kì" }, { "name": "Hải Đông" }, { "name": "Thẩm Trì" }, { "name": "Lee Je Hoon" }, { "name": "Na Mun hee" }, { "name": "Văn Vịnh San" }, { "name": "Hứa Chí An" }, { "name": "Minh Tuấn Thần" }, { "name": "Quách Nhược Hàn" }, { "name": "Y Na" }, { "name": "Luc Besson" }, { "name": "Taecyeon" }, { "name": "Lưu Dương" }, { "name": "Hầu Phất Minh" }, { "name": "Lý Khai Minh" }, { "name": "Trường Hoành Bác" }, { "name": "Diego Klattenhoff" }, { "name": "Charlotte Sullivan" }, { "name": "Robert Borges" }, { "name": "Andrea del Campo" }, { "name": "Nazariy Demkowicz" }, { "name": "Brett Donahue" }, { "name": "Tom Kenny" }, { "name": "Se ha Ahn" }, { "name": "Yo han Byeon" }, { "name": "Seo jin Chae" }, { "name": "Carter Jenkins" }, { "name": "Michael Grant" }, { "name": "Matt Shively" }, { "name": "Nick Marini" }, { "name": "Taryn Manning" }, { "name": "Francesca Eastwood" }, { "name": "Trần Hán Điển" }, { "name": "Kim Thế Giai" }, { "name": "Lý Tử Phong" }, { "name": "Phạm Điềm Điềm" }, { "name": "Từ Hy Đệ" }, { "name": "Hứa Quân Thông" }, { "name": "Trương Kinh Vĩ" }, { "name": "Trương Quân Hàm" }, { "name": "Kim Seolhyun" }, { "name": "Kyoung gu Sul" }, { "name": "Xiao Lian Sha" }, { "name": "Tu Te Ha Meng" }, { "name": "Shih Chieh King" }, { "name": "Teri Hatcher" }, { "name": "Sean Marquette" }, { "name": "Silverio Palacios" }, { "name": "Jordi Mollà" }, { "name": "Đường Vũ Triết" }, { "name": "Trương Ngữ Cách" }, { "name": "Thanh Ngọc Văn" }, { "name": "Đặng Lệ Hân" }, { "name": "Trương Địch" }, { "name": "Đoạn Trác Văn" }, { "name": "Cristina Serafini" }, { "name": "Atanas Srebrev" }, { "name": "Philip Ng" }, { "name": "Teresa Navarro" }, { "name": "Terry Chen" }, { "name": "Nigel O'Neill" }, { "name": "Susan Lynch" }, { "name": "Diana Prince" }, { "name": "Marshal Hilton" }, { "name": "Bradley Bundlie" }, { "name": "Boriana Williams" }, { "name": "Olivia Stiefel" }, { "name": "Debby Gerber" }, { "name": "Mộc Lam" }, { "name": "Trương Giác" }, { "name": "José Coronado" }, { "name": "Bárbara Lennie" }, { "name": "Ana Wagener" }, { "name": "Trần Hổ" }, { "name": "Lý Quán Lâm" }, { "name": "Nguyên Trạch Vũ" }, { "name": "Thạc Lỗi" }, { "name": "Cinda Adams" }, { "name": "Bob Barlen" }, { "name": "Cal Brunker" }, { "name": "Joey Camen" }, { "name": "David Epstein" }, { "name": "Pappy Faulkner" }, { "name": "Sam Strike" }, { "name": "Vanessa Grasse" }, { "name": "Sam Coleman" }, { "name": "Alba Galocha" }, { "name": "Itziar Atienza" }, { "name": "Florin Opritescu" }, { "name": "Jang Hyuk" }, { "name": "Jo Bo Ah" }, { "name": "Sunwoo Sun" }, { "name": "Shûgo Oshinari" }, { "name": "Pedro Pascal" }, { "name": "Han Chae Ah" }, { "name": "Gang Ye Won" }, { "name": "Kim Min Kyo" }, { "name": "Kim Sung Eun" }, { "name": "Mã Thiên Vũ" }, { "name": "Lý Thạnh" }, { "name": "Diêu Tinh Đồng" }, { "name": "Châu Vi Đồng" }, { "name": "Song Kang‑Ho" }, { "name": "Neal McDonough" }, { "name": "Molly Parker" }, { "name": "Dylan Schmid" }, { "name": "Kaitlyn Bernard" }, { "name": "Tanya Champoux" }, { "name": "Kim Ah Joong" }, { "name": "Seong oh Kim" }, { "name": "Krissada Sukosol Clapp" }, { "name": "Achita Sikamana" }, { "name": "Sarunyu Wongkrachang" }, { "name": "Arisara Tongborisuth" }, { "name": "Soranut Yupanun" }, { "name": "Sucharat Manaying" }, { "name": "Quách Hiểu Đông" }, { "name": "Victoria Justice" }, { "name": "Johnny Knoxville" }, { "name": "Chelsea Handler" }, { "name": "Josh Radnor" }, { "name": "Goo Ja Hyeong" }, { "name": "Lee Hyung Suk" }, { "name": "Sin Yong woo" }, { "name": "Kristopher Turner" }, { "name": "Crystal Lowe" }, { "name": "Phan Tử" }, { "name": "Mie Sonozaki" }, { "name": "Masaki Terasoma" }, { "name": "Atsushi Abe" }, { "name": "Masumi Asano" }, { "name": "Keiji Fujiwara" }, { "name": "Calvin Reederrd" }, { "name": "Park Han Byul" }, { "name": "Kim Ji Seok" }, { "name": "Park Jin Joo" }, { "name": "Gérard Depardieu" }, { "name": "Frank Langella" }, { "name": "Aneurin Barnard" }, { "name": "Wunmi Mosaku" }, { "name": "Yōichi Masukawa" }, { "name": "Kazuhiko Inoue" }, { "name": "Shotaro Morikubo" }, { "name": "Akira Ishida" }, { "name": "Yasuyuki Kase" }, { "name": "Sally Field" }, { "name": "Chandler Canterbury" }, { "name": "Mike Vogel" }, { "name": "Yu Shaoqun" }, { "name": "Bai Jing" }, { "name": "Huang Younan" }, { "name": "Hui Tianci" }, { "name": "Yuan Qiu" }, { "name": "Yuan Hua" }, { "name": "Zou Zhaolong" }, { "name": "Hui Yinghong" }, { "name": "Sheridan Smith" }, { "name": "Joel Mathews" }, { "name": "Dwayne JohnsoJohnny Knoxville" }, { "name": "Raúl Arévalo" }, { "name": "Alexandra Jiménez" }, { "name": "Javier Bódalo" }, { "name": "Mirai Kataoka" }, { "name": "Takuma Negishi" }, { "name": "Ami Taniguchi" }, { "name": "Ashley BellMichael Eklund" }, { "name": "Nicole LaLiberte" }, { "name": "Liam Aiken" }, { "name": "Chase Williamson" }, { "name": "Kekin" }, { "name": "Ken Watanabe" }, { "name": "Billy Connolly" }, { "name": "Luke Pasqualino" }, { "name": "Lili Bordán" }, { "name": "Ty Olsson" }, { "name": "Ryan Phillippe" }, { "name": "Joseph Cross" }, { "name": "Kekindrew Marton" }, { "name": "Martin Balsam" }, { "name": "Sou Yamamura" }, { "name": "Ai Kobayashi" }, { "name": "Yûji Kishi" }, { "name": "BeJoseph Fiennes" }, { "name": "Mary McDonnell" }, { "name": "Graham Greene" }, { "name": "John Leguizamo" }, { "name": "Adam O'BriaCathy Dresbach" }, { "name": "Annie Liu" }, { "name": "Matthew Broderick" }, { "name": "Fedor Borchuk" }, { "name": "SimoVirginie Ledoyen" }, { "name": "Robinson Stévenin" }, { "name": "Chunthawit Thanasewi" }, { "name": "Nuengthida Sophon" }, { "name": "Gregory Peck" }, { "name": "Anthony Quinn" }, { "name": "George C. Scott" }, { "name": "Katharine Towne" }, { "name": "Steve McQueen" }, { "name": "James Garner" }, { "name": "Richard Attenborough" }, { "name": "Emma Fitzpatrick" }, { "name": "Sharon Stone" }, { "name": "Promise LaMarco" }, { "name": "Lee Marvin" }, { "name": "Ernest Borgnine" }, { "name": "Charles Bronson" }, { "name": "Eddie Baroo" }, { "name": "Justin Batchelor" }, { "name": "Nicholas Bell" }, { "name": "William HoldeJack Hawkins" }, { "name": "Ekin Cheng" }, { "name": "Joyce Cheng" }, { "name": "Charlene Choi" }, { "name": "Quvenzhané Wallis" }, { "name": "Dwight Henry" }, { "name": "Levy Easterly" }, { "name": "Isabel Lucas" }, { "name": "Rasmus Hardiker" }, { "name": "Harry Treadaway" }, { "name": "Michelle Ryan" }, { "name": "Jang Dong gun" }, { "name": "Won Bin và Lee Eun joo" }, { "name": "Go Soo" }, { "name": "Jude Law và Aaron Taylor Johnson" }, { "name": "Joong ki Song" }, { "name": "Bo yeong Park and Young nam Jang" }, { "name": "Ross Noble" }, { "name": "Gemma Leah Devereux" }, { "name": "Tommy Knight" }, { "name": "Marc Singer" }, { "name": "Art LaFleur" }, { "name": "Hayley DuMond" }, { "name": "Thor Kristjansson" }, { "name": "Damon Younger" }, { "name": "Triệu Bản Sơn" }, { "name": "Trần Tư Thành" }, { "name": "Lưu Đức Khải" }, { "name": "Lưu Hiểu Khánh" }, { "name": "Bria Miller" }, { "name": "Darren ShahlaviKandyse McClure" }, { "name": "Henry Winkler" }, { "name": "Miley Cyrus" }, { "name": "Katrina Bowden" }, { "name": "Randy Wayne" }, { "name": "Erin Marie Hogan" }, { "name": "Trương Quốc Lập" }, { "name": "Chad Michael Collins" }, { "name": "Han Hyo joo" }, { "name": "Seung Ryong Ryu" }, { "name": "Megan Charpentier" }, { "name": "Nadine Velazquez" }, { "name": "Don Cheadle" }, { "name": "Juliet Rylance" }, { "name": "Bette Midler và Marisa Tomei" }, { "name": "Jeong hwa Eom" }, { "name": "Priscilla Faia" }, { "name": "Adrian Holmes" }, { "name": "Jesse Hutch" }, { "name": "Peter Weller" }, { "name": "Ariel Winter" }, { "name": "Michael Emerson" }, { "name": "Kim Thành Vũ" }, { "name": "Huệ Anh Hồng" }, { "name": "Petar Bachvarov" }, { "name": "Zahary Baharov" }, { "name": "Katie Featherston" }, { "name": "Kathryn Newton" }, { "name": "Mark Steger" }, { "name": "KIM Hyeon soo" }, { "name": "NOH Kang min" }, { "name": "Tiêu Huân" }, { "name": "Lưu Tích Minh" }, { "name": "Juan Diego Botto" }, { "name": "Mágica Pérez" }, { "name": "Kôji Seto" }, { "name": "Tsutomu Takahashi" }, { "name": "Jamel Debbouze" }, { "name": "Alain Chabat" }, { "name": "Fred Testot" }, { "name": "Amaia SalamaMaxi Iglesias" }, { "name": "Lucho Fernández" }, { "name": "Scott Peat" }, { "name": "Marissa Merrill" }, { "name": "Johnny Hallyday" }, { "name": "Anthony Wong" }, { "name": "Lam Ka Tung" }, { "name": "Sylvie Testud" }, { "name": "Natasha Calis" }, { "name": "Rachelle Dimarialex Bell" }, { "name": "Noel Clarke Campbell Hughes" }, { "name": "Kirati Nakinon" }, { "name": "Joel KiFares Fares" }, { "name": "Matias Varela" }, { "name": "Juantonio Bayona" }, { "name": "Hugh JackmanRichard Roxburgh" }, { "name": "Xander Berkeley" }, { "name": "ChaPreechaya Pongthananikorn" }, { "name": "Kim Kang woo" }, { "name": "Kim Hyo jin" }, { "name": "Baek Yoon sik" }, { "name": "Yoon Yeo jeong" }, { "name": "Bug Hall" }, { "name": "Donnie Jeffcoat" }, { "name": "Sean McGowan" }, { "name": "Aubrey Plaza" }, { "name": "Eamon Farren" }, { "name": "Evan Bird" }, { "name": "Deborah Kara Unger" }, { "name": "Kimble Rell" }, { "name": "Jody Thompson" }, { "name": "Conner Dwelly" }, { "name": "Ryan Grantham" }, { "name": "Dong gun Jang" }, { "name": "Steve Zahn" }, { "name": "Burn GormanRon Perlman" }, { "name": "Max Baker" }, { "name": "Morris Rong" }, { "name": "Yvonne Yao" }, { "name": "Sona Eyambe" }, { "name": "Danny DeVito" }, { "name": "Pat Carroll Adams" }, { "name": "Donnelly Rhodes" }, { "name": "Ben BarnesGeorgie Henley" }, { "name": "Georgie Henley" }, { "name": "William Moseley" }, { "name": "Robert De Niro and Cillian Murphy" }, { "name": "Thom Hoffman" }, { "name": "Emmy Rossum" }, { "name": "Joan Chen" }, { "name": "Shaofeng Feng" }, { "name": "Valheim Hagenders Baasmo Christiansen" }, { "name": "Tiền Gia Lạc" }, { "name": "Doãn Tử Duy" }, { "name": "Milla Jovovich Guillory and Michelle Rodriguez" }, { "name": "Dennis Alexio" }, { "name": "Dennis Chan" }, { "name": "Max Thieriot" }, { "name": "Bill Goldberg" }, { "name": "Heidi Schanz" }, { "name": "ABrittany Snow" }, { "name": "Tae woong Eom" }, { "name": "Ga in Han" }, { "name": "Rae Dawn Chong" }, { "name": "Clint Eastwood" }, { "name": "Kevin T. Collins" }, { "name": "Marc Diraison" }, { "name": "Doug Erholtz" }, { "name": "Sudeep" }, { "name": "Nani" }, { "name": "Bryan Trương Thư Hào" }, { "name": "Zoe Bell" }, { "name": "Paul Wesley" }, { "name": "Tom Wilkinsonnd Helena Bom Carter" }, { "name": "Oseph Gordon LevittJamie Chungshley Carter" }, { "name": "Yulia Snigir" }, { "name": "Amaury Nolasco" }, { "name": "Megalyn Echikunwoke" }, { "name": "Anne Vyalitsyna" }, { "name": "và Mary Elizabeth Winstead" }, { "name": "Donal Logue" }, { "name": "Tyne Daly" }, { "name": "Harry Guardino" }, { "name": "Ella" }, { "name": "Hạ Quân Tường" }, { "name": "Phương Chí Hữu" }, { "name": "Đại Nguyên" }, { "name": "Ranbir KapoorHaradhan Bannerjee" }, { "name": "Seon gyun Lee" }, { "name": "Sung min Lee" }, { "name": "Zachary Gordon" }, { "name": "Eric Banam" }, { "name": "Mayumi Tanaka" }, { "name": "Kazuya Nakai" }, { "name": "Akemi Okamura" }, { "name": "Anora Lyn" }, { "name": "Jeong Man Sik" }, { "name": "Tyler Perry" }, { "name": "Antje Traue" }, { "name": "Russell Crowe star" }, { "name": "D.J. Cotrona" }, { "name": "Adrianne Palicki" }, { "name": "Ray Park" }, { "name": "Jonathan Pryce" }, { "name": "Channing Tatum cùng Bruce Willis" }, { "name": "Alex Arleon" }, { "name": "Angelina" }, { "name": "Connie" }, { "name": "Monnie" }, { "name": "Gwendoline Yeo" }, { "name": "Don Swayze" }, { "name": "Sin Se Kyung" }, { "name": "Yoo Joon Sang" }, { "name": "Kim Sung Soo" }, { "name": "Lee Ha Na" }, { "name": "Lee Jong Suk" }, { "name": "Guy Pearce and Gwyneth Paltrow" }, { "name": "Dragan Bakema" }, { "name": "Alison Carroll and Jappe Claes" }, { "name": "Sophie Marceau" }, { "name": "Andrea Di Stefano" }, { "name": "Bronson Webb" }, { "name": "Agyness Deyn" }, { "name": "Mark Andrews Chapman" }, { "name": "Andy McPhee" }, { "name": "Nam Kyeong Eup" }, { "name": "Oh Ji Ho" }, { "name": "Kate Ashfield" }, { "name": "Nicky Bell" }, { "name": "Alan Brent" }, { "name": "Randy Couture" }, { "name": "Joseph Gordon Levitt và Gary Oldman" }, { "name": "Jesse McCartney" }, { "name": "Jonathan Sadowski" }, { "name": "Olivia Dudley" }, { "name": "Doug Bradley" }, { "name": "Camilla Arfwedson" }, { "name": "Simon Ginty" }, { "name": "Michael Paré" }, { "name": "Michael Fassbeder" }, { "name": "Audrey Tautou" }, { "name": "Alfred Molina" }, { "name": "Sir Ian McKellen" }, { "name": "Kim Seung woo" }, { "name": "Oh Ji ho" }, { "name": "Kim Min jeong" }, { "name": "Choi Soo young" }, { "name": "Choi Yoon so" }, { "name": "Josh Lucas" }, { "name": "Louis Moru" }, { "name": "Anthony Wong Chau Sang" }, { "name": "Xiaodong Guo" }, { "name": "Barbie Hsu" }, { "name": "Josie Ho" }, { "name": "Michelle Ye" }, { "name": "Jo Yeo Jung" }, { "name": "Kim Min Joon" }, { "name": "Park Ji young" }, { "name": "Jo Eun ji" }, { "name": "Jung Chan" }, { "name": "Nathan Fillion" }, { "name": "Michael Rooker" }, { "name": "Leraldo ALuci Christian" }, { "name": "Melissa Davis" }, { "name": "Won Joo" }, { "name": "Byeol Kang" }, { "name": "Elika Portnoy" }, { "name": "Taylor Schilling" }, { "name": "Blythe Danner." }, { "name": "Saffron Burrows" }, { "name": "Stephen Campbell Moore" }, { "name": "Brooklyn Decker" }, { "name": "Til Schweiger" }, { "name": "Rosamund Kwan" }, { "name": "David Wu" }, { "name": "Miriam Yeung Chin Wah" }, { "name": "Singh Hartihan Bitto" }, { "name": "Yat Ning Chan" }, { "name": "Luke Wilson" }, { "name": "Bành Vu YếChu Vũ Thần" }, { "name": "Châu Dương" }, { "name": "Hà Khiết" }, { "name": "Jon Barton" }, { "name": "Elena Beuca" }, { "name": "Sui man Chim" }, { "name": "Koni Lui" }, { "name": "Dong Kun Jang" }, { "name": "Chae young Han" }, { "name": "Du shim Ko" }, { "name": "Ray Romano" }, { "name": "Denis Leary" }, { "name": "Chris Diamantopoulos" }, { "name": "Will Sasso" }, { "name": "Rhett Giles" }, { "name": "Victor Parascos" }, { "name": "Vanessa Gray" }, { "name": "Filip AntonioPetra Hrebícková" }, { "name": "Václav Jílek" }, { "name": "Vica Kerekes" }, { "name": "Ester Kocicková" }, { "name": "Berenika Kohoutová" }, { "name": "Eliska Krenková" }, { "name": "Lukás Langmajer" }, { "name": "Jirí Machácek" }, { "name": "Sean BeaCharlotte Rampling" }, { "name": "Giả Hiểu Thần" }, { "name": "Dun Jones" }, { "name": "Colleen Clinkenbeard" }, { "name": "Pam Dougherty" }, { "name": "Josephine Siao" }, { "name": "Michelle Reis" }, { "name": "Chan Chung Yung" }, { "name": "Zhao Wen Zhou" }, { "name": "KeviLouise Fletcher" }, { "name": "Lucius Baston" }, { "name": "Eamonn Walker" }, { "name": "Emma Stone và Rhys Ifans" }, { "name": "Candy Yu" }, { "name": "Maksim Matveev" }, { "name": "Egor Beroev" }, { "name": "Mario Van Peebles Watts" }, { "name": "Amber Heardble" }, { "name": "Seba Mubarak" }, { "name": "Pernilla August" }, { "name": "Catherine Chan" }, { "name": "Chris Sarandon" }, { "name": "Charles S" }, { "name": "Nathalie Baye và Sami Bouajila" }, { "name": "Takashi Hirajô" }, { "name": "Minami Ichikawa" }, { "name": "Toshiaki" }, { "name": "Nakazawa" }, { "name": "Tôichirô Shiraishi" }, { "name": "Jeremy" }, { "name": "Thomas" }, { "name": "Michihiko" }, { "name": "Yanagisawa" }, { "name": "Denzel WashingtonSam Shepard" }, { "name": "Rubén Blades" }, { "name": "Kim Yeong Ho" }, { "name": "Kim Hye Seon" }, { "name": "Yoon Chae Yi" }, { "name": "Kim San Ho" }, { "name": "Hiro Hayama" }, { "name": "Leni Lan Crazybarby" }, { "name": "Miyavi Matsunoi" }, { "name": "Quách Phẩm Siêu" }, { "name": "Josh Hutcherson Dwayne Johnson" }, { "name": "Andrew Seeley" }, { "name": "Cyril Raffaelli" }, { "name": "Philippe Torreton" }, { "name": "Daniel Duval" }, { "name": "David Alan Basche" }, { "name": "James DuMont" }, { "name": "Yul Vazquez" }, { "name": "Daniel Franzese" }, { "name": "Tae gyu BongDal su OhSu min Lee" }, { "name": "Mi ju Ryu" }, { "name": "Bruce WillisWill Patton" }, { "name": "Jessica Steen" }, { "name": "Kagiso Kuypers" }, { "name": "Arnold Vosloo" }, { "name": "Antony Coleman" }, { "name": "Benu Mabhena" }, { "name": "Anointing Lukola" }, { "name": "David Harewood" }, { "name": "Basil Wallace" }, { "name": "Jimi Mistry" }, { "name": "Maria Ozawa" }, { "name": "Minami Marika" }, { "name": "Mizuse Manami" }, { "name": "Namiko" }, { "name": "Kobayashi Kazunori" }, { "name": "Kouno Tomonori" }, { "name": "Oosako Shigeo" }, { "name": "Akikawa Yuri" }, { "name": "Philip Bartlett" }, { "name": "Ikue Ootani" }, { "name": "Robert Downey" }, { "name": "Jr." }, { "name": "Terence Chang" }, { "name": "Jimmy Huang" }, { "name": "John Woo" }, { "name": "Selma Blair" }, { "name": "Amy Smart and Jason Lee" }, { "name": "Nimród Al" }, { "name": "Carmen Electra" }, { "name": "Charlie O'Connell" }, { "name": "Brooke Hogan" }, { "name": "Jake GylleGemma Arterton" }, { "name": "Jay Chou" }, { "name": "Gang Wang" }, { "name": "Hugo Arana" }, { "name": "Antonella Costa" }, { "name": "Monica Galán" }, { "name": "Leandro Stivelman" }, { "name": "Natasha Henstridge" }, { "name": "Marg Helgenberger" }, { "name": "Ann Mitchell" }, { "name": "Jolyon Coy" }, { "name": "Karl Johnson" }, { "name": "Simon Russell Beale" }, { "name": "Harry Hadden Paton" }, { "name": "Sarah Kants" }, { "name": "Oliver Ford Davies" }, { "name": "Barbara Jefford" }, { "name": "Mark Tandy" }, { "name": "Scott Martin" }, { "name": "Clint Glenn" }, { "name": "Tony Pauletto" }, { "name": "Zach Cregger" }, { "name": "Eugene Bell" }, { "name": "Trevor Moore" }, { "name": "Tucker Cleigh" }, { "name": "Raque" }, { "name": "Lynn Collins" }, { "name": "Sasha Grey" }, { "name": "Brian Koppelman" }, { "name": "David Levien" }, { "name": "Tony Leung Chiu Wai" }, { "name": "Wei Tang" }, { "name": "Chung Hua Tou" }, { "name": "Chih ying Chu" }, { "name": "Ying hsien Kao" }, { "name": "Johnson Yuen" }, { "name": "Yan Su" }, { "name": "Dustin Nguyễn" }, { "name": "Đỗ Hải Yến" }, { "name": "Tăng Thanh Hà" }, { "name": "Josh Holloway" }, { "name": "Anil Kapoor" }, { "name": "Lee Seong jae" }, { "name": "Yeon woo Hyeon jin" }, { "name": "Lucy May Barker" }, { "name": "Alexander Gould" }, { "name": "Erica Beck" }, { "name": "Shailene Woodley and Amara Miller" }, { "name": "Déborah Révy" }, { "name": "Helene Zimmer" }, { "name": "Gowan Didi" }, { "name": "Bruce Boxleitner" }, { "name": "James Frain" }, { "name": "Ewa Fröling" }, { "name": "Tatsuya Nakadaichi Nezu" }, { "name": "François Truffaut Marcel Moussy François Truffaut Marcel Moussy" }, { "name": "Sam Peckih" }, { "name": "Evey Hammond Hugo Weaving" }, { "name": "V Stephen Rea" }, { "name": "Inspector Finch Stephen Fry" }, { "name": "Jack McGee" }, { "name": "Armin Mueller Stahl" }, { "name": "Oliver Reed" }, { "name": "Richard Harris" }, { "name": "Derek Jacobi" }, { "name": "David Schofield" }, { "name": "John Shrapnel" }, { "name": "Tomas Arana" }, { "name": "Ralf Moeller" }, { "name": "Tom Berenger" }, { "name": "Matt LongNicolas Cage" }, { "name": "Tony Ghosthawk" }, { "name": "Hugh Sexton" }, { "name": "Marcus Jones" }, { "name": "Matt Norman" }, { "name": "Kenneth Ransom" }, { "name": "Philippe NoiretAntonella Attili" }, { "name": "Humphrey Bogart" }, { "name": "Walter Huston" }, { "name": "Tim Holt" }, { "name": "Anne Bancroft" }, { "name": "John Gielgud" }, { "name": "Wendy Hiller" }, { "name": "Bruno Ganz" }, { "name": "Alexandra Maria Lara" }, { "name": "Ulrich Matthes" }, { "name": "Toshirô Mifune" }, { "name": "Tatsuya Nakadai" }, { "name": "Yôko Tsukasa" }, { "name": "Isuzu Yamada" }, { "name": "Cathy Moriarty" }, { "name": "Frank Vincent" }, { "name": "Audrey Hepburn" }, { "name": "Eddie Albert" }, { "name": "Paul Newman" }, { "name": "George Kennedy" }, { "name": "Strother Martin" }, { "name": "Emmanuelle Seigner" }, { "name": "Marie Josée Croze" }, { "name": "Lamberto Maggiorani" }, { "name": "Enzo Staiola" }, { "name": "Lianella Carell" }, { "name": "Harvey Keitel" }, { "name": "Ryan O'Marisa Berenson" }, { "name": "Patrick Magee" }, { "name": "Jason Flemyng" }, { "name": "Nick Moran" }, { "name": "BreOded Fehr" }, { "name": "Patricia Velasquez" }, { "name": "Freddie Boath" }, { "name": "The Rock" }, { "name": "Adewal" }, { "name": "Charles Chaplin" }, { "name": "Charlton Heston" }, { "name": "John Cazale" }, { "name": "Ricardo Darín" }, { "name": "Soledad Villamil and Pablo Rago" }, { "name": "Robbie Sheehan" }, { "name": "Ulrich Thomsen" }, { "name": "Stephen Graham" }, { "name": "Javier Bardem" }, { "name": "Don Cheadle Sophie Okonedo Joaquin Phoenix Nick Nolte Jean Reno" }, { "name": "Xavier Dolan" }, { "name": "Tom Hulce" }, { "name": "Elizabeth Berridge" }, { "name": "Simon Callow" }, { "name": "Jeffrey Jones" }, { "name": "Mifune Toshirō" }, { "name": "Shimura Takashi" }, { "name": "Mori Masayuki" }, { "name": "Chiaki Minoru" }, { "name": "Robert Mitchum; Shelley Winters; Lillian Gish; Billy Chapin; Sally Jane Bruce" }, { "name": "Shosuke Tanihara" }, { "name": "Hikaru Yamamoto" }, { "name": "Mitsuki Oishi" }, { "name": "Saki Kagami" }, { "name": "Meagan Good" }, { "name": "Odette Yustman" }, { "name": "Suh Jung" }, { "name": "Shim Ji Ho" }, { "name": "Oh Yoon Hong" }, { "name": "Sun Ok Hyun" }, { "name": "Naomie HarriRick Yune" }, { "name": "Rain" }, { "name": "Martina Gedeck" }, { "name": "Ulrich Mühe" }, { "name": "Ulrich Tukur" }, { "name": "Thomas Thieme" }, { "name": "Hans Uwe Bauer" }, { "name": "Peter Sellers" }, { "name": "Sterling Hayden" }, { "name": "Slim Pickens" }, { "name": "Peter Bull" }, { "name": "Keenan Wynn" }, { "name": "James Earl Jones" }, { "name": "Audrey Tatou" }, { "name": "Mathieu Kassovitz" }, { "name": "Rufus" }, { "name": "Rovella Cravota" }, { "name": "Paulette Goddard" }, { "name": "Henry Bergman" }, { "name": "Tiny Sandford" }, { "name": "Kirk Douglas" }, { "name": "Ralph Meeker" }, { "name": "Shelley Duvall" }, { "name": "Scatman Crothers" }, { "name": "Danny Lloyd" }, { "name": "Fairuza Balk" }, { "name": "Minako Komukai" }, { "name": "Shôhei Hino and Mari Komatsuzaki" }, { "name": "Jodie Fosternthony Heald" }, { "name": "Annette Bening" }, { "name": "Thora Birch" }, { "name": "Anthony Perkins" }, { "name": "Vera Miles" }, { "name": "John Gavin" }, { "name": "Janet Leigh" }, { "name": "James Stewart" }, { "name": "Grace Kelly" }, { "name": "Robin Wright Penn" }, { "name": "Gary Sinise" }, { "name": "Jo In sung" }, { "name": "Ju Jin mo" }, { "name": "Song Ji hyo" }, { "name": "Shim Ji ho" }, { "name": "Billy Dee Williams" }, { "name": "Anthony Daniels" }, { "name": "Harrison FordPaul Freeman" }, { "name": "Ronald Lacey" }, { "name": "Takashi Shimura" }, { "name": "Keiko Tsushima" }, { "name": "Frank Oz" }, { "name": "Christopher Lee" }, { "name": "Ingrid Berman" }, { "name": "James StewartLionel Barrymore" }, { "name": "Henry Travers" }, { "name": "Alec Guinness" }, { "name": "Peter Cushing" }, { "name": "Alain Cuny" }, { "name": "Sylvia Kristel" }, { "name": "Marika Green" }, { "name": "Daniel Sarky" }, { "name": "Jake Lloyd" }, { "name": "Lorraine Bracco" }, { "name": "Nhập Đạt Hoa" }, { "name": "Tằng Chí Vĩ" }, { "name": "Vương Bách Kiệt" }, { "name": "BreLý Liên Kiệt" }, { "name": "Lương Lạc Thi" }, { "name": "AmaMarcia DeBonis" }, { "name": "Gael García Bernal" }, { "name": "Giordano Formenti" }, { "name": "Bruce Lee" }, { "name": "Lý Tử Long" }, { "name": "Matt DamonBrian CoxMarton Csokas" }, { "name": "Tom Gallop" }, { "name": "Christina Hendricks Cardellini and Matthew Gray Gubler" }, { "name": "Danny Boylen" }, { "name": "Matt DamonChris Cooper" }, { "name": "Judy Parfitt" }, { "name": "Gabriel Mann" }, { "name": "Jackie ChaBilly Ray Cyrus" }, { "name": "Ekin Cheng Yee Kin" }, { "name": "Charlene Choi Cheuk Yin" }, { "name": "Bernice Jan Liu" }, { "name": "Tang Kin Wan" }, { "name": "Ronald Cheng Chung Kei" }, { "name": "Trần Vỹ" }, { "name": "Rumi Hiiragi" }, { "name": "Miyu Irino" }, { "name": "Mari Natsuki" }, { "name": "Takashi Naitō" }, { "name": "Yasuko Sawaguchi" }, { "name": "Daveigh Chase" }, { "name": "Jason Marsden" }, { "name": "Suzanne Pleshette" }, { "name": "David Ogden Stiers" }, { "name": "Susan Egan" }, { "name": "Bob Bergen" }, { "name": "Tara Strong" }, { "name": "RowaJohn Malkovich and Natalie Imbruglia" }, { "name": "Ben Browder Tapping và Christopher Judge" }, { "name": "Katie Featherstonnd Mark Fredrichs" }, { "name": "Vương Lực Hoành" }, { "name": "Từ Đông Mai" }, { "name": "Cynthia Khan Lai Ching (Dương Lệ Thanh)" }, { "name": "Michael Wong Man Tak (Vương Mẫn Đức)" }, { "name": "Donnie Yen Chi Tan" }, { "name": "Yuen Yat Chor" }, { "name": "Liu Kai Chi (Liêu Khải Trí)" }, { "name": "Lisa Chiao Chiao (Tiêu Giao)" }, { "name": "Yuen Shun Yee" }, { "name": "Song Ji Hyo" }, { "name": "Shin Yi" }, { "name": "Choi Sung Kook" }, { "name": "Channing TatumAdam Sevani" }, { "name": "Edison Cheng" }, { "name": "Amber Tamblyn" }, { "name": "Sarah Michelle Gellar" }, { "name": "Arielle Kebbel" }, { "name": "Marques Houston" }, { "name": "Omari Grandberry" }, { "name": "Jarell Houston" }, { "name": "DeMario Thornton" }, { "name": "Dreux Frederic" }, { "name": "Jennifer Freeman" }, { "name": "Lil' Kim" }, { "name": "Okina Megumi" }, { "name": "Ito Misaki" }, { "name": "Uehara Misa" }, { "name": "Ichikawa Yui" }, { "name": "Mekhi Phifer" }, { "name": "Lil' Romeo" }, { "name": "Missy Elliott" }, { "name": "Channing TatumDamaine Radcliff" }, { "name": "Olivia Thirlby" }, { "name": "Max Minghella" }, { "name": "Tony D'Amario" }, { "name": "Sam Shepard" }, { "name": "Briana Evigan" }, { "name": "Robert Hoffman" }, { "name": "Cassie Ventura" }, { "name": "Adam G. Sevani" }, { "name": "Telisha Shaw" }, { "name": "Heath Ledger" }, { "name": "Ed Asner" }, { "name": "Christopher Plummer" }, { "name": "Steve CarellMargo Dana Gaier" }, { "name": "Edith Elsie Fisher" }, { "name": "Agnes" }, { "name": "Tonny Jaa" }, { "name": "Prachya Piew" }, { "name": "Pete Postlethwaite" }, { "name": "Arliss Howard" }, { "name": "Laura Dern" }, { "name": "Trương Phong Nghị" }, { "name": "Ted Dibiaseble Wanamakok" }, { "name": "Téa Leoni" }, { "name": "Seong HyuCho Dong Hyuk" }, { "name": "Lee Chang Yong" }, { "name": "Tae hyun Cha" }, { "name": "Seok hyeon Wang" }, { "name": "Đồng Đại Vỹ" }, { "name": "Hà Gia Kính" }, { "name": "Phan Sương Sương" }, { "name": "Osric Chau" }, { "name": "Daming Chen" }, { "name": "Li Gong" }, { "name": "Kim Jae Won" }, { "name": "JoaRichard Gere" }, { "name": "Nat Chan" }, { "name": "Sharla Cheung" }, { "name": "Sandra Ng" }, { "name": "Sandra" }, { "name": "Quách Phú Thành (vai Bộ Kinh Vân) Trịnh Y Kiện (vai Nhiếp Phong)" }, { "name": "Ngô Mẫn Đạt" }, { "name": "Ray Lui" }, { "name": "Charles Heung" }, { "name": "Cheung Man" }, { "name": "Tan Lap Man" }, { "name": "Dougray Scott" }, { "name": "Thandie Newton" }, { "name": "Norman Tsui" }, { "name": "Lin Wei" }, { "name": "Celina Jade and Kara Hui" }, { "name": "Thích Ngọc Võ" }, { "name": "Khương Văn" }, { "name": "Jung Woon Taek" }, { "name": "Kim Sang Jung" }, { "name": "Tyrese" }, { "name": "Paddy Considine Aidan Gillen" }, { "name": "Trần Hàm Dư" }, { "name": "Trần Tiểu Sinh" }, { "name": "Phùng Thiệu Phong và An Chí Kiệt" }, { "name": "Phùng Tổ Minh" }, { "name": "Ryan Merriman" }, { "name": "Kris Lemche" }, { "name": "Jeremy Renner và Paula Patton" }, { "name": "Kimberly Corman" }, { "name": "Thomas Burker" }, { "name": "Krista Allennten" }, { "name": "Damien Marzette" }, { "name": "Trula M. Marcus" }, { "name": "Zachery Ty Bryan" }, { "name": "Kerr Smith" }, { "name": "Henry FoLee J Cobb" }, { "name": "EG Marshall" }, { "name": "Jack Klugman" }, { "name": "Eric Stoltz" }, { "name": "Từ Hy Viên" }, { "name": "Ngô Bội Từ" }, { "name": "Lâm Hy Lôi" }, { "name": "Nicholas D'Agosto" }, { "name": "Emma Bell" }, { "name": "David Koechner" }, { "name": "Nikolaj coster waldau" }, { "name": "Julie r." }, { "name": "Lgaard" }, { "name": "Aksel hennie" }, { "name": "Louise Fletcher" }, { "name": "Bob Gunton" }, { "name": "William Sadler" }, { "name": "Gil Bellows" }, { "name": "James Babson" }, { "name": "Laura Baranik" }, { "name": "Geoff Bell" }, { "name": "Matthew Blood Smyth" }, { "name": "Brian Caspe" }, { "name": "John Comer" }, { "name": "Mackenzie Crook" }, { "name": "Christian Dunckley Clark" }, { "name": "Patrick Hurd Wood" }, { "name": "Rachel Hurd Wood" }, { "name": "Park Hae Il" }, { "name": "Ryoo Seung Yong" }, { "name": "Kim Moo Yeol" }, { "name": "Park Ki Woong" }, { "name": "Otani Ryohei" }, { "name": "Katy Perry" }, { "name": "Jonathan Winters" }, { "name": "DeaBlane Cypurda and Tenika Davis" }, { "name": "Lí Liên Kiệt" }, { "name": "Quế Luân Mĩ" }, { "name": "Hoàng Thánh Y" }, { "name": "Khương Vũ" }, { "name": "Quách Thiện Ni" }, { "name": "Michelle Rodriguez and Bridget Moynahan" }, { "name": "Viva BiaPeter Docker" }, { "name": "Katie Findlay" }, { "name": "Jennifer Dale" }, { "name": "Alex Ozerov" }, { "name": "Lý Manh Manh" }, { "name": "Tống Ninh" }, { "name": "Chu Sở Sở" }, { "name": "Tôn Y Hàm" }, { "name": "Patrick Warburton" }, { "name": "Virginia Madsen" }, { "name": "Olivia DeJonge" }, { "name": "Ed Oxenbould" }, { "name": "Aleks Mikic" }, { "name": "Orla Brady" }, { "name": "Charlie Murphy" }, { "name": "Michael McElhatton" }, { "name": "Patrick Huard" }, { "name": "Colm Feore" }, { "name": "Erik Knudsen" }, { "name": "Sarah Jeanne Labrosse" }, { "name": "Lucie Laurier" }, { "name": "Hỏa Tịnh Nam" }, { "name": "Phan Gia Tuấn" }, { "name": "Vương Uy" }, { "name": "Cameron Monaghan" }, { "name": "Sairi Itoh" }, { "name": "Âu Hào" }, { "name": "Âu Dương Na Na" }, { "name": "Trần Phi Vũ" }, { "name": "Âu Thành Hàng" }, { "name": "Trâu Nguyên Thanh" }, { "name": "Anthony Chau Sang Wong" }, { "name": "Pakho Chow" }, { "name": "Thượng Tư Kỳ" }, { "name": "Vinh Khuê" }, { "name": "Frank Whaley" }, { "name": "Tommy Wiseau" }, { "name": "Candy Clark" }, { "name": "Lý Thuần" }, { "name": "Vạn Tây" }, { "name": "April Billingsley" }, { "name": "Juan Gaspard" }, { "name": "Từ Lộ" }, { "name": "Bành Dục Sướng" }, { "name": "Lưu Vịnh Hi" }, { "name": "Lý Nặc" }, { "name": "Bill Skarsgård" }, { "name": "Suki Waterhouse" }, { "name": "Jayda Fink" }, { "name": "Catherine Tate" }, { "name": "Ethan Rouse" }, { "name": "Felipe Calero" }, { "name": "Juan Sebastián Calero" }, { "name": "Evan Rachel Wood" }, { "name": "Elijah Kelley" }, { "name": "Tằng Mộng Tuyết" }, { "name": "Thần Diệc Nho" }, { "name": "Freddie Thorp" }, { "name": "Mary" }, { "name": "Lưu Sở Điềm" }, { "name": "Tê Tê Lợi" }, { "name": "Kari Matchett" }, { "name": "Hồng Sĩ Nhã" }, { "name": "Ma Nguyệt" }, { "name": "Suzu Hirose" }, { "name": "Hirona Yamazaki" }, { "name": "Haruka Fukuhara" }, { "name": "Mackenyu" }, { "name": "Miu Tomita" }, { "name": "Ayami Nakajo" }, { "name": "Anna Faris" }, { "name": "Martin Shaw" }, { "name": "Ben Turner" }, { "name": "Châu Tử Long" }, { "name": "Hà Văn Huy" }, { "name": "Taishi Nakagawa" }, { "name": "Yuzo Asahara" }, { "name": "Ye Sung" }, { "name": "Elisabeth Röhm" }, { "name": "Sherilyn Fenn" }, { "name": "Tô Đồng" }, { "name": "Bì Dật Gia" }, { "name": "Lý Lạc" }, { "name": "Viktor Andrienko" }, { "name": "Kate Bristol" }, { "name": "Allen Enlow" }, { "name": "Dominic Sherwood" }, { "name": "Drea de Matteo" }, { "name": "Cary Elwes" }, { "name": "Alex Rocco" }, { "name": "Jill Hennessy" }, { "name": "Andrew Caldwell" }, { "name": "Jennifer Tilly" }, { "name": "Brad Dourif" }, { "name": "Christine Elise" }, { "name": "Fiona Dourif" }, { "name": "Alex Vincent" }, { "name": "Summer H. Howell" }, { "name": "Song Joong Ki" }, { "name": "Finn Wolfhard" }, { "name": "Nicholas Hamilton" }, { "name": "Margie Rasri Balenciaga" }, { "name": "Toni Rakkaen" }, { "name": "Maythinee Booranasiri" }, { "name": "Bawriboon Chanreuang" }, { "name": "Rodrigo De la Serna" }, { "name": "Ben Cura" }, { "name": "Claire Holt" }, { "name": "Phoeung Kompheak" }, { "name": "Sareum Srey Moch" }, { "name": "Sveng Socheata" }, { "name": "Amy Louise Wilson" }, { "name": "Bérénice Marlohe" }, { "name": "Mew Nittha Jirayungyurn" }, { "name": "Naphat Siangsomboon" }, { "name": "Ter Chantavit" }, { "name": "Abbey Lee" }, { "name": "Ronnie Alonte" }, { "name": "Janella Salvador" }, { "name": "Elmo Magalona" }, { "name": "Sofia Andres" }, { "name": "Diego Loyzaga" }, { "name": "Charlotte Rampling" }, { "name": "Harriet Walter" }, { "name": "Seung heon Song" }, { "name": "David Roberts" }, { "name": "Joanne Samuel" }, { "name": "Rowland Holmes" }, { "name": "Jordan Dulieu" }, { "name": "Teo Briones" }, { "name": "Eric Lange" }, { "name": "Kelsey Asbille" }, { "name": "Martin Donovan" }, { "name": "Jordana Largy" }, { "name": "Matt Ellis" }, { "name": "Evelyne Brochu" }, { "name": "Henry Ian Cusick" }, { "name": "Holliday Grainger" }, { "name": "David Hasselhoff" }, { "name": "Rhys Darby" }, { "name": "Rebecca Olejniczak" }, { "name": "Melanie Brown" }, { "name": "James Landry Hébert" }, { "name": "Scout Taylor Compton" }, { "name": "Mark Boone Junior" }, { "name": "Russell Geoffrey Banks" }, { "name": "Elana Krausz" }, { "name": "Trương Thiên Ái" }, { "name": "Matthew Mercer" }, { "name": "Eiza González" }, { "name": "Hồng Thiên Minh" }, { "name": "Tự Vạn Xuyến" }, { "name": "Allison Tolman" }, { "name": "Bobby Moynihan" }, { "name": "Hannah Simone" }, { "name": "Taran Killam" }, { "name": "Marwan Kenzari" }, { "name": "Tomiwa Edun" }, { "name": "Sae Okazaki" }, { "name": "Colton Haynes" }, { "name": "Jillian Bell" }, { "name": "Dana Gourrier" }, { "name": "Sage Correa" }, { "name": "Malea Rose" }, { "name": "Saxon Sharbino" }, { "name": "Bonnie Morgan" }, { "name": "Alexis G. Zall" }, { "name": "Brandon Soo Hoo" }, { "name": "Jordan Essoe" }, { "name": "Burlee Vang" }, { "name": "Aya Hirano" }, { "name": "Mai Nakahara" }, { "name": "Yûichi Nakamura" }, { "name": "Wataru Hatano" }, { "name": "Yui Horie" }, { "name": "Lưu Đào" }, { "name": "Qianyuan Wang" }, { "name": "Thomas Middleditch" }, { "name": "Christopher Abbott" }, { "name": "Elodie Yung" }, { "name": "Nathan Brewer" }, { "name": "Jay Hieron" }, { "name": "Florence Pugh" }, { "name": "Cosmo Jarvis" }, { "name": "Paul Hilton" }, { "name": "Seo Hyun Ahn" }, { "name": "SEO KYEONG SOOK" }, { "name": "PARK CHUL SOO" }, { "name": "Terry Notary" }, { "name": "Karin Konoval" }, { "name": "Amiah Miller" }, { "name": "Lakeith Stanfield" }, { "name": "Ville Virtanen" }, { "name": "Antti Holma" }, { "name": "Mikko Neuvonen" }, { "name": "Malin Buska" }, { "name": "Outi Mäenpää" }, { "name": "Cung Le" }, { "name": "Chad Lindberg" }, { "name": "Liam McIntyre" }, { "name": "Trịnh Sảng" }, { "name": "Tanaka Mayumi" }, { "name": "Yamaguchi Kappei" }, { "name": "Hiroaki Hirata" }, { "name": "Shūichi Ikeda" }, { "name": "DeRay Davis" }, { "name": "CLAUDIA KIM" }, { "name": "Sulli" }, { "name": "Kang Han Na" }, { "name": "Choi Ri" }, { "name": "Son Sook" }, { "name": "Seo Mi Ji" }, { "name": "Sung Joon" }, { "name": "Kim Seo Hyung" }, { "name": "Đàm Húc" }, { "name": "Chiêm Mục" }, { "name": "Radha Mitchell" }, { "name": "David Mazouz" }, { "name": "Riley Wang" }, { "name": "Artemis" }, { "name": "Ramón Rodríguez" }, { "name": "Celina Jade" }, { "name": "Oleg Prudius" }, { "name": "Trương Gia Nghê" }, { "name": "Thái Nghi Đạt" }, { "name": "Lý Tịnh Dương" }, { "name": "Mã Linh" }, { "name": "Jacob Latimore" }, { "name": "Dulé Hill" }, { "name": "Storm Reid" }, { "name": "Trey Parker" }, { "name": "Jessica McNamee" }, { "name": "Tracy Morgan" }, { "name": "Diệp Chân" }, { "name": "Trần Trạch Vũ" }, { "name": "Hồ Dục Hâm" }, { "name": "Trịch Dật Tường" }, { "name": "Tần Vũ Ca" }, { "name": "Hàn Nghệ Hinh" }, { "name": "SAM JAEGER" }, { "name": "Kyra Zagorsky" }, { "name": "Ty Shelton" }, { "name": "Maeve Dermody" }, { "name": "Sam Reid" }, { "name": "Peter Cullen" }, { "name": "Patton Oswalt" }, { "name": "Dương Tử San" }, { "name": "Hứa Vỹ Ninh" }, { "name": "Cynthia Gibb" }, { "name": "Alexis Lariviere" }, { "name": "Lim Jung Eun" }, { "name": "Jung Han Yong" }, { "name": "Jung Ae Ri" }, { "name": "Ngô Đông Ni" }, { "name": "Vương Dã" }, { "name": "Diane Farr" }, { "name": "Nora Jane Noone" }, { "name": "Gwyneth Paltrow" }, { "name": "Jacob Batalon" }, { "name": "Gillian Chung" }, { "name": "Jiong He" }, { "name": "Elena Anaya" }, { "name": "Saïd Taghmaoui" }, { "name": "Jace Norman" }, { "name": "Ngô Trác Hy" }, { "name": "Alan Arkin" }, { "name": "Matt Dillon" }, { "name": "Ann Margret" }, { "name": "Gina Gershon" }, { "name": "Nicky Whelan" }, { "name": "Darin De Paul" }, { "name": "Erin Cahill" }, { "name": "Orion Acaba" }, { "name": "Mario Espitia" }, { "name": "Valene Kane" }, { "name": "Marcela Mar" }, { "name": "Sha Xuezhou" }, { "name": "Zheng Shuang" }, { "name": "Robbie Daymond" }, { "name": "Ryan Bartley" }, { "name": "Yu Aoi" }, { "name": "Shido Nakamura" }, { "name": "Takashi Sorimachi" }, { "name": "Trương Ngọc Ánh" }, { "name": "Quốc Khánh" }, { "name": "Nguyễn Thu Trang" }, { "name": "Trần Thiên Tú" }, { "name": "Đỗ Thu Hằng" }, { "name": "Garance Marillier" }, { "name": "Ella Rumpf" }, { "name": "Rabah Nait Oufella" }, { "name": "Adah Sharma" }, { "name": "Esha Gupta" }, { "name": "Takahiro Sakurai" }, { "name": "Mahesh Jadu" }, { "name": "Jai Courtney" }, { "name": "Loïs van Wijk" }, { "name": "Karin Leclercq" }, { "name": "Anton Lesser" }, { "name": "Suet Lam" }, { "name": "Jing Li" }, { "name": "Yunjin Cao" }, { "name": "Blayne Weaver" }, { "name": "Lyndie Greenwood" }, { "name": "Billy Crudup" }, { "name": "Elijah Wolf" }, { "name": "Logan Gillies" }, { "name": "Ben Skelton" }, { "name": "Aiden Haggarty" }, { "name": "Lu Xin" }, { "name": "Daniel Boileau" }, { "name": "Martin Cummins" }, { "name": "Phan Bân Long" }, { "name": "Mr Bean" }, { "name": "Diệp Tiểu Khai" }, { "name": "Chu Lệ Lam" }, { "name": "Trương Nghệ Tuyên" }, { "name": "Tề Lân" }, { "name": "Tim Griffin" }, { "name": "Eion Bailey" }, { "name": "Bethany Joy Lenz" }, { "name": "Barkhad Abdi" }, { "name": "Hoàng Hiên" }, { "name": "Hiroaki Iwanaga" }, { "name": "Takahiro Fujiwara" }, { "name": "Christian Gaul" }, { "name": "Nicolette Krebitz" }, { "name": "Tilman Dobler" }, { "name": "Maria Conchita Alonso" }, { "name": "John Magaro" }, { "name": "Carrie Keranen" }, { "name": "Denise Richards" }, { "name": "Jonathan Lipnicki" }, { "name": "Gaspard Schlatter" }, { "name": "Sixtine Murat" }, { "name": "Paulin Jaccoud" }, { "name": "Michel Vuillermoz" }, { "name": "Raul Ribera" }, { "name": "Max Riemelt" }, { "name": "Cem Tuncay" }, { "name": "Lucie Aron" }, { "name": "Matthias Habich" }, { "name": "Marine Vacth" }, { "name": "Géraldine Pailhas" }, { "name": "Frédéric Pierrot" }, { "name": "Fantin Ravat" }, { "name": "Martin Compston" }, { "name": "Amariah Olson" }, { "name": "Jonathan Rhys Meyers" }, { "name": "Obin Olson" }, { "name": "Liu Naping" }, { "name": "Nelson Li" }, { "name": "Waise Lee" }, { "name": "Halston Sage" }, { "name": "Elena Kampouris" }, { "name": "Tony Shalhoub" }, { "name": "Shannon Elizabeth" }, { "name": "Embeth Davidtz" }, { "name": "Jung Man sik" }, { "name": "Hyo jin Kong" }, { "name": "Ji won Uhm" }, { "name": "Joon Go" }, { "name": "Giả Nãi Lượng" }, { "name": "Lý Tiểu Lộ" }, { "name": "Vương Tấn" }, { "name": "Patrick Baladi" }, { "name": "Ben Batt" }, { "name": "Charlotte Beaumont" }, { "name": "Nacho Vigalondo" }, { "name": "Larry Fessenden" }, { "name": "James Le Gros" }, { "name": "John Speredakos" }, { "name": "Phùng Văn Quyên" }, { "name": "Eddie Izzard" }, { "name": "Mckenna Grace" }, { "name": "Lindsay Duncan" }, { "name": "Spencer Grammer" }, { "name": "Louane Emera" }, { "name": "Vincent Lacoste" }, { "name": "Ramzy Bedia" }, { "name": "Trịnh Tháp Cương" }, { "name": "Lại Nhã Nghiên" }, { "name": "Hoàng Viễn" }, { "name": "Teri Reeves" }, { "name": "Sherri Eakin" }, { "name": "Aiden Longworth" }, { "name": "Grace Van Patten" }, { "name": "Michal Vondel" }, { "name": "Alina Babak" }, { "name": "Valeriya Dmitrieva" }, { "name": "Jeong Seo yoon" }, { "name": "Jeon Hyeon soo" }, { "name": "Julian Barratt" }, { "name": "Marko Zaror" }, { "name": "Juju Chan" }, { "name": "Kirsty Averton" }, { "name": "Nicky Henson" }, { "name": "Emma Davies" }, { "name": "Glen Powell" }, { "name": "Kanta Sato" }, { "name": "Reina Visa" }, { "name": "Takanori Jinnai" }, { "name": "Hidehiko Ishizuka" }, { "name": "Hikari Ishida" }, { "name": "Shimon Okura" }, { "name": "Nonoka Yamaguchi" }, { "name": "Atsuki Tomori" }, { "name": "Trình Dục" }, { "name": "Nguyên Thu" }, { "name": "Vyacheslav Chepurchenko" }, { "name": "Aleksandra Rebenok" }, { "name": "Aaron Poole" }, { "name": "Kenneth Welsh" }, { "name": "Đường Yên" }, { "name": "Bạch Băng" }, { "name": "Jung Yong Hwa" }, { "name": "Cát Ưu" }, { "name": "Will Dalton" }, { "name": "Phượng Tiểu Nhạc" }, { "name": "Lưu Bội Kỳ" }, { "name": "Ha Joo Hee" }, { "name": "Hong Seok Cheon" }, { "name": "Sonakshi Sinha" }, { "name": "Tahir Raj Bhasin" }, { "name": "Kim Hong Fa" }, { "name": "Callan McAuliffe" }, { "name": "Lý Xán Sâm" }, { "name": "Trần Dĩ Mạn" }, { "name": "Jordan Alex" }, { "name": "James Tyler Brown" }, { "name": "Martin Byrne" }, { "name": "Jared Colson" }, { "name": "Yoon So Yi" }, { "name": "Kim Hyuk" }, { "name": "Nick Swardson" }, { "name": "Jennifer Hudson" }, { "name": "Colin Quinn" }, { "name": "Jackie Sandler" }, { "name": "David Denman" }, { "name": "Naomi Scott" }, { "name": "Bradley Whitford" }, { "name": "Allison Williams" }, { "name": "Ken'ichi Matsuyama" }, { "name": "Kitu Gidwani" }, { "name": "Jasmeet Singh Bhatia" }, { "name": "Allegra Masters" }, { "name": "Aimee McKay" }, { "name": "Ashley Key" }, { "name": "Autumn Federici" }, { "name": "Bill Lewis" }, { "name": "TaoTsuchiya" }, { "name": "RyumaTakeuchi" }, { "name": "ShonoHayama" }, { "name": "MiraiShida" }, { "name": "ArataHorii" }, { "name": "FujikoKojima" }, { "name": "AiriMatsui" }, { "name": "YunaTaira" }, { "name": "YukiYamada" }, { "name": "JuriUeno" }, { "name": "EriIkeda" }, { "name": "Cổ Lực Na Trát" }, { "name": "Clara" }, { "name": "Yan Ni" }, { "name": "Joe Cheng" }, { "name": "Kyoko Yoshine" }, { "name": "Teruyuki Kagawa" }, { "name": "Kenichi Endo" }, { "name": "Hitori Gekidan" }, { "name": "Toshiaki Karasawa" }, { "name": "Montage Live Action" }, { "name": "Hổ Hổ" }, { "name": "Mã Mộng Kiều" }, { "name": "Nhan Đan" }, { "name": "Oguri Shun" }, { "name": "Nomura Shuhei" }, { "name": "Ono Machiko" }, { "name": "Maruyama Tomomi" }, { "name": "Nick Offerman" }, { "name": "John Carroll Lynch" }, { "name": "Peter O'toole" }, { "name": "Armand Assante" }, { "name": "Olivier Gruner" }, { "name": "Samantha Barks" }, { "name": "Maddie Ziegler" }, { "name": "Gemma Chan" }, { "name": "Wren Walker" }, { "name": "Caz Odin Darko" }, { "name": "Madison J. Loos" }, { "name": "Dan Green" }, { "name": "Rina Endo" }, { "name": "Kenjirô Tsuda" }, { "name": "Peyton Meyer" }, { "name": "Crystal the Monkey" }, { "name": "Cửu Khổng" }, { "name": "Hoàng Nhất Lâm" }, { "name": "Don Johnson" }, { "name": "Anna Hutchison" }, { "name": "Talitha Bateman" }, { "name": "Lữ Vũ" }, { "name": "Hàn Giai Lam" }, { "name": "Gong Hyo Jin" }, { "name": "Sohee" }, { "name": "Charles Shaughnessy" }, { "name": "Damon Dayoub" }, { "name": "Adrian Schiller" }, { "name": "Lục Tiểu Linh Đồng" }, { "name": "Vikramjeet Virk" }, { "name": "Tatiana Maslany" }, { "name": "Tom Cullen" }, { "name": "Henry Czerny" }, { "name": "Diana Bentley" }, { "name": "Mark Rendall" }, { "name": "Aaron Costa Ganis" }, { "name": "Monica West" }, { "name": "Christopher Redman" }, { "name": "Jenny Sterlin" }, { "name": "Michael Benyaer" }, { "name": "Paulino Partida" }, { "name": "Ji Chang Wook" }, { "name": "Ahn Jae Hong" }, { "name": "Dương Dương" }, { "name": "Vernon Wells" }, { "name": "Matthew Willig" }, { "name": "Costas Mandylor" }, { "name": "Peter DaCunha" }, { "name": "Natalie Brown" }, { "name": "Jonathan Watton" }, { "name": "Peyton Kennedy" }, { "name": "Amy Johnston" }, { "name": "Muriel Hofmann" }, { "name": "Jenny Wu" }, { "name": "Kristina Klebe" }, { "name": "Elissa Dowling" }, { "name": "Erika Kaar" }, { "name": "Saurabh Shukla" }, { "name": "Anna Dawson" }, { "name": "Michaela Longden" }, { "name": "Daniel Thrace" }, { "name": "Gregg Sulkin" }, { "name": "Garrett Clayton" }, { "name": "Bella Dayne" }, { "name": "Jack Brett Anderson" }, { "name": "Dominic Monaghan" }, { "name": "Jennette McCurdy" }, { "name": "Ksenia Solo" }, { "name": "Da'Vone McDonald" }, { "name": "Nathan Parsons" }, { "name": "IRINA STARSHENBAUM" }, { "name": "ALEXANDER PETROV" }, { "name": "RINAL MUKHAMETOV" }, { "name": "OLEG MENSHIKOV" }, { "name": "COLONEL LEBEDEV" }, { "name": "SERGEY GARMASH" }, { "name": "VICE PRIME MINISTER" }, { "name": "NIKITA KUKUSHKIN" }, { "name": "Will Townsend" }, { "name": "Melissa Sturm" }, { "name": "Trevor Devall" }, { "name": "Lee Jun Ki" }, { "name": "Caitlin Gerard" }, { "name": "Yoona" }, { "name": "Kim Joo hyuk" }, { "name": "Yoo Hae jin" }, { "name": "Haylie Duff" }, { "name": "Norm MacDonald" }, { "name": "Gang Dong Won" }, { "name": "Shin Eun Soo" }, { "name": "Ivan Yankovskiy" }, { "name": "Leonid Yarmolnik" }, { "name": "Lyubov Aksyonova" }, { "name": "Stephen Merchant" }, { "name": "Dafne Keen" }, { "name": "Elizabeth Rodriguez" }, { "name": "Lois Robbins" }, { "name": "Vương Thủy Lâm" }, { "name": "Clint Dyer" }, { "name": "Kasumi Arimura" }, { "name": "Kaoru Kobayashi" }, { "name": "Asuka Kudo" }, { "name": "Ken Mitsuishi" }, { "name": "Melanie Lynskey" }, { "name": "Chris Doubek" }, { "name": "Marilyn Faith Hickey" }, { "name": "Jared Roylance" }, { "name": "Rachael Taylor" }, { "name": "Robbie Amell" }, { "name": "Amy Ryan" }, { "name": "Rob Lowe" }, { "name": "Miranda Richardson" }, { "name": "Rory Kinnear" }, { "name": "Shariff Earp" }, { "name": "Duan Sanderson" }, { "name": "Angelique Rivera" }, { "name": "Cameron Jebo" }, { "name": "Kenny Johnson" }, { "name": "Chris Sullivan" }, { "name": "Guillermo Romero" }, { "name": "José Mota" }, { "name": "Kaiwi Lyman Mersereau" }, { "name": "Leo Staar" }, { "name": "Shaun Dingwall" }, { "name": "Brian Austin Green" }, { "name": "Sunny Pawar" }, { "name": "Abhishek Bharate" }, { "name": "Priyanka Bose" }, { "name": "Tannishtha Chatterjee" }, { "name": "Vương Khải" }, { "name": "Garik Kharlamov" }, { "name": "Ivan Okhlobystin" }, { "name": "Chun Jung Myung" }, { "name": "Yoon So Hee" }, { "name": "Chen Bolin" }, { "name": "Song Min Jung" }, { "name": "Jung Hae Kyun" }, { "name": "Matt Ryan" }, { "name": "Ray Chase" }, { "name": "Roger Cross" }, { "name": "Chris Jai Alex" }, { "name": "Saori Hayami" }, { "name": "Vương Tuấn Khải" }, { "name": "Lộc Hàm" }, { "name": "Jung Jin Young" }, { "name": "Maksim Abrosimov" }, { "name": "Sergey Agafonov" }, { "name": "Maksim Belborodov" }, { "name": "Aishwarya Rai Bachchan" }, { "name": "Aimee Teegarden" }, { "name": "Laura Wiggins" }, { "name": "Johnny Galecki" }, { "name": "Lê Diệu Tường" }, { "name": "Trương Triệu Huy" }, { "name": "Byun Yo Han" }, { "name": "Kim Hyun Seok" }, { "name": "Kim Yoo Jung" }, { "name": "Melissa Benoist" }, { "name": "Rachel Brosnahan" }, { "name": "Dư An An" }, { "name": "Thái Hạn Ức" }, { "name": "Zhi Hui Chen" }, { "name": "Hao Ran Sun" }, { "name": "Mou Li" }, { "name": "Joo Ji Hoon" }, { "name": "Lim Ji Yeon" }, { "name": "Cheo Ho Jin" }, { "name": "Alan Tudyk" }, { "name": "Jerry Lewis" }, { "name": "Kara Tointon" }, { "name": "Elizabeth Morris" }, { "name": "Uriah Shelton" }, { "name": "Dakota Daulby" }, { "name": "Byron Gibson" }, { "name": "Joel Adrian" }, { "name": "Svitlana Zavialova" }, { "name": "Henry Mah" }, { "name": "Lydia Hull" }, { "name": "Jo Jung seok" }, { "name": "Jade Tailor" }, { "name": "Tommy Flanagan" }, { "name": "Glenn Close" }, { "name": "Dominique Tipper" }, { "name": "Hoài Linh" }, { "name": "Hoài Lâm" }, { "name": "Việt Hương" }, { "name": "Ngô Kiến Huy" }, { "name": "Ái Phương" }, { "name": "Yu Dương" }, { "name": "Khả Như" }, { "name": "Cát Tường" }, { "name": "ca sĩ Lâm Chấn Khang" }, { "name": "nghệ sĩ hải ngoại Bảo Chung" }, { "name": "nghệ sĩ hài Hứa Minh Đạt" }, { "name": "nghệ sĩ hài Tấn Bo Tấn Bin" }, { "name": "diễn viên điện ảnh / ca sĩ Kim Jun See" }, { "name": "diễn viên điện ảnh Kiều Tuấn" }, { "name": "nghệ sĩ Hoa Trần" }, { "name": "Duy Khánh Zhou Zhou" }, { "name": "Trần Xuân Tiến" }, { "name": "Dũng Minhon" }, { "name": "Ngọc Tâm Anh" }, { "name": "Nguyên Đạt" }, { "name": "Oris Phạm" }, { "name": "Sally Trần" }, { "name": "bé Bích Châu" }, { "name": "Nguyễn Tiến" }, { "name": "Kim Nguyễn" }, { "name": "cùng tập thể anh em Khang Mã Địa" }, { "name": "Manu Bennett" }, { "name": "Mạch Trường Thanh" }, { "name": "Sầm Lệ Hương" }, { "name": "Dương Tư Kỳ" }, { "name": "Trịnh Hân Nghi" }, { "name": "Aaron Behr" }, { "name": "John Colella" }, { "name": "Jun Cao" }, { "name": "Mei Ying Wang" }, { "name": "Tôn kiên" }, { "name": "Yousef Erakat" }, { "name": "Lele Pons" }, { "name": "Justin Dobies" }, { "name": "Anton Vinogradov" }, { "name": "Vadim Bochanov" }, { "name": "Sergey Mardar" }, { "name": "Griffin Gluck" }, { "name": "Thomas Barbusca" }, { "name": "Tạ Đình Đình" }, { "name": "Vương Phi" }, { "name": "Zijian Dong" }, { "name": "Cherry Ngan" }, { "name": "Stacy Martin" }, { "name": "Violleta Getmanskaya" }, { "name": "Vadim Tsallati" }, { "name": "Andrey Chadov" }, { "name": "Rila Fukushima" }, { "name": "Michael Pitt" }, { "name": "Parkinson" }, { "name": "George Takei" }, { "name": "Lulu Wilson" }, { "name": "Lisa Kudrow" }, { "name": "Edgar Ramírez" }, { "name": "Usher Raymond" }, { "name": "Osamu Adachi" }, { "name": "Hirofumi Arai" }, { "name": "Narushi Ikeda" }, { "name": "Steve Lantz" }, { "name": "Lisa Eichhorn" }, { "name": "Angela Dixon" }, { "name": "Nigel Whitmey" }, { "name": "Gil Birmingham" }, { "name": "Thái Thiếu Phân" }, { "name": "Robert LaSardo" }, { "name": "Sara Fabel" }, { "name": "Jordan James Smith" }, { "name": "Arak Amornsupasiri" }, { "name": "Pachrapa Chaichua" }, { "name": "Auli’i Cravalho" }, { "name": "Alondra Hidalgo" }, { "name": "Alistair Abell" }, { "name": "Iris Apatow" }, { "name": "Sugar Lyn Beard" }, { "name": "Ian James Corlett" }, { "name": "Michael Daingerfield" }, { "name": "Brian Dobson" }, { "name": "Evan Jonigkeit" }, { "name": "Richard Kind" }, { "name": "David Zayas" }, { "name": "Stef Dawson" }, { "name": "Ashlie Atkinson" }, { "name": "Amy Landecker" }, { "name": "Virginia Gardner" }, { "name": "Tracy Letts" }, { "name": "Penelope Wilton" }, { "name": "Ruby Barnhill" }];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable prettier/prettier */
exports.default = [{ name: 'Afghanistan', code: 'AF' }, { name: 'Åland Islands', code: 'AX' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' }, { name: 'American Samoa', code: 'AS' }, { name: 'AndorrA', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Anguilla', code: 'AI' }, { name: 'Antarctica', code: 'AQ' }, { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' }, { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Bouvet Island', code: 'BV' }, { name: 'Brazil', code: 'BR' }, { name: 'British Indian Ocean Territory', code: 'IO' }, { name: 'Brunei Darussalam', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' }, { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' }, { name: 'Cayman Islands', code: 'KY' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' }, { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' }, { name: 'Christmas Island', code: 'CX' }, { name: 'Cocos (Keeling) Islands', code: 'CC' }, { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' }, { name: 'Congo, The Democratic Republic of the', code: 'CD' }, { name: 'Cook Islands', code: 'CK' }, { name: 'Costa Rica', code: 'CR' }, { name: 'Cote D\'Ivoire', code: 'CI' }, { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' }, { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' }, { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' }, { name: 'El Salvador', code: 'SV' }, { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Falkland Islands (Malvinas)', code: 'FK' }, { name: 'Faroe Islands', code: 'FO' }, { name: 'Fiji', code: 'FJ' }, { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'French Guiana', code: 'GF' }, { name: 'French Polynesia', code: 'PF' }, { name: 'French Southern Territories', code: 'TF' }, { name: 'Gabon', code: 'GA' }, { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' }, { name: 'Ghana', code: 'GH' }, { name: 'Gibraltar', code: 'GI' }, { name: 'Greece', code: 'GR' }, { name: 'Greenland', code: 'GL' }, { name: 'Grenada', code: 'GD' }, { name: 'Guadeloupe', code: 'GP' }, { name: 'Guam', code: 'GU' }, { name: 'Guatemala', code: 'GT' }, { name: 'Guernsey', code: 'GG' }, { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Heard Island and Mcdonald Islands', code: 'HM' }, { name: 'Holy See (Vatican City State)', code: 'VA' }, { name: 'Honduras', code: 'HN' }, { name: 'Hong Kong', code: 'HK' }, { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Iran, Islamic Republic Of', code: 'IR' }, { name: 'Iraq', code: 'IQ' }, { name: 'Ireland', code: 'IE' }, { name: 'Isle of Man', code: 'IM' }, { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' }, { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jersey', code: 'JE' }, { name: 'Jordan', code: 'JO' }, { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kiribati', code: 'KI' }, { name: 'Korea, Democratic People\'S Republic of', code: 'KP' }, { name: 'Korea, Republic of', code: 'KR' }, { name: 'Kuwait', code: 'KW' }, { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Lao People\'S Democratic Republic', code: 'LA' }, { name: 'Latvia', code: 'LV' }, { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' }, { name: 'Liberia', code: 'LR' }, { name: 'Libyan Arab Jamahiriya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' }, { name: 'Macao', code: 'MO' }, { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' }, { name: 'Madagascar', code: 'MG' }, { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' }, { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Marshall Islands', code: 'MH' }, { name: 'Martinique', code: 'MQ' }, { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' }, { name: 'Mayotte', code: 'YT' }, { name: 'Mexico', code: 'MX' }, { name: 'Micronesia, Federated States of', code: 'FM' }, { name: 'Moldova, Republic of', code: 'MD' }, { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' }, { name: 'Montserrat', code: 'MS' }, { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' }, { name: 'Namibia', code: 'NA' }, { name: 'Nauru', code: 'NR' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' }, { name: 'Netherlands Antilles', code: 'AN' }, { name: 'New Caledonia', code: 'NC' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' }, { name: 'Nigeria', code: 'NG' }, { name: 'Niue', code: 'NU' }, { name: 'Norfolk Island', code: 'NF' }, { name: 'Northern Mariana Islands', code: 'MP' }, { name: 'Norway', code: 'NO' }, { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' }, { name: 'Palau', code: 'PW' }, { name: 'Palestinian Territory, Occupied', code: 'PS' }, { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' }, { name: 'Philippines', code: 'PH' }, { name: 'Pitcairn', code: 'PN' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' }, { name: 'Puerto Rico', code: 'PR' }, { name: 'Qatar', code: 'QA' }, { name: 'Reunion', code: 'RE' }, { name: 'Romania', code: 'RO' }, { name: 'Russian Federation', code: 'RU' }, { name: 'RWANDA', code: 'RW' }, { name: 'Saint Helena', code: 'SH' }, { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' }, { name: 'Saint Pierre and Miquelon', code: 'PM' }, { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Samoa', code: 'WS' }, { name: 'San Marino', code: 'SM' }, { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' }, { name: 'Serbia and Montenegro', code: 'CS' }, { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' }, { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' }, { name: 'South Georgia and the South Sandwich Islands', code: 'GS' }, { name: 'Spain', code: 'ES' }, { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' }, { name: 'Svalbard and Jan Mayen', code: 'SJ' }, { name: 'Swaziland', code: 'SZ' }, { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syrian Arab Republic', code: 'SY' }, { name: 'Taiwan, Province of China', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania, United Republic of', code: 'TZ' }, { name: 'Thailand', code: 'TH' }, { name: 'Timor-Leste', code: 'TL' }, { name: 'Togo', code: 'TG' }, { name: 'Tokelau', code: 'TK' }, { name: 'Tonga', code: 'TO' }, { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' }, { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' }, { name: 'Turks and Caicos Islands', code: 'TC' }, { name: 'Tuvalu', code: 'TV' }, { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' }, { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' }, { name: 'United States Minor Outlying Islands', code: 'UM' }, { name: 'Uruguay', code: 'UY' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vanuatu', code: 'VU' }, { name: 'Venezuela', code: 'VE' }, { name: 'Viet Nam', code: 'VN' }, { name: 'Virgin Islands, British', code: 'VG' }, { name: 'Virgin Islands, U.S.', code: 'VI' }, { name: 'Wallis and Futuna', code: 'WF' }, { name: 'Western Sahara', code: 'EH' }, { name: 'Yemen', code: 'YE' }, { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' }];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = [{ name: 'Hài Hước' }, { name: 'Viễn Tưởng' }, { name: 'Hành Động' }, { name: 'Phiêu Lưu' }, { name: 'Tâm Lý' }, { name: 'Hình Sự' }, { name: 'Kinh Dị' }, { name: 'Điện Ảnh' }, { name: 'Âm Nhạc' }, { name: 'Khoa học Tài liệu' }, { name: 'Võ Thuật' }, { name: 'Chiến Tranh' }, { name: 'Hoạt Hình' }, { name: 'Thần Thoại' }, { name: 'Cổ Trang' }, { name: 'Thuyết Minh' }, { name: 'Thiếu nhi' }, { name: 'Hài Việt' }, { name: 'TV Show' }];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUser = getUser;

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _jsonwebtoken = __webpack_require__(36);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = __webpack_require__(24);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getActorsStats = getActorsStats;
exports.getActors = getActors;
exports.getActorById = getActorById;
exports.createActor = createActor;
exports.updateActor = updateActor;
exports.deleteActor = deleteActor;

var _actorModel = __webpack_require__(50);

var _actorModel2 = _interopRequireDefault(_actorModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _actorUtil = __webpack_require__(52);

var util = _interopRequireWildcard(_actorUtil);

var _actors = __webpack_require__(45);

var _actors2 = _interopRequireDefault(_actors);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group actors - Operations about actors
 *
 */

exports.default = async function initActors(req, res, next) {
	try {
		await _actorModel2.default.deleteMany();
		await _actorModel2.default.insertMany(_actors2.default);
		res.actors = _actors2.default;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
};

async function getActorsStats(req, res, next) {
	try {
		res.actorsStats = {
			count: await _actorModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getActors(req, res, next) {
	try {
		let _ref = await _actorModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.actors = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getActorById(req, res, next) {
	try {
		res.actor = await _actorModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createActor(req, res, next) {
	try {
		res.actor = await _actorModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateActor(req, res, next) {
	try {
		let actor = await _actorModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			actor[key] = req.body[key];
		});
		await actor.save();
		res.actor = actor;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteActor(req, res, next) {
	try {
		const actor = await _actorModel2.default.findById(req.params.id);

		await actor.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

var _actorValidation = __webpack_require__(26);

var myValid = _interopRequireWildcard(_actorValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;

let actorSchema = new _mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Actor name is required!'],
		trim: true
	},
	slug: {
		type: String,
		required: [true, 'Actor slug is required!'],
		trim: true
	},
	url: {
		type: String,
		required: [true, 'Actor url is required!'],
		trim: true,
		unique: true
	},
	info: {
		type: String,
		trim: true
	},
	avatarUrl: {
		type: String,
		default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg',
		trim: true
	}
}, {
	timestamps: true
});

actorSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
actorSchema.plugin(_mongoosePaginate2.default);
actorSchema.plugin(_mongooseAutopopulate2.default);
actorSchema.plugin(pluginService.logPost, { schemaName: 'Actor' });
actorSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Actor' });

exports.default = _mongoose2.default.model('Actor', actorSchema);

/***/ }),
/* 51 */
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

var _actorController = __webpack_require__(49);

var actorController = _interopRequireWildcard(_actorController);

var _actorValidation = __webpack_require__(26);

var _actorValidation2 = _interopRequireDefault(_actorValidation);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(16);

var paramService = _interopRequireWildcard(_paramService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getActorsStats
 * GET /items => getActors
 * GET /items/:id => getActorById
 * POST /items/ => createActor
 * PATCH/PUT /items/:id => updateActor
 * DELETE /items/:id => deleteActor
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/init', authService.authJwt, actorController.default, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actors
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_actorValidation2.default.stats), actorController.getActorsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actorsStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_actorValidation2.default.index), actorController.getActors, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actors,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_actorValidation2.default.show), actorController.getActorById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actor
	});
}).post('/', (0, _expressValidation2.default)(_actorValidation2.default.create), actorController.createActor, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actor
	});
}).put('/:id', (0, _expressValidation2.default)(_actorValidation2.default.update), actorController.updateActor, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.actor
	});
}).delete('/:id', (0, _expressValidation2.default)(_actorValidation2.default.delete), actorController.deleteActor, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initCountries = initCountries;
exports.getCountriesStats = getCountriesStats;
exports.getCountries = getCountries;
exports.getCountryById = getCountryById;
exports.createCountry = createCountry;
exports.updateCountry = updateCountry;
exports.deleteCountry = deleteCountry;

var _countryModel = __webpack_require__(54);

var _countryModel2 = _interopRequireDefault(_countryModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _countryUtil = __webpack_require__(56);

var util = _interopRequireWildcard(_countryUtil);

var _countries = __webpack_require__(46);

var _countries2 = _interopRequireDefault(_countries);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group countries - Operations about countries
 *
 */

async function initCountries(req, res, next) {
	try {
		await _countryModel2.default.deleteMany();
		await _countryModel2.default.insertMany(_countries2.default);
		res.countries = _countries2.default;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getCountriesStats(req, res, next) {
	try {
		res.countriesStats = {
			count: await _countryModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getCountries(req, res, next) {
	try {
		let _ref = await _countryModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.countries = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getCountryById(req, res, next) {
	try {
		res.country = await _countryModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createCountry(req, res, next) {
	try {
		res.country = await _countryModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateCountry(req, res, next) {
	try {
		let country = await _countryModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			country[key] = req.body[key];
		});
		await country.save();
		res.country = country;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteCountry(req, res, next) {
	try {
		const country = await _countryModel2.default.findById(req.params.id);

		await country.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

var _regex = __webpack_require__(25);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let countrySchema = new _mongoose.Schema({
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
	},
	url: {
		type: String,
		required: [true, 'Country url is required!'],
		trim: true,
		unique: true
	}
});

countrySchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
countrySchema.plugin(_mongoosePaginate2.default);
countrySchema.plugin(_mongooseAutopopulate2.default);
countrySchema.plugin(pluginService.logPost, { schemaName: 'Country' });
countrySchema.plugin(pluginService.setSlugUrl, { schemaName: 'Country' });

exports.default = _mongoose2.default.model('Country', countrySchema);

/***/ }),
/* 55 */
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

var _countryController = __webpack_require__(53);

var countryController = _interopRequireWildcard(_countryController);

var _countryValidation = __webpack_require__(57);

var _countryValidation2 = _interopRequireDefault(_countryValidation);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(16);

var paramService = _interopRequireWildcard(_paramService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getCountriesStats
 * GET /items => getCountries
 * GET /items/:id => getCountryById
 * POST /items/ => createCountry
 * PATCH/PUT /items/:id => updateCountry
 * DELETE /items/:id => deleteCountry
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/init', authService.authJwt, countryController.initCountries, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.countries
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_countryValidation2.default.stats), countryController.getCountriesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.countriesStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_countryValidation2.default.index), countryController.getCountries, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.countries,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_countryValidation2.default.show), countryController.getCountryById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.country
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_countryValidation2.default.create), countryController.createCountry, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.country
	});
}).put('/:id', (0, _expressValidation2.default)(_countryValidation2.default.update), countryController.updateCountry, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.country
	});
}).delete('/:id', (0, _expressValidation2.default)(_countryValidation2.default.delete), countryController.deleteCountry, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.initDirectors = initDirectors;
exports.getDirectorsStats = getDirectorsStats;
exports.getDirectors = getDirectors;
exports.getDirectorById = getDirectorById;
exports.createDirector = createDirector;
exports.updateDirector = updateDirector;
exports.deleteDirector = deleteDirector;

var _directorModel = __webpack_require__(59);

var _directorModel2 = _interopRequireDefault(_directorModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _directorUtil = __webpack_require__(61);

var util = _interopRequireWildcard(_directorUtil);

var _directors = __webpack_require__(111);

var _directors2 = _interopRequireDefault(_directors);

var _helper = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group directors - Operations about directors
 *
 */

async function initDirectors(req, res, next) {
	try {
		await _directorModel2.default.deleteMany();
		await _directorModel2.default.insertMany(_directors2.default);
		res.directors = _directors2.default;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getDirectorsStats(req, res, next) {
	try {
		res.directorsStats = {
			count: await _directorModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getDirectors(req, res, next) {
	try {
		let _ref = await _directorModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    pagination = _objectWithoutProperties(_ref, ['docs']);

		res.directors = docs;
		res.pagination = pagination;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getDirectorById(req, res, next) {
	try {
		res.director = await _directorModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createDirector(req, res, next) {
	try {
		res.director = await _directorModel2.default.create(req.body);

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateDirector(req, res, next) {
	try {
		let director = await _directorModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			director[key] = req.body[key];
		});
		await director.save();
		res.director = director;

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteDirector(req, res, next) {
	try {
		const director = await _directorModel2.default.findById(req.params.id);

		await director.remove();

		next();
	} catch (e) {
		(0, _helper.log)(JSON.stringify(e), 'error-response.log');
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let directorSchema = new _mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Director name is required!'],
		trim: true
	},
	slug: {
		type: String,
		required: [true, 'Director slug is required!'],
		trim: true
	},
	url: {
		type: String,
		required: [true, 'Director url is required!'],
		trim: true,
		unique: true
	},
	info: {
		type: String,
		trim: true
	},
	avatarUrl: {
		type: String,
		default: 'https://png.pngtree.com/svg/20161212/f93e57629c.svg',
		trim: true
	}
}, {
	timestamps: true
});

directorSchema.statics = {};

directorSchema.pre('save', function (next) {
	return next();
});

directorSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
directorSchema.plugin(_mongoosePaginate2.default);
directorSchema.plugin(_mongooseAutopopulate2.default);
directorSchema.plugin(pluginService.logPost, { schemaName: 'Director' });
directorSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Director' });

exports.default = _mongoose2.default.model('Director', directorSchema);

/***/ }),
/* 60 */
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

var _directorController = __webpack_require__(58);

var directorController = _interopRequireWildcard(_directorController);

var _directorValidation = __webpack_require__(62);

var _directorValidation2 = _interopRequireDefault(_directorValidation);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(16);

var paramService = _interopRequireWildcard(_paramService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getDirectorsStats
 * GET /items => getDirectors
 * GET /items/:id => getDirectorById
 * POST /items/ => createDirector
 * PATCH/PUT /items/:id => updateDirector
 * DELETE /items/:id => deleteDirector
 */

// More router
/* eslint-disable no-unused-vars */
router.get('/init', authService.authJwt, directorController.initDirectors, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.directors
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_directorValidation2.default.stats), directorController.getDirectorsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.directorsStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_directorValidation2.default.index), directorController.getDirectors, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.directors,
		pagination: res.pagination
	});
}).get('/:id', (0, _expressValidation2.default)(_directorValidation2.default.show), directorController.getDirectorById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.director
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_directorValidation2.default.create), directorController.createDirector, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.director
	});
}).put('/:id', (0, _expressValidation2.default)(_directorValidation2.default.update), directorController.updateDirector, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.director
	});
}).delete('/:id', (0, _expressValidation2.default)(_directorValidation2.default.delete), directorController.deleteDirector, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 61 */
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
/* 62 */
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
/* 63 */
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

var _followMovieModel = __webpack_require__(20);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followMovieUtil = __webpack_require__(65);

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
		let _ref = await _followMovieModel2.default.paginate({ user: req.params.id }, Object.assign({}, req.parsedParams, {
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
		let _ref2 = await _followMovieModel2.default.paginate({ movie: req.params.id }, Object.assign({}, req.parsedParams, {
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
		let _ref3 = await _followMovieModel2.default.paginate({}, Object.assign({}, req.parsedParams, {
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

var _followMovieController = __webpack_require__(63);

var followMovieController = _interopRequireWildcard(_followMovieController);

var _followMovieValidation = __webpack_require__(66);

var _followMovieValidation2 = _interopRequireDefault(_followMovieValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(12);

var _existMiddleware = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
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
/* 67 */
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

var _followUserModel = __webpack_require__(27);

var _followUserModel2 = _interopRequireDefault(_followUserModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followUserUtil = __webpack_require__(69);

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
		let _ref = await _followUserModel2.default.paginate({ user: req.params.id }, Object.assign({}, req.parsedParams, {
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
		let _ref2 = await _followUserModel2.default.paginate({ follow: req.params.id }, Object.assign({}, req.parsedParams, {
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
		let _ref3 = await _followUserModel2.default.paginate({}, req.parsedParams),
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

var _followUserController = __webpack_require__(67);

var followUserController = _interopRequireWildcard(_followUserController);

var _followUserValidation = __webpack_require__(70);

var _followUserValidation2 = _interopRequireDefault(_followUserValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(12);

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
		followUsersStats: res.followUsersStats
	});
}).get('/', (0, _roleMiddleware.accessControl)('readAny', 'movie'), paramMiddleware.parseParamList, (0, _expressValidation2.default)(_followUserValidation2.default.index), followUserController.getFollowUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		followUsers: res.followUsers,
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
/* 71 */
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

var _genreModel = __webpack_require__(72);

var _genreModel2 = _interopRequireDefault(_genreModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _genreUtil = __webpack_require__(74);

var util = _interopRequireWildcard(_genreUtil);

var _helper = __webpack_require__(1);

var _genres = __webpack_require__(47);

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
		let _ref = await _genreModel2.default.paginate({}, req.parsedParams),
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

var _genreValidation = __webpack_require__(28);

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
/* 73 */
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

var _genreController = __webpack_require__(71);

var genreController = _interopRequireWildcard(_genreController);

var _genreValidation = __webpack_require__(28);

var _genreValidation2 = _interopRequireDefault(_genreValidation);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

var _paramMiddleware = __webpack_require__(11);

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
/* 74 */
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getSuggestGroups = getSuggestGroups;
exports.getGroupsStats = getGroupsStats;
exports.getGroups = getGroups;
exports.getGroupById = getGroupById;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;

var _groupModel = __webpack_require__(29);

var _groupModel2 = _interopRequireDefault(_groupModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _groupUtil = __webpack_require__(77);

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

async function getSuggestGroups(req, res, next) {
	try {
		let suggests = [{ membersCount: 'desc' }, { requestsCount: 'desc' }, { createdAt: 'desc' }];
		let sort = suggests[Math.floor(Math.random() * suggests.length)];

		let _ref = await _groupModel2.default.paginate({}, Object.assign({}, req.parsedParams, { sort: sort })),
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
		let _ref2 = await _groupModel2.default.paginate({}, req.parsedParams),
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

var _groupController = __webpack_require__(75);

var groupController = _interopRequireWildcard(_groupController);

var _groupValidation = __webpack_require__(78);

var _groupValidation2 = _interopRequireDefault(_groupValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(19);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(12);

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
/* 77 */
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
/* 78 */
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
/* 79 */
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

var _likeModel = __webpack_require__(22);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _likeUtil = __webpack_require__(81);

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
		let _ref = await _likeModel2.default.paginate({}, req.parsedParams),
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

var _likeController = __webpack_require__(79);

var likeController = _interopRequireWildcard(_likeController);

var _likeValidation = __webpack_require__(82);

var _likeValidation2 = _interopRequireDefault(_likeValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(12);

var _existMiddleware = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
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
/* 83 */
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

var _memberModel = __webpack_require__(23);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _memberUtil = __webpack_require__(85);

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
		let _ref = await _memberModel2.default.paginate({}, req.parsedParams),
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
/* 84 */
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

var _memberController = __webpack_require__(83);

var memberController = _interopRequireWildcard(_memberController);

var _memberValidation = __webpack_require__(86);

var _memberValidation2 = _interopRequireDefault(_memberValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _roleMiddleware = __webpack_require__(12);

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
/* 85 */
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
/* 86 */
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

var _movieModel = __webpack_require__(21);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _followMovieModel = __webpack_require__(20);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movies = __webpack_require__(112);

var _movies2 = _interopRequireDefault(_movies);

var _helper = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable no-unused-vars */


/**
 * @group movies - Operations about movies
 *
 */

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

		let _ref = await _movieModel2.default.paginate({ share: 'public' }, Object.assign({}, req.parsedParams, { sort: sort })),
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
		let _ref2 = await _followMovieModel2.default.paginate({ movie: req.params.id }, Object.assign({}, req.parsedParams, {
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
		let _ref3 = await _movieModel2.default.paginate({ share: 'public' }, req.parsedParams),
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
/* 88 */
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

var _movieController = __webpack_require__(87);

var movieController = _interopRequireWildcard(_movieController);

var _movieValidation = __webpack_require__(89);

var _movieValidation2 = _interopRequireDefault(_movieValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(19);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(12);

var _voiceoverController = __webpack_require__(32);

var voiceoverController = _interopRequireWildcard(_voiceoverController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router(); /* eslint-disable no-unused-vars */


/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

// More router
router.get('/init', (0, _roleMiddleware.accessControl)('createAny', 'movie'), movieController.initMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movies
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
// .get(
// 	'/upload',
// 	accessControl('createOwn', 'movie'),
// 	validate(movieValidation.upload),
// 	movieController.getFollowerMovies,
// 	function(req, res, next) {
// 		return res.status(HTTPStatus.OK).json({
// 			data: res.followers,
// 			pagination: res.pagination
// 		})
// 	}
// )

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
}).get('/:id', (0, _roleMiddleware.accessControl)('readAny', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.show), movieController.getMovieById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.movie
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'movie'), (0, _expressValidation2.default)(_movieValidation2.default.create), movieController.createMovie, voiceoverController.createVoiceover, function (req, res, next) {
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
	upload: {},
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
exports.getPostsStats = getPostsStats;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;

var _postModel = __webpack_require__(91);

var _postModel2 = _interopRequireDefault(_postModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postUtil = __webpack_require__(93);

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
		let _ref = await _postModel2.default.paginate({}, req.parsedParams),
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _postValidation = __webpack_require__(30);

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
/* 92 */
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

var _postController = __webpack_require__(90);

var postController = _interopRequireWildcard(_postController);

var _postValidation = __webpack_require__(30);

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
/* 93 */
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
/* 94 */
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

var _rateModel = __webpack_require__(95);

var _rateModel2 = _interopRequireDefault(_rateModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _rateUtil = __webpack_require__(97);

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
		let _ref = await _rateModel2.default.paginate({}, req.parsedParams),
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
		res.rate = await _rateModel2.default.create(req.body);

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let rateSchema = new _mongoose.Schema({
	rateName: {
		type: String,
		required: [true, 'rateName is required!'],
		trim: true,
		unique: true
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

var _rateController = __webpack_require__(94);

var rateController = _interopRequireWildcard(_rateController);

var _rateValidation = __webpack_require__(98);

var _rateValidation2 = _interopRequireDefault(_rateValidation);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(16);

var paramService = _interopRequireWildcard(_paramService);

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
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_rateValidation2.default.create), rateController.createRate, function (req, res, next) {
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

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(13);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(9);

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
		let rs = await this.findOne({ user }).populate({
			path: 'requests',
			match: { _id: request }
		});
		return rs.requests && rs.requests.length ? true : false;
	},
	async isFriend(user, friend) {
		return await this.findOne({ user }).populate({
			path: 'friends',
			match: friend
		});
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
		userRS.removeRequest(request);
		return userRS;
	},
	async removeFriend(user, friend) {
		let userResource = this.findOne({ user });
		let friendResource = this.findOne({ user: friend });
		friendResource.removeFriend(user);
		return userResource.removeFriend(friend);
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

var _relationshipController = __webpack_require__(31);

var relationshipController = _interopRequireWildcard(_relationshipController);

var _relationshipValidation = __webpack_require__(102);

var _relationshipValidation2 = _interopRequireDefault(_relationshipValidation);

var _paramService = __webpack_require__(16);

var paramService = _interopRequireWildcard(_paramService);

var _roleMiddleware = __webpack_require__(12);

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
});
// 	.put(
// 		'/reject',
// 		accessControl('updateOwn', 'relationship'),
// 		validate(relationshipValidation.requests),
// 		relationshipController.rejectRequest,
// 		function(req, res, next) {
// 			return res.status(HTTPStatus.OK).json({
// 				data: res.relationship
// 			})
// 		}
// 	)
// 	.delete(
// 		'/',
// 		accessControl('Own', 'relationship'),
// 		validate(relationshipValidation.remove),
// 		relationshipController.removeFriend,
// 		function(req, res, next) {
// 			return res.status(HTTPStatus.OK).json({
// 				data: res.relationship
// 			})
// 		}
// 	)

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
}).get('/:id', (0, _expressValidation2.default)(_relationshipValidation2.default.show), relationshipController.getRelationshipById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).post('/', (0, _roleMiddleware.accessControl)('createOwn', 'movie'), (0, _expressValidation2.default)(_relationshipValidation2.default.create), relationshipController.createRelationship, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).put('/:id', (0, _roleMiddleware.accessControl)('updateOwn', 'movie'), (0, _expressValidation2.default)(_relationshipValidation2.default.update), relationshipController.updateRelationship, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.relationship
	});
}).delete('/:id', (0, _roleMiddleware.accessControl)('deleteOwn', 'movie'), (0, _expressValidation2.default)(_relationshipValidation2.default.delete), relationshipController.deleteRelationship, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 101 */
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
/* 102 */
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

var _userModel = __webpack_require__(24);

var _userModel2 = _interopRequireDefault(_userModel);

var _movieModel = __webpack_require__(21);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _groupModel = __webpack_require__(29);

var _groupModel2 = _interopRequireDefault(_groupModel);

var _likeModel = __webpack_require__(22);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _followMovieModel = __webpack_require__(20);

var _followMovieModel2 = _interopRequireDefault(_followMovieModel);

var _followUserModel = __webpack_require__(27);

var _followUserModel2 = _interopRequireDefault(_followUserModel);

var _memberModel = __webpack_require__(23);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userUtil = __webpack_require__(105);

var util = _interopRequireWildcard(_userUtil);

var _helper = __webpack_require__(1);

var _authService = __webpack_require__(15);

var authService = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group users - Operations about users
 *
 */
async function getMoviesOwn(req, res, next) {
	try {
		let _ref = await _movieModel2.default.paginate({ uploader: req.params.id }, req.parsedParams),
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

async function getMoviesLiked(req, res, next) {
	try {
		let _ref2 = await _likeModel2.default.paginate({ user: req.params.id }, req.parsedParams),
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

async function getMoviesFollowed(req, res, next) {
	try {
		let _ref3 = await _followMovieModel2.default.paginate({ user: req.params.id }, Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'movie',
				model: 'Movie'
			}]
		})),
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

async function getGroupsOwn(req, res, next) {
	try {
		let _ref4 = await _groupModel2.default.paginate({ creator: req.params.id }, req.parsedParams),
		    { docs } = _ref4,
		    pagination = _objectWithoutProperties(_ref4, ['docs']);

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
		let _ref5 = await _memberModel2.default.paginate({ user: req.params.id, status: req.params.status }, req.parsedParams),
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

async function getFollowers(req, res, next) {
	try {
		let _ref6 = await _followUserModel2.default.paginate({ follow: req.params.id }, Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'user',
				model: 'User'
			}]
		})),
		    { docs } = _ref6,
		    pagination = _objectWithoutProperties(_ref6, ['docs']);

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
		let _ref7 = await _followUserModel2.default.paginate({ user: req.params.id }, Object.assign({}, req.parsedParams, {
			populate: [{
				path: 'follow',
				model: 'User'
			}]
		})),
		    { docs } = _ref7,
		    pagination = _objectWithoutProperties(_ref7, ['docs']);

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
		let _ref8 = await _userModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref8,
		    pagination = _objectWithoutProperties(_ref8, ['docs']);

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
		const fbAuthUser = await authService.authFacebook(req.body.accessToken);

		if (!fbAuthUser.user_id) {
			(0, _helper.log)(JSON.stringify(fbAuthUser.error), 'error-response.log');
			return res.status(_httpStatus2.default.BAD_REQUEST).json(fbAuthUser.error);
		}
		const profile = Object.assign({}, req.body, fbAuthUser);
		res.user = await _userModel2.default.findOne({
			provider: 'facebook',
			'social.id': profile.user_id
		});

		if (res.user) {
			next();
		} else {
			let newUser = (await _userModel2.default.findOne({
				email: profile.name
			})) || new _userModel2.default();
			newUser.provider = 'facebook';
			newUser.social = { id: profile.user_id, accessToken: profile.accessToken };
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
/* 104 */
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

var _userController = __webpack_require__(103);

var userController = _interopRequireWildcard(_userController);

var _relationshipController = __webpack_require__(31);

var relationshipController = _interopRequireWildcard(_relationshipController);

var _userValidation = __webpack_require__(106);

var _userValidation2 = _interopRequireDefault(_userValidation);

var _authService = __webpack_require__(15);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(19);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(12);

var _fb = __webpack_require__(118);

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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 106 */
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
			status: _joi2.default.string().valid('checking', 'done', 'block')
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(10);

var _validator2 = _interopRequireDefault(_validator);

var _voiceoverValidation = __webpack_require__(33);

var myValid = _interopRequireWildcard(_voiceoverValidation);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(7);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(8);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(9);

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
/* 108 */
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

var _voiceoverController = __webpack_require__(32);

var voiceoverController = _interopRequireWildcard(_voiceoverController);

var _voiceoverValidation = __webpack_require__(33);

var _voiceoverValidation2 = _interopRequireDefault(_voiceoverValidation);

var _paramMiddleware = __webpack_require__(11);

var paramMiddleware = _interopRequireWildcard(_paramMiddleware);

var _ownMiddleware = __webpack_require__(19);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

var _roleMiddleware = __webpack_require__(12);

var _synthesisService = __webpack_require__(34);

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
router.get('/check/:requestId',
// accessControl('createOwn', 'voiceover'),
(0, _expressValidation2.default)(_voiceoverValidation2.default.checkSynthesis), voiceoverController.checkSynthesis, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.voiceover
	});
}).post('/upload',
// accessControl('createOwn', 'voiceover'),
// validate(voiceoverValidation.upload),
voiceoverController.uploadVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		data: res.file
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
}).post('/',
// validate(voiceoverValidation.create),
voiceoverController.createVoiceover, function (req, res, next) {
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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _roleAcl = __webpack_require__(128);

var _roleAcl2 = _interopRequireDefault(_roleAcl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ac = new _roleAcl2.default(); /* eslint-disable */


ac.grant('viewer').execute('readAny').on('user', ['*', '!password']).execute('readAny').on('followMovie').execute('readAny').on('followUser').execute('readAny').on('relationship').execute('readAny').on('movie').execute('readAny').on('post').execute('readAny').on('group').execute('readAny').on('like').execute('readAny').on('member');

ac.grant('user').extend('viewer').execute('readOwn').on('user').execute('createOwn').on('user').execute('updateOwn').on('user').execute('deleteOwn').on('user').execute('readOwn').on('followMovie').execute('createOwn').on('followMovie').execute('updateOwn').on('followMovie').execute('deleteOwn').on('followMovie').execute('readOwn').on('followUser').execute('createOwn').on('followUser').execute('updateOwn').on('followUser').execute('deleteOwn').on('followUser').execute('readOwn').on('relationship').execute('createOwn').on('relationship').execute('updateOwn').on('relationship').execute('deleteOwn').on('relationship').execute('readOwn').on('movie').execute('createOwn').on('movie').execute('updateOwn').on('movie').execute('deleteOwn').on('movie').execute('readOwn').on('post').execute('createOwn').on('post').execute('updateOwn').on('post').execute('deleteOwn').on('post').execute('readOwn').on('group').execute('createOwn').on('group').execute('updateOwn').on('group').execute('deleteOwn').on('group').execute('readOwn').on('like').execute('createOwn').on('like').execute('updateOwn').on('like').execute('deleteOwn').on('like').execute('readOwn').on('member').execute('createOwn').on('member', ['*', '!status']).execute('updateOwn').on('member').execute('deleteOwn').on('member');

ac.grant('editer').extend('user');

ac.grant('admin').extend('user').execute('readAny').on('movie').execute('createAny').on('movie').execute('updateAny').on('movie').execute('deleteAny').on('movie');

ac.grant('superadmin').extend('admin').execute('readAny').on('user').execute('createAny').on('user').execute('updateAny').on('user').execute('deleteAny').on('user').execute('readAny').on('followMovie').execute('createAny').on('followMovie').execute('updateAny').on('followMovie').execute('deleteAny').on('followMovie').execute('readAny').on('followUser').execute('createAny').on('followUser').execute('updateAny').on('followUser').execute('deleteAny').on('followUser').execute('readAny').on('movie').execute('createAny').on('movie').execute('updateAny').on('movie').execute('deleteAny').on('movie').execute('readAny').on('post').execute('createAny').on('post').execute('updateAny').on('post').execute('deleteAny').on('post').execute('readAny').on('group').execute('createAny').on('group').execute('updateAny').on('group').execute('deleteAny').on('group');

exports.default = ac;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploadFile = uploadFile;

var _request = __webpack_require__(38);

var _request2 = _interopRequireDefault(_request);

var _constants = __webpack_require__(14);

var _constants2 = _interopRequireDefault(_constants);

var _fs = __webpack_require__(17);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function uploadFile(path = 'default', overwrite = 'false', fileUrl, callback) {
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
} /* eslint-disable no-console */

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = [{"name":"Hao Ning"},{"name":"Duncan Jones"},{"name":"Jesse V. Johnson"},{"name":"Gustav Möller"},{"name":"J.C. Chandor"},{"name":"Christopher Landon"},{"name":"Xing Fei"},{"name":"Peter Farrelly"},{"name":"Michael Caton-Jones"},{"name":"Corey Yuen"},{"name":"Adam Robitel"},{"name":"Sean Anders"},{"name":"Han Sang-Hee"},{"name":"Kuo Liu"},{"name":"Assaf Bernstein"},{"name":"Mamoru Hosoda"},{"name":"Elisabeth Vogler"},{"name":"Vijay Krishna Acharya"},{"name":"Oriol Paulo"},{"name":"đang cập nhập"},{"name":"Charles Martin Smith"},{"name":"Woo Min-Ho"},{"name":"Emmanuel Mouret"},{"name":"Sam Liu"},{"name":"Kim Byung-Woo"},{"name":"Joe Cornish"},{"name":"Lee Min-Jae"},{"name":"Daniele Misischia"},{"name":"Bang Soo-In"},{"name":"Leena Yadav"},{"name":"Dean DeBlois"},{"name":"Đang cập nhật"},{"name":"Etan Cohen"},{"name":"Kevin R. Adams"},{"name":"Giddens Ko"},{"name":"Tetsuo Yajima"},{"name":"Hugo Stuven"},{"name":"Susanne Bier"},{"name":"David Mackenzie"},{"name":"Kuan-Hui Lin"},{"name":"Shinichiro Ueda"},{"name":"Aneesh Chaganty"},{"name":"Chiwetel Ejiofor"},{"name":"Drew Pearce"},{"name":"Pawel Pawlikowski"},{"name":"Ross Venokur"},{"name":"Teng Bee"},{"name":"Mathieu Turi"},{"name":"Karey Kirkpatrick"},{"name":"Clive Tonge"},{"name":"Shoojit Sircar"},{"name":"Ko Kyung-Min"},{"name":"Bao Bối Nhĩ"},{"name":"Ethan Coen"},{"name":"Desiree Akhavan"},{"name":"Lý Hải Long"},{"name":"F. Gary Gray"},{"name":"Erdal Ceylan"},{"name":"Phil Johnston"},{"name":"Pengyuan Ren"},{"name":"Jude Jung"},{"name":"Kristoffer Nyholm"},{"name":"Choi Sung-Hyun"},{"name":"Anthony Russo"},{"name":"Lưu Vĩ Cường"},{"name":"Antoine Fuqua"},{"name":"Trương La Bình"},{"name":"Ari Sandel"},{"name":"Danishka Esterhazy"},{"name":"Jo Won-Hee"},{"name":"Vash"},{"name":"Josh Boone"},{"name":"Susanna Fogel"},{"name":"Dan Gilroy"},{"name":"Jonas Åkerlund"},{"name":"Lim Jin-Soon,Jin-Soon Lim"},{"name":"Peter Hutchings"},{"name":"Lee Seung-Won"},{"name":"Nash Edgerton"},{"name":"Leigh Whannell"},{"name":"Simon Hunter"},{"name":"Doron Paz"},{"name":"Châu Tinh Trì"},{"name":"Kang Hyo-Jin"},{"name":"Todd Strauss-Schulson"},{"name":"Michael Winnick"},{"name":"Frant Gwo"},{"name":"Lior Geller"},{"name":"Emile Hirsch"},{"name":"Bob Persichetti,Peter Ramsey"},{"name":"Gareth Evans"},{"name":"Wai Man Yip"},{"name":"Kim Tae-Gyun"},{"name":"Shunji Iwai"},{"name":"Jonathan Helpert"},{"name":"Vicky Jewson"},{"name":"Keitarô Motonaga"},{"name":"Svyatoslav Podgaevskiy"},{"name":"Kim Hyung-Hyub"},{"name":"Wen Jiang"},{"name":"Mike Rohl"},{"name":"Felix Chong"},{"name":"Luv Ranjan"},{"name":"Tatsuya Nagamine"},{"name":"Mã Hệ Hải"},{"name":"Travis Knight"},{"name":"Lee Seok-Geun"},{"name":"Muye Wen"},{"name":"Christian Rivers"},{"name":"Brian A Miller"},{"name":"Min Kyu-Dong"},{"name":"Drew Goddard"},{"name":"Witthaya Thongyooyong"},{"name":"Hoàng Bột"},{"name":"James Wan"},{"name":"Sriram Raghavan"},{"name":"Diederik Van Rooijen"},{"name":"David Slade"},{"name":"Nishikant Kamat"},{"name":"Blake Harris"},{"name":"Donovan Marsh"},{"name":"Maya Forbes"},{"name":"Andy Serkis"},{"name":"Spike Lee"},{"name":"Lee Ji-Won"},{"name":"David Yates"},{"name":"Jodi Scurfield"},{"name":"Daniel Roby"},{"name":"Lưu Trấn Vĩ"},{"name":"Koratala Siva"},{"name":"David Gordon Green"},{"name":"Timo Tjahjanto"},{"name":"Choi Sang-Hun"},{"name":"Stephen Susco"},{"name":"Kaiyang Jiang"},{"name":"Tsz Ming Wong"},{"name":"Bradley Cooper"},{"name":"Trương Nghệ Mưu"},{"name":"Kang Yoon-Sung"},{"name":"Luo Luo"},{"name":"Yoon Eun HyeChun Jung Myung"},{"name":"Tu Ting ChunHo Pong Mak"},{"name":"Kim Sung-Hoon"},{"name":"Yoo Young-Seon"},{"name":"Wes Anderson"},{"name":"Jo Kyu-Jang"},{"name":"Li Xin"},{"name":"Takeshi Kitano"},{"name":"Renny Harlin"},{"name":"Jeff Tomsic"},{"name":"Michael Noer"},{"name":"Jonathan BakerJosh Baker"},{"name":"Đào Minh Hỷ"},{"name":"Lance Daly"},{"name":"Ruben Fleischer"},{"name":"Takashi Yamazaki"},{"name":"Shinsuke Sato"},{"name":"Park Hee-Kon"},{"name":"Kar Lok Chin"},{"name":"Pierre Morel"},{"name":"Raja Gosnell"},{"name":"Amar Kaushik"},{"name":"Scott Speer"},{"name":"David Kerr"},{"name":"Jeffrey Chiang"},{"name":"Bành Thuận"},{"name":"Tần Trân"},{"name":"Byeon Hyeok"},{"name":"Oliver Daly"},{"name":"Xiaogang Feng"},{"name":"Egor Baranov"},{"name":"Kim Gwang-Sik"},{"name":"Huh Jong-ho"},{"name":"Eli Roth"},{"name":"Peter Berg"},{"name":"Jon M. Chu"},{"name":"Lee Jong-suk"},{"name":"David Lam"},{"name":"Shane Black"},{"name":"Park Hoon-Jung"},{"name":"Aku Louhimies"},{"name":"Âu Dương Phấn"},{"name":"Vi Chính"},{"name":"Takahiro Miki"},{"name":"Rocky Soraya"},{"name":"Stefano Sollima"},{"name":"Jeremy Saulnier"},{"name":"Gerard McMurray"},{"name":"Derek Cianfrance"},{"name":"Robert Zemeckis"},{"name":"Mario Van Peebles"},{"name":"Fede Alvarez"},{"name":"Enrique Begne"},{"name":"Na Hong-jin"},{"name":"David F. Sandberg"},{"name":"Oh In-Chul"},{"name":"Jessica Sharzer"},{"name":"Chad Stahelski"},{"name":"Mike Norris"},{"name":"Matt Ross"},{"name":"Taika Waititi"},{"name":"Florian Gottschick"},{"name":"Rob Reiner"},{"name":"Gavin O'Connor"},{"name":"Babak Anvari"},{"name":"Victor Mawer,Tom Barker"},{"name":"G.N.R. Kumaravelan"},{"name":"Justin Lin"},{"name":"Diêu Đình Đình"},{"name":"Il Hyeong Lee"},{"name":"John Schultz"},{"name":"Joachim Rønning,Espen Sandberg"},{"name":"Edward Zwick"},{"name":"đang cập nhật"},{"name":"Jay Roach"},{"name":"Pierre-François Martin-Laval"},{"name":"Noémie Saglio,Maxime Govare"},{"name":"Jung Ki Hun"},{"name":"Youhei Suzuki"},{"name":"Dany Boon"},{"name":"Jang Jae Hyun"},{"name":"Sung-su Kim"},{"name":"Dennis Gansel"},{"name":"Lisa Addario,Joe Syracuse"},{"name":"Dan Kwan,Daniel Scheinert"},{"name":"Seong-hun Kim"},{"name":"Benny Chan"},{"name":"John Moore"},{"name":"Matt Brown"},{"name":"Mike Thurmeier"},{"name":"Đào Thanh"},{"name":"Uwe Boll"},{"name":"Ben Falcone"},{"name":"Ron Howard"},{"name":"Paul Feig"},{"name":"James DeMonaco"},{"name":"Sharon Maguire"},{"name":"Kelly Asbury"},{"name":"Trần Mộc Thắng,Hồng Kim Bảo"},{"name":"James Foley"},{"name":"John H. Lee"},{"name":"Florian Gallenberger"},{"name":"Jay Martin"},{"name":"Tom Tykwer"},{"name":"Tom Ford"},{"name":"Kim Jae Young"},{"name":"Choi Jeong Yeol"},{"name":"Peter Atencio"},{"name":"Clint Eastwood"},{"name":"Zhou Xiaopeng"},{"name":"Christian Ditter"},{"name":"John Carney"},{"name":"Lasse Hallström"},{"name":"Courtney Hunt"},{"name":"Koan Hui"},{"name":"Mike Flanagan"},{"name":"Morten Tyldum"},{"name":"Andrew Haigh"},{"name":"Kenvil Tong"},{"name":"Zach Lipovsky"},{"name":"Nicolas Winding Refn"},{"name":"Rawson Marshall Thurber"},{"name":"Mamoru Oshii"},{"name":"Daniel Lee"},{"name":"Jim Gillespie"},{"name":"Anzi Pan"},{"name":"Jaume Collet-Serra"},{"name":"Simon Verhoeven"},{"name":"Jason Lei Howden"},{"name":"Zhou Tuo Ru"},{"name":"Roel Reiné"},{"name":"Paul W.s. Anderson"},{"name":"Rick Morales"},{"name":"John Stockwell"},{"name":"Yue Song"},{"name":"Kyoung mi Lee"},{"name":"Nikolay Lebedev"},{"name":"Wen Weihong"},{"name":"Marcus Nispel"},{"name":"James Watkins"},{"name":"Quách Kính Minh"},{"name":"Yeon Sang Ho"},{"name":"Nicholas Stoller"},{"name":"Jean-François Richet"},{"name":"Paul Greengrass"},{"name":"Dae-Min Park"},{"name":"Gore Verbinski"},{"name":"Nonthakor Thaweesuk"},{"name":"Martin Campbell"},{"name":"Ngô Thanh Vân"},{"name":"Joel Gallen"},{"name":"Yen Ping Chu"},{"name":"Steven C. Miller"},{"name":"Hồng Kim Bảo"},{"name":"Hoon-jung Park"},{"name":"Kieran Darcy-Smith"},{"name":"Andrew Stanton"},{"name":"Thomas Della Bella"},{"name":"Diệp Niệm Sâm"},{"name":"Zack Snyder"},{"name":"đang cập nhật"},{"name":"Đỗ Kỳ Phong"},{"name":"Scott Derrickson"},{"name":"Jamie M. Dagg"},{"name":"Trương Nhất Bạch,Quản Hổ,Trương Mãnh,Đằng Hoa Đào,Cao Quần Thư"},{"name":"Oliver Stone"},{"name":"Tim Russ"},{"name":"Sarik Andreasyan"},{"name":"Kevin Carraway"},{"name":"Lee Woo Chul"},{"name":"Herman Yau"},{"name":"Ken'ichi Fujiwara"},{"name":"Timur Bekmambetov"},{"name":"Park Chan-Wook"},{"name":"Takeshi Nozue"},{"name":"Yoon Joon Hyeong"},{"name":"Tào Bảo Bình"},{"name":"Yimou Zhang"},{"name":"Henry Joost,Ariel Schulman"},{"name":"Tim Burton"},{"name":"Gareth Edwards"},{"name":"Jon Lucas,Scott Moore"},{"name":"William Kaufman"},{"name":"David Lowery"},{"name":"Francis Ford Coppola"},{"name":"Patricia Riggen"},{"name":"Tatsuyuki Nagai"},{"name":"Yarrow Cheney,Chris Renaud"},{"name":"Steve McQueen"},{"name":"Éric Hannezo"},{"name":"Lý Thuần Phong"},{"name":"Sung-hee Jo"},{"name":"James Bobin"},{"name":"Drake Doremus"},{"name":"Lou Simon"},{"name":"Aman Chang"},{"name":"Trần Ngọc San"},{"name":"Tae-ra Shin"},{"name":"Masaki Nishiura"},{"name":"Roland Emmerich"},{"name":"Ariel Vromen"},{"name":"Thomas Yip"},{"name":"Jean-Marc Vallée"},{"name":"Ruben Alves"},{"name":"Pat Williams"},{"name":"Trần Quả"},{"name":"Matt Chow"},{"name":"Justin Kurzel"},{"name":"Dave Green"},{"name":"Dexter Fletcher"},{"name":"David Mirkin"},{"name":"Dharmendra Suresh Desai"},{"name":"Jevons Au,Frank Hui"},{"name":"Vincent Kesteloot,Ben Stassen"},{"name":"David Ayer"},{"name":"Michael Jai White"},{"name":"Wisit Sasanatieng"},{"name":"David Hackl"},{"name":"Tod Williams"},{"name":"A. Todd Smith"},{"name":"Thea Sharrock"},{"name":"Jianqi Huo"},{"name":"Trilak Makmeongpad"},{"name":"John Curran"},{"name":"Brian DeCubellis"},{"name":"Stephen Chow"},{"name":"Nils Gaup"},{"name":"Glenn Ficarra,John Requa"},{"name":"Qi Zhang"},{"name":"Louis Leterrier"},{"name":"Pat O'Connor"},{"name":"James Cameron"},{"name":"Catherine Hardwicke"},{"name":"Robert Schwentke"},{"name":"Tiêu Dương"},{"name":"Shakun Batra"},{"name":"Jodie Foster"},{"name":"Jae-Yong Kwak"},{"name":"Dan Trachtenberg"},{"name":"Bill Condon"},{"name":"johannes roberts"},{"name":"Chris Weitz"},{"name":"John Woo"},{"name":"Shigeo Koshi"},{"name":"Sion Sono"},{"name":"Peter Sullivan"},{"name":"Lars von Trier"},{"name":"Christophe Gans"},{"name":"Ilya Naishuller"},{"name":"Ethan Coen,Joel Coen"},{"name":"Clay Kaytis,Fergal Reilly"},{"name":"Adam Shankman"},{"name":"Vishal Pandya"},{"name":"Paco Cabezas"},{"name":"Richard LaGravenese"},{"name":"Ben Wheatley"},{"name":"Kyung-taek Kwak"},{"name":"Brett Ratner"},{"name":"Bryan Singer"},{"name":"Mez Tharatorn"},{"name":"Steven Gomez"},{"name":"Rupert Sanders"},{"name":"Peter Jackson"},{"name":"Hong Won-Chan"},{"name":"K. King"},{"name":"Daniel Zirilli"},{"name":"Chuck Russell"},{"name":"Kongkiat Khomsiri"},{"name":"Baek Jong-Yeol"},{"name":"Matthew Vaughn"},{"name":"Gavin Hood"},{"name":"Michael Bay"},{"name":"Jun'ichi Mori"},{"name":"Wei Xu"},{"name":"Bradley Kaplan"},{"name":"Lee Eun Hee"},{"name":"Sing-Choong Foo"},{"name":"Kwok,Man Keung"},{"name":"Bora Dagtekin"},{"name":"Fu Hua Yang"},{"name":"Chad Archibald"},{"name":"Shawn Arranha"},{"name":"Sammo Hung Kam-Bo"},{"name":"Olivier Megaton"},{"name":"Ben Stiller"},{"name":"Jo Jin-Gyu"},{"name":"Robert Eggers"},{"name":"Trương Dương"},{"name":"Director:"},{"name":"Nick Lyon"},{"name":"Hayato Kawai"},{"name":"Mel Gibson"},{"name":"Philip Yung"},{"name":"Fernando González Molina"},{"name":"Raimund Huber"},{"name":"Dan Mazer"},{"name":"Vương Gia Vệ"},{"name":"Anthony Russo,Joe Russo"},{"name":"Peter Billingsley"},{"name":"Qing Yang"},{"name":"Yuen Woo Ping"},{"name":"Haofeng Xu"},{"name":"Jeffery Scott Lando"},{"name":"Jeff Nichols"},{"name":"Nick Cheung"},{"name":"Isao Takahata"},{"name":"Seung-wan Ryoo"},{"name":"Ricardo Curtis"},{"name":"Bejoy Nambiar"},{"name":"William Brent Bell"},{"name":"John Hillcoat"},{"name":"Ryôtarô Makihara"},{"name":"Tripp Rhame"},{"name":"Lee Eun-Hee"},{"name":"Nick Morris,Laurence Connor"},{"name":"Cedric Nicolas-Troyan"},{"name":"Raja Menon"},{"name":"Tung-Shing Yee"},{"name":"Kevin Reynolds"},{"name":"Jon Favreau"},{"name":"James Crow"},{"name":"David O. Russell"},{"name":"Craig Gillespie"},{"name":"Wang Wei"},{"name":"Fred Olen Ray"},{"name":"Michael Thelin"},{"name":"Max Adams"},{"name":"Jason Zada"},{"name":"Stephen Frears"},{"name":"J Blakeson"},{"name":"Enrique Gato"},{"name":"Kwok-Man Keung"},{"name":"Ericson Core"},{"name":"Trevor Wall"},{"name":"Alexandre Heboyan,Benoît Philippon"},{"name":"Peter Landesman"},{"name":"Zhang Yang"},{"name":"Stephen Fingleton"},{"name":"Vương Tinh"},{"name":"Babak Najafi"},{"name":"Paul Gross"},{"name":"Walt Becker"},{"name":"Arthur Benzaquen"},{"name":"Guisela Moro"},{"name":"Francis Lawrence"},{"name":"Alex Proyas"},{"name":"Byron Howard,Rich Moore"},{"name":"Tom McCarthy"},{"name":"Burr Steers"},{"name":"D.C. Hamilton"},{"name":"Todd Haynes"},{"name":"Wellson Chin"},{"name":"Kim Jin-Young"},{"name":"Jocelyn Moorhouse"},{"name":"Paul McGuigan"},{"name":"Declan Dale"},{"name":"Timothy Woodward Jr."},{"name":"Yuen Woo-ping"},{"name":"John Crowley"},{"name":"Vincent Zhou"},{"name":"Jon Cassar"},{"name":"Shintaro Shimosawa"},{"name":"Seok-hoon Lee"},{"name":"Alejandro Amenábar"},{"name":"Colin Strause"},{"name":"Jordan Vogt-Roberts"},{"name":"Billy Ray"},{"name":"Yorgos Lanthimos"},{"name":"Paul W.S. Anderson"},{"name":"Charles Burmeister"},{"name":"Pou-Soi Cheang"},{"name":"Todor Chapkanov"},{"name":"Tim Story"},{"name":"R.L.Scott"},{"name":"Kim Hyun-Seok"},{"name":"Alessandro Carloni,Jennifer Yuh"},{"name":"Ryan Coogler"},{"name":"Lenny Abrahamson"},{"name":"Tim Miller"},{"name":"Johnnie To,Patrick Leung"},{"name":"Sergey Mokritskiy"},{"name":"Adam Stephen Kelly"},{"name":"Dani de la Torre"},{"name":"Javier Ruiz Caldera"},{"name":"Phil Joanou"},{"name":"Jay Oliva"},{"name":"Lạc Lạc"},{"name":"Tom Hooper"},{"name":"Fernando León de Aranoa"},{"name":"Jong-ho Huh"},{"name":"Kabir Khan"},{"name":"Lim Chan-Sang"},{"name":"Angelababy"},{"name":"Kun Chen"},{"name":"Keith Collea"},{"name":"Nancy Meyers"},{"name":"Sicheng Chen"},{"name":"Brian Helgeland"},{"name":"Steven Spielberg"},{"name":"Sunspots"},{"name":"Carrie Ng"},{"name":"Antoine Bardou-Jacquet"},{"name":"Adam McKay"},{"name":"Oh Ki Kwan"},{"name":"Shin Su Won"},{"name":"David Michôd"},{"name":"Richie Jen,Andy Luo"},{"name":"Guan Hu"},{"name":"Dennis Yu"},{"name":"Từ Tịnh Lôi"},{"name":"Lawrence Roeck"},{"name":"Tôn Chu"},{"name":"Chen Chi-Hwa"},{"name":"Hao Sun"},{"name":"Diệp Vĩ Tín"},{"name":"Benjamin Rocher"},{"name":"Lee Jae Han"},{"name":"Ha Jung Woo"},{"name":"Brandy Yuen"},{"name":"Jerry Jameson"},{"name":"Thomas Jane"},{"name":"Laurence Fishburne"},{"name":"Ella Ballentine"},{"name":"Kang Je Gyu"},{"name":"Bun Yuen"},{"name":"John Lyde"},{"name":"Yoon Je Kyoon"},{"name":"Park Eun-Kyung,Dong-ha Lee"},{"name":"Afonso Poyart"},{"name":"Mark Gatiss,Steven Moffat"},{"name":"Du Bạch Mi,Đặng Siêu"},{"name":"James Wiseman"},{"name":"Quentin Tarantino"},{"name":"Xiaoxing Yi"},{"name":"Lee Jae Jin"},{"name":"Jonathan Milott,Cary Murnion"},{"name":"Yôhei Fukuda"},{"name":"Yuet Sang Chin"},{"name":"N. Linguswamy,Suresh"},{"name":"Donnie Yen"},{"name":"Park Jin Pyo"},{"name":"Kim Jin-Moo,Park Ga-Hee,Ju Seong-Su,Jung Won-Sik"},{"name":"Alejandro González Iñárritu"},{"name":"Denis Villeneuve"},{"name":"Howy Parkins"},{"name":"Honghui Xu"},{"name":"Zheng Xu"},{"name":"Yen-Ping Chu"},{"name":"Kim Bong-joo"},{"name":"Frank Coraci"},{"name":"Chi-Leung Law"},{"name":"Danny Pang"},{"name":"Sheng Ding"},{"name":"Tiểu Tử Thiếu Lâm"},{"name":"John Wells"},{"name":"J.J. Abrams"},{"name":"Patrick Kong"},{"name":"Rod Daniel"},{"name":"Rob Letterman"},{"name":"James Ponsoldt"},{"name":"Ninh Kính Vũ"},{"name":"Da-Mo Peng,Fei Yan"},{"name":"Chris Columbus"},{"name":"John Maclean"},{"name":"Richard Ayoade"},{"name":"Roar Uthaug"},{"name":"Joe Wright"},{"name":"Sam Taylor-Johnson"},{"name":"Ridley Scott"},{"name":"Ifa Isfansyah"},{"name":"Mark Wu"},{"name":"Scott Mann"},{"name":"Eddie Tse"},{"name":"Gunasekhar"},{"name":"Oh-Kwang Kwon"},{"name":"Neill Blomkamp"},{"name":"Sebastian Schipper"},{"name":"Ciarán Foy"},{"name":"Peter Sohn"},{"name":"Shinji Higuchi"},{"name":"Chuan Lu"},{"name":"Genndy Tartakovsky"},{"name":"Masayuki Ochiai"},{"name":"Jeong-hoon Kim"},{"name":"Sylvester Stallone"},{"name":"Jack Smight"},{"name":"Timothy Kendall"},{"name":"Isaac Florentine"},{"name":"Michael Cera"},{"name":"Alison Pill"},{"name":"Mark Webber"},{"name":"Mark Osborne"},{"name":"Karan Malhotra"},{"name":"Peter Bogdanovich"},{"name":"Shion Sono"},{"name":"David Lai"},{"name":"Roni Ezra"},{"name":"Tian Xiao Peng"},{"name":"Spencer Susser"},{"name":"Marc Forster"},{"name":"Trần Gia Thượng"},{"name":"Aleksander Bach"},{"name":"Lý Liên Kiệt"},{"name":"Guy Ritchie"},{"name":"Robert Conway"},{"name":"Đặng Siêu"},{"name":"Lưu Diệc Phi"},{"name":"Trịnh Trung Cơ"},{"name":"Trâu Triệu Long"},{"name":"Hoàng Thu Sinh"},{"name":"Ngô Tú Ba"},{"name":"Giang Nhất Yến"},{"name":"Thành Thái Sân"},{"name":"Nicholas Meyer"},{"name":"Jonathan Frakes"},{"name":"Cary Joji Fukunaga"},{"name":"William Shatner"},{"name":"John R. Leonetti"},{"name":"Ousa Khun"},{"name":"Daniel Espinosa"},{"name":"Shiqing,Zhuangzhuang Tian"},{"name":"David Carson"},{"name":"Tommy Krappweis"},{"name":"Hsiao-hsien Hou"},{"name":"Wes Ball"},{"name":"Nima Nourizadeh"},{"name":"Mabel Cheung"},{"name":"Valeri Milev"},{"name":"Terry Jones"},{"name":"Tom Harper"},{"name":"Breck Eisner"},{"name":"Clarence Yiu-leung Fok"},{"name":"John Erick Dowdle"},{"name":"Arthur Wong"},{"name":"Sam Mendes"},{"name":"Peyton Reed"},{"name":"Siu-Keung Cheng"},{"name":"S.S. Rajamouli"},{"name":"T.J. Scott"},{"name":"Don Michael Paul"},{"name":"Dong-hoon Choi"},{"name":"Baltasar Kormákur"},{"name":"Stanton Barrett"},{"name":"Stephen S. Campanelli"},{"name":"Paul Hyett"},{"name":"Alan Smithee"},{"name":"Kevin Greutert"},{"name":"Ron Scalpello"},{"name":"Pakphum Wonjinda"},{"name":"Boaz Yakin"},{"name":"Rick Famuyiwa"},{"name":"Baoping Cao"},{"name":"Francesco Picone"},{"name":"Doug Ellin"},{"name":"Joel Edgerton"},{"name":"Josh Trank"},{"name":"Damien Leone"},{"name":"Shane Abbess"},{"name":"Colin Minihan"},{"name":"Scot Armstrong"},{"name":"Oleg Stepchenko"},{"name":"Alistair Legrand"},{"name":"Ang Xu"},{"name":"Takashi Miike"},{"name":"Omung Kumar"},{"name":"Wych Kaosayananda"},{"name":"R.D. Braunstein"},{"name":"Bhushan Patel"},{"name":"Alec Gillis"},{"name":"Qian Long"},{"name":"Koichi Sakamoto"},{"name":"Buz Alexander"},{"name":"Scott Cooper"},{"name":"Noh Jin-soo"},{"name":"Jerry Dugan"},{"name":"Kyle Balda,Pierre Coffin"},{"name":"Chookiat Sakveerakul"},{"name":"Bobby Farrelly,Peter Farrelly"},{"name":"Mora Stephens"},{"name":"Pete Docter,Ronaldo Del Carmen"},{"name":"Camille Delamarre"},{"name":"Christopher McQuarrie"},{"name":"Kim Hak-Soon"},{"name":"Shyam Madiraju"},{"name":"Ken Sanzel"},{"name":"Amariah Olson,Obin Olson"},{"name":"Adam Egypt Mortimer"},{"name":"John Francis Daley,Jonathan M. Goldstein"},{"name":"Rupert Goold"},{"name":"Jon Amiel"},{"name":"Jack Heller"},{"name":"Alan Taylor"},{"name":"Leonard Nimoy"},{"name":"Bharat Nalluri"},{"name":"Stephen Reynolds"},{"name":"Brad Peyton"},{"name":"Brad Bird"},{"name":"Tarsem Singh"},{"name":"Josh Forbes"},{"name":"James Griffiths"},{"name":"Remo"},{"name":"Vương Lạc Đan"},{"name":"Châu Du Dân"},{"name":"Nhậm Đạt Hoa"},{"name":"Bào Khởi Tịnh"},{"name":"Thiên Tâm"},{"name":"Matteo Garrone"},{"name":"Raman Hui"},{"name":"Andrew Mogel,Jarrad Paul"},{"name":"Chad Burns"},{"name":"Byung hun Lee"},{"name":"Do yeon Jeon"},{"name":"Go eun Kim"},{"name":"John Andreas Andersen,Lisa Marie Gamlem"},{"name":"Robert Wise"},{"name":"Chengpeng Dong"},{"name":"Charles Stone III"},{"name":"Sai Kishore Macha"},{"name":"Uli Edel"},{"name":"Ringo Lam"},{"name":"Brett Kelly"},{"name":"Gregory Jacobs"},{"name":"Trần Khải Ca"},{"name":"Lok Man Leung"},{"name":"Toby Genkel,Sean McCormack"},{"name":"Kyle Newman"},{"name":"Lưu Thanh"},{"name":"Châu Hạo Đông"},{"name":"Ngô Nghiên Nghiên"},{"name":"Triệu Thiên Tử"},{"name":"Vu Tử Kiện"},{"name":"Elizabeth Banks"},{"name":"Miguel Ángel Vivas"},{"name":"Dương Văn Quân,Hoàng Bân"},{"name":"Carl Rinsch"},{"name":"Tim Johnson"},{"name":"Tom Vaughan"},{"name":"Yoshihiro Osugi"},{"name":"Anne Fletcher"},{"name":"Carla Gugino"},{"name":"Dick Van Dyke"},{"name":"Mickey Rooney"},{"name":"Bill Cobbs"},{"name":"Neil Jones"},{"name":"Puri Jagannadh"},{"name":"Yoon Jae-gu"},{"name":"Ha Yoo"},{"name":"Baek Woon-hak"},{"name":"Nitchapoom Chaianun"},{"name":"Nadeem Soumah"},{"name":"Benni Diez"},{"name":"George Tillman Jr."},{"name":"Đằng Hoa Đào"},{"name":"Till Kleinert"},{"name":"Gilles Paquet-Brenner"},{"name":"Colin Trevorrow"},{"name":"David Robert Mitchell"},{"name":"Daniel Craig"},{"name":"Liev Schreiber"},{"name":"Jamie Bell"},{"name":"George MacKay"},{"name":"Noah Baumbach"},{"name":"George Miller"},{"name":"Jen Soska,Sylvia Soska"},{"name":"Jalmari Helander"},{"name":"David Bisbano,Mychal Simka"},{"name":"Byeong-Heon Lee"},{"name":"James McTeigue"},{"name":"Spike Brandt,Tony Cervone"},{"name":"Ho Leung Lau"},{"name":"Andy Fickman"},{"name":"Seth Macfarlane"},{"name":"Baran bo Odar"},{"name":"Ernie Barbarash"},{"name":"Lee Toland Krieger"},{"name":"Chris Buck,Jennifer Lee"},{"name":"Gil Kenan"},{"name":"David Gelb"},{"name":"Adrian Teh"},{"name":"Kenneth Branagh"},{"name":"Li Kai"},{"name":"Alex Garland"},{"name":"Julius Avery"},{"name":"Kazuaki Kiriya"},{"name":"Joss Whedon"},{"name":"Angelina Jolie"},{"name":"Anne K. Black"},{"name":"Tomm Moore"},{"name":"Trâu Hiên"},{"name":"Louis Clichy,Alexandre Astier"},{"name":"Sergey Bodrov"},{"name":"Henry Hobson"},{"name":"Richard Glatzer,Wash Westmoreland"},{"name":"Yi Li"},{"name":"Park Je Hyun"},{"name":"Ekachai Uekrongtham"},{"name":"James Marsh"},{"name":"Joe Lynch"},{"name":"Hong-seon Kim"},{"name":"Rupert Wyatt"},{"name":"Peter Sattler"},{"name":"Daniel Benmayor"},{"name":"Ngô Kinh"},{"name":"Daniel Yee Heng Chan"},{"name":"Andy Wachowski"},{"name":"Rob Marshall"},{"name":"Ana Lily Amirpour"},{"name":"Julie Delpy"},{"name":"Adam Goldberg"},{"name":"Daniel Brühl"},{"name":"Jeong-Beom Lee"},{"name":"Trương Lãi"},{"name":"Jan Komasa"},{"name":"Shawn Levy"},{"name":"Thái Nhạc Huân"},{"name":"Mike Newell"},{"name":"Jing Wong"},{"name":"Keishi Ohtomo"},{"name":"Jonathan Liebesman,Michael Bay"},{"name":"Miles Teller"},{"name":"J.K. Simmons"},{"name":"Melissa Benoist"},{"name":"Han-min Kim"},{"name":"Trần Bình Trọng"},{"name":"Christopher Nolan"},{"name":"Lee Yae Young"},{"name":"Ethan Spaulding"},{"name":"Simon West"},{"name":"Paul Newman"},{"name":"Robert Redford"},{"name":"Robert Shaw"},{"name":"Igor Petrenko"},{"name":"Artyom Semakin"},{"name":"Aleksey Panin"},{"name":"Franka Potente"},{"name":"Moritz Bleibtreu"},{"name":"Herbert Knaup"},{"name":"Jason Reitman"},{"name":"Kevin Smith"},{"name":"Brian Thompson"},{"name":"Mark Dacascos"},{"name":"Marisa Ramirez"},{"name":"Michael Douglas"},{"name":"Kathleen Turner"},{"name":"Danny DeVito"},{"name":"Joe Chen"},{"name":"Melissa McCarthy"},{"name":"Susan Sarandon"},{"name":"Kathy Bates"},{"name":"Gregg Araki"},{"name":"Kil Kang Ahn"},{"name":"Sung kee Ahn"},{"name":"Choi Jin Hyuk"},{"name":"Jonathan Daniel Brown"},{"name":"Kenny Wormald"},{"name":"Ron Perlman"},{"name":"Erica Carroll"},{"name":"Tyler Johnston"},{"name":"Emily Tennant"},{"name":"Rowan Joffe"},{"name":"Kevin Hart"},{"name":"Michael Ealy"},{"name":"Regina Hall"},{"name":"Fabrice Du Welz"},{"name":"Min sik Choi"},{"name":"Seung Ryong Ryoo"},{"name":"Ryu Seung Ryong"},{"name":"Son Ye Jin"},{"name":"Song Il Guk"},{"name":"Wong Jing"},{"name":"Miho Nakayama"},{"name":"Hidetoshi Nishijima"},{"name":"Yuriko Ishida"},{"name":"Mike Elliott"},{"name":"Satoshi Tsumabuki"},{"name":"Jessica Cambensy"},{"name":"Abby Fung"},{"name":"Chang Han"},{"name":"Juri Ueno"},{"name":"Yûta Hiraoka"},{"name":"Shihori Kanjiya"},{"name":"Ed Speleers"},{"name":"Will Poulter"},{"name":"Alfie Allen"},{"name":"James Corden"},{"name":"Alexandra Roach"},{"name":"Julie Walters"},{"name":"James Mottern"},{"name":"James Franco"},{"name":"Seth Rogen"},{"name":"Randall Park"},{"name":"Wai-Keung Lau,Andrew Loo"},{"name":"Tom Hanks"},{"name":"Tim Allen"},{"name":"Kristen Schaal"},{"name":"Glen Hansard"},{"name":"Markéta Irglová"},{"name":"Hugh Walsh"},{"name":"Taraji P. Henson"},{"name":"Idris Elba"},{"name":"Leslie Bibb"},{"name":"Chad Stahelski,David Leitch"},{"name":"Shao Yichen"},{"name":"Meng Xianglong"},{"name":"Teo Halm"},{"name":"Astro"},{"name":"Reese Hartwig"},{"name":"Blythe Auffarth"},{"name":"Bianca Collins"},{"name":"Trịnh Y Kiện"},{"name":"Cổ Thiên Lạc"},{"name":"Chương Tử Di"},{"name":"Trương Bá Chi"},{"name":"Đàm Diệu Văn"},{"name":"Jet Li"},{"name":"Morgan Freeman"},{"name":"Bob Hoskins"},{"name":"Kerry Condon"},{"name":"Wesley Snipes"},{"name":"Kris Kristofferson"},{"name":"Norman Reedus"},{"name":"Leonor Varela"},{"name":"Donnie YenDonnie Yen"},{"name":"Jeon Ji Hyun"},{"name":"Jang Hyuk"},{"name":"Kim Jeong Tae"},{"name":"Adam Wingard"},{"name":"Chung Tử Đơn"},{"name":"Mạc Thiếu Thông"},{"name":"Rosamund Kwan"},{"name":"Xiong Xin Xin"},{"name":"Chan Kwok Bong"},{"name":"Nick Powell"},{"name":"Ram Charan"},{"name":"Allu Arjun"},{"name":"Shruti K. Haasan"},{"name":"AShawn Wayans"},{"name":"Marlon Wayans"},{"name":"Shannon Elizabeth"},{"name":"Regina Hall."},{"name":"Charlene Choi Cheuk Yin"},{"name":"Gillian Chung Yun Tung"},{"name":"Sammo Hung Kam Bo"},{"name":"Jacky Wu"},{"name":"Yuen Wah"},{"name":"Jess Zhang"},{"name":"Steven Cheung"},{"name":"Sam Lee Chan Sam"},{"name":"Jessica Biel"},{"name":"Parker Posey"},{"name":"Takehiko Shinjo"},{"name":"Wagner Moura"},{"name":"Caio Junqueira"},{"name":"André Ramiro"},{"name":"Brad Pitt"},{"name":"Catherine Mccormack"},{"name":"Stephen Dillane"},{"name":"Shidô Nakamura"},{"name":"Nathan Jones"},{"name":"Chung Tử Ðơn"},{"name":"Nicholas Tse"},{"name":"Shawn Yue"},{"name":"Jie Dong"},{"name":"Michaël R. Roskam"},{"name":"Hàn Đình"},{"name":"Jason Statham"},{"name":"Nadine Velazquez"},{"name":"Andrea Roth"},{"name":"Kane Kosugi"},{"name":"Stephen Dorff"},{"name":"Scott Frank"},{"name":"R.J. Cutler"},{"name":"Andreas Prochaska"},{"name":"Quan Chi Lâm"},{"name":"Nguyên Bưu"},{"name":"Trịnh Tắc Sỹ"},{"name":"Hùng Hân Hân"},{"name":"Trương Học Hữu"},{"name":"Roy Hin Yeung Chow"},{"name":"Markus Goller"},{"name":"Ryuichi Yagi,Takashi Yamazaki"},{"name":"Lee Jeongbeom"},{"name":"John Lithgow"},{"name":"Michael Rooker"},{"name":"Elizabeth Maxwell"},{"name":"Maaya Sakamoto"},{"name":"Christian Bale"},{"name":"Paul Schneider"},{"name":"Shigeo Kobayashi"},{"name":"David Fincher"},{"name":"Kåre Hedebrant"},{"name":"Lina Leandersson"},{"name":"Per Ragnar"},{"name":"Fred Cavayé"},{"name":"David Holt"},{"name":"Emma Tate"},{"name":"Jimmy Hibbert"},{"name":"Châu Nhuận Phát"},{"name":"Mira Sorvino"},{"name":"Jürgen Prochnow"},{"name":"Til Schweiger"},{"name":"Dương Tử Quỳnh"},{"name":"Jonathan Rhys Meyers"},{"name":"Radha Mitchell"},{"name":"Bruce Willis William Sadler Bonnie Bedelia Dennis Franz Johmos Franco Nero Reginald VelJohnson"},{"name":"Yun Fat Chow"},{"name":"Xun Zhou"},{"name":"Yi Lu"},{"name":"Châu Kiệt Luân"},{"name":"Củng Lợi"},{"name":"Seann William Scott"},{"name":"Jaime King"},{"name":"Karel Roden"},{"name":"Vic Armstrong"},{"name":"Bruce Willis Jeremy Irons Samuel L. Jackson Larry Bryggman Graham Greene Colleen Camp"},{"name":"Wesley Snipes và Sandra Bullock"},{"name":"James Wong"},{"name":"Sylvia Chang"},{"name":"Huang Kun Husen"},{"name":"Teddy Chan"},{"name":"Kei'ichi Sato"},{"name":"Tommy Wirkola"},{"name":"Ashley Judd"},{"name":"Nathan Gamble"},{"name":"Takashi Shimizu"},{"name":"Jennifer Kent"},{"name":"Ben Kingsley"},{"name":"Jared Harris"},{"name":"Nick Frost"},{"name":"Bobbi Sue Luther"},{"name":"Kevin Gage"},{"name":"Lena Headey"},{"name":"Paul Thomas Anderson"},{"name":"Len Wiseman"},{"name":"Morgana O'Reilly"},{"name":"Rima Te Wiata"},{"name":"Glen Paul Waru"},{"name":"Max Theirot"},{"name":"Denzel Whitaker"},{"name":"Zena Grey"},{"name":"Frank Grillo"},{"name":"Danny Lee and Yueh Sun"},{"name":"Michael Tse"},{"name":"Francis Ng"},{"name":"Chapman To"},{"name":"Bosco Wong"},{"name":"Kara Hui"},{"name":"Charlize Theron"},{"name":"Jeremy Renner"},{"name":"Frances McDormand"},{"name":"Bruce Willis"},{"name":"Bonnie Bedelia"},{"name":"Paul Gleason"},{"name":"ACharlie Sheen"},{"name":"Tobin Bell"},{"name":"Costas Mandylor"},{"name":"Mark Rolston"},{"name":"Betsy Russell"},{"name":"Hilary Duff"},{"name":"Adam Lamberg"},{"name":"Robert Carradine"},{"name":"Hallie Todd"},{"name":"Jake Thomas"},{"name":"Eric Darnell,Simon J. Smith"},{"name":"Marlon WayansRegina Hall"},{"name":"Jessica Bielrski"},{"name":"Liam Neeson"},{"name":"Dermot Mulroney and Frank Grillo"},{"name":"Scott Patterson"},{"name":"Samy Naceri"},{"name":"Roschdy Zem"},{"name":"Sami Bouajila"},{"name":"Aline Moraes"},{"name":"Maria Luísa Mendonça"},{"name":"Naomi Wattsnd Sissy Spacek"},{"name":"Aaron StanfordVinessa Shaw"},{"name":"Danny TrejoSteve Austin"},{"name":"Andrew Douglas"},{"name":"Shawnee Smith"},{"name":"Donnie Wahlberg"},{"name":"Cary Elwes"},{"name":"Danny Glover"},{"name":"Sopon Sukdapisit"},{"name":"Vin Diesel"},{"name":"Brittany Snow"},{"name":"Max Thieriot"},{"name":"Morgan York"},{"name":"Julie Andrews"},{"name":"Anne Hathaway"},{"name":"Hector Elizondo"},{"name":"A FarisRegina HallCraig Bierko"},{"name":"Naomi Watts"},{"name":"Martin Henderson"},{"name":"Brian Cox"},{"name":"Michael McMillian"},{"name":"Jessica Stroup"},{"name":"Jacob Vargas"},{"name":"Angus Macfadyen"},{"name":"Brad Pitt Eric Bana Orlando Bloom Diane Kruger Owain Yeoman Brian Cox Sean Bean Julie Christie Peter O’Toole Rose Byrne"},{"name":"Michael Spierig"},{"name":"Cát Ưu"},{"name":"Khương Vũ"},{"name":"Lý Tu Hiền"},{"name":"Sally Yeh"},{"name":"Kong Chu"},{"name":"Stiles White"},{"name":"Priyanka Chopra"},{"name":"Kangana"},{"name":"Mithun Chakraborty"},{"name":"Abhishek Bachchan"},{"name":"Aishwarya Rai Bachchan"},{"name":"Bernard Hill"},{"name":"Ewan Stewart"},{"name":"Chris Messina"},{"name":"Logan Marshall Green"},{"name":"Jenny O Hara"},{"name":"Sean Patrick Flanery"},{"name":"Drew Waters"},{"name":"Geogre Cheung"},{"name":"Victoria Pratt"},{"name":"Chow Yun Fat"},{"name":"Leslie Cheung Kwok wing"},{"name":"Cherie Chung"},{"name":"Pierce Brosnan"},{"name":"Pedro Armendáriz Jr."},{"name":"Jacques Perrin"},{"name":"Roy Cheung"},{"name":"Shui Wah Fok"},{"name":"Richard Dreyfuss"},{"name":"Ving Rhames"},{"name":"Elisabeth Shue"},{"name":"Cécile De France"},{"name":"Thierry Neuvic"},{"name":"Cyndi Mayo Davis"},{"name":"Ferguson hs"},{"name":"Neil MaskellHarry Simpson"},{"name":"Lương Triều Vỹ"},{"name":"Châu Tấn"},{"name":"Lưu Thanh Vân"},{"name":"Viên Ni"},{"name":"Noel Clarke"},{"name":"John Cusack"},{"name":"Paul W. S. Anderson"},{"name":"Neil Nitin Mukesh"},{"name":"John Abraham"},{"name":"Rekha"},{"name":"Sharat Saxena"},{"name":"Puneet Issar"},{"name":"Nikki Blonsky"},{"name":"John Travolta"},{"name":"Michelle Pfeiffer"},{"name":"David O'Brien"},{"name":"Patrick Stewart"},{"name":"Richard Jenkins"},{"name":"Kodi Smit McPhee"},{"name":"Chloe Moretz"},{"name":"Cara Buono"},{"name":"Imran Khan"},{"name":"Genelia D'Souza"},{"name":"Manjari Fadnis"},{"name":"Mark Strong"},{"name":"Roger Bilham"},{"name":"Simon Boxall"},{"name":"Don Hall,Chris Williams"},{"name":"Shah Rukh Khan"},{"name":"Madhuri Dixit"},{"name":"Amrish Puri"},{"name":"Ranjeet"},{"name":"Salim Ghouse"},{"name":"Deepshika"},{"name":"Ashok Saraf"},{"name":"Jack Gaud"},{"name":"Gary Winick"},{"name":"Gia Coppola"},{"name":"Shane West"},{"name":"Rachael Leigh Cook"},{"name":"Cam Gigandet"},{"name":"Amanda Adrienne"},{"name":"Tom Ardavany"},{"name":"Ronnie Gene Blevins"},{"name":"Ernie Charles"},{"name":"Robbie Amell"},{"name":"Alexa PenaVega"},{"name":"Victor Garber"},{"name":"Michelle Forbes"},{"name":"Suriya"},{"name":"Johnny Nguyen"},{"name":"Abhinaya"},{"name":"David Cronenberg"},{"name":"Jesse Metcalfe"},{"name":"Amber Tamblyn"},{"name":"Joel David Moore"},{"name":"Hye Lin Han"},{"name":"Haneul Kang"},{"name":"So eun Kim"},{"name":"Doo Sik Park"},{"name":"Richard Linklater"},{"name":"Michèle Laroque"},{"name":"Jacques Gamblin"},{"name":"Wladimir Yordanoff"},{"name":"Marion Cotillard"},{"name":"Fabrizio Rongione"},{"name":"Pili Groyne"},{"name":"Action,Comedy,Horror"},{"name":"Park Sang-Joon"},{"name":"Kirk Douglas"},{"name":"Martin Sheen"},{"name":"Katharine Ross"},{"name":"Patrick Hughes"},{"name":"Jaume Balagueró"},{"name":"Kim Yong-Hwa"},{"name":"Yan Han"},{"name":"Sergio Manfio"},{"name":"Kwak Jae Young"},{"name":"Hirokazu Koreeda"},{"name":"Rodrigo Cortés"},{"name":"Hong Chang-Pyo"},{"name":"Dzhanik Fayziev,Ivan Shurkhovetskiy"},{"name":"Yuzuru Tachikawa"},{"name":"Khám Gia Vĩ"},{"name":"Chun-Yi Hsieh"},{"name":"Dean Devlin"},{"name":"Hwang Dong-HyukNam Hán Sơn Thành"},{"name":"Ahmed Khan"},{"name":"Panos CosmatosChris 'Casper' Kelly"},{"name":"Yoshihiro Nakamura"},{"name":"Hark Tsui"},{"name":"Ari Aster"},{"name":"Vincent Kok"},{"name":"Luke Sparke"},{"name":"Cheng-Kuo Yen"},{"name":"Kazuaki Imai"},{"name":"Cho Keun-Hyun"},{"name":"Jon Turteltaub"},{"name":"Simon Kaijser"},{"name":"Albert Hughes"},{"name":"Jeff Cheung"},{"name":"Tsutomu Hanabusa"},{"name":"Siddharth Malhotra"},{"name":"William H. Macy"},{"name":"Lee Eon-hee"},{"name":"Gary Ross"},{"name":"Yamamoto Yaseuichiro"},{"name":"Kim Dae-Woong"},{"name":"Vadim GolovanovRustam Mosafir"},{"name":"Dmitriy Kiselev"},{"name":"Kay Cannon"},{"name":"Franck Gastambide"},{"name":"Meghna Gulzar"},{"name":"Lưu Hải Lượng"},{"name":"Lee Hae Young"},{"name":"Đang cập nhật."},{"name":"Travis Zariwny"},{"name":"Sebastián Lelio"},{"name":"Rene Liu"},{"name":"Đức Thịnh"},{"name":"Patricia Ferreira"},{"name":"York Alec Shackleton"},{"name":"Ben Young"},{"name":"Kim Jin-Mook"},{"name":"Christopher Jenkins"},{"name":"José Padilha"},{"name":"Cáp Tư Triều Lỗ"},{"name":"Trương Gia Huy"},{"name":"Juan Antonio Bayona"},{"name":"Oleh Malamuzh"},{"name":"Hoàng Hoàng"},{"name":"Julius Ramsay"},{"name":"Bobby Moresco"},{"name":"Matthew Ross"},{"name":"Tomonori Sudô"},{"name":"Hasraf Dulull"},{"name":"Fatih Akin"},{"name":"Sanjay Leela Bhansali"},{"name":"Ryûhei Kitamura"},{"name":"Sung-hyun Byun"},{"name":"Lee Jang-Hoon"},{"name":"John Stevenson"},{"name":"Robert Smigel"},{"name":"Lee Han-Wook"},{"name":"Vaughn Stein"},{"name":"Nick Park"},{"name":"Guy Pearce"},{"name":"Felicity Jones"},{"name":"Amy Ryan"},{"name":"Mackenzie Davis"},{"name":"Gayatri Joshi"},{"name":"Kishori Balal"},{"name":"Smith Seth"},{"name":"Iko Uwais"},{"name":"Sisca Jessica"},{"name":"Christine Hakim"},{"name":"James Cullen Bressack"},{"name":"Tiêu Tuấn Diễm"},{"name":"Đổng Tử Kiện"},{"name":"Vương Long Hoa"},{"name":"Tilda Swinton"},{"name":"Flavio Parenti"},{"name":"Edoardo Gabbriellini"},{"name":"Luc Besson"},{"name":"Brad Anderson"},{"name":"Numan Acar"},{"name":"Meret Becker"},{"name":"Gode Benedix"},{"name":"Kate Beckinsale"},{"name":"Jim Sturgess"},{"name":"David Thewlis"},{"name":"Brendan Gleeson"},{"name":"Steve Austin"},{"name":"Daniel Magder"},{"name":"Janet Kidder"},{"name":"Elias Ferkin"},{"name":"Massimo Dobrovic"},{"name":"Ron Balicki"},{"name":"Gary Shore"},{"name":"James Gunn"},{"name":"Dallas Richard Hallam,Patrick Horvath"},{"name":"Casper Christensen"},{"name":"Frank Hvam"},{"name":"Ali Kazim"},{"name":"Aílton Carmo"},{"name":"Jéssica Barbosa"},{"name":"Flávio Rocha"},{"name":"Steven Soderbergh"},{"name":"Rohit Shetty"},{"name":"Kevin Costner"},{"name":"Jeanne Tripplehorn"},{"name":"Dennis Hopper"},{"name":"Dư Văn Lạc"},{"name":"Elanne Kwong"},{"name":"Ed Harris"},{"name":"Eva Longoria"},{"name":"Michael Peña"},{"name":"Casper Van Dien"},{"name":"Denise Richards"},{"name":"Dina Meyer"},{"name":"Jae-Gyu Lee"},{"name":"Simon Yam"},{"name":"Sandra Kwan Yue Ng"},{"name":"Aarif Rahman"},{"name":"Shawn Wayans"},{"name":"Kerry Washington"},{"name":"Lindsay Lohan"},{"name":"Dennis Quaid"},{"name":"Natasha Richardson"},{"name":"Elaine Hendrix"},{"name":"Jong ryol Choi"},{"name":"Mi ne Jang"},{"name":"Gyu su Jeon"},{"name":"Harrison Ford"},{"name":"Anne Heche"},{"name":"David Schwimmer"},{"name":"Riisa Naka"},{"name":"Akiyoshi Nakao"},{"name":"Munetaka Aoki"},{"name":"Anna Ishibash"},{"name":"Caroline Dhavernas"},{"name":"Joe Dinicol"},{"name":"Eddie Cibrian"},{"name":"Josie Davis"},{"name":"Robert Bailey Jr."},{"name":"Matt Reeves"},{"name":"Felix Chong,Alan Mak"},{"name":"Eddie Peng"},{"name":"Ivy Yi Han Chen"},{"name":"Michelle Yan Hsi Chen"},{"name":"Toshiaki Toyoda"},{"name":"Lâm hy lôi"},{"name":"Tiểu thẩm dương"},{"name":"Lars Bom"},{"name":"Camilla Bendix"},{"name":"Bjarne Henriksen"},{"name":"Christy Chung"},{"name":"Man Tat Ng"},{"name":"Glenn Jacobs"},{"name":"Danielle Harris"},{"name":"Katharine Isabelle"},{"name":"Andrzej Bartkowiak"},{"name":"Steven Quale"},{"name":"Robert Hays"},{"name":"Julie Hagerty"},{"name":"Leslie Nielsen"},{"name":"Tom Cruise"},{"name":"Bill Nighy"},{"name":"Carice van Houten"},{"name":"Ngô Tôn"},{"name":"Thái Trác Nghiêm"},{"name":"Hồ Ca"},{"name":"Luke Greenfield"},{"name":"Aaron Pedersen"},{"name":"Hugo Weaving"},{"name":"Ryan Kwanten"},{"name":"Jack Thompson"},{"name":"Philip Seymour Hoffman"},{"name":"Rachel McAdams"},{"name":"Cary Hiroyuki Tagawa"},{"name":"Rade Serbedzija"},{"name":"Gary Daniels"},{"name":"Andy Lau"},{"name":"Daniel Wu"},{"name":"Louis Koo"},{"name":"Chang"},{"name":"Paul Haggis"},{"name":"Katie Cassidy"},{"name":"Garret Dillahunt"},{"name":"Michelle Trachtenberg"},{"name":"Michael Imperioli"},{"name":"Ryan Guzman"},{"name":"Briana Evigan"},{"name":"Adam G. Sevani"},{"name":"Johnnie To,Ka-Fai Wai"},{"name":"Henrik Ruben Genz"},{"name":"Jon Hamm"},{"name":"Aasif Mandvi"},{"name":"Alan Arkin"},{"name":"Shahin Sean Solimon"},{"name":"Al Pacino"},{"name":"Benjamin Salisbury"},{"name":"Winona Ryder"},{"name":"Darnell Williams"},{"name":"John Slattery"},{"name":"Gabe Ibáñez"},{"name":"Phillip Noyce"},{"name":"Ashton Kutcher"},{"name":"Melissa Sagemiller"},{"name":"Sela Ward"},{"name":"Owen Wilson"},{"name":"Zach Galifianakis"},{"name":"Amy Poehler"},{"name":"Thành Long"},{"name":"Trương Mạn Ngọc"},{"name":"Tăng Giang"},{"name":"Nguyên Hoa"},{"name":"Jackie Chan"},{"name":"Micheal Hui"},{"name":"Charlene Choi"},{"name":"Sidharth Malhotra"},{"name":"Shraddha Kapoor"},{"name":"Meher Acharya Dar"},{"name":"Joaquin Phoenix"},{"name":"Dagmara Dominczyk"},{"name":"Jack O’Connell"},{"name":"Rupert Friend"},{"name":"Ben Mendelsohn"},{"name":"Sam Spruell"},{"name":"Zach Braff"},{"name":"Joey King"},{"name":"Pierce Gagnon"},{"name":"Natalie Scheetz"},{"name":"Christa Campbell"},{"name":"Caroline Williams"},{"name":"Neal McDonough"},{"name":"Laila Ali"},{"name":"Lateef Crowder"},{"name":"Emily Perkins"},{"name":"Kris Lemche"},{"name":"Mimi Rogers"},{"name":"Ngô Quân Như"},{"name":"Hoàng Bách Minh"},{"name":"Lý Hương Cầm"},{"name":"Svetlana Metkina"},{"name":"Andrew Roux"},{"name":"Peter Stormare"},{"name":"Oka Antara"},{"name":"Rin Takanashi"},{"name":"Kazuki Kitamura"},{"name":"Luna Maya"},{"name":"Chao Deng"},{"name":"Lưu Tâm Du"},{"name":"Lý Nguyên Linh"},{"name":"Ngô Gia Lệ"},{"name":"Tony Leung Chiu Wai"},{"name":"Anthony Wong Chau Sang"},{"name":"Ju Ge Liang"},{"name":"Sonia Sui"},{"name":"Chris Wang"},{"name":"Mat Brunet"},{"name":"Sajid Nadiadwala"},{"name":"Lưu Thi Thi"},{"name":"Trương Chấn"},{"name":"Jake Kasdan"},{"name":"Alexandre Aja"},{"name":"Jong-bin Yun"},{"name":"William Eubank"},{"name":"Amy Smart"},{"name":"Jamie Chung"},{"name":"Trevor Donovan"},{"name":"Linda Hamilton"},{"name":"Mya"},{"name":"Jukrit Ammarat"},{"name":"Nopachai Chaiyanam"},{"name":"Inthira Charoenpura"},{"name":"Sorapong Chatree"},{"name":"Lâm Tâm Như"},{"name":"Ngô Trấn Vũ"},{"name":"Mạc Tiểu Kỳ"},{"name":"Cecilia Cheung"},{"name":"Dong gun Jang"},{"name":"Hiroyuki Sanada"},{"name":"Kelly Stables"},{"name":"Vicki Lewis"},{"name":"Jim Cummings"},{"name":"Laraine Newman"},{"name":"Ben Diskin"},{"name":"Grant George"},{"name":"David Lodge"},{"name":"Asen Asenov"},{"name":"Tom Berenger"},{"name":"Chad Michael Collins"},{"name":"Vasil Enev"},{"name":"David Duchovny"},{"name":"Gillian Anderson"},{"name":"John Neville"},{"name":"William B. Davis"},{"name":"Nasser Al Aulaqi"},{"name":"Saleha Al Aulaqi"},{"name":"Muqbal Al Kazemi"},{"name":"Abdul Rahman Barman"},{"name":"Trương Chi Lượng"},{"name":"Phil Lord,Christopher Miller"},{"name":"Hong Jong-Chan"},{"name":"Dương Mịch"},{"name":"Quách Thái Khiết"},{"name":"Gillian Chung"},{"name":"Yeong ae Kim"},{"name":"Do Won Kwak"},{"name":"Dal su Oh"},{"name":"Jason Lee"},{"name":"Koen De Bouw"},{"name":"Filip Peeters"},{"name":"Matthias Schoenaerts"},{"name":"Seth MacFarlane"},{"name":"Dư Tâm Điềm"},{"name":"Quách Diễm"},{"name":"Lang Bằng"},{"name":"Phó Mạn"},{"name":"Takeshi Kaneshiro"},{"name":"Takako Matsu"},{"name":"Tôru Nakamura"},{"name":"Đang Cập Nhật"},{"name":"Elias Koteas"},{"name":"Paige Turco"},{"name":"Stuart Wilson"},{"name":"John V. Soto"},{"name":"Jonathan Liebesman"},{"name":"SUJU"},{"name":"Joe Vargas"},{"name":"Cinda Adams"},{"name":"Edward Asner"},{"name":"George Babbit"},{"name":"Murray Blue"},{"name":"caleb steinmeyer"},{"name":"Zulay henao"},{"name":"Bill sage"},{"name":"Kim Sang-Hyub"},{"name":"Devon Aoki"},{"name":"Will Finn,Dan St. Pierre"},{"name":"Alastair Fothergill,Keith Scholey"},{"name":"Tim Garrick"},{"name":"Adar Beck"},{"name":"Gemma Chan"},{"name":"Nathalie Cox"},{"name":"John Lloyd Fillingham"},{"name":"Chu Sheng Chen"},{"name":"Kimi Hsia"},{"name":"I Chen Ko"},{"name":"Trae Ireland"},{"name":"Erin Coker"},{"name":"Jody Barton"},{"name":"AmaLukas Haas"},{"name":"Gary Oldman"},{"name":"Evan McGuire"},{"name":"Christen Mooney"},{"name":"Steven Knight"},{"name":"Trương Quốc Vinh"},{"name":"Địch Long"},{"name":"Ngô Mẫn Đạt"},{"name":"Peter Facinelli"},{"name":"Sophia Myles"},{"name":"Nathalia Ramos"},{"name":"Cas Anvar"},{"name":"Charles Edwards"},{"name":"James Puddephatt"},{"name":"Anna Shurochkina"},{"name":"Ivan Okhlobystin"},{"name":"Galina Tyunina"},{"name":"Dmitriy Nagiev"},{"name":"Barbara Goodson"},{"name":"James Van Der Beek"},{"name":"Lara Cody"},{"name":"Kim Sun A"},{"name":"Ma dong seok"},{"name":"Shin Jung Keun"},{"name":"Châu Bảo Ý"},{"name":"Lý Tử Hùng"},{"name":"Johnny Depp"},{"name":"Rebecca Hall"},{"name":"Paul Bettany"},{"name":"Cillian Murphy"},{"name":"Jimmy Hayward"},{"name":"Brett Simmons"},{"name":"Moises Arias"},{"name":"Will Arnett"},{"name":"Bridgit Mendler"},{"name":"Jason Patric"},{"name":"James Caan"},{"name":"Melissa Ordway"},{"name":"Leonardo DiCaprio"},{"name":"Daniel Day Lewis"},{"name":"Cameron Diaz"},{"name":"Mia Wasikowska"},{"name":"Adam Driver"},{"name":"Emma Booth"},{"name":"Jessica Tovey"},{"name":"Amma Asante"},{"name":"Gary Fleder"},{"name":"Clif Prowse"},{"name":"Derek Lee"},{"name":"Michael Gill"},{"name":"Milla Jovovich"},{"name":"Sophie Monk"},{"name":"Tad Hilgenbrink"},{"name":"William Sadler"},{"name":"Janet Montgomery"},{"name":"Michael J. Fox"},{"name":"Sean Penn"},{"name":"Don Harvey"},{"name":"John C. Reilly"},{"name":"Arnold Schwarzenegger"},{"name":"Carl Weathers"},{"name":"Elpidia Carrillo"},{"name":"Allison Miller"},{"name":"Zach Gilford"},{"name":"Sam Anderson"},{"name":"Toni Collette"},{"name":"Imogen Poots"},{"name":"Aaron Paul"},{"name":"Frida Farrell"},{"name":"Nick Mancuso"},{"name":"Rhett Giles"},{"name":"Christian Willis"},{"name":"Albert Finney"},{"name":"Lauren Bacall"},{"name":"Martin Balsam"},{"name":"Ingrid Bergman"},{"name":"Lee Hwan Kyung"},{"name":"Paul Sorvino"},{"name":"Anthony Head"},{"name":"Sarah Brightman"},{"name":"Kirsten Dunst"},{"name":"Sam Neill"},{"name":"Maria Ozawa"},{"name":"Nicky Tirta"},{"name":"Herfiza Novianti"},{"name":"Alessia Cestaro"},{"name":"Will Yun Lee"},{"name":"Miguel Ferrer"},{"name":"Mercedes Renard"},{"name":"Emilie Guillot"},{"name":"Jack Nicholson"},{"name":"Adam Sandler"},{"name":"Marisa Tomei"},{"name":"Sarah Chalke"},{"name":"Dave Foley"},{"name":"Emily Alyn Lind"},{"name":"Chris Parnell"},{"name":"Jay Baruchel"},{"name":"Jude Law"},{"name":"Jennifer Jason Leigh"},{"name":"Ian Holm"},{"name":"im Carrey"},{"name":"Courteney Cox"},{"name":"Sean Young"},{"name":"Tone Loc"},{"name":"Tacho González"},{"name":"Álvaro Guevara"},{"name":"Mabel Rivera"},{"name":"Raúl Dans"},{"name":"Ezekiel Norton"},{"name":"Chris O’Dowd"},{"name":"Kelly Reilly"},{"name":"Aidan Gillen"},{"name":"Ali Faulkner"},{"name":"Johnny Walter"},{"name":"Derek Lee Nixon"},{"name":"Tory Tompkins"},{"name":"Caitlin Stasey"},{"name":"Sianoa Smit McPhee"},{"name":"Brooke Butler"},{"name":"Amanda Grace Cooper"},{"name":"Dominique Abel"},{"name":"Fiona Gordon"},{"name":"Philippe Martz"},{"name":"Bruno Romy"},{"name":"Bob Brown"},{"name":"Nikolaj Lie Kaas"},{"name":"Fares Fares"},{"name":"Sonja Richter"},{"name":"Christoffer Aro"},{"name":"Marc Webb"},{"name":"Roxanne McKee"},{"name":"Danny Dyer"},{"name":"Vincent Regan"},{"name":"Josef Altin"},{"name":"Tilikum"},{"name":"John Hargrove"},{"name":"Samantha Berg"},{"name":"Mark Simmons"},{"name":"Justin Chadwick"},{"name":"Park Bo Young"},{"name":"Kim Young Kwang"},{"name":"Lee Jong Suk"},{"name":"Rob Minkoff"},{"name":"Liesel Matthews"},{"name":"Eleanor Bron"},{"name":"Liam Cunningham"},{"name":"Andrey Merzlikin"},{"name":"Evgeniy Tsyganov"},{"name":"Maria Mashkova"},{"name":"Ho-Cheung Pang"},{"name":"Walter Matthau"},{"name":"Mason Gamble"},{"name":"Joan Plowright"},{"name":"Abhishek Varman"},{"name":"Aoi Miyazaki"},{"name":"Hiromi Nagasaku"},{"name":"Trang Vỹ Kiện"},{"name":"Imtiaz Ali"},{"name":"Molly Ringwald"},{"name":"Anthony Michael Hall"},{"name":"Justin Henry"},{"name":"Lưu Vỹ Cường"},{"name":"Lloyd Lee Barnett"},{"name":"Nick Cassavetes"},{"name":"Isara Nadee,Kirati Nakintanon"},{"name":"Hayao Miyazaki"},{"name":"Takanori Tsujimoto"},{"name":"Dong-hyuk Hwang"},{"name":"Cao Quần Thư"},{"name":"Wally Pfister"},{"name":"Trevor White"},{"name":"Shinji Aramaki"},{"name":"Jonathan Glazer"},{"name":"Robert Rodriguez"},{"name":"Nathan Phillips"},{"name":"Cassandra Magrath"},{"name":"Kestie Morassi"},{"name":"Neil Burger"},{"name":"Antoni Stutz"},{"name":"Cameron Bright"},{"name":"Nick Chinlund"},{"name":"Noam Murro"},{"name":"Henry Cavill"},{"name":"Freida Pinto"},{"name":"Luke Evans"},{"name":"Isabel Lucas"},{"name":"Jonathan English"},{"name":"Greg Mclean"},{"name":"Keanu Reeves"},{"name":"Sandra Bullock"},{"name":"Steve CarellTerence Stamp"},{"name":"Ken Davitian"},{"name":"Hrithik Roshan"},{"name":"Amitabh Bachchan"},{"name":"Naseeruddin Shah"},{"name":"Keith Parmer"},{"name":"Tian Liang"},{"name":"Zhou Xianxin"},{"name":"Li Ching"},{"name":"Litai Yan"},{"name":"thanh lịch Villa"},{"name":"Yan Yan propiona"},{"name":"Eva Birthistle and Timothy Spall"},{"name":"Malik Barnhardt"},{"name":"Avelawance Phillips"},{"name":"Tom Sizemore"},{"name":"Poj Arnon"},{"name":"Carlos Saldanha"},{"name":"Nicolas Aaron Mezzanatto"},{"name":"Dana Snyder"},{"name":"Matthew W. Taylor"},{"name":"Kirk Baily"},{"name":"Matt Damon"},{"name":"Kate Winslet"},{"name":"Gwyneth Paltrow"},{"name":"Josh Hutcherson"},{"name":"AnnaSophia Robb"},{"name":"Zooey Deschanel"},{"name":"Sean Beanbelle Wallis"},{"name":"Scott Waugh"},{"name":"Darren Aronofsky"},{"name":"Kevin Spacey"},{"name":"Gabriel Byrne"},{"name":"Chazz Palminteri"},{"name":"Luke Goss"},{"name":"Natalie Martinez"},{"name":"Sean Connery"},{"name":"Peta Wilson"},{"name":"Stuart Townsend"},{"name":"Tony Curran"},{"name":"Jason Flemyng"},{"name":"Robert Downey Jr"},{"name":"Don Cheadle"},{"name":"Scarlett Johansson"},{"name":"Diedrich Bader"},{"name":"Kevin Sorbo"},{"name":"Jim Piddock"},{"name":"Method Man"},{"name":"Sean Maguire"},{"name":"Jack Black"},{"name":"Robert Downey Jr."},{"name":"Landon Liboiron"},{"name":"Lindsey Shaw"},{"name":"Ivana Milicevic"},{"name":"Seth Green"},{"name":"Dan Fogler"},{"name":"Elisabeth Harnois"},{"name":"Mindy Sterling"},{"name":"Joan Cusack"},{"name":"Kim Coates"},{"name":"Heather Marie Marsden"},{"name":"Bokeem Woodbine"},{"name":"Kirk Kepper"},{"name":"Val Kilmer"},{"name":"Andy Garcia"},{"name":"Dean Cain"},{"name":"Emmanuelle Chriqui"},{"name":"Heather Graham"},{"name":"Mikko Nousiainen"},{"name":"Cary Fukunaga"},{"name":"Tom Skerritt"},{"name":"Sigourney Weaver"},{"name":"Veronica Cartwright"},{"name":"Harry Dean Stanton"},{"name":"John Hurt"},{"name":"Seth Gordon"},{"name":"igourney Weaver"},{"name":"Carrie Henn"},{"name":"Michael Biehn"},{"name":"Lance Henriksen"},{"name":"Paul Reiser"},{"name":"Bill Paxton"},{"name":"William Hope"},{"name":"Jenette Goldstein"},{"name":"Jean Jacques Aud"},{"name":"Shia LaBeouf"},{"name":"Michelle Monaghan"},{"name":"Rosario Dawson"},{"name":"Michael Chiklis"},{"name":"Anthony Mackie"},{"name":"Ethan Embry"},{"name":"Julianne Moore"},{"name":"Sarah Jessica Parker"},{"name":"Patrick Wilson"},{"name":"Rose Byrne"},{"name":"Ty Simpkins"},{"name":"Channing Tatum"},{"name":"Donald Sutherland"},{"name":"Rob Bowman"},{"name":"Neve Campbell"},{"name":"Courteney Cox and David Arquette"},{"name":"Nathan Fillion"},{"name":"Jason Isaacs"},{"name":"Elisabeth Moss"},{"name":"Min sik Choi and Gook hwan Jeon"},{"name":"Rachel Goldenberg"},{"name":"Peter Howitt"},{"name":"Nakama Yukie"},{"name":"Odagiri Joe"},{"name":"Kurotani Tomoka"},{"name":"Sawajiri Erika"},{"name":"Shiina Kippei"},{"name":"Brian Horiuchi"},{"name":"Steven Brill"},{"name":"Sylvester StalloneBrian Dennehy"},{"name":"Bill McKinney"},{"name":"Jack Starrett"},{"name":"Michael Talbott"},{"name":"Chris Mulkey"},{"name":"John McLiam"},{"name":"Alf Humphreys"},{"name":"David Caruso"},{"name":"Gregory Orr"},{"name":"Manuel Carballo"},{"name":"Mark Harris"},{"name":"Anna Nightingale"},{"name":"Honor Kneafsey"},{"name":"Ho jin Cheon"},{"name":"In jae Heo"},{"name":"Ku Jin"},{"name":"Ali Abbas Zafar"},{"name":"Willem Dafoe"},{"name":"Anne Archer"},{"name":"Thích Tiểu Long"},{"name":"Hạc Thiệu Văn"},{"name":"Đàm Tiểu Long"},{"name":"Robin Williamsffleck"},{"name":"Ewan McGregor"},{"name":"Renée Zellweger"},{"name":"David Hyde Pierce"},{"name":"George Clooney"},{"name":"Meryl Streep"},{"name":"Bill Murray"},{"name":"Nhậm Hiền Tề"},{"name":"Trần Quán Hy"},{"name":"Huỳnh Hiểu Minh"},{"name":"Lâm Bảo Di"},{"name":"Kim Myung Min"},{"name":"Yoo Hae Jin"},{"name":"Yeom Jung Ah"},{"name":"Jung Gyu Woon"},{"name":"Jonathan Teplitzky"},{"name":"Josh Lucas"},{"name":"Rachael Taylor and Keisha Castle Hughes"},{"name":"Julia Leigh"},{"name":"Robert Duvall"},{"name":"Diego Luna"},{"name":"Shan Khan"},{"name":"Rachel Weisz"},{"name":"Max Minghella"},{"name":"Oscar Isaac"},{"name":"Ashraf Barhom"},{"name":"Diane Keaton"},{"name":"Denzel Washington"},{"name":"Ethan Hawke"},{"name":"Scott Glenn"},{"name":"Alec Baldwin"},{"name":"Sean Pertwee"},{"name":"Samuel L. Jackson"},{"name":"Carrie Anne Moss"},{"name":"Michael Sheen"},{"name":"Rumer Willis"},{"name":"Carrie Fisher"},{"name":"Suphakit Tangthatswasd"},{"name":"Sean Bean"},{"name":"Colm Feore"},{"name":"Lawrence Ah Mon,Gordon Chan"},{"name":"Clive Owen"},{"name":"Keira Knightley"},{"name":"Billy Connolly"},{"name":"Jean Reno"},{"name":"Natalie Portman"},{"name":"Kevin Pollak"},{"name":"Serena Scott Thomas"},{"name":"Sophie MarceauSami Frey"},{"name":"Russell Crowe"},{"name":"Craig Bierko"},{"name":"Christopher Spencer"},{"name":"Hugh Jackman"},{"name":"Evangeline Lilly"},{"name":"Kevin Durand"},{"name":"Noona"},{"name":"Bie"},{"name":"Meritxell Ané"},{"name":"Óscar Barberán"},{"name":"Carles Canut"},{"name":"Gabriella Wilde"},{"name":"Alex Pettyfer"},{"name":"Bruce Greenwood"},{"name":"Sin hye Park"},{"name":"Hyun kyoon Lee"},{"name":"Geum Seok Yang"},{"name":"Kate BeckiMatt Dillon"},{"name":"Vera Farmiga"},{"name":"Stuart Beattie"},{"name":"Ingrid Bolsø Berdal"},{"name":"Marthe Snorresdotter Rovik"},{"name":"Kim Wifladt"},{"name":"Trần Gia Hoa"},{"name":"Ryan Gosling"},{"name":"Carey Mulligan"},{"name":"Bryan Cranston"},{"name":"AColin Hanks"},{"name":"Emma Stone"},{"name":"Sohail Khan"},{"name":"Denzel WashingtonEva Mendes"},{"name":"Trương Ngọc Hữu"},{"name":"Trương Mẫn"},{"name":"Tim Large"},{"name":"Jeremy King"},{"name":"Robb Maus"},{"name":"Chi-kin Kwok"},{"name":"Shin-yeon Won"},{"name":"Mark Wahlberg"},{"name":"Diane Lane"},{"name":"Elizabeth Taylor"},{"name":"Richard Burton"},{"name":"Rex Harrison"},{"name":"Ida Marie Bakkerud"},{"name":"Julie Rusti"},{"name":"Kim S. Falck Jørgensen"},{"name":"Nicolas Cage"},{"name":"Diane Kruger"},{"name":"Justin Bartha"},{"name":"Mylene Jampanoi"},{"name":"Lý Tiểu Nhiễm"},{"name":"Rakeysh Omprakash Mehra"},{"name":"Paul Giamatti"},{"name":"Evan Rachel Wood"},{"name":"Wing-cheong Law"},{"name":"Reinhard Klooss"},{"name":"John Leguizamo"},{"name":"Laurie Holden"},{"name":"Michael Shanks"},{"name":"Alexandra Davies"},{"name":"Saskia Hampele"},{"name":"Sean Faris"},{"name":"Tamer Hassan"},{"name":"Rebecca Da Costa"},{"name":"Jason Rothenberg"},{"name":"Stephen ElliottStephen Elliott"},{"name":"Robert Davi"},{"name":"Zoe Bell"},{"name":"Sid Haig"},{"name":"Sheri Moon Zombie"},{"name":"Bill Moseley"},{"name":"ApiRamita Mahapreukpong"},{"name":"Tony Rakkan"},{"name":"Unsumalin Sirasakpatharamaetha"},{"name":"Arak Amornsupasiri"},{"name":"Kom Chauncheun"},{"name":"Peerawat Herabat"},{"name":"Prachya Piew"},{"name":"Albert Dupontel"},{"name":"McG"},{"name":"Lee Joon"},{"name":"Seo Yeong Hee"},{"name":"Kang Shin Hyo"},{"name":"Melanie Lynskey"},{"name":"Frank Welker"},{"name":"David Ellis,Lex Halaby"},{"name":"Matthew McConaughey"},{"name":"Steve Zahn"},{"name":"Penelope Cruz"},{"name":"Mark WahlbergMichael Clarke DuPaul Giamatti"},{"name":"Estella Warren"},{"name":"Kippei Shiina"},{"name":"Ryo Kase"},{"name":"Vincent Elbaz"},{"name":"Grégori Derangère"},{"name":"Mélanie Bernier"},{"name":"Tom Gormican"},{"name":"Mark Waters"},{"name":"Steven Seagal"},{"name":"Mike Ching"},{"name":"Adrian Holmes"},{"name":"Nhạc Tùng"},{"name":"Lý Vũ Phi"},{"name":"Khang Ân"},{"name":"Mikkel Brænne Sandemose"},{"name":"Dolph Lundgren"},{"name":"Stefanie Von Pfetten"},{"name":"Samantha Ferris"},{"name":"David Lewis"},{"name":"Eduardo Schuldt"},{"name":"David Grovic"},{"name":"Jonathan Sobol"},{"name":"Bruce Dern"},{"name":"William Sanderson"},{"name":"Bobby Boermans"},{"name":"Kha Chấn Đông"},{"name":"Mae Whitman"},{"name":"Kristin Chenoweth"},{"name":"Raven Symoné"},{"name":"Lucy Liu"},{"name":"Tomoyuki Takimoto"},{"name":"Ed Stoppard"},{"name":"Leelee Sobieski"},{"name":"Jeffrey Tambor"},{"name":"Guk Dong-Suk"},{"name":"Yi-chi Lien"},{"name":"Hiroki Ryuichi"},{"name":"udi Dench"},{"name":"Cate Blanchett"},{"name":"Tom Georgeson"},{"name":"Michael Maloney"},{"name":"Ivana Baquero"},{"name":"Ariadna Gil"},{"name":"Sergi López"},{"name":"Simon Pegg"},{"name":"Martin Freeman"},{"name":"Charlie Cox"},{"name":"Claire Danes"},{"name":"Sienna Miller"},{"name":"Jung Jae Young"},{"name":"Han Ji Min"},{"name":"Cha Ye Ryun"},{"name":"Kim Ji Young"},{"name":"Kazuko Yoshiyuki"},{"name":"Yûji Miyake"},{"name":"Yûki Kudô"},{"name":"Spike Jonze"},{"name":"Nicole Kidman"},{"name":"Billy Zane"},{"name":"Alexis Bledel"},{"name":"Michael Keaton"},{"name":"Carol Burnett"},{"name":"Jin woong Jo"},{"name":"Eun woo Lee"},{"name":"Sebastián Silva"},{"name":"Jérôme Salle"},{"name":"Catherine Deneuve"},{"name":"Ian Hendry"},{"name":"John Fraser"},{"name":"Lauren Mote"},{"name":"Frédéric Diefenthal"},{"name":"Emma Wiklund"},{"name":"Jesse McCartney"},{"name":"Jane Horrocks"},{"name":"Caradog W. James"},{"name":"Shin Togashi"},{"name":"Paul Tanter"},{"name":"Joon-Hwan Jang"},{"name":"Tae woong Eom"},{"name":"Min jun Kim"},{"name":"Yi hyeon So"},{"name":"Freddie Highmore"},{"name":"Sarah Bolger and David Strathairn"},{"name":"Jae-rim Han"},{"name":"Richard Shepard"},{"name":"Andy On"},{"name":"Raiden Integra"},{"name":"Luxia Jiang"},{"name":"Ryuta Tazaki"},{"name":"Lan Ding"},{"name":"Qiuyan Huang"},{"name":"Jung Huh"},{"name":"Ronnie Thompson"},{"name":"Daniel Stamm"},{"name":"Hong-soo Park"},{"name":"Peter Segal"},{"name":"Vanessa Williams"},{"name":"Lưu Kiệt"},{"name":"Joon-ho Bong"},{"name":"Lê Chí"},{"name":"Richard Rich"},{"name":"Rob Thomas"},{"name":"Craig Moss"},{"name":"Sturla Gunnarsson"},{"name":"Peggy Holmes"},{"name":"Peter Lepeniotis"},{"name":"Puttipong Pormsaka Na-Sakonnakorn"},{"name":"Trương Vinh Cát"},{"name":"Brian Percival"},{"name":"Kenichi Shimizu"},{"name":"John Lee Hancock"},{"name":"Richard Rich,Tom Kane"},{"name":"Dong-yeob Shin"},{"name":"John Krokidas"},{"name":"Barry Cook,Neil Nightingale"},{"name":"Eddie Murphy"},{"name":"Gabrielle Union"},{"name":"Joo Won"},{"name":"Kim Ah Joong"},{"name":"Giang Chí Cường"},{"name":"Jake Goldberger"},{"name":"Shannon Yao"},{"name":"Lau Kar Leung"},{"name":"Kaare Andrews"},{"name":"Kuan Tai Chen"},{"name":"David Chiang"},{"name":"Mario Milano"},{"name":"John Huddles"},{"name":"Joon-ik Lee"},{"name":"Jeremy Lovering"},{"name":"Laila Boonyasak"},{"name":"Pijittra Siriwetchapan"},{"name":"Brandon Vietti"},{"name":"Lee Hyeon-jong"},{"name":"Woody Allen"},{"name":"Giancarlo Volpe"},{"name":"Jeremy Berg"},{"name":"Jean Sagal"},{"name":"Liz Sagal"},{"name":"James Vallely"},{"name":"Jonathan Schmock"},{"name":"Dennis Law"},{"name":"Kieran Parker"},{"name":"Nhiều Diễn Viên"},{"name":"Justin Long"},{"name":"Hayden Panettiere"},{"name":"Larry Miller"},{"name":"Wilson Chin"},{"name":"Rob Meltzer"},{"name":"Manuel Sicilia"},{"name":"Josh Stolberg"},{"name":"Bạch Bách Hà"},{"name":"Trương Hiếu Toàn"},{"name":"Phạm Vĩ Kì"},{"name":"An Tâm Á"},{"name":"Ngũ Tư Khải"},{"name":"Tạ Quân Hào."},{"name":"Marlee Matlin"},{"name":"James Denton"},{"name":"Paul Sorvin"},{"name":"Alexander Payne"},{"name":"Erik Matti"},{"name":"Trần Hạo Dân"},{"name":"Hà Trung Hoa"},{"name":"Ngô Nghị Tướng"},{"name":"Jay Chou"},{"name":"Michèle Mercier"},{"name":"Robert Hossein"},{"name":"Jean Rochefort"},{"name":"Jacques Toja"},{"name":"Sae Byeok Song"},{"name":"Si young Lee"},{"name":"Yun shik Baek"},{"name":"Ji won Ha"},{"name":"Myung min Kim"},{"name":"Neung mi Nam"},{"name":"Ha ryong Lim"},{"name":"Chen Yao"},{"name":"Leon Dai"},{"name":"Amy Adams"},{"name":"Jesdaporn Pholdee"},{"name":"Chaichan Nimpulsawasdi"},{"name":"Goo-Bi GC"},{"name":"Brandon Auret"},{"name":"Brian Baynes"},{"name":"Christopher Beasley"},{"name":"Julia Roberts"},{"name":"Suk kyu Han"},{"name":"Yunjin Kim"},{"name":"Chloë Grace Moretz"},{"name":"Blake Lively"},{"name":"Rory Culkin"},{"name":"Ray Liotta"},{"name":"Jason Clarke"},{"name":"Emma Booth and David Lyons"},{"name":"Amanda Seyfried"},{"name":"Peter Sarsgaard"},{"name":"Juno Temple"},{"name":"Michael Caine"},{"name":"Michelle Goddet"},{"name":"Jane Alexander"},{"name":"Serge Hollogne"},{"name":"Robert De Niro"},{"name":"Madonna"},{"name":"David Bowie"},{"name":"Snoop Dogg"},{"name":"Will Smith"},{"name":"Thandie Newton"},{"name":"Jaden Smith"},{"name":"Brian Howe"},{"name":"Anna Paquin"},{"name":"Mark Ruffalo"},{"name":"Toni Servillo"},{"name":"Carlo Verdone"},{"name":"Sabrina Ferilli"},{"name":"Kiefer Sutherland and Kim Basinger"},{"name":"Woody Harrelson"},{"name":"Jennifer Lopez"},{"name":"Sidney Poitier"},{"name":"Rod Steiger"},{"name":"Warren Oates"},{"name":"Lee Grant"},{"name":"Lưu Đức Hoa"},{"name":"Lữ Lương Vỹ"},{"name":"Hồ Quân"},{"name":"Lâm Gia"},{"name":"Diêu Thần"},{"name":"Charles Chaplin"},{"name":"Merna Kennedy"},{"name":"Al Ernest Garcia"},{"name":"Claire Bloom"},{"name":"Nigel Bruce"},{"name":"Keenen Ivory Wayans"},{"name":"Bob Gunton"},{"name":"Yui chan"},{"name":"Suguha"},{"name":"Kirito"},{"name":"Seung beom Ryu"},{"name":"So yi Yoon"},{"name":"Khương Đại Vệ"},{"name":"Jean Claude Van Damme"},{"name":"Robert Guillaume"},{"name":"Cynthia Gibb"},{"name":"Ryûhei Matsuda"},{"name":"Shinji Takeda"},{"name":"Angela Mao"},{"name":"John Liu"},{"name":"Tai Lun Chang"},{"name":"Khương Đại vệ"},{"name":"Trần Quang Thái"},{"name":"Bryan Ramirez"},{"name":"Mack Swain"},{"name":"Tom Murray"},{"name":"Jakie Chan"},{"name":"Vivian Hsu"},{"name":"Eric Tsang"},{"name":"Biao Yuen"},{"name":"Kenny Bee"},{"name":"Pam Grier"},{"name":"Henry Silva"},{"name":"Anita Mui"},{"name":"Françoise Yip"},{"name":"Richard Curtis"},{"name":"Mikael Salomon"},{"name":"Danny Aiello"},{"name":"Sandy Alexander"},{"name":"Paulette Goddard"},{"name":"Jack Oakie"},{"name":"Pornchai Hongrattaporn"},{"name":"Patrick McGoohan"},{"name":"Roberts Blossom"},{"name":"Kobun Shizuno"},{"name":"Cheung Yan Yuen"},{"name":"Lydia Shum"},{"name":"Wai Man Chan"},{"name":"Yang Chang"},{"name":"Chuan Chen"},{"name":"Feng Chen Chen"},{"name":"Byeong-woo Kim"},{"name":"Chia Hui Liu"},{"name":"Sheng Fu"},{"name":"Lily Li"},{"name":"Siu Tien Yuen"},{"name":"Jang Lee Hwang"},{"name":"Dean Shek"},{"name":"Han Chin"},{"name":"Oxide Pang Chun,Danny Pang"},{"name":"Tadanobu Asano"},{"name":"Michiyo Ohkusu"},{"name":"Geoffrey Lewis"},{"name":"Paul Aylett"},{"name":"Gonzalo López-Gallego"},{"name":"Nappon Gomarachun"},{"name":"Santisuk Promsiri"},{"name":"Dan Chupong"},{"name":"Frank W. Montag"},{"name":"Hua Chung"},{"name":"Mei Sheng Fan"},{"name":"Chung Hsin Huang"},{"name":"Pai Wei"},{"name":"Dương Cung Như"},{"name":"Jacky Cheung"},{"name":"Yiu Sing Cheung"},{"name":"Shun Lau"},{"name":"Raul Julia"},{"name":"Ming Na Wen"},{"name":"James Tien"},{"name":"Mike Mendez"},{"name":"Triệu Văn Trác"},{"name":"Wenzhuo Zhao"},{"name":"Jean Wang"},{"name":"Siu Chung Mok"},{"name":"Ronald Cheng"},{"name":"Miki Yeung"},{"name":"Michelle Yeoh"},{"name":"Michael Wong"},{"name":"Tien chi Cheng"},{"name":"Tien Hsiang Lung"},{"name":"Meng Lo"},{"name":"Jing Bai"},{"name":"Shaoqun Yu"},{"name":"Collin Chou"},{"name":"Tak Wa Chow"},{"name":"Zhi Hua Dong"},{"name":"Siu-Tung Ching"},{"name":"Roger Moore"},{"name":"James Remar"},{"name":"Kent Cheng"},{"name":"Kong Foo Keung"},{"name":"Gordon Chan,Andy Wing-Keung Chin"},{"name":"Lieh Lo"},{"name":"Ping Wang"},{"name":"Hsiung Chao"},{"name":"Qi Shu"},{"name":"Ching Ying Lam"},{"name":"Leslie Cheung"},{"name":"Joey Wang"},{"name":"Ma Wu"},{"name":"Bubba Smith"},{"name":"David Graf"},{"name":"Michael Winslow"},{"name":"Aya Ueto"},{"name":"Kenji Kohashi"},{"name":"Hiroki Narimiy"},{"name":"Richard Zhuang"},{"name":"Fedor Bondarchuk"},{"name":"Drew Barrymore"},{"name":"Chung Hân Đồng"},{"name":"Trương Trí Lâm"},{"name":"Huệ Ánh Hồng"},{"name":"Cao Hổ"},{"name":"Julie Harris"},{"name":"Richard Johnson"},{"name":"Maggie Cheung"},{"name":"Rina Takeda"},{"name":"Hina Tobimatsu"},{"name":"Richard Heselton"},{"name":"Keisuke Horibe"},{"name":"Noriko Iriyama"},{"name":"Tatsuya Naka"},{"name":"Fuyuhiko Nishi"},{"name":"Saori Takizawa"},{"name":"Kazutoshi Yokoyama"},{"name":"James Gandolfini"},{"name":"Brigitte Lin"},{"name":"Leslie Cheun"},{"name":"Kazuchika Kise"},{"name":"Joseph Gordon-Levitt"},{"name":"G.W. Bailey"},{"name":"George Gaynes"},{"name":"Michelle Reis"},{"name":"Billy Chow"},{"name":"Brendan Fraser"},{"name":"Sienna Guillory"},{"name":"Eliza Bennett"},{"name":"Richard Strange"},{"name":"Yue Wong"},{"name":"Lung Wei Wang"},{"name":"Edward Burns"},{"name":"Kelsey Grammer"},{"name":"Brian Matthews"},{"name":"Leah Ayres"},{"name":"Brian Backer"},{"name":"Larry Joshua"},{"name":"Steve Guttenberg"},{"name":"Woo seong Kam"},{"name":"Jeong hwa Eom"},{"name":"Won sang Park"},{"name":"Peter Hyams"},{"name":"Anthony Hopkins"},{"name":"Claire Forlani"},{"name":"Jake Weber"},{"name":"Louise Bourgoin"},{"name":"Pio Marmaï"},{"name":"Josiane Balasko"},{"name":"Thierry Frémont"},{"name":"Shane Carruth"},{"name":"Saif Ali Khan"},{"name":"Kunal Khemu"},{"name":"Vir Das"},{"name":"Anand Tiwari"},{"name":"Klaus Kinski"},{"name":"Isabelle Adjani"},{"name":"Bruno Ganz"},{"name":"Roland Topor"},{"name":"Kim Min Jung"},{"name":"Chun Jung Myung"},{"name":"Kim Ki Bang"},{"name":"Jack Nance"},{"name":"Charlotte Stewart"},{"name":"Allen Joseph"},{"name":"Jeanne Bates"},{"name":"Jean Paul Belmondo"},{"name":"Claudia Cardinale"},{"name":"Jess Hahn"},{"name":"Marcel Dalio"},{"name":"John Wayne"},{"name":"Katharine Hepburn"},{"name":"Anthony Zerbe"},{"name":"Richard Jordan"},{"name":"Will Ferrell"},{"name":"Shirley MacLaine"},{"name":"Billy Unger"},{"name":"Sammi Hanratty"},{"name":"James Hong"},{"name":"George Dzundza"},{"name":"Steven Bauer"},{"name":"Stephen Baldwin"},{"name":"Hoi Sang Lee"},{"name":"Deepika Padukone"},{"name":"Satyaraj"},{"name":"Nikitin Dheer"},{"name":"Alfonso Cuarón"},{"name":"Jeff Goldblum"},{"name":"Geena Davis"},{"name":"John Getz"},{"name":"Joy Boushel"},{"name":"Christopher Walken"},{"name":"Victor Argo"},{"name":"Queen Latifah"},{"name":"Phạm Băng Băng"},{"name":"Huỳnh Giác"},{"name":"Vương Học Kỳ"},{"name":"Jean Paul Rouve"},{"name":"Sophie Quinton"},{"name":"Guillaume Gouix"},{"name":"Olivier Rabourdin"},{"name":"Shôsuke Tanihara"},{"name":"Muga Tsukaji"},{"name":"Keiko Kitagawa"},{"name":"Mayumi Sada"},{"name":"Danny Trejo"},{"name":"Jenny Gabrielle"},{"name":"Brandon Teena"},{"name":"Lana Tisdel"},{"name":"John Lotter"},{"name":"Tom Nissen"},{"name":"Konstantin Khabenskiy"},{"name":"Elizaveta Boyarskaya"},{"name":"Sergey Bezrukov"},{"name":"Vladislav Vetrov"},{"name":"Anna Kovalchuk"},{"name":"Egor Beroev"},{"name":"Richard Bohringer"},{"name":"Yu Wang"},{"name":"Anna Aoi"},{"name":"Rei Fujita"},{"name":"Yukijirô Hotaru"},{"name":"Chonkan Poonsiriwong"},{"name":"Kornkamol Chareonchai"},{"name":"Sissy Spacek"},{"name":"Piper Laurie"},{"name":"Amy Irving"},{"name":"Yuka Mizuno"},{"name":"Lung Chan"},{"name":"Kang Yeh Cheng"},{"name":"Izabella Miko"},{"name":"Julian Wadham"},{"name":"Hristo Shopov"},{"name":"Josephine Siao"},{"name":"Sibelle Hu Kịch bản: Kung Yung Chai"},{"name":"Kin Chung Chan"},{"name":"Jeffrey Wright"},{"name":"Busta Rhymes"},{"name":"Dan Hedaya"},{"name":"Nhiều Diễn Viên"},{"name":"Faye Dunaway"},{"name":"Cliff Robertson"},{"name":"Max von Sydow"},{"name":"Virginia Madsen"},{"name":"Martin Donovan"},{"name":"Mads Mikkelsen"},{"name":"Giuseppe Tornatore"},{"name":"Ranbir Kapoor"},{"name":"Nargis Fakhri"},{"name":"Shammi Kapoor"},{"name":"Shikha Jain"},{"name":"Robert Mitchum"},{"name":"Richard Widmark"},{"name":"Lola Albright"},{"name":"Sally Field"},{"name":"Katherine Justice"},{"name":"Jack Elam"},{"name":"Stubby Kaye"},{"name":"Lý Trị Đình"},{"name":"Lê Minh"},{"name":"Tim Conway"},{"name":"Pam Ferris"},{"name":"Joan Collins"},{"name":"Jason Friedberg,Aaron Seltzer"},{"name":"Won Bin"},{"name":"Shin Hyun Joon"},{"name":"Shin Ha Kyun"},{"name":"Jeong Jae Yeong"},{"name":"Gong Hyo Jin"},{"name":"Richard Harris"},{"name":"James Coburn"},{"name":"Richard Jaeckel"},{"name":"Katy Jurado"},{"name":"Johnny Tri Nguyen"},{"name":"Nanthawut Boonrubsub"},{"name":"Sasisa Jindamanee"},{"name":"Kim Cương"},{"name":"Kam Chiang"},{"name":"Hoàng Chính Lợi"},{"name":"Kong Kim"},{"name":"Yuen Lung"},{"name":"Tien Miao"},{"name":"Wei Ho Tu"},{"name":"Tiffany Dupont"},{"name":"John Noble"},{"name":"Omar Sharif"},{"name":"Jamie Lee Curtis"},{"name":"Mark Harmon"},{"name":"Harold Gould"},{"name":"Pichai Noirod"},{"name":"Rino Romano"},{"name":"Tara Strong"},{"name":"Tommy Lee Jones"},{"name":"Vince Vaughn"},{"name":"Đường Yên"},{"name":"Lưu Sướng"},{"name":"Lý Thạnh"},{"name":"Tiết Hạo Văn"},{"name":"Katie Maguire"},{"name":"Mike Giannelli"},{"name":"Catherine A. Callahan"},{"name":"Marie Maser"},{"name":"Kayla Lian"},{"name":"Cole Mathewson"},{"name":"Sydney Freihofer"},{"name":"Michael Chmiel"},{"name":"Brandon deSpain"},{"name":"Robyn Kerr"},{"name":"Sam Rockwell"},{"name":"Michael Angarano"},{"name":"Ben Affleck"},{"name":"Christina Applegate"},{"name":"Catherine O’Hara"},{"name":"Lee Jung jae"},{"name":"Jun Ji hyun"},{"name":"Tina Fey"},{"name":"Ken Takakura"},{"name":"Brian Keith"},{"name":"Herb Edelman"},{"name":"Eiji Okada"},{"name":"James Shigeta"},{"name":"Kyôsuke Machida"},{"name":"Olivia Hussey"},{"name":"Keir Dullea"},{"name":"Margot Kidder"},{"name":"Eva Green"},{"name":"María Valverde"},{"name":"Dustin Hoffman"},{"name":"Sharon Stone"},{"name":"Peter Coyote"},{"name":"Marga Gómez"},{"name":"Greg Kinnear"},{"name":"Jennifer Connelly"},{"name":"Lily Collins"},{"name":"Kristen Bell"},{"name":"Emma Thompson"},{"name":"James Fleet"},{"name":"Tom Wilkinson"},{"name":"Nastassja Kinski"},{"name":"Malcolm McDowell"},{"name":"John Heard"},{"name":"Annette O’Toole"},{"name":"Siam Yu"},{"name":"Kolton Stewart"},{"name":"Gage Munroe"},{"name":"Michael Friend"},{"name":"Gena Rowlands"},{"name":"Tony Shalhoub"},{"name":"Cheech Marin"},{"name":"Bruce Davison"},{"name":"Malin Akerman"},{"name":"Tyler Labine"},{"name":"Lucy Punch"},{"name":"Dan Petronijevic"},{"name":"Haaz Sleiman"},{"name":"Danai Gurira"},{"name":"Hiam Abbass"},{"name":"Wallace Shawn"},{"name":"Corey Burton"},{"name":"Jonathan Breck"},{"name":"Ray Wise"},{"name":"Nicki Aycox"},{"name":"Garikayi Mutambirwa"},{"name":"William Baldwin"},{"name":"Kim Bodnia"},{"name":"Sarah Butler"},{"name":"Ole Dupont"},{"name":"Calista Flockhart"},{"name":"Richard Roxburgh"},{"name":"Elena Anaya"},{"name":"Gemma Jones"},{"name":"Aaron Kwok"},{"name":"Chen Chang"},{"name":"Gwei Lun Mei"},{"name":"Yu Xia"},{"name":"Aitana Sánchez Gijón"},{"name":"Anthony Quinn"},{"name":"Giancarlo Giannini"},{"name":"Joe Mantegna"},{"name":"Robert John Burke"},{"name":"Lucinda Jenney"},{"name":"Michael Constantine"},{"name":"Robin Williams"},{"name":"Hannah Taylor Gordon"},{"name":"Éva Igó"},{"name":"Justus von Dohnányi"},{"name":"Saoirse Ronan"},{"name":"Clare Barrett"},{"name":"Padraic Delaney"},{"name":"Robert Donnelly"},{"name":"Richard Dormer"},{"name":"Abigail Breslin"},{"name":"Stephen McHattie"},{"name":"David Hewlett"},{"name":"Sarah Manninen"},{"name":"Bill Sage"},{"name":"Ambyr Childers"},{"name":"Julia Garner"},{"name":"Wyatt Russell"},{"name":"Tom Holland"},{"name":"Harley Bird"},{"name":"Pei pei Cheng"},{"name":"Hsin Yen Chao"},{"name":"Miyoko Shôji"},{"name":"Mami Koyama"},{"name":"Fumiko Orikasa"},{"name":"Shôzô Iizuka"},{"name":"Eric Heisserer"},{"name":"Angus MacLane"},{"name":"Edgar Wright"},{"name":"Robert Luketic"},{"name":"Kiefer Sutherland"},{"name":"Kim Basinger"},{"name":"Dominic Purcell"},{"name":"Natassia Malthe"},{"name":"Conan Stevens"},{"name":"Keiji Fujiwara"},{"name":"Rei Igarashi"},{"name":"Mayu Iino"},{"name":"Honoka Ikezuki"},{"name":"Tomoyo Kurosawa"},{"name":"Forest Whitaker"},{"name":"Miranda Richardson"},{"name":"Stephen Rea"},{"name":"Lương Phổ Trí"},{"name":"William Moseley"},{"name":"Eric Roberts"},{"name":"Kelsey Chow"},{"name":"Adrian Pasdar"},{"name":"Scott Adkins"},{"name":"Yi Huang"},{"name":"Lee Seung-jun"},{"name":"Ayan Mukherjee"},{"name":"Stephen Sommers"},{"name":"Christina Vidal"},{"name":"Michael J. Pagan"},{"name":"Samantha Noble"},{"name":"Klay Hall"},{"name":"Brady Coleman"},{"name":"Mikael Håfström"},{"name":"Circus Kids"},{"name":"Ngọ Mã"},{"name":"Ornjira Lamwilai"},{"name":"Kritteera Inpornwijit"},{"name":"Patharawarin Timkul"},{"name":"Henry Saine"},{"name":"Nhiều diễn viên"},{"name":"Jensen Daggett"},{"name":"Kane Hodder"},{"name":"Todd Caldecott"},{"name":"Tiffany Paulsen"},{"name":"Lee Do Yeon"},{"name":"Cho Jin Woong"},{"name":"Charlie Tahan"},{"name":"Meat Loaf"},{"name":"Gabriel Macht"},{"name":"Deborah Kara Unger"},{"name":"Frankie Muniz"},{"name":"Amanda Bynes"},{"name":"Nawajul Boonpakkanawik"},{"name":"Carl Bessai"},{"name":"Eddie Redmayne"},{"name":"John Lynch"},{"name":"Tim McInnerny"},{"name":"Mike Mitchell"},{"name":"Eric Thal"},{"name":"Julie Warner"},{"name":"Keith David"},{"name":"Dante Lam"},{"name":"Mario Maurer"},{"name":"Nudtawat Saksiri"},{"name":"Dennis Dugan"},{"name":"Cassandra Clare"},{"name":"Marguerite Sundberg"},{"name":"Michael Flores"},{"name":"Mark Chiappone"},{"name":"Beth Pratt"},{"name":"Hua Yueh"},{"name":"Hsi Chang"},{"name":"Hoắc Diệu Lương"},{"name":"John S. Flynn"},{"name":"Heather Gordon"},{"name":"Aaron Krebs"},{"name":"Shunsuke Daitô"},{"name":"Narushi Ikeda"},{"name":"Nana Katase"},{"name":"Tsuyoshi Muro"},{"name":"Lawrence Guterman"},{"name":"Jared Leto"},{"name":"Alicia Witt"},{"name":"Rebecca Gayheart"},{"name":"Michael Rosenbaum"},{"name":"Edward Woodward"},{"name":"Christopher Lee"},{"name":"Diane Cilento"},{"name":"Britt Ekland"},{"name":"Pierre Coffin,Chris Renaud"},{"name":"Sigrid Horne Rasmussen"},{"name":"Ann Marie Berglund"},{"name":"Else Petersen"},{"name":"Anne Magle"},{"name":"Steve Evets"},{"name":"Eric Cantona"},{"name":"Stephanie Bishop"},{"name":"Eduardo Rodriguez"},{"name":"Vinnie Jones"},{"name":"Randy Couture"},{"name":"Rusty Joiner"},{"name":"Masiela Lusha"},{"name":"Wesley John"},{"name":"Isaac C. Singleton Jr."},{"name":"Christina Lindberg"},{"name":"Heinz Hopf"},{"name":"Despina Tomazani"},{"name":"Per Axel Arosenius"},{"name":"Hạ Vũ"},{"name":"Chu Hoằng"},{"name":"La Kinh Dân"},{"name":"Khương Hàn"},{"name":"Thường Xa"},{"name":"Từ Khiết Nhi"},{"name":"Emily Watson"},{"name":"Yu mi Jeong"},{"name":"Byeol Kim"},{"name":"Gi su Kim"},{"name":"Ji yeong Kim"},{"name":"Zabou Breitman"},{"name":"Déborah François"},{"name":"Marc André Grondin"},{"name":"Ryûnosuke Kamiki"},{"name":"Daisuke Ono"},{"name":"Takeshi Tomizawa"},{"name":"Giorgio Serafini,Shawn Sourgose"},{"name":"Telly Savalas"},{"name":"Don Rickles"},{"name":"Dee Wallace"},{"name":"Patrick Macnee"},{"name":"Kim Darby"},{"name":"Glen Campbell"},{"name":"Jeremy Slate"},{"name":"Zack Bernbaum"},{"name":"Chung Hán Lương"},{"name":"Ái Đới"},{"name":"Robert Taylor"},{"name":"Deborah Kerr"},{"name":"Leo Genn"},{"name":"Nat Faxon,Jim Rash"},{"name":"Ben Jones"},{"name":"Ryôko Hirosue"},{"name":"Kaoru Kobayashi"},{"name":"Ken Kaneko"},{"name":"Henry Alex Rubin"},{"name":"Bradford Dillman"},{"name":"Heather Menzies Urich"},{"name":"Kevin McCarthy"},{"name":"Keenan Wynn"},{"name":"Dick Miller"},{"name":"Barbara Steele"},{"name":"Belinda Balaski"},{"name":"Melody Thomas Scott"},{"name":"Bruce Gordon"},{"name":"Barry Brown"},{"name":"Paul Bartel"},{"name":"Carlos Evelyn"},{"name":"Ariana Messias"},{"name":"Darci Figueiredo"},{"name":"Beto Simas"},{"name":"Jamie Foxx"},{"name":"Regina King"},{"name":"Clifton Powell"},{"name":"Harry Lennix"},{"name":"Aunjanue Ellis"},{"name":"Sharon Warren"},{"name":"C.J. Sanders"},{"name":"Bruce Payne"},{"name":"Alex Datcher"},{"name":"Robert Hooks"},{"name":"Elizabeth Hurley"},{"name":"Michael Horse"},{"name":"Marc Macaulay"},{"name":"Ernie Lively"},{"name":"Craig T. Nelson"},{"name":"JoBeth Williams"},{"name":"Beatrice Straight"},{"name":"Arsenio Hall"},{"name":"James Earl Jones"},{"name":"John Amos"},{"name":"Madge Sinclair"},{"name":"Shari Headley"},{"name":"Paul Bates"},{"name":"Eriq La Salle"},{"name":"Frankie Faison"},{"name":"Vanessa Bell Calloway"},{"name":"Louie Anderson"},{"name":"Allison Dean"},{"name":"Hilary Swank"},{"name":"Imelda Staunton"},{"name":"Patrick Dempsey"},{"name":"Peter Michael Dillon"},{"name":"Lara Daans"},{"name":"Christian Slater"},{"name":"Jordan Ladd"},{"name":"Lương Gia Huy"},{"name":"Trần Tuệ Lâm"},{"name":"Thiệu Mỹ Kỳ"},{"name":"Jeannie Chan"},{"name":"Kelly Chen"},{"name":"Tony Leung Ka Fai"},{"name":"Cherry Ngan"},{"name":"Shaw Yin Yin"},{"name":"Heather O'Rourke"},{"name":"Ngô Ngạn Tổ"},{"name":"Trương Vũ Ỷ"},{"name":"Lập Uy Liêm"},{"name":"Kitty Zhang Yuqi"},{"name":"Leon Jay Williams"},{"name":"Eman Lam"},{"name":"Edison Chen"},{"name":"Woo-Suk Kang"},{"name":"David Twohy"},{"name":"Ngô Thần Quân"},{"name":"Jackson Liu"},{"name":"Steven R. Monroe"},{"name":"Betty Aberlin"},{"name":"Paulie Litt"},{"name":"Raquel Castro"},{"name":"Ben Aff"},{"name":"Carlo Cecchi"},{"name":"Jean Luc Bideau"},{"name":"Christoph Koncz"},{"name":"Tommaso Puntelli"},{"name":"Samuele Amighetti"},{"name":"Aldo Brugnini"},{"name":"Matt Dillon"},{"name":"Breckin Meyer"},{"name":"Katie Chang"},{"name":"Israel Broussard"},{"name":"Emma Watson"},{"name":"Claire Julien"},{"name":"Taissa Farmiga"},{"name":"Georgia Rock"},{"name":"Leslie Mann"},{"name":"William Holden"},{"name":"Jennifer Jones"},{"name":"Torin Thatcher"},{"name":"Isobel Elsom"},{"name":"Murray Matheson"},{"name":"Virginia Gregg"},{"name":"Richard Loo"},{"name":"Frank Sinatra"},{"name":"Trevor Howard"},{"name":"Raffaella Carrà"},{"name":"Brad Dexter"},{"name":"Sergio Fantoni"},{"name":"John Leyton"},{"name":"Edward Mulhare"},{"name":"Wolfgang Preiss"},{"name":"James Brolin"},{"name":"John Van Dreelen"},{"name":"Adolfo Celi"},{"name":"Vito Scotti"},{"name":"Michael Goodliffe"},{"name":"Keith Gordon"},{"name":"Alexandra Paul"},{"name":"Eli Marienthal"},{"name":"Harry Connick Jr."},{"name":"Jennifer Aniston"},{"name":"Vương Phi"},{"name":"Lâm Thanh Hà"},{"name":"Kim Thành Vũ"},{"name":"Đổng Phiêu"},{"name":"Jamel Debbouze"},{"name":"Rie Rasmussen"},{"name":"Gilbert Melki"},{"name":"Serge Riaboukine"},{"name":"Akim Chir"},{"name":"Eric Balliet"},{"name":"Loïc Pora"},{"name":"Venus Boone"},{"name":"Laurent Jumeaucourt"},{"name":"Laura Michelle Kelly"},{"name":"Ronan Keating"},{"name":"Magda Szubanski"},{"name":"Dustin Clare"},{"name":"Douglas Silva"},{"name":"Darlan Cunha"},{"name":"Jonathan Haagensen"},{"name":"Ji tae Yu"},{"name":"Yeon hee Lee"},{"name":"Jeong an Chae"},{"name":"Kang In"},{"name":"Hee yong Choi"},{"name":"Min ho Choi"},{"name":"Jeong hwa Chu"},{"name":"Seok jeong Hwang"},{"name":"Pool Kang"},{"name":"Kang woo Kim"},{"name":"Ashley Tisdale"},{"name":"Lauren Collins"},{"name":"Shenae Grimes"},{"name":"Ally Sheedy"},{"name":"Fisher Stevens"},{"name":"Austin Pendleton"},{"name":"James Stewart"},{"name":"Shelley Winters"},{"name":"Dan Duryea"},{"name":"Stephen McNally"},{"name":"Millard Mitchell"},{"name":"Charles Drake"},{"name":"John McIntire"},{"name":"Jean Dujardin"},{"name":"Tim Roth"},{"name":"Émilie Dequenne"},{"name":"David M. Rosenthal"},{"name":"Whoopi Goldberg"},{"name":"Predrag Manojlovic"},{"name":"Lazar Ristovski"},{"name":"Mirjana Jokovic"},{"name":"Slavko Stimac"},{"name":"Ernst Stötzner"},{"name":"Srdjan Todorovic"},{"name":"Mirjana Karanovic"},{"name":"Rosie Day"},{"name":"Kevin Howarth"},{"name":"Anna Walton"},{"name":"François Arnaud"},{"name":"Lucy Boynton"},{"name":"Casey Thomas Brown"},{"name":"Billy Campbell"},{"name":"Embeth Davidtz"},{"name":"Oliver Platt"},{"name":"Kiersten Warren"},{"name":"Wendy Crewson"},{"name":"Hallie Kate Eisenberg"},{"name":"Angela Landis"},{"name":"John Michael Higgins"},{"name":"Bradley Whitford"},{"name":"Stephen Root"},{"name":"Gonzalo Vega"},{"name":"Karla Souza"},{"name":"Luis Gerardo Méndez"},{"name":"Jeff Renfroe"},{"name":"Junior N.T.R."},{"name":"Tamannaah Bhatia"},{"name":"Prakash Raj"},{"name":"Vidyut Jamwal"},{"name":"Ed Anders"},{"name":"Cole Coker"},{"name":"Erin Karpluk"},{"name":"Brad Kelly"},{"name":"Tyron Leitso"},{"name":"Irandhir Santos"},{"name":"James Garner"},{"name":"Álex González"},{"name":"Adriana Ugarte"},{"name":"Alberto Ammann"},{"name":"Tony Jaa"},{"name":"Jeff Wadlow"},{"name":"Yong-hwa Kim"},{"name":"Robert Vince"},{"name":"Richard Raaphorst"},{"name":"Jeppe Laursen"},{"name":"Charlotte Frogner"},{"name":"Jenny Skavlan"},{"name":"Nick Swardson"},{"name":"Lance Bass"},{"name":"Blake Clark"},{"name":"Kao Yin Hsuan"},{"name":"Egidio Coccimiglio"},{"name":"Park Hye Sook"},{"name":"Park Ki Woong"},{"name":"Soo Hyun Kim"},{"name":"Nobuyo Oyama"},{"name":"Noriko Ohara"},{"name":"Michiko Nomura"},{"name":"Kaneta Kimotsuki"},{"name":"Nobuyo Ohyama"},{"name":"Noriko Ohara and Michiko Nomura"},{"name":"Thor Freudenthal"},{"name":"Daniele Vicari"},{"name":"Peter Webber"},{"name":"Dito Montiel"},{"name":"Yukiyo Teramoto"},{"name":"Ui-seok Jo,Byung-seo Kim"},{"name":"David Soren"},{"name":"Brit Marling"},{"name":"Alexander Skarsgård"},{"name":"Ellen Page"},{"name":"Toby Kebbell"},{"name":"Naresh Kumar"},{"name":"TayShawn Prinse"},{"name":"Manwinder Gill"},{"name":"Kazuya Tatekabe"},{"name":"Joo Ji hoon"},{"name":"Baek Yoon sik"},{"name":"Byeon Hee bong"},{"name":"Michiko nomura"},{"name":"Noriko ohara"},{"name":"Nobuyo oyama"},{"name":"Klaus Hüttmann"},{"name":"Kaneta kimotsuki"},{"name":"Kazuya tatekabe"},{"name":"Kaneta Kimotsuk"},{"name":"Justin Zackham"},{"name":"Dean Parisot"},{"name":"Williams Belle"},{"name":"Chau Belle Dinh"},{"name":"Malik Diouf"},{"name":"Yann Hnautra"},{"name":"Châu Belle Dinh"},{"name":"John Belushi"},{"name":"Dan Aykroyd"},{"name":"Cab Calloway"},{"name":"Rapeepimol Chaiyasena"},{"name":"Neil Jordan"},{"name":"Yong-gyun Kim"},{"name":"Baz Luhrmann"},{"name":"Yûzô Satô"},{"name":"Mateo Frazier,Diego Joaquin Lopez"},{"name":"Paul Schrader"},{"name":"Bành Vu Yến"},{"name":"Matt Orlando"},{"name":"Sacha Bennett"},{"name":"Kyung gu Sol"},{"name":"Jun ho Heo"},{"name":"Jae yeong Jeong"},{"name":"Meaghan Martin"},{"name":"Donn Lamkin"},{"name":"Linden Ashby"},{"name":"Malcolm D. Lee"},{"name":"Andrew Goth"},{"name":"Choon-sik Kim"},{"name":"Ken Lo"},{"name":"Sibelle Hu"},{"name":"Mai Diễm Phương"},{"name":"Christopher Hatton"},{"name":"Chung Sở Hồng"},{"name":"Dư Mộ Liên"},{"name":"Youn-hyun Chang"},{"name":"Jo Dong-Oh"},{"name":"Jannicke Systad Jacobsen"},{"name":"Eason Chan"},{"name":"Jo Kuk and Cherrie Ying"},{"name":"Barry Bostwick"},{"name":"Michael Steger"},{"name":"Melvin Sia"},{"name":"Henley Hii"},{"name":"Hero Tai"},{"name":"Rayz Lim"},{"name":"Billy Ng"},{"name":"Quách Phú Thành"},{"name":"Beom-sik Jeong,Hwi Kim"},{"name":"Diệp Đồng"},{"name":"Tần Hào"},{"name":"Lưu Tuân"},{"name":"Lưu Hiểu Đồng"},{"name":"Viên Vịnh Nghi"},{"name":"Trương Đạt Minh"},{"name":"Phùng Đức Luân"},{"name":"Đường Văn Long"},{"name":"Huỳnh Cẩm Vinh"},{"name":"Yuen Biao"},{"name":"Cynthia Rothrock"},{"name":"Roy Chiao"},{"name":"Siu Wong Fan"},{"name":"Melvin Wong"},{"name":"Karen Sheperd"},{"name":"Chad Crawford Kinkle"},{"name":"Kevin Goetz,Michael Goetz"},{"name":"Tạ Đình Phong"},{"name":"Jingchu Zhang"},{"name":"Lưu Gia Linh"},{"name":"Trần Dịch Tấn"},{"name":"Lý San San"},{"name":"Từ Tử Kỳ"},{"name":"Ching Wan Lau"},{"name":"Sharla Cheung and Joe Cheng"},{"name":"Kuang Chao Chiangnd Lin Dai"},{"name":"Olivia HoltKerris Dorsey"},{"name":"Dominic Burns"},{"name":"Joseph Brown"},{"name":"David Chokachi"},{"name":"Jared Cohn"},{"name":"Nicole Gale Anderson"},{"name":"John Billingsley"},{"name":"Kunal Sharma"},{"name":"Akan Satayev"},{"name":"David Kew,Neil Thompson"},{"name":"Feth Greenwood"},{"name":"Dylan Jones"},{"name":"Lee Bennett"},{"name":"Mark Steven Johnson"},{"name":"Ching Lee"},{"name":"Lung Ti"},{"name":"Craig ShefferEric Roberts"},{"name":"Darren Lynn Bousman"},{"name":"Yoshihiro Ueda"},{"name":"Vương Vũ"},{"name":"Gregory McQualter"},{"name":"Lowell Dean"},{"name":"Chiao Chiao"},{"name":"Essie Lin Chia"},{"name":"Joséphine de La Baume"},{"name":"Milo Ventimiglia"},{"name":"Roxane Mesquida"},{"name":"Martin Zandvliet"},{"name":"Lâm Trân Chiêu"},{"name":"Coralie Fargeat"},{"name":"Darin Scott"},{"name":"Park Hee Joon"},{"name":"Heo Joon-Hyung"},{"name":"Pasha Patriki"},{"name":"Beom-sik Jeong"},{"name":"Ava DuVernay"},{"name":"Per Fly"},{"name":"Prosit Roy"},{"name":"Bethany Ashton Wolf"},{"name":"Johannes Roberts"},{"name":"Tăng Chí Vĩ"},{"name":"Anthony Byrne"},{"name":"Ben HowlingYolanda Ramke"},{"name":"Yûji Shimomura"},{"name":"Joe RussoAnthony Russo"},{"name":"Choo Chang-Min"},{"name":"John Francis DaleyJonathan Goldstein"},{"name":"Quách Đức Cương"},{"name":"Aaron Sorkin"},{"name":"Eric Zaragoza"},{"name":"Katsuyuki Motohiro"},{"name":"Advait Chandan"},{"name":"Sang-ho Yeon"},{"name":"Yoon Jong-Seok"},{"name":"Andrew Niccol"},{"name":"Will Gluck"},{"name":"Vương Ninh"},{"name":"Lee Chang-Hee"},{"name":"Đới Duy"},{"name":"Shin Jae-Ho"},{"name":"Trish Sie"},{"name":"Ding Sheng"},{"name":"Na Young Seok,John Krasinski"},{"name":"Kim Je-Young"},{"name":"Junpei Mizusaki"},{"name":"Christian Gudegast"},{"name":"Wim Wenders"},{"name":"Cốc Đức Chiêu"},{"name":"Rob Cohen"},{"name":"Daniel Alfredson"},{"name":"Brandon Camp"},{"name":"Paul King"},{"name":"Suzi Ewing"},{"name":"Michael Gracey"},{"name":"Steven S. DeKnight"},{"name":"Hạng Thu Lương"},{"name":"Nicolai Fuglsig"},{"name":"Marc J. FrancisMax Pugh"},{"name":"Kim Suk-Yoon"},{"name":"Fabrice du Welz"},{"name":"Mitu Misra"},{"name":"Brian O'Malley"},{"name":"Cự Hưng Mậu"},{"name":"Tim Hunter"},{"name":"Tan Bing"},{"name":"Lưu Quốc Huy"},{"name":"Atsuko Ishizuka"},{"name":"Trần Tư Thành"},{"name":"Sophon Sakdaphisit"},{"name":"Vương Tuấn Lân"},{"name":"Kimble Rendall"},{"name":"Jonathan Wright"},{"name":"Xavier Gens"},{"name":"Sergio G. Sánchez"},{"name":"David Bruckner"},{"name":"Rory Quintos"},{"name":"Guan Xiaojie"},{"name":"Dan Scanlon"},{"name":"Daniel Lusko"},{"name":"Mohit Suri"},{"name":"Annette K. Olesen"},{"name":"Joseph Ruben"},{"name":"Daniel Chan"},{"name":"Banjong Pisanthanakun"},{"name":"Scooter Downey"},{"name":"Ôn Bích Hà"},{"name":"Yoon-suk Choi,John Kafka"},{"name":"Brad Furman"},{"name":"Jeong min Hwang"},{"name":"Vương Tử Minh"},{"name":"Ruel S. Bayani"},{"name":"Martin Scorsese"},{"name":"Vanessa Hudgens"},{"name":"Selena Gomez"},{"name":"Ashley Benson"},{"name":"Rachel Korine"},{"name":"Michaël Youn"},{"name":"Danny Boyle"},{"name":"Chris Crow"},{"name":"Ming Bridges"},{"name":"Hanwei Chen"},{"name":"Cecilia Heng"},{"name":"Yiuwing Lam"},{"name":"Shara Linndrew Lin Zehao"},{"name":"Brian De Palma"},{"name":"Christian Bisceglia,Ascanio Malgarini"},{"name":"Chen Jian"},{"name":"Chris Pratt"},{"name":"Daigo Matsui"},{"name":"Paul Middleditch"},{"name":"Natpassara Adulyamethasiri"},{"name":"Acharanat Ariyaritwikol"},{"name":"Chinawut Indracusin"},{"name":"Brian Trenchard-Smith"},{"name":"Niu Chaoyang"},{"name":"Kunihiko Yuyama"},{"name":"Tôn Kiện Quân"},{"name":"Simon Barrett,Jason Eisener"},{"name":"Diego Kaplan"},{"name":"Dennis Gunn"},{"name":"Cay Izumi"},{"name":"Shinji Kasahara"},{"name":"Felix Fuchssteiner"},{"name":"Makinov"},{"name":"Tăng Chí Vỹ"},{"name":"Nuel C. Naval"},{"name":"Huang Xiao Ming"},{"name":"Zhang Jing Chu"},{"name":"Richie Ren Yin Chi"},{"name":"Nat Chan Pak"},{"name":"Dilip Ghosh"},{"name":"Todd Robinson"},{"name":"Park Yong Woo"},{"name":"Go Ah Ra"},{"name":"Gary Jones"},{"name":"BJ McDonnell"},{"name":"Jung woo Ha"},{"name":"Hyo jin Kong"},{"name":"Byung joon Lee"},{"name":"Petchtai Wongkamlaokom Preedakul"},{"name":"John O. Hartman,Nicholas Mross"},{"name":"Danielle Chuchran"},{"name":"Richard McWilliams"},{"name":"Paul D. Hunt"},{"name":"Shawn Piller"},{"name":"Dun MacNeillie"},{"name":"Hye jin Han"},{"name":"Soo bin Bae"},{"name":"Drake Bell"},{"name":"Andy Dick"},{"name":"Fran Drescher"},{"name":"Don Scardino"},{"name":"Trivikram Srinivas"},{"name":"Tempestt Bledsoe"},{"name":"Park Won sang"},{"name":"Lee Kyeong yeong"},{"name":"Myeong Kye nam"},{"name":"Kim Ee seong"},{"name":"Brett Donowho"},{"name":"Richie Ren"},{"name":"William So Wing Hong"},{"name":"Mads Mikkelsennnika Wedderkopp"},{"name":"Min jung Lee"},{"name":"Daniel Choi"},{"name":"Kim Beom"},{"name":"Esom"},{"name":"Roger Christian"},{"name":"M.L. Pundhevanop Dhewakul"},{"name":"Charlie Bewley"},{"name":"Lielle Tova Blinkoff"},{"name":"Alan Cumming"},{"name":"Ashley Bell"},{"name":"Spencer Treat Clark"},{"name":"Jeff Bridges"},{"name":"John Goodman"},{"name":"Chan-wook Park"},{"name":"Mason Vale Cotton"},{"name":"Makoto Shii"},{"name":"Clive Standen"},{"name":"James Cosmo"},{"name":"Christopher Neil"},{"name":"M. Night Shyamalan"},{"name":"Brandon Chang"},{"name":"David Ondrícek"},{"name":"Seung woo Cho"},{"name":"Soo Ae"},{"name":"Sophie Broustal"},{"name":"Chu-ji Qiu"},{"name":"Mandy Moore"},{"name":"Jeremy Suarez"},{"name":"Brett Beoubay"},{"name":"Ashley Braud"},{"name":"Philippe Brenninkmeyer"},{"name":"Zachary Levi"},{"name":"Merritt Wever"},{"name":"Mitsuo Iwata"},{"name":"Nozomu Sasaki"},{"name":"Mark Dil"},{"name":"Lý Liên Kiệt"},{"name":"Chingmy Yau"},{"name":"Leehom Wang"},{"name":"Yifei Liu"},{"name":"Joan Chen"},{"name":"Hyun Jin Lee"},{"name":"Moo Saeng Lee"},{"name":"So jeong Lee"},{"name":"Tu in Tak"},{"name":"Juha Veijonen"},{"name":"Kari Hietalahti"},{"name":"Elina Knihtilä"},{"name":"Christopher Lloyd"},{"name":"Troy Baker"},{"name":"Patrick Warburton"},{"name":"Tracey Ullman"},{"name":"Eartha Kitt"},{"name":"Tra Truyền Nghị"},{"name":"Colm Meaney"},{"name":"Henry Goodman"},{"name":"David Roper"},{"name":"Phòng Tổ Danh"},{"name":"An Dĩ Hiên"},{"name":"Nolan North"},{"name":"Mako"},{"name":"Chris Evans"},{"name":"Martijn Smits,Erwin van den Eshof"},{"name":"Myleene Klass"},{"name":"Steve Buscemi"},{"name":"David Morlet"},{"name":"David Robles"},{"name":"Cecilia Santiago"},{"name":"Conchi López"},{"name":"Sola Aoi"},{"name":"Risa Kasumi"},{"name":"Mari Sakurai"},{"name":"Tamayo"},{"name":"Graham McTavish"},{"name":"Vanessa Branch"},{"name":"Steve Blum"},{"name":"Ryan Newman"},{"name":"Mitchel Musso"},{"name":"Sam Lerner"},{"name":"Sarah Bolger"},{"name":"Anton Yelchin"},{"name":"Christina Hendricks"},{"name":"Ian McKellen"},{"name":"Zach Callison"},{"name":"Josh Keaton"},{"name":"Jun'ichi Okada"},{"name":"Timothy Dalton"},{"name":"Rob Lettermand Vernon"},{"name":"Keri Russell"},{"name":"Bobby Driscoll"},{"name":"Kathryn Beaumont"},{"name":"Hans Conried"},{"name":"Catherine Zeta Jones"},{"name":"Siyan Huo"},{"name":"Zonghan Li"},{"name":"Shuangbao Wang"},{"name":"Adrian Paul"},{"name":"Richard Grieco"},{"name":"Bali Rodriguez"},{"name":"Talia Shire"},{"name":"Burt Young"},{"name":"Todd Phillips"},{"name":"Hwang Jung Min"},{"name":"Uhm Jung Hwa"},{"name":"Kim Hyo Jin"},{"name":"Vu Nhân Thái"},{"name":"Lý Gia Vinh"},{"name":"Walter Hill"},{"name":"Clancy Brown"},{"name":"Travis Willingham"},{"name":"Christopher Corey Smith"},{"name":"Charlie Schlatter"},{"name":"Hu Guan"},{"name":"Katie Aselton"},{"name":"Steve Martin"},{"name":"Sean McNamara"},{"name":"Jason Bateman Peet"},{"name":"Lee Cheon hee"},{"name":"Kim Sae ron"},{"name":"Kim Ah ron"},{"name":"Joseph J. Lawson"},{"name":"Tigmanshu Dhulia"},{"name":"Chris Wedge"},{"name":"Sheershak Anandnu Ray Chhibber"},{"name":"David Weaver"},{"name":"Byron Pang"},{"name":"Thomas Price"},{"name":"Winnie Leung"},{"name":"Simon Tam"},{"name":"Ulrich Tukur"},{"name":"Lorna Ravel"},{"name":"Courtney Love"},{"name":"Antonio Tarver"},{"name":"Ha Huang"},{"name":"Dick Wei"},{"name":"Emily Mortimer"},{"name":"April Mullen"},{"name":"Johnnie To"},{"name":"Trần Bá Lâm"},{"name":"Lạc Huyễn Minh"},{"name":"Khâu Ngạn Tường"},{"name":"Minh Đạo. Bành Vu Yến"},{"name":"Uyển Tân Vũ"},{"name":"Đậu Kiêu"},{"name":"Đổng Khiết"},{"name":"Quách Gia Minh"},{"name":"Phụng Tiểu Nhạc"},{"name":"Trương Tiệp"},{"name":"Kamal Hassan"},{"name":"Hoa Minh"},{"name":"Anton Megerdichev"},{"name":"Kim Yong-han"},{"name":"Cảnh Lạc"},{"name":"Đại Lưu"},{"name":"Ernie Reyes Jr."},{"name":"Mathias Hues"},{"name":"John Savage"},{"name":"Nicolás López"},{"name":"Abe Levy,Silver Tree"},{"name":"Lee Min ki"},{"name":"Kim Min hee"},{"name":"Zaizai Lin"},{"name":"Kôsuke Atari"},{"name":"Crispian Mills,Chris Hopewell"},{"name":"riệu Hựu Đình"},{"name":"Hàn Canh"},{"name":"Dương Tử San"},{"name":"Giang Sơ Ảnh"},{"name":"Rob Zombie"},{"name":"Ninh Tịnh"},{"name":"Lưu Đức Hòa"},{"name":"Thư Kỳ"},{"name":"Eron Sheean"},{"name":"Subhash Kapoor"},{"name":"Fengyi Zhang"},{"name":"Li Gong"},{"name":"Hà Vận Thi"},{"name":"Ric Roman Waugh"},{"name":"Aditya Datt"},{"name":"Ol Parker"},{"name":"Abhishek Kapoor"},{"name":"Bruce Campbell"},{"name":"Marcus Gilbert"},{"name":"Maxwell Vreeland Andrew"},{"name":"Steven Bone"},{"name":"Colin Chong"},{"name":"Leone Marucci"},{"name":"Ken Loach"},{"name":"Wei Tang"},{"name":"Xiubo Wu"},{"name":"Dante Lee Arias"},{"name":"Yu Ning Chu"},{"name":"Kunal Kohli"},{"name":"Cal Brunker"},{"name":"Jonathan Levine"},{"name":"Nicholas Jarecki"},{"name":"Young hee Na"},{"name":"P.J. Hogan"},{"name":"Brian Dannelly"},{"name":"Sam Raimi"},{"name":"Izabella Scorupco"},{"name":"Iginio Straffi"},{"name":"Eran Creevy"},{"name":"Vishal Bhardwaj"},{"name":"Châu nhuận phát"},{"name":"Nina li chi"},{"name":"Conan lee"},{"name":"Lee Jeong jae"},{"name":"Brandon Cronenberg"},{"name":"John Putch"},{"name":"Mohammed ZeeshaViren Basoya"},{"name":"Manish Chaudhary"},{"name":"Dougray Scottn"},{"name":"Toru Kamei"},{"name":"Hosoda Mamoru"},{"name":"Isidora SimijonovicJovo Maksic"},{"name":"Jonathan Tucker"},{"name":"David Guy Levy"},{"name":"Josh Peck"},{"name":"Josh Holloway"},{"name":"Chris Brown"},{"name":"Roman Coppola"},{"name":"Peter Geiger"},{"name":"Joseph Kosinski"},{"name":"BeMorgan Freeman"},{"name":"Aksel Hennie"},{"name":"Agnes Kittelsen"},{"name":"Nicolai Cleve Broch"},{"name":"Daniel Calparsoro"},{"name":"Aleksey Kopashov"},{"name":"Pavel Derevyanko"},{"name":"Megumi Ogata"},{"name":"Megumi Hayashibara"},{"name":"Yûko Miyamura"},{"name":"Kathryn Bigelow"},{"name":"Michael CaineDo Thi Hai Yen"},{"name":"Rinko Kikuchi"},{"name":"Min Tanaka"},{"name":"Gabe Torres"},{"name":"Patrice Leconte"},{"name":"Jim Caviezel"},{"name":"Nick Nolte"},{"name":"Steven Sheil"},{"name":"Jodi Benson"},{"name":"Samuel E. Wright"},{"name":"Kwok-Leung Gan"},{"name":"Adrien Brodyy"},{"name":"Geoffrey Rush"},{"name":"John Gielgud"},{"name":"Candice Bergen"},{"name":"Raymond J. Barry"},{"name":"Caroline Kav"},{"name":"Glenn Close"},{"name":"Gérard Depardieu"},{"name":"Ioan Gruffudd"},{"name":"Vladimir Mashkov"},{"name":"Yekaterina Rednikova"},{"name":"Mikhail Filipchuk"},{"name":"Nathan Lane"},{"name":"Ernie Sabella"},{"name":"Julie Kavner"},{"name":"Matthew Modine"},{"name":"R. Lee Ermey"},{"name":"Vincent D'Onofrio"},{"name":"Dougray Scott"},{"name":"Rachael Blake"},{"name":"Jeremy Lindsay Taylor"},{"name":"Oleg Yankovskiy"},{"name":"Rolan Bykov"},{"name":"Anatoliy Papanov"},{"name":"Sian Breckin"},{"name":"Nichola Burley"},{"name":"Jaime Winstone"},{"name":"Kevin Bacon"},{"name":"Monica Bellucci"},{"name":"Giuseppe Sulfaro"},{"name":"Luciano Federico"},{"name":"Angelo Pellegrino"},{"name":"Gabriella Di Luzio"},{"name":"Pippo Provvidenti"},{"name":"Maria Terranova"},{"name":"Chien lien Wu"},{"name":"Kingman Cho"},{"name":"Roger Miller"},{"name":"Peter Ustinov"},{"name":"Brian Bedford"},{"name":"Trầnh Hùng"},{"name":"Meg Ryan"},{"name":"Irene Bedard"},{"name":"Phil Harris"},{"name":"Sebastian Cabot"},{"name":"Bruce Reitherman"},{"name":"Mario Casas"},{"name":"Vicente Romero"},{"name":"Luciano Cáceres"},{"name":"GiaWoo sung Jung"},{"name":"Sung jae Lee"},{"name":"Jason Wee MaRyan Dunn"},{"name":"Dave England"},{"name":"Je-gyun Yun"},{"name":"Ryo Ishibashi"},{"name":"Eihi Shiina"},{"name":"Tetsu Sawaki"},{"name":"Komaki Kurihara"},{"name":"Oleg Vidov"},{"name":"Makoto Satô"},{"name":"Xa Thi Mạn"},{"name":"Phương Lực Thân"},{"name":"La Trọng Khiêm"},{"name":"Tạ An Kỳ"},{"name":"Trần Gia Hoàn"},{"name":"Trang Tư Mẫn"},{"name":"La Hạo Mai"},{"name":"Lý Vũ Dương"},{"name":"Hồng Thiên Minh"},{"name":"Thái Dĩnh Ân"},{"name":"Park Kang ho Song"},{"name":"Ok bin Kim"},{"name":"Hae suk Kim"},{"name":"Ha kyun Shin"},{"name":"In hwan Park"},{"name":"Avalon Barrie"},{"name":"Todd Soley"},{"name":"Lyudmila Shiryaeva"},{"name":"Elena Babenko"},{"name":"Bogdan Stupka"},{"name":"Khưu Thục Trinh"},{"name":"Wai Yiu"},{"name":"Madoka Sugawara"},{"name":"Sook Yin Lee"},{"name":"Peter Stickles"},{"name":"PJ DeBoy"},{"name":"DaJustin Timberlake Faris"},{"name":"Aleksey Smirnov"},{"name":"Anatoly Romashin"},{"name":"Eduard Izotov"},{"name":"Ivan Pereverzev"},{"name":"Larissa Golubkina"},{"name":"Mikhail Nozhkin"},{"name":"Mikhail Ulyanov"},{"name":"Nikolai Olyalin"},{"name":"Nikolay Olyalin"},{"name":"Larisa Golubkina"},{"name":"Boris Zajdenberg"},{"name":"Sergey Nikonenko"},{"name":"Vsevolod Sanayev"},{"name":"Vladimir Samojlov"},{"name":"Jan Englert"},{"name":"Ngô Mạnh Đạt"},{"name":"Lâm Chí Dĩnh"},{"name":"Alisa Freyndlikh"},{"name":"Larisa Guzeeva"},{"name":"Nikita Mikhalkov"},{"name":"Siu hou Chin"},{"name":"Fong Liu"},{"name":"Kim Dong wuk"},{"name":"Jo Yeo jeong"},{"name":"Kim Min joon"},{"name":"Moon Lee"},{"name":"Chakri Toleti"},{"name":"Ji-woo Jung"},{"name":"Bo Ze"},{"name":"Đỗ Vấn Trạch"},{"name":"Lương Lạc Thi"},{"name":"Hà Siêu Nghi"},{"name":"Isabella Leong"},{"name":"Josie Ho"},{"name":"Sa rang Kim"},{"name":"Jun Gyu Park"},{"name":"Hyeok jae Lee"},{"name":"Gael García Bernal"},{"name":"Ricky Hui"},{"name":"AmaStellan Skarsgård"},{"name":"Vasily Shukshin"},{"name":"Eduardo Noriega"},{"name":"Martina Gedeck"},{"name":"Elizabeth Mitchell"},{"name":"Aleksandr Galibin"},{"name":"Bao Viet"},{"name":"Yuriy Nazarov"},{"name":"Liberto Rabal"},{"name":"Francesca Neri"},{"name":"Javier Bardem"},{"name":"Lyudmila Gurchenko"},{"name":"Oleg Basilashvili"},{"name":"Nanako Matsushima"},{"name":"Miki Nakatani"},{"name":"Yûko Takeuchi"},{"name":"Kiu Wai Miu"},{"name":"Wilson Lam"},{"name":"Brigitte Bardot"},{"name":"Jack Palance"},{"name":"Michel Piccoli"},{"name":"Giorgia Moll"},{"name":"Fritz Lang"},{"name":"Lam Ching Ying"},{"name":"Richard Ng Yiu Hon"},{"name":"Billy Lau Nam Kwong"},{"name":"Lui Fong"},{"name":"Corey Yuen Kwai"},{"name":"Wu Ma"},{"name":"Mikhail Kononov"},{"name":"Oleg Borisov"},{"name":"Viktor Pavlov"},{"name":"Nobuo Tobita"},{"name":"Toshihiko Seki"},{"name":"Yoko Sakamoto"},{"name":"Gerard Butlerm"},{"name":"ATraci Lords"},{"name":"Ariel Winter"},{"name":"Sophie Marceau"},{"name":"Robert Carlyle"},{"name":"Đang Cập Nhậtđ"},{"name":"Trung Sở Hồng"},{"name":"Kundô KoyamaStars:Masahiro Motoki"},{"name":"Tsutomu Yamazaki"},{"name":"Anton Shagin"},{"name":"Oksana Akinshina"},{"name":"Evgeniya Khirivskaya"},{"name":"Andrew Tent"},{"name":"Paula Patton"},{"name":"Audrey Tautou"},{"name":"Gaspard Ulliel"},{"name":"Jean Pierre Becker"},{"name":"J Lo"},{"name":"Declan O'Brien"},{"name":"Ohn Cusack"},{"name":"Catherine Keener"},{"name":"Dakota Blue Richards"},{"name":"Rob Schneider"},{"name":"Park Ha seon"},{"name":"Yoon Sang hyeon"},{"name":"Park Cheol min"},{"name":"Bill Boyd"},{"name":"Kristin Scott Thomas"},{"name":"Elsa Zylberstein"},{"name":"Serge Hazanavicius"},{"name":"Franck Khalfoun"},{"name":"Loretta Devine"},{"name":"Peter Dinklage"},{"name":"Ron Glass"},{"name":"Martin Lawrence"},{"name":"James Marsden"},{"name":"Tracy Morgan"},{"name":"Trịnh Tắc Sĩ"},{"name":"Miêu Kiều Vỹ"},{"name":"Alan Tam"},{"name":"Pak cheung Chan"},{"name":"Charine Chan"},{"name":"Lương Gia Nhân"},{"name":"Trương Vệ Kiện"},{"name":"Jaz MartinMaria Demara"},{"name":"Lexa Doig"},{"name":"Jeff Geddis"},{"name":"Bob Odenkirk,Elizabeth Banks"},{"name":"Ryan Kelley"},{"name":"Alyssa Diaz"},{"name":"Nathan Keyes"},{"name":"John Bonito"},{"name":"Maud Adams"},{"name":"Louis Jourdan"},{"name":"Bill Pullman"},{"name":"Christina Ricci"},{"name":"Cathy Moriarty"},{"name":"Sin So mi"},{"name":"Jeong Ee kap"},{"name":"Seol Seong min"},{"name":"Park Choong seon"},{"name":"Colin Firth"},{"name":"Hugh Grant"},{"name":"Tim Robbins and Kevin Bacon"},{"name":"Rene Russo"},{"name":"Denis Leary"},{"name":"Jim Broadbent"},{"name":"Garry McDonald"},{"name":"Jacek Koman"},{"name":"Rall Wallace"},{"name":"Vanness Wu and Cherrie Ying"},{"name":"Billy Bob Thornton"},{"name":"Halle Berry"},{"name":"Taylor Simpson"},{"name":"Tatsuya Fujiwara"},{"name":"Aki Maeda"},{"name":"Tarô Yamamoto"},{"name":"Chiaki Kuriyama"},{"name":"Ming Na"},{"name":"Jean Hugues Anglade"},{"name":"Béatrice Dalle"},{"name":"Gérard Darmon"},{"name":"Kenichi Matsuyama"},{"name":"Kazunari Ninomiya"},{"name":"Takayuki Yamada"},{"name":"Chris Cooper"},{"name":"Ryan Phillippe"},{"name":"Dennis Haysbert"},{"name":"Đang cập nhật Vardalos"},{"name":"Rachel Dratch"},{"name":"Wah Yuen"},{"name":"Qiu Yuen"},{"name":"Kim Kyeong ik"},{"name":"Yoon Mi kyeong"},{"name":"Yang Yeong jo"},{"name":"Lee Ja kyeong"},{"name":"Joe Pantoliano"},{"name":"Donald Pleasence"},{"name":"Charles Cyphers"},{"name":"FarhaDeepika Padukone"},{"name":"Ram Kapoor"},{"name":"Kim Rae Won Moon Geun Young"},{"name":"Jennifer Lawrence"},{"name":"Vincent Cassel"},{"name":"Ludivine Sagnier"},{"name":"Mathieu Amalric"},{"name":"Samuel Le Bihan"},{"name":"Gérard Lanvin"},{"name":"Olivier Gourmet"},{"name":"Jim Carrey"},{"name":"Angela Lansbury"},{"name":"Ophelia Lovibond"},{"name":"Akiko Takeshita"},{"name":"Tadanobu AsanoBa Sen"},{"name":"Fiona Sit"},{"name":"Kar Ying Law"},{"name":"Vladimir IvashovAntonina Maksimova"},{"name":"Sergey Borchuk"},{"name":"Andrey Podoshian"},{"name":"Irina Malysheva"},{"name":"Innokentiy Smoktunovskiy"},{"name":"Anatoliy Kuznetsov"},{"name":"Spartak Mishulin"},{"name":"Kakhi Kavsadze"},{"name":"Pakpoom Wongji"},{"name":"Viktor Kosykh"},{"name":"Mikhail Metyolkin"},{"name":"Vasili Vasilyev"},{"name":"Kajal Agarwal"},{"name":"Navdeep"},{"name":"Mã Thiên Vũ"},{"name":"Timothy Olyphant"},{"name":"Larenz Tate"},{"name":"Georgi Zhzhyonov"},{"name":"Vadim Spiridonov"},{"name":"Terry Miles"},{"name":"Andie MacDowell"},{"name":"Kim Ji wanJeon Se hong"},{"name":"Stobe Harju"},{"name":"Dương Tử"},{"name":"Pyotr Glebov"},{"name":"Elina Bystritskaya"},{"name":"Zinaida Kirienko"},{"name":"Kamolnet ReungsriNawapaiboon Wuttinanon"},{"name":"Giang Nhất Yên"},{"name":"Olga Yukina"},{"name":"Tatyana Yukina"},{"name":"Tatyana Barysheva"},{"name":"Gedi Kazansky"},{"name":"Leonid Bykov"},{"name":"Sergei Podgornyj"},{"name":"Sergei Ivanov"},{"name":"Boris Bystrov"},{"name":"Dodo Chogovadze"},{"name":"Andrei Fajt"},{"name":"Kim tae hyeoJin seo yeon"},{"name":"Vladimir Samoilov"},{"name":"Lyudmila Alfimova"},{"name":"Valentina Lysenko"},{"name":"Vishesh Bhatt"},{"name":"Jonah Hill"},{"name":"Demi Moore"},{"name":"Yuriy Yakovlev"},{"name":"Yuliya Borisova"},{"name":"Nikita Podgorny"},{"name":"Robert Prosky"},{"name":"Viggo Mortensen"},{"name":"Maria Bello"},{"name":"Alastair Fothergill,Mark Linfield"},{"name":"Zhiwen Wang"},{"name":"Bingbing Fan"},{"name":"Uma ThurmanRainn Wilson"},{"name":"Eddie Izzard"},{"name":"Stelio Savante"},{"name":"Mike Iorio"},{"name":"JuliaGabriel Byrne"},{"name":"Isaiah Washington"},{"name":"Ron Eldard"},{"name":"Pruitt Taylor Vince"},{"name":"Bill Nunn"},{"name":"Clarence Williams III"},{"name":"Mélanie Thierry"},{"name":"Gabriele Lavia"},{"name":"Peter Vaughan"},{"name":"Tanit Phoenix"},{"name":"Robin Shou"},{"name":"Langley Kirkwood"},{"name":"Sean Beanl McDonough"},{"name":"Yoon Hong-Seung"},{"name":"Zdenek Sveraknd Libuse Safrankova"},{"name":"John Luessenhop"},{"name":"Peter BillingsleyDarren McGavin"},{"name":"John Krasinski"},{"name":"David Strathairn"},{"name":"Andrew Cherry"},{"name":"Stanley Tucci"},{"name":"Chi McBride"},{"name":"Châu Huệ Mẫn"},{"name":"Malgorzata Szumowska"},{"name":"Patrick Tam"},{"name":"Ashton KutcherTaryn Manning"},{"name":"Wen JiangDeshun Wang"},{"name":"Haibin Li"},{"name":"Yeerjiang Mahepushen"},{"name":"Kim Yeong-tak"},{"name":"Jessica Lange"},{"name":"Maryam d Abo"},{"name":"Jeroen Krabbé"},{"name":"Shawn Doyle"},{"name":"Jackie ChanThành Long"},{"name":"Sofya Skya"},{"name":"Cole Hauser"},{"name":"Gary Lockwood"},{"name":"William Sylvester"},{"name":"Daniel Richter"},{"name":"Jonathan Bennett"},{"name":"Kristin Cavallari"},{"name":"Kurt Fuller"},{"name":"James Tucker"},{"name":"Charlton Heston"},{"name":"Yul Brynner"},{"name":"Anne Baxter"},{"name":"Manoj Bajpayee"},{"name":"Richa Chadda"},{"name":"Nawazuddin Siddiqui"},{"name":"Burt Reynolds"},{"name":"Armand Assante"},{"name":"Paul Guilfoyle"},{"name":"Jerry Grayson"},{"name":"Robert Stanton"},{"name":"Charlotte Rampling"},{"name":"Charles Dance"},{"name":"Jean Marie Lamour"},{"name":"Mireille Mosse"},{"name":"Vicente Ara"},{"name":"Từ Hy Viên"},{"name":"Lưu Diệp"},{"name":"Trương Thiệu Huy"},{"name":"BreElizabeth Hurley"},{"name":"Frances O.Connor"},{"name":"Miriam Shor"},{"name":"Ben Barnes"},{"name":"Lương Triều Vĩ"},{"name":"Rob Schmidt"},{"name":"Lee Je-yong"},{"name":"Penélope Cruz"},{"name":"Joseph Gordon Levitt"},{"name":"Heath Ledger"},{"name":"Julia Stiles"},{"name":"Châu Mỹ Linh"},{"name":"Ken Watanabe"},{"name":"Tsuyoshi Ihara"},{"name":"Naomie Harris"},{"name":"Nicholas Lea"},{"name":"Ryan Robbins"},{"name":"Gina Holden"},{"name":"Gilles Barret"},{"name":"Margaux Devy"},{"name":"Sylvain Dubois"},{"name":"Petchtai Wongkamlao"},{"name":"Anurag Kashyap"},{"name":"Blake Freeman"},{"name":"Eric Christian Olsen"},{"name":"Nicholas DAgosto"},{"name":"Sarah Roemer"},{"name":"Dustin HoffmaKatharine Ross"},{"name":"Jon Foster"},{"name":"Austin Nichols"},{"name":"Amber Heard"},{"name":"Lou Taylor Pucci"},{"name":"Valerie Azlynn"},{"name":"Alicia Leigh Willis"},{"name":"Yun seok Kim"},{"name":"Seong Ha Cho"},{"name":"Trịnh Y KiệnConroy Chan Chi Chung"},{"name":"Michelle Ye"},{"name":"On on Yu"},{"name":"Wilfred Lau"},{"name":"Judge Reinhold"},{"name":"Harvey Keitel"},{"name":"Barbara Hershey"},{"name":"Steve Shill"},{"name":"Barry Miller"},{"name":"Peter O'Toole"},{"name":"Alec Guinness"},{"name":"Sam Riley"},{"name":"Garrett Hedlund"},{"name":"Kristen Stewart"},{"name":"Patton Oswalt"},{"name":"Hye ja Kim"},{"name":"Bin Won"},{"name":"Tobey Maguire"},{"name":"Kate BeckiLuke Wilson"},{"name":"Frank Whaley"},{"name":"David Voncken"},{"name":"Lee Tamahori"},{"name":"Christian Clavier"},{"name":"Valérie Lemercier"},{"name":"Jonas Hämmerle"},{"name":"Waldemar Kobus"},{"name":"Günther Kaufmann"},{"name":"Charlie HuPatrick Wilson"},{"name":"Terrence Howard"},{"name":"Jessica Alba"},{"name":"Eric Dane"},{"name":"Ravi Teja"},{"name":"Tapsee Pannu"},{"name":"Waldemar Kobusrt"},{"name":"Luke Wilson"},{"name":"Cuba Gooding Jr."},{"name":"John Terry"},{"name":"Jaclyn DeSantis"},{"name":"Lance Reddick"},{"name":"Bill"},{"name":"Irma P. Hall"},{"name":"Katherine Heigl"},{"name":"Gerard Butler"},{"name":"Bree Turner"},{"name":"Sarah Polley"},{"name":"Phoenix Chou"},{"name":"Emma Pei"},{"name":"Jennifer Blanc"},{"name":"Tony Goldwyn"},{"name":"Minnie Driver"},{"name":"Brian Blessed"},{"name":"whoopi goldberg"},{"name":"Maggie smith"},{"name":"Kathy najimy"},{"name":"Christopher Plummer"},{"name":"Lily Cole"},{"name":"Katie Lyons"},{"name":"Richard Shanks"},{"name":"Whitney Houston"},{"name":"Ralph Fiennes"},{"name":"Juliette Binoche"},{"name":"Lei Hao"},{"name":"Terri Kwan"},{"name":"Bi Xiao Hai"},{"name":"François Cluzet"},{"name":"Marie Josée Croze"},{"name":"André Dussollier"},{"name":"Marina Hands"},{"name":"Benicio Del Toro"},{"name":"Connie Nielsen"},{"name":"Leslie Stefanson"},{"name":"John Finn"},{"name":"José Zúñiga"},{"name":"Ron Canada"},{"name":"Khalid Abdalla"},{"name":"Ahmad Khan Mahmoodzada"},{"name":"Atossa Leoni"},{"name":"Bernard Farcy"},{"name":"Bai Ling"},{"name":"Edouard Montoute"},{"name":"Jean Christophe Bouvet"},{"name":"Hye su Kim"},{"name":"Ricky Gervais"},{"name":"Jennifer Garner"},{"name":"Beibi Gong"},{"name":"Siu Fai Cheung"},{"name":"Kai Chi Liu"},{"name":"Topher GraceDan Fogler"},{"name":"Teresa Palmer"},{"name":"Noomi Rapace"},{"name":"Michae"},{"name":"Nyqvist"},{"name":"Lena Endre"},{"name":"Humphrey Bogart"},{"name":"Robert Morley"},{"name":"Richard Gere"},{"name":"Michael Anderson Jr."},{"name":"Edward Norton"},{"name":"Jessica Biel and Paul Giamatti | See full cast"},{"name":"crew"},{"name":"Darsheel Safary"},{"name":"Aamir Khan"},{"name":"Tanay Chheda"},{"name":"Sachet Engineer"},{"name":"Tisca Chopra"},{"name":"Vipin Sharma"},{"name":"Jean Luc Couchard"},{"name":"François Damiens"},{"name":"Mel Gibsonbigail Breslin"},{"name":"Robert De Nirond Brad Pitt"},{"name":"Tom Hanksnd Ross Malinger"},{"name":"Leonardo DiCapriole"},{"name":"Marc Worden"},{"name":"Gwendoline Yeo"},{"name":"Fred Tatasciore"},{"name":"Gemma Arterton"},{"name":"Martin Compston"},{"name":"Eddie Marsan"},{"name":"Adrien Brody"},{"name":"Keira Knightley and Daniel Craig | See full cast"},{"name":"Daniel Craig Miller"},{"name":"Paul Walker"},{"name":"Wayne Brady"},{"name":"Johnny Messner"},{"name":"Ekin Cheng"},{"name":"Kelly Lin"},{"name":"Aleksander Nordaas"},{"name":"Leonard Whiting"},{"name":"John McEnery"},{"name":"Karan Johar"},{"name":"Juno Mak"},{"name":"Mary Elizabeth Mastrantonio"},{"name":"Robert Loggia"},{"name":"Miriam Colon"},{"name":"Kasper Barfoed"},{"name":"Carlos Salda"},{"name":"Prem Chopra"},{"name":"Gauhar Khan"},{"name":"YoYo Mung"},{"name":"Preston Jonesbsera"},{"name":"Huỳnh Thanh Hoàng"},{"name":"Gus Van Sant"},{"name":"Brad Turner,Kevin Hooks"},{"name":"Ryu Seung beom"},{"name":"Lee Yo won"},{"name":"Jo Jin woong"},{"name":"Ho Yim"},{"name":"Cheryl Hines"},{"name":"Rhett Giles Craig"},{"name":"Ritesh Deshmukh"},{"name":"Mohnish Bahl"},{"name":"Jorma Tommila"},{"name":"Peeter Jakobi"},{"name":"Onni Tommila"},{"name":"Baoqiang Wang"},{"name":"Bo Huang"},{"name":"S. Shar"},{"name":"Rene Perez"},{"name":"Hugh JackmaIsla Fisher"},{"name":"Charlie Sheen"},{"name":"Lloyd Bridges"},{"name":"Valeria Golino"},{"name":"Géraldine Nakache"},{"name":"Jimmy Jean Louis"},{"name":"Byeong-gil Jeong"},{"name":"J.J. Johnson"},{"name":"David Alan Basche"},{"name":"Liza Colón Zayas"},{"name":"Max Irons"},{"name":"Cửu Bả Đao,Liệu Minh Nghị,Giang Kim Lâm"},{"name":"Han Hyo Joo"},{"name":"Kim Jae Joong"},{"name":"Donal Gibson"},{"name":"Toru Emori"},{"name":"Katsunosuke Hori"},{"name":"Kim Ha Neul"},{"name":"Kang Dong Won"},{"name":"Christopher Carley"},{"name":"Bee Vang"},{"name":"Yoo-sung Kim"},{"name":"Rose McGowan"},{"name":"Freddy Rodríguez"},{"name":"Josh Brolin"},{"name":"Amitabh BachchaVidya Balan"},{"name":"Kate Hudson"},{"name":"Joy Bryant"},{"name":"Tom HanksDavid Morse"},{"name":"osh Hutcherson"},{"name":"Dax Shepard"},{"name":"Jonah Bobo"},{"name":"Terra Shin"},{"name":"Rosamund Pike"},{"name":"David Oyelowo"},{"name":"Werner Herzog"},{"name":"Aaliyah"},{"name":"Krew Boylan"},{"name":"Lindsay Farris"},{"name":"Rebekah Foord"},{"name":"Damien Freeleagus"},{"name":"Heo Seung-Min"},{"name":"Tom HanksJoanne Woodward"},{"name":"Jason Robards"},{"name":"Mickey Rourke"},{"name":"Margaret Whitton"},{"name":"Từ Thiếu Cường"},{"name":"Lưu Tùng Nhân"},{"name":"Walter Raney"},{"name":"Sofia Vassilieva"},{"name":"Channing TatumRichard Jenkins"},{"name":"Michael Carman"},{"name":"Michael Tiddes"},{"name":"Doutzen Kroes"},{"name":"Derek de Lint"},{"name":"Robert de Hoog"},{"name":"Wes Bentley"},{"name":"Jessica Szohr"},{"name":"Hugh Grantntoon"},{"name":"Kerr Smith"},{"name":"David Brisbin"},{"name":"Dawn Didawick"},{"name":"Kelly McGillis"},{"name":"Talisa Soto"},{"name":"Russell Brand"},{"name":"Kaley Cuoco"},{"name":"Malik Bader"},{"name":"Takahiro Nishijima"},{"name":"Hikari Mitsushima"},{"name":"Sakura Andô"},{"name":"Cary Grant"},{"name":"Eva Marie Saint"},{"name":"James Mason"},{"name":"Michel Muller"},{"name":"Marton Csokas"},{"name":"Sophie Okonedo"},{"name":"Jackie ChaYa lei Kuei"},{"name":"Jaqueline FernandesShweta Kwatra"},{"name":"Prashant Narayanan"},{"name":"Sudhanshu Pandey"},{"name":"Sulagna Panigrahi"},{"name":"Sandeep Sikand"},{"name":"Akshay Kumarmber Elizabeth"},{"name":"Lee Byung Hun"},{"name":"Oh Dal Su"},{"name":"Lee Se Eun"},{"name":"Jeong Seok Yong"},{"name":"Lee Hae Eun"},{"name":"Greg KinJordan Carlos"},{"name":"Imran KhanTara D'Souzaljit Singh"},{"name":"Du Van Lạc"},{"name":"Dương Thiên Hoa"},{"name":"Ted Berman,Richard Rich"},{"name":"Jim Kammerud"},{"name":"Christialvart"},{"name":"Joe Pesci"},{"name":"Selma Blair"},{"name":"Robin ShouCary"},{"name":"Hiroyuki Tagawa"},{"name":"Bridgette Wilson"},{"name":"Christopher Lambert"},{"name":"Trevor Goddard"},{"name":"Chris Casamassa"},{"name":"Julian Sands"},{"name":"Julia Ormond"},{"name":"Colin Farrell"},{"name":"Michelle Rodriguez"},{"name":"Bruce McGill"},{"name":"Steve CarellToni Colletterkin"},{"name":"Shun Oguri"},{"name":"Kyôsuke Yabe"},{"name":"Meisa Kuroki"},{"name":"Michael Davis"},{"name":"Mirai Moriyama"},{"name":"Masami Nagasawa"},{"name":"Kumiko Asô"},{"name":"Laura Harring"},{"name":"Samantha Mathis"},{"name":"Jake GylleHolmes Osborne"},{"name":"Mary McDonnell"},{"name":"Doug Jones"},{"name":"James Cromwell"},{"name":"John Cromwell"},{"name":"Matthew Goode"},{"name":"Adam Scott"},{"name":"Trần Nghiên Hy"},{"name":"Dương Hựu Ninh"},{"name":"Thang Chí Vỹ"},{"name":"Jan de Bont"},{"name":"Gary Busey"},{"name":"Marlon Brando"},{"name":"Maria Schneider and Maria Michi"},{"name":"Danny Glover and Joe Pesci"},{"name":"Tom Hanks Vardalos"},{"name":"Alison Lohman"},{"name":"Ram Charan Teja"},{"name":"Dev Gill"},{"name":"Kimberly Peirce"},{"name":"Tomer Sisley"},{"name":"Antonio Banderas"},{"name":"Gregory Itzin"},{"name":"Mel Blanc"},{"name":"Don Brodie"},{"name":"Dickie Jones"},{"name":"Derek Jacobirthur Malet"},{"name":"Naomi WattsVanessa Chong"},{"name":"Yui Aragaki"},{"name":"Tôma Ikuta"},{"name":"Arata"},{"name":"Nanami Sakuraba"},{"name":"Mitsuki Tanimura"},{"name":"Mika Ninagawa"},{"name":"James McAvoy"},{"name":"Hugh Laurie"},{"name":"Josh Hartnett"},{"name":"A.R. Murugadoss"},{"name":"Vinayak V.V."},{"name":"Kirk De Micco,Chris Sanders"},{"name":"Trine Dyrholm Campbell Hughes"},{"name":"Terrence Malick"},{"name":"Cody Cameron,Kris Pearn"},{"name":"Từ Tranh"},{"name":"Lâm Bằng"},{"name":"Hứa Thiệu"},{"name":"Shikibu Murasaki"},{"name":"Izumi Kawasaki"},{"name":"Yukiko Takayama"},{"name":"Diệp Thanh"},{"name":"Vũ Nghệ"},{"name":"Khám Thanh Tử"},{"name":"Song Hae-seong"},{"name":"Han Eun jeong"},{"name":"Mao Inoue"},{"name":"Jonathan Sherr"},{"name":"Ryôko Kuninaka"},{"name":"Carina Lau"},{"name":"Kiều Nhâm Lương"},{"name":"Lâm Tuyết"},{"name":"Tim Meadows"},{"name":"Gad Elmaleh"},{"name":"Marie Christine Adam"},{"name":"Kim Cattrall"},{"name":"Eric Lively"},{"name":"Erica Durance"},{"name":"Dustin Milligan"},{"name":"Louis de Funès"},{"name":"Michel Galabru"},{"name":"Maurice Risch"},{"name":"Louis Hofmann"},{"name":"Leon Seidel"},{"name":"Heike Makatsch"},{"name":"Jean Lefebvre"},{"name":"Geneviève Grad"},{"name":"Từ Cẩm Giang"},{"name":"Triệu Hữu Lưỡng"},{"name":"Phác Nghệ Trần"},{"name":"Christian Marin"},{"name":"Clovis Cornillac"},{"name":"Benoît Poelvoorde"},{"name":"Melora Walters"},{"name":"Mathieu Chedid"},{"name":"Vanessa Paradis"},{"name":"Joe Anderson"},{"name":"David Grubin"},{"name":"James Ryan"},{"name":"Joseph Melito"},{"name":"Madeleine Stowe"},{"name":"Guy Grosso"},{"name":"Tomoko Yamaguchi"},{"name":"Roberto Benigni"},{"name":"Alain Chabat"},{"name":"Chung Kế Xương"},{"name":"Richard Gerelexander"},{"name":"Jordi Mollà"},{"name":"Chris Carmack"},{"name":"Rachel Miner"},{"name":"Melissa Jones"},{"name":"Dane Cook"},{"name":"Tae gyu Bong"},{"name":"Ryeowon Jung"},{"name":"Mischa Barton"},{"name":"Reece Thompson"},{"name":"Mark Rosman"},{"name":"Lisa Boyle"},{"name":"Đang cập nhậth Wyle"},{"name":"Stana Katic"},{"name":"SirLaosson Dara"},{"name":"h WyleBob Newhart"},{"name":"David A. Armstrong"},{"name":"Carlos Gallardo"},{"name":"Consuelo Gómez"},{"name":"Jaime de Hoyos"},{"name":"Sacha Baron Cohen"},{"name":"Luenell"},{"name":"Chris Tucker"},{"name":"John Lone"},{"name":"Akarin Siwapornpitak"},{"name":"Napakpapha Nakprasitte"},{"name":"Chanida Suriyakompon"},{"name":"Namo Tongkumnerd"},{"name":"Supaksork chaimongkon"},{"name":"Isara ochakul"},{"name":"Arisa wills"},{"name":"Tin settachoke"},{"name":"Krongthong rachatawan"},{"name":"Priscilla Presley"},{"name":"George Kennedy"},{"name":"An Chí Kiệt"},{"name":"Juan Carlos Medina"},{"name":"Maja Milos"},{"name":"O.J. Simpson"},{"name":"Elijah Wood"},{"name":"Yibai Zhang"},{"name":"Kevin Peter Hall"},{"name":"Chizuru Ikewaki"},{"name":"Yoshihiko Hakamada"},{"name":"Ken Leung"},{"name":"Geoffrey Arend"},{"name":"Billy Brown"},{"name":"Richard Burgi"},{"name":"Kelly Carlson"},{"name":"Jolene Blalock"},{"name":"Stephen Hogan"},{"name":"Leon Lai"},{"name":"Matthew Mercer"},{"name":"Eric Bauza"},{"name":"Wilda A. Rokos"},{"name":"Jonathan Freeman"},{"name":"Scott Weinger"},{"name":"Dan Castellaneta"},{"name":"Uma Thurman"},{"name":"Jeffrey Dean Morgan"},{"name":"Justina Machado"},{"name":"Gary Cole"},{"name":"Tamara Tunie"},{"name":"Natascha McElhone"},{"name":"Scott Stewart"},{"name":"Holly Dignard"},{"name":"Chris Thomas King"},{"name":"Jennifer Love Hewitt"},{"name":"Sam Waterston"},{"name":"Haing S. Ngor"},{"name":"John Malkovich"},{"name":"Martin Short"},{"name":"Mira Nair"},{"name":"Sonam Kapoor"},{"name":"Bruna Abdalah"},{"name":"Samir Soni"},{"name":"Aseem Tiwari"},{"name":"Kareena Kapoor"},{"name":"Om Puri"},{"name":"Gregory Peck"},{"name":"John Megna"},{"name":"Frank Overton"},{"name":"Mark Acheson"},{"name":"Michael Adamthwaite and Steve Blum"},{"name":"Koki Uchiyama"},{"name":"Lee So Yeon"},{"name":"Cha Tae Hyun"},{"name":"Lim Chae Mu"},{"name":"Mike Myers"},{"name":"David Cross"},{"name":"Neeraj Pandey"},{"name":"Morgan Lily"},{"name":"Ben Drew"},{"name":"Charlie Creed Miles"},{"name":"David Bradley"},{"name":"Jack"},{"name":"Roberts GaPeggy Holmes"},{"name":"DMX"},{"name":"Luke Kirby"},{"name":"Robin Williamsra Sukapatana"},{"name":"Thái Trác Nghiên"},{"name":"Lý Băng Băng"},{"name":"Reema Kagti"},{"name":"Evan Goldberg"},{"name":"Woo Seung Ho"},{"name":"Joh. Davis"},{"name":"James Mangold"},{"name":"Cameron Richardson"},{"name":"Robert Patrick"},{"name":"Carly Pope"},{"name":"Andrew Robinson"},{"name":"Clare Higgins"},{"name":"Ashley Laurence"},{"name":"Chung Chú Giai,Tiền Quốc Vĩ"},{"name":"Jerzy Stuhr"},{"name":"Renato Scarpa"},{"name":"Giovanni Ribisi"},{"name":"Delroy Lindo"},{"name":"Scott Caan"},{"name":"William Lee Scott"},{"name":"Naoto Takenaka"},{"name":"Jean Marais"},{"name":"Mylène Demongeot"},{"name":"Gigi Leung"},{"name":"Suki Kwan"},{"name":"Lưu Đức Hoà"},{"name":"ung JunHo"},{"name":"Kim MinJung"},{"name":"Yoo DongGeun"},{"name":"Sung DongIl"},{"name":"Yoon DooJoon"},{"name":"KwangHee"},{"name":"Suet Lam"},{"name":"Ruby Wong"},{"name":"Lunmei Kwai"},{"name":"Jillian Murrayshley Parker Angel"},{"name":"John Tormey"},{"name":"Sergey Chirkov"},{"name":"Marina Petrenko"},{"name":"Pavel Priluchnyy"},{"name":"Judi Dench"},{"name":"Jennifer Tilly"},{"name":"Bob Newhart"},{"name":"Eva Gabor"},{"name":"Geraldine Page"},{"name":"Peter Winther"},{"name":"Detlev Buck"},{"name":"John Candy"},{"name":"Tate Donovan"},{"name":"Susan Egan"},{"name":"James Woods"},{"name":"Baotian Li"},{"name":"Wang Xiaoxiao"},{"name":"Sterling Holloway"},{"name":"Edward Brophy"},{"name":"James Baskett"},{"name":"Kiefer Sutherlandmy Smart"},{"name":"Mike Möller"},{"name":"Takuya Kimura"},{"name":"Toshirô Yanagiba"},{"name":"Rene Auberjonois"},{"name":"Daniel J. Gillin"},{"name":"Trương Kiến Á"},{"name":"Henry Thomas"},{"name":"Dario Argento"},{"name":"Ai Kobayashi"},{"name":"Kôichi Yamadera"},{"name":"Yûji Kishi"},{"name":"Jesse Eisenberg"},{"name":"Ryan Reynolds"},{"name":"Gekidan Hitori"},{"name":"Yumi Kakazu"},{"name":"Charlie Yeung"},{"name":"Shahkrit Yamnarm"},{"name":"Ice Cube"},{"name":"Shûichirô Moriyama"},{"name":"Tokiko Katô"},{"name":"Sanshi Katsura"},{"name":"Chu Tấn"},{"name":"Mã Tinh Võ"},{"name":"Hoàng Hiểu Minh"},{"name":"Haruka Ayase"},{"name":"Keisuke Koide"},{"name":"Lâm Chí Linh"},{"name":"Tằng Chí Vĩ"},{"name":"Lưu Canh Hoành"},{"name":"Kha Thúc Nguyên"},{"name":"Emily Blunt"},{"name":"Elizabeth Daily"},{"name":"Lisa Lovbrand"},{"name":"David Kennedy"},{"name":"Michael Apted,Curtis Hanson"},{"name":"Zuleikha Robinson"},{"name":"Joel Coen"},{"name":"Ben Foster"},{"name":"Ed SpeleersJeremy Irons"},{"name":"Paul Chang"},{"name":"Kate BeckiGabriel Macht"},{"name":"Charlie Young"},{"name":"Kim Whee"},{"name":"Aaron Eckhart"},{"name":"Logan Lerman"},{"name":"Lưu Diệp phi"},{"name":"Hoắc Tử Lâm"},{"name":"Tân Lam"},{"name":"Craig Ferguson"},{"name":"John Cleese"},{"name":"Yeong hie Seo"},{"name":"Colin Hanks"},{"name":"Joung Yong-ju"},{"name":"Susan May Pratt"},{"name":"Richard Speight Jr."},{"name":"Niklaus Lange"},{"name":"Pascal Laugier"},{"name":"Kim Ji-hoon"},{"name":"David Schofield"},{"name":"Ruth Gemmell"},{"name":"Yoshikazu Fujiki"},{"name":"Sumi Mutoh"},{"name":"Hiroyuki Kinosha"},{"name":"Rob Corddry"},{"name":"Ellen Barkin"},{"name":"Kajol"},{"name":"Tabu"},{"name":"Shiney Ahuja"},{"name":"Sohrab Ardeshir"},{"name":"Jaspal Bhatti"},{"name":"Lillete Dubey"},{"name":"Lara Dutta"},{"name":"Ali Haji"},{"name":"Vrajesh Hirjee"},{"name":"Sanaya Irani"},{"name":"Gautami Kapoor"},{"name":"Rishi Kapoor"},{"name":"Kiron Kher"},{"name":"Sa Dật"},{"name":"Du Ân Thái"},{"name":"Khương Triều"},{"name":"Vương Lôi"},{"name":"Arbaaz Khan"},{"name":"Jay Chandrasekhar"},{"name":"Patrick Swayze"},{"name":"Vivek Agnihotri"},{"name":"Ruba Nadda"},{"name":"Orson Welles"},{"name":"Joseph Cotten"},{"name":"Dorothy Comingore"},{"name":"Lee Van Cleef"},{"name":"Mara Krupp"},{"name":"Luigi Pistilli"},{"name":"Eiichiro Hasumi"},{"name":"Jim CarreyAmir Ali Said"},{"name":"Brian Price"},{"name":"Nagarjuna Akkinenim"},{"name":"Sarah Wayne Callies"},{"name":"Julian McMahon"},{"name":"Jon voight"},{"name":"Will smith"},{"name":"Gene hackman"},{"name":"Akshay Kumar"},{"name":"Sidhu Deepika Padukone"},{"name":"Sakhi"},{"name":"Suzy Mithun Chakraborty"},{"name":"Dada Gordon Liu"},{"name":"Hojo"},{"name":"Craig Zobel"},{"name":"Preeti Barameeanat"},{"name":"Khanutra Chuchuaysuwan"},{"name":"Kumpanat Oungsoongnern"},{"name":"Tom Shadyac"},{"name":"Elisha Cuthbert"},{"name":"Daniel Radcliffe"},{"name":"Rupert Grint"},{"name":"Audrey HepburnBuddy Ebsen"},{"name":"Shawn Christensen"},{"name":"Colin Firth and Hugh Grant"},{"name":"David Anders"},{"name":"Chris Wylde"},{"name":"Louise Griffiths"},{"name":"Michael York"},{"name":"Derek Luke"},{"name":"Laz Alonso"},{"name":"Gitabak Agohjit"},{"name":"Speedy Arnold"},{"name":"Supakson Chaimongkol"},{"name":"Ewan McGregorBilly Crudup"},{"name":"Arya"},{"name":"Nayanthara"},{"name":"Santhanam"},{"name":"Ranveer Singh"},{"name":"Anushka Sharma"},{"name":"Kanksha"},{"name":"Clive OweLinus Roache"},{"name":"Allu ArjunPrakash RajTanikella BharaniM.S. Narayana"},{"name":"Adrian Moat"},{"name":"Diane Gaeta"},{"name":"Deborah Geffner"},{"name":"VJ Kewl"},{"name":"Chris Marquette"},{"name":"Shido Nakamura"},{"name":"Akashi Takei"},{"name":"Omar Sy and Anne Le Ny"},{"name":"Hema Malini"},{"name":"Sonu Sood"},{"name":"Akshay KumarParesh Rawal"},{"name":"Jackie Shroff"},{"name":"Tanushree Dutta"},{"name":"Shakti Kapoor"},{"name":"Rajpal Yadav"},{"name":"Asrani"},{"name":"Manoj Joshi"},{"name":"Stephanie Page"},{"name":"Farah Baig"},{"name":"Ashwani Chopra"},{"name":"Alexander Hathaway"},{"name":"Zac Efron"},{"name":"Barney Clark"},{"name":"Jeremy Swift"},{"name":"Erika Marozsán"},{"name":"Ramaa Mosley"},{"name":"Kellan Lutz"},{"name":"Ario Bayu"},{"name":"Judd Apatow"},{"name":"Leslye Headland"},{"name":"Michael Hoffman"},{"name":"Tyler Perry"},{"name":"Eugene Levy"},{"name":"Byron Mann"},{"name":"John Doman"},{"name":"Tom Elkins"},{"name":"Jason Sudeikis"},{"name":"Antonica Birchlexander Ilyin"},{"name":"Vương Học Binh"},{"name":"Phạm Hiểu Huyên"},{"name":"Maggie Q"},{"name":"Gabriela Oltean"},{"name":"Ashwani Dhir"},{"name":"Michael Moore"},{"name":"Thora Birch"},{"name":"William Black"},{"name":"Laura Vandervoort"},{"name":"Marsha Thomason"},{"name":"Demi Lovato"},{"name":"Joe Jonas"},{"name":"Barry Levinson"},{"name":"Iko UwaisRay Sahetapy"},{"name":"Michael Fassbender"},{"name":"Tara Ellis"},{"name":"Dwayne JohnsonSophia Robb"},{"name":"Naomi Wattsrmin Mueller Stahl"},{"name":"Jason Biggs"},{"name":"Trương Đào"},{"name":"Ngũ Sĩ Hiền"},{"name":"Trường Chinh"},{"name":"Michael Carney"},{"name":"Ngô Vũ Sâm"},{"name":"Mạch Điền"},{"name":"Fumihiko Sori"},{"name":"Lâm Tử Thông"},{"name":"Xu Jizhou"},{"name":"Uông Dương"},{"name":"Trúc Khanh"},{"name":"Francis Lee"},{"name":"Stephen Chbosky"},{"name":"Yudai Yamaguchi"},{"name":"Victor Salva"},{"name":"Guillermo del Toro"},{"name":"Chu Huỳnh Tâm"},{"name":"Jang Chang-won"},{"name":"Leo Zhang"},{"name":"Simon Curtis"},{"name":"Enrique GatoDavid Alonso"},{"name":"Lee An-Gyu"},{"name":"Matt AngelSuzanne Coote"},{"name":"La Chí Trung"},{"name":"Mar Targarona"},{"name":"Tiết Văn Hoa"},{"name":"Kobun ShizunoHiroyuki Seshita"},{"name":"Lin Oeding"},{"name":"Viên Hòa Bình"},{"name":"Dimitri Logothetis"},{"name":"Hong Sang-Soo"},{"name":"Lee Yong-Seung"},{"name":"Daisy Aitkens"},{"name":"Michael SpierigPeter Spierig"},{"name":"Mo Zhang"},{"name":"Yoshihiro Fukagawa"},{"name":"Vệ Lập Châu"},{"name":"Giảm Gia Vĩ"},{"name":"Cho Young-joon"},{"name":"Dorota KobielaHugh Welchman"},{"name":"Hạ Chi Chi"},{"name":"John Carroll Lynch"},{"name":"Steven DeGennaro"},{"name":"Trình Vĩ Hào"},{"name":"Cửu Cửu"},{"name":"Wei-Hao Cheng"},{"name":"Trần Bình"},{"name":"Quách Ngọc Long"},{"name":"Harold Cronk"},{"name":"Valerie FarisJonathan Dayton"},{"name":"Rian Johnson"},{"name":"Lý Vũ Hòa"},{"name":"Kaige Chen"},{"name":"Clay Staub"},{"name":"Jung-Chi Chang"},{"name":"David E. Talbert"},{"name":"Vương Nguy"},{"name":"Jing WongJason Kwan"},{"name":"Thẩm Dục Kiệt"},{"name":"Jonathan Li"},{"name":"Niels Arden Oplev"},{"name":"Pairach Khumwan"},{"name":"Lâm Vân Tường"},{"name":"Chung Thiếu Hùng"},{"name":"Liam O'Donnell"},{"name":"Scooter Corkle"},{"name":"Tomas AlfredsonMichael FassbenderRebecca FergusonCharlotte Gainsbourg"},{"name":"Lưu Hiên Dịch"},{"name":"Luca Guadagnino"},{"name":"Seiji Kishi"},{"name":"Kentaro Hagiwara"},{"name":"Hany Abu-Assad"},{"name":"Rob W. King"},{"name":"Yûichi Fukuda"},{"name":"Krishna D.K.Raj Nidimoru"},{"name":"Lý Quốc Nguyên"},{"name":"Michael Cuesta"},{"name":"Trâu Hỏa"},{"name":"Mã Tương"},{"name":"Kenji Kamiyama"},{"name":"Sài Sở Nhiên"},{"name":"Ngô Long"},{"name":"Lý Nam"},{"name":"Jayson Thiessen"},{"name":"Nattawut Poonpiriya"},{"name":"Triệu Hằng"},{"name":"Alex Zamm"},{"name":"Mariusz Palej"},{"name":"Adam Ripp"},{"name":"Thôi Tuấn Kiệt"},{"name":"Shûkô Murase"},{"name":"Lưu Kiến Hoa"},{"name":"Brian Smrz"},{"name":"Ryuichi Hiroki"},{"name":"Kwak Kyung-Taek"},{"name":"Greg McLean"},{"name":"Koji Shintoku"},{"name":"Viên Vệ Đông"},{"name":"Phạm Hướng Nam"},{"name":"Sofia Coppola"},{"name":"Cao Dục Tân"},{"name":"Lim Dae-Woong"},{"name":"Hác Chiêu Hách"},{"name":"Caroline LabrècheSteeve Léonard"},{"name":"Jang Hoon"},{"name":"Taiki Waititi"},{"name":"Ji-Yeong Hong"},{"name":"Ryan Schwartz"},{"name":"Dan Bush"},{"name":"Thái Khang Vĩnh"},{"name":"Phùng Tiểu Cương"},{"name":"Zhigang Yang"},{"name":"Fernando Lebrija"},{"name":"Cao Phi"},{"name":"Diệp Vỹ"},{"name":"George Nolfi"},{"name":"Chris Baugh"},{"name":"Carl Lindbergh"},{"name":"Viên Thước"},{"name":"Vương VY"},{"name":"Ben StassenJeremy Degruson"},{"name":"Alexandre BustilloJulien Maury"},{"name":"Iñaki Dorronsoro"},{"name":"Kenta FukasakuKinji Fukasaku"},{"name":"Kim Joo-Hwan"},{"name":"Kim Deok-Soo"},{"name":"Lâm Ái Hoa"},{"name":"Park Chan Wook"},{"name":"Zak Hilditch"},{"name":"Isara Nadeenon"},{"name":"Byun Sung Hyun"},{"name":"Matthew Chookiat Sakveerakul"},{"name":"Sarasawadee Wongsompetch"},{"name":"Chakrit Yamnam"},{"name":"Jieb Cheonyim"},{"name":"Kleur"},{"name":"Kitti Chiaowongsakul"},{"name":"Josh Schwartz"},{"name":"Nicolas Cage Meryl Streep Chris Cooper See full cast and crew"},{"name":"Josh Radnor"},{"name":"Han Sang-Ho"},{"name":"Tạ Na"},{"name":"Trần Gai Hoàn"},{"name":"Vương Tổ Lam"},{"name":"Demi MooreMary Kay Bergman"},{"name":"Justin Theroux"},{"name":"Casey Walker"},{"name":"Chris Klein"},{"name":"Thomas Ian Nicholas"},{"name":"Masahiko Murata"},{"name":"Naoyoshi Shiotani"},{"name":"Brandon Merrill"},{"name":"Roger Yuan"},{"name":"Matt Bettinelli-Olpin,David Bruckner"},{"name":"Megan Griffiths"},{"name":"Jodie Fosterndrews"},{"name":"Kim Dong Bin"},{"name":"Laurent Tirard"},{"name":"Jake Schreier"},{"name":"Will Ferrell Friel"},{"name":"Sacha Gervasi"},{"name":"Helena BoShirley Henderson"},{"name":"Robbie Coltrane"},{"name":"Ciaran Foy"},{"name":"Toshiyuki Tsuru"},{"name":"Joaquin Phoenix Barrett"},{"name":"Hirotsugu Kawasaki"},{"name":"Song Ji hyo"},{"name":"Kim Jae joong"},{"name":"Oh Dal soo"},{"name":"Han Sang jin"},{"name":"Helen Hunt"},{"name":"Erica Linz"},{"name":"Igor Zaripov"},{"name":"Lutz Halbhubner"},{"name":"Téa Leoni"},{"name":"Zhang Tongzu"},{"name":"James Nunn,Ronnie Thompson"},{"name":"Waymon Boone"},{"name":"Kevin Bray"},{"name":"Takayuki Hirao"},{"name":"Dennis QuaidEmmy Rossum"},{"name":"Scott Wiper"},{"name":"Trương Thư Hào"},{"name":"Tạ Hân Dĩnh"},{"name":"Austin Chick"},{"name":"Alex Man"},{"name":"Kwan Hoi Shan"},{"name":"Lo Lieh"},{"name":"Don Coscarelli"},{"name":"John Turturro"},{"name":"Tim Blake Nelson"},{"name":"John McTiernan"},{"name":"Laura Linney"},{"name":"Shohreh Aghdashloo"},{"name":"Jonas Pate"},{"name":"Richard Fleischer,Kinji Fukasaku"},{"name":"Rick Moranis"},{"name":"Anthony Barrile"},{"name":"Michael Boatman"},{"name":"Jennifer Decker"},{"name":"Jada Pinkett Smith"},{"name":"John Dahl"},{"name":"Mark A.Z. Dippé"},{"name":"Bart Layton"},{"name":"Gregory Hoblit"},{"name":"Mel Brooks"},{"name":"Peter MacNicol"},{"name":"Robert Guédiguian"},{"name":"J. Lee Thompson"},{"name":"Gabriele Muccino"},{"name":"Franklin J. Schaffner"},{"name":"Craig Viveiros"},{"name":"John Sturges"},{"name":"Catherine Hickslex Vincent"},{"name":"Marcus Dunstan"},{"name":"Gabriela Tagliavini"},{"name":"Steve Nicolson"},{"name":"Rick Warden"},{"name":"Samuel Hui"},{"name":"Nina Li Chi"},{"name":"Loletta Lee"},{"name":"Hing Suen"},{"name":"Robert Aldrich"},{"name":"Hồng Kim Bảognes Aurelio"},{"name":"Justin Dix"},{"name":"David Lean"},{"name":"BD Wong"},{"name":"Mark Moseley"},{"name":"James Yuen"},{"name":"Benh Zeitlin"},{"name":"GiaLiam Cunningham"},{"name":"Dan Bradley"},{"name":"Matthias Hoene"},{"name":"Leah Gibson"},{"name":"Torrance Coombs"},{"name":"Shannon Chan Kent"},{"name":"RowaWillem Dafoe"},{"name":"Steve Pemberton"},{"name":"Je-kyu Kang"},{"name":"Jeong Ki-Hun"},{"name":"Max Casella"},{"name":"Jean Louis Trintignant"},{"name":"Emmanuelle Riva"},{"name":"Isabelle Huppert"},{"name":"Yumei Anime"},{"name":"Yumei Sub"},{"name":"Sung-Hee Jo"},{"name":"Conor McMahon"},{"name":"Eric Hurt"},{"name":"Óskar Thór Axelsson"},{"name":"Ứng Thái Nhi"},{"name":"Đồng Đại Vi"},{"name":"Trần Gia Lâm"},{"name":"Song Ji Hyo"},{"name":"Jack McBrayer"},{"name":"Jane Lynch"},{"name":"So Ji Sub"},{"name":"Lee Mi Yeon"},{"name":"Kwak Do Won"},{"name":"Lee Kyung Young"},{"name":"Mario Azzopardi"},{"name":"Gaby Hoffmann"},{"name":"Kim Soo Ro"},{"name":"Moon Chae Won"},{"name":"Lee Min Ho"},{"name":"Ekin ChengConroy Chan Chi Chung"},{"name":"Patrick Muldoon"},{"name":"Sarah Kazemy"},{"name":"Nikohl Boosheri"},{"name":"Reza Sixo Safai"},{"name":"Josh Duhamel"},{"name":"Melissa George"},{"name":"Olivia Wilde"},{"name":"Gina Gershon"},{"name":"Chang-min Choo"},{"name":"Andres Muschietti"},{"name":"Xiaoming Huang"},{"name":"Quan Yuan"},{"name":"Li Yuan"},{"name":"Monica Mok"},{"name":"John Hawkes"},{"name":"CJ Adams"},{"name":"A.J. Draven"},{"name":"Finola Hughes"},{"name":"Fedor Borchuk"},{"name":"Daniel Hansenngela Bassett"},{"name":"Randeep Hooda"},{"name":"Sunny Leone"},{"name":"Junayeed Bin Fakhrul"},{"name":"Alexa Vega"},{"name":"Daryl Sabara"},{"name":"Brigitte Nielsen"},{"name":"Reni Santoni"},{"name":"KristaBen Kingsley"},{"name":"BeAaron Eckhart"},{"name":"Vương Tổ Hiền"},{"name":"Vu Vinh Quang"},{"name":"Cao Hùng"},{"name":"Sammi Cheng"},{"name":"Lý Ngọc"},{"name":"Jeremy Piven"},{"name":"Joel McHale"},{"name":"Zack Ward"},{"name":"Michael Paré"},{"name":"Maria Conchita Alonso"},{"name":"Puri Jagath"},{"name":"Salma Hayek"},{"name":"Hee soon Park"},{"name":"Chang Seok Ko"},{"name":"Teddy Robin Kwan"},{"name":"Sibelle Hu and Nina Li Chi"},{"name":"Lí Băng Băng"},{"name":"Trương Hàm Dư"},{"name":"Daniele BolelliKobe BryantGina Carano"},{"name":"Reginald Hudlin"},{"name":"Dan Inosanto"},{"name":"Diana Lee Inosanto"},{"name":"Lauro Chartrand"},{"name":"Sara Paxton"},{"name":"Matthew Davis"},{"name":"Clifton Collins Jr"},{"name":"Elizabeth OlseEric Sheffer Stevens"},{"name":"Julia Taylor Ross"},{"name":"Adam Barnett"},{"name":"Haley Murphy"},{"name":"BreSarah Michelle Gellar"},{"name":"Christoph Waltz"},{"name":"Go Hyun Jung"},{"name":"Sung Dong Il"},{"name":"Krista Allennten"},{"name":"Suraj Sharma"},{"name":"Irrfan Khan và Adil Hussain"},{"name":"Chris Massoglia"},{"name":"Haley Bennett"},{"name":"Trần Khả Tân"},{"name":"Masatoshi Nagase"},{"name":"Yasuko Matsuyuki"},{"name":"Tsuyoshi Abe"},{"name":"Masanobu Andô"},{"name":"Seigi Ozeki"},{"name":"Kanokkorn Jaicheun"},{"name":"Winai Kraibutr"},{"name":"Beffleck"},{"name":"Peter Weller"},{"name":"David Selby"},{"name":"Mayuko Fukuda"},{"name":"Vincent Lindon"},{"name":"Patrick Timsit"},{"name":"Philippe Nahon"},{"name":"Cheng Hui Yu"},{"name":"Yang Song and Yuanyuan Zhao"},{"name":"Chris Pine"},{"name":"Piper Perabo"},{"name":"Nicholas McCarthy"},{"name":"Martin McDonagh"},{"name":"Amy Brenneman"},{"name":"Connor Paolo"},{"name":"Nick Damici and Kelly McGillis"},{"name":"Dwight Yoakam"},{"name":"Ruth Livier"},{"name":"Marina Foïs"},{"name":"Kad Merad"},{"name":"Min Young Park"},{"name":"Dong wook Kim"},{"name":"Ye ron Kim"},{"name":"Michael J. Bassett"},{"name":"Robert Pattinson"},{"name":"Sarah Gadon"},{"name":"Michael Moriarty"},{"name":"Carrie Snodgress"},{"name":"Robin Dunne"},{"name":"Anubhav Si"},{"name":"Chen Shukai"},{"name":"Nimród Al"},{"name":"Jon Heder"},{"name":"Tom Arnold"},{"name":"Rebecca Black"},{"name":"Delphine Chanéac"},{"name":"Pauline Chan"},{"name":"Shu Chun Ni"},{"name":"Hsuan Shao"},{"name":"Chelsea Vincent"},{"name":"Peter Pedrero"},{"name":"Philip Coc"},{"name":"Maïwenn"},{"name":"Antonio Chavarrías"},{"name":"Rhona Mitra"},{"name":"Alexander Siddig"},{"name":"Hope Davis"},{"name":"Gemmenne De la Pena"},{"name":"Nicholas Hoult"},{"name":"Huỳnh Thu Sinh"},{"name":"Zachary Quinto"},{"name":"BeJennifer Garner"},{"name":"Adam Beach"},{"name":"Sergi Vizcaino"},{"name":"Adam Deyoe"},{"name":"Angelica Lee"},{"name":"Sarah Snook"},{"name":"Ryan Corr"},{"name":"Ole Bornedal"},{"name":"Tin Chiu Hung"},{"name":"Dustin MilligaRichard de Klerk"},{"name":"Eric Leightong"},{"name":"Neil Johnson"},{"name":"Shota Matsuda"},{"name":"Mikako Tabe"},{"name":"Mana Ashida"},{"name":"Eiko Koike"},{"name":"Mari Hamada"},{"name":"Kosuke Suzuki"},{"name":"Kazuma Suzuki"},{"name":"Jeneta St. Clair"},{"name":"Lisa Younger"},{"name":"Melissa Johnston"},{"name":"Yari BookWasing Prasertkul"},{"name":"ShawshmoreAshley Bell"},{"name":"Yuchun Li"},{"name":"Ching Tien Juan"},{"name":"Boran Jing"},{"name":"Lee Daniels"},{"name":"Luis Guzmán"},{"name":"Robert Forster"},{"name":"Edward Nortonh Emmerich"},{"name":"Ye won Kang"},{"name":"Yang Kyeong mo"},{"name":"Je hoon Lee"},{"name":"Tara Reid"},{"name":"Kavan Smith"},{"name":"Colby Johannson"},{"name":"Nicole de Boer"},{"name":"Jason London"},{"name":"Bruce Boxleitner"},{"name":"Aya Sugimoto"},{"name":"Guts Ishimatsu"},{"name":"Jun Kaname"},{"name":"Arak AmornsupasiriMario Maurer Sirimongkolsakul"},{"name":"Lim Sang Soo"},{"name":"Mike Phillips"},{"name":"Tobias Falk"},{"name":"Alex Frost"},{"name":"David Morse"},{"name":"Worawej Danuwong"},{"name":"Ryôta Ozawa"},{"name":"Yûki Yamada"},{"name":"Mao Ichimichi"},{"name":"Monica Lo"},{"name":"Etsushi Toyokawa"},{"name":"Kumiko Aso"},{"name":"Hiroshi Abe"},{"name":"Koji Higuchi"},{"name":"Aamir KhaTinnu Anand"},{"name":"Asin"},{"name":"John Cardiel"},{"name":"Vibha Chhibber"},{"name":"Mahendra Gole"},{"name":"Sunil Grover"},{"name":"Julien Boisselier"},{"name":"Karl Urban"},{"name":"Moon Bloodgood"},{"name":"Jennifer Chambers Lynch"},{"name":"Damian Lee"},{"name":"Will Forte"},{"name":"Kristen Wiig"},{"name":"Tôn Hồng Lôi"},{"name":"Vương Lạc Đơn"},{"name":"Vladimir Epifantsev"},{"name":"Sergey Astakhov"},{"name":"Harry Borg"},{"name":"Kôji Yakusho"},{"name":"Shûichi Azumaya"},{"name":"Mitsugorô Bandô"},{"name":"Akira Emoto"},{"name":"Mieko Harada"},{"name":"Masatô Ibu"},{"name":"Shunji Igarashi"},{"name":"Teruyuki Kagawa"},{"name":"Tôru Masuoka See more at: http://i max.vn/forum/#sthash.3Ar4U0jd.dpuf"},{"name":"Andrew Currie"},{"name":"Jessy Terrero"},{"name":"Sngmoo Lee"},{"name":"Seanders"},{"name":"Kang ho Song"},{"name":"Woo sung Jung"},{"name":"Andy Samberg"},{"name":"Kevin James"},{"name":"Molly Shannon"},{"name":"David Spade"},{"name":"CeeLo Green"},{"name":"Jon Lovitz"},{"name":"Brian George"},{"name":"Brian Stack"},{"name":"Jackie Sandler"},{"name":"Amitabh Bachchany Dutt"},{"name":"Vorakan Rojchanawatvit Dhanasevi"},{"name":"Sharlto Copley"},{"name":"Jason Cope"},{"name":"Nathalie Boltt"},{"name":"Sylvaine Strike"},{"name":"Sirin Horwang"},{"name":"Chanokporn Sayoungkul"},{"name":"Kurt Russell"},{"name":"Joe Chien"},{"name":"Nick Vallelo"},{"name":"Mila Kunis"},{"name":"Beau Bridges"},{"name":"Dwayne Johnson"},{"name":"Halle Berrymin Bratt"},{"name":"Kevin Conroy"},{"name":"Tim Daly"},{"name":"Susan Eisenberg"},{"name":"Liễu Đồng Đại Vy"},{"name":"Cam Vi"},{"name":"Tần Hạo"},{"name":"Đỗ Hải"},{"name":"CorbiDavid Nibley"},{"name":"Jasen Wade"},{"name":"Joel Schumacher"},{"name":"Quách Phẩm Siêu"},{"name":"Hoắc Kiến Hoa"},{"name":"Cảnh Điềm"},{"name":"Hác Hảo"},{"name":"Jeff King"},{"name":"Teri Hatcher"},{"name":"JetsadapornPoldeeRhys Ifans"},{"name":"Treat Williamsnthony Heald"},{"name":"Michael Apted"},{"name":"N!xau"},{"name":"Lena Farugia"},{"name":"Hans Strydom"},{"name":"Juan Carlos Hernández"},{"name":"Anastasiya Zavorotnyuk"},{"name":"Vincent Perez"},{"name":"Vladimir Menshov"},{"name":"Louis de Funès and Mylène Demongeot"},{"name":"Billy OganAchita Sikamana"},{"name":"Vijay Adhav"},{"name":"Ching Wan Lau and Mini Yang"},{"name":"William Fichtner"},{"name":"Marius Weyers"},{"name":"Sandra Prinsloo"},{"name":"Andrew Adamson"},{"name":"Paul Rudd"},{"name":"Malin Åkerman"},{"name":"iết Khải Kỳ"},{"name":"Chu Hiểu Hàm"},{"name":"Lara Flynn Boyle"},{"name":"Joe Mantegna and Joe Pantoliano"},{"name":"Amena Gul"},{"name":"Pornsuda Tawarapa"},{"name":"Thema Kanchanapairin"},{"name":"Worachat Thamwiji"},{"name":"Joo Sang wook"},{"name":"Jang Mi Ne"},{"name":"Mai Charoenpura"},{"name":"Anuway Niwartwong"},{"name":"Wiradit Srimalai"},{"name":"Paul Verhoeven"},{"name":"Wolfgang Petersen"},{"name":"Crystal Kwok"},{"name":"Jerry Trimble"},{"name":"Robert Guillaume and Cynthia Gibb"},{"name":"Mario MaurerWisawa Taiyanon"},{"name":"Tiểu Thẩm Dương"},{"name":"Triệu Bản Sơn"},{"name":"Trương Dịch"},{"name":"Trương Hâm Nghệ"},{"name":"Tony Toddh Hathaway"},{"name":"Gilles Lellouche"},{"name":"Tiền Gia Lạc"},{"name":"Wing Cho and Paul Chun"},{"name":"Carey Lowell"},{"name":"Peter Stebbings"},{"name":"Espen Sandberg"},{"name":"Lý Nhược đồng"},{"name":"Trần Tiểu Bình"},{"name":"Kaneshiro Takeshi"},{"name":"Lennie James"},{"name":"Mia Sara"},{"name":"Ron Silver"},{"name":"Lương Nhạc Dân"},{"name":"Donald Gibb"},{"name":"Eion Bailey"},{"name":"Clifton Collins Jr."},{"name":"Will Kemp"},{"name":"Jonny Lee Miller"},{"name":"Kathryn Morris"},{"name":"Doona Bae"},{"name":"Joon ho Bong"},{"name":"Ji hee Jin"},{"name":"Jean Claude Van DammeKieran Culkin"},{"name":"Natasha Henstridge"},{"name":"Catherine Dent"},{"name":"Robin Tunney"},{"name":"Trần Bách Tường"},{"name":"Lâm Hy Lôi"},{"name":"Vạn Tử Lương"},{"name":"Đặng Nhất Quân"},{"name":"Tiễn Vĩnh Cường"},{"name":"Trần Tiểu Xuân"},{"name":"Tiển Gia Lạc"},{"name":"Lý Thái Hoa"},{"name":"Cát Dân Huy"},{"name":"Pa Rittikrai"},{"name":"Salman KhanVinod Kha"},{"name":"Grant Bowler"},{"name":"Theresa Russell"},{"name":"Steve Carell"},{"name":"Mark DiSalle,David Worth"},{"name":"Dennis Rodman"},{"name":"Lawrence Taylor"},{"name":"Marnie Alton"},{"name":"Catherine O'Hara"},{"name":"Rhys Ifans"},{"name":"Mark Tonderai"},{"name":"Mic Rodgers"},{"name":"Philip Tan"},{"name":"Jo Min Soo"},{"name":"Lee Jeong Jin"},{"name":"Woo Gi Hong"},{"name":"Jason Moore"},{"name":"T. Altanshagaib"},{"name":"David Palmer,Dax Shepard"},{"name":"Yong-Joo Lee"},{"name":"Mark L. Lester"},{"name":"Robert Lorenz"},{"name":"Toshiyuki Kubooka,Michael Sinterniklaas"},{"name":"Olivia Thirlby"},{"name":"David Jacobson"},{"name":"S.S. Rajamouli,J.V.V. Sathyanarayana"},{"name":"Dương Nhã Triết"},{"name":"Barry Battles"},{"name":"David Koepp"},{"name":"Homi Adaja"},{"name":"David Morrissey"},{"name":"Alex Etel"},{"name":"Amy Heckerling"},{"name":"James Fargo"},{"name":"Ông Tịnh Đình"},{"name":"Olivia Munn"},{"name":"Anurag Basu"},{"name":"Kyu-Dong Min"},{"name":"Gene Hackman"},{"name":"Matt Craven"},{"name":"David Bowers"},{"name":"Doraemon"},{"name":"Nobita"},{"name":"Paul Thomas Arnold"},{"name":"Oto Brezina"},{"name":"Kip Canyon"},{"name":"Stefan Ruzowitzky"},{"name":"Melissa Leo"},{"name":"Konosuke Uda"},{"name":"Paul Emami"},{"name":"Kim Sang man"},{"name":"Jon Chu"},{"name":"Joe Johnston"},{"name":"Mackenzie Firgens"},{"name":"Elizabeth Henstridge"},{"name":"Cory Knauf"},{"name":"Jose Prendes"},{"name":"Sasha Roiz"},{"name":"Jenny Mollen"},{"name":"Dominic Bogart"},{"name":"Kodi Smit McPheeChristopher"},{"name":"Fernando Meirelles"},{"name":"Jerry Lawler"},{"name":"Beetlejuice"},{"name":"Ron Jeremy"},{"name":"Katie Peterson"},{"name":"Megan Peterson,John Douglas Sinclair"},{"name":"Tom Hardy"},{"name":"Tô Hữu Bằng"},{"name":"Hiroshi Tamaki"},{"name":"Kim Dong-Won"},{"name":"Lara Daans and Christian Slater"},{"name":"John Hyams"},{"name":"David Barrett"},{"name":"Marina de Van"},{"name":"Luis Prieto"},{"name":"Suri Krishnamma"},{"name":"Jun Ji Hyun"},{"name":"Kim Hye Soo"},{"name":"Lee Jung Jae"},{"name":"Kim Yoon Seok"},{"name":"Brittany Murphy"},{"name":"Tammy Blanchard"},{"name":"Melvil Poupaud"},{"name":"Sylvie Testud"},{"name":"Alexandra Lamy"},{"name":"Kim Joo-Ho"},{"name":"Todd Lincoln"},{"name":"Pat Holden"},{"name":"Phùng Thiệu Phong"},{"name":"Hoắc Tư Yến"},{"name":"Trần Xung"},{"name":"Khổng Quế"},{"name":"Khiêu An Liêm"},{"name":"Lương Tĩnh"},{"name":"Denis Lavant"},{"name":"Edith Scob"},{"name":"Eva Mendes"},{"name":"Shinichi"},{"name":"Yuki"},{"name":"Hideo"},{"name":"John Sham"},{"name":"Tracey Gold"},{"name":"Edward Furlong"},{"name":"Bug Hall"},{"name":"Ahn Sung Ki"},{"name":"Park Won Sang"},{"name":"Na Young Hee"},{"name":"Kristine DeBell and José Ferrer"},{"name":"Kim Dong wan"},{"name":"Moon Jeong hee"},{"name":"Lee Honey"},{"name":"BeRufus Sewell"},{"name":"Dominic Cooper"},{"name":"Bradley Parker"},{"name":"Devrim Evin"},{"name":"Ibrahim Celikkol"},{"name":"Dilek Serbest"},{"name":"Blacky Ko"},{"name":"Trịnh Du Linh"},{"name":"Eva Cobo deGarcia"},{"name":"Ikeda Shoko"},{"name":"Aldo Sanchez"},{"name":"Ken Lo Wai Kwong"},{"name":"Dominic MonaghaJordan Belfi"},{"name":"Rick Gomez"},{"name":"Chris Rock"},{"name":"Keoni Waxman"},{"name":"Kim Young Joon"},{"name":"Hayato Isohata"},{"name":"Masako Araki"},{"name":"Naomi Uno"},{"name":"Shô Sakurai"},{"name":"Sadao Abe"},{"name":"Kyôko Fukada"},{"name":"Dakota Fanning"},{"name":"Michael Shannon"},{"name":"Rupert Friend and Kathy Bates"},{"name":"Cameron Diaznd J. Todd Smith"},{"name":"Yôji Matsuda"},{"name":"Yûko Tanaka"},{"name":"Mark Davidmh Cusack"},{"name":"Olga Kurylenko"},{"name":"Liana Liberato"},{"name":"Thành LongRosamund Kwan"},{"name":"Lola Forner"},{"name":"Ken Boyle"},{"name":"Thành LongPhilip Chan"},{"name":"Alfred Cheung"},{"name":"Chieko Baishô"},{"name":"Tatsuya Gashûin"},{"name":"Kelly Sheridan"},{"name":"Lee Tockar"},{"name":"Kathleen Barr"},{"name":"Kelly SheridaCree Summer"},{"name":"Melissa Lyons"},{"name":"Chiara Zanni"},{"name":"Aom Sucharat Manaying"},{"name":"Tina Supanart Jittaleela"},{"name":"Arisara Tongborisuth"},{"name":"Soranut Yupanun"},{"name":"Minami Takayama"},{"name":"Rei Sakuma"},{"name":"Tiết Khải Kỳ"},{"name":"Wang Ziyi"},{"name":"Charmaine Fong"},{"name":"Sire Ma"},{"name":"Kelly Sheridan Lindbjerg"},{"name":"Youko HoKazuo Takahashi"},{"name":"Takashi Tachibana"},{"name":"Alessandro Juliani"},{"name":"AnaNatthaweeranuch Thongmee"},{"name":"Achita Sikamana"},{"name":"Sumi Shimamoto"},{"name":"Mahito Tsujimura"},{"name":"Hisako Kyôda"},{"name":"Kate Capshaw"},{"name":"Jonathan Ke Quan"},{"name":"Pupoom Pongpanul"},{"name":"Florian Lukas"},{"name":"David Kross"},{"name":"Stig Henrik Hoff"},{"name":"Lachlan Nieboer"},{"name":"Morten Faldaas"},{"name":"Kim Haugen"},{"name":"Muhammet Uzuner"},{"name":"Yilmaz Erdogan"},{"name":"Taner Birsel"},{"name":"Ahmet Mümtaz Taylan"},{"name":"Dung Tổ Nhi"},{"name":"Alison Doody"},{"name":"Liam Boylend Florence Hall"},{"name":"Wanchana SawatdeeChatchai PlengpanichSarunyu Wongkrachang"},{"name":"Bin"},{"name":"Ho kyung Go"},{"name":"Sin jeong Hwang"},{"name":"Kelly SheridanMelissa Lyons"},{"name":"London Symphony Orchestra"},{"name":"Cod Helten"},{"name":"Yasuo Yamada"},{"name":"Eiko Masuyama"},{"name":"Kiyoshi Kobayashi"},{"name":"Ô Nhĩ Thiện"},{"name":"Tabitha St. Germain"},{"name":"Catalina Sandino Moreno"},{"name":"Tony Giglio"},{"name":"Tạ Đình Đình"},{"name":"Đường Nhất Phi"},{"name":"Cesar MoPhillip Salvador"},{"name":"Sam Pinto"},{"name":"Ryô Ishibashi"},{"name":"Akaji Maro"},{"name":"Joe Flanigan"},{"name":"Kim Dae Seung"},{"name":"Na yeong Lee"},{"name":"Jang In ho"},{"name":"Perry Bha"},{"name":"Ben Lambert"},{"name":"Ewan Bailey"},{"name":"Claudia Bassols"},{"name":"Roark Critchlow"},{"name":"Neil Jackson"},{"name":"Iliana Lazarova"},{"name":"Dimitar Ougrinov"},{"name":"Andrew Lee Potts"},{"name":"Heida Reed"},{"name":"George Zlatarev"},{"name":"Jaycee Chan Yu Xia Deng Jiajia Jessica C. Dimartino Chen Han tien"},{"name":"Hayden Christensen"},{"name":"Lena Olin"},{"name":"Christopher McDonald"},{"name":"John TravoltaRichard Durden"},{"name":"Miu Miu"},{"name":"Tan Zhuo"},{"name":"Feng Danying"},{"name":"Zeng Xiangcheng"},{"name":"Yang Jincheng"},{"name":"Liu Enyou"},{"name":"Wang Junhe"},{"name":"Steve Austidam Beach"},{"name":"Kevin CostnerMark Charles Davis"},{"name":"Yoshikuni Dôchin"},{"name":"Mitsuru Fukikoshi"},{"name":"Mutsutoshi Furuhata"},{"name":"Masaya Kikawada"},{"name":"Matthew Morrison"},{"name":"J. Todd Smith"},{"name":"Tat kwong Chan"},{"name":"Pinky Cheung"},{"name":"Tae-kyeong Kim"},{"name":"Ninette Tayeb"},{"name":"Henry David"},{"name":"Seon gyun Lee"},{"name":"Min hie Kim"},{"name":"Seong ha Jo"},{"name":"Kathryn McCormick"},{"name":"Cleopatra Coleman"},{"name":"Mary Ure"},{"name":"Patrick Wymark"},{"name":"Max Giwa Pasquini"},{"name":"Ji Hwan Kang and Yu ri Sung"},{"name":"Antonio Banderas. Melanie Griffith"},{"name":"Shauna Pinkett"},{"name":"Ciaran Byrne"},{"name":"Thomas Kretschmann"},{"name":"Kristen Connolly Hutchison"},{"name":"Jeff Bridges Felix"},{"name":"Theeratorn Siriphuraporn"},{"name":"Emily Blunt and Amr Waked"},{"name":"Olivia Williams"},{"name":"Alfred Molina"},{"name":"Cara Seymour"},{"name":"William Melling"},{"name":"Jason Connery"},{"name":"George ClooneyJason Batemamy Morton"},{"name":"Scott Hicks"},{"name":"Hae il Park"},{"name":"Mu Yeol Kim"},{"name":"Kim Go Eun"},{"name":"Man shik Jeong"},{"name":"Park Cheol Hyeon"},{"name":"Jang Yun sil"},{"name":"Michael Spierig,Peter Spierig"},{"name":"Carlos Sanz"},{"name":"Nick Stahl and Taryn Manning"},{"name":"Dominique Horwitz"},{"name":"Sebastian Rudolph"},{"name":"Morris Chestnut"},{"name":"Matt Battaglia"},{"name":"Michel beaudry"},{"name":"Patrice bélanger"},{"name":"Pierre boudreau"},{"name":"Sarain boylan"},{"name":"Manon brunelle"},{"name":"Nicolas"},{"name":"Cuba Gooding Jr"},{"name":"Billy Murray"},{"name":"Catherine Zeta jones"},{"name":"Matthew Letscher"},{"name":"Roger Donaldson"},{"name":"Audrey Dana"},{"name":"Dominique Pinon"},{"name":"Raphaël"},{"name":"Sacha Baron CoheBen Kingsley"},{"name":"Tomohisa Yamashita"},{"name":"Karina"},{"name":"Nhậm Ðạt Hoa"},{"name":"Mu Chu and Ching Tien"},{"name":"Vahina Giocante"},{"name":"Miley Cyrus"},{"name":"Douglas Booth"},{"name":"Ashley Greene"},{"name":"Woo-ping Yuen"},{"name":"Lambert Wilson"},{"name":"Raphaëlle Agogué"},{"name":"Ta Wexler"},{"name":"Klaokaew Sintepdol"},{"name":"Masha Wattanapanich"},{"name":"Peter Knight"},{"name":"Jon Bon Jovi"},{"name":"Chris Ludacris Bridges"},{"name":"Seth Meyers"},{"name":"Lea Michele"},{"name":"Michelle"},{"name":"Chon WachananonChidjan Rujiphun"},{"name":"AMartin Rapold and Regula Grauwiller"},{"name":"Chris Fisher"},{"name":"Will SassoRip Torn"},{"name":"Fernando Alves Pinto"},{"name":"Caco Ciocler"},{"name":"Marat Descartes"},{"name":"Bill HaderJames Caan"},{"name":"JeBrianne Davis"},{"name":"Chase Ryan Jeffery"},{"name":"Mohamed Fellag"},{"name":"Sophie Nélisse"},{"name":"Émilien Néron"},{"name":"Marie Ève Beauregard"},{"name":"Antonio de la Torre"},{"name":"Joaquín Núñez"},{"name":"Don Cheadlebi"},{"name":"Zana Marjanovic"},{"name":"Goran Kostic and Rade Serbedzija"},{"name":"Mã Sở Thành"},{"name":"Philip Barantinidrian Bower"},{"name":"Hà Nhuận Đông"},{"name":"Tống Giai"},{"name":"Hà Thạnh Minh"},{"name":"Quách Minh Tường"},{"name":"Trần Ti Hàn"},{"name":"Si hyeon Park"},{"name":"Sang wook Joo"},{"name":"Jeong tae Kim"},{"name":"Han wi Lee"},{"name":"Kwang Soo Lee"},{"name":"Maxim Korostyshevsky"},{"name":"Dominique Swain"},{"name":"Jake Busey"},{"name":"Josh Allen"},{"name":"Lưu Hoa"},{"name":"Đào Hồng"},{"name":"Tôn Thuần"},{"name":"Phạm Vỹ Kỳ"},{"name":"Triệu Hựu Đình"},{"name":"Sui-man Chim,Kung-Lok Lee"},{"name":"Paul Dano"},{"name":"Julianne Moore Paul Dano"},{"name":"Lưu Đức Hoa trong"},{"name":"Boman Irani"},{"name":"Marta Etura"},{"name":"Sarah ButlerDaniel Franzese"},{"name":"Jang Jin"},{"name":"Tôn Lệ"},{"name":"Trịnh Sảng"},{"name":"Lam Doanh Doanh"},{"name":"Leticia Dolera"},{"name":"Đoàn Dịch Hồng"},{"name":"Steve Martino,Mike Thurmeier"},{"name":"Jon Voight"},{"name":"Eric Stoltz"},{"name":"Lâm Y Thần"},{"name":"Lý Nghi Phong"},{"name":"Lục Minh Quân"},{"name":"Eoin MackeTereza Srbova"},{"name":"Anthony Jabre"},{"name":"Cole Carson"},{"name":"Lauren Bair"},{"name":"Michael J. Prosser"},{"name":"Sean McGrath"},{"name":"John CusackKevin McNally"},{"name":"Oliver Jackson Cohen"},{"name":"Jimmy Yuill"},{"name":"Taylor Swift và Danny DeVito"},{"name":"You Da In"},{"name":"Yoo Yeon Seok"},{"name":"Rachel Weiszm"},{"name":"Pat Healy"},{"name":"Brandon Nutt"},{"name":"Mathieu Kassovitz"},{"name":"Iabe Lapacas"},{"name":"Malik Zidi"},{"name":"David A.R. White Zielinski and Randy Travis"},{"name":"Susa White"},{"name":"David Lister"},{"name":"Corey Sevier"},{"name":"Eve Mauro"},{"name":"Konstantin Lavronenko"},{"name":"Alessandra Torresani"},{"name":"Toby Hemingway"},{"name":"Jack Taylor"},{"name":"Emma Lung"},{"name":"Jirí Vejdelek"},{"name":"Topher Grace"},{"name":"Alice Braga"},{"name":"Sam Neillnd Louis Corbett"},{"name":"Huub Smit"},{"name":"Tim Haars"},{"name":"Wesley van Gaalen"},{"name":"Steffen Haars"},{"name":"Flip Van der Kuil"},{"name":"Peter Aerts"},{"name":"Lars Boekhorst"},{"name":"Filip Bolluyt"},{"name":"Jasper de Groot"},{"name":"Bart de Rijk"},{"name":"Maureen Eerdmans"},{"name":"Paul Elstak"},{"name":"Peter Faber"},{"name":"Robert Paul Jansen"},{"name":"Corry Konings"},{"name":"Matt Smith"},{"name":"Lesley Manville"},{"name":"Hadi Hajaig"},{"name":"Đỗ Kỳ Phong,Vi Gia Huy"},{"name":"Catherine Steadman"},{"name":"Richard Coyle and Ali Craig | See full cast and crew"},{"name":"Joel Murray"},{"name":"Tara Lynne Barr"},{"name":"Mackenzie Brooke Smith"},{"name":"FernaSimon Quarterman"},{"name":"Evan Helmuth"},{"name":"Ionut Grama"},{"name":"Suzan Crowley"},{"name":"Bonnie Morgan"},{"name":"Brian Johnson"},{"name":"Preston James Hillier"},{"name":"D.T. Carney"},{"name":"Erika Toda"},{"name":"Megumi Seki"},{"name":"Michiko Yoshise"},{"name":"YosiYosi Arakawa"},{"name":"Seiichi Tanabe"},{"name":"Diệp Đức Nhàn"},{"name":"Dominic West"},{"name":"Toby Regbo"},{"name":"Rupert Penry Jones"},{"name":"Greg KinPierce Brosnand Marisa Tomei"},{"name":"Juan Diego Botto"},{"name":"Carmelo Gómez"},{"name":"Sergi Calleja"},{"name":"Cliff Curtis"},{"name":"Xavier Samuel"},{"name":"Jessica McNamee"},{"name":"Robin McLeavy"},{"name":"Victoria Thaine"},{"name":"Pierfrancesco Favino"},{"name":"Filippo Nigro"},{"name":"Marco Giallini"},{"name":"Matthew Broderick"},{"name":"Maria Pitillo"},{"name":"Dana Ashbrook"},{"name":"Derek Mears"},{"name":"Maggie Grace"},{"name":"Michael Madsen"},{"name":"Rachel Hunter"},{"name":"Shandi Finnessey"},{"name":"Katie StegemanNick Principe"},{"name":"Zahiril Adzim"},{"name":"Faizal Hussein"},{"name":"Wan Hanafisu"},{"name":"Mitsuru Fukikoshisuka Kurosawa"},{"name":"Alyson Hannigan"},{"name":"Anthony DiBlasi"},{"name":"Isabelle Fuhrman"},{"name":"Melanie Griffith"},{"name":"Yuri Lowenthal"},{"name":"Drew Barrymoreyak"},{"name":"Amy Poehler And Will Arnett"},{"name":"Lauren German"},{"name":"Heather Matarazzo"},{"name":"Bijou Phillips"},{"name":"Tiếu Ngạo Giang Hồ"},{"name":"50 Cent"},{"name":"James SpaderJeremy Davies"},{"name":"Moon So Ri"},{"name":"Yoo Seung Ho"},{"name":"Choi Min Sik"},{"name":"Park Cheol Min"},{"name":"Jay Hernandez"},{"name":"Derek Richardson"},{"name":"Barbora Nedeljakova"},{"name":"Jan Vlasak"},{"name":"Jennifer Lim"},{"name":"Hoàng Lập Hành"},{"name":"Lương Vĩnh Kỳ"},{"name":"Julianne MooreLiam Neeson"},{"name":"Nathalie Kelley"},{"name":"Nick Eversman"},{"name":"Klaus Stiglmeier"},{"name":"Kwon Sang Woo (Quyền Tương Vũ)"},{"name":"Trương Thiều Hàm"},{"name":"Điềm Nữu"},{"name":"Đinh Xuân Thành"},{"name":"Tinh Bách Nhiên"},{"name":"Katie Featherston"},{"name":"Gabriel Johnson"},{"name":"Edward Irina Björklund"},{"name":"Johan Leysen"},{"name":"Dzhanik Fayziev"},{"name":"Văn Chương"},{"name":"Trương Gia Dịch"},{"name":"Trương Tử Huyên"},{"name":"Vương Diệu Khánh"},{"name":"Quách Kinh Phi"},{"name":"Ken Foree"},{"name":"Kristina Klebe and Emilio Roso"},{"name":"Sam Worthington"},{"name":"Shauna Macdonald"},{"name":"Natalie Mendoza"},{"name":"Alex Reid"},{"name":"Elena Anaya and Jan Cornet"},{"name":"Thunder Levin"},{"name":"Geoffrey Canada"},{"name":"George Reeves"},{"name":"Michelle Rhee"},{"name":"Bill Strickland"},{"name":"Paulie Rojas"},{"name":"Eliza Swenson"},{"name":"Billy Boyd"},{"name":"Jeffrey Combs"},{"name":"Hrithik RoshanRishi Kapoor"},{"name":"Sandra BullockJae Head"},{"name":"Marcos Efron"},{"name":"Thành Longn Bính Yến"},{"name":"Stephen Milburnderson"},{"name":"Rooney Mara"},{"name":"Bryan Barter"},{"name":"Dustin Fitzsimons"},{"name":"Alessandra Negrini"},{"name":"Fairuza Balk"},{"name":"Carey MulligaKeira Knightley"},{"name":"Izzy Meikle Small"},{"name":"Phùng Tổ Danh"},{"name":"Ngô Bội Từ"},{"name":"Hạc Cương"},{"name":"Trương Bá Tri"},{"name":"Lucas"},{"name":"Rebel Wilson"},{"name":"Olivia Newton John"},{"name":"Julia Dietze"},{"name":"Peta Sergeant"},{"name":"Udo Kier"},{"name":"Ava Gaudet and Kristopher Shepard"},{"name":"Armie Hammer"},{"name":"Kathrine Windfeld"},{"name":"Carlee Baker"},{"name":"Shana Barry and Marcia Bennett"},{"name":"Luis Tosarntonio Resines"},{"name":"Matthew Wolf"},{"name":"Antonie Kamerling"},{"name":"Reinout Oerlemans"},{"name":"Theo Maassen"},{"name":"Aleksandr Abdulov"},{"name":"Vladimir Ilyin"},{"name":"Mikhail Efremov"},{"name":"Mikhail Trukhin"},{"name":"Danielle Panabaker"},{"name":"Ving Rhames and David Hasselhoff"},{"name":"Pierre Salvadori"},{"name":"Yelena Lyadova"},{"name":"Nadezhda Markina"},{"name":"Aleksey Rozin"},{"name":"Mimi Zhu"},{"name":"Chao Wen"},{"name":"Philip Ng"},{"name":"Wan Chiu"},{"name":"Woo Yin"},{"name":"Harriet Yeung"},{"name":"Man Wai Wong"},{"name":"Rainn Wilson"},{"name":"Liv Tyler"},{"name":"Thomas Mann"},{"name":"Oliver Cooper"},{"name":"Bành Vu Án"},{"name":"Nguyễn Kinh Thiên"},{"name":"Trần Ý Hàm"},{"name":"Triệu Vy"},{"name":"Triệu Hữu Đình"},{"name":"Nữu Thừa Trạch"},{"name":"Quách Thái Khiết."},{"name":"Masaki Okada"},{"name":"Natsuki Harada"},{"name":"Heather Ann Davis"},{"name":"Eric Callero"},{"name":"Yiwei Liu"},{"name":"Wing Lun Ng"},{"name":"Austin Wai"},{"name":"You Nam Wong"},{"name":"Derek MearsTravis Van Winkle"},{"name":"Aaron Yoo"},{"name":"Tommy Lee JonesVincent D'Onofrio"},{"name":"Rip Torn"},{"name":"Siobhan Fallon"},{"name":"Mike Nussbaum"},{"name":"Jon Gries"},{"name":"Sergio Calderón"},{"name":"Carel Struycken"},{"name":"Vidya Balan"},{"name":"Parambrata Chatterjee"},{"name":"Dhritiman Chatterjee"},{"name":"Bonnie Hunt"},{"name":"Ruby Lin"},{"name":"Kara Hui and Monica Mok"},{"name":"Yoo Ho Jeong"},{"name":"Sim Eun Kyeong"},{"name":"Kang So Ra"},{"name":"Lee Min Jung"},{"name":"Lee Jung Jin"},{"name":"Park Hae Il"},{"name":"Kim Yoon Jin"},{"name":"Yoo Ah In"},{"name":"Kim Yoon Suk"},{"name":"Jang Dong Gun"},{"name":"Joe Odagiri"},{"name":"Kim In Kwon"},{"name":"Kerry Con"},{"name":"Han Eun Jung"},{"name":"Hyo Min"},{"name":"No Min Woo"},{"name":"Park Seong Min"},{"name":"Hwang Ji Hyun"},{"name":"Lee Hyung Suk"},{"name":"TaeMin"},{"name":"Sunny"},{"name":"Вера Алентова; Алексей Баталов; Ирина Муравьёва; Раиса Рязанова"},{"name":"Kwon Sang Woo"},{"name":"Jeong Ryeo Won"},{"name":"Jessica Chastain"},{"name":"Kim Ju Hyeok"},{"name":"Lee Yoon Ji"},{"name":"Lee Si Young"},{"name":"Kong Hyung Jin"},{"name":"Oh Jung Se"},{"name":"Bryant ChangYang Li Si"},{"name":"Park Heon Soo"},{"name":"Lee Sun Gyun"},{"name":"Choi Kang Hee"},{"name":"Oh Jeong Se"},{"name":"Ryoo Hyeon Kyeong"},{"name":"Song Yoo Ha"},{"name":"Baek Do Bin"},{"name":"Vivien Leigh"},{"name":"Kim Hunter"},{"name":"Karl Malden"},{"name":"Rudy Bond"},{"name":"ick Dennis"},{"name":"Peg Hillias"},{"name":"Wright King"},{"name":"Hyun Bin"},{"name":"Thang Duy"},{"name":"Kim Joon Seong"},{"name":"Kim Seo Ra"},{"name":"Park Min Hyeon"},{"name":"Mahesh Babu"},{"name":"Samantha Ruth Prabhu"},{"name":"Christopher Lap-Key Sun"},{"name":"Park Ye Jin"},{"name":"Jay Park"},{"name":"Mika Hijii"},{"name":"Todd Jensen"},{"name":"Togo Igawa"},{"name":"Garrick Hagon"},{"name":"Miles Anderson"},{"name":"Valentin Ganev"},{"name":"Atanas Srebrev"},{"name":"Scott Mechlowicz"},{"name":"Jacob Pitts"},{"name":"Han Suk Kyu"},{"name":"Ko Soo"},{"name":"Song Joong Ki"},{"name":"Han Ye Seul"},{"name":"Channing Tatum và Ice Cube"},{"name":"Martina García"},{"name":"Quim Gutiérrez"},{"name":"Clara Lago"},{"name":"AmaJennifer Carpenter"},{"name":"Meghan Ory"},{"name":"Warren Christie"},{"name":"Damon Santostefano"},{"name":"Lee Min Ki"},{"name":"Reese Witherspoon"},{"name":"Darreronofsky"},{"name":"Patrick Alessandrin"},{"name":"Katie Holmes"},{"name":"Liam"},{"name":"neeson"},{"name":"Elizabeth Berrington"},{"name":"Rudy Blomme"},{"name":"Olivier Bonjour"},{"name":"Mark Donovan"},{"name":"Eamonn Walker"},{"name":"Gerald McRaney"},{"name":"Rosemary Harris"},{"name":"Han-sol Shin"},{"name":"Adam SandlerDavid Hasselhoff"},{"name":"Jonathan Espolin"},{"name":"Bjørn Floberg"},{"name":"George Mendel"},{"name":"Samuel Axel Dan Badarau"},{"name":"Dimitri Darren Shahlavi"},{"name":"Stephen Graham"},{"name":"Terry Stone"},{"name":"Megan Fox"},{"name":"Johnny DeppDavid KellyJames Fox"},{"name":"Bridget Moynahan"},{"name":"Kenneth Mitchell"},{"name":"Miu Nakamura"},{"name":"Maiko Kawakami"},{"name":"Moe Arai"},{"name":"Ezra Miller"},{"name":"Nozomu Kasagi"},{"name":"CorbiAlexander Polinsky"},{"name":"Kirby Heyborne"},{"name":"Dane DeHaaMichael B. Jordan"},{"name":"Jaimie Alexander"},{"name":"John Cusackma Peet"},{"name":"Michael Haigney"},{"name":"Ted Lewis"},{"name":"Veronica Taylor"},{"name":"Ikue Otani"},{"name":"Sylvester StalloneMarc de Jonge"},{"name":"Jimmy Lin"},{"name":"Chie Tanaka"},{"name":"Peter Mullannd Eddie Marsan"},{"name":"Te-Sheng Wei"},{"name":"Izán Corchero"},{"name":"Samuel L.Jackson"},{"name":"Liz GilbertI. Gusti Ayu Puspawati"},{"name":"NyomoHadi Subiyanto"},{"name":"Ketut LiyerBilly Crudup"},{"name":"StephenViola Davis"},{"name":"George Gallo"},{"name":"Jomiel"},{"name":"Carly Schroeder"},{"name":"Jimmy Bennett"},{"name":"Ral Kleiser"},{"name":"Aaron Johnson"},{"name":"Emmanuelle Vaugier"},{"name":"Lawrence Turner"},{"name":"Nick Stahl"},{"name":"William Katt"},{"name":"Jeremy Northam"},{"name":"Roy Scheider"},{"name":"Lorraine Gary"},{"name":"Murray Hamilton"},{"name":"James Caviezel"},{"name":"Ray Stevenson"},{"name":"Jennifer Beals"},{"name":"John Cena"},{"name":"Luke Albright"},{"name":"Michael Arnona"},{"name":"Allen Boudreaux"},{"name":"Yancy Butler"},{"name":"Andy Tent"},{"name":"Dieter Laser"},{"name":"Ashley C. Williams"},{"name":"Ashlynn Yennie"},{"name":"Lik Sun Fong"},{"name":"Chrissie Chow"},{"name":"Stephen Fung"},{"name":"Shengyi Huang"},{"name":"Simon Lui"},{"name":"Keyman Ma"},{"name":"Liang Tian"},{"name":"Natalie Tong"},{"name":"Ava Yu"},{"name":"Thomas Horn"},{"name":"Christopher Ray"},{"name":"Clémence Poésy"},{"name":"Gina Carano"},{"name":"Matthew Perry"},{"name":"Jon Bernthal"},{"name":"Stanley Huang"},{"name":"Lý Ngải"},{"name":"Chu Diên Bình"},{"name":"Yuko Miyamura"},{"name":"Tom Selleck"},{"name":"Liễu Vân Long"},{"name":"BreRicky Garcia"},{"name":"Eugene Cordero"},{"name":"Michelle Williams"},{"name":"Sarah Michelle Gellar"},{"name":"Jason Behr"},{"name":"Clea DuVall"},{"name":"Demi LovatoMatthew \"Mdot\" Finley"},{"name":"Ray Winstone"},{"name":"Danny Huston"},{"name":"Bojana Novakovic"},{"name":"Jay O. Sanders"},{"name":"Channing Tatum and Sam Neill"},{"name":"Kate Bosworth"},{"name":"Amber Tamblynrielle Kebbel"},{"name":"Eliseo Subiela"},{"name":"Ken'ichi Matsuyama"},{"name":"Sota Aoyama"},{"name":"Shunji Fujimura"},{"name":"Edy Arellano"},{"name":"Helena Mattsson"},{"name":"Marco Bacuzzi"},{"name":"Peter Medak"},{"name":"BreHarrison Gilbertsond Steve Le Marquand"},{"name":"Shawnee SmithMatthew Knight"},{"name":"Terence Davies"},{"name":"Michael FassbenderElizabeth Masucci"},{"name":"Rachel Farrar"},{"name":"Loren Omer"},{"name":"Jackie Earle Haley"},{"name":"Kyle Gallner"},{"name":"Thomas Dekker"},{"name":"Jack Yao"},{"name":"Amber Kuo"},{"name":"Hsiao chuan Chang"},{"name":"Lawrence Ko"},{"name":"Frankie Gao"},{"name":"Peggy Tseng"},{"name":"Tony Yang"},{"name":"Paul Chiang"},{"name":"Vera Yen"},{"name":"Bo Syuan Wang"},{"name":"Brian Wong"},{"name":"Olivier Martinez"},{"name":"Ralph Brown"},{"name":"Matt Damonllen"},{"name":"Shiloh FernandezCandice Accola"},{"name":"Scott Martin"},{"name":"Rob Schneider Faris"},{"name":"Vivian Chan"},{"name":"Zach Cregger; Trevor Moore"},{"name":"Trịnh Tú Văn"},{"name":"Cao Viên Viên"},{"name":"Huỳnh Dịch"},{"name":"Vương Bảo Cường"},{"name":"Yu Jun Sang"},{"name":"Kim Sang Jung"},{"name":"Song Seon Mi"},{"name":"Tchéky Karyo"},{"name":"Daniel Duval"},{"name":"Vương Mẫn Đức"},{"name":"Văn Vịnh San"},{"name":"Cheong a Lee"},{"name":"Gi woong Park"},{"name":"Jake GylleAnne Hathaway"},{"name":"Hank Azaria"},{"name":"Josh Gad"},{"name":"Michael ArataDale Poniewaz"},{"name":"Stephen Roberts"},{"name":"Jethro Rothe Kushel"},{"name":"Sean Biggerstaff"},{"name":"Emilia Fox"},{"name":"Michelle Ryan"},{"name":"Jason Statham. Amy Smart"},{"name":"Efren Ramirez"},{"name":"Cung Le"},{"name":"Stephen Walters"},{"name":"Holly Weston"},{"name":"Sacha Dhawan"},{"name":"Asger Leth"},{"name":"Larry the Cable Guy"},{"name":"David Mackey"},{"name":"Erin Beute"},{"name":"Manfred Wong"},{"name":"Taro Otani"},{"name":"Sandra Ng"},{"name":"Leonardo Guerra"},{"name":"Tony Plana"},{"name":"Kuno Becker"},{"name":"Jorge Cervera"},{"name":"Herman Chavas"},{"name":"Alfredo Rodríguez"},{"name":"Donald Li"},{"name":"Kate Tomlinson"},{"name":"Jake Johnson"},{"name":"Zachary Johnson"},{"name":"Wong Yau Nam"},{"name":"Chen Kuan Tai"},{"name":"Leung Siu Lung"},{"name":"Marianne Faithfull"},{"name":"Miki Manojlovic"},{"name":"Kevin Bishop"},{"name":"Shao qun Yu"},{"name":"Elvis Tsui"},{"name":"Jesse Hutch"},{"name":"Mike Dopud"},{"name":"Ang Lee"},{"name":"Carl Ng"},{"name":"Bing Bai"},{"name":"Andrew Dasz"},{"name":"Steven Dasz"},{"name":"Noureen DeWulf"},{"name":"Mark Neveldine,Brian Taylor"},{"name":"Arnold SchwarzeneggerMichael Biehn"},{"name":"Ari Graynor"},{"name":"Arnold SchwarzeneggerEdward Furlong"},{"name":"Clark Gable"},{"name":"Thomas Mitchell"},{"name":"Nguyễn Phan Quang Bình"},{"name":"Saoirse RonaJames McAvoylfie Allen"},{"name":"Daniel de Oliveira"},{"name":"Hermila Guedes"},{"name":"Jefferson Brasil"},{"name":"Arnold Schwarzenegger Loken"},{"name":"Charles S. Dutton"},{"name":"Paul McGann"},{"name":"Alice Eve"},{"name":"Brian Geraghty"},{"name":"Gina May"},{"name":"Bashar Rahal"},{"name":"Christian Balenton Yelchin"},{"name":"Farhakhtar"},{"name":"Kyung Jung"},{"name":"Pink"},{"name":"Katherine HeiglJohn Leguizamo"},{"name":"Sherri Shepherd"},{"name":"Debbie Reynolds"},{"name":"Debra Monk"},{"name":"Nate Mooney"},{"name":"Adam Paul"},{"name":"Ana Reeder"},{"name":"Jenn Proske"},{"name":"Matt Lanter"},{"name":"Chris Riggi"},{"name":"Kate BeckiScott Speedman"},{"name":"Derek Jacobi"},{"name":"Rob Aguire"},{"name":"Julie Berman"},{"name":"Frank Langella"},{"name":"Bipasha Basu"},{"name":"Shweta Bhardwaj"},{"name":"Cindel Chartrand"},{"name":"Danielle Doetsch"},{"name":"William Jarand"},{"name":"Camilla Belle"},{"name":"Djimon Hounsou"},{"name":"Shaun Toub"},{"name":"Ji Hyeon Woo"},{"name":"Im Won Hee"},{"name":"Ko Chang Seok"},{"name":"Dennis Farina"},{"name":"Jeremy Irvinend David Thewlis"},{"name":"Kristyna Malérová"},{"name":"Max Mauff"},{"name":"Nino Chkheidze"},{"name":"Jeanette Hain"},{"name":"Russell WongCoco Chiang"},{"name":"Hu Qing Yun"},{"name":"Shi Ping Cao"},{"name":"Ruijia Zhang"},{"name":"Vivian Wu"},{"name":"Zhebing Gong"},{"name":"Lilia Zhou"},{"name":"Dominic West and Imelda Staunton"},{"name":"Vanessa Redgrave and David Thewlis"},{"name":"Heather Donahue"},{"name":"Michael C. Williams"},{"name":"Joshua Leonard"},{"name":"Kathy Baker"},{"name":"Madeline Carroll"},{"name":"Diane KrugerAlain FiglarzMehdi Nebbou"},{"name":"Raz Degan"},{"name":"Jeanne Bournaud"},{"name":"Anne Caillon"},{"name":"Elsa Levy"},{"name":"Laurent Bouhnik"},{"name":"ShiYun Da Hun"},{"name":"Oh Ji Ho"},{"name":"Marian Dziedziel"},{"name":"Borys Szyc"},{"name":"Magdalena Czerwinska"},{"name":"Jason Segel và Chris Cooper"},{"name":"Mary Louise Parker"},{"name":"Mia Stallard"},{"name":"Dermot Mulroney"},{"name":"Sam Shepard"},{"name":"Anders Juul"},{"name":"Hadi Ka Koush"},{"name":"Lærke Winther Andersen"},{"name":"Eddie Redmayne và Kenneth Branagh"},{"name":"Ama Bynes"},{"name":"Elizabeth McGovern"},{"name":"Tuesday Weld"},{"name":"Treat Williams"},{"name":"Richard Bright"},{"name":"James Hayden"},{"name":"William Forsythe"},{"name":"Rutger Hauer"},{"name":"Edward James Olmos"},{"name":"M. Emmet Walsh"},{"name":"Alexis Clagett"},{"name":"Brynn Clagett"},{"name":"Sung Young Chen"},{"name":"Salman Khan"},{"name":"Zarine Khan"},{"name":"Lisa Lasarus"},{"name":"Billy Ray Cyrus"},{"name":"ABrian Cox"},{"name":"Dylan Baker"},{"name":"Steventin"},{"name":"Abhay Deol"},{"name":"Mahie Gill"},{"name":"Kalki Koechlin"},{"name":"Danny Chan Bak Keung"},{"name":"George G. Colucci"},{"name":"Kate Mara"},{"name":"Jordana Brewster"},{"name":"Matt Bomer"},{"name":"Diora Baird"},{"name":"Helen Mirren"},{"name":"Ciarán Hinds"},{"name":"Romi Aboulafia"},{"name":"Tomer Ben David"},{"name":"Ohev Ben David"},{"name":"Jonathan Uziel"},{"name":"Eli Zohar"},{"name":"Irén Bordán"},{"name":"Georgia Groome"},{"name":"Eleanor Tomlinson"},{"name":"Manjeeven Grewal"},{"name":"Mary Elizabeth Winsteadshley Roberts"},{"name":"Jason Segel"},{"name":"Romany Malco"},{"name":"Catherine Tate"},{"name":"Luoc Lee"},{"name":"Michael Tao"},{"name":"Akira Kurosawa"},{"name":"François Truffaut"},{"name":"Sarah HabelMarcia Gay Harden"},{"name":"Barbara Coven"},{"name":"Eulala Scheel"},{"name":"Nina Kircher"},{"name":"Michael Mantell"},{"name":"Elliott Gould"},{"name":"Ray Xifo"},{"name":"Adam Lazarre White"},{"name":"Eddie Jemison"},{"name":"Shaobo Qin"},{"name":"Eric Bana"},{"name":"Zoe Saldana"},{"name":"Morjana Alaoui"},{"name":"Mylène Jampanoï"},{"name":"Catherine Bégin"},{"name":"Robert Toupin"},{"name":"Patricia Tulasne"},{"name":"Juliette Gosselin"},{"name":"Xavier Dolan"},{"name":"Isabelle Chasse"},{"name":"Emilie Miskdjian"},{"name":"Mike Chute"},{"name":"Gaëlle Cohen"},{"name":"Song Kang Ho"},{"name":"Byun Hee Bong"},{"name":"Bae Du Na"},{"name":"John Travoltallen"},{"name":"Doug Hutchison"},{"name":"Colin Salmon"},{"name":"Wayne Knight"},{"name":"Dash Mihok"},{"name":"Julie Benz"},{"name":"Stephanie Janusauskas"},{"name":"Mark Camacho"},{"name":"Romano Orzari"},{"name":"Keram Malicki Sánchez"},{"name":"Frank Vincent"},{"name":"Pasquale Cajano"},{"name":"Vinny Vella"},{"name":"Alan King"},{"name":"L.Q. Jones"},{"name":"Ryan KwanteDonnie Wahlberg"},{"name":"Michael Fairman"},{"name":"Joan Heney"},{"name":"Laura Regan"},{"name":"Dmitry Chepovetsky"},{"name":"Judith Roberts"},{"name":"Keir Gilchrist"},{"name":"Steven Taylor"},{"name":"Michael DouglasPaul Schulze"},{"name":"Brad PittLarry SoAndy Garcia"},{"name":"Casey Affleck"},{"name":"Michael PittRobin Renucci"},{"name":"Jean Pierre Kalfon"},{"name":"Jean Pierre Léaud"},{"name":"Florian Cadiou"},{"name":"Pierre Hancisse"},{"name":"Valentin Merlet"},{"name":"Lola Peploe"},{"name":"Lee Evans"},{"name":"James CaviezelFrancesco Cabras"},{"name":"Kevin ConroyBumper Robinson"},{"name":"Carlos Alazraqui"},{"name":"Claudia Black"},{"name":"Paul Blackthorne"},{"name":"Olivia d'Abo"},{"name":"Alexis Denisof"},{"name":"Phil Morris"},{"name":"Dee Bradley Baker"},{"name":"Grey DeLisle"},{"name":"Michael Buie"},{"name":"Bill NighyLiam Neeson"},{"name":"Lulu Popplewell"},{"name":"Kris Marshall"},{"name":"Emma Roberts"},{"name":"Tamsin Egerton"},{"name":"Akira Kamiya"},{"name":"Wakana Yamazaki"},{"name":"John Huston"},{"name":"David Lynch"},{"name":"Oliver Hirschbiegel"},{"name":"Audrey Hepburn"},{"name":"Ben StillerCarlos Mencia"},{"name":"Robert Corddry"},{"name":"Leilani Sarelle"},{"name":"Stan Collymore"},{"name":"Stuart Rosenberg"},{"name":"Julian Schnabel"},{"name":"Vittorio De Sica"},{"name":"Stanley Kubrick"},{"name":"Ki duk Kim"},{"name":"Yeong su Oh"},{"name":"Jong ho Kim"},{"name":"Jean Claude Van DammeKim Rømer"},{"name":"Sally Hawkins"},{"name":"Andrea Riseborough"},{"name":"Lorraine Stanley"},{"name":"Marie Avgeropoulos"},{"name":"Gil Bellows"},{"name":"Michael Eklund"},{"name":"Hae jin Yu"},{"name":"Ho jin Jeon"},{"name":"Dong seok Ma"},{"name":"Dong gi Woo"},{"name":"Yeong jin Jo"},{"name":"Seong min Lee"},{"name":"Su hyeon Kim"},{"name":"Bon woong Ko"},{"name":"Zhang Zi Yi"},{"name":"Chang Chen"},{"name":"Sihung Lung"},{"name":"Cheng Pei Pei"},{"name":"Keir O'Donnell"},{"name":"Katheryn Winnick"},{"name":"Laura Breckenridge"},{"name":"Cedric The Entertainer"},{"name":"Charles Chaplin,Edna Purviance,Jackie Coogan"},{"name":"William Wyler"},{"name":"Julianne Hough"},{"name":"Michael Cimino"},{"name":"Trent Sullivan"},{"name":"Stephen"},{"name":"Maggie Gracefulness"},{"name":"Juan José Campanella"},{"name":"Lee Seong jae"},{"name":"Yu Oh seong"},{"name":"Kang Seong jin"},{"name":"Anne Parillaud"},{"name":"Jeanne Moreau"},{"name":"Tcheky Karyo"},{"name":"Stephen Spinella"},{"name":"Wings Hauser"},{"name":"Dominic Sena"},{"name":"Joel Coen,Ethan Coen"},{"name":"Mikael Persbrandt"},{"name":"Trine Dyrholm"},{"name":"Markus Rygaard"},{"name":"Mark"},{"name":"Strong"},{"name":"Dragoş Bucur"},{"name":"Gustaf Skarsgård"},{"name":"Adam SandlerJon Stewart"},{"name":"Dylan Sprouse"},{"name":"Cole Sprouse"},{"name":"Devon Graye"},{"name":"Wes Chatham and C.J. Thomason"},{"name":"Barbara Streisand"},{"name":"Colin Firthm Carter"},{"name":"Nicole KidmaDianne Wiest"},{"name":"Kevin Chapman"},{"name":"Preeya Kalidas"},{"name":"Melissa Joan Hart"},{"name":"Chip Bent"},{"name":"Denzel WashingtoBruce Willis"},{"name":"Matthew Beard"},{"name":"Ray StevensonTony Darrow"},{"name":"Fionnula Flanagan"},{"name":"Jason Butler Harner"},{"name":"Tony Lo Bianco"},{"name":"Laura Ramsey"},{"name":"Steve Schirripa"},{"name":"Jonathan LaPaglia"},{"name":"Alan Tudyk and Katrina Bowden"},{"name":"Tabrett Bethell"},{"name":"Freya Stafford"},{"name":"Andy Whitfield"},{"name":"Tim McGraw"},{"name":"Leighton Meester"},{"name":"Haluk Bilginer"},{"name":"Colin O'Donoghue"},{"name":"Jerry Molden"},{"name":"John M. Murdock"},{"name":"Terry George"},{"name":"Alex Mallari Jr."},{"name":"J. Anthony Pena"},{"name":"Adriana Caselotti"},{"name":"Harry Stockwell"},{"name":"Lucille LaVerne"},{"name":"Moroni Olsen"},{"name":"Billy Gilbert"},{"name":"Edward NortonMeat Loaf"},{"name":"Ruta GedmiJoshua Bowman"},{"name":"Perdita Weeks"},{"name":"Paul Levesque"},{"name":"Kevin Corrigan"},{"name":"Kevin Rankin"},{"name":"Itsuji Itao"},{"name":"Yukihide Benny"},{"name":"Charles Binamé"},{"name":"Doug Liman"},{"name":"Pasha Ebrahimi"},{"name":"Robb Wells"},{"name":"Sasha Jackson"},{"name":"Elizabeth Mathis and Ben Milliken"},{"name":"Zachary Gordon"},{"name":"Devon Bostick"},{"name":"Rachael Harris"},{"name":"Robert Capron"},{"name":"Connor Fielding"},{"name":"Owen Fielding"},{"name":"Peyton List"},{"name":"Laine Macneil"},{"name":"Grayson Russell"},{"name":"Terence Kelly"},{"name":"Hàn Tuyết"},{"name":"Bruce WillisWilliam Shatner"},{"name":"Thomas Haden Church"},{"name":"Allison Janney"},{"name":"Avril Lavigne"},{"name":"Jada Pinket Smith Nhà sản xuất:"},{"name":"Cuba Gooding Jr.Nicki AycoxYancey Arias Forrestall"},{"name":"Kat Denningsndie MacDowell"},{"name":"Courteney Cox and Danny Glover"},{"name":"Milos Forman"},{"name":"Kurosawa Akira"},{"name":"Ed Helms"},{"name":"Carlos SaldaMike Thurmeier"},{"name":"Charles Laughton"},{"name":"Yuri Kanchiku"},{"name":"Hailee Steinfeld"},{"name":"Salman KhaParesh Rawal"},{"name":"Mahesh Manjrekar"},{"name":"Anuradha Patel"},{"name":"Manoj Pahwa"},{"name":"Akhilendra Mishra"},{"name":"Arya Babbar"},{"name":"Sudesh Lehri"},{"name":"Rajiv Kachroo"},{"name":"Hemant Pandey"},{"name":"Winstone"},{"name":"Temuera Morrison"},{"name":"Gareth Reeves"},{"name":"Ray Romano"},{"name":"Goran Visnjic"},{"name":"Cedric the Entertainer"},{"name":"Mélanie Laurent"},{"name":"David S. Goyer"},{"name":"ADennis Quaid"},{"name":"Carrie Underwood"},{"name":"Eddie Griffin"},{"name":"Terry Crews"},{"name":"Dana Carvey"},{"name":"Stephen DorffMarisol Nichols"},{"name":"Sam Elliott"},{"name":"Barbara Luddy"},{"name":"Larry Roberts and Peggy Lee"},{"name":"BreDon Cheadle"},{"name":"Gilles Marini"},{"name":"Charlotte Newhouse"},{"name":"Chris Miller"},{"name":"Walt Dohrn"},{"name":"Bret Marnell Miles Christopher Bakshi"},{"name":"Nina Zoe Bakshi"},{"name":"Guillaume Aretos"},{"name":"Billy Crystal"},{"name":"Mary Gibbs"},{"name":"MaliBilly Crudup"},{"name":"Park Chul Soo"},{"name":"Aimee Teegarden"},{"name":"Thomas McDonell"},{"name":"DeVaughn Nixon"},{"name":"Danielle Campbell"},{"name":"Kang Ye won"},{"name":"William Hurt"},{"name":"Michael Ealy và India Eisley"},{"name":"Dylan Moran"},{"name":"Jade Ramsey"},{"name":"Jimmy Fallon"},{"name":"Henry Simmons"},{"name":"Jennifer Esposito"},{"name":"Andy Serkis và Daniel Craig"},{"name":"Nicky Whelan"},{"name":"Pamela Anderson"},{"name":"Vivica A. Fox"},{"name":"Kim Ji hyeon"},{"name":"Choi Cheol ho"},{"name":"Ryu Su yeong"},{"name":"Asa Butterfield"},{"name":"Chloë Grace Moretz and Christopher Lee"},{"name":"BeCuba Gooding Jr."},{"name":"La Gia Anh"},{"name":"Kelly Hu"},{"name":"Sebastien Foucan"},{"name":"Ian Somerhalder"},{"name":"Ginnifer Goodwin"},{"name":"Colin Egglesfield"},{"name":"Kelly Preston"},{"name":"Jordan Garrett"},{"name":"Stuart Lafferty"},{"name":"Aisha Tyler and John Goodman"},{"name":"Ajay Devgan"},{"name":"Brandon T. Jackson"},{"name":"Jessica Lucas"},{"name":"Michelle Ang"},{"name":"Sarah Jessica Parkernd Kelsey Grammer"},{"name":"Arjun Rampal"},{"name":"Susumu Terajima"},{"name":"Maya Rudolph"},{"name":"Jean-Piere Jeunet"},{"name":"Jim Caviezellex Norton"},{"name":"Leonardo Dicaprio"},{"name":"Ed Westwick"},{"name":"Christopher Jordan Wallace"},{"name":"Jack Black and Steve Martin"},{"name":"Richard Sammel"},{"name":"Naga ChaitaKajal Agarwal"},{"name":"Srikanth"},{"name":"Kelly Dorji"},{"name":"Stacey Asaro"},{"name":"Gralen Bryant Banks"},{"name":"Rus Blackwell"},{"name":"Thái Thiếu Phân"},{"name":"Chu Ân"},{"name":"Reema Debnath"},{"name":"Phạm Văn Phương"},{"name":"Matthew Fox"},{"name":"Alfred Hitchcock"},{"name":"Tony Kaye"},{"name":"Yusuke Narita"},{"name":"Jonathan Demme"},{"name":"Gloria Swanson"},{"name":"George Lucas"},{"name":"ComedyRomance"},{"name":"Jung Jae Lee"},{"name":"Seo Woo"},{"name":"Stephy Tang"},{"name":"Janice Man"},{"name":"J.J. Jia"},{"name":"Yee Tong"},{"name":"Yoo Ha"},{"name":"Irvin Kershner"},{"name":"Richard Marquand"},{"name":"Tinto Brass"},{"name":"Michael Curtiz"},{"name":"Frank Capra"},{"name":"Hrithik Roshankhtar"},{"name":"Sam Douglas"},{"name":"Sydney Pollack"},{"name":"Todd Field"},{"name":"Just Jaeckin"},{"name":"Bill Oberst Jr."},{"name":"Tawny Amber Young"},{"name":"Devanny Pinn"},{"name":"Ivet Corvea"},{"name":"Jessica Elder"},{"name":"Kim Tae Hee"},{"name":"Jung Woo Sung"},{"name":"Bruce WillisJames Remary Couture"},{"name":"Jung Jun Ho"},{"name":"Shin Eun Kyung Shim Yi Young"},{"name":"Lee Seon Jin"},{"name":"Jessica Carlson"},{"name":"Michael Cerveris"},{"name":"Patrick Fugit"},{"name":"Daniel Newman"},{"name":"Morgan Saylor"},{"name":"Don McManus"},{"name":"Colleen Camp"},{"name":"Lý Liên KiệtTchéky Karyo"},{"name":"Max Ryan"},{"name":"Mary Costa"},{"name":"Bill Shirley"},{"name":"Eleanor Audley"},{"name":"Trần Đức Sâm"},{"name":"Brian Cox and Tony Curran"},{"name":"Michael Shannonnd Shea Whigham"},{"name":"Jimmy BennettJim Cummings"},{"name":"John Fiedler"},{"name":"Yôsuke Kubozuka"},{"name":"Takao Osawa"},{"name":"Đường Quốc Cường"},{"name":"Trương Quốc Lập"},{"name":"Lưu Kình"},{"name":"Trần Khôn"},{"name":"Ha Neul Kim vai Ji Eun iSeo won Cha vai Min Ji min"},{"name":"Jin Hee Lee"},{"name":"Chung Hân Ðồng"},{"name":"Michael Nyqvist"},{"name":"Ewa Fröling"},{"name":"Robin Wright và Philip Seymour Hoffman"},{"name":"Lý Liên Kiệ"},{"name":"Michelle Ferre and Mirai Yamamoto"},{"name":"Xu Jinglei"},{"name":"Quách Phú Thành. Ngô Kinh"},{"name":"Trương Tịnh Sơ"},{"name":"Heath LedgerRandy Quaid Cardellini"},{"name":"Stellan Skarsgård"},{"name":"Randy Quaid"},{"name":"Rachelle Lefevre; Stephen Moyer; Ed Quinn; Luis Guzmán; Lorna Raver"},{"name":"Ken Jeong"},{"name":"Bruce Lee"},{"name":"Lý Tử Long"},{"name":"Victor Webster"},{"name":"Trần Nghiên Hi"},{"name":"Ngạo Khuyển"},{"name":"Hác Thiệu Văn"},{"name":"Jérémie Renier"},{"name":"Jean Yanne"},{"name":"Jean François Stévenin"},{"name":"José Garciamado"},{"name":"JK Simmons"},{"name":"Al Pacino and Juliette Binoche"},{"name":"William Mapother and Matthew Lee Erlbach"},{"name":"Ben Stiller and Casey Affleck"},{"name":"Steven Waddington Agron"},{"name":"Ryan Gosling and Julianne Moore"},{"name":"Jude Lawtkins"},{"name":"Andrew Keegan"},{"name":"Brandon Quinn"},{"name":"Natalia Cigliuti"},{"name":"Nick Carter"},{"name":"Reno Wilson"},{"name":"Greg Grunberg"},{"name":"Rachel Weisz and Naomi Watts"},{"name":"Sara Paxtonnd Alyssa Diaz"},{"name":"John CusackJeremy Piven"},{"name":"John Corbett"},{"name":"Brad Birdva"},{"name":"Ed Kelly"},{"name":"Clarity Patton"},{"name":"Caleb Wolfe"},{"name":"Rommel Aya"},{"name":"Kate Bosworth and Alexander Skarsgård"},{"name":"Jeremy Irons"},{"name":"Chris Evansnd Vinessa Shaw"},{"name":"Hanyu Zhang"},{"name":"Yu Hai"},{"name":"Ding Laam"},{"name":"Yu Cheng Hui"},{"name":"Bebe Pham Jaymee Ong Benny Simpson"},{"name":"Peyman Maadi"},{"name":"Leila Hatami"},{"name":"Sareh Bayat"},{"name":"Johannes Krischmaria Haytö"},{"name":"Tên phim: Cổ Thiên Lạc"},{"name":"Ngô Thiên Ngữ"},{"name":"Austin Butler"},{"name":"Bradley Steven Perry"},{"name":"Cameron Goodman"},{"name":"Brandon Lee Ernie Hudson Rochelle Davis Michael Wincott Tony Todd"},{"name":"Rufus Sewell"},{"name":"Shannyn Sossamon"},{"name":"James Frecheville"},{"name":"Jeremy Davies"},{"name":"Vương Học Triết"},{"name":"Hải Thanh"},{"name":"James Frain"},{"name":"Nhâm Ðạt Hoa"},{"name":"Seung ho Yu"},{"name":"Kim Yeong ho"},{"name":"Gao Chang seok"},{"name":"Lau Ching Wan"},{"name":"Karen Mok"},{"name":"Francoise Yip"},{"name":"Trần Kiến Bân"},{"name":"Kim Hye Sun"},{"name":"Kiichi Nakai Ngô Chấn Ninh"},{"name":"Khương Văn"},{"name":"Danny Inosanto"},{"name":"Kareem Abdul Jabbar"},{"name":"Thành Longrano"},{"name":"Bobby Deol"},{"name":"Elizabeth Perkins"},{"name":"Brian Levant"},{"name":"Atlantis: The Lost Empire Đạo diễn: Diễn viên: Michael J. Fox"},{"name":"Claudia Christian"},{"name":"Jim Varney"},{"name":"John Mahoney Nhà sản xuất: Thể loại: Hoạt hình Độ dài:"},{"name":"Nicolas CageGuy Pearce"},{"name":"James Yuen Sai-Sang"},{"name":"Emma BellKevin Zegers"},{"name":"Ed Ackerman"},{"name":"Robby Benson"},{"name":"Paige O'Hara"},{"name":"Jerry Orbach"},{"name":"David Ogden Stiers"},{"name":"Lý Mạnh Quân"},{"name":"Sandra Ng Kwan Yue"},{"name":"Sui man Chim"},{"name":"William Chan Wai Ting"},{"name":"Lục Nghị"},{"name":"Heiward Mak"},{"name":"Matthew BroderickWhoopi Goldberg"},{"name":"Kal Penn"},{"name":"John Cho"},{"name":"Neil Patrick Harris"},{"name":"Susie Essman"},{"name":"Mark Walton"},{"name":"James Belushi"},{"name":"Song Kang ho"},{"name":"Yoon Doo hun"},{"name":"Shin Se kyung"},{"name":"Miyazaki Hayao"},{"name":"Kevin Kline"},{"name":"Odette ATopher Grace"},{"name":"Martin Wood"},{"name":"Justin TimberlakeBryan Greenberg"},{"name":"Kim Hee Sun"},{"name":"Haley Joel Osment"},{"name":"Connor Funk"},{"name":"Bob Joles"},{"name":"Tony Jay"},{"name":"John Rhys Davies"},{"name":"Phil Collins"},{"name":"Yoon Tae Yoon"},{"name":"John Chu"},{"name":"Derek Jeter"},{"name":"Salma Hayek and Zach Galifianakis"},{"name":"Chris Stokes"},{"name":"Scott WeingerJonathan Freeman"},{"name":"Gilbert Gottfried"},{"name":"Douglas Seale"},{"name":"Bille Woodruff"},{"name":"Chris Brown.J. Matt Dillon"},{"name":"Roger Carel"},{"name":"Lorànt Deutsch"},{"name":"Sara Forestier"},{"name":"Chris Gorak"},{"name":"Kim Kyu Ri"},{"name":"Ricky Kim"},{"name":"Robert Adetuyi"},{"name":"Vivek OberoiNeeru Bajwa"},{"name":"Kim Nam Gil"},{"name":"Hwang Woo Seul Hye"},{"name":"Yoon Je Moon"},{"name":"Conan"},{"name":"Mandy Moore Murphy"},{"name":"Chris Noth"},{"name":"Gina Torres"},{"name":"Hyeon Bin"},{"name":"Lee Yeon hee"},{"name":"Lee Han sol"},{"name":"Jo Yong joon"},{"name":"Ham Yoo seon"},{"name":"Jo Gyoo cheol"},{"name":"Im Chang jeong"},{"name":"Eom Ji won"},{"name":"Jeong Eun woo"},{"name":"Sa Hee"},{"name":"Cha Seung Won"},{"name":"T.O.P"},{"name":"Kim Seung Woo"},{"name":"Liao Fan"},{"name":"Hai Yitian"},{"name":"Simon Yam Tat Wah"},{"name":"Lam Suet"},{"name":"Leung Ka Yan"},{"name":"Guk Fung"},{"name":"Sukie Shek"},{"name":"Bau Hei Jing"},{"name":"Law Chung Him"},{"name":"Hui Siu Hung"},{"name":"Derek Tsang Kwok Cheung"},{"name":"Lawrence Cheng Tan Shui"},{"name":"Ha Da"},{"name":"Zhou Chuchu"},{"name":"Xiao Bao"},{"name":"T.J. Miller"},{"name":"Mike Vogel"},{"name":"Nate Torrence"},{"name":"Krysten Ritter"},{"name":"Geoff Stults and Lindsay Sloane"},{"name":"Rachel Ticotin"},{"name":"Ronny Cox"},{"name":"Peter Docter"},{"name":"Katt Williams"},{"name":"Bette Midler"},{"name":"Sean Hayes"},{"name":"Columbus Short"},{"name":"Óscar Jaenada"},{"name":"Holt McCallany"},{"name":"Peter Macdissi"},{"name":"Peter Francis James"},{"name":"Tanee McCall Short"},{"name":"Lim Seong eon"},{"name":"Kwak Ji min"},{"name":"Kim Kwang min"},{"name":"Will Ferre"},{"name":"Bruce Greenwoodckles and John Di Maggio"},{"name":"Zach Grenier"},{"name":"Marshall Bell"},{"name":"Toby Huss"},{"name":"BigBang"},{"name":"Kim Bum"},{"name":"U know Yunho"},{"name":"Lee Da Hae"},{"name":"Park Si Hoo"},{"name":"Han Chae Young"},{"name":"Nick Searcy"},{"name":"Paul Sanchez"},{"name":"Mary Steenburgen"},{"name":"ReiHolger Tappe"},{"name":"Woody Tim Allen"},{"name":"Buzz Lightyear Joan Cusack"},{"name":"Jessie Ned Beatty"},{"name":"Lotso Don Rickles"},{"name":"Mr. Potato Head Michael Keaton"},{"name":"Ken Wallace Shawn"},{"name":"Joaquim De Almeida"},{"name":"Pierre Coffin,Chris Renaud,Sergio Pablos"},{"name":"Mia Farrow"},{"name":"Tim Curry"},{"name":"Miki Mizuno"},{"name":"Makoto Togashi"},{"name":"Megumi Kagurazaka"},{"name":"Jeong Eun Chae"},{"name":"Yoon Da Kyeong"},{"name":"Enes Kaya"},{"name":"Abu Dod"},{"name":"Kristy Swanson"},{"name":"D.B. Sweeney"},{"name":"Lauren Cohan"},{"name":"Orlando Jones"},{"name":"Edmund Entin"},{"name":"Gary Entin"},{"name":"N.T.R. Rao Junior"},{"name":"Faye Dunaway and Elizabeth Mitchell"},{"name":"Nicolas Cage Speckles"},{"name":"Penélope Cruz Juarez"},{"name":"Bill Nighy Saber"},{"name":"Will Arnett Kip Killian"},{"name":"Zach Galifianakis Ben"},{"name":"Kelli Garner Marcie"},{"name":"Tyler Patrick Jones Connor"},{"name":"Piper ackenzie Harris Penny"},{"name":"Bak Ming Wong"},{"name":"Lynn Hung"},{"name":"Angela Baby"},{"name":"Fruit Chan"},{"name":"Chun Chau Ha"},{"name":"Aragaki Yui"},{"name":"Kaku Kento"},{"name":"Natsuna"},{"name":"Chris EvansEliza CoupeMike Vogel"},{"name":"Joel Michael"},{"name":"Maxime Godart"},{"name":"Sandrine Kiberlain"},{"name":"Maria Bello Cassidy"},{"name":"Bryan Larkin"},{"name":"Hugh Lambe and Bob Cymbalski"},{"name":"Seol Kyeong gu"},{"name":"Lee Jeong jin"},{"name":"Emily Blunt and Shohreh Aghdashloo"},{"name":"Han Geng"},{"name":"Alex Fong Lik Sun"},{"name":"Owodog"},{"name":"Siu Fei"},{"name":"Zhang Xinyu"},{"name":"Elanne Kong Yeuk Lam"},{"name":"Lu Yiu Qi"},{"name":"Mark WahlbergBen Foster"},{"name":"Lukas Hass"},{"name":"Tae hyun ChaJin hie Han"},{"name":"Eun,tae Kim"},{"name":"Alix Wilton RegaPhilip Brodie"},{"name":"Morgan Freemashley Judd and Harry Connick Jr"},{"name":"Takahiro Sakurai"},{"name":"Showtaro Morikubo"},{"name":"Ayumi Ito"},{"name":"Đỗ Vũ Hằng"},{"name":"Trịnh Gia Dĩnh"},{"name":"Charlotte Gainsbourg and Kiefer"},{"name":"Rob Freeman"},{"name":"Prince David Oseia"},{"name":"David Dontoh"},{"name":"David TentKate Ashfield"},{"name":"Joseph Gordon Levitt Kendrick"},{"name":"Hyeong-cheol Kang"},{"name":"Kim Vũ Thành."},{"name":"Bailee Madison"},{"name":"Viola Davis"},{"name":"Octavia Spencer"},{"name":"Bryce Dallas Howard"},{"name":"Dave Bautista"},{"name":"Amy Smart and Dominic Purcell"},{"name":"Joel Silver"},{"name":"Lionel Wigram"},{"name":"Susan Downey"},{"name":"Dan Lin"},{"name":"Rachel McAdams and Kathy Bates"},{"name":"Kwon Sang woo"},{"name":"Theeradej Wongpuapan"},{"name":"Matthew Gray Gubler"},{"name":"Amy Poehler và Jesse McCartney"},{"name":"Doreamon"},{"name":"Chaien"},{"name":"Trần Đại Minh"},{"name":"Christopher Plummer and Mélanie Laurent"},{"name":"Preity ZiShah Rukh Khan"},{"name":"Elizabeth Banks and Zooey Deschanel"},{"name":"Pierce Brorsan"},{"name":"Yoo Joon Sang"},{"name":"Heo Joon Ho"},{"name":"Yoo Seon"},{"name":"Madhavan"},{"name":"Mona Singh"},{"name":"Lochlyn Munro"},{"name":"Park Min Young"},{"name":"Kim Dong Wook"},{"name":"Kim Ye Ron"},{"name":"Shin Da Eun"},{"name":"Trey Parker"},{"name":"Matt Stone"},{"name":"Kristen Miller"},{"name":"Bae Yong Joon"},{"name":"Im Sang Hyo"},{"name":"Kim Kwang Il"},{"name":"Stephen Chow Sing Chi"},{"name":"Anita Mui Yim Fong"},{"name":"Ng Man Tat"},{"name":"Maryam d"},{"name":"Kim Su Mi Shin"},{"name":"Hyun Jun"},{"name":"Tak Jae Hun"},{"name":"Lim Hyung Jun"},{"name":"Jung Jun Ha"},{"name":"HyunYung"},{"name":"Rick D. Wasserman"},{"name":"Lisa Ann Beley"},{"name":"Mark Hildreth"},{"name":"Iam O'brien"},{"name":"Lý Quảng"},{"name":"Khương Quang Vũ"},{"name":"Tô Vũ Huyền"},{"name":"Từ Khắc"},{"name":"Shin Dong Yup"},{"name":"Cheung Man"},{"name":"Shing Fui On"},{"name":"Vincent Wan"},{"name":"Roger Moore Roberts"},{"name":"Yang Dong Geun"},{"name":"Park Geun Hyeong"},{"name":"Ko Doo Sim"},{"name":"Park Sa Rang"},{"name":"Woo Hyeon"},{"name":"Baek Jong hak"},{"name":"Jo In Sung"},{"name":"Cho Seung Woo"},{"name":"Lee Ki Woo"},{"name":"Lee Sang In"},{"name":"Kang ho Song Lee Han kyu Dong won Kang Song Ji won"},{"name":"Sean Conneryuer"},{"name":"Im Soo jeong"},{"name":"Gong Yoo"},{"name":"Cheon Ho jin"},{"name":"Jeon Soo kyeong"},{"name":"Lee Cheong ah"},{"name":"Nick Cheung Ka FaiEddie Cheung Siu Fai"},{"name":"Ben Ng"},{"name":"Lois Chiles"},{"name":"Machel Lonsdate"},{"name":"Richard Kiel"},{"name":"Corinne Clery"},{"name":"Wong Chi"},{"name":"Brian Christopher O'Halloran"},{"name":"Jeff Anderson"},{"name":"Stephen Chow Sing ChiChau Sang"},{"name":"Anita Yuen"},{"name":"Law Kar Ying"},{"name":"Yammie Nam"},{"name":"Kong Yeuk"},{"name":"Yat Fei"},{"name":"Tin Kai Man"},{"name":"Lam Chi Sin"},{"name":"Lam Chi Chung"},{"name":"Teresa"},{"name":"Mo Sun Kwan"},{"name":"Wu Ma Amy"},{"name":"Yip Chi Mei"},{"name":"Yiu Yeung"},{"name":"Jin yeong Jeong"},{"name":"Mun shik Lee"},{"name":"Seung yong Ryoo"},{"name":"Jared Kusnitz"},{"name":"Greyson Chadwick"},{"name":"Chandler Darby"},{"name":"James Wong Jim"},{"name":"Deannie Yip"},{"name":"Athena Chu"},{"name":"Steven Chow Sing Chi"},{"name":"Roy Chiao (Kiu Wang)"},{"name":"Raymond Wong Bak Ming Francis Ng Chun Yu"},{"name":"Wu Chien Lien"},{"name":"(Ng Sin Lin)"},{"name":"Christine Ng"},{"name":"Wing Mei"},{"name":"Gigi Lai Chi"},{"name":"Châu tinh trì"},{"name":"Châu tinh trì﻿"},{"name":"Nina Li"},{"name":"Bành Thuận,Bành Phát"},{"name":"trương học hữu"},{"name":"Barbara Bach"},{"name":"Curd Jürgens"},{"name":"Ada Choi"},{"name":"Anthony Wong"},{"name":"Joseph Cross"},{"name":"John Pyper Ferguson"},{"name":"Brando Eaton"},{"name":"Nicole Badaan"},{"name":"Sherry Stringfield"},{"name":"Spencer Breslin"},{"name":"Jill St. John"},{"name":"Charles Gray"},{"name":"Châu Vận"},{"name":"Liêu Phàm"},{"name":"Harry Saltzmallbert R. Broccoli"},{"name":"Kitty Zhang"},{"name":"Xu Jiao"},{"name":"Akiko Wakabayashi"},{"name":"Mie Hama"},{"name":"Tetsuro Tamba"},{"name":"Teru Shimada"},{"name":"Gordon Chan Car-Seung Car Seung"},{"name":"Chung Chi Li,Jacky Wu"},{"name":"Liam Neeson Colonel Hannibal Smith Bradley Cooper"},{"name":"Lý Nhân Cảng"},{"name":"Châu Tinh TrìCarina Lau"},{"name":"Carman Lee"},{"name":"Sean Connery (James Bond)"},{"name":"Claudine Auger (Domino)"},{"name":"Adolfo Celi (Emilio Largo)"},{"name":"Luciana Paluzzi (Fiona Volpe)"},{"name":"Rik Van Nutter (Felix Leiter)"},{"name":"Max Moki"},{"name":"Ellen Chan"},{"name":"Wilson Yip,Donnie Yen"},{"name":"Eric Kot"},{"name":"Bowie Lam"},{"name":"Lee Kin Yan"},{"name":"Wong Yuk"},{"name":"Fennie Yuen"},{"name":"Sheila Chan"},{"name":"Jason Yee"},{"name":"Samantha Streets"},{"name":"Gary Stretch"},{"name":"Mạc Văn Úy"},{"name":"Natasha Yarovenko"},{"name":"Enrico Lo Verso"},{"name":"Najwa Nimri"},{"name":"Ann Bridgewater"},{"name":"Từ Phụ Quân"},{"name":"Kim Dong Won"},{"name":"Jon Foonthony Dale"},{"name":"Alice Taglioni"},{"name":"Stéphane Debac"},{"name":"Ami Can Mann"},{"name":"John Singleton"},{"name":"Elliott Lester"},{"name":"Prabhas"},{"name":"Johnny Trí Nguyễn"},{"name":"Hoàng Phúc"},{"name":"Lâm Minh Thắng"},{"name":"Hiếu Hiền"},{"name":"Taylor Lautner"},{"name":"Dustin Nguyễn"},{"name":"Nguyên Thân"},{"name":"Trần Mộc Thắng"},{"name":"Hồng Hân Hân"},{"name":"Eiichiro Funakoshi"},{"name":"Akiko Matsumoto"},{"name":"Ryohei Hirota"},{"name":"Mao Sasaki"},{"name":"Shin Ha kyun và Kim Ok bin"},{"name":"J. J Abrams"},{"name":"Jack Lord"},{"name":"Ursula Andress"},{"name":"Peter Burton"},{"name":"David R. Ellis"},{"name":"Nina Dobrevnd Kellan Lutz"},{"name":"Robert Fucilla"},{"name":"Kirsty Mitchell"},{"name":"Vas Blackwood"},{"name":"Rob James Collier & Geoff Bell"},{"name":"Jeong Jae Young"},{"name":"Samuel L Jackson"},{"name":"Asia Argento"},{"name":"Eve"},{"name":"Sidney Lumet"},{"name":"Bruce Willis50 cent"},{"name":"Albert Brooks"},{"name":"Daniel Aguirre"},{"name":"Luis Bredow"},{"name":"Anton Yelchinnt"},{"name":"America Ferrera"},{"name":"Christopher Mintz Plasse"},{"name":"Bruce WillisReila Aphrodite"},{"name":"Kevin Beard"},{"name":"Rongguang Yu"},{"name":"Iron Monkey / Dr. Yang Donnie Yen"},{"name":"Wong Kei Ying Jean Wang"},{"name":"Miss Orchid Shi Kwan Yen"},{"name":"Hiu Hing (as Yee Kwan Yan) James Wong"},{"name":"Governor Cheng Hou Hsiao"},{"name":"Disfigured Swordsman Sze Man Tsang"},{"name":"Young Wong Fei Hung Shun Yee Yuen"},{"name":"Frank Darabont"},{"name":"Brandon Routh"},{"name":"Anita Briem"},{"name":"Sam Huntington"},{"name":"Kim Han-Min"},{"name":"Danny McBride"},{"name":"Ha Ji Won"},{"name":"Mary Elizabeth WinsteadPaul BraunsteinStig Henrik Hoff"},{"name":"Kristofer Hivju"},{"name":"Jo Adrian Haavind"},{"name":"Carsten Bjørnlun"},{"name":"Sean Rogerson"},{"name":"Juan Riedinger"},{"name":"Ashleigh Gryzko"},{"name":"Lý Mạn Quân"},{"name":"Paz Vega"},{"name":"Janet McTeer"},{"name":"Michelle Lombardo"},{"name":"Branko Djuric"},{"name":"D.L. Hughley"},{"name":"Jelena Gavrilovic"},{"name":"Alphonso McAuley"},{"name":"Ana Sakic"},{"name":"Bill Perkins"},{"name":"Gordan Kicic"},{"name":"Dong Zhi Hua"},{"name":"Chiu Chi Ling"},{"name":"Boyd Holbrook"},{"name":"Michael Rispoli"},{"name":"Jack Conley"},{"name":"Rio Alexander"},{"name":"Robert Sheehan"},{"name":"Pete Postlethwaite"},{"name":"Michael ADeborah Aquila"},{"name":"Nicholas Braun"},{"name":"Ronnie Connell"},{"name":"Kaylee DeFer"},{"name":"Nathan FillioAdam Baldwin"},{"name":"Summer Glau"},{"name":"Isshin Chiba"},{"name":"Erik Scott Kimerer and Yuki Matsuoka"},{"name":"Nick Nolte and Joel Edgerton"},{"name":"Golo López Gallego"},{"name":"Rachel Nichols"},{"name":"Maeve Dermody"},{"name":"Toby Schmitz"},{"name":"Patrick Brammall"},{"name":"Matthew Macfadyen"},{"name":"Patrick Labyorteaux"},{"name":"Julie McCullough"},{"name":"Nick Afanasiev"},{"name":"Bradley CooperAbbie Cornish"},{"name":"RowaRosamund Pike"},{"name":"Tom Hughes"},{"name":"Freddie Highmorerano"},{"name":"Laxa Doig"},{"name":"Darren Shahlavi"},{"name":"Hayley Atwell"},{"name":"Justin Timberlake"},{"name":"Maggie Cheung Ho Yee"},{"name":"Candy Lo"},{"name":"Lei Lam"},{"name":"Jun Kung"},{"name":"Charlie Cho"},{"name":"Alan Chui Chung San"},{"name":"Elena Kong"},{"name":"King Kong Lam"},{"name":"Trình Tiểu Đông"},{"name":"Brooklyn Decker"},{"name":"Liam Neesonry Jones"},{"name":"Mary Kate Olsen"},{"name":"Ryan ReynoldsMircea MonroeMatt Cornwell"},{"name":"Bingbing Li"},{"name":"Winston Chao"},{"name":"Jaycee Chan"},{"name":"Duobuji"},{"name":"Simon Dutton"},{"name":"Ge Hu"},{"name":"Ming Hu"},{"name":"Zhi zhong Huang"},{"name":"Rachel Bilson"},{"name":"Tom Sturridge"},{"name":"Jennifer Yuh"},{"name":"Ben McKenzie and Eliza Dushku"},{"name":"Lee Pace"},{"name":"Son Byeong Ho"},{"name":"Im Ha Ryong"},{"name":"Choi Jeong Yoon"},{"name":"Kim Sae Ron"},{"name":"Cheon Seong Hoon"},{"name":"Maggie Smith"},{"name":"Gary McKendry"},{"name":"Jon Hewitt"},{"name":"Chris Hemsworth"},{"name":"En chun Chiao"},{"name":"Ye Liu"},{"name":"Zilin Zhang"},{"name":"MiLeighton Meester and Cam Gigandet"},{"name":"Chris Trebilcock"},{"name":"Giang Khải"},{"name":"Lưu Tử Vi"},{"name":"Chris Peckover"},{"name":"Jang Cheol Soo"},{"name":"Hứa An Hoa"},{"name":"Alain Desrochers"},{"name":"Diêm Học Khai"},{"name":"Ken Iizuka"},{"name":"Tưởng Trác Nguyên"},{"name":"Vương Bình Nguyên"},{"name":"Han Jae-Rim"},{"name":"Griff Furst"},{"name":"Tạ Đông Sân"},{"name":"Wang Ran"},{"name":"David Leitch"},{"name":"Holger Tappe"},{"name":"Claudio Fäh"},{"name":"Gary Rydstrom"},{"name":"Lý Á Đông"},{"name":"Antonio Negret"},{"name":"Aisling Walsh"},{"name":"Tham Hoa"},{"name":"Ka-Wai Kam"},{"name":"Tony Leondis"},{"name":"Toa Fraser"},{"name":"Alex SmithAndrew J. Smith"},{"name":"Yasuhiro Kawamura"},{"name":"Yuzo Asahara"},{"name":"Giả Khải"},{"name":"Depoyan Manuk"},{"name":"Rick Bieber"},{"name":"Don Mancini"},{"name":"Andrés Muschietti"},{"name":"Joe Miale"},{"name":"Chayanop Boonprakob"},{"name":"Nikolaj Arcel"},{"name":"Topel Lee"},{"name":"Ritesh Batra"},{"name":"Hyo-jin Kang"},{"name":"Matt Drummond"},{"name":"Taylor Sheridan"},{"name":"Mark Palansky"},{"name":"Sam Claflin"},{"name":"Darren Grant"},{"name":"Rich Ragsdale"},{"name":"Dương Lỗi"},{"name":"Taran Killam"},{"name":"Lý Hồng Kiến"},{"name":"Takeshi Furusawa"},{"name":"Lucia Aniello"},{"name":"Burlee VangAbel Vang"},{"name":"Tatsuma Minamikawa"},{"name":"Brian Fee"},{"name":"Jonathan MilottCary Murnion"},{"name":"Trey Edward Shults"},{"name":"Gregory Plotkin"},{"name":"William Oldroyd"},{"name":"Bong Joon Ho"},{"name":"Park Chul-Soo"},{"name":"Jussi Hiltunen"},{"name":"Quách Tử Kiện"},{"name":"Takashi Otsuka"},{"name":"Edward Neumeier"},{"name":"Lee Sa-Rang"},{"name":"Cho Jung-Rae"},{"name":"Byung-gil Jung"},{"name":"Lee Tim"},{"name":"Gabriela Cowperthwaite"},{"name":"Trương Kỷ Trung"},{"name":"J.d. Dillard"},{"name":"Allan Harmon"},{"name":"Richie Keen"},{"name":"Paul Currie"},{"name":"Leste Chen"},{"name":"Colin Theys"},{"name":"Kwak Ji-Kyun"},{"name":"Lưu Gia Lương"},{"name":"Matt Eskandari"},{"name":"Jon Watts"},{"name":"Jeffrey Lau"},{"name":"Patty Jenkins"},{"name":"Aaron Woodley"},{"name":"Khưu Lễ Đào"},{"name":"Jonathan Baker"},{"name":"Alex Kurtzman"},{"name":"Jin Hao"},{"name":"Atsushi Takahashi"},{"name":"Mark Cullen"},{"name":"Conor Allyn"},{"name":"Sha Xuezhou"},{"name":"Tomohiko Ito"},{"name":"Junya Sato"},{"name":"Lưu Huỳnh"},{"name":"Julia Ducournau"},{"name":"Deven Bhojani"},{"name":"Hiroyuki Seshita"},{"name":"Espen SandbergJoachim Rønning"},{"name":"David Leveaux"},{"name":"Wang Li"},{"name":"Blayne Weaver"},{"name":"Shen Xi"},{"name":"John MacCarthyJohn MacCarthy"},{"name":"Lê Kế Cường"},{"name":"Từ Phi"},{"name":"Phil Volken"},{"name":"Toshiyuki KubookaMichael Sinterniklaas"},{"name":"Toby Genkel"},{"name":"Tống Khiếu"},{"name":"Peter Malota"},{"name":"Toshiyuki Kubooka"},{"name":"Alex Merkin"},{"name":"Claude Barras"},{"name":"Cate Shortland"},{"name":"François Ozon"},{"name":"Jonathan Mostow"},{"name":"Minh Đạo"},{"name":"Đào Hải"},{"name":"Feng Baoning"},{"name":"Ry Russo-Young"},{"name":"Steve Beck"},{"name":"Kim Bong-han"},{"name":"Eon-hie Lee"},{"name":"S.s. Rajamouli"},{"name":"Quách Đại Lôi"},{"name":"Nick Jongerius"},{"name":"Nacho Vigalondo"},{"name":"Jack Fessenden"},{"name":"Lưu Quốc Nam"},{"name":"Ash Brannon"},{"name":"Robert Kirbyson"},{"name":"Pierre Coré"},{"name":"Hồng Thăng Dương"},{"name":"Jesse Gustafson"},{"name":"Adam Leon"},{"name":"Svyatoslav Podgayevskiy"},{"name":"Gi Dae-ho"},{"name":"Sean Foley"},{"name":"Tom Sands"},{"name":"Fernando Coimbra"},{"name":"Minoru Mizoguchi"},{"name":"Ngụy Ngọc Hải"},{"name":"Olivier Assayas"},{"name":"Martin Koolhoven"},{"name":"Jeremy GillespieSteven Kostanski"},{"name":"Diệp Vĩ Dân"},{"name":"Hồ Tuyết Hoa"},{"name":"Aaron Kim"},{"name":"Abhinay Deo"},{"name":"Từ Gia Huy"},{"name":"Eric D. Howell"},{"name":"David SalzbergChristian Tureaud"},{"name":"Ahn Yong-Hoon"},{"name":"Stephen Gaghan"},{"name":"Dean Israelite"},{"name":"Jordan Peele"},{"name":"Steven Shainberg"},{"name":"Shaad Ali"},{"name":"Aaron HannMario Miscione"},{"name":"Cao Hy Hy"},{"name":"Naruhide Mizuta"},{"name":"Lý Uyên"},{"name":"Ohtomo Keishi"},{"name":"Salamat Mukhammed-Ali"},{"name":"George Mendeluk"},{"name":"Eric SummerEric Warin"},{"name":"Hàn Hàn"},{"name":"Sevé Schelenz"},{"name":"Satoshi Kuwabara"},{"name":"Phil Gorn"},{"name":"Đàm Tiếu"},{"name":"John Hamburg"},{"name":"Johnny Martin"},{"name":"Từ Sĩ Hưng"},{"name":"Joo-young LeeZoo-Young Lee"},{"name":"Robert Dyke"},{"name":"Joey Klein"},{"name":"Gaelan Connell"},{"name":"Michael Mann"},{"name":"Park Kwang Hyun"},{"name":"Quách Tại Dung"},{"name":"Karyn Kusama,Roxanne Benjamin,St. Vincent,Jovanka Vuckovic"},{"name":"Chris Nahon"},{"name":"Ajay Devgn"},{"name":"Stewart Sparke"},{"name":"Chris McKay"},{"name":"Damien MacéAlexis Wajsbrot"},{"name":"Carles Torrens"},{"name":"Fedor Bondarchuk,Oleg Malovichko"},{"name":"David Feiss"},{"name":"Lin Yuhsien"},{"name":"Kwok Shing Lo"},{"name":"Julie Estelle"},{"name":"David Hendrawan"},{"name":"Chelsea Islan"},{"name":"Epy Kusnandar"},{"name":"Zack Lee"},{"name":"Sunny Pang"},{"name":"Very Tri Yulisman"},{"name":"Eom Tae Hwa"},{"name":"Emilis Velyvis"},{"name":"Kevin Breslin"},{"name":"Trần Ngọc Huân"},{"name":"David Frankel"},{"name":"Fabio GuaglioneFabio Resinaro"},{"name":"Macon Blair"},{"name":"Tony Elliott"},{"name":"Adam Randall"},{"name":"Farren Blackburn"},{"name":"Barry Jenkins"},{"name":"Jesse Holland"},{"name":"Thomas J. Churchill"},{"name":"Alberto RodríguezNacho La Casa"},{"name":"Abe Noriyuki"},{"name":"Ashley Pearce"},{"name":"Patrick Durham"},{"name":"Garth Davis"},{"name":"Đinh Thịnh"},{"name":"Aleksey Tsitsilin"},{"name":"Song Min-Gyu"},{"name":"Yasushi KawamuraKeiichi Saitô"},{"name":"Châu Tinh TrìTừ Khắc"},{"name":"Park Jong Woo"},{"name":"Kim Tae-Gon"},{"name":"Kim Druzhinin"},{"name":"F. Javier Gutiérrez"},{"name":"Lâm Lĩnh Đông"},{"name":"Hong Ji-young"},{"name":"Ju Ji Hong"},{"name":"Stanley Tong"},{"name":"Jian Yong Guo"},{"name":"Min Gyoo Dong"},{"name":"Nhĩ Đông Thăng"},{"name":"Mike MitchellWalt Dohrn"},{"name":"Alex BrewerBenjamin Brewer"},{"name":"Martin Owen"},{"name":"Kwon Soo-Kyung"},{"name":"Benny Boom"},{"name":"Colm McCarthy"},{"name":"Trần Ngọc Giàu"},{"name":"Sheldon Wilson"},{"name":"G.J. Echternkamp"},{"name":"Michael Dudok de Wit"},{"name":"Hiroaki Miyamoto"},{"name":"D.J. Caruso"},{"name":"Sebastian Gutierrez"},{"name":"Artyom Aksenenko"},{"name":"Greg Mottola"},{"name":"Stewart Hendler"},{"name":"Đới Duệ"},{"name":"Huck Botko"},{"name":"Denis Chernov"},{"name":"Steve Carr"},{"name":"Ngô Phẩm Nho"},{"name":"Sean Ellis"},{"name":"Anna Foerster"},{"name":"Neal Wu"},{"name":"Tom Mcgrath"},{"name":"Jonathan Jakubowicz"},{"name":"Howard J. Ford"},{"name":"Jake Szymanski"},{"name":"Garth Jennings"},{"name":"Lâm Đức Lộc"},{"name":"Devon Downs,Kenny Gage"},{"name":"Thanakorn Pongsuwan"},{"name":"Ron Clements và John Musker"},{"name":"Jonás Cuarón"},{"name":"Greg Tiernan,Conrad Vernon"},{"name":"Jeremy Profe"},{"name":"Lưu Trấn Vỹ"},{"name":"Daniel Ragussis"}]

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = [{"name":"Cơ Trưởng Sully","viewUrl":"https://phim3s.pw/phim-le/co-truong-sully_9407/xem-phim/","nameOrigin":"Sully","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-truong-sully-sully-2016.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Clint Eastwood"],"actors":["Tom Hanks"],"genres":["Phim Chiến Tranh","Phim Phiêu Lưu","Phim Khoa học Tài liệu","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":100,"viewsCount":5312235,"uploaderName":"Ong Thi Van","desc":"Phim Cơ Trưởng Sully - Sully xoang quanh câu truyện cơ trưởng \"Sully\" Sullenberger đáp chiếc máy bay trong tình trạng động cơ tê liệt hoàn toàn xuống con sông Hudson mà hơn 150 hành khách không một ai bị thiệt mạng . Tuy nhiên, trong khi Sully được công chúng và truyền thông tung hô như một anh hùng bởi tài nghệ chưa từng thấy từ trước đến nay, thì một cuộc điều tra được tiến hành có khả năng hủy hoại hoàn toàn danh tiếng cũng như sự nghiệp của ông.","tags":["cơ trưởng sully","phim cơ trưởng sully","xem phim cơ trưởng sully","cơ trưởng sully 2016","cơ trưởng sully vietsub","cơ trưởng sully thuyết minh","cơ trưởng sully phụ đề","cơ trưởng sully full hd","cơ trưởng sully trọn bộ","cơ trưởng sully bản đẹp","sully","phim sully","sully 2016","xem phim sully","sully vietsub","sully thuyết minh","sully phụ đề","sully full hd","sully trọn bộ","sully bản đẹp"],"embeds":[{"label":"360p","file":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1554389633&rver=6.7.6643.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152385%26authkey%3DANWZfSEQu1YS76Q&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","file_o":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1554389633&rver=6.7.6643.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152385%26authkey%3DANWZfSEQu1YS76Q&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","type":"mp4","default":"true"}],"backups":["http://topanimehd.com/getid.php?id=MXhKNjFJMG01ckJfek44VGZ0bTFBOXFSSlUxa1I1R1UwOXBQamVF&sub=http://topphimhd.com/wp-content/uploads/2018/11/Sully.2016.1080p.BluRay.x264-SPARKS.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/11/Sully.2016.1080p.BluRay.x264-SPARKS.srt"},{"name":"Ám Ảnh Kinh Hoàng 2","viewUrl":"https://phim3s.pw/phim-le/am-anh-kinh-hoang-2_9155/xem-phim/","nameOrigin":"The Conjuring 2","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fam-anh-kinh-hoang-2-the-conjuring-2-2016.jpg%3Fsize%3D300","resolutionText":"HD VietSub + Thuyết Minh","directors":["James Wan"],"actors":["Vera Farmiga","Patrick Wilson","Frances O'Connor","Madison Wolfe","Simon McBurney","Franka Potente"],"genres":["Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":110,"viewsCount":9710505,"uploaderName":"Ong Thi Van","desc":"The Conjuring 2: The Enfield Poltergeist tiếp tục dựa trên một trong 10000 hồ sơ điều tra của cặp vợ chồng Warren. Đây là vụ án kỳ bí nhất được ghi nhận trong lịch sử siêu nhiên.Chuyện phim diễn ra vào cuối thập niên 70 tại vùng Enfield nước Anh. Nơi mà người mẹ đơn thân Hodgson sống cùng 4 đứa con gái của mình. Bọn trẻ bị các thế lực siêu nhiên tà ác ác quấy nhiễu liên tục. Bà mẹ đành phải nhờ đến sự giúp đỡ của hai nhà ngoại cảm Ed và Lorraine Warren đến điều tra để giải cứu con mình.","tags":["the conjuring","ám ảnh kinh hoàng 2","the conjuring 2","xem phim ám ảnh kinh hoàng 2","ám ảnh kinh hoàng 2 bản đẹp","ám ảnh kinh hoàng 2 vietsub","ám ảnh kinh hoàng 2 2016","ám ảnh kinh hoàng 2 phụ đề","ám ảnh kinh hoàng 2 thuyết minh","xem phim the conjuring 2","the conjuring 2 2016","the conjuring 2 vietsub","the conjuring 2 thuyết minh","the conjuring 2full hd","the conjuring 2 bản đẹp","the conjuring 2 phụ đê"],"backups":["http://topanimehd.com/getid.php?id=MVBobGdQMzk1U2h4UFpjSmVoTHBFdWhabkpxckRmaW1ZRzVtOExr&sub=http://topphimhd.com/wp-content/uploads/2018/06/The-Conjuring-2-2016-AllBluray-WorldSubTeam.com_.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/The-Conjuring-2-2016-AllBluray-WorldSubTeam.com_.srt"},{"name":"Anh Hùng Cương Dương","viewUrl":"https://phim3s.pw/phim-le/anh-hung-cuong-duong_9185/xem-phim/","nameOrigin":"The Virgin Psychics","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fanh-hung-cuong-duong-the-virgin-psychics-2015.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Sion Sono"],"actors":["Motoki Fukami","Elaiza Ikeda","Megumi Kagurazaka"],"genres":["Phim Hài Hước"],"country":{"name":"Nhật Bản"},"duration":114,"viewsCount":5852940,"uploaderName":"Nguyen tan trung","desc":"The Virgin PsychicsCâu chuyện hài giả tưởng này kể về một nam sinh trung học (còn nguyên tem) bình thường tên là Yoshiro “Yocchan” Kamogawa (do Sometani thủ vai). Cuộc đời cậu đã thay đổi hoàn toàn sau một đêm, khi cậu thức dậy với khả năng đọc được suy nghĩ của người khác. Yoshiro không phải người duy nhất trong thị trấn có siêu năng lực.Teru-oichan (hẳn nhiên là vẫn chưa bị bóc mác), nhân viên của một tiệm cà phê gần trường Yoshiro, có được khả năng di chuyển đồ vật, nhưng anh chỉ toàn dùng để di chuyển sex toy. Yosuke Enomoto (chắc là vẫn còn tem), học sinh năm cuối và là cựu thành viên của đội bóng rổ, cùng trường Yoshiro, có được khả năng dịch chuyển tức thời, nhưng chỉ khi đang trong trạng thái không mảnh vải che thân.","tags":["the virgin psychics","anh hùng cương dương"],"embeds":"<iframe width=\"100%\" height=\"100%\" src=\"https://drive.google.com/file/d/0Bwkrc-cZmu4bUDNETE01aXNfTkU/preview\" frameborder=\"0\" allowfullscreen></iframe>","backups":["http://topanimehd.com/getid.php?id=MUhIalVUcWJTc0YwOFNoZktGVUE5bVNxdUZOU0tMNklMYkd6aHBk&sub=http://topphimhd.com/wp-content/uploads/2018/08/The.Virgin.Psychics.2015.720p.BluRay.x264-WiKi.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/08/The.Virgin.Psychics.2015.720p.BluRay.x264-WiKi.srt"},{"name":"Người Vận Chuyển 2","viewUrl":"https://phim3s.pw/phim-le/nguoi-van-chuyen-2_437/xem-phim/","nameOrigin":"The Transporter 2","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-van-chuyen-2-the-transporter-2-2005.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Louis Leterrier"],"actors":["Jason Stathammber Valletta"],"genres":["Phim Hành Động","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":88,"viewsCount":11556390,"uploaderName":"dung","desc":"Sau khi nghỉ hưu ở Miami, cưu nhân viên của Lực lượng đặc biệt, Frank Martin hành nghề tài xế cho gia đình giàu có Billings. Frank được 2 cậu nhóc của gia đình đó rất thần tượng và yêu mến. Khi 2 cậu bé bị bắt cóc tống tiền anh đã 1 mình hành động mà không báo cảnh sát để giải cứu 2 người bạn nhỏ đó.","tags":["người vận chuyển","the transporter","người vận chuyển 2","the transporter 2","jason statham","trọn bộ người vận chuyển phim người vận chuyển","thuyết minh người vận chuyển","phim lẻ","phim hành động mỹ","phim lẻ hay"],"backups":["http://topanimehd.com/getid.php?id=MW5uMElpaFJDaDZ0SVhfVjRCM1JWdXFSMTkyOGhzMXJJRTQwOWJL&sub=http://topphimhd.com/wp-content/uploads/2018/04/Transporter.2.2005.1080p.BluRay.DTS_.x264-xander.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/04/Transporter.2.2005.1080p.BluRay.DTS_.x264-xander.srt"},{"name":"Người Vận Chuyển 3","viewUrl":"https://phim3s.pw/phim-le/nguoi-van-chuyen-3_438/xem-phim/","nameOrigin":"The Transporter 3","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-van-chuyen-3-the-transporter-3.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Olivier Megaton"],"actors":["Jason Statham","Robert Knepper","Mike Powers"],"genres":["Phim Hành Động","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":110,"viewsCount":12317745,"uploaderName":"tran quang ha","desc":"Trong Transporter 3, Frank Martin chịu nhiều sức ép trong việc hộ tống Valentina, cô con gái bị bắt cóc của Leonid Vasilev, người đứng đầu Cơ Quan Bảo Vệ Môi Trường của Ukraine, suốt chặng đường dài từ Marseilles đến Stuttgart và Budapest, trước khi dừng lại ở Odessa, Biển Đen.Suốt quãng đường đi, dù nhận được sự giúp đỡ của Thanh tra Tarconi, Frank liên tục phải đấu tranh với những người đã ép buộc anh phải nhận lấy công việc này, những tay chân của Vasilev được gửi đến để ngăn cản anh cùng sự bất hợp tác của Valentina. Bất chấp thái độ hoài nghi của Valentina, Frank và cô gái cuối cùng cũng đã chịu kết hợp cùng nhau trong lúc cả hai đang cố gắng thoát khỏi những tình huống đe dọa tính mạng của chính mình liên tiếp ập đến.","tags":["người vận chuyển","the transporter","người vận chuyển 3","the transporter 3","jason statham","trọn bộ người vận chuyển phim người vận chuyển","thuyết minh người vận chuyển","phim lẻ","phim hành động mỹ","phim lẻ hay"],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MUNETnVoUjc1SDVoVkVadEk5WU1WbFJkbmhaTTB6b3R4aTZJRGt3&sub=http://topphimhd.com/wp-content/uploads/2018/04/Transporter.3.2008.1080p.BluRay.DTS_.x264-xander.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/04/Transporter.3.2008.1080p.BluRay.DTS_.x264-xander.srt"},{"name":"Phù Thủy","viewUrl":"https://phim3s.pw/phim-le/phu-thuy_9128/xem-phim/","nameOrigin":"The Witch","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphu-thuy-the-witch-2017.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Robert Eggers"],"actors":["Anya Taylor Joy","Ralph Ineson","Kate Dickie"],"genres":["Phim Kinh Dị","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":92,"viewsCount":6049335,"uploaderName":"nguyen an binh","desc":"","tags":["the witch","phù thủy","phù thủy 2015","phù thủy 2016"],"backups":["http://topanimehd.com/getid.php?id=MWVwR3YwUUFuc1daaXBwYk84ZFZ0a2RhM1N4NjR6T1c1MkZYazFs&sub=http://topphimhd.com/wp-content/uploads/2018/06/The.Witch_.2015.720p.BluRay.x264-DRONES.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/The.Witch_.2015.720p.BluRay.x264-DRONES.srt"},{"name":"Lão Pháo Nhi","viewUrl":"https://phim3s.pw/phim-le/lao-phao-nhi_8910/xem-phim/","nameOrigin":"Mr.Six","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Flao-phao-nhi-mrsix-2015.jpg%3Fsize%3D300","resolutionText":"HD Thuyết Minh","directors":["Guan Hu"],"actors":["Trương Hàm Dư","Lý Dịch Phong","Hứa Tình","Ngô Diệc Phàm","Phùng Tiểu Cương"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"country":{"name":"Trung Quốc"},"duration":136,"viewsCount":6406935,"uploaderName":"K-Drama","desc":"Phim Lã Pháo Nhi khai thác đề tài thế lực mafia, xã hội đen ngầm tại Trung Quốc. Phim kể về cuộc đối chọi giữa những thế lực ngầm với nhau. Trong đó, Lục Gia là trùm thế lực ngầm cũ tại Bắc Kinh. Sau nhiều năm lăn lộn, ông không thích ứng được với sự thay đổi của thời thế nên đã chọn một cuộc sống an nhàn. Nào ngờ, người con trai độc nhất của Lục Gia là Hiểu Ba (Lý Dịch Phong) lại có xích mích với người cầm đầu thế lực mới Tiểu Phi (Ngô Diệc Phàm).","tags":["lão pháo nhi","mr six"],"embeds":"<iframe width=\"100%\" height=\"100%\" src=\"https://drive.google.com/file/d/0B_gEN6DEGR8JZHp1T3hnUWRjVTQ/preview\" frameborder=\"0\" allowfullscreen></iframe>","backups":["http://topanimehd.com/getid.php?id=MXM5NjNRQVYzdW9WQ0FDMXlKdnVWSnFmLUdrWTVVdF9BbHhja1pa&sub=http://topphimhd.com/wp-content/uploads/2018/11/Mr-Six-2015-720p-BluRay-x264-WiKi.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/11/Mr-Six-2015-720p-BluRay-x264-WiKi.srt"},{"name":"Tinh Võ Anh Hùng","viewUrl":"https://phim3s.pw/phim-le/tinh-vo-anh-hung_201/xem-phim/","nameOrigin":"Fist of Legend","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftinh-vo-anh-hung-fist-of-legend-1994.jpg%3Fsize%3D300","resolutionText":"Trần Gia Thượng","directors":["Lý Liên Kiệt"],"actors":["Phim Võ Thuật"],"genres":[""],"country":{"name":"Trung Quốc"},"duration":103,"viewsCount":9508950,"uploaderName":"Nguyễn Thị Sa","desc":"Tác phẩm được làm lại từ bộ phim kinh điển \"Fist of Fury\" của Lý Tiểu Long. Lấy bối cảnh vào những năm 1930, Lý Liên Kiệt vào vai một học sinh trở về sau những năm du học tại Nhật để điều tra những kẻ đã giết sư phụ mình. Năm 1937, Chen Zhen (Lý Liên Kiệt), một sinh viênTrung Quốc trở về từ Tokyo, nơi mà chủ nghĩa phát xít đã trở nên cuồng bạo. Anh tìm về trường võ thuật của mình trước kia tại Thượng Hải và anh được báo tin rằng người thầy dạy của mình là Huo Yuan Jia đã bị giết chết trong một trận đấu với một trường dạy võ karate cạnh tranh.Chen Zhen biết rất rõ khả năng và sức mạnh của sư phụvà chắc chắn rằng ông không thể bị giết chết một cách dễ dàng, nếu nhưkhông có những thủ đoạn xấu xa ẩn giấu sau cuộc chiến này. Anh quyếttâm tìm cho ra những kẻ đã giết chết sư phụ. Trong quá trình điều tra,Chen Zhen đã phát hiện ra rằng kẻ cầm đầu băng nhóm kia chính là GoFujita (Billy Chow), một quân nhân người Nhật, cùng với một nhóm võsinh của trường võ thuật đối thủ.Chen Zhen yêu cầu khám nghiệm lại xác của sư phụ và phát hiện ra dấu vết của chất độc tồn tại trong gan chứng tỏ những nghi ngờ của anh là có cơ sở. Với sự trợ giúp của võ sư người Nhật FumioFunakoshi (Yasuaki Kurata), con trai của sư phụ là Huo Ting En (ChinSiu Hou), cũng như sự giúp đỡ tận tâm của cô bạn gái người Nhật MitsukoYamada (Shinobu Nakayama), Chen Zhen đã hoàn thành nhiệm vụ báo thù chothày dạy của mình.Khi thực hiện bộ phim này, đạo diễn Gordon Chan đãnói rằng: “Cũng như rất nhiều người, tôi là một fan của Lý Tiểu Long.Việc so sánh Lý Liên Kiệt với huyền thoại võ thuật này là một điều thú vị. Nhưng dù sao thì đây cũng không thực sự là một sự so sánh vì hai bộphim không cùng một kịch bản. Mà kịch bản gốc đã được sửa đổi khá nhiềuđể phù hợp hơn với Lý Liên Kiệt. Đó là một công việc rất lý thú.”Báo thù, một nền tảng chắc chắn của một kịch bản tuy không sáng giá nhưng rõ ràng là rất hiệu quả. Mặt khác, tình yêu khókhăn giữa Chen Zhen và cô gái người Nhật trong một hoàn cảnh đầy bất trắc và hiểm nguy càng khiến cho bộ phim thêm kịch tính. Đặc biệt, với một bộ phim có sự góp mặt của Lý Liên Kiệt, sự chú ý luôn nằm trongnhững pha hành động đẹp mắt và rất thuyết phục. Những trận đấu trongphim là sự pha trộn giữa thể loại wushu khó nhằn và môn karate năngđộng đầy ấn tượng.Nhưng vẫn có những lỗi dễ nhận thấy gây hạn chế phầnnào cho thành công của bộ phim: việc lồng tiếng đã thổi phồng quá mứchiệu quả tiếng động của những cú đấm, hình ảnh thiếu độ nét, những tình tiết hài hước xen kẽ thiếu thuyết phục. Mặc dù vậy Fist of Legend vẫn là một bộ phim hành động đáng xem dành cho các fan của thể loại nàycũng như những ai hâm mộ tài năng của Lý Liên Kiệt. Đặc biệt, phim cònnằm trong danh sách 10 bộ phim võ thuật kung fu hay nhất của màn ảnhHoa ngữ cùng với những bộ phim đình đám như Ngọa hổ tàng long hay Police Story.Đánh giá khác:Không giống như những bộ phim được thực hiện tại Hollywood, những bộ phim của Lý Liên Kiệt tại Hong Kong được đánh giá rất cao. Một trong số này là Fist of legend (Tinh võ môn). Đây là bộ phim là lại từ tác phẩm Fist of fury nổi danh của Lý Tử Long và nó được coi là một trong những bộ phim võ thuật hay nhất mọi thời đại cũng như là hay nhất của Lý Liên Kiệt.Bối cảnh của phim là thành phố Thượng Hải năm 1937 trong thời kì chiến tranh Trung-Nhật lần thứ 2. Lúc này Thượng Hải đang bị quân Nhật chiếm đóng. Trần Chân (Lý Liên Kiệt), một công dân Thượng Hải, đang học tại Nhật thì nghe tin sư phụ của mình là Hoắc Nguyên Giáp, người đứng đầu Tinh võ môn, bị giết chết trong một trận thách đấu với một võ sĩ Nhật Bản. Trần Chân ngay lập tức trở về nước chịu tang thầy và tìm hiểu rõ sự việc.Tại Thượng Hải, sau khi về trường Tinh võ để chịu tang thầy, Trần Chân tìm tới nơi dạy võ của Akutagawa Ryoichi, võ sĩ Nhật đã giết chết Hoắc Nguyên Giáp. Sau khi giao đấu, Trần Chân nhận thấy trình độ của Ryoichi không thể là đối thủ của thầy mình vì thế anh cho khai quật mộ của thầy và nhờ bác sĩ khám nghiệm tử thi. Qua xét nghiệm, bác sĩ kết luận Hoắc Nguyên Giáp bị đầu độc. Kết luận này khiến nội bộ Tinh võ môn nảy sinh nghi ngờ lẫn nhau.Cùng lúc đó, biết trận đấu của mình với Hoắc Nguyên Giáp đã bị dàn xếp, Ryoichi phản ứng với Fujta, một sĩ quan quân tội và là kẻ chủ mưu, và bị Fujita giết chết. Để dẹp yên mọi chuyện, Fujita đổ vấy cho Trần Chân tội sát hại Ryoichi. Trần Chân bị bắt vào tù và bị đem ra xét xử. Quá trình điều tra kẻ thực sự giết hại sư phụ của Trần Chân xuất hiện nhiều tình huống mới…Kịch bản của Fist of legend không quá phức tạp nhưng nó vẫn có những yếu tố hấp dẫn, những đoạn cao trào, những nút thắt mở. Ví dụ như khi Trần Chân phải ra tòa thì đúng lúc đó cô bạn gái người Nhật xuất hiện, khai man trước tòa để Trần Chân thoát tội. Không chỉ là sự báo thù của Trần Chân trước cái chết của thầy mình mà ẩn đằng sau đó là tinh thần kháng Nhật của người Trung Quốc trong thời kì này. Đan xen trong đó là mối tình ngang trái giữa Trần Chân và một cô gái Nhật khi mà Trần Chân phải lựa chọn cô gái và Tinh võ môn và khi mà anh bị tẩy chay ở mọi nơi vì có bạn gái là người Nhật. Trong phim cũng có một vài tình huống và nhân vật hài hước trong nhiều phim võ thuật khác của Hong Kong như nhân vật đội trưởng cảnh sát hay chi tiết bác sĩ pháp y lại sợ tiếp xúc với tử thi.Vì là phim hành động võ thuật nên phần quan trọng nhất là các cảnh đánh nhau, đấu võ. Với tài chỉ đạo võ thuật của Yuen Woo Ping cộng với khả năng của các diễn viên, đặc biệt là Lý Liên Kiệt, những cảnh đánh võ trong phim rất chân thực và sống động. Thêm vào đó là góc độ và việc dừng máy đúng lúc khiến các cảnh đấu võ gần như là hoàn hảo.Trong các bộ phim kiểu như thế này, diễn xuất của các diễn viên không được chú ý quá nhiều và không bị đòi hỏi cao. Lý Liên Kiệt vẫn yêu trong những cảnh đòi hỏi nhiều diễn xuất nội tâm, nhưng ở các cảnh cần sự cương nghị, căm giận, dũng mãnh anh lại diễn rất khá. Các diễn viên khác tròn vai, không có gì đáng kể. Ngoài ra, Lý Liên Kiệt trông điển trai hơn chứ không xù xì nhưng nhiều vai diễn gần đây khi mà dấn ấn tuổi tác đã hiện rõ (đặc biệt là gương mặt).Nói tóm lại, đây là một bộ phim mà những fan phim võ thuật và phim Hong Kong không thể bỏ qua.Screens:","tags":["lý liên kiệt","jet li","tinh võ anh hùng","fist of legend"],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MWlhRDQ3ZklPdEZ2QW1yUGVKczJ1OHRGMmNzeDVWLUFkSVVuTmtX&sub=http://topphimhd.com/wp-content/uploads/2018/09/Fist-Of-Legend-1994-1080p-UK-Blu-ray-AVC-DTS-HD-MA-5.1.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/09/Fist-Of-Legend-1994-1080p-UK-Blu-ray-AVC-DTS-HD-MA-5.1.srt"},{"name":"Chiến Binh Săn Phù Thủy","viewUrl":"https://phim3s.pw/phim-le/chien-binh-san-phu-thuy_8746/xem-phim/","nameOrigin":"The Last Witch Hunter","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchien-binh-san-phu-thuy-the-last-witch-hunter-2016.jpg%3Fsize%3D300","resolutionText":"HD Vietsub + Thuyết Minh","directors":["Breck Eisner"],"actors":["Vin Diesel","Rose Leslie","Elijah Wood"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":106,"viewsCount":10420470,"uploaderName":"trantuankhoa","desc":"Dựa trên một trong những kịch bản chuyển thể hấp dẫn nhất do trang web uy tín Blacklist bình chọn năm 2010, CHIẾN BINH SĂN PHÙ THỦY (THE LAST WITCH HUNTER) là sản phẩm mới nhất của hãng Summit, được nhào nặn dưới bàn tay đạo diễn “The Crazies” – Breck Eisner. Bộ phim đặt người xem vào bối cảnh thế giới bị lũng đoạn bởi sự hiện diện của tộc phù thuỷ. Cuộc chiến giữa chúng và những người thợ săn kéo dài hàng bao thế kỷ cho kết khi Kaulder (Vin Diesel) tiêu diệt được Nữ Hoàng (Julie Engelbrecht). Trước khi chết, mụ đã kịp nguyền rủa Kaulder với sự bất tử của chính mình, khiến anh mãi mãi rời xa vợ con, sống một cuộc sống cô độc kiếp này qua kiếp khác. Trở về với thế kỷ 21, Kaulder là thợ săn phù thuỷ duy nhất còn sót lại, vẫn tiếp tục tìm kiếm và tiêu diệt những sinh vật siêu nhiên chết người kia. Nhưng, anh không thể ngờ rằng, thủ lĩnh của chúng – Nữ Hoàng đã được hồi sinh và đang tìm cách trả thù loài người.Cùng góp mặt trong phim bên cạnh Vin Diesel là kiều nữ “Games of Throne” – Rose Leslie, ngôi sao “The Lords of The Ring” – Elijah Wood và nam diễn viên từng 2 lần giành tượng vàng Oscar – Michael Caine.","tags":["the last witch hunter","chiến binh săn phù thủy","thợ săn phù thuỷ","chiến binh săn phù thủy 2015"],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MXdvenNmM1QyOTlFTE1BdzZMaVhUbE9qM0dHcVZQelUzQTVpRHRC&sub=http://topphimhd.com/wp-content/uploads/2018/07/The.Last_.Witch_.Hunter.2015.720p.BluRay.DTS_.x264-HiDt.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/The.Last_.Witch_.Hunter.2015.720p.BluRay.DTS_.x264-HiDt.srt"},{"name":"Gương Quỷ","viewUrl":"https://phim3s.pw/phim-le/guong-quy_8721/xem-phim/","nameOrigin":"The Mirror","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fguong-quy-the-mirror-2015.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Pakphum Wonjinda"],"actors":["Hong Zhou","Eunsung Kim","Lee Chae young"],"genres":["Phim Kinh Dị","Phim Thuyết Minh"],"country":{"name":"Thái Lan"},"duration":101,"viewsCount":6398070,"uploaderName":"long ngu","desc":"Gương Quỷ 3D - Bộ phim là dự án hợp tác giữa Thái Lan, Hồng Kông và Hàn Quốc, ba ông trùm phim kinh dị châu Á.  Phim Gương Quỷ 3D kể kề câu chuyện diễn ra trong một căn hộ chung cư bí ẩn rùng rợn với những hình ảnh đáng sợ về số phận của một người phụ nữ đơn thân cô độc cùng một đứa trẻ côi cút.  Gương Quỷ được sáng tạo dựa trên quan niệm về mọi vật đều có một phản chiếu của chính mình bên kia tấm gương, chính vì vậy, những điều quỷ quyệt nhất, xấu xa nhất cũng cũng từ đó mà ra.  Từ yếu tố kinh dị dựa trên không gian ma mị kiểu Hồng Kông cho đến kiểu ám ảnh mang màu sắc tín ngưỡng của Thái Lan, và cuối cùng là hiệu ứng hồi hộp thót tim dựa trên sức ép tâm lí mà các nhà làm phim Hàn hay sử dụng, tất cả đều được thể hiện chân thực đến lạnh người trong Gương Quỷ.","tags":["phim tết","gương quỷ","the mirror","phim tết 2017","phim hay","phim tet","phim kinh dị","gương quỷ thuyết minh","thuyết minh gương quỷ","gương quỷ hd","gương quỷ vietsub","phim ma","phim gương quỷ","phim thái lan"],"backups":["http://topanimehd.com/getid.php?id=MURBY3ptS0ttSmRPbnBmR1o0cUZhS1pmTHQ3VWIwZDA2TTFITWo0&sub=http://topphimhd.com/wp-content/uploads/2018/07/Mirrors.2008.UNRATED.720p.BluRay.DTS_.x264-DON.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Mirrors.2008.UNRATED.720p.BluRay.DTS_.x264-DON.srt"},{"name":"Người Giải Mã","viewUrl":"https://phim3s.pw/phim-le/nguoi-giai-ma_8341/xem-phim/","nameOrigin":"The Imitation Game","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-giai-ma-the-imitation-game-2014.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["Morten Tyldum"],"actors":["Benedict Cumberbatch","Keira Knightley","Matthew Goode"],"genres":["Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":114,"viewsCount":9618735,"uploaderName":"Pham Quoc Dung","desc":"Trong thời kỳ Thế chiến II, quân Đức sử dụng máy Enigma để liên lạc nhờ sự bảo mật tối ưu của loại máy mã hóa ưu việt này. Từ những thông tin cơ bản như dự báo thời tiết trong ngày cho tới những thông điệp quan trọng như ý đồ tác chiến, vị trí đặt tàu, thời gian tiến hành chiến dịch… đều được phe Đức trao đổi sau khi đã mã hóa qua máy Enigma.Để có thể chiến thắng cuộc chiến này, việc giải mã Enigma là một nhiệm vụ tối quan trọng đối với phe Đồng Minh. Tại Anh, “điệp vụ bất khả thi” ấy được giao cho một nhóm nhà toán học, giải mật mã và kỳ thủ cờ vua tại trung tâm Bletchley Park. Tâm điểm của dự án tuyệt mật ấy là nhà toán học thiên tài lập dị Alan Turing (Benedict Cumberbatch thủ vai). The Imitation Game kể về cuộc đời của nhân vật được xem như cha đẻ của trí thông minh nhân tạo và khoa học máy tính hiện đại song lại có một kết cục bi thảm.Không đi theo tuyến tính thông thường, câu chuyện trong The Imitation Game là những lát cắt đan xen giữa ba thời điểm trong cuộc đời của Turing. Tác phẩm mở đầu vào năm 1952, khi cuộc chiến kết thúc và Turing bị bắt giam do có quan hệ đồng tính – một việc bị xem như phạm pháp lúc ấy. Trong cuộc hỏi cung, những mảnh ghép bí ẩn từ quá khứ của ông bắt đầu được ráp lại để vẽ nên chân dung về thiên tài không gặp thời này, từ khi ông còn là một cậu nhóc thường xuyên bị bắt nạt tại trường tư tới khi gia nhập đội giải mã tại Bletchley Park và trở thành “cá nhân có đóng góp lớn nhất giúp quân Đồng Minh có được chiến thắng” như nhận định của Churchill.","tags":["the imitation game","người giải mã"],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MXc1V2ZZU0J6ZnNIZExQbDR4R0pYaExmNno5ci10QklsTG1SdnRj&sub=http://topphimhd.com/wp-content/uploads/2018/07/The.Imitation.Game_.2014.720p.BluRay.x264.YIFY_.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/The.Imitation.Game_.2014.720p.BluRay.x264.YIFY_.srt"},{"name":"Tay Trống Cự Phách","viewUrl":"https://phim3s.pw/phim-le/tay-trong-cu-phach_8265/xem-phim/","nameOrigin":"Whiplash","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftay-trong-cu-phach-whiplash-2014.jpg%3Fsize%3D300","resolutionText":"Damien Chazelle","directors":["Miles Teller","J.K. Simmons","Melissa Benoist"],"actors":["Phim Tâm Lý","Phim Âm Nhạc"],"genres":[""],"country":{"name":"Mỹ"},"duration":107,"viewsCount":6588705,"uploaderName":"Muk","desc":"Chàng trai Andrew (Miles Teller) được nhận vào trường Shaffer, trường nhạc đỉnh nhất nước Mĩ. Tại đây, anh tham gia ban nhạc jazz của trường và phải đối mặt với Fletcher (Terence Fletcher), một chỉ huy dàn nhạc với yêu cầu cực kì khắt khe.","tags":["whiplash","tay trống cự phách"],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MWtNS3pDc1gtc1FwN2Q4d1ZxQUNEMkNUdTdtMHo0LURCUTNYc0xT&sub=http://topphimhd.com/wp-content/uploads/2018/07/Whiplash.2014.720p.BluRay.x264.YIFY_.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Whiplash.2014.720p.BluRay.x264.YIFY_.srt"},{"name":"Nòng Súng Trên Tay","viewUrl":"https://phim3s.pw/phim-le/nong-sung-tren-tay_8237/xem-phim/","nameOrigin":"By the Gun","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnong-sung-tren-tay-by-the-gun-2014.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["James Mottern"],"actors":["Tully Banta Cain","Ben Barnes","Paul Ben Victo"],"genres":["Phim Hình Sự","Phim Tâm Lý"],"country":{"name":"Mỹ"},"duration":110,"viewsCount":6932970,"uploaderName":"lehoangtan","desc":"","tags":["by the gun","nòng súng trên tay"],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MTZVRXlycmVEWjFKMkxsUXlfZUl3cEczbUlsQWhCNGpNZXdZMVQw&sub=http://topphimhd.com/wp-content/uploads/2018/07/By_the_Gun_2014_1080p_BluRay_AC3_S_ViE_VIE.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/By_the_Gun_2014_1080p_BluRay_AC3_S_ViE_VIE.srt"},{"name":"Cuồng Nộ","viewUrl":"https://phim3s.pw/phim-le/cuong-no_8184/xem-phim/","nameOrigin":"Fury","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuong-no-fury-2014.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["David Ayer"],"actors":["Brad Pitt","Shia LaBeouf","Logan Lerman"],"genres":["Phim Hành Động","Phim Chiến Tranh"],"country":{"name":"Mỹ"},"duration":134,"viewsCount":15788685,"uploaderName":"ho anh khoa","desc":"Đặt bối cảnh vào giai đoạn cuối của cuộc Chiến tranh Thế giới lần thứ II, 04/1945, “Fury” theo chân chiến binh dày dạn kinh nghiệm chiến trường Wardaddy (Brad Pitt), người chỉ huy một chiếc xe tăng chủ lực Sherman của Anh và đội hình chiến đấu 5 người trong một nhiệm vụ cực kỳ nguy hiểm luồn sâu tập kích đằng sau chiến tuyến của quân thù. Bị áp đảo bởi số lượng và hỏa lực từ kẻ thù, Wardaddy và các đồng đội phải đối mặt với vô vàn khó khăn nguy hiểm bằng một cố gắng phi thường nhằm đánh thẳng vào trái tim của Đức Quốc Xã.","tags":["fury","cuồng nộ"],"backups":["http://topanimehd.com/getid.php?id=MXZpSjQzWWp2dDYtUGhLVWw2RmNvcXZIdTJXdzg2elRyMjc2ODNS&sub=http://topphimhd.com/wp-content/uploads/2018/07/Fury-2014-Vie-All-Bluray.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Fury-2014-Vie-All-Bluray.srt"},{"name":"Cô Gái Mất Tích","viewUrl":"https://phim3s.pw/phim-le/co-gai-mat-tich_8160/xem-phim/","nameOrigin":"Gone Girl","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-gai-mat-tich-gone-girl-2014.jpg%3Fsize%3D300","resolutionText":"Bản Đẹp","directors":["David Fincher"],"actors":["Ben Affleck","Rosamund Pike","Neil Patrick Harris"],"genres":["Phim Phiêu Lưu","Phim Kinh Dị","Phim Tâm Lý"],"country":{"name":"Mỹ"},"duration":149,"viewsCount":8507385,"uploaderName":"nam","desc":"","tags":["gone girl","cô gái mất tích"],"backups":["http://topanimehd.com/getid.php?id=MVhMQkczakc5UG9KNUlYNHV5OVZTMkZUaWh5ejZvNTBESEVHY09U&sub=http://topphimhd.com/wp-content/uploads/2018/07/Gone.Girl_.2014.720p.BluRay.x264.DTS-WiKi.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Gone.Girl_.2014.720p.BluRay.x264.DTS-WiKi.srt"},{"name":"Khách Sạn Huyền Bí 3: Kỳ Nghỉ Ma Cà Rồng","viewUrl":"https://phim3s.pw/phim-le/khach-san-huyen-bi-3-ky-nghi-ma-ca-rong_11298/xem-phim/","nameOrigin":"Hotel Transylvania 3: Summer Vacation","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkhach-san-huyen-bi-3-ky-nghi-ma-ca-rong-hotel-transylvania-3-summer-vacation-2018.jpg%3Fsize%3D300","resolutionText":"HD Vietsub + Thuyết Minh","directors":["Genndy Tartakovsky"],"actors":["Steve Buscemi","Selena Gomez","Adam Sandler","Kevin James","Andy Samberg"],"genres":["Phim Hài Hước","Phim Hoạt Hình","Phim Viễn Tưởng","Phim Thiếu nhi"],"country":{"name":"Mỹ"},"duration":99,"viewsCount":581400,"uploaderName":"đạt","desc":"Phim Khách Sạn Huyền Bí 3: Kỳ Nghỉ Ma Cà Rồng lần này sẽ là “cuộc chơi lớn” với một phen tiệc tùng sang chảnh hết nấc của gia đình Dracula. Đã quá “ngán” với cường độ làm việc chăm chỉ 365 ngày không nghỉ, bá tước Dracula quyết định đòi “đình công”. Để khai sáng cho người cha trăm tuổi chưa bao giờ bước ra khỏi “lũy tre làng”, vợ chồng nhà Jonathan – Mavis lập một kế hoạch xả hơi táo bạo: Thuê đứt một du thuyền du lịch hạng sang để đưa tất thảy bộ xậu quái vật già trẻ lớn bé làm một chuyến ra khơi nhớ đời.Xem Khách Sạn Huyền Bí 1xem Khách Sạn Huyền Bí 2","tags":["khách sạn huyền bí","khách sạn huyền bí 3 kỳ nghỉ ma cà rồng","hotel transylvania 3 summer vacation","khách sạn huyền bí 3"],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MVVPZHZHRmZSWTdSTFV3LXhpQVZ2UkxsYTR0ZmtlSUszTVV1SWdB&sub=http://topphimhd.com/wp-content/uploads/2018/08/Hotel.Transylvania.3.Summer.Vacation.2018.1080p.BluRay.x264.DTS-HD.MA_.5.1-FGT-Topphimhd.com_.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/08/Hotel.Transylvania.3.Summer.Vacation.2018.1080p.BluRay.x264.DTS-HD.MA_.5.1-FGT-Topphimhd.com_.srt"},{"name":"Toà Tháp Chọc Trời","viewUrl":"https://phim3s.pw/phim-le/toa-thap-choc-troi_11119/xem-phim/","nameOrigin":"Skyscraper","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftoa-thap-choc-troi-skyscraper-2018.jpg%3Fsize%3D300","resolutionText":"HD Vietsub + Thuyết Minh","directors":["Rawson Marshall Thurber"],"actors":["Dwayne Johnson","Roland Møller"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"country":{"name":"Mỹ"},"duration":120,"viewsCount":1539525,"uploaderName":"nguyen trung hieu","desc":"Phim Toà Tháp Chọc Trời Dwayne Johnson (The Rock) sẽ vào vai cựu quân nhân và cựu trưởng nhóm đặc nhiệm giải cứu của FBI Will Ford đầy dũng cảm. Không may trong một nhiệm vụ nguy hiểm, tai nạn khủng khiếp xảy đến với Will làm anh mất đi chân trái của mình. Kể từ đó, Will Ford từ bỏ công việc tại FBI và trở thành chuyên gia đánh giá an ninh cho các tòa nhà. Trong một lần làm việc, Tòa nhà cao 240 tầng với hệ thống an ninh tối tân đột nhiên bị cháy lớn ở tầng 96. Những con người, cạm bẫy và thế lực nào đứng sau thảm họa này chắc chắn đang nhắm vào cựu quân nhân và lấy gia đình anh ra làm con tin. Với kinh nghiệm, sự gan dạ của một người lính cùng tình yêu gia đình mãnh liệt, liệu Will Ford có tìm ra được kẻ chủ mưu và cứu lấy gia đình của anh?","tags":["toà tháp chọc trời","skyscraper","bilutv phim lẻ"],"embeds":[{"file":"https://r3---sn-4g5e6nld.googlevideo.com/videoplayback?id=e9657aebb074396b&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nld&ms=nxu&mv=u&pl=25&sc=yes&ei=COGlXLCjEp7X1wLZhqPwAw&susc=ph&app=fife&mime=video/mp4&dur=6144.301&lmt=1548770273295018&mt=1554373853&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1554382120&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=6C3DB85FBA82FE2B2A330AE817F5220CA9C2FE0B9BD12D7363A32A598A73BA5A.B7F3116BF05050F1CBF6A64B7F25E17916D1FA3EE8498F9CF412FB912DE9A75B&key=us0","label":"360p","type":"video/mp4"},{"file":"https://r3---sn-4g5edns6.googlevideo.com/videoplayback?id=e9657aebb074396b&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=COGlXM_BEsbG1wL0rqHwBg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6144.301&lmt=1548773145247011&mt=1554373853&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1554382120&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=0E9B7A0EE3449DDD458894B83A1A24D5711F1241F48C1AE850DF93763C42319C.AFD5767F33EBB20A3B97983E7B2EDB21835961D5EA51E110CD4CD25FFFD35E14&key=us0","label":"720p","type":"video/mp4","default":"true"}],"backups":["http://topanimehd.com/getid.php?id=MTFTck5aN1FNWUVKVzUwTnVqaDhQUVBHU2VEZUgtWU1qbjh4R2JR&sub=http://topphimhd.com/wp-content/uploads/2018/06/Skyscraper.Vietsub.HD_.Cam_.Ass_.New_.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/Skyscraper.Vietsub.HD_.Cam_.Ass_.New_.srt"},{"name":"Tay Lái Siêu Hạng","viewUrl":"https://phim3s.pw/phim-le/tay-lai-sieu-hang_711/xem-phim/","nameOrigin":"Drive","thumbailSmallUrl":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdrive-2011tay-lai-sieu-hang-drive-2011.jpg%3Fsize%3D300","resolutionText":"Nicolas Winding Refn","directors":["Ryan Gosling","Carey Mulligan","Bryan Cranston"],"actors":["Phim Hành Động"],"genres":[""],"country":{"name":"Mỹ"},"duration":100,"viewsCount":5961900,"uploaderName":"nguyễn biên","desc":"Drive là câu chuyện ở Hollywood về một diễn viên đóng thế (Gosling) các cảnh đua xe trong phim hành động. Cuộc sống của anh cũng bình lặng như những diễn viên hạng thường ở Hollywood, một căn hộ nhỏ và mối tình với cô gái hàng xóm. Nhưng thật ra nghề tay phải của anh là lái thuê cho bọn tội phạm trong các phi vụ đánh cướp. Cho đến khi thực hiện một hợp đồng lái thuê, anh nhận ra mình bị dính vào một vụ án nguy hiểm có thể hại cả anh và người yêu. Điều duy nhất có thể cứu cả hai là anh phải ngồi sau vô lăng và đạp ga tăng hết tốc lực.","tags":["tay lái siêu hạng","drive"],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MVZIQ1dfRFZXQlZ2M0RDWVhVWU5TSTU4WjU0RlBWb2dqZDdaN2ha&sub=http://topphimhd.com/wp-content/uploads/2018/07/Drive.2011.mHD_.R5.BluRay.DD5_.1.x264-EPiK.srt"],"subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Drive.2011.mHD_.R5.BluRay.DD5_.1.x264-EPiK.srt"},{"name":"Cơ Trưởng Sully","nameOrigin":"Sully","desc":"Phim Cơ Trưởng Sully - Sully xoang quanh câu truyện cơ trưởng \"Sully\" Sullenberger đáp chiếc máy bay trong tình trạng động cơ tê liệt hoàn toàn xuống con sông Hudson mà hơn 150 hành khách không một ai bị thiệt mạng . Tuy nhiên, trong khi Sully được công chúng và truyền thông tung hô như một anh hùng bởi tài nghệ chưa từng thấy từ trước đến nay, thì một cuộc điều tra được tiến hành có khả năng hủy hoại hoàn toàn danh tiếng cũng như sự nghiệp của ông.","duration":100,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-truong-sully-sully-2016.jpg%3Fsize%3D300"},"actors":["Tom Hanks"],"genres":["Phim Chiến Tranh","Phim Phiêu Lưu","Phim Khoa học Tài liệu","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"embeds":[{"label":"360p","file":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1554389633&rver=6.7.6643.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152385%26authkey%3DANWZfSEQu1YS76Q&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","file_o":"https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1554389633&rver=6.7.6643.0&wp=MBI_SSL_SHARED&wreply=https:%2F%2Fonedrive.live.com%2Fdownload%3Fcid%3D375CDB1B890B3A36%26resid%3D375CDB1B890B3A36%252152385%26authkey%3DANWZfSEQu1YS76Q&lc=1033&id=250206&cbcxt=sky&cbcxt=sky","type":"mp4","default":"true"}],"backups":["http://topanimehd.com/getid.php?id=MXhKNjFJMG01ckJfek44VGZ0bTFBOXFSSlUxa1I1R1UwOXBQamVF&sub=http://topphimhd.com/wp-content/uploads/2018/11/Sully.2016.1080p.BluRay.x264-SPARKS.srt"],"status":"updating","viewsCount":5312235,"directors":["Clint Eastwood"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/11/Sully.2016.1080p.BluRay.x264-SPARKS.srt","isAdult":false},{"name":"Ám Ảnh Kinh Hoàng 2","nameOrigin":"The Conjuring 2","desc":"The Conjuring 2: The Enfield Poltergeist tiếp tục dựa trên một trong 10000 hồ sơ điều tra của cặp vợ chồng Warren. Đây là vụ án kỳ bí nhất được ghi nhận trong lịch sử siêu nhiên.Chuyện phim diễn ra vào cuối thập niên 70 tại vùng Enfield nước Anh. Nơi mà người mẹ đơn thân Hodgson sống cùng 4 đứa con gái của mình. Bọn trẻ bị các thế lực siêu nhiên tà ác ác quấy nhiễu liên tục. Bà mẹ đành phải nhờ đến sự giúp đỡ của hai nhà ngoại cảm Ed và Lorraine Warren đến điều tra để giải cứu con mình.","duration":110,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fam-anh-kinh-hoang-2-the-conjuring-2-2016.jpg%3Fsize%3D300"},"actors":["Vera Farmiga","Patrick Wilson","Frances O'Connor","Madison Wolfe","Simon McBurney","Franka Potente"],"genres":["Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"backups":["http://topanimehd.com/getid.php?id=MVBobGdQMzk1U2h4UFpjSmVoTHBFdWhabkpxckRmaW1ZRzVtOExr&sub=http://topphimhd.com/wp-content/uploads/2018/06/The-Conjuring-2-2016-AllBluray-WorldSubTeam.com_.srt"],"status":"updating","viewsCount":9710505,"directors":["James Wan"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/The-Conjuring-2-2016-AllBluray-WorldSubTeam.com_.srt","isAdult":false},{"name":"Anh Hùng Cương Dương","nameOrigin":"The Virgin Psychics","desc":"The Virgin PsychicsCâu chuyện hài giả tưởng này kể về một nam sinh trung học (còn nguyên tem) bình thường tên là Yoshiro “Yocchan” Kamogawa (do Sometani thủ vai). Cuộc đời cậu đã thay đổi hoàn toàn sau một đêm, khi cậu thức dậy với khả năng đọc được suy nghĩ của người khác. Yoshiro không phải người duy nhất trong thị trấn có siêu năng lực.Teru-oichan (hẳn nhiên là vẫn chưa bị bóc mác), nhân viên của một tiệm cà phê gần trường Yoshiro, có được khả năng di chuyển đồ vật, nhưng anh chỉ toàn dùng để di chuyển sex toy. Yosuke Enomoto (chắc là vẫn còn tem), học sinh năm cuối và là cựu thành viên của đội bóng rổ, cùng trường Yoshiro, có được khả năng dịch chuyển tức thời, nhưng chỉ khi đang trong trạng thái không mảnh vải che thân.","duration":114,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fanh-hung-cuong-duong-the-virgin-psychics-2015.jpg%3Fsize%3D300"},"actors":["Motoki Fukami","Elaiza Ikeda","Megumi Kagurazaka"],"genres":["Phim Hài Hước"],"countries":[{"name":"Nhật Bản"}],"embeds":"<iframe width=\"100%\" height=\"100%\" src=\"https://drive.google.com/file/d/0Bwkrc-cZmu4bUDNETE01aXNfTkU/preview\" frameborder=\"0\" allowfullscreen></iframe>","backups":["http://topanimehd.com/getid.php?id=MUhIalVUcWJTc0YwOFNoZktGVUE5bVNxdUZOU0tMNklMYkd6aHBk&sub=http://topphimhd.com/wp-content/uploads/2018/08/The.Virgin.Psychics.2015.720p.BluRay.x264-WiKi.srt"],"status":"updating","viewsCount":5852940,"directors":["Sion Sono"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/08/The.Virgin.Psychics.2015.720p.BluRay.x264-WiKi.srt","isAdult":false},{"name":"Người Vận Chuyển 2","nameOrigin":"The Transporter 2","desc":"Sau khi nghỉ hưu ở Miami, cưu nhân viên của Lực lượng đặc biệt, Frank Martin hành nghề tài xế cho gia đình giàu có Billings. Frank được 2 cậu nhóc của gia đình đó rất thần tượng và yêu mến. Khi 2 cậu bé bị bắt cóc tống tiền anh đã 1 mình hành động mà không báo cảnh sát để giải cứu 2 người bạn nhỏ đó.","duration":88,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-van-chuyen-2-the-transporter-2-2005.jpg%3Fsize%3D300"},"actors":["Jason Stathammber Valletta"],"genres":["Phim Hành Động","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"backups":["http://topanimehd.com/getid.php?id=MW5uMElpaFJDaDZ0SVhfVjRCM1JWdXFSMTkyOGhzMXJJRTQwOWJL&sub=http://topphimhd.com/wp-content/uploads/2018/04/Transporter.2.2005.1080p.BluRay.DTS_.x264-xander.srt"],"status":"updating","viewsCount":11556390,"directors":["Louis Leterrier"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/04/Transporter.2.2005.1080p.BluRay.DTS_.x264-xander.srt","isAdult":false},{"name":"Người Vận Chuyển 3","nameOrigin":"The Transporter 3","desc":"Trong Transporter 3, Frank Martin chịu nhiều sức ép trong việc hộ tống Valentina, cô con gái bị bắt cóc của Leonid Vasilev, người đứng đầu Cơ Quan Bảo Vệ Môi Trường của Ukraine, suốt chặng đường dài từ Marseilles đến Stuttgart và Budapest, trước khi dừng lại ở Odessa, Biển Đen.Suốt quãng đường đi, dù nhận được sự giúp đỡ của Thanh tra Tarconi, Frank liên tục phải đấu tranh với những người đã ép buộc anh phải nhận lấy công việc này, những tay chân của Vasilev được gửi đến để ngăn cản anh cùng sự bất hợp tác của Valentina. Bất chấp thái độ hoài nghi của Valentina, Frank và cô gái cuối cùng cũng đã chịu kết hợp cùng nhau trong lúc cả hai đang cố gắng thoát khỏi những tình huống đe dọa tính mạng của chính mình liên tiếp ập đến.","duration":110,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-van-chuyen-3-the-transporter-3.jpg%3Fsize%3D300"},"actors":["Jason Statham","Robert Knepper","Mike Powers"],"genres":["Phim Hành Động","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MUNETnVoUjc1SDVoVkVadEk5WU1WbFJkbmhaTTB6b3R4aTZJRGt3&sub=http://topphimhd.com/wp-content/uploads/2018/04/Transporter.3.2008.1080p.BluRay.DTS_.x264-xander.srt"],"status":"updating","viewsCount":12317745,"directors":["Olivier Megaton"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/04/Transporter.3.2008.1080p.BluRay.DTS_.x264-xander.srt","isAdult":false},{"name":"Phù Thủy","nameOrigin":"The Witch","desc":"","duration":92,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fphu-thuy-the-witch-2017.jpg%3Fsize%3D300"},"actors":["Anya Taylor Joy","Ralph Ineson","Kate Dickie"],"genres":["Phim Kinh Dị","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"backups":["http://topanimehd.com/getid.php?id=MWVwR3YwUUFuc1daaXBwYk84ZFZ0a2RhM1N4NjR6T1c1MkZYazFs&sub=http://topphimhd.com/wp-content/uploads/2018/06/The.Witch_.2015.720p.BluRay.x264-DRONES.srt"],"status":"updating","viewsCount":6049335,"directors":["Robert Eggers"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/The.Witch_.2015.720p.BluRay.x264-DRONES.srt","isAdult":false},{"name":"Lão Pháo Nhi","nameOrigin":"Mr.Six","desc":"Phim Lã Pháo Nhi khai thác đề tài thế lực mafia, xã hội đen ngầm tại Trung Quốc. Phim kể về cuộc đối chọi giữa những thế lực ngầm với nhau. Trong đó, Lục Gia là trùm thế lực ngầm cũ tại Bắc Kinh. Sau nhiều năm lăn lộn, ông không thích ứng được với sự thay đổi của thời thế nên đã chọn một cuộc sống an nhàn. Nào ngờ, người con trai độc nhất của Lục Gia là Hiểu Ba (Lý Dịch Phong) lại có xích mích với người cầm đầu thế lực mới Tiểu Phi (Ngô Diệc Phàm).","duration":136,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Flao-phao-nhi-mrsix-2015.jpg%3Fsize%3D300"},"actors":["Trương Hàm Dư","Lý Dịch Phong","Hứa Tình","Ngô Diệc Phàm","Phùng Tiểu Cương"],"genres":["Phim Hành Động","Phim Phiêu Lưu"],"countries":[{"name":"Trung Quốc"}],"embeds":"<iframe width=\"100%\" height=\"100%\" src=\"https://drive.google.com/file/d/0B_gEN6DEGR8JZHp1T3hnUWRjVTQ/preview\" frameborder=\"0\" allowfullscreen></iframe>","backups":["http://topanimehd.com/getid.php?id=MXM5NjNRQVYzdW9WQ0FDMXlKdnVWSnFmLUdrWTVVdF9BbHhja1pa&sub=http://topphimhd.com/wp-content/uploads/2018/11/Mr-Six-2015-720p-BluRay-x264-WiKi.srt"],"status":"updating","viewsCount":6406935,"directors":["Guan Hu"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/11/Mr-Six-2015-720p-BluRay-x264-WiKi.srt","isAdult":false},{"name":"Tinh Võ Anh Hùng","nameOrigin":"Fist of Legend","desc":"Tác phẩm được làm lại từ bộ phim kinh điển \"Fist of Fury\" của Lý Tiểu Long. Lấy bối cảnh vào những năm 1930, Lý Liên Kiệt vào vai một học sinh trở về sau những năm du học tại Nhật để điều tra những kẻ đã giết sư phụ mình. Năm 1937, Chen Zhen (Lý Liên Kiệt), một sinh viênTrung Quốc trở về từ Tokyo, nơi mà chủ nghĩa phát xít đã trở nên cuồng bạo. Anh tìm về trường võ thuật của mình trước kia tại Thượng Hải và anh được báo tin rằng người thầy dạy của mình là Huo Yuan Jia đã bị giết chết trong một trận đấu với một trường dạy võ karate cạnh tranh.Chen Zhen biết rất rõ khả năng và sức mạnh của sư phụvà chắc chắn rằng ông không thể bị giết chết một cách dễ dàng, nếu nhưkhông có những thủ đoạn xấu xa ẩn giấu sau cuộc chiến này. Anh quyếttâm tìm cho ra những kẻ đã giết chết sư phụ. Trong quá trình điều tra,Chen Zhen đã phát hiện ra rằng kẻ cầm đầu băng nhóm kia chính là GoFujita (Billy Chow), một quân nhân người Nhật, cùng với một nhóm võsinh của trường võ thuật đối thủ.Chen Zhen yêu cầu khám nghiệm lại xác của sư phụ và phát hiện ra dấu vết của chất độc tồn tại trong gan chứng tỏ những nghi ngờ của anh là có cơ sở. Với sự trợ giúp của võ sư người Nhật FumioFunakoshi (Yasuaki Kurata), con trai của sư phụ là Huo Ting En (ChinSiu Hou), cũng như sự giúp đỡ tận tâm của cô bạn gái người Nhật MitsukoYamada (Shinobu Nakayama), Chen Zhen đã hoàn thành nhiệm vụ báo thù chothày dạy của mình.Khi thực hiện bộ phim này, đạo diễn Gordon Chan đãnói rằng: “Cũng như rất nhiều người, tôi là một fan của Lý Tiểu Long.Việc so sánh Lý Liên Kiệt với huyền thoại võ thuật này là một điều thú vị. Nhưng dù sao thì đây cũng không thực sự là một sự so sánh vì hai bộphim không cùng một kịch bản. Mà kịch bản gốc đã được sửa đổi khá nhiềuđể phù hợp hơn với Lý Liên Kiệt. Đó là một công việc rất lý thú.”Báo thù, một nền tảng chắc chắn của một kịch bản tuy không sáng giá nhưng rõ ràng là rất hiệu quả. Mặt khác, tình yêu khókhăn giữa Chen Zhen và cô gái người Nhật trong một hoàn cảnh đầy bất trắc và hiểm nguy càng khiến cho bộ phim thêm kịch tính. Đặc biệt, với một bộ phim có sự góp mặt của Lý Liên Kiệt, sự chú ý luôn nằm trongnhững pha hành động đẹp mắt và rất thuyết phục. Những trận đấu trongphim là sự pha trộn giữa thể loại wushu khó nhằn và môn karate năngđộng đầy ấn tượng.Nhưng vẫn có những lỗi dễ nhận thấy gây hạn chế phầnnào cho thành công của bộ phim: việc lồng tiếng đã thổi phồng quá mứchiệu quả tiếng động của những cú đấm, hình ảnh thiếu độ nét, những tình tiết hài hước xen kẽ thiếu thuyết phục. Mặc dù vậy Fist of Legend vẫn là một bộ phim hành động đáng xem dành cho các fan của thể loại nàycũng như những ai hâm mộ tài năng của Lý Liên Kiệt. Đặc biệt, phim cònnằm trong danh sách 10 bộ phim võ thuật kung fu hay nhất của màn ảnhHoa ngữ cùng với những bộ phim đình đám như Ngọa hổ tàng long hay Police Story.Đánh giá khác:Không giống như những bộ phim được thực hiện tại Hollywood, những bộ phim của Lý Liên Kiệt tại Hong Kong được đánh giá rất cao. Một trong số này là Fist of legend (Tinh võ môn). Đây là bộ phim là lại từ tác phẩm Fist of fury nổi danh của Lý Tử Long và nó được coi là một trong những bộ phim võ thuật hay nhất mọi thời đại cũng như là hay nhất của Lý Liên Kiệt.Bối cảnh của phim là thành phố Thượng Hải năm 1937 trong thời kì chiến tranh Trung-Nhật lần thứ 2. Lúc này Thượng Hải đang bị quân Nhật chiếm đóng. Trần Chân (Lý Liên Kiệt), một công dân Thượng Hải, đang học tại Nhật thì nghe tin sư phụ của mình là Hoắc Nguyên Giáp, người đứng đầu Tinh võ môn, bị giết chết trong một trận thách đấu với một võ sĩ Nhật Bản. Trần Chân ngay lập tức trở về nước chịu tang thầy và tìm hiểu rõ sự việc.Tại Thượng Hải, sau khi về trường Tinh võ để chịu tang thầy, Trần Chân tìm tới nơi dạy võ của Akutagawa Ryoichi, võ sĩ Nhật đã giết chết Hoắc Nguyên Giáp. Sau khi giao đấu, Trần Chân nhận thấy trình độ của Ryoichi không thể là đối thủ của thầy mình vì thế anh cho khai quật mộ của thầy và nhờ bác sĩ khám nghiệm tử thi. Qua xét nghiệm, bác sĩ kết luận Hoắc Nguyên Giáp bị đầu độc. Kết luận này khiến nội bộ Tinh võ môn nảy sinh nghi ngờ lẫn nhau.Cùng lúc đó, biết trận đấu của mình với Hoắc Nguyên Giáp đã bị dàn xếp, Ryoichi phản ứng với Fujta, một sĩ quan quân tội và là kẻ chủ mưu, và bị Fujita giết chết. Để dẹp yên mọi chuyện, Fujita đổ vấy cho Trần Chân tội sát hại Ryoichi. Trần Chân bị bắt vào tù và bị đem ra xét xử. Quá trình điều tra kẻ thực sự giết hại sư phụ của Trần Chân xuất hiện nhiều tình huống mới…Kịch bản của Fist of legend không quá phức tạp nhưng nó vẫn có những yếu tố hấp dẫn, những đoạn cao trào, những nút thắt mở. Ví dụ như khi Trần Chân phải ra tòa thì đúng lúc đó cô bạn gái người Nhật xuất hiện, khai man trước tòa để Trần Chân thoát tội. Không chỉ là sự báo thù của Trần Chân trước cái chết của thầy mình mà ẩn đằng sau đó là tinh thần kháng Nhật của người Trung Quốc trong thời kì này. Đan xen trong đó là mối tình ngang trái giữa Trần Chân và một cô gái Nhật khi mà Trần Chân phải lựa chọn cô gái và Tinh võ môn và khi mà anh bị tẩy chay ở mọi nơi vì có bạn gái là người Nhật. Trong phim cũng có một vài tình huống và nhân vật hài hước trong nhiều phim võ thuật khác của Hong Kong như nhân vật đội trưởng cảnh sát hay chi tiết bác sĩ pháp y lại sợ tiếp xúc với tử thi.Vì là phim hành động võ thuật nên phần quan trọng nhất là các cảnh đánh nhau, đấu võ. Với tài chỉ đạo võ thuật của Yuen Woo Ping cộng với khả năng của các diễn viên, đặc biệt là Lý Liên Kiệt, những cảnh đánh võ trong phim rất chân thực và sống động. Thêm vào đó là góc độ và việc dừng máy đúng lúc khiến các cảnh đấu võ gần như là hoàn hảo.Trong các bộ phim kiểu như thế này, diễn xuất của các diễn viên không được chú ý quá nhiều và không bị đòi hỏi cao. Lý Liên Kiệt vẫn yêu trong những cảnh đòi hỏi nhiều diễn xuất nội tâm, nhưng ở các cảnh cần sự cương nghị, căm giận, dũng mãnh anh lại diễn rất khá. Các diễn viên khác tròn vai, không có gì đáng kể. Ngoài ra, Lý Liên Kiệt trông điển trai hơn chứ không xù xì nhưng nhiều vai diễn gần đây khi mà dấn ấn tuổi tác đã hiện rõ (đặc biệt là gương mặt).Nói tóm lại, đây là một bộ phim mà những fan phim võ thuật và phim Hong Kong không thể bỏ qua.Screens:","duration":103,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftinh-vo-anh-hung-fist-of-legend-1994.jpg%3Fsize%3D300"},"actors":["Phim Võ Thuật"],"genres":[""],"countries":[{"name":"Trung Quốc"}],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MWlhRDQ3ZklPdEZ2QW1yUGVKczJ1OHRGMmNzeDVWLUFkSVVuTmtX&sub=http://topphimhd.com/wp-content/uploads/2018/09/Fist-Of-Legend-1994-1080p-UK-Blu-ray-AVC-DTS-HD-MA-5.1.srt"],"status":"updating","viewsCount":9508950,"directors":["Lý Liên Kiệt"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/09/Fist-Of-Legend-1994-1080p-UK-Blu-ray-AVC-DTS-HD-MA-5.1.srt","isAdult":false},{"name":"Chiến Binh Săn Phù Thủy","nameOrigin":"The Last Witch Hunter","desc":"Dựa trên một trong những kịch bản chuyển thể hấp dẫn nhất do trang web uy tín Blacklist bình chọn năm 2010, CHIẾN BINH SĂN PHÙ THỦY (THE LAST WITCH HUNTER) là sản phẩm mới nhất của hãng Summit, được nhào nặn dưới bàn tay đạo diễn “The Crazies” – Breck Eisner. Bộ phim đặt người xem vào bối cảnh thế giới bị lũng đoạn bởi sự hiện diện của tộc phù thuỷ. Cuộc chiến giữa chúng và những người thợ săn kéo dài hàng bao thế kỷ cho kết khi Kaulder (Vin Diesel) tiêu diệt được Nữ Hoàng (Julie Engelbrecht). Trước khi chết, mụ đã kịp nguyền rủa Kaulder với sự bất tử của chính mình, khiến anh mãi mãi rời xa vợ con, sống một cuộc sống cô độc kiếp này qua kiếp khác. Trở về với thế kỷ 21, Kaulder là thợ săn phù thuỷ duy nhất còn sót lại, vẫn tiếp tục tìm kiếm và tiêu diệt những sinh vật siêu nhiên chết người kia. Nhưng, anh không thể ngờ rằng, thủ lĩnh của chúng – Nữ Hoàng đã được hồi sinh và đang tìm cách trả thù loài người.Cùng góp mặt trong phim bên cạnh Vin Diesel là kiều nữ “Games of Throne” – Rose Leslie, ngôi sao “The Lords of The Ring” – Elijah Wood và nam diễn viên từng 2 lần giành tượng vàng Oscar – Michael Caine.","duration":106,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fchien-binh-san-phu-thuy-the-last-witch-hunter-2016.jpg%3Fsize%3D300"},"actors":["Vin Diesel","Rose Leslie","Elijah Wood"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MXdvenNmM1QyOTlFTE1BdzZMaVhUbE9qM0dHcVZQelUzQTVpRHRC&sub=http://topphimhd.com/wp-content/uploads/2018/07/The.Last_.Witch_.Hunter.2015.720p.BluRay.DTS_.x264-HiDt.srt"],"status":"updating","viewsCount":10420470,"directors":["Breck Eisner"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/The.Last_.Witch_.Hunter.2015.720p.BluRay.DTS_.x264-HiDt.srt","isAdult":false},{"name":"Gương Quỷ","nameOrigin":"The Mirror","desc":"Gương Quỷ 3D - Bộ phim là dự án hợp tác giữa Thái Lan, Hồng Kông và Hàn Quốc, ba ông trùm phim kinh dị châu Á.  Phim Gương Quỷ 3D kể kề câu chuyện diễn ra trong một căn hộ chung cư bí ẩn rùng rợn với những hình ảnh đáng sợ về số phận của một người phụ nữ đơn thân cô độc cùng một đứa trẻ côi cút.  Gương Quỷ được sáng tạo dựa trên quan niệm về mọi vật đều có một phản chiếu của chính mình bên kia tấm gương, chính vì vậy, những điều quỷ quyệt nhất, xấu xa nhất cũng cũng từ đó mà ra.  Từ yếu tố kinh dị dựa trên không gian ma mị kiểu Hồng Kông cho đến kiểu ám ảnh mang màu sắc tín ngưỡng của Thái Lan, và cuối cùng là hiệu ứng hồi hộp thót tim dựa trên sức ép tâm lí mà các nhà làm phim Hàn hay sử dụng, tất cả đều được thể hiện chân thực đến lạnh người trong Gương Quỷ.","duration":101,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fguong-quy-the-mirror-2015.jpg%3Fsize%3D300"},"actors":["Hong Zhou","Eunsung Kim","Lee Chae young"],"genres":["Phim Kinh Dị","Phim Thuyết Minh"],"countries":[{"name":"Thái Lan"}],"backups":["http://topanimehd.com/getid.php?id=MURBY3ptS0ttSmRPbnBmR1o0cUZhS1pmTHQ3VWIwZDA2TTFITWo0&sub=http://topphimhd.com/wp-content/uploads/2018/07/Mirrors.2008.UNRATED.720p.BluRay.DTS_.x264-DON.srt"],"status":"updating","viewsCount":6398070,"directors":["Pakphum Wonjinda"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Mirrors.2008.UNRATED.720p.BluRay.DTS_.x264-DON.srt","isAdult":false},{"name":"Người Giải Mã","nameOrigin":"The Imitation Game","desc":"Trong thời kỳ Thế chiến II, quân Đức sử dụng máy Enigma để liên lạc nhờ sự bảo mật tối ưu của loại máy mã hóa ưu việt này. Từ những thông tin cơ bản như dự báo thời tiết trong ngày cho tới những thông điệp quan trọng như ý đồ tác chiến, vị trí đặt tàu, thời gian tiến hành chiến dịch… đều được phe Đức trao đổi sau khi đã mã hóa qua máy Enigma.Để có thể chiến thắng cuộc chiến này, việc giải mã Enigma là một nhiệm vụ tối quan trọng đối với phe Đồng Minh. Tại Anh, “điệp vụ bất khả thi” ấy được giao cho một nhóm nhà toán học, giải mật mã và kỳ thủ cờ vua tại trung tâm Bletchley Park. Tâm điểm của dự án tuyệt mật ấy là nhà toán học thiên tài lập dị Alan Turing (Benedict Cumberbatch thủ vai). The Imitation Game kể về cuộc đời của nhân vật được xem như cha đẻ của trí thông minh nhân tạo và khoa học máy tính hiện đại song lại có một kết cục bi thảm.Không đi theo tuyến tính thông thường, câu chuyện trong The Imitation Game là những lát cắt đan xen giữa ba thời điểm trong cuộc đời của Turing. Tác phẩm mở đầu vào năm 1952, khi cuộc chiến kết thúc và Turing bị bắt giam do có quan hệ đồng tính – một việc bị xem như phạm pháp lúc ấy. Trong cuộc hỏi cung, những mảnh ghép bí ẩn từ quá khứ của ông bắt đầu được ráp lại để vẽ nên chân dung về thiên tài không gặp thời này, từ khi ông còn là một cậu nhóc thường xuyên bị bắt nạt tại trường tư tới khi gia nhập đội giải mã tại Bletchley Park và trở thành “cá nhân có đóng góp lớn nhất giúp quân Đồng Minh có được chiến thắng” như nhận định của Churchill.","duration":114,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnguoi-giai-ma-the-imitation-game-2014.jpg%3Fsize%3D300"},"actors":["Benedict Cumberbatch","Keira Knightley","Matthew Goode"],"genres":["Phim Kinh Dị","Phim Tâm Lý","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MXc1V2ZZU0J6ZnNIZExQbDR4R0pYaExmNno5ci10QklsTG1SdnRj&sub=http://topphimhd.com/wp-content/uploads/2018/07/The.Imitation.Game_.2014.720p.BluRay.x264.YIFY_.srt"],"status":"updating","viewsCount":9618735,"directors":["Morten Tyldum"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/The.Imitation.Game_.2014.720p.BluRay.x264.YIFY_.srt","isAdult":false},{"name":"Tay Trống Cự Phách","nameOrigin":"Whiplash","desc":"Chàng trai Andrew (Miles Teller) được nhận vào trường Shaffer, trường nhạc đỉnh nhất nước Mĩ. Tại đây, anh tham gia ban nhạc jazz của trường và phải đối mặt với Fletcher (Terence Fletcher), một chỉ huy dàn nhạc với yêu cầu cực kì khắt khe.","duration":107,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftay-trong-cu-phach-whiplash-2014.jpg%3Fsize%3D300"},"actors":["Phim Tâm Lý","Phim Âm Nhạc"],"genres":[""],"countries":[{"name":"Mỹ"}],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MWtNS3pDc1gtc1FwN2Q4d1ZxQUNEMkNUdTdtMHo0LURCUTNYc0xT&sub=http://topphimhd.com/wp-content/uploads/2018/07/Whiplash.2014.720p.BluRay.x264.YIFY_.srt"],"status":"updating","viewsCount":6588705,"directors":["Miles Teller","J.K. Simmons","Melissa Benoist"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Whiplash.2014.720p.BluRay.x264.YIFY_.srt","isAdult":false},{"name":"Nòng Súng Trên Tay","nameOrigin":"By the Gun","desc":"","duration":110,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fnong-sung-tren-tay-by-the-gun-2014.jpg%3Fsize%3D300"},"actors":["Tully Banta Cain","Ben Barnes","Paul Ben Victo"],"genres":["Phim Hình Sự","Phim Tâm Lý"],"countries":[{"name":"Mỹ"}],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MTZVRXlycmVEWjFKMkxsUXlfZUl3cEczbUlsQWhCNGpNZXdZMVQw&sub=http://topphimhd.com/wp-content/uploads/2018/07/By_the_Gun_2014_1080p_BluRay_AC3_S_ViE_VIE.srt"],"status":"updating","viewsCount":6932970,"directors":["James Mottern"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/By_the_Gun_2014_1080p_BluRay_AC3_S_ViE_VIE.srt","isAdult":false},{"name":"Cuồng Nộ","nameOrigin":"Fury","desc":"Đặt bối cảnh vào giai đoạn cuối của cuộc Chiến tranh Thế giới lần thứ II, 04/1945, “Fury” theo chân chiến binh dày dạn kinh nghiệm chiến trường Wardaddy (Brad Pitt), người chỉ huy một chiếc xe tăng chủ lực Sherman của Anh và đội hình chiến đấu 5 người trong một nhiệm vụ cực kỳ nguy hiểm luồn sâu tập kích đằng sau chiến tuyến của quân thù. Bị áp đảo bởi số lượng và hỏa lực từ kẻ thù, Wardaddy và các đồng đội phải đối mặt với vô vàn khó khăn nguy hiểm bằng một cố gắng phi thường nhằm đánh thẳng vào trái tim của Đức Quốc Xã.","duration":134,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fcuong-no-fury-2014.jpg%3Fsize%3D300"},"actors":["Brad Pitt","Shia LaBeouf","Logan Lerman"],"genres":["Phim Hành Động","Phim Chiến Tranh"],"countries":[{"name":"Mỹ"}],"backups":["http://topanimehd.com/getid.php?id=MXZpSjQzWWp2dDYtUGhLVWw2RmNvcXZIdTJXdzg2elRyMjc2ODNS&sub=http://topphimhd.com/wp-content/uploads/2018/07/Fury-2014-Vie-All-Bluray.srt"],"status":"updating","viewsCount":15788685,"directors":["David Ayer"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Fury-2014-Vie-All-Bluray.srt","isAdult":false},{"name":"Cô Gái Mất Tích","nameOrigin":"Gone Girl","desc":"","duration":149,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fco-gai-mat-tich-gone-girl-2014.jpg%3Fsize%3D300"},"actors":["Ben Affleck","Rosamund Pike","Neil Patrick Harris"],"genres":["Phim Phiêu Lưu","Phim Kinh Dị","Phim Tâm Lý"],"countries":[{"name":"Mỹ"}],"backups":["http://topanimehd.com/getid.php?id=MVhMQkczakc5UG9KNUlYNHV5OVZTMkZUaWh5ejZvNTBESEVHY09U&sub=http://topphimhd.com/wp-content/uploads/2018/07/Gone.Girl_.2014.720p.BluRay.x264.DTS-WiKi.srt"],"status":"updating","viewsCount":8507385,"directors":["David Fincher"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Gone.Girl_.2014.720p.BluRay.x264.DTS-WiKi.srt","isAdult":false},{"name":"Khách Sạn Huyền Bí 3: Kỳ Nghỉ Ma Cà Rồng","nameOrigin":"Hotel Transylvania 3: Summer Vacation","desc":"Phim Khách Sạn Huyền Bí 3: Kỳ Nghỉ Ma Cà Rồng lần này sẽ là “cuộc chơi lớn” với một phen tiệc tùng sang chảnh hết nấc của gia đình Dracula. Đã quá “ngán” với cường độ làm việc chăm chỉ 365 ngày không nghỉ, bá tước Dracula quyết định đòi “đình công”. Để khai sáng cho người cha trăm tuổi chưa bao giờ bước ra khỏi “lũy tre làng”, vợ chồng nhà Jonathan – Mavis lập một kế hoạch xả hơi táo bạo: Thuê đứt một du thuyền du lịch hạng sang để đưa tất thảy bộ xậu quái vật già trẻ lớn bé làm một chuyến ra khơi nhớ đời.Xem Khách Sạn Huyền Bí 1xem Khách Sạn Huyền Bí 2","duration":99,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fkhach-san-huyen-bi-3-ky-nghi-ma-ca-rong-hotel-transylvania-3-summer-vacation-2018.jpg%3Fsize%3D300"},"actors":["Steve Buscemi","Selena Gomez","Adam Sandler","Kevin James","Andy Samberg"],"genres":["Phim Hài Hước","Phim Hoạt Hình","Phim Viễn Tưởng","Phim Thiếu nhi"],"countries":[{"name":"Mỹ"}],"embeds":[],"backups":["http://topanimehd.com/getid.php?id=MVVPZHZHRmZSWTdSTFV3LXhpQVZ2UkxsYTR0ZmtlSUszTVV1SWdB&sub=http://topphimhd.com/wp-content/uploads/2018/08/Hotel.Transylvania.3.Summer.Vacation.2018.1080p.BluRay.x264.DTS-HD.MA_.5.1-FGT-Topphimhd.com_.srt"],"status":"updating","viewsCount":581400,"directors":["Genndy Tartakovsky"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/08/Hotel.Transylvania.3.Summer.Vacation.2018.1080p.BluRay.x264.DTS-HD.MA_.5.1-FGT-Topphimhd.com_.srt","isAdult":false},{"name":"Toà Tháp Chọc Trời","nameOrigin":"Skyscraper","desc":"Phim Toà Tháp Chọc Trời Dwayne Johnson (The Rock) sẽ vào vai cựu quân nhân và cựu trưởng nhóm đặc nhiệm giải cứu của FBI Will Ford đầy dũng cảm. Không may trong một nhiệm vụ nguy hiểm, tai nạn khủng khiếp xảy đến với Will làm anh mất đi chân trái của mình. Kể từ đó, Will Ford từ bỏ công việc tại FBI và trở thành chuyên gia đánh giá an ninh cho các tòa nhà. Trong một lần làm việc, Tòa nhà cao 240 tầng với hệ thống an ninh tối tân đột nhiên bị cháy lớn ở tầng 96. Những con người, cạm bẫy và thế lực nào đứng sau thảm họa này chắc chắn đang nhắm vào cựu quân nhân và lấy gia đình anh ra làm con tin. Với kinh nghiệm, sự gan dạ của một người lính cùng tình yêu gia đình mãnh liệt, liệu Will Ford có tìm ra được kẻ chủ mưu và cứu lấy gia đình của anh?","duration":120,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Ftoa-thap-choc-troi-skyscraper-2018.jpg%3Fsize%3D300"},"actors":["Dwayne Johnson","Roland Møller"],"genres":["Phim Hành Động","Phim Phiêu Lưu","Phim Viễn Tưởng","Phim Thuyết Minh"],"countries":[{"name":"Mỹ"}],"embeds":[{"file":"https://r3---sn-4g5e6nld.googlevideo.com/videoplayback?id=e9657aebb074396b&itag=18&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5e6nld&ms=nxu&mv=u&pl=25&sc=yes&ei=COGlXLCjEp7X1wLZhqPwAw&susc=ph&app=fife&mime=video/mp4&dur=6144.301&lmt=1548770273295018&mt=1554373853&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1554382120&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,dur,lmt&signature=6C3DB85FBA82FE2B2A330AE817F5220CA9C2FE0B9BD12D7363A32A598A73BA5A.B7F3116BF05050F1CBF6A64B7F25E17916D1FA3EE8498F9CF412FB912DE9A75B&key=us0","label":"360p","type":"video/mp4"},{"file":"https://r3---sn-4g5edns6.googlevideo.com/videoplayback?id=e9657aebb074396b&itag=22&source=picasa&begin=0&requiressl=yes&mm=30&mn=sn-4g5edns6&ms=nxu&mv=u&pl=25&sc=yes&ei=COGlXM_BEsbG1wL0rqHwBg&susc=ph&app=fife&mime=video/mp4&cnr=14&dur=6144.301&lmt=1548773145247011&mt=1554373853&ipbits=0&cms_redirect=yes&keepalive=yes&ratebypass=yes&ip=116.203.31.227&expire=1554382120&sparams=ip,ipbits,expire,id,itag,source,requiressl,mm,mn,ms,mv,pl,sc,ei,susc,app,mime,cnr,dur,lmt&signature=0E9B7A0EE3449DDD458894B83A1A24D5711F1241F48C1AE850DF93763C42319C.AFD5767F33EBB20A3B97983E7B2EDB21835961D5EA51E110CD4CD25FFFD35E14&key=us0","label":"720p","type":"video/mp4","default":"true"}],"backups":["http://topanimehd.com/getid.php?id=MTFTck5aN1FNWUVKVzUwTnVqaDhQUVBHU2VEZUgtWU1qbjh4R2JR&sub=http://topphimhd.com/wp-content/uploads/2018/06/Skyscraper.Vietsub.HD_.Cam_.Ass_.New_.srt"],"status":"updating","viewsCount":1539525,"directors":["Rawson Marshall Thurber"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/06/Skyscraper.Vietsub.HD_.Cam_.Ass_.New_.srt","isAdult":false},{"name":"Tay Lái Siêu Hạng","nameOrigin":"Drive","desc":"Drive là câu chuyện ở Hollywood về một diễn viên đóng thế (Gosling) các cảnh đua xe trong phim hành động. Cuộc sống của anh cũng bình lặng như những diễn viên hạng thường ở Hollywood, một căn hộ nhỏ và mối tình với cô gái hàng xóm. Nhưng thật ra nghề tay phải của anh là lái thuê cho bọn tội phạm trong các phi vụ đánh cướp. Cho đến khi thực hiện một hợp đồng lái thuê, anh nhận ra mình bị dính vào một vụ án nguy hiểm có thể hại cả anh và người yêu. Điều duy nhất có thể cứu cả hai là anh phải ngồi sau vô lăng và đạp ga tăng hết tốc lực.","duration":100,"thumbnails":{"small":"https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http%3A%2F%2Fphim3s.pw%2Fdata%2Fimages%2Ffilms%2Fthumb%2Fdrive-2011tay-lai-sieu-hang-drive-2011.jpg%3Fsize%3D300"},"actors":["Phim Hành Động"],"genres":[""],"countries":[{"name":"Mỹ"}],"embeds":"Die","backups":["http://topanimehd.com/getid.php?id=MVZIQ1dfRFZXQlZ2M0RDWVhVWU5TSTU4WjU0RlBWb2dqZDdaN2ha&sub=http://topphimhd.com/wp-content/uploads/2018/07/Drive.2011.mHD_.R5.BluRay.DD5_.1.x264-EPiK.srt"],"status":"updating","viewsCount":5961900,"directors":["Ryan Gosling","Carey Mulligan","Bryan Cranston"],"quality":"HD","subUrl":"http://topphimhd.com/wp-content/uploads/2018/07/Drive.2011.mHD_.R5.BluRay.DD5_.1.x264-EPiK.srt","isAdult":false}]

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("fb");

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("log-to-file");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("mongoose-float");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("multiparty");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("role-acl");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);