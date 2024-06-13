import React, { useState } from 'react';
import './ImageUpload.css';

export const ImageUpload = ({ images, setImages }) => {
  const [nextId, setNextId] = useState(images.length + 1);

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddImage = () => {
    if (url) {
      const newImage = {
        id: nextId,
        src: url,
        name: name || `Image ${nextId}`,
        description: description || `Description for Image ${nextId}`,
      };
      setImages([...images, newImage]);
      setNextId(nextId + 1);
      setUrl('');
      setName('');
      setDescription('');
    } else {
      alert('Please enter a valid URL');
    }
  };

  return (
    <div className='imageUpload-page'>
      <input
        type="text"
        value={url}
        onChange={handleUrlChange}
        placeholder="Enter image URL"
      />
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter image name"
      />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter image description"
      />
      <button onClick={handleAddImage}>Upload</button>
    </div>
  );
};
