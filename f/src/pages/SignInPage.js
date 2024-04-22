import React from 'react';

const SignInPage = ({ handleSignIn }) => {
  const handleLogin = () => {
    // Add your authentication logic here, e.g., calling an API
    handleSignIn();
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SignInPage;
