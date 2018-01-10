const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {
    if (req.path === '/' || req.path === '/auth/signin' || req.method === 'OPTIONS') {
        return next();
    }

    let token = req.headers.authorization || req.query.token;

    if (!token) {
        return res.status(403).send({ error: 'token not provided' });
    }

    token = token.split(' ');

    if (token.length > 1) {
        token = token[1];
    } else {
        token = token[0];
    }

    jwt.verify(token, process.env.KEY_APP, (err, decode) => {
        if (err) {
            // console.log(err.message);
            return res.status(403).send({ error: 'token invalid' });
        }
        req.userId = decode.id;
        return next();
    });
    return true;
};

module.exports = jwtAuth;
