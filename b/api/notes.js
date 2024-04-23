const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('../db/general.db'); // Connect to your SQLite database

router.post('/getnotes', (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    db.get('SELECT user_id FROM sessions WHERE session_token = ?', [token], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!row) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user_id = row.user_id;

        db.all('SELECT * FROM notes WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ notes: rows });
        });
    });
});


module.exports = router;
