import type { UrlWithName } from '@/utils'
import { Search } from 'lucide-solid'
import { Index, createSignal } from 'solid-js'

export function Home() {
  return (
    <div class='mx-20 my-2'>
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
    </div>
  )
}
