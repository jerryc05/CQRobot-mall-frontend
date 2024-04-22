import type { cart_list } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { createResource, createSignal } from 'solid-js'

const CART_KEY = 'cartList'
const PERSISTED_CART_KEY = `persisted:${CART_KEY}`
export const [cart, { refetch: refetchCart }] = createResource(
  (/* source, { value, refetching } */) => {
    const itemStr = localStorage.getItem(PERSISTED_CART_KEY)
    if (itemStr != null)
      return JSON.parse(itemStr) as Awaited<ReturnType<typeof cart_list>>

    // todo: implement source
    const x: Awaited<ReturnType<typeof cart_list>> = [1, 2, 4, 5]

    return x
  },
  {
    name: `resource:${CART_KEY}`,
    storage: x =>
      makePersisted(createSignal(x), {
        name: PERSISTED_CART_KEY,
      }),
  }
)
