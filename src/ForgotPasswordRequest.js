import React, { useState } from 'react';
import ForgotPasswordRequestCSS from './ForgotPasswordRequest.module.css';
import axios from 'axios';

function ForgotPasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (email) => {
    try {
      const response = await axios.post('http://localhost:5205/api/account/forgot-password', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Response:', response.data);
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Error sending password reset link.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={ForgotPasswordRequestCSS['forgot-password-page']}>
      <div className={ForgotPasswordRequestCSS.wrapper}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className={ForgotPasswordRequestCSS.inputBox}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={ForgotPasswordRequestCSS['form-group']}>
            <button
              type="button"
              className={`${ForgotPasswordRequestCSS['SendResetLinkButton']} ${ForgotPasswordRequestCSS.loginButton}`}
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </button>
          </div>
        </form>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
  }
  
  export default ForgotPasswordRequest;