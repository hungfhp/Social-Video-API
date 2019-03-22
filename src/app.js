import express from 'express'
import con from './config/constants'
import './config/database'
import middlewareConfig from './config/middleware'
import apiRoutes from './modules'
// import userRoute from './modules/user/userRoute'

const app = express()
middlewareConfig(app)

app.get('/', (req, res) => {
	res.send('Hello hihi!')
})

apiRoutes(app)

app.listen(con.PORT, err => {
	if (err) {
		throw err
	} else {
		// eslint-disable-next-line no-console
		console.log(`
      Server running on port: ${con.PORT}
      Running on ${con.HOST}
      Make something great!
    `)
	}
})
