import { useState } from 'react'
import PropTypes from 'prop-types'

const Login_Form = ({ user_login }) => {
  const [username, set_username] = useState('')
  const [password, set_password] = useState('')

  const handle_login = (event) => {
    event.preventDefault()
    set_username('')
    set_password('')
    user_login(username, password)
  }

  return (
    <div>
      <form onSubmit={handle_login}>
        <div>username<input type="text" value={username} onChange={({ target }) => set_username(target.value)} name='username' /></div>
        <div>password<input type='password' value={password} onChange={({ target }) => set_password(target.value)} name='password'/></div>
        <button type='submit' id="login_button">login</button>
      </form>
    </div>
  )
}

Login_Form.propTypes = {
  user_login: PropTypes.func.isRequired
}

export default Login_Form