const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const login_router = require('express').Router()
const User = require('../models/user')

login_router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const password_correct = user === null
    ? false
    : await bcrypt.compare(password, user.password_hash)

  if (!(user && password_correct)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }


  const user_for_token = {
    username: user.username,
    id: user._id,
  }


  const token = jwt.sign(user_for_token, process.env.SECRET)


  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = login_router