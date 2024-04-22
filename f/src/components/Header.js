import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, handleSignOut }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button onClick={handleSignOut}>Logout</button>
            ) : (
              <Link to="/signin">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
