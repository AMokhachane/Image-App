import React, { useState} from 'react';
import './Image.css';

function Image() {
  const initialImages = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfCwmsFglOogbOuqSwYBKxuhMP16zGN0luw&s', name: 'If You Cant Bury Your Secret', description: 'Thriller' },
    { id: 2, src: 'https://cdn.kobo.com/book-images/caa5c464-20bd-4f7d-a104-027a60657683/353/569/90/False/amanda-commander-the-pinky-promise-1.jpg', name: 'Pinky Promise', description: 'Kids fiction' },
    { id: 3, src: 'https://cdn.kobo.com/book-images/fa169d16-f8f6-4fc6-b35a-b9efd8114be9/180/1000/False/it-s-not-prostitution-when-happening-in-club-x.jpg', name: 'Club X', description: 'Adult fiction' },
  ];

  const [images, setImages] = useState(initialImages);
  const [nextId, setNextId] = useState(10);

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddImage = () => {
    if (url) {
      const newImage = {
        id: nextId,
        src: url,
        name: name || `Image ${nextId}`,
        description: description || `Description for Image ${nextId}`
      };
      setImages([...images, newImage]);
      setNextId(nextId + 1);
      setUrl('');
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>BOOK COVERS</h1>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
        />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter image name"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter image description"
        />
        <button onClick={handleAddImage}>Add Image</button>
        <div className="image-grid">
          {images.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.src} alt={image.name} />
              <h2 className="name">{image.name}</h2>
              <p className="description">{image.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Image;