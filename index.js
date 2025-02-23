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

// 01. Generating JWT
app.post("/user/generate-token", (req, res) => {
    // A. Validate user here
    // B. Then Generate JWT Token
    let jwtSectetKey = process.env.JWT_SECRET_KEY
    let data = {
        time: Date(),
        userId : 30
    }

    const token  = jwt.sign(data, jwtSectetKey);
    res.send(token)
})

// 02. Verifying/Validating JWT
app.get("/user/verify-token", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
    let tokenHeaderKey = process.env.JWT_HEADER_KEY;
    let jwtSectetKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSectetKey);
        if(verified) {
            // Access Granted
            return res.send("Valid Token: Successfully Verified");
        } else {
            // Access Denied
            // return res.status(401).send("Invalid Token");
            return res.send(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send("Invalid Token");
    }
});