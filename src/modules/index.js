/* eslint-disable no-console */
import con from '../config/constants'
import userRoute from './user/userRoute'
import movieRoute from './movie/movieRoute'

export default app => {
	app.use(con.API_PREFIX + '/users', userRoute)
	app.use(con.API_PREFIX + '/movies', movieRoute)
}
