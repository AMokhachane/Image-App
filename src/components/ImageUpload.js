import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

const ImageUpload = () => {
    const [imageSelected, setImageSelected] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTagId, setSelectedTagId] = useState("");
    const [tags, setTags] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [titleError, setTitleError] = useState(""); // New state for title error message
    const [categoryError, setCategoryError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [imageSelectedError, setImageSelectedError] = useState(""); // New state for category error message
    const fileInputRef = useRef(null);

    const fetchTags = async () => {
        try {
            const response = await axios.get("http://localhost:5205/api/tag");
            setTags(response.data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    React.useEffect(() => {
        fetchTags();
    }, []);

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setImageSelected(file);
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const uploadImage = async () => {
        setTitleError(""); // Clear errors before validation
        setCategoryError(""); // Clear errors before validation
        setDescriptionError("");
        setImageSelectedError("");

        if (!title) {
            setTitleError("Title needed");
            return;
        }
        if (!selectedTagId) {
            setCategoryError("Category needed");
            return;
        }
        if (!imageSelected) {
            setImageSelectedError("Please select an image to upload.");
            return;
        }
        if (!description) {
            setDescriptionError("Please select a description.");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "wywylbfz");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", formData);
            const imageUrl = response.data.secure_url;
            console.log('Image URL:', imageUrl);

            const imagePayload = {
                title: title,
                imageDescription: description,
                url: imageUrl,
                uploadDate: new Date().toISOString().slice(0, 10),
                tagId: selectedTagId,
            };

            await axios.post("http://localhost:5205/api/image", imagePayload);
            console.log('Image data sent to API successfully');

            // Set success message
            setSuccessMessage("Image uploaded successfully!");
            // Clear the input fields after successful upload
            setTitle("");
            setDescription("");
            setSelectedTagId("");
            setImageSelected(null);
        } catch (error) {
            console.error("Error uploading image or sending data to API:", error);
            setTitleError("Supported image file formats are PNG and JPG only!");
        }
    };

    return (
        <div className={styles.parentContainer}>
            <div className={styles.box}>
                <h2 className={styles.heading}>Image Upload</h2>
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Display success message */}
                <p className={styles.label}>Image Title</p>
                {titleError && <p className={styles.errorMessage}>{titleError}</p>} {/* Display title error message */}
                <input
                    type="text"
                    className={styles.fileInput}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p className={styles.label}>Image Category</p>
                {categoryError && <p className={styles.errorMessage}>{categoryError}</p>} {/* Display category error message */}
                <select
                    value={selectedTagId}
                    onChange={(e) => setSelectedTagId(e.target.value)}
                    className={styles.fileInput}
                >
                    <option value=""></option>
                    {tags.map(tag => (
                        <option key={tag.tagId} value={tag.tagId}>
                            {tag.tagName}
                        </option>
                    ))}
                </select>
                <p className={styles.label}>Image Description</p>
                {descriptionError && <p className={styles.errorMessage}>{descriptionError}</p>} {/* Display category error message */}
                <textarea
                    className={`${styles.fileInput} ${styles.fileDescription}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {imageSelectedError && <p className={styles.errorMessage}>{imageSelectedError}</p>} {/* Display category error message */}
                <div
                    className={styles.dropzone}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleFileClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className={styles.hiddenInput}
                        onChange={(event) => {
                            setImageSelected(event.target.files[0]);
                        }}
                    />
                    <FontAwesomeIcon icon={faCloudUpload} className={styles.dropzoneIcon} />
                    <span className={styles.dropzoneText}>Drag and Drop Files</span>
                    <span className={styles.dropzoneOr}>or</span>
                </div>
                <div className={styles.rightAlign}>
                    <button className={styles.uploadButton} onClick={uploadImage}>Upload</button>
                </div>
           </div>
        </div>
    );
};

export default ImageUpload;