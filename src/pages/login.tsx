import { loginCred, refetchToken, setLoginCred, token } from '@/utils'
import { Loader2 } from 'lucide-solid'
import { formClass, labelClass, submitBtnHeight } from './util_login_register'

export default function Login() {
  return (
    <div class='w-[25rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>Login</div>
      <form
        class={formClass}
        onSubmit={e => {
          e.preventDefault()
          if (loginCred().email && loginCred().password) {
            refetchToken()
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
              setLoginCred(x => ({ ...x, email: e.target.value }))
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
              setLoginCred(x => ({ ...x, password: e.target.value }))
            }}
          />
        </label>

        <button
          type='submit'
          disabled={!loginCred().email || !loginCred().password}
          class={`${submitBtnHeight} w-full px-4 py-2 rounded-lg bg-blue-700 disabled:bg-gray-400 text-white`}
        >
          {token.loading ? <Loader2 class='w-full animate-spin' /> : 'Login'}
        </button>
      </form>
    </div>
  )
}
