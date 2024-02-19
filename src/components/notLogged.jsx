import React, { useState } from "react";

export default function NotLogged({
  isLoggedIn,
  setIsLoggedIn,
  auth,
  signInWithEmailAndPassword,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const correctPassword = process.env.REACT_APP_CORSI;
  console.log(correctPassword);

  // useEffect(() => {

  //   logIn();
  // }, [auth, signInWithEmailAndPassword]);

  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode);
        // ..
      });
  }

  return (
    <div className="notLogged">
      <h1>Please Log In</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="loginButton" onClick={logIn}>
          Log In
        </button>
      </div>
    </div>
  );
}
