const jwt = require('jsonwebtoken');

const sign = (uid, userKey) => {
    const out = jwt.sign({u:uid, k:userKey}, 'bunnies', {
        expiresIn: 30,
    });
    return out;
}

/** Generates a string of the input wrapped in HTML <code> tags 
 * 
 * @param {String} str the input string
 * @returns {String} the string wrapped in <code> tags
 */
const code = (str) => {
    return `<code>${str}</code>`
}

/**
 * a callback for a successfully verified token
 * @callback onSuccessCallback
 * @param {String} decoded the decoded token payload
 */

/**
 * a callback for a rejected token
 * @callback onRejectCallback
 * @param {String} decoded the error message
 */

/**
 * verifies an authentication token.
 * 
 * @param {String} token the JWT to verify
 * @param {onSuccessCallback} onsuccess called after successful verification
 * @param {onRejectCallback} onreject called after unsuccessful verfication
 */
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

/**
 * Token authentication middleware for restricted server endpoints.
 * Sends a message on invalid authentication, otherwise continues the response chain.
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {function} next next request handler
 */
const authenticate = (req,res,next) => {
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
    authenticate: authenticate,
}