import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ResetPasswordCSS from './ResetPassword.module.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        alert('Password reset successfully');
        history.push('/login');
      } else {
        alert('Error resetting password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error resetting password');
    }
  };

  return (
    <div className={ResetPasswordCSS['reset-password-container']}>
      <div className={ResetPasswordCSS.wrapper}>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
		<div className={ResetPasswordCSS.inputBox}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className={ResetPasswordCSS.inputBox}>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <div className={ResetPasswordCSS['form-group']}>
            <button type="button" className={`${ResetPasswordCSS['reset-button']} ${ResetPasswordCSS.resetButton}`} onClick={handleSubmit}>
              Reset Password
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;