import {
  type LoginTok,
  LoginTokenMissingError,
  loginToken,
  setLoginToken,
} from '@/utils'
import axios, { AxiosError } from 'axios'

export function ensureHasToken() {
  if (loginToken() == null) {
    throw new LoginTokenMissingError()
  }
}

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
  ensureHasToken()
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
}) => {
  ensureHasToken()
  return axios.post('/api/users/reset_password', body)
}

export async function users_logout() {
  ensureHasToken()
  await axios.post('/api/users/logout')
  setLoginToken(null)
}

// export const users_refresh_token__raw_ = (
//   axiosConfig?: Parameters<typeof axios.post>[2]
// ) =>
//   axios
//     .post<LoginTok>('/api/users/refresh_token', undefined, axiosConfig)
//     .then(x => x.data)

export async function users_refresh_token() {
  ensureHasToken()
  const loginTok = await //users_refresh_token__raw_()
  axios.post<LoginTok>('/api/users/refresh_token').then(x => x.data)
  setLoginToken(loginTok)
  return loginTok
}

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
>(api_: string, requiresAuth = false) {
  let api = api_
  while (api.endsWith('/')) api = api.slice(0, -1)
  return {
    list: async () => {
      if (requiresAuth) ensureHasToken()
      const x = await axios.get<T[IdKey][]>(api)
      return x.data
    },
    create: async (body: Omit<T, IdKey>) => {
      if (requiresAuth) ensureHasToken()
      const x = await axios.post<{
        [K in IdKey]: T[IdKey]
      }>(api, body)
      return x.data
    },
    read: async (id: T[IdKey]) => {
      if (requiresAuth) ensureHasToken()
      const x = await axios.get<T>(`${api}/${id}`)
      return x.data
    },
    update: async ({ id, body }: { id: T[IdKey]; body: Partial<T> }) => {
      if (requiresAuth) ensureHasToken()
      const x = await axios.patch<void>(`${api}/${id}`, body)
      return x.data
    },
    delete: async (id: T[IdKey]) => {
      if (requiresAuth) ensureHasToken()
      const x = await axios.delete<void>(`${api}/${id}`)
      return x.data
    },
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
} = genCrud<Address, 'id'>('/api/users/address', true)

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
} = genCrud<ProductWithAmount, 'product_id'>('/api/cart', true)

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
  quantity: number
  stock_status_id: number // todo: need clarify
  image_url: string
  manufacturer_id: number
  price: number
  weight_grams: number
  sold_count: number // todo: was "viewed"
  date_available: Date
  date_added: Date
  date_modified: Date
}

export const product_detail = (id: Product['id']) =>
  axios.get<Product>(`/api/products/id/${id}`).then(x => {
    if ((x.data.sold_count as any) == null)
      // todo: del this after test
      throw Error(`Product.sold_count not found in product id ${x.data.id}`)
    return {
      ...x.data,
      date_added: new Date(`${x.data.date_added}+08:00`),
      date_modified: new Date(`${x.data.date_modified}+08:00`),
    } as Product
  })


export const product_popular = () =>
  axios.get<Product['id'][]>('/api/products/popular').then(x => x.data)
