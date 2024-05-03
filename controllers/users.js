const bcrypt = require('bcrypt')
const users_router = require('express').Router()
const User = require('../models/user')

users_router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

users_router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!(password && password.length >= 3)) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }
  const salt_rounds = 10
  const password_hash = await bcrypt.hash(password, salt_rounds)

  const user = new User({
    username,
    name,
    password_hash,
  })

  const saved_user = await user.save()

  response.status(201).json(saved_user)
})

module.exports = users_router