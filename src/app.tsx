import { Route, Router } from '@solidjs/router'
import { Loader2, Search } from 'lucide-solid'
import { Index, Match, Switch } from 'solid-js'

import { users_logout } from '@/api'
import Page404 from '@/errors/404'
import Account from '@/pages/account/account'
import Home from '@/pages/home'
import Login from '@/pages/login'
import Product from '@/pages/products/productId'
import Register from '@/pages/register'
import {
  SupportedCurrencies,
  type UrlWithName,
  accountUrl,
  btnClass,
  currency,
  homeUrl,
  loginUrl,
  me,
  productIdUrl,
  refetchMe,
  registerUrl,
  setCurrency,
} from '@/utils'

export function App() {
  return (
    <div class='min-h-dvh flex flex-col bg-gray-100'>
      <Header />
      <SearchAndCart />
      <NavBar />

      <main class='flex-grow flex flex-col'>
        <Router>
          <Route path={homeUrl} component={Home} />
          <Route path={registerUrl} component={Register} />
          <Route path={loginUrl} component={Login} />
          <Route path={accountUrl} component={Account} />
          <Route path={productIdUrl()} component={Product} />
          <Route path='**' component={Page404} />
        </Router>
      </main>

      <Footer />

      <button
        type='button'
        class='px-6 py-3 rounded-full fixed right-5 bottom-8 text-sm text-white bg-blue-700'
      >
        Contact Us
      </button>
    </div>
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

function Currency() {
  const itemClassList =
    'w-24 h-full flex justify-center items-center bg-gray-300 cursor-pointer'
  return (
    <div class='h-full relative [&>div]:hover:flex'>
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
          {x => (
            <a href={x().url} class='p-5'>
              {x().name}
            </a>
          )}
        </Index>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <div class='pt-5 pb-10 flex justify-around [&_b]:text-xl'>
      <div>
        <b>Info</b>
        <div>
          <div>About Us</div>
          <div>Contact Us</div>
          <div>Distributors</div>
        </div>
      </div>

      <div>
        <b>Help</b>
        <div>
          <div>Payment</div>
          <div>Shipping</div>
          <div>Warranty & Returns</div>
        </div>
      </div>

      <div>
        <b>Links</b>
        <div>
          <div>Product Catgories</div>
          <div>Advanced Search</div>
        </div>
      </div>

      <div>
        <b>Be the first to know</b>
      </div>
    </div>
  )
}
