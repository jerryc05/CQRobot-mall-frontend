export const registerUrl = '/register'
export default function Register() {
  return (
    <div class='mx-16'>
      <b>Register</b>
      <form
        class='w-full_ flex_ flex-col [&>label]:flex [&>label>div]:flex-grow [&_input]:w-2/3 [&_input]:border-2 [&_input]:border-black'
        onSubmit={e => {
          e.preventDefault()
          alert('todo!')
        }}
      >
        <label>
          <div>First Name</div>
          <input required type='text' />
        </label>

        <label>
          <div>Last Name</div>
          <input required type='text' />
        </label>

        <label>
          <div>Email</div>
          <input required type='email' autocomplete='username' />
        </label>

        <label>
          <div>Password</div>
          <input required type='password' autocomplete='new-password' />
        </label>

        <button
          type='submit'
          class='px-4 py-2 rounded-lg bg-gray-500 text-white'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
