import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export const Navbar = () => {
  const location = useLocation();

  if (location.pathname !== '/Home' && location.pathname !== '/ImageUpload') {
    return null;
  }

  let navText = '';
  switch (location.pathname) {
    case '/Home':
      navText = 'Home >';
      break;
    case '/ImageUpload':
      navText = 'Image Upload';
      break;
    default:
      navText = '';
      break;
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
          {/* Dropdown content here */}
        </div>
      </div>
     </nav>
  );
}

export default Navbar;