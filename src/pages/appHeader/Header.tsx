import { Loader2 } from 'lucide-solid'
import { For, Match, Switch } from 'solid-js'

import { users_logout } from '@/api'
import {
  type UrlWithName,
  btnClass,
  checkoutUrl,
  currency,
  homeUrl,
  me,
  refetchMe,
  registerUrl,
} from '@/utils'

import { Currency } from './HeaderCurrency'

export function Header() {
  const headerLeftInfo: UrlWithName[] = [
    { name: 'My Account', url: homeUrl },
    { name: 'My Cart', url: checkoutUrl },
    { name: `Checkout (${currency()})`, url: checkoutUrl },
  ]
  return (
    <header class='px-4 flex justify-between items-center bg-gray-200 text-gray-900'>
      <div class='flex'>
        <For each={headerLeftInfo}>
          {x => (
            <a href={x.url} class='py-2 px-4 no-underline hover:underline'>
              {x.name}
            </a>
          )}
        </For>
      </div>
      <div />
      <div class='h-10 flex items-center gap-x-2'>
        <Switch>
          <Match when={me.loading}>
            <Loader2 class='animate-spin' />
          </Match>
          <Match when={me.error}>
            <>
              <a
                href={registerUrl}
                class={`bg-gray-500 text-white ${btnClass}`}
              >
                Register
              </a>
              <a data-test='login_in_header' href='/login' class={btnClass}>
                Login
              </a>
            </>
          </Match>
          <Match when={1}>
            <>
              <div>
                Hello,{' '}
                <span data-test='firstname_in_header'>{me()?.first_name}</span>
                ！
              </div>
              <button
                data-test='logout'
                type='button'
                class='h-full'
                onClick={() => {
                  users_logout().then(() =>
                    // let it fail so that the user logs out
                    refetchMe()
                  )
                }}
              >
                Logout
              </button>
            </>
          </Match>
        </Switch>

        <Currency />
      </div>
    </header>
  )
}
