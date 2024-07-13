import { home_carousel, home_category_tree } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { Carousel } from 'solid-bootstrap'
import {
  For,
  Index,
  createEffect,
  createResource,
  createSignal,
} from 'solid-js'
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
  const KEY = 'homeCategory'
  const PERSISTED_KEY = `persisted:${KEY}`
  const [categories] = createResource<
    Awaited<ReturnType<typeof home_category_tree>> | undefined
  >(
    async (_source, { value /* , refetching */ }) => {
      try {
        return await home_category_tree()
      } catch (e) {
        console.error(e)
      }
      return value
    },
    {
      name: `resource:${KEY}`,
      storage: x =>
        makePersisted(createSignal(x), {
          name: PERSISTED_KEY,
        }),
    }
  )

  return (
    <div class='basis-14'>
      <div class='bg-gray-200'>Products</div>
      <div>
        <For each={categories()}>
          {x => <RecursiveCategoryTree category={x} />}
        </For>
      </div>
    </div>
  )
}

function RecursiveCategoryTree(props: {
  category: Awaited<ReturnType<typeof home_category_tree>>[0]
}) {
  const elemClassName =
    'w-28 px-2 relative hover:bg-gray-200 [&>div]:hover:flex'
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      class={elemClassName}
      onClick={() => {
        console.log(`${props.category.name} (id=${props.category.id})`)
      }}
    >
      {props.category.name}
      {/* TODO: change to recursive call */}
      <div class='flex-col absolute top-0 left-full hidden'>
        <For each={props.category.children}>
          {x => <RecursiveCategoryTree category={x} />}
        </For>
      </div>
    </div>
  )
}
