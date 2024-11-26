import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Index() {
  const navigate = useNavigate();

  // Event handler for Sign Up button
  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  // Event handler for Log In button
  const handleLogIn = () => {
    navigate('/login'); // Navigate to the Log In page
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="title">WELCOME TO 1:1 STATS!</h1>
        {/* Buttons for Signup and Login */}
        <div className="cta-buttons">
          <button className="cta-button" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="cta-button" onClick={handleLogIn}>
            Log In
          </button>
        </div>
        <div className="meme-container"/>
      </section>
    </div>
  );
}

export default Index;
