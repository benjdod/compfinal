const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = async (plaintext) => {
    try {
        return await bcrypt.hash(plaintext, saltRounds,);
    } catch (e) {
        console.error(e);
    }
}

/**
 * Compares a plaintext password with a hash
 * 
 * @param {String} plaintext 
 * @param {String} hash 
 * 
 * @returns {boolean} whether or not the password matched the hash
 */
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