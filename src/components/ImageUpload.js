import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css'; // Import the CSS module

const apiUrl = 'http://localhost:5205/api/image';

const ImageUpload = () => {
    const [newImage, setNewImage] = useState({
        title: '',
        imageDescription: '',
        url: '',
        uploadDate: new Date().toISOString().slice(0, 10),
        selectedTagId: '', // Updated to selectedTagId
    });

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createImage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, newImage);
            console.log('Image created:', response.data);
            setNewImage({
                title: '',
                imageDescription: '',
                url: '',
                uploadDate: new Date().toISOString().slice(0, 10),
                selectedTagId: '', // Reset the selected tag
            });
        } catch (error) {
            console.error('Error creating image:', error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get('http://localhost:5205/api/tag');
            setTags(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    if (loading) return <p>Loading tags...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.parentContainer}>
            <div className={styles.box}>
                <h2 className={styles.heading}>Image Upload</h2>
                <form onSubmit={createImage}>
                    <p className={styles.label}>Image Title</p>
                    <input
                        className={styles.fileInput}
                        type="text"
                        value={newImage.title}
                        onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                        required
                    />
                    <p className={styles.label}>Image Category</p>
                    <select
                        className={styles.fileInput}
                        id="tagSelect"
                        value={newImage.selectedTagId}
                        onChange={(e) => setNewImage({ ...newImage, selectedTagId: e.target.value })}
                        required
                    >
                        <option value=""></option>
                        {tags.map(tag => (
                            <option key={tag.tagId} value={tag.tagId}>
                                {tag.tagName}
                            </option>
                        ))}
                    </select>
                    <p className={styles.label}>Image Description</p>
                    <input
                        className={styles.fileDescription}
                        type="text"
                        placeholder=""
                        value={newImage.imageDescription}
                        onChange={(e) => setNewImage({ ...newImage, imageDescription: e.target.value })}
                        required
                    />
                    <p className={styles.label}>Image Url</p>
                    <input
                        className={styles.fileUrl}
                        type="url"
                        placeholder="Paste image URL here"
                        value={newImage.url}
                        onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                        required
                    />
                    <p className={styles.label}>Upload Date</p>
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
        </div>
    );
};

export default ImageUpload;