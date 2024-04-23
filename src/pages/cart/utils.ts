import { cart_list } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { AxiosError } from 'axios'
import { createResource, createSignal } from 'solid-js'
import { isDev } from 'solid-js/web'

const CART_KEY = 'cartList'
const PERSISTED_CART_KEY = `persisted:${CART_KEY}`
export const [cart, { /* mutate: mutateCart, */ refetch: refetchCart }] =
  createResource(
    async (source, { value /* , refetching */ }) => {
      if (value == null) {
        const itemStr = localStorage.getItem(PERSISTED_CART_KEY)
        if (itemStr != null) {
          setTimeout(() => refetchCart, 0)
          return JSON.parse(itemStr) as Awaited<ReturnType<typeof cart_list>>
        }
      }
      try {
        return await cart_list()
      } catch (e) {
        // todo: remove dummy data
        if (isDev && e instanceof AxiosError && e.response?.status === 500) {
          const x: Awaited<ReturnType<typeof cart_list>> = [1, 2, 4, 5]
          return x
        }
        throw e
      }
    },
    {
      name: `resource:${CART_KEY}`,
      storage: x =>
        makePersisted(createSignal(x), {
          name: PERSISTED_CART_KEY,
        }),
    }
  )
