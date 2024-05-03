const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listOfMultipleBlogs = []
  listOfMultipleBlogs.push({ ...listWithOneBlog[0], likes:7 })
  listOfMultipleBlogs.push({ ...listWithOneBlog[0], likes:3, author: 'pertti' })
  listOfMultipleBlogs.push({ ...listWithOneBlog[0], likes:135, author: 'pertti' })
  listOfMultipleBlogs.push({ ...listWithOneBlog[0], likes:4, author: 'pertti' })
  listOfMultipleBlogs.push({ ...listWithOneBlog[0], likes:72 })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has 5 blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(listOfMultipleBlogs)
    expect(result).toBe(221)
  })
  test('when list has 0 blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  describe('most likes', () => {

    test('when list has 5 blogs, the most likes has', () => {
      const result = listHelper.favoriteBlog(listOfMultipleBlogs)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'pertti',
        likes: 135,
      })
    })
  })

  describe('author with most blogs', () => {

    test('when list has 5 blogs, author with most blogs', () => {
      const result = listHelper.mostBlogs(listOfMultipleBlogs)
      expect(result).toEqual({
        author: 'pertti',
        blogs: 3
      })
    })
  })

  describe('author with most likes', () => {

    test('when list has 5 blogs, author with most likes', () => {
      const result = listHelper.mostLikes(listOfMultipleBlogs)
      expect(result).toEqual({
        author: 'pertti',
        likes: 142
      })
    })
  })

})