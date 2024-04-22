import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ authenticated, setAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
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
