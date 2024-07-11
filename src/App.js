import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Navbar from './components/Navbar';
import Register from './Register';
import ForgotPasswordRequest from './ForgotPasswordRequest';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import ImageUpload from './components/ImageUpload';

function App() {
  const initialImages = [
    { id: 1, src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSMt9t3G6KLnBjK4cLvbRD70PTZG_a4vrLv-GZaVrfb_YXGRWIc', name: 'If You Cant Butterfly Your Secret', description: 'Thriller' },
    { id: 2, src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSMt9t3G6KLnBjK4cLvbRD70PTZG_a4vrLv-GZaVrfb_YXGRWIc', name: 'Pinky Promise', description: 'Kids fiction' },
    { id: 3, src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSMt9t3G6KLnBjK4cLvbRD70PTZG_a4vrLv-GZaVrfb_YXGRWIc', name: 'Butterfly', description: 'insects that fly and stuff'},
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
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/ForgotPasswordRequest">
              <ForgotPasswordRequest />
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