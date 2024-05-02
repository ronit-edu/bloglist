import axios from 'axios'
const baseUrl = '/api/blogs'
const login_url = '/api/login'

let token = null

const set_token = new_token => {
  token = `Bearer ${new_token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async credentials => {
  const response = await axios.post(login_url, credentials)
  return response.data
}

const create_post = async (post_data) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, post_data, config)
  return response.data
}

const update = async (put_data) => {
  const config = {
    headers: { Authorization: token }
  }
  put_data = { ...put_data, user: put_data.user.id }
  //console.log(put_data);
  const response = await axios.put(`${baseUrl}/${put_data.id}`, put_data, config)
  return response.data
}

const delete_blog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, login, set_token, create_post, update, delete_blog }