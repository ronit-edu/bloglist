const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return (blogs.reduce((sum, blog) => sum + blog.likes, 0))
}

const favoriteBlog = (blogs) => {
  const best_blog = blogs.reduce((best, blog) => blog.likes > best.likes ? blog : best)
  return {
    title: best_blog.title,
    author: best_blog.author,
    likes: best_blog.likes
  }
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.map(blog => {
    if (blog.author in authors){
      ++authors[blog.author]
    } else {
      authors[blog.author] = 1
    }
  })
  const most = Object.keys(authors).reduce((most, author) => authors[author] > authors[most] ? author : most)
  return {
    author: most,
    blogs: authors[most]
  }
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.map(blog => {
    if (blog.author in authors){
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })
  const most = Object.keys(authors).reduce((most, author) => authors[author] > authors[most] ? author : most)
  return {
    author: most,
    likes: authors[most]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}