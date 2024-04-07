import { loginUrl, me } from '@/utils'
import { useNavigate } from '@solidjs/router'
import { Loader2 } from 'lucide-solid'
import { Match, Switch, createEffect } from 'solid-js'

export default function Account() {
  const navigate = useNavigate()

  createEffect(() => {
    if (me.error) navigate(loginUrl)
  })

  return (
    <Switch>
      <Match when={me.loading}>
        <div class='flex-grow flex flex-col justify-center items-center'>
          <Loader2 size='40' class='animate-spin' />
          <div>Logging in...</div>
        </div>
      </Match>
      <Match when={1}>
        <div class='mx-20 my-10'>
          <div class='font-bold text-2xl'>My Account</div>
          <div class='flex gap-2'>
            <Button>Edit info</Button>
            <Button>Change password</Button>
            <Button>Edit Address book</Button>
            <Button>Newsletter Sub</Button>
          </div>
          <div>My orders</div>
          <div class='flex gap-2'>
            <Button>Order history</Button>
            <Button>Return requests</Button>
          </div>
        </div>
      </Match>
    </Switch>
  )
}

const Button = (props: { children: string }) => (
  <button
    type='button'
    class='w-32 h-20 border-2 border-solid border-black rounded-xl'
  >
    {props.children}
  </button>
)
