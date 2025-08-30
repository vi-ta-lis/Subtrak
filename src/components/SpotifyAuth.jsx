// src/components/SpotifyAuth.jsx
import { useEffect, useState } from "react";

const clientId = "YOUR_SPOTIFY_CLIENT_ID";
const redirectUri = "http://localhost:3000"; // change if deployed
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
];

export default function SpotifyAuth() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  // Step 1: On load, check URL for token
  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("spotify_token");

    if (!storedToken && hash) {
      const tokenFromUrl = hash
        .substring(1)
        .split("&")
        .find((param) => param.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("spotify_token", tokenFromUrl);
      storedToken = tokenFromUrl;
    }
    setToken(storedToken);
  }, []);

  // Step 2: Fetch user profile with token
  useEffect(() => {
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [token]);

  // Step 3: Login button
  const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className="bg-white/90 p-6 rounded-2xl shadow-md w-96 mx-auto text-center">
      {!token ? (
        <a
          href={loginUrl}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Connect Spotify
        </a>
      ) : user ? (
        <div>
          <h2 className="text-xl font-bold mb-2">
            🎵 Welcome, {user.display_name}
          </h2>
          <p className="text-gray-700">
            Plan: {user.product === "premium" ? "Premium ✅" : "Free ❌"}
          </p>
          <p className="text-gray-500 text-sm mt-2">Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-gray-600">Loading user info...</p>
      )}
    </div>
  );
}
