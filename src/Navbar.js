import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Check if the current path is the login page
  if (location.pathname === '/') {
    return null; // Do not render the navbar on the login page
  }

  return (
    <nav className="navbar">
      <div className='links'>
        <Link to="/">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;