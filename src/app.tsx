import { Route, Router } from '@solidjs/router'
import { Index, createSignal, lazy } from 'solid-js'

import { Home } from '@/pages/home'
import {
  SupportedCurrencies,
  type UrlWithName,
  btnClass,
  currency,
  setCurrency,
} from '@/utils'

export function App() {
  return (
    <>
      <header class='px-4 flex justify-between items-center bg-gray-200 text-gray-900'>
        <div class='flex'>
          <Index
            each={
              [
                { name: 'My Account', url: '/' },
                { name: 'My Cart', url: '/' },
                { name: `Checkout (${currency()})`, url: '/' },
              ] as UrlWithName[]
            }
          >
            {x => (
              <a href={x().url} class='py-2 px-4 no-underline hover:underline'>
                {x().name}
              </a>
            )}
          </Index>
        </div>
        <div class='flex items-center gap-x-2'>
          <a href='/register' class={`bg-gray-500 text-white ${btnClass}`}>
            Register
          </a>
          <a href='/login' class={btnClass}>
            Login
          </a>
          <Currency />
        </div>
      </header>

      <main>
        <Router>
          <Route path='/' component={Home} />
          <Route path='**' component={lazy(() => import('./errors/404'))} />
        </Router>
      </main>

      <button
        type='button'
        class='px-4 py-2 rounded-full fixed right-5 bottom-8 bg-blue-700'
      >
        Contact Us
      </button>
    </>
  )
}

function Currency() {
  const itemClassList =
    'w-24 h-10 flex justify-center items-center bg-gray-300 cursor-pointer'
  return (
    <div class='relative [&>div]:hover:flex'>
      <div class={itemClassList}>{currency()}</div>
      <div class='flex-col absolute top-full hidden'>
        <Index each={Object.values(SupportedCurrencies)}>
          {x => (
            <button
              type='button'
              classList={{ hidden: x() === currency() }}
              class={itemClassList}
              onclick={() => {
                setCurrency(x())
              }}
            >
              {x().toString()}
            </button>
          )}
        </Index>
      </div>
    </div>
  )
}
