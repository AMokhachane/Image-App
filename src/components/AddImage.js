import React, { useState } from 'react';
import { createImage } from '../imageService';

const AddImage = () => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newImage = { title, url };
        await createImage(newImage);
        setTitle('');
        setUrl('');
    };

    return (
        <div>
            <h1>Add New Image</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">Add Image</button>
            </form>
        </div>
    );
};

export default AddImage;