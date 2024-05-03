const blogs_router = require('express').Router()
const Blog = require('../models/blog')

blogs_router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogs_router.post('/', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const blog = new Blog({ ...request.body, user: user._id })
  const saved_blog = await blog.save()
  user.blogs = user.blogs.concat(saved_blog._id)
  await user.save()
  response.status(201).json(await saved_blog.populate('user', { username: 1, name: 1 }))
})

blogs_router.delete('/:id', async (request, response) => {
  try {
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'invalid token' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog post does not exist' })
    }
    if (!(user.id.toString() === blog.user.toString())) {
      return response.status(401).json({ error: 'invalid token' })
    }
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    console.log(exception)
  }
})

blogs_router.put('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  if (blog) {
    response.status(200).end()
  } else {
    response.status(400).end()
  }
})

module.exports = blogs_router