import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import NotesPage from './pages/NotesPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    // You can add logic here to clear any authentication tokens or data
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