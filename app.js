const express = require('express')
require('express-async-errors')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogs_router = require('./controllers/blogs')
const users_router = require('./controllers/users')
const login_router = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/blogs', middleware.user_extractor, blogs_router)
app.use('/api/users', users_router)
app.use('/api/login', login_router)

if (process.env.NODE_ENV === 'test') {
  const testing_router = require('./controllers/testing')
  app.use('/api/testing', testing_router)
}

app.get('/health', (req, res) => {
  res.send('Im good here')
})


app.use(middleware.error_handler)

module.exports = app