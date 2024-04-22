import { productIdUrl } from '@/utils'
import { Index } from 'solid-js'
import lightBulb from '/Simple_light_bulb_graphic.png'

export default function Home() {
  return (
    <div class='mx-20 my-2'>
      <img class='w-full h-56 my-1 bg-gray-200' alt='carousel' />
      <div class='flex'>
        <BodyLeftPanel />
        <BodyRightContent />
      </div>
    </div>
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
            <a
              href={productIdUrl(x())}
              class='h-1/2 w-60 flex flex-col items-center border-2 border-white bg-white'
            >
              <img class='min-h-0 object-contain' src={lightBulb} alt={x()} />
              <div>$0.00-$0.00</div>
              <div>Product name here ...</div>
            </a>
          )}
        </Index>
      </div>
    </>
  )
}
