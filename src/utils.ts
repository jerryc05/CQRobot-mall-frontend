import { createResource, createSignal } from 'solid-js'
import { users_me } from '@/api'
import { makePersisted } from '@solid-primitives/storage'

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
  expires_in: number
}
type RefreshTok = {
  refresh_token: string
  refresh_expires_in: number
}

export const [token, setToken] = makePersisted(
  createSignal<AccTok & RefreshTok>(),
  {
    name: 'token',
  }
)

export const [me, { mutate: refetchMe }] = createResource<
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
