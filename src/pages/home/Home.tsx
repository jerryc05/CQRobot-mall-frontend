import { Index } from 'solid-js'
import { BodyRightContent } from './HomeRightContent'

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
