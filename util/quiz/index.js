
/**
 * 
 * @param {object} data quiz inputs
 * @param {number} useVersion the quiz version to use
 * @returns {object} the reflected data with added 'risk' and 'quizVersion' fields
 */
exports.calculateRisk = (data, useVersion) => {

    const firstVersion = 0; // DO NOT TOUCH THIS!!!!!

    const latestVersion = 0;

    const version = (useVersion === undefined)
        ? latestVersion
        : (useVersion < firstVersion)
            ? firstVersion
            : (useVersion > latestVersion)
                ? latestVersion
                : useVersion
            
    const boxUp = (risk, version) => {
        
        const out = JSON.parse(JSON.stringify(data));
        out.risk = risk;
        out.quizVersion = version;

        return out;
    }

    if (version === 0) {

        /**
         * risk assessor: version 0 (hardcoded population values)
         * @param {Object} data
         * @param {number} data.latitude the user's latitude
         * @param {number} data.longitude the user's longitude
         * @param {number} data.eventSize the size of the event, clamped to 0 and 65535
         * @param {number} data.eventDuration the length of the event in minutes
         * @param {boolean} data.eventOutside whether or not the event is outside
         * @param {boolean} data.maskWearing whether or not masks are worn at the event
         * @param {number} data.maskPercentage the percentage of people wearing masks, clamped to 0 and 1
         * @param {number} data.socialDistancing the number of meters of social distance required, 0 for no distance and clamped between 0 and 15
         */
        const calc = (data) => {
            /*
            Our potential risk assessment equation (Modified Weitz equation):

            e = (1 - (1 - pI)^n) * (1 - m) * 1/O * ((1/2.2) ^ D) * H/120
	
                where:
                n = event size (# of persons)
                pI = I / (Pop);
                    I = active circulating infections in locality
                    Pop = population of locality
                m = 0.65 (mask risk reduction to wearer rate)
                O = 18.7 (indoor risk reduction) (this number should go up with with more people @ event)
                D = social distance in meters
                H = event duration (minutes)
             */

            // TODO: add mask reduction from other people usage
            const infections = 54;
            const population = 200000;
            const pI = infections / population;
            const n = data.eventSize;
            const m = 0.65;
            const D = data.socialDistancing;
            const O = 18.7;
            const H = data.eventDuration

            const weitzFactor = 1 - Math.pow(1 - pI, n);
            const maskWearerFactor = 1 - m;
            const outdoorFactor = 1/O;
            const distancingFactor = Math.pow(1/2.2, D);
            const timeFactor = H/120;

            console.log(`risk factors (v${useVersion}):`, weitzFactor, maskWearerFactor, outdoorFactor, distancingFactor, timeFactor)

            const risk = weitzFactor * maskWearerFactor * outdoorFactor * distancingFactor * timeFactor;
            return risk;
        }

        return boxUp(calc(data), 0);
    }
}