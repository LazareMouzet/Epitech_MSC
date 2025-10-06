var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the API'});
});

router.get('/data', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).json({ data: 'blabalbalabalba' });
});

module.exports = { router: router }