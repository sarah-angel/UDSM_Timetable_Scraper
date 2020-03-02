import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import apiRoutes from './routes/api.routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use('/', apiRoutes)

export default app
