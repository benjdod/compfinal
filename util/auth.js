const jwt = require('jsonwebtoken');

const sign = (uid) => {
    return jwt.sign({u: uid}, 'bunnies', {expiresIn: 10000});
}

const verify = (token, onsuccess, onreject) => {

    let success = false;
    jwt.verify(token, 'bunnies', (err, decoded) => {
        if (err) {
            console.error(err);
            return null;
        } else {
            onsuccess(decoded);
            success = true;
            return decoded;
        }
    });

    if (!success)
        onreject();
}

const middleware = (req,res,next) => {

    const noAuth = () => {
        res.status(401).send(null);
    }

    if (req.cookies['auth_token']) {
        verify(req.cookies.auth_token, (decoded) => {
            req.jwtPayload = JSON.parse(JSON.stringify(decoded));
            next();
        }, noAuth)
    }
    
}

module.exports = {
    sign: sign,
    verify: verify,
    middleware: middleware
}