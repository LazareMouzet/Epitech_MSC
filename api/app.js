const express = require('express');
const { generateToken, isAuth } = require('./utils/auth');
const { router } = require('./router');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

app.post('/login', (req, res) => {
    email = req.body.email
    password = req.body.password
    try {
        let token = generateToken(email, password)
        res.status(200).json({ token: token })

    } catch (error) {
        res.status(401).json({ error: "wrong credentials" });
    }
})

app.use('/', isAuth, router);

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});