import React, { useState } from "react";
import "./App.css";
import WelcomeScreen from "./WelcomeScreen";
import PasswordInput from "./PasswordInput";

const url = "http://localhost:5000/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      // setUsername("");
      setPassword("");
      setError("");
      setLoggedIn(true);
    } else {
      setError(data.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <div className="App">
        <div className="main">
          <h1>Welcome to our app, {username}!</h1>
          <p>Thank you for logging in.</p>  
        </div>
        <div className="navigation">
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <h2>Log in</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label className="input-label">Username:</label>
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password:</label>
          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="login-button" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default App;
