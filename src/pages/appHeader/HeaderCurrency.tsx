import { Index } from 'solid-js'
import { SupportedCurrencies, currency, setCurrency } from '@/utils'

export function Currency() {
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
