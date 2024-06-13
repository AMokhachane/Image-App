import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username', username);
    console.log('Password', password);

    // Redirect to the Home page
    history.push('/Home');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Image Gallery App</h2>
        <h2>Log in</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <div className="input-container">
            <FaUser className="icon" />
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <FaLock className="icon" />
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
          <a href="/ForgotPassword" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        <div className="form-group">
          <a href="/Register" className="register-link">
            New to this platform? Register Here
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;