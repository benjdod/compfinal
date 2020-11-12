const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = async (plaintext) => {
    try {
        return await bcrypt.hash(plaintext, saltRounds,);
    } catch (e) {
        console.error(e);
    }
}

const compare = async (plaintext, hash) => {
    try {
        return await bcrypt.compare(plaintext,hash);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    hash: hash,
    compare: compare
}