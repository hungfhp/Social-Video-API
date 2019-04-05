/* eslint-disable no-console */
import con from '../config/constants'

import actorRoute from './actor/actorRoute'
import countryRoute from './country/countryRoute'
import followRoute from './follow/followRoute'
import genreRoute from './genre/genreRoute'
import groupRoute from './group/groupRoute'
import likeRoute from './like/likeRoute'
import memberRoute from './member/memberRoute'
import movieRoute from './movie/movieRoute'
import postRoute from './post/postRoute'
import rateRoute from './rate/rateRoute'
import userRoute from './user/userRoute'
import voiceoverRoute from './voiceover/voiceoverRoute'

export default app => {
	app.use(con.API_PREFIX + '/actors', actorRoute)
	app.use(con.API_PREFIX + '/countries', countryRoute)
	app.use(con.API_PREFIX + '/follows', followRoute)
	app.use(con.API_PREFIX + '/genres', genreRoute)
	app.use(con.API_PREFIX + '/groups', groupRoute)
	app.use(con.API_PREFIX + '/likes', likeRoute)
	app.use(con.API_PREFIX + '/members', memberRoute)
	app.use(con.API_PREFIX + '/posts', postRoute)
	app.use(con.API_PREFIX + '/movies', movieRoute)
	app.use(con.API_PREFIX + '/rates', rateRoute)
	app.use(con.API_PREFIX + '/users', userRoute)
	app.use(con.API_PREFIX + '/voiceovers', voiceoverRoute)
}
