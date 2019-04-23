import express from 'express'
import con from './config/constants'
import './config/database'
import middlewareConfig from './config/middleware'
import apiRoutes from './modules'
import listEndpoints from 'express-list-endpoints'
import fileUpload from 'express-fileupload'

const app = express()
middlewareConfig(app)

// default options
app.use(fileUpload())

app.get('/', (req, res) => {
	res.send('Welcome!')
})

app.get('/api', (req, res) => {
	res.send(listEndpoints(app))
})

apiRoutes(app)

app.listen(con.PORT, err => {
	if (err) {
		throw err
	} else {
		// eslint-disable-next-line no-console
		console.log(`
      Running on ${con.HOST}:${con.PORT}
    `)
	}
})
