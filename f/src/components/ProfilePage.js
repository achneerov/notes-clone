import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getEmail = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/getemail', { token });
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    const getPassword = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/getpassword', { token });
        setPassword(response.data.password);
      } catch (error) {
        console.error('Error fetching password:', error);
      }
    };

    getEmail();
    getPassword();
  }, []);

  const handleUpdateEmail = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:4000/api/setemail', { token, email: newEmail });
      setNewEmail(''); // Clear the input field
      refreshData(token);
      console.log('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleUpdatePassword = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:4000/api/setpassword', { token, password: newPassword });
      setNewPassword(''); // Clear the input field
      refreshData(token);
      console.log('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const refreshData = async (token) => {
    try {
      const responseEmail = await axios.post('http://localhost:4000/api/getemail', { token });
      setEmail(responseEmail.data.email);
      const responsePassword = await axios.post('http://localhost:4000/api/getpassword', { token });
      setPassword(responsePassword.data.password);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to your profile</h1>
      <table>
        <tbody>
          <tr>
            <td>Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>{password}</td>
          </tr>
          <tr>
            <td>New Email:</td>
            <td><input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} /></td>
            <td><button onClick={handleUpdateEmail}>Update Email</button></td>
          </tr>
          <tr>
            <td>New Password:</td>
            <td><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></td>
            <td><button onClick={handleUpdatePassword}>Update Password</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
