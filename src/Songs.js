import { useState } from "react";

function Songs() {
  const API_URL = "https://mg-music1.onrender.com";

  const [genre, setGenre] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must login first.");
      return;
    }

    if (!genre.trim()) {
      setError("Please enter a genre.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ genre })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch songs");
      }

      setSongs(data.songs || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Generate Playlist</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <input
        placeholder="Enter genre (e.g. Afrobeat)"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button
        onClick={fetchSongs}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Loading songs..." : "Get Songs"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {songs.map((song, i) => (
          <li key={i}>{song}</li>
        ))}
      </ul>
    </div>
  );
}

export default Songs;
