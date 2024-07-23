import React, { useState } from 'react';
import axios from 'axios';
import ResetCSS from './ResetPassword.module.css'; // Import the CSS module

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        try {
            const response = await axios.post('http://localhost:5205/api/account/ResetPasswordByEmail', {
                Email: email,
                NewPassword: newPassword
            });

            setMessage(response.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('An error occurred. Please try again later.');
            }
            setMessage('');
        }
    };

    return (
        <div className={ResetCSS['register-container']}>
          <div className={ResetCSS['wrapper']}>
            <div className={ResetCSS['form-container']}>
              <form onSubmit={handleSubmit} className={ResetCSS['register-form']}>
                <h1>Reset Password</h1>
                {error && <div className={ResetCSS['error']}>{error}</div>}
                <div className={ResetCSS['form-group']}>
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
                <div className={ResetCSS['form-group']}>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    placeholder="Enter new Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={ResetCSS['form-group']}>
              <label>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

                <button type="submit" className={ResetCSS['register-btn']}>Reset password</button>
              </form>
              {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      );
    };

export default ResetPassword;