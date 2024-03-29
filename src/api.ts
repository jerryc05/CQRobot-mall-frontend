import axios from 'axios'
import { setRefreshTok } from './contant'

export const users_register = (body: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
}) => axios.post('/api/users/register', body)

type AccTok = {
  access_token: string
  token_type: 'bearer'
  expires_in: number
}
type RefreshTok = {
  refresh_token: string
  refresh_expires_in: number
}

export const users_login = (body: { email: string; password: string }) =>
  axios.post<AccTok & RefreshTok>('/api/users/login', body).then(x => {
    handleToken(x.data)
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
    .post<AccTok & RefreshTok>('/api/users/refresh_token', { refresh_token })
    .then(x => {
      handleToken(x.data)
      return x.data
    })

function handleToken(tokens: Awaited<ReturnType<typeof users_login>>) {
  axios.defaults.headers.common.Authorization = `${tokens.token_type} ${tokens.access_token}`
  setRefreshTok(tokens.refresh_token)
}
