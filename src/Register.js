import { useState } from "react";

function Register({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://mg-music1.onrender.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setMessage("Registered successfully. You can now login.");
      setLoading(false);
    } catch (err) {
      setMessage("Server error");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={goLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
