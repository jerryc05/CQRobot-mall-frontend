import type { UrlWithName } from '@/utils'
import { Search } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'
import lightBulb from '/Simple_light_bulb_graphic.png'

export function Home() {
  return (
    <div class='mx-20 my-2'>
      <SearchAndCart />
      <NavBar />
      <Body />
      <Footer />
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

function Body() {
  return (
    <>
      <img class='w-full h-56 bg-gray-200' alt='carousel' />
      <div class='flex'>
        <BodyLeftPanel />
        <BodyRightContent />
      </div>
    </>
  )
}

function BodyLeftPanel() {
  const elemClassName =
    'w-28 px-2 relative hover:bg-gray-200 [&>div]:hover:flex'
  return (
    <div class='basis-14'>
      <div class='bg-gray-200'>Products</div>
      <div>
        <Index each={['1', '2', '1', '2', '1', '2', '1', '2']}>
          {x => (
            <div class={elemClassName}>
              {x()}
              {/* TODO: change to recursive call */}
              <div class='flex-col absolute top-0 left-full hidden'>
                <Index each={['3', '4', '3', '4', '3', '4', '3', '4']}>
                  {x => <div class={elemClassName}>{x()}</div>}
                </Index>
              </div>
            </div>
          )}
        </Index>
      </div>
    </div>
  )
}
function BodyRightContent() {
  return (
    <div class='flex-grow flex flex-col'>
      <ImageCategories />
      <NewCarousel />
    </div>
  )
}

function ImageCategories() {
  return (
    <div class='flex-grow flex flex-wrap'>
      <Index each={['1', '2', '3', '4', '5', '6']}>
        {x => (
          <img
            class='basis-1/2 h-32 border-2 border-white bg-gray-300'
            alt={x()}
          />
        )}
      </Index>
    </div>
  )
}

function NewCarousel() {
  return (
    <>
      <div class='text-4xl'>New</div>
      <div class='flex-grow h-[30rem] flex flex-col flex-wrap overflow-y-auto'>
        <Index each={['1', '2', '3', '4', '5', '6', '7', '8', '9']}>
          {x => (
            <div class='h-1/2 w-60 flex flex-col items-center border-2 border-white'>
              <img class='min-h-0 object-contain' src={lightBulb} alt={x()} />
              <div>$0.00-$0.00</div>
              <div>Product name here ...</div>
            </div>
          )}
        </Index>
      </div>
    </>
  )
}

function Footer() {
  return (
    <div class='h-60 py-20 flex justify-between [&_h3]:font-bold [&_h3]:text-xl'>
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
