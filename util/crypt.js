const csprng = require('csprng');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

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

const generateFields = (eventSize, eventDuration, eventOutside, maskWearing, maskPercentage, userMaskWearing, socialDistancing, risk, quizVersion) => {
    const inputs = {
        eventSize: Math.abs(Math.trunc(clamp(eventSize, 0, 65535))),
        eventOutside: eventOutside ? true : false,
        maskWearing: maskWearing ? true : false,
        maskPercentage: Math.trunc(clamp(maskPercentage, 0, 1) * 100),
        userMaskWearing: userMaskWearing ? true : false,
        eventDuration: Math.trunc(clamp(eventDuration, 0, 4095)),
        socialDistancing: Math.trunc(clamp(socialDistancing, 0, 15)),
        risk: Math.trunc(clamp(risk,0,1) * 100),
        quizVersion: Math.trunc(clamp(quizVersion,0,35)),
    }

    let fields = ''
    fields += inputs.eventSize.toString(16).padStart(4, "0");       // 4 bytes  [0 - 3]
    fields += inputs.eventOutside ? 't' : 'f'                       // 1 byte   [4]
    fields += maskWearing ? 't' : 'f'                               // 1 byte   [5]
    fields += inputs.maskPercentage.toString(16).padStart(2, "0")   // 2 bytes  [6-7]
    fields += inputs.userMaskWearing ? 't' : 'f'                    // 1 byte   [8]
    fields += inputs.eventDuration.toString(16).padStart(3, "0")    // 3 bytes  [9-11]
    fields += inputs.socialDistancing.toString(16).padStart(1,"0")  // 1 bytes  [12]
    fields += inputs.risk.toString(16).padStart(2, "0")             // 2 bytes  [13-14]
    fields += inputs.quizVersion.toString(36).padStart(1,"0")       // 1 bytes  [15]
        
    return fields;
}

const parseFields = (fields) => {

    const out = {
        eventSize: parseInt(fields.slice(0,4),16),
        eventOutside: fields.charAt(4) === 't' ? true : false,
        maskWearing: fields.charAt(5) === 't' ? true : false,
        maskPercentage: parseInt(fields.slice(6,8), 16) / 100,
        userMaskWearing: fields.charAt(8) === 't' ? true : false,
        eventDuration: parseInt(fields.slice(9,12),16),
        socialDistancing: parseInt(fields.slice(12,13),16),
        risk: parseInt(fields.slice(13,15),16) / 100,
        quizVersion: parseInt(fields.charAt(15), 36),
    }
    return out;
}


// TODO: add social distancing field (0 if no distancing, 1-16 for values);
/**
 * 
 * @typedef {Object} QuizData 
 * @property {number} QuizData.eventSize the size of the event, clamped to 0 and 65535
 * @property {number} QuizData.eventDuration the length of the event in minutes
 * @property {String} QuizData.insideOutside location of event, either 'inside' or 'outside'
 * @property {boolean} QuizData.maskWearing whether or not masks are worn at the event
 * @property {number} QuizData.maskPercentage the percentage of people wearing masks, clamped to 0 and 1
 * @property {number} QuizData.risk the risk result, clamped to 0 and 1
 */

/**
 * Packages quiz data into a byte array for encryption.
 * 
* @param {Object} data the data object containing quiz questions
 * @param {number} data.latitude the user's latitude
 * @param {number} data.longitude the user's longitude
 * @param {number} data.eventSize the size of the event, clamped to 0 and 65535
 * @param {number} data.eventDuration the length of the event in minutes
 * @param {boolean} data.eventOutside whether or not the event is outside
 * @param {boolean} data.maskWearing whether or not masks are worn at the event
 * @param {number} data.maskPercentage the percentage of people wearing masks, clamped to 0 and 1
 * @param {boolean} data.userMaskWearing the percentage of people wearing masks, clamped to 0 and 1
 * @param {number} data.socialDistancing the number of meters of social distance required, 0 for no distance and clamped between 0 and 15
 * @param {number} data.risk the risk result, clamped to 0 and 1
 * @param {number} data.quizVersion the version of the algorithm used to generate the risk result
 * @returns {Uint8Array} the package as a byte array, the intended form for encryption
 */
const packageQuizData = (data) => {

    const fields = generateFields(data.eventSize, data.eventDuration, data.eventOutside, data.maskWearing, data.maskPercentage, data.userMaskWearing, data.socialDistancing, data.risk, data.quizVersion)

    const f = new Float64Array(2);
    f[0] = data.latitude;
    f[1] = data.longitude;

    const fB = new Uint8Array(f.buffer);

    const ui = Buffer.alloc(32);
    
    let i = 0, j = 0;

    for ( i = 0; i < f.buffer.byteLength; i++, j++) {
        ui[j] = fB[i];
    }

    for (i = 0 ; i < fields.length; i++, j++) {
        ui[j] = fields.charCodeAt(i);
    }

    return new Uint8Array(ui);
}

/**
 * Unpackages a package of decrypted quiz data 
 * 
 * @param {Buffer} package the decrypted buffer
 * @returns {Object} data the data object containing quiz questions
 * @returns {number} data.eventSize the size of the event, clamped to 0 and 65535
 * @returns {number} data.eventDuration the length of the event in minutes
 * @returns {String} data.insideOutside location of event, either 'inside' or 'outside'
 * @returns {boolean} data.maskWearing whether or not masks are worn at the event
 * @returns {number} data.maskPercentage the percentage of people wearing masks, clamped to 0 and 1
 * @returns {number} data.risk the risk result, clamped to 0 and 1
 */
const unpackageQuizData = (package) => {
    const b = new Uint8Array(16);

    let i = 0; j = 0;

    for ( i = 0; i < 16; i++, j++) {
        b[i] = package[j];
    }

    const f = new Float64Array(b.buffer);

    const stringCC = [];

    for (i = 0; j < package.byteLength; i++, j++) {
        if (package[j])
            stringCC.push(package[j]);
    }

    let fields = String.fromCharCode(...stringCC);

    return {   
        latitude: f[0],
        longitude: f[1],
        ...parseFields(fields),
    }
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
    packageQuizData: packageQuizData,
    unpackageQuizData: unpackageQuizData
}