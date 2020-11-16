const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');

router.get('/', listRoutes(router));

let countyData = {
    data: null,
    timestamp: null
}

router.get('/countydata', (req,res) => {


    if (countyData.data) {

        const currentTime = Date.now();

        // if our data is more than half a day old, refresh it!
        if ((currentTime - countyData.timestamp)/1000 < 60*60*12) {
            console.log(`serving copy of data since it's only ${(currentTime - countyData.timestamp) / 1000} seconds old`, );
            res.json(countyData.data)
            return;
        }            
        
    }

    console.log('fetching new county data and serving');

    axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv')
        .then(data => {
            const out = data.data.split('\n').map((row,idx) => {
                if (idx === 0) return;
                const spl = row.split(',')
                if (spl.length === 9) spl.push('');
                return spl;
            }).filter((row,idx) => idx !== 0)
            countyData.data = out;
            countyData.timestamp = Date.now();
            res.json(countyData.data)
        })
})

router.all('*', (req,res) => {
    res.status(404).send('<pre>api route not found</pre>');
})

module.exports = router;