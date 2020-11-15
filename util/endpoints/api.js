const express = require('express');
const router = express.Router();
const { listRoutes } = require('./index');
const { default: axios } = require('axios');

router.get('/', listRoutes(router));

router.get('/countydata', (req,res) => {
    axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us-counties.csv')
        .then(data => {
            const out = data.data.split('\n').map((row,idx) => {
                if (idx === 0) return;
                const spl = row.split(',')
                if (spl.length === 9) spl.push('');
                return spl;
            })
            res.json(out);
        })
})

module.exports = router;