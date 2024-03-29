import { users_register } from '@/api'
import { createSignal } from 'solid-js'
import { submitBtnHeight, labelClass, formClass } from './util_login_register'

export default function Register() {
  const [firstName_, setFirstName] = createSignal<string>()
  const [lastName_, setLastName] = createSignal<string>()
  const [phoneNumber_, setPhoneNumber] = createSignal<string>()
  const [email_, setEmail] = createSignal<string>()
  const [password_, setPassword] = createSignal<string>()
  const [termsAccepted_, setTermsAccepted] = createSignal(false)

  return (
    <div class='w-[25rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>Register</div>
      <form
        class={formClass}
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
            onInput={e => {
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
            onInput={e => {
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
            onInput={e => {
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

        <label>
          <input
            type='checkbox'
            required
            onInput={e => {
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
          class={`${submitBtnHeight} w-full px-4 py-2 rounded-lg bg-blue-700 disabled:bg-gray-400 text-white`}
          // todo: spin
        >
          Submit
        </button>
      </form>
    </div>
  )
}
