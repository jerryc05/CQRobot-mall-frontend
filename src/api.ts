import { type LoginTok, setLoginToken } from '@/utils'
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
    setLoginToken(x.data)
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
    if (refreshTokIfFailed && (await refreshOn401(err)))
      return await users_me(false)
    throw Error('Not logged in')
  }
}

export const users_reset_password = (body: {
  email: string
  old_password: string
  new_password: string
}) => axios.post('/api/users/reset_password', body)

export const users_logout = () =>
  axios.post('/api/users/logout').then(() => {
    setLoginToken(undefined)
  })

export const users_refresh_token = () =>
  axios.post<LoginTok>('/api/users/refresh_token').then(x => {
    setLoginToken(x.data)
    return x.data
  })

async function refreshOn401(err: any) {
  if (err instanceof AxiosError && err.response?.status === 401) {
    await users_refresh_token()
    return true
  }
  return false
}

//
//
//
//
//

type Address = {
  id: number
  address_1: string
  address_2: string
  address_3?: string
  city_state: string
  zip: string
  country: string
}

export const address_list = () =>
  axios.get<Address['id'][]>('/api/users/address').then(x => x.data)

export const address_create = (body: Omit<Address, 'id'>) =>
  axios.post<Address['id']>('/api/users/address', body).then(x => x.data)

export const address_read = (id: Address['id']) =>
  axios.get<Address>(`/api/users/address/${id}`).then(x => x.data)

export const address_update = ({
  id,
  body,
}: {
  id: Address['id']
  body: Partial<Address>
}) => axios.patch<void>(`/api/users/address/${id}`, body).then(x => x.data)

export const address_delete = (id: Address['id']) =>
  axios.delete<void>(`/api/users/address/${id}`).then(x => x.data)

//
//
//
//
//

type ProductWithAmount = {
  product_id: string
  amount: number
}

export const cart_list = () =>
  axios.get<ProductWithAmount[]>('/api/cart').then(x => x.data)

export const cart_add = ({
  product_id,
  incr,
}: {
  product_id: ProductWithAmount['product_id']
  incr: number
}) => axios.post('/api/cart', { product_id, incr })

export const cart_change = ({ product_id, amount }: ProductWithAmount) =>
  axios.patch('/api/cart', { product_id, amount })
