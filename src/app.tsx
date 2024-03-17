import { Route, Router } from '@solidjs/router'
import { Index, lazy } from 'solid-js'
import { Search } from 'lucide-solid'

import { Home, homeUrl } from '@/pages/home'
import {
  SupportedCurrencies,
  type UrlWithName,
  btnClass,
  currency,
  setCurrency,
} from '@/utils'
import { registerUrl } from '@/pages/register'

export function App() {
  return (
    <>
      <Header />
      <SearchAndCart />
      <NavBar />

      <main>
        <Router>
          <Route path={homeUrl} component={Home} />
          <Route
            path={registerUrl}
            component={lazy(() => import('@/pages/register'))}
          />
          <Route path='**' component={lazy(() => import('@/errors/404'))} />
        </Router>
      </main>

      <Footer />

      <button
        type='button'
        class='px-4 py-2 rounded-full fixed right-5 bottom-8 text-white bg-blue-700'
      >
        Contact Us
      </button>
    </>
  )
}
function Header() {
  return (
    <header class='px-4 flex justify-between items-center bg-gray-200 text-gray-900'>
      <div class='flex'>
        <Index
          each={
            [
              { name: 'My Account', url: homeUrl },
              { name: 'My Cart', url: homeUrl },
              { name: `Checkout (${currency()})`, url: homeUrl },
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
        <a href={registerUrl} class={`bg-gray-500 text-white ${btnClass}`}>
          Register
        </a>
        <a href='/login' class={btnClass}>
          Login
        </a>
        <Currency />
      </div>
    </header>
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

function SearchAndCart() {
  return (
    <div class='flex justify-end items-center gap-x-3'>
      <div class='h-10 flex items-center gap-x-1'>
        <input
          type='search'
          class='h-full p-1 border-2 border-gray-300'
          placeholder='Search here'
        />
        <button type='button' class='h-full p-1   bg-gray-300'>
          <Search size='20' />
        </button>
      </div>
      <div> 0 item(s) - $0.00</div>
    </div>
  )
}

function NavBar() {
  return (
    <nav class='flex items-center'>
      <img class='w-1/3 h-20 bg-gray-300' src='' alt='logo' />
      <div class='flex'>
        <Index
          each={
            [
              {
                name: 'Home',
                url: '/',
              },
              {
                name: 'Products',
                url: '/products',
              },
              {
                name: 'Payment',
                url: '/payment',
              },
              {
                name: 'Shipping',
                url: '/shipping',
              },
              {
                name: 'Wiki',
                url: '/wiki',
              },
              {
                name: 'Support',
                url: '/support',
              },
            ] as UrlWithName[]
          }
        >
          {x => <div class='p-5'>{x().name}</div>}
        </Index>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <div class='h-60 py-20 flex justify-around [&_h3]:font-bold [&_h3]:text-xl'>
      <div>
        <h3>Info</h3>
        <div>
          <div>About Us</div>
          <div>Contact Us</div>
          <div>Distributors</div>
        </div>
      </div>

      <div>
        <h3>Help</h3>
        <div>
          <div>Payment</div>
          <div>Shipping</div>
          <div>Warranty & Returns</div>
        </div>
      </div>

      <div>
        <h3>Links</h3>
        <div>
          <div>Product Catgories</div>
          <div>Advanced Search</div>
        </div>
      </div>

      <div>
        <h3>Be the first to know</h3>
      </div>
    </div>
  )
}
