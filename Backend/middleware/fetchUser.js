const jwt = require('jsonwebtoken');
const JWT_SECRET = 'NodejsReact';

const fetchUser = (req, res, next) => {

    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "error1: Use a valid token to authenticate" })
    }

    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "error2: Use a valid token to authenticate" })
    }
}

module.exports = fetchUser;