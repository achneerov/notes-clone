const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

const router = express.Router();
const db = new sqlite3.Database('../general.db'); // Connect to your SQLite database

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Query the database for the username and password
    db.get('SELECT * FROM username_and_password WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (row) {
            // If user exists, generate JWT token
            const token = jwt.sign({ id: row.id, username: row.username }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
