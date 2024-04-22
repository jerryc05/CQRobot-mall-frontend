import { productIdUrl } from '@/utils'
import { For } from 'solid-js'
import lightBulb from '/Simple_light_bulb_graphic.png'

export function BodyRightContent() {
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
      <For each={['1', '2', '3', '4', '5', '6']}>
        {x => (
          <img
            class='basis-1/2 h-32 border-2 border-white bg-gray-300'
            alt={x}
          />
        )}
      </For>
    </div>
  )
}

function NewCarousel() {
  return (
    <>
      <div class='text-4xl'>New</div>
      <div class='flex-grow h-[30rem] flex flex-col flex-wrap overflow-y-auto'>
        <For each={['1', '2', '3', '4', '5', '6', '7', '8', '9']}>
          {x => (
            <a
              href={productIdUrl(x)}
              class='h-1/2 w-60 flex flex-col items-center border-2 border-white bg-white'
            >
              <img class='min-h-0 object-contain' src={lightBulb} alt={x} />
              <div>$0.00-$0.00</div>
              <div>Product name here ...</div>
            </a>
          )}
        </For>
      </div>
    </>
  )
}
