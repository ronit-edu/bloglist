const jwt = require('jsonwebtoken')
const User = require('../models/user')

const user_extractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    const decoded_token = jwt.verify(token, process.env.SECRET)
    if (!decoded_token.id) {
      request.user = null
    }
    const user = await User.findById(decoded_token.id)
    request.user = user
  } else {
    request.user = null
  }
  next()
}

const error_handler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  error_handler, user_extractor
}