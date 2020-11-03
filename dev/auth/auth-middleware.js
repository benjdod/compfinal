const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // req.cookies is populated by the cookie parser middleware in the server file
    // if this stops working, first look there to make sure the cookie parser is still
    // doing its job right.

    if (req.cookies.user_token) {
        jwt.verify(req.cookies.user_token, 'bunnies', (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.status(401).send('Your authentication token is expired. Please visit <a href="/cookie"><code>/cookie</code></a> again to get a new one.<br>')
                } else if (err.name === 'JsonWebTokenError') {
                    res.status(401).send('Your authentication token is invalid. Please visit <a href="/cookie"><code>/cookie</code></a> again to get a new one.<br>'+`<code>${err.message}</code>`);
                }
                // console.error(err);
                return;
            } else {
                console.log(decoded)
                next();
            }
        })
    } else {
        // if we've made it here, it's an invalid authentication
        res.status(401).send('Bad authentication!');
    }
        

}