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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-autopopulate");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authFacebook = exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(22);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(85);

var _passportFacebook = __webpack_require__(83);

var _passportJwt = __webpack_require__(84);

var _userModel = __webpack_require__(19);

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(13);

var _constants2 = _interopRequireDefault(_constants);

var _helper = __webpack_require__(86);

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
const authFacebook = exports.authFacebook = _passport2.default.authenticate('facebook', {
	session: false,
	display: 'popup'
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.logPost = logPost;
exports.setSlugUrl = setSlugUrl;

var _slugify = __webpack_require__(12);

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
} /* eslint-disable no-console */
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
				})}_${this._id}`;
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),
/* 13 */
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
	MONGO_URL: 'mongodb://localhost:27017/gr2019-dev'
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
	FACEBOOK_APP_SECRET: '6521fe7adaa99b2038e728dccfcb0885'
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFloat = __webpack_require__(81);

var _mongooseFloat2 = _interopRequireDefault(_mongooseFloat);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

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
	country: {
		type: ObjectId,
		ref: 'Country',
		autopopulate: true,
		trim: true
	},
	uploader: {
		type: ObjectId,
		ref: 'User',
		autopopulate: true,
		required: [true, 'Uploader is required!'],
		trim: true
	},
	embedUrl: {
		type: String,
		required: [true, 'Movie file is required!'],
		trim: true
	},
	url: {
		type: String,
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
		type: ObjectId,
		ref: 'Genre',
		autopopulate: true,
		trim: true
	}],
	status: {
		type: String,
		enum: ['pending', 'updating', 'done'],
		default: 'pending',
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
	subtitleUrl: {
		type: String,
		trim: true
	},
	voiceoverUrl: {
		type: String,
		trim: true
	},
	voiceovers: [{
		type: ObjectId,
		ref: 'Voiceover',
		trim: true
	}],
	actors: [{
		type: ObjectId,
		ref: 'Actor',
		trim: true
	}],
	directors: {
		type: Array,
		trim: true
	},
	quality: {
		type: Number,
		enum: ['240', '360', '480', '720', '1080', '2048', '4096'],
		default: '720',
		trim: true
	},
	viewsCount: {
		type: Number,
		trim: true
	},
	likesCount: {
		type: Number,
		trim: true
	},
	favoritesCount: {
		type: Number,
		trim: true
	},
	ratesAvg: {
		type: Number,
		trim: true
	},
	ratesCount: {
		type: Number,
		trim: true
	}
}, {
	timestamps: true
});

movieSchema.pre('save', function (next) {
	return next();
});

movieSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

movieSchema.plugin(_mongoosePaginate2.default);
movieSchema.plugin(_mongooseAutopopulate2.default);
movieSchema.plugin(pluginService.logPost, { schemaName: 'Movie' });
movieSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Movie' });

exports.default = _mongoose2.default.model('Movie', movieSchema);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = __webpack_require__(75);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(79);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(80);

var _lodash2 = _interopRequireDefault(_lodash);

var _regex = __webpack_require__(92);

var _constants = __webpack_require__(13);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId;
// eslint-disable-next-line no-unused-vars


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
		minlength: [6, 'Password need to be longer!'],
		validate: {
			validator(password) {
				return _regex.passwordReg.test(password);
			},
			message: '{VALUE} is not a valid password!'
		}
	},
	name: {
		type: String,
		trim: true
	},
	provider: {
		type: String,
		trim: true
	},
	socials: {
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
	},
	friendsRequest: [{
		type: ObjectId,
		ref: 'User',
		trim: true
	}]
}, {
	timestamps: true
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

userSchema.methods = {
	_hashPassword(password) {
		return (0, _bcryptNodejs.hashSync)(password);
	},
	authenticateUser(password) {
		return (0, _bcryptNodejs.compareSync)(password, this.password);
	},
	createToken() {
		return _jsonwebtoken2.default.sign({
			_id: this._id
		}, _constants2.default.JWT_SECRET);
	},
	toJSON() {
		return _lodash2.default.pick(this, ['_id', 'email', 'name', 'role', 'avatarUrl', 'fbId', 'ggId']);
	},
	toAuthJSON() {
		return Object.assign({}, this.toJSON(), {
			role: this.role,
			provider: this.provider,
			providerUrl: this.providerUrl,
			token: `JWT ${this.createToken()}`
		});
	}
};

userSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
userSchema.plugin(_mongoosePaginate2.default);
userSchema.plugin(_mongooseAutopopulate2.default);

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
}; // eslint-disable-next-line no-unused-vars

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 22 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(13);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Removes the warning with promises
// eslint-disable-next-line no-undef
_mongoose2.default.Promise = global.Promise;

// Connect the db with the url provided
try {
	_mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
	_mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}
// eslint-disable-next-line no-console
_mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
	throw e;
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _morgan = __webpack_require__(82);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(76);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(77);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(78);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(22);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development'; /* eslint-disable no-undef */

const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
	if (isProd) {
		app.use((0, _compression2.default)());
		app.use((0, _helmet2.default)());
	}
	app.use(_bodyParser2.default.json());

	app.use(_bodyParser2.default.urlencoded({
		extended: true
	}));
	app.use(_passport2.default.initialize());

	if (isDev) {
		app.use((0, _morgan2.default)('dev'));
	}
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(13);

var _constants2 = _interopRequireDefault(_constants);

var _actorRoute = __webpack_require__(31);

var _actorRoute2 = _interopRequireDefault(_actorRoute);

var _countryRoute = __webpack_require__(89);

var _countryRoute2 = _interopRequireDefault(_countryRoute);

var _followRoute = __webpack_require__(35);

var _followRoute2 = _interopRequireDefault(_followRoute);

var _genreRoute = __webpack_require__(40);

var _genreRoute2 = _interopRequireDefault(_genreRoute);

var _groupRoute = __webpack_require__(44);

var _groupRoute2 = _interopRequireDefault(_groupRoute);

var _likeRoute = __webpack_require__(48);

var _likeRoute2 = _interopRequireDefault(_likeRoute);

var _memberRoute = __webpack_require__(53);

var _memberRoute2 = _interopRequireDefault(_memberRoute);

var _movieRoute = __webpack_require__(57);

var _movieRoute2 = _interopRequireDefault(_movieRoute);

var _postRoute = __webpack_require__(61);

var _postRoute2 = _interopRequireDefault(_postRoute);

var _rateRoute = __webpack_require__(65);

var _rateRoute2 = _interopRequireDefault(_rateRoute);

var _userRoute = __webpack_require__(69);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _voiceoverRoute = __webpack_require__(73);

var _voiceoverRoute2 = _interopRequireDefault(_voiceoverRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
	app.use(_constants2.default.API_PREFIX + '/actors', _actorRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/countries', _countryRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/follows', _followRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/genres', _genreRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/groups', _groupRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/likes', _likeRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/members', _memberRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/posts', _postRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/movies', _movieRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/rates', _rateRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/users', _userRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/voiceovers', _voiceoverRoute2.default);
}; /* eslint-disable no-console */

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("express-list-endpoints");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(13);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(23);

var _middleware = __webpack_require__(24);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(25);

var _modules2 = _interopRequireDefault(_modules);

var _expressListEndpoints = __webpack_require__(26);

var _expressListEndpoints2 = _interopRequireDefault(_expressListEndpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
(0, _middleware2.default)(app);

app.get('/', (req, res) => {
	res.send('Welcome!');
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
		console.log(`
      Running on ${_constants2.default.HOST}:${_constants2.default.PORT}
    `);
	}
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ownMovie = ownMovie;

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieModel = __webpack_require__(17);

var _movieModel2 = _interopRequireDefault(_movieModel);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 29 */
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

var _actorModel = __webpack_require__(30);

var _actorModel2 = _interopRequireDefault(_actorModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _actorUtil = __webpack_require__(32);

var util = _interopRequireWildcard(_actorUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group actors - Operations about actors
 *
 */

async function getActorsStats(req, res, next) {
	try {
		res.actorsStats = {
			count: await _actorModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getActors(req, res, next) {
	try {
		let _ref = await _actorModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    actorsMeta = _objectWithoutProperties(_ref, ['docs']);

		res.actors = docs;
		res.actorsMeta = actorsMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getActorById(req, res, next) {
	try {
		res.actor = await _actorModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createActor(req, res, next) {
	try {
		res.actor = await _actorModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteActor(req, res, next) {
	try {
		const actor = await _actorModel2.default.findById(req.params.id);

		await actor.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _actorValidation = __webpack_require__(14);

var myValid = _interopRequireWildcard(_actorValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;

let actorSchema = new _mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
		trim: true
	},
	info: {
		type: String,
		trim: true
	},
	movies: [{
		type: ObjectId,
		ref: 'Movie',
		trim: true
	}],
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

exports.default = _mongoose2.default.model('Actor', actorSchema);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _actorController = __webpack_require__(29);

var actorController = _interopRequireWildcard(_actorController);

var _actorValidation = __webpack_require__(14);

var _actorValidation2 = _interopRequireDefault(_actorValidation);

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

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_actorValidation2.default.stats), actorController.getActorsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		actorsStats: res.actorsStats
	});
}).get('/', (0, _expressValidation2.default)(_actorValidation2.default.index), actorController.getActors, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		actors: res.actors,
		actorsMeta: res.actorsMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_actorValidation2.default.show), actorController.getActorById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		actor: res.actor
	});
}).post('/', (0, _expressValidation2.default)(_actorValidation2.default.create), actorController.createActor, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		actor: res.actor
	});
}).put('/:id', (0, _expressValidation2.default)(_actorValidation2.default.update), actorController.updateActor, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		actor: res.actor
	});
}).delete('/:id', (0, _expressValidation2.default)(_actorValidation2.default.delete), actorController.deleteActor, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFollowsStats = getFollowsStats;
exports.getFollows = getFollows;
exports.getFollowById = getFollowById;
exports.createFollow = createFollow;
exports.updateFollow = updateFollow;
exports.deleteFollow = deleteFollow;

var _followModel = __webpack_require__(34);

var _followModel2 = _interopRequireDefault(_followModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followUtil = __webpack_require__(36);

var util = _interopRequireWildcard(_followUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group follows - Operations about follows
 *
 */

async function getFollowsStats(req, res, next) {
	try {
		res.followsStats = {
			count: await _followModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollows(req, res, next) {
	try {
		let _ref = await _followModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    followsMeta = _objectWithoutProperties(_ref, ['docs']);

		res.follows = docs;
		res.followsMeta = followsMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getFollowById(req, res, next) {
	try {
		res.follow = await _followModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createFollow(req, res, next) {
	try {
		res.follow = await _followModel2.default.create(req.body);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateFollow(req, res, next) {
	try {
		let follow = await _followModel2.default.findById(req.params.id);

		Object.keys(req.body).forEach(key => {
			follow[key] = req.body[key];
		});
		await follow.save();
		res.follow = follow;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteFollow(req, res, next) {
	try {
		const follow = await _followModel2.default.findById(req.params.id);

		await follow.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let followSchema = new _mongoose.Schema({
	followName: {
		type: String,
		required: [true, 'followName is required!'],
		trim: true,
		unique: true
	}
}, {
	timestamps: true
});

followSchema.statics = {};

followSchema.pre('save', function (next) {
	// this.slug = slugify(this.name, {
	// 	lower: true
	// })

	return next();
});

followSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
followSchema.plugin(_mongoosePaginate2.default);
followSchema.plugin(_mongooseAutopopulate2.default);
followSchema.plugin(pluginService.logPost, { schemaName: 'Follow' });
followSchema.plugin(pluginService.setSlugUrl, { schemaName: 'Follow' });

exports.default = _mongoose2.default.model('Follow', followSchema);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _followController = __webpack_require__(33);

var followController = _interopRequireWildcard(_followController);

var _followValidation = __webpack_require__(37);

var _followValidation2 = _interopRequireDefault(_followValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

var paramService = _interopRequireWildcard(_paramService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => getFollowsStats
 * GET /items => getFollows
 * GET /items/:id => getFollowById
 * POST /items/ => createFollow
 * PATCH/PUT /items/:id => updateFollow
 * DELETE /items/:id => deleteFollow
 */

// More router

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_followValidation2.default.stats), followController.getFollowsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		followsStats: res.followsStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_followValidation2.default.index), followController.getFollows, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		follows: res.follows,
		followsMeta: res.followsMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_followValidation2.default.show), followController.getFollowById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		follow: res.follow
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_followValidation2.default.create), followController.createFollow, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		follow: res.follow
	});
}).put('/:id', (0, _expressValidation2.default)(_followValidation2.default.update), followController.updateFollow, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		follow: res.follow
	});
}).delete('/:id', (0, _expressValidation2.default)(_followValidation2.default.delete), followController.deleteFollow, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getGenresStats = getGenresStats;
exports.getGenres = getGenres;
exports.getGenreById = getGenreById;
exports.createGenre = createGenre;
exports.updateGenre = updateGenre;
exports.deleteGenre = deleteGenre;

var _genreModel = __webpack_require__(39);

var _genreModel2 = _interopRequireDefault(_genreModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _genreUtil = __webpack_require__(41);

var util = _interopRequireWildcard(_genreUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group genres - Operations about genres
 *
 */

async function getGenresStats(req, res, next) {
	try {
		res.genresStats = {
			count: await _genreModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGenres(req, res, next) {
	try {
		let _ref = await _genreModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    genresMeta = _objectWithoutProperties(_ref, ['docs']);

		res.genres = docs;
		res.genresMeta = genresMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGenreById(req, res, next) {
	try {
		res.genre = await _genreModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createGenre(req, res, next) {
	try {
		res.genre = await _genreModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteGenre(req, res, next) {
	try {
		const genre = await _genreModel2.default.findById(req.params.id);

		await genre.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _genreValidation = __webpack_require__(15);

var myValid = _interopRequireWildcard(_genreValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let genreSchema = new _mongoose.Schema({
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
	movies: [{
		type: ObjectId,
		ref: 'Movie',
		trim: true
	}],
	groups: [{
		type: ObjectId,
		ref: 'Group',
		trim: true
	}]
}, {
	timestamps: true
});

genreSchema.pre('save', function (next) {
	this.slug = (0, _slugify2.default)(this.name, {
		lower: true
	});

	return next();
});

genreSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});
genreSchema.plugin(_mongoosePaginate2.default);
genreSchema.plugin(_mongooseAutopopulate2.default);
genreSchema.plugin(pluginService.logPost, { schemaName: 'Genre' });

exports.default = _mongoose2.default.model('Genre', genreSchema);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _genreController = __webpack_require__(38);

var genreController = _interopRequireWildcard(_genreController);

var _genreValidation = __webpack_require__(15);

var _genreValidation2 = _interopRequireDefault(_genreValidation);

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

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_genreValidation2.default.stats), genreController.getGenresStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genresStats: res.genresStats
	});
}).get('/', (0, _expressValidation2.default)(_genreValidation2.default.index), genreController.getGenres, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genres: res.genres,
		genresMeta: res.genresMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_genreValidation2.default.show), genreController.getGenreById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genre: res.genre
	});
}).post('/', (0, _expressValidation2.default)(_genreValidation2.default.create), genreController.createGenre, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genre: res.genre
	});
}).put('/:id', (0, _expressValidation2.default)(_genreValidation2.default.update), genreController.updateGenre, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		genre: res.genre
	});
}).delete('/:id', (0, _expressValidation2.default)(_genreValidation2.default.delete), genreController.deleteGenre, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getGroupsStats = getGroupsStats;
exports.getGroups = getGroups;
exports.getGroupById = getGroupById;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;

var _groupModel = __webpack_require__(43);

var _groupModel2 = _interopRequireDefault(_groupModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _groupUtil = __webpack_require__(45);

var util = _interopRequireWildcard(_groupUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group groups - Operations about groups
 *
 */

async function getGroupsStats(req, res, next) {
	try {
		res.groupsStats = {
			count: await _groupModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroups(req, res, next) {
	try {
		let _ref = await _groupModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    groupsMeta = _objectWithoutProperties(_ref, ['docs']);

		res.groups = docs;
		res.groupsMeta = groupsMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getGroupById(req, res, next) {
	try {
		res.group = await _groupModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createGroup(req, res, next) {
	try {
		res.group = await _groupModel2.default.create(Object.assign({}, req.body, {
			creator: req.user._id || ''
		}));

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteGroup(req, res, next) {
	try {
		const group = await _groupModel2.default.findById(req.params.id);

		await group.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _groupValidation = __webpack_require__(16);

var myValid = _interopRequireWildcard(_groupValidation);

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
		unique: true,
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
		type: ObjectId,
		ref: 'Genre',
		required: [true, 'Genre is required!'],
		autopopulate: true,
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
	incmembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: 1 } });
	},

	decmembersCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { membersCount: -1 } });
	},

	increquestsCount(groupId) {
		return this.findByIdAndUpdate(groupId, { $inc: { requestsCount: 1 } });
	},

	decrequestsCount(groupId) {
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _groupController = __webpack_require__(42);

var groupController = _interopRequireWildcard(_groupController);

var _groupValidation = __webpack_require__(16);

var _groupValidation2 = _interopRequireDefault(_groupValidation);

var _authService = __webpack_require__(9);

var _paramService = __webpack_require__(11);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Default Rest router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_groupValidation2.default.stats), groupController.getGroupsStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		groupsStats: res.groupsStats
	});
}).get('/', _paramService.parseParam, (0, _expressValidation2.default)(_groupValidation2.default.index), groupController.getGroups, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		groups: res.groups,
		groupsMeta: res.groupsMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_groupValidation2.default.show), groupController.getGroupById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		group: res.group
	});
}).post('/', _authService.authJwt, (0, _expressValidation2.default)(_groupValidation2.default.create), groupController.createGroup, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		group: res.group
	});
}).put('/:id', (0, _expressValidation2.default)(_groupValidation2.default.update), groupController.updateGroup, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		group: res.group
	});
}).delete('/:id', (0, _expressValidation2.default)(_groupValidation2.default.delete), groupController.deleteGroup, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 45 */
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
/* 46 */
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

var _likeModel = __webpack_require__(47);

var _likeModel2 = _interopRequireDefault(_likeModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _likeUtil = __webpack_require__(49);

var util = _interopRequireWildcard(_likeUtil);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getLikes(req, res, next) {
	try {
		let _ref = await _likeModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    likesMeta = _objectWithoutProperties(_ref, ['docs']);

		res.likes = docs;
		res.likesMeta = likesMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getLikeById(req, res, next) {
	try {
		res.like = await _likeModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createLike(req, res, next) {
	try {
		res.like = await _likeModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteLike(req, res, next) {
	try {
		const like = await _likeModel2.default.findById(req.params.id);

		await like.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let likeSchema = new _mongoose.Schema({
	likeName: {
		type: String,
		required: [true, 'likeName is required!'],
		trim: true,
		unique: true
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _likeController = __webpack_require__(46);

var likeController = _interopRequireWildcard(_likeController);

var _likeValidation = __webpack_require__(50);

var _likeValidation2 = _interopRequireDefault(_likeValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

var paramService = _interopRequireWildcard(_paramService);

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
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_likeValidation2.default.index), likeController.getLikes, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		likes: res.likes,
		likesMeta: res.likesMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_likeValidation2.default.show), likeController.getLikeById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		like: res.like
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_likeValidation2.default.create), likeController.createLike, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		like: res.like
	});
}).put('/:id', (0, _expressValidation2.default)(_likeValidation2.default.update), likeController.updateLike, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		like: res.like
	});
}).delete('/:id', (0, _expressValidation2.default)(_likeValidation2.default.delete), likeController.deleteLike, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 51 */
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

var _memberModel = __webpack_require__(52);

var _memberModel2 = _interopRequireDefault(_memberModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _memberUtil = __webpack_require__(54);

var util = _interopRequireWildcard(_memberUtil);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMembers(req, res, next) {
	try {
		let _ref = await _memberModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    membersMeta = _objectWithoutProperties(_ref, ['docs']);

		res.members = docs;
		res.membersMeta = membersMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMemberById(req, res, next) {
	try {
		res.member = await _memberModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createMember(req, res, next) {
	try {
		res.member = await _memberModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteMember(req, res, next) {
	try {
		const member = await _memberModel2.default.findById(req.params.id);

		await member.remove();

		next();
	} catch (e) {
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

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const ObjectId = _mongoose2.default.Schema.Types.ObjectId;


let memberSchema = new _mongoose.Schema({
	memberName: {
		type: String,
		required: [true, 'memberName is required!'],
		trim: true,
		unique: true
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _memberController = __webpack_require__(51);

var memberController = _interopRequireWildcard(_memberController);

var _memberValidation = __webpack_require__(55);

var _memberValidation2 = _interopRequireDefault(_memberValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

var paramService = _interopRequireWildcard(_paramService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_memberValidation2.default.stats), memberController.getMembersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		membersStats: res.membersStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_memberValidation2.default.index), memberController.getMembers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		members: res.members,
		membersMeta: res.membersMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_memberValidation2.default.show), memberController.getMemberById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		member: res.member
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_memberValidation2.default.create), memberController.createMember, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		member: res.member
	});
}).put('/:id', (0, _expressValidation2.default)(_memberValidation2.default.update), memberController.updateMember, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		member: res.member
	});
}).delete('/:id', (0, _expressValidation2.default)(_memberValidation2.default.delete), memberController.deleteMember, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMoviesStats = getMoviesStats;
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.createMovie = createMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;

var _movieModel = __webpack_require__(17);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable no-unused-vars */


/**
 * @group movies - Operations about movies
 *
 */

async function getMoviesStats(req, res, next) {
	try {
		res.moviesStats = {
			count: await _movieModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMovies(req, res, next) {
	try {
		let _ref = await _movieModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    moviesMeta = _objectWithoutProperties(_ref, ['docs']);

		res.movies = docs;
		res.moviesMeta = moviesMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMovieById(req, res, next) {
	try {
		res.movie = await _movieModel2.default.findById(req.params.id);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateMovie(req, res, next) {
	try {
		Object.keys(req.body).forEach(key => {
			req.movie[key] = req.body[key];
		});
		await req.movie.save();
		res.movie = req.movie;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteMovie(req, res, next) {
	try {
		await _movieModel2.default.findOneAndDelete(req.movie._id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieController = __webpack_require__(56);

var movieController = _interopRequireWildcard(_movieController);

var _movieValidation = __webpack_require__(58);

var _movieValidation2 = _interopRequireDefault(_movieValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

var paramService = _interopRequireWildcard(_paramService);

var _ownMiddleware = __webpack_require__(28);

var ownMiddleware = _interopRequireWildcard(_ownMiddleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/ => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

//  Default router
router.get('/stats', (0, _expressValidation2.default)(_movieValidation2.default.stats), movieController.getMoviesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		moviesStats: res.moviesStats
	});
}).get('/', (0, _expressValidation2.default)(_movieValidation2.default.index), paramService.parseParam, movieController.getMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movies: res.movies,
		moviesMeta: res.moviesMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_movieValidation2.default.show), movieController.getMovieById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).post('/', (0, _expressValidation2.default)(_movieValidation2.default.create), authService.authJwt, movieController.createMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).put('/:id', (0, _expressValidation2.default)(_movieValidation2.default.update), ownMiddleware.ownMovie, movieController.updateMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).delete('/:id', (0, _expressValidation2.default)(_movieValidation2.default.delete), movieController.deleteMovie, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

// More router

exports.default = router;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 59 */
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

var _postModel = __webpack_require__(60);

var _postModel2 = _interopRequireDefault(_postModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postUtil = __webpack_require__(62);

var util = _interopRequireWildcard(_postUtil);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getPosts(req, res, next) {
	try {
		let _ref = await _postModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    postsMeta = _objectWithoutProperties(_ref, ['docs']);

		res.posts = docs;
		res.postsMeta = postsMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getPostById(req, res, next) {
	try {
		res.post = await _postModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createPost(req, res, next) {
	try {
		res.post = await _postModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deletePost(req, res, next) {
	try {
		const post = await _postModel2.default.findById(req.params.id);

		await post.remove();

		next();
	} catch (e) {
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

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _postValidation = __webpack_require__(18);

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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postController = __webpack_require__(59);

var postController = _interopRequireWildcard(_postController);

var _postValidation = __webpack_require__(18);

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
		posts: res.posts,
		postsMeta: res.postsMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_postValidation2.default.show), postController.getPostById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		post: res.post
	});
}).post('/', (0, _expressValidation2.default)(_postValidation2.default.create), postController.createPost, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		post: res.post
	});
}).put('/:id', (0, _expressValidation2.default)(_postValidation2.default.update), postController.updatePost, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		post: res.post
	});
}).delete('/:id', (0, _expressValidation2.default)(_postValidation2.default.delete), postController.deletePost, function (req, res, next) {
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
exports.getRatesStats = getRatesStats;
exports.getRates = getRates;
exports.getRateById = getRateById;
exports.createRate = createRate;
exports.updateRate = updateRate;
exports.deleteRate = deleteRate;

var _rateModel = __webpack_require__(64);

var _rateModel2 = _interopRequireDefault(_rateModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _rateUtil = __webpack_require__(66);

var util = _interopRequireWildcard(_rateUtil);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRates(req, res, next) {
	try {
		let _ref = await _rateModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    ratesMeta = _objectWithoutProperties(_ref, ['docs']);

		res.rates = docs;
		res.ratesMeta = ratesMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getRateById(req, res, next) {
	try {
		res.rate = await _rateModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createRate(req, res, next) {
	try {
		res.rate = await _rateModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteRate(req, res, next) {
	try {
		const rate = await _rateModel2.default.findById(req.params.id);

		await rate.remove();

		next();
	} catch (e) {
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

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _rateController = __webpack_require__(63);

var rateController = _interopRequireWildcard(_rateController);

var _rateValidation = __webpack_require__(67);

var _rateValidation2 = _interopRequireDefault(_rateValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

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
		rates: res.rates,
		ratesMeta: res.ratesMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_rateValidation2.default.show), rateController.getRateById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		rate: res.rate
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_rateValidation2.default.create), rateController.createRate, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		rate: res.rate
	});
}).put('/:id', (0, _expressValidation2.default)(_rateValidation2.default.update), rateController.updateRate, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		rate: res.rate
	});
}).delete('/:id', (0, _expressValidation2.default)(_rateValidation2.default.delete), rateController.deleteRate, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 66 */
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getUsersStats = getUsersStats;
exports.getProfile = getProfile;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.localLogin = localLogin;
exports.facebookLogin = facebookLogin;

var _userModel = __webpack_require__(19);

var _userModel2 = _interopRequireDefault(_userModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userUtil = __webpack_require__(70);

var util = _interopRequireWildcard(_userUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// eslint-disable-next-line no-unused-vars


/**
 * @group users - Operations about users
 *
 */

async function getUsersStats(req, res, next) {
	try {
		res.usersStats = {
			count: await _userModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getProfile(req, res, next) {
	try {
		req.authenUser = req.user.toAuthJSON();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUsers(req, res, next) {
	try {
		let _ref = await _userModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    usersMeta = _objectWithoutProperties(_ref, ['docs']);

		res.users = docs;
		res.usersMeta = usersMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUserById(req, res, next) {
	try {
		res.user = await _userModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createUser(req, res, next) {
	try {
		const user = await _userModel2.default.create(Object.assign({}, req.body, { provider: 'local' }));
		req.user = user.toAuthJSON();

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteUser(req, res, next) {
	try {
		const user = await _userModel2.default.findById(req.params.id);

		await user.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

function localLogin(req, res, next) {
	req.user = req.user.toAuthJSON();
	return next();
}
function facebookLogin(req, res, next) {
	// req.user is inited
	return next();
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userController = __webpack_require__(68);

var userController = _interopRequireWildcard(_userController);

var _userValidation = __webpack_require__(20);

var _userValidation2 = _interopRequireDefault(_userValidation);

var _authService = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => getUsersStats
 * GET /items => getUsers
 * GET /items/:id => getUserById
 * POST /items/ => createUser
 * PATCH/PUT /items/:id => updateUser
 * DELETE /items/:id => deleteUser
 */

// More router
router.get('/current', _authService.authJwt, userController.getProfile, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: req.user
	});
}).post('/signup', (0, _expressValidation2.default)(_userValidation2.default.create), userController.createUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: req.user
	});
}).post('/login', _authService.authLocal, userController.localLogin, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: req.user
	});
}).get('/auth/facebook', _authService.authFacebook).get('/auth/facebook/callback', _authService.authFacebook, userController.facebookLogin, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: req.user
	});
});

//  Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_userValidation2.default.stats), userController.getUsersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		usersStats: res.usersStats
	});
}).get('/', (0, _expressValidation2.default)(_userValidation2.default.index), userController.getUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		users: res.users,
		usersMeta: res.usersMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_userValidation2.default.show), userController.getUserById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: res.user
	});
}).post('/', (0, _expressValidation2.default)(_userValidation2.default.create), userController.createUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: req.user
	});
}).put('/:id', (0, _expressValidation2.default)(_userValidation2.default.update), userController.updateUser, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		user: res.user
	});
}).delete('/:id', (0, _expressValidation2.default)(_userValidation2.default.delete), userController.deleteUser, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getVoiceoversStats = getVoiceoversStats;
exports.getVoiceovers = getVoiceovers;
exports.getVoiceoverById = getVoiceoverById;
exports.createVoiceover = createVoiceover;
exports.updateVoiceover = updateVoiceover;
exports.deleteVoiceover = deleteVoiceover;

var _voiceoverModel = __webpack_require__(72);

var _voiceoverModel2 = _interopRequireDefault(_voiceoverModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @group voiceovers - Operations about voiceovers
 *
 */

/* eslint-disable no-unused-vars */
async function getVoiceoversStats(req, res, next) {
	try {
		res.voiceoversStats = {
			count: await _voiceoverModel2.default.estimatedDocumentCount()
		};

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getVoiceoverById(req, res, next) {
	try {
		res.voiceover = await _voiceoverModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createVoiceover(req, res, next) {
	try {
		res.voiceover = await _voiceoverModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteVoiceover(req, res, next) {
	try {
		const voiceover = await _voiceoverModel2.default.findById(req.params.id);

		await voiceover.remove();

		next();
	} catch (e) {
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

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _voiceoverValidation = __webpack_require__(21);

var myValid = _interopRequireWildcard(_voiceoverValidation);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

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
		required: [true, 'Request indentifier is required!'],
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
		trim: true
	},
	uploader: {
		type: ObjectId,
		ref: 'User',
		trim: true
	}
}, {
	timestamps: true
});
voiceoverSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('Voiceover', voiceoverSchema);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _voiceoverController = __webpack_require__(71);

var voiceoverController = _interopRequireWildcard(_voiceoverController);

var _voiceoverValidation = __webpack_require__(21);

var _voiceoverValidation2 = _interopRequireDefault(_voiceoverValidation);

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

//  Default router
/* eslint-disable no-unused-vars */
router.get('/stats', (0, _expressValidation2.default)(_voiceoverValidation2.default.stats), voiceoverController.getVoiceoversStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceoversStats: res.voiceoversStats
	});
}).get('/', (0, _expressValidation2.default)(_voiceoverValidation2.default.index), voiceoverController.getVoiceoversStats, voiceoverController.getVoiceovers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceovers: res.voiceovers,
		voiceoversStats: res.voiceoversStats
	});
}).get('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.show), voiceoverController.getVoiceoverById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceover: res.voiceover
	});
}).post('/', (0, _expressValidation2.default)(_voiceoverValidation2.default.create), voiceoverController.createVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceover: res.voiceover
	});
}).put('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.update), voiceoverController.updateVoiceover, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		voiceover: res.voiceover
	});
}).delete('/:id', (0, _expressValidation2.default)(_voiceoverValidation2.default.delete), voiceoverController.deleteVoiceover, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

// More router

exports.default = router;

/***/ }),
/* 74 */,
/* 75 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("mongoose-float");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.genderToNumber = genderToNumber;
function genderToNumber(gender) {
	if (gender == 'male') return 1;
	if (gender == 'female') return 2;
	return 0;
}

/***/ }),
/* 87 */
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

var _countryModel = __webpack_require__(88);

var _countryModel2 = _interopRequireDefault(_countryModel);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _countryUtil = __webpack_require__(90);

var util = _interopRequireWildcard(_countryUtil);

var _countries = __webpack_require__(93);

var _countries2 = _interopRequireDefault(_countries);

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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getCountries(req, res, next) {
	try {
		let _ref = await _countryModel2.default.paginate({}, req.parsedParams),
		    { docs } = _ref,
		    countriesMeta = _objectWithoutProperties(_ref, ['docs']);

		res.countries = docs;
		res.countriesMeta = countriesMeta;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getCountryById(req, res, next) {
	try {
		res.country = await _countryModel2.default.findById(req.params.id);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function createCountry(req, res, next) {
	try {
		res.country = await _countryModel2.default.create(req.body);

		next();
	} catch (e) {
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
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteCountry(req, res, next) {
	try {
		const country = await _countryModel2.default.findById(req.params.id);

		await country.remove();

		next();
	} catch (e) {
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

var _validator = __webpack_require__(8);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(5);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseAutopopulate = __webpack_require__(6);

var _mongooseAutopopulate2 = _interopRequireDefault(_mongooseAutopopulate);

var _mongooseUniqueValidator = __webpack_require__(7);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(12);

var _slugify2 = _interopRequireDefault(_slugify);

var _pluginService = __webpack_require__(10);

var pluginService = _interopRequireWildcard(_pluginService);

var _regex = __webpack_require__(92);

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(3);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(0);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _countryController = __webpack_require__(87);

var countryController = _interopRequireWildcard(_countryController);

var _countryValidation = __webpack_require__(91);

var _countryValidation2 = _interopRequireDefault(_countryValidation);

var _authService = __webpack_require__(9);

var authService = _interopRequireWildcard(_authService);

var _paramService = __webpack_require__(11);

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
		countries: res.countries
	});
});

// Default Rest router
router.get('/stats', (0, _expressValidation2.default)(_countryValidation2.default.stats), countryController.getCountriesStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		countriesStats: res.countriesStats
	});
}).get('/', paramService.parseParam, (0, _expressValidation2.default)(_countryValidation2.default.index), countryController.getCountries, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		countries: res.countries,
		countriesMeta: res.countriesMeta
	});
}).get('/:id', (0, _expressValidation2.default)(_countryValidation2.default.show), countryController.getCountryById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		country: res.country
	});
}).post('/', authService.authJwt, (0, _expressValidation2.default)(_countryValidation2.default.create), countryController.createCountry, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		country: res.country
	});
}).put('/:id', (0, _expressValidation2.default)(_countryValidation2.default.update), countryController.updateCountry, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		country: res.country
	});
}).delete('/:id', (0, _expressValidation2.default)(_countryValidation2.default.delete), countryController.deleteCountry, function (req, res, next) {
	return res.sendStatus(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 90 */
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _joi = __webpack_require__(4);

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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const countryCodeReg = exports.countryCodeReg = /^\w{2}$/;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable prettier/prettier */
exports.default = [{ name: 'Afghanistan', code: 'AF' }, { name: 'Åland Islands', code: 'AX' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' }, { name: 'American Samoa', code: 'AS' }, { name: 'AndorrA', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Anguilla', code: 'AI' }, { name: 'Antarctica', code: 'AQ' }, { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' }, { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Bouvet Island', code: 'BV' }, { name: 'Brazil', code: 'BR' }, { name: 'British Indian Ocean Territory', code: 'IO' }, { name: 'Brunei Darussalam', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' }, { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' }, { name: 'Cayman Islands', code: 'KY' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' }, { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' }, { name: 'Christmas Island', code: 'CX' }, { name: 'Cocos (Keeling) Islands', code: 'CC' }, { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' }, { name: 'Congo, The Democratic Republic of the', code: 'CD' }, { name: 'Cook Islands', code: 'CK' }, { name: 'Costa Rica', code: 'CR' }, { name: 'Cote D\'Ivoire', code: 'CI' }, { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' }, { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' }, { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' }, { name: 'El Salvador', code: 'SV' }, { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Falkland Islands (Malvinas)', code: 'FK' }, { name: 'Faroe Islands', code: 'FO' }, { name: 'Fiji', code: 'FJ' }, { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'French Guiana', code: 'GF' }, { name: 'French Polynesia', code: 'PF' }, { name: 'French Southern Territories', code: 'TF' }, { name: 'Gabon', code: 'GA' }, { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' }, { name: 'Ghana', code: 'GH' }, { name: 'Gibraltar', code: 'GI' }, { name: 'Greece', code: 'GR' }, { name: 'Greenland', code: 'GL' }, { name: 'Grenada', code: 'GD' }, { name: 'Guadeloupe', code: 'GP' }, { name: 'Guam', code: 'GU' }, { name: 'Guatemala', code: 'GT' }, { name: 'Guernsey', code: 'GG' }, { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Heard Island and Mcdonald Islands', code: 'HM' }, { name: 'Holy See (Vatican City State)', code: 'VA' }, { name: 'Honduras', code: 'HN' }, { name: 'Hong Kong', code: 'HK' }, { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Iran, Islamic Republic Of', code: 'IR' }, { name: 'Iraq', code: 'IQ' }, { name: 'Ireland', code: 'IE' }, { name: 'Isle of Man', code: 'IM' }, { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' }, { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jersey', code: 'JE' }, { name: 'Jordan', code: 'JO' }, { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kiribati', code: 'KI' }, { name: 'Korea, Democratic People\'S Republic of', code: 'KP' }, { name: 'Korea, Republic of', code: 'KR' }, { name: 'Kuwait', code: 'KW' }, { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Lao People\'S Democratic Republic', code: 'LA' }, { name: 'Latvia', code: 'LV' }, { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' }, { name: 'Liberia', code: 'LR' }, { name: 'Libyan Arab Jamahiriya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' }, { name: 'Macao', code: 'MO' }, { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' }, { name: 'Madagascar', code: 'MG' }, { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' }, { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Marshall Islands', code: 'MH' }, { name: 'Martinique', code: 'MQ' }, { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' }, { name: 'Mayotte', code: 'YT' }, { name: 'Mexico', code: 'MX' }, { name: 'Micronesia, Federated States of', code: 'FM' }, { name: 'Moldova, Republic of', code: 'MD' }, { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' }, { name: 'Montserrat', code: 'MS' }, { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' }, { name: 'Namibia', code: 'NA' }, { name: 'Nauru', code: 'NR' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' }, { name: 'Netherlands Antilles', code: 'AN' }, { name: 'New Caledonia', code: 'NC' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' }, { name: 'Nigeria', code: 'NG' }, { name: 'Niue', code: 'NU' }, { name: 'Norfolk Island', code: 'NF' }, { name: 'Northern Mariana Islands', code: 'MP' }, { name: 'Norway', code: 'NO' }, { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' }, { name: 'Palau', code: 'PW' }, { name: 'Palestinian Territory, Occupied', code: 'PS' }, { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' }, { name: 'Philippines', code: 'PH' }, { name: 'Pitcairn', code: 'PN' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' }, { name: 'Puerto Rico', code: 'PR' }, { name: 'Qatar', code: 'QA' }, { name: 'Reunion', code: 'RE' }, { name: 'Romania', code: 'RO' }, { name: 'Russian Federation', code: 'RU' }, { name: 'RWANDA', code: 'RW' }, { name: 'Saint Helena', code: 'SH' }, { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' }, { name: 'Saint Pierre and Miquelon', code: 'PM' }, { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Samoa', code: 'WS' }, { name: 'San Marino', code: 'SM' }, { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' }, { name: 'Serbia and Montenegro', code: 'CS' }, { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' }, { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' }, { name: 'South Georgia and the South Sandwich Islands', code: 'GS' }, { name: 'Spain', code: 'ES' }, { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' }, { name: 'Svalbard and Jan Mayen', code: 'SJ' }, { name: 'Swaziland', code: 'SZ' }, { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syrian Arab Republic', code: 'SY' }, { name: 'Taiwan, Province of China', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania, United Republic of', code: 'TZ' }, { name: 'Thailand', code: 'TH' }, { name: 'Timor-Leste', code: 'TL' }, { name: 'Togo', code: 'TG' }, { name: 'Tokelau', code: 'TK' }, { name: 'Tonga', code: 'TO' }, { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' }, { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' }, { name: 'Turks and Caicos Islands', code: 'TC' }, { name: 'Tuvalu', code: 'TV' }, { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' }, { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' }, { name: 'United States Minor Outlying Islands', code: 'UM' }, { name: 'Uruguay', code: 'UY' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vanuatu', code: 'VU' }, { name: 'Venezuela', code: 'VE' }, { name: 'Viet Nam', code: 'VN' }, { name: 'Virgin Islands, British', code: 'VG' }, { name: 'Virgin Islands, U.S.', code: 'VI' }, { name: 'Wallis and Futuna', code: 'WF' }, { name: 'Western Sahara', code: 'EH' }, { name: 'Yemen', code: 'YE' }, { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' }];

/***/ })
/******/ ]);