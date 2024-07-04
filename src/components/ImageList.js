import React, { useState, useEffect } from 'react';
import { getAllImages, deleteImage } from '../imageService';

const ImageList = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getAllImages();
            setImages(result);
        };

        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        await deleteImage(id);
        setImages(images.filter((image) => image.imageId !== id));
    };

    return (
        <div>
            <h1>Image List</h1>
            <ul>
                {images.map((image) => (
                    <li key={image.imageId}>
                        <img src={image.url} alt={image.title} />
                        <p>{image.title}</p>
                        <button onClick={() => handleDelete(image.imageId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageList;