import React, { useState } from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css'; // Import the CSS module

const apiUrl = 'http://localhost:5205/api/image';

const ImageUpload = () => {
    const [newImage, setNewImage] = useState({
        title: '',
        imageDescription: '',
        url: '',
        uploadDate: new Date().toISOString().slice(0, 10)
    });

    const createImage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, newImage);
            console.log('Image created:', response.data);
            setNewImage({
                title: '',
                imageDescription: '',
                url: '',
                uploadDate: new Date().toISOString().slice(0, 10)
            });
        } catch (error) {
            console.error('Error creating image:', error);
        }
    };

    return (
        <div className={styles.parentContainer}>
            <form onSubmit={createImage}>
                <input
                    className={styles.fileInput}
                    type="text"
                    placeholder="Title"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    required
                />
                <input
                    className={styles.fileInput}
                    type="text"
                    placeholder="Description"
                    value={newImage.imageDescription}
                    onChange={(e) => setNewImage({ ...newImage, imageDescription: e.target.value })}
                    required
                />
                <input
                    className={styles.fileInput}
                    type="url"
                    placeholder="URL"
                    value={newImage.url}
                    onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                    required
                />
                <input
                    className={styles.fileInput}
                    type="date"
                    value={newImage.uploadDate}
                    onChange={(e) => setNewImage({ ...newImage, uploadDate: e.target.value })}
                    required
                />
                <button className={styles.uploadButton} type="submit">Add Image</button>
            </form>
        </div>
    );
};

export default ImageUpload;