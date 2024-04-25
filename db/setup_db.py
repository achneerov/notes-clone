import sqlite3

# SQLite database file path
db_file = 'general.db'

# Connect to the database or create if it doesn't exist
conn = sqlite3.connect(db_file)
cursor = conn.cursor()

# Create the users table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    );
''')

# Create the sessions table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE REFERENCES users(id),
        session_token TEXT
    );
''')

# Create the notes table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        note TEXT
    );
''')

# Insert sample data into the users table
cursor.execute("INSERT INTO users (email, password) VALUES ('user1@gmail.com', 'password1')")
cursor.execute("INSERT INTO users (email, password) VALUES ('user2@gmail.com', 'password2')")

# Insert sample notes data
cursor.execute("INSERT INTO notes (user_id, note) VALUES (1, 'This is a note for user1')")
cursor.execute("INSERT INTO notes (user_id, note) VALUES (2, 'This is a note for user2')")
cursor.execute("INSERT INTO notes (user_id, note) VALUES (1, 'This is another note for user1')")


# Commit changes and close the connection
conn.commit()
conn.close()

print('Database setup completed.')
