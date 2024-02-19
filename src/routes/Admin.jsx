import { useEffect, useState } from "react";
import NotLogged from "../components/notLogged.jsx";
import LoggedIn from "../components/LoggedIn.jsx";
import "../styles/admin.css";
import { auth } from "../db/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="adminPage">
      <div className="adminHeader">
        <h1>Admin Page</h1>
        <button
          onClick={() => {
            auth.signOut().then(() => {
              console.log(auth.currentUser);
            });
          }}
        >
          Log Out
        </button>
      </div>

      {user ? (
        <LoggedIn auth={auth} />
      ) : (
        <NotLogged
          auth={auth}
          signInWithEmailAndPassword={signInWithEmailAndPassword}
        />
      )}
    </div>
  );
}
