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
        selectedTagId: '', // State for selected tag
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
                <label htmlFor="tagSelect">Select Tag:</label>
                <select
                    id="tagSelect"
                    value={newImage.selectedTagId}
                    onChange={(e) => setNewImage({ ...newImage, selectedTagId: e.target.value })}
                    required
                >
                    <option value="">Select a tag</option>
                    {tags.map(tag => (
                        <option key={tag.tagId} value={tag.tagId}>
                            {tag.tagName}
                        </option>
                    ))}
                </select>
                <button className={styles.uploadButton} type="submit">Add Image</button>
            </form>
        </div>
    );
};

export default ImageUpload;