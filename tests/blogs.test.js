const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

// Token is for perttim: Pass1

// const get_token = async () => {
//     const logged_user = await api
//         .post("/api/login")
//         .send({
//             username: "perttim",
//             password: "Pertti1234"
//         })
//     return logged_user;
// }

const get_token = async () => {
  const logged_user = await api
    .post('/api/login')
    .send({
      'username': 'perttim',
      'password': 'Pass1'
    })
  const token = `Bearer ${logged_user.body.token}`
  return token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initial_blogs)
  await User.deleteMany({})
  await User.insertMany(helper.initial_users)
})

test('login', async () => {
  await api
    .post('/api/login')
    .send({
      'username': 'perttim',
      'password': 'Pass1'
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('GET /api/blogs', () => {

  test('has id property', async () => {
    const blogs = await api
      .get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {

  test('POST with title property missing', async () => {
    const token = await get_token()
    const new_blog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 23,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(new_blog)
      .expect(400)
    const blogs_after = await api.get('/api/blogs')
    expect(blogs_after.body).toHaveLength(helper.initial_blogs.length)
  })

  test('POST with url property missing', async () => {
    const token = await get_token()
    const new_blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 23,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(new_blog)
      .expect(400)
    const blogs_after = await api.get('/api/blogs')
    expect(blogs_after.body).toHaveLength(helper.initial_blogs.length)
  })
  test('POST with token missing', async () => {
    const new_blog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 23,
    }
    await api
      .post('/api/blogs')
      .send(new_blog)
      .expect(401)
    const blogs_after = await api.get('/api/blogs')
    expect(blogs_after.body).toHaveLength(helper.initial_blogs.length)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})