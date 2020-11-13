const csprng = require('csprng');
const crypto = require('crypto');


const generateUserKey = () => {
    return crypto.pbkdf2Sync(csprng(64,36), 'SALTYPEANuts', 6, 32, 'sha256').toString('base64');
}

const derivePasswordKey = (password) => {
    return crypto.pbkdf2Sync(password, 'MyHumpsMyHumps', 6, 32, 'sha256').toString('base64');
    
}

const encrypt = (str, key) => {

    const iv = Buffer.alloc(16);

    console.log(key);

    const hash = crypto.createHash('sha256').update(key).digest();
    const cypher = crypto.createCipheriv('aes-256-gcm', hash, iv);
    return cypher.update(str, 'binary', 'hex');
}

const decrypt = (encrypted, key) => {

    const iv = Buffer.alloc(16);

    const hash = crypto.createHash('sha256').update(key).digest();
    const decypher = crypto.createDecipheriv('aes-256-gcm', hash, iv);
    return decypher.update(encrypted, 'hex', 'binary');
}

const f = new Float64Array(2);
f[0] = 5.49283;
f[1] = -82.7271

console.log(encrypt(f, generateUserKey()));