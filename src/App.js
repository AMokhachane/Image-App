import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import Navbar from './components/Navbar';
import Register from './Register';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import { Sidebar } from './components/Sidebar';
import Home from './components/Home';
import ImageUpload from './components/ImageUpload';
import ImageDetails from './components/ImageDetails'; // Import the new component

function App() {
  const [images, setImages] = useState(() => {
    const storedImages = localStorage.getItem('images');
    return storedImages ? JSON.parse(storedImages) : []; // Load images from localStorage
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const addImage = ({ url, name, description }) => { // Accept description as a parameter
    const newImage = {
      id: Date.now(), // Use timestamp as a unique ID
      src: url,
      name: name,
      description: description, // Store the description
    };
    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages)); // Save to localStorage
  };

  const deleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages)); // Save updated images to localStorage
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
          <nav>
            <Link to="/Home">Home</Link> | <Link to="/ImageUpload">Image Upload</Link>
          </nav>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/ForgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/ResetPassword">
              <ResetPassword />
            </Route>
            <Route path="/Home">
              <Home images={images} deleteImage={deleteImage} /> {/* Pass deleteImage to Home */}
            </Route>
            <Route path="/ImageUpload">
              <ImageUpload
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                setImagePreviewUrl={setImagePreviewUrl}
                addImage={addImage}
              />
            </Route>
            <Route path="/image/:id">
              <ImageDetails /> {/* Route for ImageDetails */}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;