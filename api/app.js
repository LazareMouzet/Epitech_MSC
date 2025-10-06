const express = require('express');
const { generateToken, isAuth } = require('./utils/auth');
const { router } = require('./router');
const app = express();
const port = process.env.PORT || 8000;

app.get('/login', (req, res) => {
    let token = generateToken()
    res.status(200).json({ token: token })
})

app.use('/', isAuth, router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});