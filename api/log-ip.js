const express = require('express');
const app = express();

app.use(express.json()); // To parse JSON request bodies

app.set('trust proxy', true); // Trust the proxy to get the correct IPs

app.get('/', (req, res) => {
    const ipv4 = req.ip;
    const ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.json({
        message: 'Logged your IP addresses',
        ipv4,
        ipv6
    });
});

app.post('/', (req, res) => {
    const ipv4 = req.ip;
    const ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const data = req.body;

    res.json({
        message: 'Logged your IP addresses and received your data',
        ipv4,
        ipv6,
        data
    });
});

// Export the app as a Vercel function
module.exports = app;
