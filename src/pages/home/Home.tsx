import { home_carousel } from '@/api'
import { Carousel } from 'solid-bootstrap'
import { For, Index, createEffect, createSignal } from 'solid-js'
import { BodyRightContent } from './HomeRightContent'

export default function Home() {
  return (
    <div class='mx-20 my-2'>
      <CarouselComp />
      <div class='flex'>
        <BodyLeftPanel />
        <BodyRightContent />
      </div>
    </div>
  )
}

function CarouselComp() {
  const [imgs, setImgs] = createSignal<string[]>()
  createEffect(() => {
    home_carousel().then(setImgs)
  })

  const [index, setIndex] = createSignal(0)
  const handleSelect = (
    selectedIndex: number,
    e: Record<string, unknown> | null
  ) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index()} onSelect={handleSelect}>
      <For each={imgs()}>
        {(x, i) => (
          <Carousel.Item>
            <img
              class={`w-full h-56 my-1 bg-gray-200 ${
                i() === 0 ? '' : 'hidden'
              }`}
              src={x}
              alt={`carousel-${i()}`}
            />
          </Carousel.Item>
        )}
      </For>
    </Carousel>
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
