import { useState } from "react";
import NotLogged from "../components/notLogged.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import "../styles/admin.css";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="adminPage">
      <h1>Admin Page</h1>
      {isLoggedIn ? (
        <LoggedIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <NotLogged isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
