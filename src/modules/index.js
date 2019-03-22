/* eslint-disable no-console */
import con from '../config/constants'
import userRoute from './user/userRoute'
import postRoute from './post/postRoute'
import { authJwt } from '../services/authService'

export default app => {
	app.use(con.API_PREFIX + '/users', userRoute)
	app.use(con.API_PREFIX + '/posts', postRoute)
}
