import axios from 'axios'

export const users_register = (body: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
}) => axios.post('/api/users/register', body)

export const users_login = (body: { email: string; password: string }) =>
  axios
    .post<{
      access_token: string
      refresh_token: string
      token_type: 'bearer'
      expires_in: number
      refresh_expires_in: number
    }>('/api/users/login', body)
    .then(x => {
      axios.defaults.headers.common.Authorization = `${x.data.token_type} ${x.data.access_token}`
      return x.data
    })

export const users_me = () =>
  axios
    .get<{
      email: string
      first_name: string
      last_name: string
      phone_number: string
    }>('/api/users/me')
    .then(x => x.data)

export const users_logout = (refresh_token: string) =>
  axios.post('/api/users/logout')

export const users_refresh_token = (refresh_token: string) =>
  axios
    .post<{
      access_token: string
      token_type: 'bearer'
      expires_in: number
    }>('/api/users/refresh_token', { refresh_token })
    .then(x => {
      axios.defaults.headers.common.Authorization = `${x.data.token_type} ${x.data.access_token}`
      return x.data
    })
