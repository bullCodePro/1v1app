import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './LogIn.css'; // Import the LogIn-specific styles

function LogIn() {
  const appUrl = "1v1app.up.railway.app";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    try {
      const response = await fetch(`${appUrl}:5000/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the JWT token in localStorage
        localStorage.setItem('token', data.token);
        // Navigate to the dashboard or another page
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-main-content">
      <div className="log-in-container">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default LogIn;
