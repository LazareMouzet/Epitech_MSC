var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

router.get('/data', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).json({ data: 'blabalbalabalba' });
    res.status(401).json({ error: 'forbidden' })
});

router.get('/login', (req, res) => {
    let token = generateToken()
    res.status(200).json({ token: token })
})

module.exports = { router: router }