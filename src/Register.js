
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();
    
    const data = {
      username: fullName,
      emailAddress: email,
      password: password,
      confirmPassword: confirmPassword
    };

    axios.post('http://localhost:5205/api/account/register', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response:', response.data);
      // Assuming registration is successful, redirect to login page
      history.push('/');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle registration errors here
      if (error.response) {
        setError(error.response.data); // Set error message from server
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister}>
        <h1>Register Profile</h1>
        {error && <div className="error">{error.message || error}</div>}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Register;
