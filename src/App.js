import { useState, useEffect } from "react";
import Login from "./Login";
import Songs from "./Songs";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎵 MG Music</h1>

      {loggedIn ? (
        <>
          <button
            onClick={handleLogout}
            style={{
              marginBottom: "20px",
              background: "crimson",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

          <Songs />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
