import React, { useState } from 'react';
import axios from 'axios';

const SignInPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuthenticated(true); // Call setAuthenticated from props
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="signinpage">
      <h2>Sign In</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SignInPage;
