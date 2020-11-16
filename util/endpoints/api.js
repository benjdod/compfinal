const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');

router.get('/', listRoutes(router));

const cache = {
    countyData: {
        data: null,
        timestamp: null
    },
    countyPops: {
        data: null,
        timestamp: null,
    }
}

router.get('/ping', (req,res) => {
    res.send(`${cache.countyData.data.length}, ${cache.countyPops.data.length}`)
})

router.get('/countydata', (req,res) => {

    if (cache.countyData.data) {

        const currentTime = Date.now();

        // if our data is more than half a day old, refresh it!
        if ((currentTime - cache.countyData.timestamp)/1000 < 60*60*24) {
            console.log(`serving copy of data since it's only ${(currentTime - cache.countyData.timestamp) / 1000} seconds old`, );
            res.json(cache.countyData.data)
            return;
        }            
        
    }

    console.log('fetching new county data and serving');

    axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv')
        .then(data => {
            const out = data.data.split('\n').map((row,idx) => {
                //if (idx === 0) return;
                const spl = row.split(',')
                if (spl.length === 9) spl.push('');
                return spl;
            })//.filter((row,idx) => idx !== 0)
            cache.countyData.data = out;
            cache.countyData.timestamp = Date.now();
            res.json(cache.countyData.data)
        })
        .catch(e => {
            console.error(e);
            res.status(500).send('500: server error');
        })
})

router.get('/populationcases', (req,res) => {
    const key = '157cc218dfb158478f18c0ce168a6ff40a09d950';
    const query = `https://api.census.gov/data/2019/pep/population?get=POP,NAME&for=county:*&in=state:*&key=${key}`

    if (cache.countyPops.data) {

        const currentTime = Date.now();

        if ((currentTime - cache.countyPops.timestamp)/1000 < 60*60*24) {
            console.log(`serving copy of data since it's only ${(currentTime - cache.countyPops.timestamp) / 1000} seconds old`, );
            res.json(cache.countyPops.data)
            return;
        }  
    }

    axios.get(query)
    .then(response => {

        const out = []

        out.push(['population', 'county', 'state', 'fips'])

        response.data.forEach((row,idx) => {

            if (idx === 0) return;

            const locs = row[1].split(', ');

            const fipsString = row[2] + row[3];


            const newRow = [
                parseInt(row[0]),   // population as an integer
                locs[0],            // county name
                locs[1],            // state name
                fipsString
            ]

            out.push(newRow);
        })

        const sorted = out.sort((a,b) => a[3] - b[3])

        cache.countyPops.data = sorted;
        cache.countyPops.timestamp = Date.now();

        res.json(cache.countyPops.data);
    })
    .catch(e => {
        console.error(e);
        res.status(500).send('500: server error');
    })
}) 

router.all('*', (req,res) => {
    res.status(404).send('<pre>api route not found</pre>');
})

module.exports = router;