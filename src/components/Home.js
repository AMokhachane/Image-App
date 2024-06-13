import React, { useState } from 'react';
import './Home.css';

export const Home = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='home-page'>
      <div className="content">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="image-grid">
          {filteredImages.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.src} alt={image.name} />
              <h2 className="name">{image.name}</h2>
              <p className="description">{image.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};