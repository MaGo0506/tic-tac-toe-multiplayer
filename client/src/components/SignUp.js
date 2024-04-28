import React, { useState } from "react";

const SignUp = () => {
  const [user, setUser] = useState(null);

  const signUp = () => {
    console.log('signer up');
  }

  return (
    <div className="signUp">
      <label>Sign Up</label>
      <input
        placeholder="First Name"
        type="text"
        onChange={(e) => {
          setUser({ ...user, firstName: e.target.value })
        }}
      />
      <input
        placeholder="Last Name"
        type="text"
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value })
        }}
      />
      <input
        placeholder="Username"
        type="text"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value })
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value })
        }}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;