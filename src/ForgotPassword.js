import React, { useState } from 'react';
import axios from 'axios';
import ForgotPasswordCSS from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5205/api/account/ForgotPassword', { email });
      setMessage(response.data); // Assuming your API returns a message string
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send password reset email. Please try again later.');
    }
  };

  return (
    <div className={ForgotPasswordCSS['forgot-password-container']}>
      <div className={ForgotPasswordCSS['wrapper']}>
        <div className={ForgotPasswordCSS['form-container']}>
          <form onSubmit={handleForgotPassword} className={ForgotPasswordCSS['forgot-password-form']}>
            <h1>Forgot Password</h1>
            {error && <div className={ForgotPasswordCSS['error']}>{error}</div>}
            {message && <div className={ForgotPasswordCSS['message']}>{message}</div>}
            <div className={ForgotPasswordCSS['form-group']}>
              <label>Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={ForgotPasswordCSS['forgot-password-btn']}>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;