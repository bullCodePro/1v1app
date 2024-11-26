import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo">1:1</div>
      <div className="nav-and-profile">
        <ul className="nav-links">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
        </ul>
        <div className="profile-section">
          <div className="profile-circle" onClick={toggleMenu}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-image"
            />
          </div>
          {showMenu && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="dropdown-item">Log Out</button>
              ) : (
                <a href="/login" className="dropdown-item">Log In</a>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
