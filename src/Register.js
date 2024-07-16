import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import RegisterCSS from './Register.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();

    if (/\d/.test(fullName)) {
      setError('Full Name cannot include numeric characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

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
      history.push('/');
    })
    .catch(error => {
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        setError('Invalid credentials. Please check your details.');
      } else {
        setError('An error occurred. Please try again.');
      }
    });
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
          <div className={RegisterCSS['or']}>or</div>
          <button className={`${RegisterCSS['social-btn']} ${RegisterCSS['google-btn']}`}>
            <FcGoogle className={RegisterCSS['icon']} /> Sign in with Google
          </button>
          <button className={`${RegisterCSS['social-btn']} ${RegisterCSS['facebook-btn']}`}>
            <FaFacebook className={RegisterCSS['icon']} /> Sign in with Facebook
          </button>
        </div>
        </div>
    </div>
  );
};

export default Register;