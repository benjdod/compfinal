const cache = require('./sourcecache')

const fipsToCountyState = (fips, fipsLUT) => {

    const fipsArg = (typeof fips === 'number') 
        ? fips.toString().padStart(5, "0")
        : fips

    const row = fipsLUT.find(row => row[0] === fipsArg);

    if (!row) return null;

    console.log(row);

    return {
        county: row[2],
        state: row[3],
    }
}

module.exports = {
    fipsToCountyState: fipsToCountyState,
}