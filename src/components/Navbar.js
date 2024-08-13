import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export const Navbar = () => {
  const location = useLocation();

  // Check if the current path is one of the specified routes
  const isVisible = 
    location.pathname === '/Home' || 
    location.pathname === '/ImageUpload' || 
    location.pathname === '/MyLibrary' || 
    /^\/image\/\d+$/.test(location.pathname) || 
    /^\/management\/\d+$/.test(location.pathname); 

  if (!isVisible) {
    return null;
  }

let navText = '';
if (location.pathname === '/Home') {
  navText = 'Home >';
} else if (location.pathname === '/ImageUpload') {
  navText = 'Image Upload >';
} else if (location.pathname === '/MyLibrary') {
  navText = 'MyLibrary >';
} else if (/^\/image\/\d+$/.test(location.pathname)) { 
  navText = 'Home >';
} else if (/^\/management\/\d+$/.test(location.pathname)) { 
  navText = 'MyLibrary >';
}

  return (
    <nav className="navbar">
      <div className="nav-text">
          {navText}
        </div>
        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
        <div className="user-info">
        <span>Amanda Mokhachane</span>
        
        <div className="dropdown">
          <button className="dropbtn">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

        </div>
      </div>
     </nav>
  );
}

export default Navbar;