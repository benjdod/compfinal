const csprng = require('csprng');
const crypto = require('crypto');

/**
 * Generates a cryptographically random constant key for a user
 * 
 * @returns {String} hex representation of the key
 */
const generateUserKey = () => {
    return crypto.pbkdf2Sync(csprng(32,36), '0x43jkefl[aerjd', 15, 32, 'sha256').toString('hex');
}

const derivePasswordKey = (password) => {
    return crypto.pbkdf2Sync(password, '8aefh2889a..efin"qu', 12, 32, 'sha256').toString('base64');
    
}

const encrypt = (data, key) => {

    const iv = Buffer.alloc(16);

    const hash = crypto.createHash('sha256').update(key).digest();
    const cypher = crypto.createCipheriv('aes-256-gcm', hash, iv);
    return cypher.update(data, 'binary', 'hex');
}

const encryptString = (str, key) => {
    encrypt(str,key);
}

const decrypt = (encrypted, key) => {
    const iv = Buffer.alloc(16);

    const hash = crypto.createHash('sha256').update(key).digest();
    const decypher = crypto.createDecipheriv('aes-256-gcm', hash, iv);
    const out = decypher.update(encrypted, 'hex');
    return out;
}

const decryptToString = (encrypted, key) => {
    const b = decrypt(encrypted, key);
    return b.toString('binary');
}

const toFloat64Array = (rawBuffer) => {
    const ui = new Uint8Array(rawBuffer.byteLength);

    for (let i = 0; i < out.length; i++) {
        ui[i] = rawBuffer[i];
    }

    const f = new Float64Array(ui.buffer);
    return f;
}

const clamp = (num, low, high) => {
    return (num < low)
        ? low
        : (num > high)
        ? high 
        : num;
}

/*
const masterKey = generateUserKey();
const userKey = derivePasswordKey('hello');

const quizData = {
    latitude: 32.8239,
    longitude: -12.92343,
    eventSize: 80000,
    eventDuration: 20,
    maskWearing: false,
    maskPercentage: 0,
    insideOutside: 'outside',
    risk: 0.84
}

const packaged = packageQuizData(quizData);

const enc = encrypt(packaged, masterKey);
const dec = decrypt(enc, masterKey);
const unpackaged = unpackageQuizData(dec);

console.log(quizData);
console.log(unpackaged);
*/

module.exports = {
    generateUserKey: generateUserKey,
    derivePasswordKey: derivePasswordKey,
    encrypt: encrypt,
    decrypt: decrypt,
    encryptString: encryptString,
    decryptToString: decryptToString,
    
}