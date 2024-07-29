import React, { useState } from 'react';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ selectedImage, setSelectedImage, setImagePreviewUrl, addImage }) => {
  const [fullName, setFullName] = useState(''); // State for full name

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate that the file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
      }
  
      setSelectedImage(file);
  
      // Create a URL for the image to display a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file); // Read the image file as a base64 encoded string
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage && fullName) {
      // Create a FileReader to read the file as a base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        addImage({ url: reader.result, name: fullName }); // Use the base64 string
        setSelectedImage(null); // Clear the selected image after upload
        setImagePreviewUrl(''); // Clear the preview URL
        setFullName(''); // Clear the full name input after upload
      };
      reader.readAsDataURL(selectedImage); // Read the selected image
    } else {
      alert('Please select an image and enter a name.');
    }
  };

  return (
    <div className={styles.parentContainer}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Name" 
          value={fullName} 
          onChange={(e) => setFullName(e.target.value)} // Update full name state
          className={styles.nameInput} // Optional: add appropriate styling class
        />
        <input 
          type="file" 
          onChange={handleImageChange} 
          className={styles.fileInput} 
        />
        <button type="submit" className={styles.uploadButton}>Upload Image</button>
      </form>
    </div>
  );
};

export default ImageUpload;