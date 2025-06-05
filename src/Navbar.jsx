// Navbar.jsx

import React from 'react';
import './Navbar.css';
import { auth, googleProvider } from './FirebaseConfig';

const Navbar = ({ onSignIn, onHomeClick, isAuthenticated }) => {
  const handleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      onSignIn(result.user); // Pass the signed-in user to the parent component
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">MyApp</span>
      </div>
      <ul className="nav-links">
        <li>
          <button onClick={onHomeClick} className="nav-link">
            Home
          </button>
        </li>
        <li>
          <a href="#" className="nav-link">
            About
          </a>
        </li>
        {isAuthenticated && (
          <li>
            <a href="#" className="nav-link">
              Model
            </a>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <button onClick={handleSignIn} className="sign-in-btn">
              Sign in with Google
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
