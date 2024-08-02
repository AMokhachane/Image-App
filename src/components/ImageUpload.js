import React, { useState } from 'react';
import axios from 'axios';
import styles from './ImageUpload.module.css'; // Import the CSS module

const ImageUpload = () => {
    const [imageSelected, setImageSelected] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTagId, setSelectedTagId] = useState("");
    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        try {
            const response = await axios.get("http://localhost:5205/api/tag");
            setTags(response.data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    // Fetch tags when the component mounts
    React.useEffect(() => {
        fetchTags();
    }, []);

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "wywylbfz");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/drgxphf5l/image/upload", formData);
            const imageUrl = response.data.secure_url;
            console.log('Image URL:', imageUrl);

            // Now send this URL to your backend API
            const imagePayload = {
                title: title,
                imageDescription: description,
                url: imageUrl,
                uploadDate: new Date().toISOString().slice(0, 10),
                tagId: selectedTagId,
            };

            await axios.post("http://localhost:5205/api/image", imagePayload);
            console.log('Image data sent to API successfully');
        } catch (error) {
            console.error("Error uploading image or sending data to API:", error);
        }
    };

    return (
        <div className={styles.parentContainer}>
            <div className={styles.box}>
                <div className={styles.rightAlign}>
                    <input
                        type="file"
                        onChange={(event) => {
                            setImageSelected(event.target.files[0]);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        value={selectedTagId}
                        onChange={(e) => setSelectedTagId(e.target.value)}
                    >
                        <option value="">Select Tag</option>
                        {tags.map(tag => (
                            <option key={tag.tagId} value={tag.tagId}>
                                {tag.tagName}
                            </option>
                        ))}
                    </select>
                    <button onClick={uploadImage}>Upload Image</button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;