import type { cart_list } from '@/api'
import { createResource } from 'solid-js'

export const [cart, { refetch: refetchCart }] = createResource(
  (/* source, { value, refetching } */) => {
    // todo: implement source
    const x: Awaited<ReturnType<typeof cart_list>> = [1, 2, 4, 5]
    return x
  },
  {
    name: 'resource:cart',
  }
)
