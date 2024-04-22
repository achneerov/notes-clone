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
      <button onClick={handleLogout}>Logout</button>
    );
  }
  else {
    buttonContent = (
      <Link to="/signin">Login</Link>
    );
  }

  return (
    <div className="header">
      <a href="/">Home</a>
      {authenticated && <a href="/notes">Notes</a>}
      {buttonContent}
    </div>
  );
};

export default Header;
