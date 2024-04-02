import axios, { AxiosError } from 'axios'
import { setToken, token } from '@/utils'

export const users_register = (body: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone_number: string
}) => axios.post('/api/users/register', body)

export const users_login = (body: { email: string; password: string }) =>
  axios
    .post<NonNullable<ReturnType<typeof token>>>('/api/users/login', body)
    .then(x => {
      handleToken(x.data)
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
    setToken(undefined)
  })

export const users_refresh_token = (refresh_token: string) =>
  axios
    .post<NonNullable<ReturnType<typeof token>>>('/api/users/refresh_token', {
      refresh_token,
    })
    .then(x => {
      handleToken(x.data)
      return x.data
    })

function handleToken(tokens: Awaited<ReturnType<typeof users_login>>) {
  axios.defaults.headers.common.Authorization = `${tokens.token_type} ${tokens.access_token}`
  setToken(tokens)
}

async function refreshOnErr(err: any) {
  if (err instanceof AxiosError && err.response?.status === 401) {
    await users_refresh_token(token()?.refresh_token ?? '')
    return true
  }
  return false
}
