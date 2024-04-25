import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ authenticated, setAuthenticated }) => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const request = { token }; // Create the request object
      console.log('Logout Request:', request); // Log the request object
      await axios.post('http://localhost:4000/api/logout', request); // Send token in req.body
      localStorage.removeItem('token');
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  let buttonContent;
  if (authenticated) {
    buttonContent = (
      <li><button onClick={handleLogout}>Logout</button></li>
    );
  } else {
    buttonContent = (
      <li><Link to="/signin">Login</Link></li>
    );
  }

  return (
    <ul className="header">
      <li><a href="/">Home</a></li>
      <li><a href="/profile">Profile</a></li>
      {authenticated && <li><a href="/notes">Notes</a></li>}
      {buttonContent}
    </ul>
  );
};

export default Header;
