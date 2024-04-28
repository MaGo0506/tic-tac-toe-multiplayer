import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    console.log('signer up');
  }

  return (
    <div className="login">
      <label>Login</label>
      <input
        placeholder="Username"
        type="text"
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;