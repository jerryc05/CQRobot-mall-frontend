import { users_register } from '@/api'
import { createSignal } from 'solid-js'

export default function Register() {
  const [firstName_, setFirstName] = createSignal<string>()
  const [lastName_, setLastName] = createSignal<string>()
  const [phoneNumber_, setPhoneNumber] = createSignal<string>()
  const [email_, setEmail] = createSignal<string>()
  const [password_, setPassword] = createSignal<string>()
  const [termsAccepted_, setTermsAccepted] = createSignal(false)

  const itemHeight = 'h-12'
  const innerInputHeight = '[&_input:not([type=checkbox])]:h-12'
  const labelClass =
    'flex flex-col [&>div]:my-1 [&>div]:text-sm [&>div]:font-semibold'

  return (
    <div class='w-[25rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>Register</div>
      <form
        class={`p-10 rounded-xl bg-white flex flex-col gap-y-3 ${innerInputHeight} [&_input]:px-2 [&_input]:border-2 [&_input]:border-gray-400 [&_input]:rounded-lg`}
        onSubmit={e => {
          e.preventDefault()
          const email = email_()
          const password = password_()
          const firstName = firstName_()
          const lastName = lastName_()
          const phoneNumber = phoneNumber_()
          if (
            email != null &&
            password != null &&
            firstName != null &&
            lastName != null &&
            phoneNumber != null &&
            termsAccepted_()
          ) {
            users_register({
              email: email,
              password: password,
              first_name: firstName,
              last_name: lastName,
              phone_number: phoneNumber,
            })
          }
        }}
      >
        <label class={labelClass}>
          <div>First Name</div>
          <input
            required
            type='text'
            autocomplete='given-name'
            onChange={e => {
              setFirstName(e.target.value)
            }}
          />
        </label>

        <label class={labelClass}>
          <div>Last Name</div>
          <input
            required
            type='text'
            autocomplete='family-name'
            onChange={e => {
              setLastName(e.target.value)
            }}
          />
        </label>

        <label class={labelClass}>
          <div>Phone number</div>
          <input
            required
            type='tel'
            autocomplete='tel'
            onChange={e => {
              setPhoneNumber(e.target.value)
            }}
          />
        </label>

        <label class={labelClass}>
          <div>Email</div>
          <input
            required
            type='email'
            autocomplete='email'
            onChange={e => {
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
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
        </label>

        <label>
          <input
            type='checkbox'
            required
            onChange={e => {
              setTermsAccepted(e.target.checked)
            }}
          />
          <div class='px-2 inline-block'>I accept</div>
          <button type='button' class='text-blue-600'>
            Terms and conditions
          </button>
        </label>

        <button
          type='submit'
          disabled={
            email_() == null ||
            password_() == null ||
            firstName_() == null ||
            lastName_() == null ||
            phoneNumber_() == null ||
            !termsAccepted_()
          }
          class={`${itemHeight} w-full px-4 py-2 rounded-lg bg-blue-700 disabled:bg-gray-400 text-white`}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
