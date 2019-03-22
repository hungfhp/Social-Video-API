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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable no-undef */
const devConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-dev'
};

const testConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-test'
};

const prodConfig = {
	MONGO_URL: 'mongodb://localhost:27017/mongoose-prod'
};

const defaultConfig = {
	PORT: process.env.PORT || 3000,
	API_PREFIX: '/api',
	JWT_SECRET: 'hihihihihihihi'
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

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.authJwt = exports.authLocal = undefined;

var _passport = __webpack_require__(12);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(32);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(31);

var _userModel = __webpack_require__(5);

var _userModel2 = _interopRequireDefault(_userModel);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
	usernameField: 'email'
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
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

_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', {
	session: false
});
const authJwt = exports.authJwt = _passport2.default.authenticate('jwt', {
	session: false
});

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
exports.passwordReg = undefined;

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	remove: {}
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validator = __webpack_require__(13);

var _validator2 = _interopRequireDefault(_validator);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(10);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _bcryptNodejs = __webpack_require__(25);

var _mongooseUniqueValidator = __webpack_require__(11);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _jsonwebtoken = __webpack_require__(29);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userValidation = __webpack_require__(6);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef users
 * @property {string} _id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
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
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
		trim: true,
		minlength: [6, 'Password need to be longer!'],
		validate: {
			validator(password) {
				return _userValidation.passwordReg.test(password);
			},
			message: '{VALUE} is not a valid password!'
		}
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
	toAuthJSON() {
		return {
			_id: this._id,
			email: this.email,
			token: `JWT ${this.createToken()}`
		};
	},
	toJSON() {
		return {
			_id: this._id,
			email: this.email
		};
	}
};

userSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(9);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

