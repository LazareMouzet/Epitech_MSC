const jwt = require('jsonwebtoken');
const secretkey = process.env.JWT_SECRET_KEY

function generateToken() {
    return jwt.sign({ name: 'Doe', surname: 'John' }, secretkey)
}

async function isAuth(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''

    try {
        decoded = jwt.verify(b64auth, secretkey);
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Credentials", "include")
        res.setHeader("Access-Control-Allow-Credentials", true)
        next();
        return;
    } catch (error) {
        console.log("Err jwt", error);
        res.status(401).json({ message: 'access denied' })
        res.end()
        return;
    }

}

module.exports = { isAuth, generateToken };