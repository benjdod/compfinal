const LoaderCache = require('../lib/loader');
const { default: axios } = require('axios')

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

module.exports = cache;