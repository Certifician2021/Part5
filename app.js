const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blog-lists')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const bodyParser = require('body-parser')


mongoose.connect(config.MONGODB_URI)
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)

app.use('/api/blogs',middleware.userExtractor, blogRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app