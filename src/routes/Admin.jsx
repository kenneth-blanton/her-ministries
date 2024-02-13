import { useState } from "react";
import NotLogged from "../components/notLogged.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import "../styles/admin.css";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logOut() {
    console.log("Logging out...");
    setIsLoggedIn(false);
  }

  return (
    <div className="adminPage">
      <div className="adminHeader">
        <h1>Admin Page</h1>
        <button onClick={logOut}>Log Out</button>
      </div>

      {isLoggedIn ? (
        <LoggedIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <NotLogged isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
