import React, { useState } from 'react';
import axios from 'axios';
import ImageUploadCss from './ImageUpload.module.css';
import Navbar from './Navbar'; // Import the Navbar component

const ImageUploader = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    event.preventDefault();

    const imageData = {
      url: url,
      title: title,
      description: description,
    };

    try {
      const response = await axios.post('http://localhost:5205/api/images', imageData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Image upload successful:', response.data);
      // Assuming you have a function to update images in the parent component
      // For now, you can console.log(response.data) and update your state accordingly.
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={ImageUploadCss['image-upload-container']}>
      <Navbar /> {/* Use the Navbar component */}
      {error && <div className={ImageUploadCss.error}>{error}</div>}
      <form onSubmit={handleImageUpload} className={ImageUploadCss['image-upload-form']}>
        <div className={ImageUploadCss['form-group']}>
          <label htmlFor="url">Image URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className={ImageUploadCss['form-group']}>
          <label htmlFor="title">Image Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            required
          />
        </div>
        <div className={ImageUploadCss['form-group']}>
          <label htmlFor="description">Image Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter image description"
            required
          />
        </div>
        <button type="submit" className={ImageUploadCss['upload-button']}>Upload Image</button>
      </form>
    </div>
  );
};

export default ImageUploader;