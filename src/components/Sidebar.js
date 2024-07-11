import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();

  if (location.pathname !== '/Home' && location.pathname !== '/ImageUpload') {
    return null;
  }

  return (
    <nav className='sidebar'>
      <div>
        <h3 className='logo'>Logo</h3>
        <div className='menu-items'>
          <Link to='/Home'>
            <button className='home'>
              <FontAwesomeIcon icon={faHome} /> Home
            </button>
          </Link>
          <Link to='/ImageUpload'>
            <button className='image-upload'>
              <FontAwesomeIcon icon={faImage} /> Image Upload
            </button>
            <div className='logout'></div>
          </Link>
          <div className=''></div>
          <Link to='/'>
            <button className='/'>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};