import React, { useState, useEffect } from 'react';
import { getImageById, updateImage } from '../imageService';
import { useParams, useHistory } from 'react-router-dom';

const UpdateImage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const image = await getImageById(id);
            setTitle(image.title);
            setUrl(image.url);
        };

        fetchImage();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedImage = { title, url };
        await updateImage(id, updatedImage);
        history.push('/');
    };

    return (
        <div>
            <h1>Update Image</h1>
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
                <button type="submit">Update Image</button>
            </form>
        </div>
    );
};

export default UpdateImage;