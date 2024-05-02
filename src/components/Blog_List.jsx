import Blog from './Blog'

const Blog_List = ({ blogs, add_like, delete_blog, user }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} add_like={add_like} delete_blog={delete_blog} user={user}/>
      )}
    </div>
  )
}

export default Blog_List