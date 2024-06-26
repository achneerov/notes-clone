const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../db/general.db');

function jwt_to_userid(token, callback) {
    db.get('SELECT user_id FROM sessions WHERE session_token = ?', [token], (err, row) => {
        if (err) {
            return callback(err, null);
        }

        if (!row) {
            return callback({ message: 'Invalid token' }, null);
        }

        callback(null, row.user_id);
    });
}

function jwt_to_email(token, callback) {
    jwt_to_userid(token, (err, userid) => {
        if (err) {
            return callback(err, null);
        }

        db.get('SELECT email FROM users WHERE id = ?', [userid], (err, row) => {
            if (err) {
                return callback(err, null);
            }

            callback(null, row.email);
        });
    });
}

module.exports = { jwt_to_userid, jwt_to_email };
