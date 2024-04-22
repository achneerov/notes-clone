import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import SignInPage from './components/SignInPage'; // Import your SigninPage component

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Routes>
        <Route path="/signin" element={<SignInPage setAuthenticated={setAuthenticated} />}/>
        <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
