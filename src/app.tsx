import { Route, Router } from '@solidjs/router'
import { Search } from 'lucide-solid'
import { Index } from 'solid-js'

import Page404 from '@/errors/404'
import Account from '@/pages/account/account'
import { Header } from '@/pages/appHeader/Header'
import { CartPopover } from '@/pages/appHeader/HeaderCartPopover'
import Cart from '@/pages/cart/Cart'
import Checkout from '@/pages/checkout/Checkout'
import Home from '@/pages/home/Home'
import Login from '@/pages/login'
import Product from '@/pages/products/productId'
import Register from '@/pages/register'
import {
  type UrlWithName,
  accountUrl,
  cartUrl,
  checkoutUrl,
  homeUrl,
  loginUrl,
  productIdUrl,
  registerUrl,
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
          <Route path={cartUrl} component={Cart} />
          <Route path={checkoutUrl} component={Checkout} />
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
      <CartPopover />
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
