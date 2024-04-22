import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import NotesPage from './pages/NotesPage';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, user is authenticated
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={<SignInPage handleSignIn={handleSignIn} />}
        />
        <Route
          path="/notes"
          element={isAuthenticated ? <NotesPage /> : <SignInPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
