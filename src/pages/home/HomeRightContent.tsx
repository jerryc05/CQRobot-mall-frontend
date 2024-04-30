import { productIdUrl } from '@/utils'
import { For, Match, Switch, createResource, createSignal } from 'solid-js'
import { product_detail, product_popular } from '@/api'
import { makePersisted } from '@solid-primitives/storage'
import { Loader2 } from 'lucide-solid'

export function BodyRightContent() {
  return (
    <div class='flex-grow flex flex-col'>
      <ImageCategories />
      <PopularCarousel />
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

function PopularCarousel() {
  const POPULAR_KEY = 'product_popular'
  const [populars /* , { refetch: refetchPopulars } */] = createResource(
    () => product_popular(),
    {
      name: `resource:${POPULAR_KEY}`,
      storage: init =>
        makePersisted(createSignal(init), {
          name: `persisted:${POPULAR_KEY}`,
        }),
    }
  )

  return (
    <>
      <div class='text-4xl'>Popular</div>
      <Switch>
        <Match when={populars.loading}>
          <Loader2 class='m-5 w-full animate-spin' />
        </Match>
        <Match when={populars.error}>Error: {populars.error}</Match>
        <Match when={1}>
          <div class='flex-grow h-[30rem] flex flex-col flex-wrap overflow-y-auto'>
            <For each={populars()}>
              {id => {
                const [prod] = createResource(() => product_detail(id))
                return (
                  <a
                    href={productIdUrl(id)}
                    class='h-1/2 w-60 flex flex-col items-center border-2 border-white bg-white'
                  >
                    <Switch>
                      <Match when={prod.loading}>
                        <Loader2 class='w-full animate-spin' />
                      </Match>
                      <Match when={prod.error}>Error: {prod.error}</Match>
                      <Match when={1}>
                        <img
                          class='min-h-0 object-contain'
                          src={prod()?.image_url}
                          alt={prod()?.model}
                        />
                        <div>${prod()?.price}</div>
                        <div>{prod()?.model}</div>
                      </Match>
                    </Switch>
                  </a>
                )
              }}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  )
}
