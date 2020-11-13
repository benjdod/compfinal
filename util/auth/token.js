const jwt = require('jsonwebtoken');

const sign = (uid, userKey) => {
    return jwt.sign({u: uid, k: userKey}, 'bunnies', {expiresIn: 10000});
}

/** Generates a string of the input wrapped in HTML <code> tags 
 * 
 * @param {String} str the input string
 * @returns {String} the string wrapped in <code> tags
 */
const code = (str) => {
    return `<code>${str}</code>`
}

const verify = (token, onsuccess, onreject) => {

    jwt.verify(token, 'bunnies', (err, decoded) => {
        if (err) {
            console.error(err);
            switch (err.name) {
                case 'TokenExpiredError':
                    onreject(code('token expired'));
                    break;
                case 'JsonWebTokenError':
                    onreject(`token error: ${code(err.message)}`);
                    break;
                case 'NotBeforeError':
                    onreject(code('token not active yet'));
                    break;
                default:
                    onreject(code('token error'));
                    break;
            }
            return null;
        } else {
            onsuccess(decoded);
            return decoded;
        }
    });
}

const verifyMiddleware = (req,res,next) => {

    if (req.cookies['auth_token']) {
        verify(req.cookies.auth_token, (decoded) => {
            req.jwtPayload = JSON.parse(JSON.stringify(decoded));
            next();
        }, (err) => {
            res.status(401).send(err);
        })
    } else {
        res.status(401).send('no credentials provided');
    }
    
}

module.exports = {
    sign: sign,
    verify: verify,
    verifyMiddleware: verifyMiddleware,
}