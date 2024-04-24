import { users_reset_password } from '@/api'
import {
  homeUrl,
  loginCred,
  loginToken,
  loginUsingCredAndSetToken,
  refetchMe,
  setLoginCred,
} from '@/utils'
import { useNavigate } from '@solidjs/router'
import { Loader2 } from 'lucide-solid'
import { Show, createSignal } from 'solid-js'
import { formClass, labelClass, submitBtnHeight } from './util_login_register'

export default function Login() {
  const navigate = useNavigate()

  // undefined -> login, '' -> invalid new pwd, string -> valid new pwd
  const [newPwd_, setNewPwd] = createSignal<string>()

  return (
    <div class='w-[25rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>
        {newPwd_() != null ? 'Reset Password' : 'Login'}
      </div>
      <form
        class={formClass}
        onSubmit={e => {
          e.preventDefault()
          const cred = loginCred()
          if (cred?.email && cred?.password) {
            const newPwd = newPwd_()
            if (newPwd == null)
              Promise.resolve(loginUsingCredAndSetToken())
                .then(() => refetchMe())
                .then(() => {
                  navigate(homeUrl)
                })
            else {
              if (newPwd.length > 0) {
                users_reset_password({
                  email: cred.email,
                  old_password: cred.password,
                  new_password: newPwd,
                })
                  .then(() => alert('Password reset successfully!'))
                  .catch(() => alert('Failed to reset password'))
              }
            }
          }
        }}
      >
        <label class={labelClass}>
          <div>Email</div>
          <input
            data-test='email'
            required
            type='email'
            autocomplete='email'
            onInput={e => {
              setLoginCred(x => ({
                email: e.target.value,
                password: x?.password ?? '',
              }))
            }}
          />
        </label>

        <label class={labelClass}>
          <div class='flex justify-between'>
            <div>{`${newPwd_() != null ? 'Old ' : ''}Password`}</div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              class='px-1 cursor-pointer hover:bg-gray-200'
              onClick={() => {
                setNewPwd(x => (x == null ? '' : undefined))
              }}
            >
              {newPwd_() != null ? 'Login' : 'Reset'}
            </div>
          </div>
          <input
            required
            data-test='password'
            type='password'
            autocomplete='current-password'
            onInput={e => {
              setLoginCred(x => ({
                email: x?.email ?? '',
                password: e.target.value,
              }))
            }}
          />
        </label>

        <Show when={newPwd_() != null}>
          <label class={labelClass}>
            <div>New Password</div>
            <input
              required
              type='password'
              autocomplete='new-password'
              onInput={e => {
                setNewPwd(e.target.value)
              }}
            />
          </label>
        </Show>

        <button
          data-test='submit'
          type='submit'
          disabled={
            !loginCred()?.email || !loginCred()?.password || newPwd_() === ''
          }
          class={`${submitBtnHeight} w-full px-4 py-2 rounded-lg bg-blue-700 disabled:bg-gray-400 text-white`}
        >
          {loginToken.loading ? (
            <Loader2 class='w-full animate-spin' />
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  )
}
