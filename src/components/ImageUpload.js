import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = () => {
  const [url, setUrl] = useState('');
  const [title, settitle] = useState('');
  const [ImageDescription, setImageDescription] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();  // Initialize useHistory

  const handleAddImage = (event) => {
    event.preventDefault();
    
    const data = {
      url: url,
      name: title,
      ImageDescription: ImageDescription
    };

    axios.post('http://localhost:5205/api/image', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(response => {
      console.log('Response:', response.data);
      // Assuming registration is successful, redirect to login page
      history.push('/');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle registration errors here
      if (error.response) {
        setError(error.response.data); // Set error message from server
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="imageUpload-page">
      <form onSubmit={handleAddImage}>
        {error && <div className="error"><pre>{error}</pre></div>}
        <div className="form-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Enter image name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={ImageDescription}
            onChange={(e) => setImageDescription(e.target.value)}
            placeholder="Enter image description"
            required
          />
        </div>
        <button onClick={handleAddImage}>upload</button>
      </form>
    </div>
  );
};

export default ImageUpload