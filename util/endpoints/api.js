const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');
const { calculateRisk } = require('../quiz');

// use the loader cache
const cache = require('../data/sourcecache');
const source = require('../data/sourcemethods');

router.get('/', listRoutes(router));

/*
const cache = {
    countyCovidData: {
        data: null,
        timestamp: null
    },
    countyPops: {
        data: null,
        timestamp: null,
    }
}
*/

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

        const population = (await cache.get('censuspops')).find(row => row[0] === targetFips)[1];
        const cases = parseInt((await cache.get('nytcovidcounties')).find(row => row[3] === targetFips)[4]);

        return {
            fips: targetFips,
            pop: population,
            cases: cases,
        }
    
    } catch (e) {
        console.error(e);
        return null;
    }
}

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

router.get('/censuspops', (req,res) => {
    cache.get('censuspops')
    .then(data => {
        res.json(data);
    })
    .catch(e => {
        console.error(e);
        res.status(500).send('500: could not load resource');
    })
}) 

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
        return out;
    } catch (e) {
        console.error(e);
        res.status(500).send('500: could not fetch data to process request');
    }

})

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

router.get('/statesgeojson', async (req,res) => {

    cache.get('statesgeo_detailed')
    .then(data => {
        
        res.json(data);
    })
    .catch(e => res.status(500).send('500: could not get file'))
})

router.all('*', (req,res) => {
    res.status(404).send('<pre>api route not found</pre>');
})

module.exports = router;