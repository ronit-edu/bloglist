import { useState } from 'react'

const Blog = ({ blog, add_like, delete_blog, user }) => {
  const [is_shown, set_is_shown] = useState(false)
  const toggle_shown = () => {
    set_is_shown(!is_shown)
  }
  if (is_shown) {
    return (
      <div className='blog'>
        <div>{blog.title} {blog.author} <button onClick={toggle_shown}>hide</button></div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => add_like(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {user.id === blog.user.id && <button onClick={() => delete_blog(blog)}>remove</button>}
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} {blog.author} <button onClick={toggle_shown}>view</button>
      </div>
    )
  }
}

export default Blog