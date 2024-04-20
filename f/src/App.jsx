import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token); // Store token in localStorage
            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default App;
