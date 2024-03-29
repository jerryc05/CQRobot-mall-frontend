import { createSignal } from 'solid-js'
import type { users_me } from '@/api'

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
export const [currency, setCurrency] = createSignal(SupportedCurrencies.USD)

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

export const [token, setToken] = createSignal<AccTok & RefreshTok>()

export const [me, setMe] = createSignal<Awaited<ReturnType<typeof users_me>>>()

//
//
//
//
//
export const homeUrl = '/'

export const registerUrl = '/register'
export const loginUrl = '/login'
