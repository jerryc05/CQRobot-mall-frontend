import { users_login, users_me } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import axios from 'axios'
import { createEffect, createResource, createSignal } from 'solid-js'

export type UrlWithName = {
  name: string
  url: string
}

export const btnClass =
  'py-[.4rem] px-3 border-[.1rem] border-gray-500 rounded-lg'

export enum SupportedCurrencies {
  CAD = 'CAD',
  USD = 'USD',
  EUR = 'EUR',
}
export const [currency, setCurrency] = makePersisted(
  createSignal(SupportedCurrencies.USD),
  {
    name: 'persisted:currency',
  }
)

//
//
//
//
//

type AccTok = {
  access_token: string
  token_type: 'bearer'
  // expires_in: number
}
export type LoginTok = AccTok

export const [loginCred, setLoginCred] =
  createSignal<Parameters<typeof users_login>[0]>()

  const PERSISTED_TOKEN_KEY = 'loginToken'
  export const [token, { mutate: mutateToken, refetch: refetchToken }] =
    createResource(
      (/* source, { value, refetching } */) => {
        const cred = loginCred()
        if (cred == null) {
          const item = localStorage.getItem(PERSISTED_TOKEN_KEY)
          return item != null ? (JSON.parse(item) as AccTok) : null
        }
        return users_login(cred)
      },
      {
        name: `resource:${PERSISTED_TOKEN_KEY}`,
        storage: x =>
          makePersisted(createSignal(x), {
            name: `persisted:${PERSISTED_TOKEN_KEY}`,
          }),
      }
    )

createEffect(() => {
  const tok = token()
  axios.defaults.headers.common.Authorization =
    tok != null ? `${tok.token_type} ${tok.access_token}` : undefined
})

//
//
//

export const [me, { refetch: refetchMe }] = createResource<
  Awaited<ReturnType<typeof users_me>>
>((/* source, { value, refetching } */) => users_me(), {
  name: 'resource:me',
})

//
//
//
//
//
export const homeUrl = '/'

export const registerUrl = '/register'
export const loginUrl = '/login'
export const accountUrl = '/account'
export const productIdUrl = (id?: string | number) => `/products/${id ?? ':id'}`
