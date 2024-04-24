const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const { jwt_to_userid, jwt_to_username } = require('./jwt_convert');


const router = express.Router();
const db = new sqlite3.Database('../db/general.db');

router.post('/getnotes', (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        db.all('SELECT * FROM notes WHERE user_id = ?', [user_id], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ notes: rows });
        });
    });
});
module.exports = router;
