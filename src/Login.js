import { useState } from "react";

function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://mg-music1.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("LOGIN CLICKED");

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("LOGIN RESPONSE:", res.status);

      const data = await res.json();
      console.log("LOGIN DATA:", data);

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.access_token);
      console.log("TOKEN SAVED");

      setLoading(false);
      onLogin(); // 🔥 MUST FIRE

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Server error");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        No account?{" "}
        <button type="button" onClick={goRegister}>
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;
