const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./api/auth');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// Use the authentication routes from the auth module
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
