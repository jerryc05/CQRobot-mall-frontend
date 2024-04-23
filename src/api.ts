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

type HasId<IdT, IdKey extends PropertyKey> = { [K in IdKey]: IdT }

function genCrud<
  T extends HasId<IdT, IdKey>,
  IdKey extends PropertyKey,
  IdT = T[IdKey]
>(api_: string) {
  let api = api_
  while (api.endsWith('/')) api = api.slice(0, -1)
  return {
    list: () => axios.get<T[IdKey][]>(api).then(x => x.data),
    create: (body: Omit<T, IdKey>) =>
      axios.post<{ [K in IdKey]: T[IdKey] }>(api, body).then(x => x.data),
    read: (id: T[IdKey]) => axios.get<T>(`${api}/${id}`).then(x => x.data),
    update: ({ id, body }: { id: T[IdKey]; body: Partial<T> }) =>
      axios.patch<void>(`${api}/${id}`, body).then(x => x.data),
    delete: (id: T[IdKey]) =>
      axios.delete<void>(`${api}/${id}`).then(x => x.data),
  }
}

type Address = HasId<number, 'id'> & {
  address_1: string
  address_2: string
  address_3?: string
  city_state: string
  zip: string
  country: string
}

export const {
  list: address_list,
  create: address_create,
  read: address_read,
  update: address_update,
  delete: address_delete,
} = genCrud<Address, 'id'>('/api/users/address')

//
//
//
//
//

type ProductWithAmount = HasId<number, 'product_id'> & {
  amount: number
}

export const {
  list: cart_list,
  // create: cart_create,
  read: cart_read,
  update: cart_update,
  // delete: cart_delete,
} = genCrud<ProductWithAmount, 'product_id'>('/api/cart')

//
//
//
//
//



export type Product = {
  id: number
  model: string
  sku: string
  mpn: string
  manufacturer_id: number
  price: number
  // date_available: Date // todo: del this
  weight_grams: number
  sold_count: number // todo: was "viewed"
  date_added: Date
  date_modified: Date
}

export const product_detail = (id: Product['id']) =>
  axios.get<Product>(`/api/products/${id}`).then(x => {
    if ((x.data.sold_count as any) == null)
      // todo: del this after test
      throw Error(`Product.sold_count not found in product id ${x.data.id}`)
    return {
      ...x.data,
      date_added: new Date(`${x.data.date_added}+08:00`),
      date_modified: new Date(`${x.data.date_modified}+08:00`),
    }
  })
