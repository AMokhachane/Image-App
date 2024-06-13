// Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();
    
    // Add registration logic here
    // For example, sending data to the server and getting a response

    // Assuming registration is successful, redirect to login page
    history.push('/');
  };

  return (
    <div className="register-page">
      
      <form onSubmit={handleRegister}>
      <h1>Register Profile</h1>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            id="Full Name"
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
            id="Email Address"
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
            placeholder="Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;