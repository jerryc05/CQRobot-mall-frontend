import { home_carousel } from '@/api'
import { For, Index, createEffect, createSignal } from 'solid-js'
import { Slider } from 'solid-slider'
import { autoplay } from 'solid-slider/dist/autoplay/autoplay'
import { BodyRightContent } from './HomeRightContent'

export default function Home() {
  return (
    <div class='mx-20 my-2'>
      <Carousel />
      <div class='flex'>
        <BodyLeftPanel />
        <BodyRightContent />
      </div>
    </div>
  )
}

function Carousel() {
  const [imgs, setImgs] = createSignal<string[]>()
  createEffect(() => {
    home_carousel().then(setImgs)
  })
  return (
    <Slider options={{ loop: true }} plugins={[autoplay(1500, {})]}>
      <For each={imgs()}>
        {(x, i) => (
          <img
            class={`w-full h-56 my-1 bg-gray-200 ${i() === 0 ? '' : 'hidden'}`}
            src={x}
            alt={`carousel-${i()}`}
          />
        )}
      </For>
    </Slider>
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
