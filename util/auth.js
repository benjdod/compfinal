const jwt = require('jsonwebtoken');

exports.sign = (uid) => {
    return jwt.sign({u: uid}, 'bunnies', {expiresIn: 120});
}

exports.verify = (token, onsuccess) => {
    jwt.verify(token, 'bunnies', (err, decoded) => {
        if (err) {
            console.error(err);
            return null;
        } else {
            onsuccess(decoded);
            return decoded;
        }
    });
}