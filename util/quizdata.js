const clamp = (num, low, high) => {
    return (num < low)
        ? low
        : (num > high)
        ? high 
        : num;
}

const validateInputs = (inputs) => {
    if (
        inputs.fips === undefined ||
        inputs.eventSize === undefined ||
        inputs.eventDuration === undefined ||
        inputs.maskWearing === undefined ||
        inputs.maskPercentage === undefined ||
        inputs.userMaskWearing === undefined ||
        inputs.socialDistancing === undefined
    ) {
        return 'missing fields'
    }

    if (typeof inputs.latitude !== 'number') return `invalid latitude type (expected number, saw ${typeof inputs.latitude})`

    if (typeof inputs.longitude !== 'number') return 'invalid longitude type'

    if (inputs.latitude < -90 || inputs.latitude > 90) {
        return 'invalid latitude size'
    }

    if (inputs.longitude < -90 || inputs.longitude > 90) {
        return 'invalid longitude size'
    }

    if (typeof inputs.eventSize !== 'number') return 'invalid eventSize type'
    if (inputs.eventSize < 0 || inputs.eventSize > 65535) return 'invalid eventSize size (range is 0 to 65535)'

    if (typeof inputs.eventDuration !== 'number') return 'invalid eventDuration type'
    if (inputs.eventDuration < 0 || inputs.eventDuration > 4095) return `invalid eventDuration size (range is 0 to 4095, got ${inputs.eventDuration})`

    if (typeof inputs.eventOutside !== 'boolean') return 'invalid eventOutside type'

    if (typeof inputs.maskWearing !== 'boolean') return 'invalid maskWearing type'

    if (typeof inputs.maskPercentage !== 'number') return 'invalid maskPercentage type'
    if (inputs.maskPercentage < 0 || inputs.maskPercentage > 1) return 'invalid maskPercentage type (range is 0 to 1 as decimal percentage)'

    if (typeof inputs.userMaskWearing !== 'boolean') return 'invalid userMaskWearing type'

    if (typeof inputs.socialDistancing !== 'number') return 'invalid socialDistancing type'

    return null;
}

const validateData = (data) => {
    const vi = validateInputs(data);

    if(vi) return vi;

    if (typeof data.risk !== 'number') return 'invalid risk type';
    if (data.risk < 0 || data.risk > 1) return 'invalid risk size (range is decimal 0 to 1)'

    if (typeof data.quizVersion !== 'number') return 'invalid quizVersion type';
    if (data.quizVersion < 0 || data.quizVersion > 35) return 'invalid quizVersion size (range is 0 to 35)'

    return null;
}

const generateFields = (fips, eventSize, eventDuration, eventOutside, maskWearing, maskPercentage, userMaskWearing, socialDistancing, risk, quizVersion) => {
    
    // parses final data form (e.g. fips, risk, and quizVersion, not lat and long)

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
        fips: Math.trunc(clamp(fips, 0, 1679615)),  // trunc to 4 bytes of base36
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
    fields += inputs.fips.toString(36).padStart(4,"0")              // 4 bytes [16-19]
        
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
        fips: parseInt(fields.slice(16,20), 36),
    }
    return out;
}

/**
 * Packages quiz data into a byte array for encryption.
 * 
* @param {Object} data the data object containing quiz questions
 * @param {number} data.fips the fips of the reported location
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

    const fields = generateFields(data.fips, data.eventSize, data.eventDuration, data.eventOutside, data.maskWearing, data.maskPercentage, data.userMaskWearing, data.socialDistancing, data.risk, data.quizVersion)
    
    const ui = Buffer.alloc(32);

    let i = 0, j = 0;

    for (i = 0 ; i < fields.length; i++, j++) {
        ui[j] = fields.charCodeAt(i);
    }

    return new Uint8Array(ui);
}

/**
 * Unpackages a package of decrypted quiz data 
 * 
 * @param {Buffer} pkg the decrypted buffer
 * @returns {Object} data the data object containing quiz questions
 * @return {number} data.fips the fips of the location
 * @returns {number} data.eventSize the size of the event, clamped to 0 and 65535
 * @returns {number} data.eventDuration the length of the event in minutes
 * @returns {String} data.insideOutside location of event, either 'inside' or 'outside'
 * @returns {boolean} data.maskWearing whether or not masks are worn at the event
 * @returns {number} data.maskPercentage the percentage of people wearing masks, clamped to 0 and 1
 * @returns {number} data.risk the risk result, clamped to 0 and 1
 */
const unpackageQuizData = (pkg) => {

    let i = 0; j = 0;

    const stringCC = [];

    for (i = 0; j < pkg.byteLength; i++, j++) {
        if (pkg[j])
            stringCC.push(pkg[j]);
    }

    let fields = String.fromCharCode(...stringCC);

    return parseFields(fields);
}

module.exports = {
    validateInputs: validateInputs,
    validateData: validateData,
    packageQuizData: packageQuizData,
    unpackageQuizData: unpackageQuizData
}

