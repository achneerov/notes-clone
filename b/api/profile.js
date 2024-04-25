const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const { jwt_to_userid, jwt_to_email } = require('./jwt_convert');

const router = express.Router();
const db = new sqlite3.Database('../db/general.db');

router.post('/getemail', (req, res) => {
    const token = req.body.token;
    jwt_to_email(token, (err, email) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }
        res.status(200).json({ email: email });
    });
});

router.post('/getpassword', (req, res) => {
    const token = req.body.token;
    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }
        db.get('SELECT password FROM users WHERE id = ?', [user_id], (err, row) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ password: row.password });
        });
    });
});

router.post('/setemail', (req, res) => {
    const token = req.body.token;
    const newEmail = req.body.email;

    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        db.run('UPDATE users SET email = ? WHERE id = ?', [newEmail, user_id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Email updated successfully' });
        });
    });
});

router.post('/setpassword', (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        db.run('UPDATE users SET password = ? WHERE id = ?', [newPassword, user_id], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: 'Password updated successfully' });
        });
    });
});

module.exports = router;
