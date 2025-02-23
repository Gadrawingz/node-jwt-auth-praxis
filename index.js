const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();

// Set up global configuration access
dotenv.config();
let PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`App is up and running on http://localhost:${PORT}`);
});