const LoginForm = ({handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
   return(
       <div>
    <form onSubmit={handleLogin}>
      <div>
        Username &nbsp;
          <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        /><br/><br/>
      </div>
      <div>
        password &nbsp;
          <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div><br/><br/>
      <button id='login' type="submit">login</button>
    </form>      
  </div>
   )
}
  export default LoginForm