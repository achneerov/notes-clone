const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('../general.db'); // Connect to your SQLite database

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check username and password
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (row) {
            // Delete existing sessions
            db.run('DELETE FROM sessions WHERE user_id = ?', [row.id], err => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                }
            });
            // Generate token
            const token = jwt.sign({ username: row.username }, 'secret_key');
            
            // Add token to sessions table
            db.run('INSERT INTO sessions (user_id, session_token) VALUES (?, ?)', [row.id, token], err => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    res.json({ token });
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    console.log('Token:', token);

    // Delete rows with matching token
    db.run('DELETE FROM sessions WHERE session_token = ?', [token], function(err) {
        if (err) {
            console.error('Error deleting sessions:', err.message);
            res.status(500).send('Error logging out');
        } else {
            console.log(`Deleted ${this.changes} session(s) with token: ${token}`);
            res.status(200).send('Logged out successfully');
        }
    });
});




module.exports = router;
