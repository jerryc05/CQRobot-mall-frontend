import { type LoginTok, mutateToken } from '@/utils'
import axios, { AxiosError } from 'axios'

export const users_register = (body: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
}) => axios.post('/api/users/register', body)

export const users_login = (body: { email: string; password: string }) =>
  axios.post<LoginTok>('/api/users/login', body).then(x => {
    mutateToken(x.data)
    return x.data
  })

export async function users_me(refreshTokIfFailed = true) {
  try {
    return await axios
      .get<{
        email: string
        first_name: string
        last_name: string
        phone_number: string
      }>('/api/users/me')
      .then(x => x.data)
  } catch (err) {
    if (refreshTokIfFailed && (await refreshOnErr(err)))
      return await users_me(false)
    throw Error('Not logged in')
  }
}

export const users_logout = (refresh_token: string) =>
  axios.post('/api/users/logout').then(() => {
    axios.defaults.headers.common.Authorization = undefined
    mutateToken(undefined)
  })

export const users_refresh_token = () =>
  axios.post<LoginTok>('/api/users/refresh_token').then(x => {
    mutateToken(x.data)
    return x.data
  })

async function refreshOnErr(err: any) {
  if (
    err instanceof AxiosError &&
    err.response?.status != null &&
    err.response?.status >= 400 &&
    err.response?.status < 500
  ) {
    await users_refresh_token()
    return true
  }
  return false
}

//todo reset password
