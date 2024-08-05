import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faImage, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();

  const isVisible = location.pathname === '/Home' || 
  location.pathname === '/ImageUpload' ||
  location.pathname === '/MyLibrary' || 
  /^\/image\/\d+$/.test(location.pathname);

  if (!isVisible) {
    return null;
  }

  return (
    <nav className='sidebar'>
      <div>
        <img src="https://res.cloudinary.com/drgxphf5l/image/upload/v1722849771/dm9gzqkhxa6q8qzpwklp.png" className='logo-image' />
        <div className='menu-items'>
          <Link to='/Home'>
            <button className='home'>
              <FontAwesomeIcon icon={faHome} /> Home
            </button>
          </Link>
          <Link to='/ImageUpload'>
            <button className='image-upload'>
              <FontAwesomeIcon icon={faCamera} /> Image Upload
            </button>
          </Link>
          <Link to='/MyLibrary'>
            <button className='image-upload'>
              <FontAwesomeIcon icon={faImage} /> My Library
            </button>
          </Link>
          <Link to='/'>
            <button className='logout-button'>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;