import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUpload.module.css'; // Import the CSS module

const ImageUpload = () => {
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    }
  });

  const handleTitleChange = (e) => {
    setImageTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setImageDescription(e.target.value);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', imageTitle);
      formData.append('description', imageDescription);

      // Add your upload logic here
      console.log('Uploading:', formData);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className={styles.imageUpload}>
      <h1>Image Upload</h1>
      <div className={styles.formGroup}>
        <label htmlFor="imageTitle">Image Title</label>
        <input
          type="text"
          id="imageTitle"
          value={imageTitle}
          onChange={handleTitleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="imageDescription">Image Description</label>
        <textarea
          id="imageDescription"
          value={imageDescription}
          onChange={handleDescriptionChange}
          className={styles.textarea}
        />
      </div>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
        {file && <p>Selected file: {file.name}</p>}
      </div>
      <button onClick={handleUpload} className={styles.button}>Upload</button>
    </div>
  );
};

export default ImageUpload;