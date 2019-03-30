import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import User from '../modules/user/userModel'
import constants from '../config/constants'
import { genderToNumber } from '../services/helperService'

const localOpts = {
	usernameField: 'email'
}

const localStrategy = new LocalStrategy(
	localOpts,
	async (email, password, done) => {
		try {
			const user = await User.findOne({
				email
			})
			if (!user) {
				return done(null, false)
			} else if (!user.authenticateUser(password)) {
				return done(null, false)
			}
			return done(null, user)
		} catch (e) {
			return done(e, false)
		}
	}
)

// Jwt strategy
const jwtOpts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: constants.JWT_SECRET
}

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
	try {
		const user = await User.findById(payload._id)

		if (!user) {
			return done(null, false)
		}

		return done(null, user)
	} catch (e) {
		return done(e, false)
	}
})

// Facebook
const fbOpts = {
	clientID: constants.FACEBOOK_APP_ID,
	clientSecret: constants.FACEBOOK_APP_SECRET,
	callbackURL: 'http://localhost:3000/api/users/auth/facebook/callback',
	enableProof: true,
	profileFields: [
		'id',
		'displayName',
		'email',
		'photos',
		'gender',
		'profileUrl'
	]
}

const facebookStrategy = new FacebookStrategy(
	fbOpts,
	async (accessToken, refreshToken, profile, done) => {
		try {
			const user = await User.findOne({
				email: profile._json.email
			})

			if (user) {
				return done(null, user)
			} else {
				let newUser = new User()
				newUser.fbId = profile.id
				newUser.name = profile._json.name
				newUser.gender = genderToNumber(profile.gender)
				newUser.email = profile._json.email || profile.id + '@facebook.com'
				newUser.provier = 'facebook'
				if (
					profile.photos &&
					profile.photos.length &&
					profile.photos[0].value
				) {
					newUser.avatarUrl = profile.photos[0].value
				}
				newUser.token = accessToken

				await newUser.save()
				return done(null, newUser)
			}
		} catch (e) {
			return done(e, false)
		}
	}
)

passport.use(localStrategy)
passport.use(jwtStrategy)
passport.use(facebookStrategy)

export const authLocal = passport.authenticate('local', { session: false })
export const authJwt = passport.authenticate('jwt', { session: false })
export const authFacebook = passport.authenticate('facebook', {
	session: false,
	display: 'popup'
})
