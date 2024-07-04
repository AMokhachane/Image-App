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

  const handleRegister = (event) => {
    event.preventDefault();

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
      <div className={RegisterCSS.wrapper}>
        <div className={RegisterCSS['form-container']}>
          <form onSubmit={handleRegister} className={RegisterCSS['register-form']}>
            <h1>Register Profile</h1>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <label>FullName</label>
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
              <label>EmailAddress</label>
              <input
                type="email"
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
              <label>ConfirmPassword</label>
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
        <div className={RegisterCSS['register-image']}>
        </div>
      </div>
    </div>
  );
};

export default Register;