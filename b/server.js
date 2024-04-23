// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./api/auth'); // Assuming this is your existing authRoutes file
const notesRoutes = require('./api/notes'); // Import your new notesRoutes file

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// Use the authentication routes from the auth module
app.use('/api', authRoutes);

// Use the notes routes from the notesRoutes module
app.use('/api', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
