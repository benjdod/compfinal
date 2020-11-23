const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');
const { calculateRisk } = require('../quiz');

// use the loader cache
const cache = require('../data/sourcecache');
const source = require('../data/sourcemethods');

// lists api routes and available methods.
router.get('/', listRoutes(router));

// don't document, helper function.
const qll = async (latitude, longitude) => {

    const bad = (
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
    ) || false;

    if (bad) {
        return null;
    }

    try {
        const block = await axios.get(`https://geo.fcc.gov/api/census/block/find?latitude=${latitude}&longitude=${longitude}&format=json`);
        const targetFips = block.data.County.FIPS;

        if (!targetFips) {
            return null;
        }

        const censuspops = await cache.get('censuspops')

        const censuspopsRow = censuspops.find(row => row[0] === targetFips);
        const population = censuspopsRow[1];
        const county = censuspopsRow[2];
        const state = censuspopsRow[3];
        const cases = parseInt((await cache.get('nytcovidcounties')).find(row => row[3] === targetFips)[4]);

        return {
            fips: targetFips,
            county: county,
            state: state,
            pop: population,
            cases: cases,
        }
    
    } catch (e) {
        console.error(e);
        return null;
    }
}

// NOTE: ALL THESE RETURN JSON DATA

// gets nyt covid current case data by county
router.get('/countydata', (req,res) => {
    cache.get('nytcovidcounties')
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            console.error(e);
            res.status(500).send('500: could not load resource');
        })
})

// gets nyt covid current case data by state
router.get('/statedata', (req,res) => {
    cache.get('nytcovidstates')
    .then(data => {
        res.json(data);
    })
    .catch(e => {
        console.error(e);
        res.status(500).send('500: could not load resource');
    })
})

// gets populations of each us county. Try it out!
router.get('/countypops', (req,res) => {
    cache.get('censuspops')
    .then(data => {
        res.json(data);
    })
    .catch(e => {
        console.error(e);
        res.status(500).send('500: could not load resource');
    })
}) 

// gets populations of each us state.
router.get('/statepops', (req,res) => {
    cache.get('statepops')
    .then(data => {
        res.json(data);
    })
    .catch(e => {
        console.error(e);
        res.status(500).send('500: could not load resource');
    })
}) 

router.get('/statehistory/:fips', async (req,res) => {
    try {
        const allHistory = await cache.get('covidstateshistory');
        const targetHistory = allHistory[req.params.fips.toString().padStart(2,"0")]
        if (!targetHistory) {
            res.status(404).send('404: could not find state with provided fips code');
            return;
        }
        res.json(targetHistory)
    } catch (e) {
        console.error(e);
        res.status(500).send('500: failed to get resource');
    }
})

router.get('/statecurrent', (req,res) => {
    cache.get('statecurrent')
    .then(data => res.json(data))
    .catch(e => {
        console.error(e);
        res.status(500).send('500: could not load resource');
    })
})

// query us info (state, county, fips, etc.) of a url-encoded latitude and longitude
router.get('/querylatlon', async (req,res) => {

    const latitude = parseFloat(req.query.lat);
    const longitude = parseFloat(req.query.lon);

    const bad = (
        req.query.lat === undefined || req.query.lon === undefined ||
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
    ) || false;

    if (bad) {
        res.status(400).send(`bad request: must include valid 'lat' and 'lon' fields in url parameters (e.g. ?lat=34.585&lon=-79.012)`);
        return;
    }

    try {
        out = await qll(latitude, longitude);
        if (out)
            res.json(out);
        else 
            res.status(406).send('bad request: provided coordinates are outside the continental U.S.');
    } catch (e) {
        console.error(e);
        res.status(500).send('500: could not fetch data to process request');
    }

})

// calculates a risk number given a json object of input data
// (check quizzard to see the structure of the object as provided
// to this endpoint, as that's the only thing that uses it.)
router.post('/calculaterisk', async (req,res) => {

    const b = req.body;

    let fipscases = null;
    let countyState = null;

    try {
        fipscases = await qll(req.body.latitude, req.body.longitude);
        const fipsLUT = await cache.get('censuspops');
        countyState = source.fipsToCountyState(fipscases.fips, fipsLUT);
    } catch (e) {
        console.error(e);
        res.status(500).send('500: could not source data to calculate risk');
        return;
    }

    const calcInputs = req.body;
    calcInputs.latitude = undefined;
    calcInputs.longitude = undefined;
    calcInputs.population = fipscases.pop;
    calcInputs.cases = fipscases.cases;

    const risk = calculateRisk(calcInputs);
    risk.fips = fipscases.fips;

    const out = {
        ...risk,
        ...countyState,
        timestamp: Date.now(),
    }

    console.log('api serving risk result: ', out);

    res.json(out);
})

// returns a geojson file of us states, no added information
router.get('/statesgeojson-base', async (req,res) => {

    cache.get('statesgeo_base')
    .then(data => {
        res.json(data);
    })
    .catch(e => res.status(500).send('500: could not get file'))
})

router.get('/overlay/deltas', async (req,res) => {
    try {
        const out = await cache.get('covid_deltas');
        res.json(out);
    } catch (e) {
        console.error(e);
        res.status(500).send('{"error": "500: could not fetch resource"}');
    }
})

// don't document, it's a catchall for bad routes.
router.all('*', (req,res) => {
    res.status(404).send('<pre>api route not found</pre>');
})

module.exports = router;