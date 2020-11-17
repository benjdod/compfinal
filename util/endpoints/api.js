const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');
const LoaderCache = require('../loader');

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

const cache = new LoaderCache();
cache.add('nytcovidcounties', 60*60*8, [], async () => {
    try {
        const data = await axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv')
        const out = data.data.split('\n').map((row,idx) => {
            //if (idx === 0) return;
            const spl = row.split(',')
            if (spl.length === 9) spl.push('');
            return spl;
        })//.filter((row,idx) => idx !== 0)
        
        return out;

    } catch (e) {
        console.error(e);
        return null;
    }
})

cache.add('nytcovidstates', 60*60*8, [], async () => {
    try {
        const data = await axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-states.csv')
        const out = data.data.split('\n').map((row,idx) => {
            const spl = row.split(',')
            if (spl.length === 9) spl.push('');
            return spl;
        })
        return out;

    } catch (e) {
        console.error(e);
        return null;
    }
})

cache.add('censuspops', 60*60*24, [], async () => {
    try {
        const key = '157cc218dfb158478f18c0ce168a6ff40a09d950';
        const query = `https://api.census.gov/data/2019/pep/population?get=POP,NAME&for=county:*&in=state:*&key=${key}`
        const response = await axios.get(query);

        const out = []
        
        out.push([
            'fips',
            'population',
            'county',
            'state'
        ])
        
        response.data.slice(1,response.data.length).forEach((row) => {

            const locs = row[1].split(', ');
            locs[0] = locs[0].replace(/ County$/, '');

            out.push([
                row[2] + row[3],
                parseInt(row[0]),
                locs[0],
                locs[1]
            ]);
        })

        return out.sort((a,b) => a[0] - b[0]);

    } catch (e) {
        console.error(e);
        return null;
    }
})

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
        const block = await axios.get(`https://geo.fcc.gov/api/census/block/find?latitude=${latitude}&longitude=${longitude}&format=json`);
        const targetFips = block.data.County.FIPS;

        if (!targetFips) {
            res.status(400).send('could not get fips data for the provided coordinates. this location is likely not within the U.S.');
        }

        const population = (await cache.get('censuspops')).find(row => row[0] === targetFips)[1];
        const cases = parseInt((await cache.get('nytcovidcounties')).find(row => row[3] === targetFips)[4]);

        res.json({
            fips: targetFips,
            pop: population,
            cases: cases,
        })

    } catch (e) {
        console.error(e);
        res.status(500).send('Error: could not process request');
    }
})

router.all('*', (req,res) => {
    res.status(404).send('<pre>api route not found</pre>');
})

module.exports = router;