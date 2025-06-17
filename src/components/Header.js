import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="SDP Portal Logo" className="logo" />
        <h1 className="app-title">SDP Portal</h1>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          <i className="fas fa-home"></i> Home
        </Link>
      </nav>
    </header>
  );
};

export default Header; 