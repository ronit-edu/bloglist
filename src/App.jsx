import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog_List from './components/Blog_List'
import Blog_Create_Form from './components/Blog_Create_Form'
import Login_Form from './components/Login_Form'
import Togglable from './components/Togglable'

const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='message'>{message}</div>
  )
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  }
  return (
    <div className='error'>{error}</div>
  )
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, set_user] = useState(null)
  const [message, set_message] = useState(null)
  const [error, set_error] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const logged_user_json = window.localStorage.getItem('logged_blog_app_user')
    if (logged_user_json) {
      const user = JSON.parse(logged_user_json)
      set_user(user)
      blogService.set_token(user.token)
    }
  }, [])

  const user_login = async (username, password) => {
    try {
      const user = await blogService.login({ username, password })
      set_user(user)
      window.localStorage.setItem('logged_blog_app_user', JSON.stringify(user))
      blogService.set_token(user.token)
      set_message(`Welcome ${user.name}`)
      setTimeout(() => set_message(null), 5000)
    } catch (exception) {
      set_error('wrong username or password')
      setTimeout(() => set_error(null), 5000)
    }
  }

  const on_logout = () => {
    window.localStorage.removeItem('logged_blog_app_user')
    set_user(null)
    set_message('logged out')
    setTimeout(() => set_message(null), 5000)
  }

  const create_blog = (post) => {
    blog_form_ref.current.toggle_visibility()
    blogService.create_post(post)
      .then(new_blog => {
        setBlogs(blogs.concat(new_blog))
      })
    set_message(`a new blog ${post.title} by ${post.author} added`)
    setTimeout(() => set_message(null), 5000)
  }

  const add_like = (blog) => {
    blogService.update({ ...blog, likes: blog.likes+1 })
    const new_blogs = blogs.map(b => {
      if (b.id === blog.id) {
        return { ...b, likes: ++b.likes }
      } else {
        return b
      }
    })
    setBlogs(new_blogs)
  }

  const delete_blog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.delete_blog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      set_message(`deleted blog ${blog.title} by ${blog.author}`)
      setTimeout(() => set_message(null), 5000)
    }
  }

  const blog_form_ref = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <Error error={error}/>
      {user === null
        ? <div><Login_Form user_login={user_login} /></div>
        : <div>
          <div>{user.name} logged in <button onClick={on_logout}>logout</button></div><br/>
          <Togglable button_label="new blog" ref={blog_form_ref}>
            <Blog_Create_Form create_blog={create_blog} />
          </Togglable>
          <Blog_List blogs={blogs.sort((a, b) => b.likes - a.likes)} add_like={add_like} delete_blog={delete_blog} user={user}/>
        </div>}
    </div>
  )
}

export default App