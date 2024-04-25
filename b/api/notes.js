const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const { jwt_to_userid } = require('./jwt_convert');


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

router.post('/addnote', (req, res) => {
    const token = req.body.token;
    const note = req.body.note;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    if (!note) {
        return res.status(400).json({ message: 'Note not provided' });
    }

    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        db.run('INSERT INTO notes (user_id, note) VALUES (?, ?)', [user_id, note], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ message: 'Note added' });
        });
    });
});

router.post('/deletenote', (req, res) => {
    const token = req.body.token;
    const noteId = req.body.noteId;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    if (!noteId) {
        return res.status(400).json({ message: 'Note ID not provided' });
    }

    jwt_to_userid(token, (err, user_id) => {
        if (err) {
            return res.status(401).json({ message: err.message });
        }

        db.run('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, user_id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ message: 'Note deleted' });
        });
    });
});



module.exports = router;
