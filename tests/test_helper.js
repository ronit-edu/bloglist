
const Blog = require('../models/blog')

const initial_blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const initial_users = [
  {
    username: 'perttim',
    name: 'Pertti Maanala',
    password_hash: '$2a$10$Vk3bCsDS2HF.EB6L981et.q2zgqHsVV5bWW1SlLlI6GxOTpf.0Biu' // Pass1
  },
  {
    username: 'jarkkoju',
    name: 'Jarkko Juantola',
    password_hash: '$2a$10$Jz87oX2x52nARWO.Ji8rWu1jRWD4f3viyRXz6mLJ8GckTOGq5Cbda' // Pass2
  },
  {
    username: 'ppentti',
    name: 'Pentti Pasanen',
    password_hash: '$2a$10$2rbg55K8uzoWnSqX32XS3OrxWPvn52/sD1fxjPrY0BysSTV5rvgZa' // Pass3
  }
]

const non_existing_id = async () => {
  const blog = new Blog({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

module.exports = {
  initial_blogs, initial_users, non_existing_id
}