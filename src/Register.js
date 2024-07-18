import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import RegisterCSS from './Register.module.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (/\d/.test(fullName)) {
      setError('Full Name cannot include numeric characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Check if the email already exists
      const emailExistsResponse = await axios.get('http://localhost:5205/api/account/email-exists', {
        params: { email: email }
      });

      if (emailExistsResponse.data) {
        setError('Email already exists');
        return;
      }
      const response = await axios.post('http://localhost:5205/api/account/register', {
        username: fullName,
        emailAddress: email,
        password: password,
        confirmPassword: confirmPassword
      });

      console.log('Response:', response.data);

      history.push('/'); // Redirect to home page after successful registration
    } catch (error) {
      console.error('Error:', error);

      if (error.response && error.response.status === 400) {
        setError('Invalid credentials. Please check your details.');
      } else {
        setError('Email already exists.');
      }
    }
  };

  return (
    <div className={RegisterCSS['register-container']}>
      <div className={RegisterCSS['wrapper']}>
        <div className={RegisterCSS['form-container']}>
          <form onSubmit={handleRegister} className={RegisterCSS['register-form']}>
            <h1>Register Profile</h1>
            {error && <div className={RegisterCSS['error']}>{error}</div>}
            <div className={RegisterCSS['form-group']}>
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
            <div className={RegisterCSS['form-group']}>
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
            <div className={RegisterCSS['form-group']}>
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
            <div className={RegisterCSS['form-group']}>
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
            <button type="submit" className={RegisterCSS['register-btn']}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;