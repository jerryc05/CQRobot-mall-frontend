import { users_login } from '@/api'
import { refetchMe } from '@/utils'
import { createSignal } from 'solid-js'
import { formClass, labelClass, submitBtnHeight } from './util_login_register'

export default function Login() {
  const [email_, setEmail] = createSignal<string>()
  const [password_, setPassword] = createSignal<string>()

  return (
    <div class='w-[25rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>Login</div>
      <form
        class={formClass}
        onSubmit={e => {
          e.preventDefault()
          const email = email_()
          const password = password_()
          if (email != null && password != null) {
            users_login({
              email: email,
              password: password,
            }).then(refetchMe)
          }
        }}
      >
        <label class={labelClass}>
          <div>Email</div>
          <input
            required
            type='email'
            autocomplete='email'
            onInput={e => {
              setEmail(e.target.value)
            }}
          />
        </label>

        <label class={labelClass}>
          <div>Password</div>
          <input
            required
            type='password'
            autocomplete='new-password'
            onInput={e => {
              setPassword(e.target.value)
            }}
          />
        </label>

        <button
          type='submit'
          disabled={email_() == null || password_() == null}
          class={`${submitBtnHeight} w-full px-4 py-2 rounded-lg bg-blue-700 disabled:bg-gray-400 text-white`}
          // todo: spin
        >
          Login
        </button>
      </form>
    </div>
  )
}
