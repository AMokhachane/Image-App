import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUpload.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt  } from '@fortawesome/free-solid-svg-icons';

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

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', imageTitle);
      formData.append('description', imageDescription);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Upload successful:', result);
        } else {
          console.error('Upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.wrapper}>
        <h1>Image Upload</h1>
        <div className={styles.formGroup}>
          <label htmlFor="imageTitle">Image Title</label>
          <div className={styles.inputBox}>
            <input
              type="text"
              id="imageTitle"
              
              value={imageTitle}
              onChange={handleTitleChange}
              required
            />
          </div>
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
        <div {...getRootProps({ className: styles.uploadArea })}>
        <FontAwesomeIcon icon={faCloudUploadAlt } className={styles.uploadIcon} />
          <input {...getInputProps()} />

          <text>Drag and drop files</text>
          <p> or</p>
          {file && <p>Selected file: {file.name}</p>}
        <button onClick={handleUpload} className={styles.uploadBtn}>Upload</button>
      </div>
    </div>
    </div>
  );
};

export default ImageUpload;