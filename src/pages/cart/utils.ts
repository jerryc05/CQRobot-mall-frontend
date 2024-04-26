import { cart_list } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { createResource, createSignal } from 'solid-js'

const CART_KEY = 'cartList'
const PERSISTED_CART_KEY = `persisted:${CART_KEY}`
export const [cart, { /* mutate: mutateCart, */ refetch: refetchCart }] =
  createResource((/* source, { value , refetching } */) => cart_list(), {
    name: `resource:${CART_KEY}`,
    storage: x =>
      makePersisted(createSignal(x), {
        name: PERSISTED_CART_KEY,
      }),
  })
