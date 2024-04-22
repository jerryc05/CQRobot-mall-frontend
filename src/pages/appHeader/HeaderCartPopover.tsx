import { cart } from '@/pages/cart/utils'
import { cartUrl, checkoutUrl } from '@/utils'
import { Index } from 'solid-js'

export function CartPopover() {
  return (
    <div class='relative [&>div]:hover:visible'>
      <a href={cartUrl} class='py-2 px-4 no-underline hover:underline'>
        Cart{cart()?.length ? ` (${cart()?.length})` : ''}
      </a>
      <div class='w-80 p-4 border-2 border-black rounded-lg absolute bg-white invisible'>
        <Index each={cart()}>
          {x => (
            <div class='w-full flex justify-between'>
              <div>Product #{x()}</div>
              <div>Quantity: ?</div>
            </div>
          )}
        </Index>
        <a
          href={checkoutUrl}
          class='w-full py-1 block rounded bg-blue-200 text-center'
        >
          Checkout
        </a>
      </div>
    </div>
  )
}
