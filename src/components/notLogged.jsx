import React, { useState } from "react";

export default function NotLogged({ isLoggedIn, setIsLoggedIn }) {
  const [password, setPassword] = useState("");

  const correctPassword = process.env.REACT_APP_CORSI;
  console.log(correctPassword);

  function logIn() {
    console.log("Logging in...");
    console.log("Password:", password);
    if (password === correctPassword) {
      setIsLoggedIn(true);
    } else {
      console.log("Wrong password.");
    }
  }

  return (
    <div className="notLogged">
      <h1>Please Log In</h1>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={logIn}>Log In</button>
      </div>
    </div>
  );
}
