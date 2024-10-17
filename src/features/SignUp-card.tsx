type Props = {};

function SignUp({}: Props) {
  return (
    <form>
      <label htmlFor="username">username:</label>
      <input id="username" name="username" type="text" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      {/* <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button> */}
    </form>
  );
}

export default SignUp;
