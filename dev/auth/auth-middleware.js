const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // req.cookies is populated by the cookie parser middleware in the server file
    // if this stops working, first look there to make sure the cookie parser is still
    // doing its job right.

    try {
        if (req.cookies.authcookie && req.cookies.authcookie === 'bunnies')
            next();
        else {
            res.send('invalid authentication!');
        }
    } catch (e) {
        console.error(e);
        res.send('bad authentication. Check the console for details');
    }
    
}