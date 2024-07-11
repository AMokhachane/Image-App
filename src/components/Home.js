import React, { useState } from 'react';
import HomeCSS from './Home.module.css';
import {  FaSearch } from 'react-icons/fa';
import { IoFilterSharp } from "react-icons/io5";

export const Home = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={HomeCSS['home-page']}>
      <div className={HomeCSS['form-group']}>
        <div className={HomeCSS.inputBox}>
          < FaSearch className={HomeCSS.icon} />
          <input
            type="text"
            placeholder="Search for..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={HomeCSS['search-bar']}
          />
          <button className='filter'>
          <IoFilterSharp className='filter' /> Filters
            </button>
        </div>
      </div>
      <div className={HomeCSS['image-grid']}>
        {filteredImages.map(image => (
          <div key={image.id} className={HomeCSS['image-item']}>
            <img src={image.src} alt={image.name} />
            <h2 className={HomeCSS.name}>{image.name}</h2>
            <p className={HomeCSS.description}>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};