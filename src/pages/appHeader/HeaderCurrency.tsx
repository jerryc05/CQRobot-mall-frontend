import { SupportedCurrencies, currency, setCurrency } from '@/utils'
import { Index } from 'solid-js'

export function Currency() {
  const itemClassList =
    'w-24 h-full flex justify-center items-center bg-gray-300 cursor-pointer z-10'
  return (
    <div class='h-full relative [&>div]:hover:flex'>
      <div class={itemClassList} data-test='currency-selected'>
        {currency()}
      </div>
      <div class='flex-col absolute top-full hidden'>
        <Index each={Object.values(SupportedCurrencies)}>
          {x => (
            <button
              type='button'
              data-test={`currency-btn-${x()}`}
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
