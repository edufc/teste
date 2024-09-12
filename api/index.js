const express = require('express');
const app = express();

app.use(express.json()); // To parse JSON request bodies

app.set('trust proxy', true); // Trust the proxy to get the correct IPs

// GET method to log and return IP addresses
app.get('/', (req, res) => {
    const ipv4 = req.ip;
    const ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log('IPv4:', ipv4);
    console.log('IPv6:', ipv6);

    res.send({
        message: 'Logged your IP addresses',
        ipv4,
        ipv6
    });
});

// POST method to log, return IP addresses, and echo back the JSON data sent
app.post('/', (req, res) => {
    const ipv4 = req.ip;
    const ipv6 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const data = req.body;

    console.log('IPv4:', ipv4);
    console.log('IPv6:', ipv6);
    console.log('Received data:', data);

    res.status(202).send({
        message: 'Logged your IP addresses and received your data',
        ipv4,
        ipv6,
        data
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
