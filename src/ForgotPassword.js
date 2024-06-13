import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const handleForgotPassword = (event) => {
    event.preventDefault();

    // Add forgot password logic here
    // For example, sending a password reset email

    // Assuming the request is successful, redirect to login page
    history.push('/');
  };

  return (
    <div className="forgot-password-page">
      
      <form onSubmit={handleForgotPassword}>
      <h1>Reset Password</h1>
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
            type="text"
            id="Password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="text"
            id="Confirm Password"
            placeholder="Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;