import { users_login, users_me } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import axios from 'axios'
import {
  type JSXElement,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js'
import { isDev } from 'solid-js/web'

export type UrlWithName = {
  name: JSXElement
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

export class LoginTokenMissingError extends Error {
  constructor() {
    super('Login token missing')
  }
}

//
//
//

export const [loginCred, setLoginCred] =
  createSignal<Parameters<typeof users_login>[0]>()

const TOKEN_KEY = 'loginToken'
const PERSISTED_TOKEN_KEY = `persisted:${TOKEN_KEY}`
export const [
  loginToken,
  { mutate: setLoginToken, refetch: loginUsingCredAndSetToken },
] = createResource<Awaited<ReturnType<typeof users_login>> | null>(
  async (_source, { value /* , refetching */ }) => {
    const cred = loginCred()
    if (cred != null) return await users_login(cred)
    return value ?? null
  },
  {
    name: `resource:${TOKEN_KEY}`,
    storage: x =>
      makePersisted(createSignal(x), {
        name: PERSISTED_TOKEN_KEY,
      }),
    initialValue: null,
  }
)

createEffect(() => {
  const tok = loginToken()
  if (isDev) console.log('loginToken updated:', tok)
  axios.defaults.headers.common.Authorization =
    tok != null ? `${tok.token_type} ${tok.access_token}` : undefined
})

//
//
//

export const [me, { mutate: mutateMe, refetch: refetchMe }] = createResource<
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
export const cartUrl = '/cart'
export const checkoutUrl = '/checkout'
