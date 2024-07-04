import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImage } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();

  // Check if the current path is either '/Home' or '/ImageUpload'
  if (location.pathname !== '/Home' && location.pathname !== '/ImageUpload') {
    return null;
  }

  return (
    <nav className='sidebar'>
      <h3 className='logo'>
        Logo
      </h3>
      <Link to='/Home'>
        <button className='home'>
          <FontAwesomeIcon icon={faHome} /> Home
        </button>
      </Link>
      <Link to='/ImageUpload'>
        <button className='image-upload'>
          <FontAwesomeIcon icon={faImage} /> Image Upload
        </button>
      </Link>
    </nav>
  );
};