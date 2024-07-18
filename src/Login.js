import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import LoginCSS from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password
    };

    axios.post('http://localhost:5205/api/account/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Response:', response.data);
      history.push('/Home');
    })
    .catch(error => {
      console.error('Error:', error);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <div className={LoginCSS['login-container']}>
      <div className={LoginCSS.wrapper}>
        <h1>Image Gallery App</h1>
        <h2>Login</h2>
        {error && <div className={LoginCSS.error}>{error.message || error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={LoginCSS['form-group']}>
            <label htmlFor="username">Username</label>
            <div className={LoginCSS.inputBox}>
              <FaUser className={LoginCSS.icon} />
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={LoginCSS['form-group']}>
            <label htmlFor="password">Password</label>
            <div className={LoginCSS.inputBox}>
              <FaLock className={LoginCSS.icon} />
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={LoginCSS['linkContainer']}>
            <a href="/ForgotPassword" className={LoginCSS['forgotPasswordLink']}>
              Forgot Password?
            </a>
          </div>
          <div className={LoginCSS['form-group']}>
            <button type="submit" className={LoginCSS['loginButton']}>
              Log In
            </button>
          </div>
          <div className={LoginCSS['form-group']}>
            <a href="/Register" className={LoginCSS['registerLink']}>
              New to this platform? <span>Register Here</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;