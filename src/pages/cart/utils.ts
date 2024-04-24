import { cart_list } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { createResource, createSignal } from 'solid-js'
import { isDev } from 'solid-js/web'

const CART_KEY = 'cartList'
const PERSISTED_CART_KEY = `persisted:${CART_KEY}`
export const [cart, { /* mutate: mutateCart, */ refetch: refetchCart }] =
  createResource(
    (/* source, { value , refetching } */) => {
      try {
        return cart_list()
      } catch (e) {
        // todo: remove dummy data
        if (isDev) {
          return [1, 2, 4, 5]
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
