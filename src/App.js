import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Image from './Images';
import Navbar from './Navbar';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import ImageUpload from './components/ImageUpload';
import EmployeeList from './EmployeeList'; // Updated import statement
import ImageList from './components/ImageList';
import AddImage from './components/AddImage';
import UpdateImage from './components/UpdateImage';



function App() {
  const initialImages = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmfCwmsFglOogbOuqSwYBKxuhMP16zGN0luw&s', name: 'If You Cant Bury Your Secret', description: 'Thriller' },
    { id: 2, src: 'https://cdn.kobo.com/book-images/caa5c464-20bd-4f7d-a104-027a60657683/353/569/90/False/amanda-commander-the-pinky-promise-1.jpg', name: 'Pinky Promise', description: 'Kids fiction' },
    { id: 3, src: 'https://cdn.kobo.com/book-images/b56e00ef-6ebf-4f33-ab4f-2dc9df8fd046/353/569/90/False/the-wife-s-secret-2.jpg', name: 'The Wife\'s Secret', description: 'Adult fiction' },
  ];

  const [images, setImages] = useState(initialImages);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/ImageList">
              <ImageList />
            </Route>
            <Route exact path="/add">
              <AddImage />
            </Route>
            <Route exact path="/update/:idd">
              <AddImage />
            </Route>
            <Route exact path="/EmployeeList">
              <UpdateImage />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/ForgotPassword">
              <ForgotPassword />
            </Route>
            <Route path="/Image">
              <Image />
            </Route>
            <Route path="/Home">
              <Home images={images} />
            </Route>
            <Route path="/ImageUpload">
              <ImageUpload images={images} setImages={setImages} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;