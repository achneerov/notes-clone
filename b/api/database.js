const express = require('express');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('../db/general.db'); // Connect to your SQLite database

router.post('/getnotes', (req, res) => {
    username = jwt_to_username(req.body.token);
    if (username instanceof Error) {
        res.status(username.status).json({ message: username.message });
        return;
    } else {
        const select = 'SELECT note FROM notes WHERE user_id = (SELECT id FROM users WHERE username = ?)';
        db.all(select, [username], (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            } else {
                res.json({ notes: rows });
            }
        });
    }
});

jwt_to_username = (token, callback) => {
    const select = 'SELECT username FROM users WHERE id = (SELECT user_id FROM sessions WHERE session_token = ?)';
    db.get(select, [token], (err, row) => {
        if (err) {
            console.error(err);
            callback({ status: 500, message: 'Internal server error' });
        } else if (row) {
            callback(null, row.username);
        } else {
            callback({ status: 401, message: 'Invalid token' });
        }
    });
};

module.exports = { router, jwt_to_username }; // Export the router and jwt_to_username function
