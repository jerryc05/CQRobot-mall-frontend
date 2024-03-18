export const registerUrl = '/register'
export default function Register() {
  const itemHeight = 'h-12'
  const innerInputHeight = '[&_input:not([type=checkbox])]:h-12'
  const labelClass =
    'flex flex-col [&>div]:my-1 [&>div]:text-sm [&>div]:font-semibold'
  return (
    <div class='w-[35rem] my-auto self-center'>
      <div class='w-full my-7 font-semibold text-center text-4xl'>Register</div>
      <form
        class={`p-10 rounded-xl bg-white flex flex-col gap-y-5 ${innerInputHeight} [&_input]:px-2 [&_input]:border-2 [&_input]:border-gray-400 [&_input]:rounded-lg`}
        onSubmit={e => {
          e.preventDefault()
          alert('todo!')
        }}
      >
        <label class={labelClass}>
          <div>First Name</div>
          <input required type='text' />
        </label>

        <label class={labelClass}>
          <div>Last Name</div>
          <input required type='text' />
        </label>

        <label class={labelClass}>
          <div>Email</div>
          <input required type='email' autocomplete='username' />
        </label>

        <label class={labelClass}>
          <div>Password</div>
          <input required type='password' autocomplete='new-password' />
        </label>

        <label>
          <input type='checkbox' required />
          <div class='px-2 inline-block'>I accept </div>
          <button type='button' class='text-blue-600'>
            Terms and conditions
          </button>
        </label>

        <button
          type='submit'
          class={`${itemHeight} w-full px-4 py-2 rounded-lg bg-blue-700 text-white`}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
