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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable indent */
/* eslint-disable no-undef */
const devConfig = {
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
};

const testConfig = {
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
};

const prodConfig = {
	MONGO_URL: 'mongodb://hungdm:30c15b7800213b2844e224a1f5fbdfb0@43.239.223.206:27017/gr2019'
};

const defaultConfig = {
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 3000,
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("http-status");

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(37);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(9);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _bcryptNodejs = __webpack_require__(26);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(30);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(31);

var _lodash2 = _interopRequireDefault(_lodash);

var _userValidation = __webpack_require__(5);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		// required: [true, 'Password is required!'],
		trim: true,
		minlength: [6, 'Password need to be longer!'],
		validate: {
			validator(password) {
				return _userValidation.passwordReg.test(password);
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
	friendsRequest: {
		type: Array, // ObjectId User
		trim: true
	}
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

userSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // eslint-disable-next-line no-unused-vars
exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authFacebook = exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(11);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(35);

var _passportFacebook = __webpack_require__(33);

var _passportJwt = __webpack_require__(34);

var _userModel = __webpack_require__(4);

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _helperService = __webpack_require__(25);

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
			newUser.gender = (0, _helperService.genderToNumber)(profile.gender);
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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _morgan = __webpack_require__(32);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(27);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(28);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(29);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(11);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _userRoute = __webpack_require__(23);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _movieRoute = __webpack_require__(19);

var _movieRoute2 = _interopRequireDefault(_movieRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
	app.use(_constants2.default.API_PREFIX + '/users', _userRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/movies', _movieRoute2.default);
}; /* eslint-disable no-console */

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-list-endpoints");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(12);

var _middleware = __webpack_require__(13);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(14);

var _modules2 = _interopRequireDefault(_modules);

var _expressListEndpoints = __webpack_require__(15);

var _expressListEndpoints2 = _interopRequireDefault(_expressListEndpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
(0, _middleware2.default)(app);

app.get('/', (req, res) => {
	res.send('Hello hihi!');
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
/* 17 */
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

var _movieModel = __webpack_require__(18);

var _movieModel2 = _interopRequireDefault(_movieModel);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieUtil = __webpack_require__(20);

var util = _interopRequireWildcard(_movieUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
async function getMovies(req, res, next) {
	// const limit = parseInt(req.query.limit, 0)
	// const skip = parseInt(req.query.skip, 0)

	try {
		res.movies = await _movieModel2.default.find(Object.assign({}, req.query));

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getMovieById(req, res, next) {
	try {
		res.movie = await _movieModel2.default.findById(req.params.id).populate('uploader');

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
		console.log(req.body);

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function updateMovie(req, res, next) {
	try {
		let movie = await _movieModel2.default.findById(req.params.id);
		// util.isOwn(movie, req, res, next)

		Object.keys(req.body).forEach(key => {
			movie[key] = req.body[key];
		});
		await movie.save();
		res.movie = movie;

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function deleteMovie(req, res, next) {
	try {
		const movie = await _movieModel2.default.findById(req.params.id);

		// util.isOwn(movie, req, res, next)

		await movie.remove();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(9);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _mongooseUniqueValidator = __webpack_require__(10);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _slugify = __webpack_require__(36);

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectId = _mongoose2.default.Schema.Types.ObjectId; /**
                                                            * @typedef movies
                                                            * @property {string} _id
                                                            * @property {string} movieName
                                                            */

// import validator from 'validator'
// import * as myValid from './movieValidation'


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
	uploader: {
		type: ObjectId,
		ref: 'User',
		required: [true, 'Uploader is required!'],
		trim: true
	},
	embedUrl: {
		type: String,
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
	thumbnailUrl: {
		type: String,
		trim: true
	},
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
	genres: {
		type: Array,
		trim: true
	},
	status: {
		type: String,
		trim: true
	},
	premiere: {
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
	actors: {
		type: Array,
		trim: true
	},
	tags: {
		type: Array,
		trim: true
	},
	directorName: {
		type: String,
		trim: true
	},
	// 240 360 480 720 1080 2048 4096
	quality: {
		type: Number,
		trim: true
	},
	viewsCount: {
		type: Number,
		trim: true
	},
	likedCount: {
		type: Number,
		trim: true
	},
	favoritesCount: {
		type: Number,
		trim: true
	},
	ratingAvg: {
		type: Number,
		trim: true
	},
	ratingCount: {
		type: Number,
		trim: true
	}
}, {
	timestamps: true
});

movieSchema.pre('save', function (next) {
	this.slug = (0, _slugify2.default)(this.name, {
		lower: true
	});

	this.slugOrigin = (0, _slugify2.default)(this.nameOrigin || this.name, {
		lower: true
	});

	this.url = (0, _slugify2.default)(this.name, {
		lower: true
	}) + '_' + this._id;

	return next();
});

movieSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

movieSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('movie', movieSchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _movieController = __webpack_require__(17);

var movieController = _interopRequireWildcard(_movieController);

var _movieValidation = __webpack_require__(21);

var _movieValidation2 = _interopRequireDefault(_movieValidation);

var _authService = __webpack_require__(6);

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
}).get('/', (0, _expressValidation2.default)(_movieValidation2.default.index), movieController.getMoviesStats, movieController.getMovies, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movies: res.movies,
		moviesStats: res.moviesStats
	});
}).get('/:id', (0, _expressValidation2.default)(_movieValidation2.default.show), movieController.getMovieById, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).post('/', _authService.authJwt,
// validate(movieValidation.create),
movieController.createMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).put('/:id', (0, _expressValidation2.default)(_movieValidation2.default.update), movieController.updateMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		movie: res.movie
	});
}).delete('/:id', (0, _expressValidation2.default)(_movieValidation2.default.delete), movieController.deleteMovie, function (req, res, next) {
	return res.status(_httpStatus2.default.OK);
});

// More router

exports.default = router;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
exports.isOwn = isOwn;

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function debug(obj) {
	console.log(obj);
} /* eslint-disable no-console */
function isOwn(movie, req, res) {
	if (!movie.user.equals(req.user._id)) {
		return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
	}
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; /* eslint-disable no-unused-vars */
exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	delete: {}
};

/***/ }),
/* 22 */
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

var _userModel = __webpack_require__(4);

var _userModel2 = _interopRequireDefault(_userModel);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userUtil = __webpack_require__(24);

var util = _interopRequireWildcard(_userUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */
async function getProfile(req, res, next) {
	try {
		req.authenUser = req.user.toAuthJSON();

		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function getUsers(req, res, next) {
	const limit = parseInt(req.query.limit, 0);
	const skip = parseInt(req.query.skip, 0);

	try {
		res.users = await _userModel2.default.find(Object.assign({}, req.query));

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
		// util.isOwn(user, req, res, next)

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

		// util.isOwn(user, req, res, next)

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(2);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(1);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userController = __webpack_require__(22);

var userController = _interopRequireWildcard(_userController);

var _userValidation = __webpack_require__(5);

var _userValidation2 = _interopRequireDefault(_userValidation);

var _authService = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
const router = new _express.Router();

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/:id => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
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

//  Default router
router.get('/stats', (0, _expressValidation2.default)(_userValidation2.default.stats), userController.getUsersStats, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		usersStats: res.usersStats
	});
}).get('/', (0, _expressValidation2.default)(_userValidation2.default.index), userController.getUsersStats, userController.getUsers, function (req, res, next) {
	return res.status(_httpStatus2.default.OK).json({
		users: res.users,
		usersStats: res.usersStats
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
	return res.status(_httpStatus2.default.OK);
});

exports.default = router;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("slugify");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })
/******/ ]);