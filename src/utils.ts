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
    name: 'currency',
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

export const [token, { mutate: mutateToken, refetch: refetchToken }] =
  createResource(
    (/* source, { value, refetching } */) => {
      const cred = loginCred()
      return cred ? users_login(cred) : null
    },
    {
      name: 'resource:token',
      storage: () =>
        makePersisted(createSignal(), {
          name: 'persisted:resource:token',
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
