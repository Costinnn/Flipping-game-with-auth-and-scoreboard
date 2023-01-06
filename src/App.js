import "./App.css";

import { useEffect, useState } from "react";

import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

import SectionFour from "./sections/SectionFour";
// import Scoreboard from "./sections/Scoreboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { authReady, user } = useAuthContext();
  const { logout } = useLogout();
  const [loginForm, setLoginForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");

  useEffect(() => {
    if (authReady && user) {
      setUserDisplayName(user.displayName);
    }
  }, [user, authReady]);

  const handleLogout = () => {
    logout();
    setLoginForm(false);
    setSignupForm(false);
  };

  return (
    <div className="App">
      {authReady && (
        <>
          <nav className="navigation">
            {!user && <p>Play as guest</p>}
            {user && <p>Playing as {userDisplayName}</p>}

            {user && <button onClick={handleLogout}>Logout</button>}
            {!user && (
              <div>
                <div>
                  <button
                    onClick={() => {
                      setLoginForm(true);
                    }}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setSignupForm(true);
                    }}
                  >
                    Sign up
                  </button>
                </div>
                <p>Play with a character</p>
              </div>
            )}
          </nav>
          {loginForm && !user ? <Login setLoginForm={setLoginForm} /> : ""}
          {signupForm && !user ? <Signup setSignupForm={setSignupForm} /> : ""}
          <div className="game">
            <SectionFour userDisplayName={userDisplayName} />
            {/* <Scoreboard /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
