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

//
//
//
//
//
//
//
//
//
//

export const users_me = refreshOn401Wrapper(() =>
  axios
    .get<{
      email: string
      first_name: string
      last_name: string
      phone_number: string
    }>('/api/users/me')
    .then(x => x.data)
)

export const users_reset_password = refreshOn401Wrapper(
  (body: { email: string; old_password: string; new_password: string }) =>
    axios.post('/api/users/reset_password', body)
)

export async function users_logout() {
  ensureHasToken()
  await axios.post('/api/users/logout')
  setLoginToken(null)
}

//
//
//
//
//
//
//
//
//
//

export async function users_refresh_token() {
  ensureHasToken()
  const loginTok = await //users_refresh_token__raw_()
  axios.post<LoginTok>('/api/users/refresh_token').then(x => x.data)
  setLoginToken(loginTok)
  return loginTok
}

function refreshOn401Wrapper<T, U>(
  fn: (...args: U[]) => Promise<T>,
  refreshTokIf401 = true
) {
  return async (...args: U[]) => {
    ensureHasToken()
    try {
      return await fn()
    } catch (err) {
      const is401 = err instanceof AxiosError && err.response?.status === 401
      if (is401 && refreshTokIf401) {
        await users_refresh_token()
        return await refreshOn401Wrapper(fn, false)
      }
      throw err
    }
  }
}

//
//
//
//
//
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
  const apis = {
    list: () => axios.get<T[IdKey][]>(api).then(x => x.data),
    create: (body: Omit<T, IdKey>) =>
      axios
        .post<{
          [K in IdKey]: T[IdKey]
        }>(api, body)
        .then(x => x.data),
    read: (id: T[IdKey]) => axios.get<T>(`${api}/${id}`).then(x => x.data),
    update: ({ id, body }: { id: T[IdKey]; body: Partial<T> }) =>
      axios.patch<void>(`${api}/${id}`, body).then(x => x.data),
    delete: (id: T[IdKey]) =>
      axios.delete<void>(`${api}/${id}`).then(x => x.data),
  }
  return {
    list: requiresAuth ? refreshOn401Wrapper(apis.list) : apis.list,
    create: requiresAuth ? refreshOn401Wrapper(apis.create) : apis.create,
    read: requiresAuth ? refreshOn401Wrapper(apis.read) : apis.read,
    update: requiresAuth ? refreshOn401Wrapper(apis.update) : apis.update,
    delete: requiresAuth ? refreshOn401Wrapper(apis.delete) : apis.delete,
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
export const product_desc = (id: Product['id']) =>
  axios.get<string>(`/api/products/id/${id}/desc`).then(x => x.data)

export const product_popular = () =>
  axios.get<Product['id'][]>('/api/products/popular').then(x => x.data)
