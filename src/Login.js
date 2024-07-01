import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password
    };

    axios.post('http://localhost:5205/api/account/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response:', response.data);
      // Assuming login is successful, redirect to home page
      history.push('/Home');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle login errors here
      if (error.response) {
        setError(error.response.data); // Set error message from server
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="login-container">
      <form>
        <h2>Image Gallery App</h2>
        <h2>Log in</h2>
        {error && <div className="error">{error.message || error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <FaLock className="icon" />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <a href="/ForgotPassword" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleSubmit}>Log In</button>
        </div>
        <div className="form-group">
          <a href="/Register" className="register-link">
            New to this platform? Register Here
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;