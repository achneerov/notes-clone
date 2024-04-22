const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('../general.db'); // Connect to your SQLite database

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check username and password
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (row) {
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

// Logout endpoint
router.post('/logout', (req, res) => {
    const { token } = req.body;
    console.log('Token:', token)

    // Convert token to username
    const username = getTokenUsername(token);

    if (!username) {
        return res.status(400).json({ message: 'Invalid token' });
    }

    // Remove all sessions for the specified user
    db.run('DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE username = ?)', [username], function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (this.changes === 0) {
            res.status(404).json({ message: 'No active sessions found for this user' });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

// Function to get username from token
function getTokenUsername(token) {
    // Query the sessions table to find the user_id associated with the token
    const sessionQuery = 'SELECT user_id FROM sessions WHERE session_token = ?';

    db.get(sessionQuery, [token], (err, row) => {
        if (err) {
            console.error('Error querying sessions table:', err);
            return null;
        }

        if (!row) {
            console.error('Token not found in sessions table');
            return null;
        }

        const userId = row.user_id;

        // Query the users table to fetch the username based on user_id
        const userQuery = 'SELECT username FROM users WHERE id = ?';

        db.get(userQuery, [userId], (err, userRow) => {
            if (err) {
                console.error('Error querying users table:', err);
                return null;
            }

            if (!userRow) {
                console.error('User not found in users table');
                return null;
            }

            const username = userRow.username;
            return username;
        });
    });
}



module.exports = router;
