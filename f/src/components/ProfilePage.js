import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
