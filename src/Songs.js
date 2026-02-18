import { useState } from "react";

function Songs({ onLogout }) {
  const [genre, setGenre] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://mg-music1.onrender.com";

  const fetchSongs = async () => {
    console.log("FETCH SONGS CLICKED");

    setError("");
    setSongs([]);
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Missing auth token. Please login again.");
      setLoading(false);
      return;
    }

    if (!genre) {
      setError("Please enter a genre");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(`${API_URL}/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ genre }),
        signal: controller.signal
      });

      console.log("SONGS RESPONSE STATUS:", res.status);

      const data = await res.json();
      console.log("SONGS DATA:", data);

      if (!res.ok) {
        setError(data.error || "Failed to fetch songs");
      } else {
        setSongs(data.songs || []);
      }

    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Try again.");
      } else {
        setError("Network error while fetching songs");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
      console.log("FETCH SONGS DONE");
    }
  };

  return (
    <div>
      <h2>Generate Playlist</h2>

      <button onClick={onLogout}>Logout</button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <button onClick={fetchSongs} disabled={loading}>
          {loading ? "Loading..." : "Get Songs"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {songs.map((song, i) => (
          <li key={i}>{song}</li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
