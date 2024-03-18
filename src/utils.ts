import { createSignal } from 'solid-js'

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
export const homeUrl = '/'

export const registerUrl = '/register'