exports.default = {
	stats: {},
	index: {},
	show: {},
	create: {},
	update: {},
	remove: {}
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _morgan = __webpack_require__(30);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(26);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(27);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(28);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(12);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _userRoute = __webpack_require__(23);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _postRoute = __webpack_require__(20);

var _postRoute2 = _interopRequireDefault(_postRoute);

var _authService = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
exports.default = app => {
	app.use(_constants2.default.API_PREFIX + '/users', _userRoute2.default);
	app.use(_constants2.default.API_PREFIX + '/posts', _postRoute2.default);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(14);

var _middleware = __webpack_require__(15);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(16);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import userRoute from './modules/user/userRoute'

const app = (0, _express2.default)();
(0, _middleware2.default)(app);

app.get('/', (req, res) => {
	res.send('Hello hihi!');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
	if (err) {
		throw err;
	} else {
		// eslint-disable-next-line no-console
		console.log(`
      Server running on port: ${_constants2.default.PORT}
      Running on ${_constants2.default.HOST}
      Make something great!
    `);
	}
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stats = stats;
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.remove = remove;

var _postModel = __webpack_require__(19);

var _postModel2 = _interopRequireDefault(_postModel);

var _httpStatus = __webpack_require__(8);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _postUtil = __webpack_require__(21);

var util = _interopRequireWildcard(_postUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @group posts - Operations about posts
 *
 */

async function stats(req, res) {
	try {
		let result = {
			count: _postModel2.default.count()
		};

		return res.status(_httpStatus2.default.OK).json(result);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function index(req, res) {
	const limit = parseInt(req.query.limit, 0);
	const skip = parseInt(req.query.skip, 0);
	try {
		const users = await _postModel2.default.find(Object.assign({
			limit,
			skip
		}, req.query));

		return res.status(_httpStatus2.default.OK).json(posts);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function show(req, res) {
	try {
		const post = await _postModel2.default.findById(req.params.id).populate('user');

		return res.status(_httpStatus2.default.OK).json(post);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function create(req, res) {
	try {
		const post = await _postModel2.default.create(Object.assign({}, req.body));

		return res.status(_httpStatus2.default.CREATED).json(post);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function update(req, res) {
	try {
		const post = await _postModel2.default.findById(req.params.id);

		// util.isOwn(post, req, res)

		Object.keys(req.body).forEach(key => {
			post[key] = req.body[key];
		});

		return res.status(_httpStatus2.default.OK).json((await post.save()));
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function remove(req, res) {
	try {
		const post = await _postModel2.default.findById(req.params.id);

		// util.isOwn(post, req, res)

		await post.remove();

		return res.sendStatus(_httpStatus2.default.OK);
	} catch (e) {
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

var _validator = __webpack_require__(13);

var _validator2 = _interopRequireDefault(_validator);

var _slug = __webpack_require__(33);

var _slug2 = _interopRequireDefault(_slug);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = __webpack_require__(11);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _mongoosePaginate = __webpack_require__(10);

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

var _postValidation = __webpack_require__(4);

var myValid = _interopRequireWildcard(_postValidation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Schema = _mongoose2.default.Schema; /**
                                         * @typedef posts
                                         * @property {string} _id
                                         * @property {string} postName
                                         */

let postSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Title is required!'],
		minlength: [3, 'Title need to be longer!'],
		unique: true
	},
	text: {
		type: String,
		trim: true,
		required: [true, 'Text   is required!'],
		minlength: [10, 'Text   need to be longer!']
	},
	slug: {
		type: String,
		trim: true,
		lowercase: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	favoriteCount: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
});

postSchema.plugin(_mongooseUniqueValidator2.default, {
	message: '{VALUE} already taken!'
});

postSchema.pre('validate', function (next) {
	this._slugify();
	next();
});

postSchema.methods = {
	_slugify() {
		this.slug = (0, _slug2.default)(this.title);
	}
};

postSchema.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('post', postSchema);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _authService = __webpack_require__(2);

var _postController = __webpack_require__(18);

var postController = _interopRequireWildcard(_postController);

var _postValidation = __webpack_require__(4);

var _postValidation2 = _interopRequireDefault(_postValidation);

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
router.get('/stats', (0, _expressValidation2.default)(_postValidation2.default.stats), postController.stats).get('/', (0, _expressValidation2.default)(_postValidation2.default.index), postController.index).get('/:id', (0, _expressValidation2.default)(_postValidation2.default.show), postController.show).post('/', (0, _expressValidation2.default)(_postValidation2.default.create), _authService.authJwt, postController.create).put('/:id', (0, _expressValidation2.default)(_postValidation2.default.update), _authService.authJwt, postController.update).delete('/:id', (0, _expressValidation2.default)(_postValidation2.default.remove), _authService.authJwt, postController.remove);

// More router

exports.default = router;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.debug = debug;
exports.isOwn = isOwn;
function debug(obj) {
	console.log(obj);
}

function isOwn(post, req, res) {
	if (!post.user.equals(req.user._id)) {
		return res.sendStatus(HTTPStatus.UNAUTHORIZED);
	}
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStats = getStats;
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.login = login;

var _userModel = __webpack_require__(5);

var _userModel2 = _interopRequireDefault(_userModel);

var _httpStatus = __webpack_require__(8);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userUtil = __webpack_require__(24);

var util = _interopRequireWildcard(_userUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @group users - Operations about users
 *
 */

async function getStats(req, res, next) {
	try {
		let stats = {
			count: await _userModel2.default.estimatedDocumentCount()

			// callback(null,stats)
		};res.stats = stats;
		next();
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function index(req, res) {
	const limit = parseInt(req.query.limit, 0) || 10;
	const skip = parseInt(req.query.skip, 0) || 0;
	try {
		const users = await _userModel2.default.find(Object.assign({}, req.query));

		return res.status(_httpStatus2.default.OK).json(users);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function show(req, res) {
	try {
		const user = await _userModel2.default.findById(req.params.id).populate('user');

		return res.status(_httpStatus2.default.OK).json(user);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function create(req, res) {
	try {
		const user = await _userModel2.default.create(req.body);

		return res.status(_httpStatus2.default.CREATED).json(user.toAuthJSON());
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function update(req, res) {
	try {
		const user = await _userModel2.default.findById(req.params.id);

		// util.isOwn(user, req, res)

		Object.keys(req.body).forEach(key => {
			user[key] = req.body[key];
		});

		return res.status(_httpStatus2.default.OK).json((await user.save()));
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function remove(req, res) {
	try {
		const user = await _userModel2.default.findById(req.params.id);

		// util.isOwn(user, req, res)

		await user.remove();

		return res.sendStatus(_httpStatus2.default.OK);
	} catch (e) {
		return res.status(_httpStatus2.default.BAD_REQUEST).json(e);
	}
}

async function login(req, res, next) {
	res.status(_httpStatus2.default.OK).json(req.user.toAuthJSON());

	return next();
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(7);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _httpStatus = __webpack_require__(8);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _userController = __webpack_require__(22);

var userController = _interopRequireWildcard(_userController);

var _userValidation = __webpack_require__(6);

var _userValidation2 = _interopRequireDefault(_userValidation);

var _authService = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router();

/**
 * GET /items/stats => stats
 * GET /items => index
 * GET /items/:id => show
 * POST /items/:id => create
 * PATCH/PUT /items/:id => update
 * DELETE /items/:id => remove
 */

//  Default router
router.get('/stats', (0, _expressValidation2.default)(_userValidation2.default.stats), userController.getStats, function (req, res) {
	return res.status(_httpStatus2.default.OK).json({
		stats: res.stats
	});
});
router.get('/', (0, _expressValidation2.default)(_userValidation2.default.index), userController.index);
router.get('/:id', (0, _expressValidation2.default)(_userValidation2.default.show), userController.show);
router.post('/', (0, _expressValidation2.default)(_userValidation2.default.create), userController.create);
router.put('/:id', (0, _expressValidation2.default)(_userValidation2.default.update), userController.update);
router.delete('/:id', (0, _expressValidation2.default)(_userValidation2.default.remove), userController.remove);

// More router
router.post('/signup', (0, _expressValidation2.default)(_userValidation2.default.create), userController.create);
router.post('/login', _authService.authLocal, userController.login);

exports.default = router;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ })
/******/ ]);