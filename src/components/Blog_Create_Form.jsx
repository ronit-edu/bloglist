import { useState } from 'react'

const Blog_Create_Form = ({ create_blog }) => {
  const [post, set_post] = useState({ title: '', author: '', url: '' })

  const add_blog = (event) => {
    event.preventDefault()
    create_blog(post)
    set_post({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2><br/>
      <form onSubmit={add_blog}>
        <div>title<input type='text' value={post.title} onChange={({ target }) => set_post({ ...post, title: target.value })} id="title_input"/></div>
        <div>author<input type='text' value={post.author} onChange={({ target }) => set_post({ ...post, author: target.value })} id="author_input"/></div>
        <div>url<input type='text' value={post.url} onChange={({ target }) => set_post({ ...post, url: target.value })} id="url_input"/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default Blog_Create_Form