import { cart } from '@/pages/cart/utils'
import { cartUrl, checkoutUrl } from '@/utils'
import { Loader2 } from 'lucide-solid'
import { Index, Match, Switch } from 'solid-js'

export function CartPopover() {
  return (
    <div class='px-3'>
      <Switch>
        <Match when={cart.loading}>
          <Loader2 class='animate-spin' />
        </Match>
        <Match when={cart.error}>
          <div>Cart (0)</div>
        </Match>
        <Match when={1}>
          <div class='relative [&>div]:hover:flex'>
            <a href={cartUrl} class='py-2 px-4 no-underline hover:underline'>
              {cart()?.length ?? 0} item(s) - $?.??
            </a>
            <div class='w-80 p-4 flex-col gap-y-2 border-2 border-black rounded-lg absolute right-0 bg-white hidden'>
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
                class='w-full py-2 block rounded bg-blue-200 text-center'
              >
                Checkout
              </a>
            </div>
          </div>
        </Match>
      </Switch>
    </div>
  )
}
