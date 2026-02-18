import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Songs from "./Songs";

function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("token") ? "songs" : "login";
  });

  const handleLogin = () => {
    setPage("songs");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div>
      <h1>MG Music</h1>

      {page === "login" && (
        <Login
          onLogin={handleLogin}
          goRegister={() => setPage("register")}
        />
      )}

      {page === "register" && (
        <Register
          goLogin={() => setPage("login")}
        />
      )}

      {page === "songs" && (
        <Songs onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
