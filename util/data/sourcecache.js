const LoaderCache = require('../../lib/loader');
const { default: axios } = require('axios')
const fs = require('fs');
const path = require('path');

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

cache.add('covidstateshistory', 60*60*12, [], async () => {
    try {
        const fipsKeys = {}

        const raw = await axios.get('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv');
        raw.data.split('\n').map(row => row.split(','))
            .forEach(datum => {
                const key = datum[2];
                if (!fipsKeys[key])
                    fipsKeys[key] = new Array();

                fipsKeys[key].push([datum[0], datum[3], datum[4]])
            })

        Object.keys(fipsKeys).forEach(key => {
            fipsKeys[key] = fipsKeys[key].reverse();
        })

        return fipsKeys
    } catch (e) {
        console.log(e);
        return null;
    }
})

cache.add('covid_deltas', 60*60*24, ['covidstateshistory'], async (deps) => {

    const out = [];

    out.push(['fips', 'delta_7d', 'delta_14d', 'delta_28d']);

    Object.keys(deps.covidstateshistory).forEach(key => {
        if (key === 'fips') return;
        const slice = deps.covidstateshistory[key].slice(0,29);
        console.log('delta slice ', slice);
        out.push([
            key,
            [
                slice[0][1] - slice[6][1],  // cases
                slice[0][2] - slice[6][2]   // deaths
            ],
            [
                slice[0][1] - slice[14][1],  // cases
                slice[0][2] - slice[14][2]   // deaths
            ],
            [
                slice[0][1] - slice[27][1],  // cases
                slice[0][2] - slice[27][2]   // deaths
            ]
        ])
    })

    return out;
})

cache.add('statesgeo_base', 60*60*24*7, [], () => {
    const geo = JSON.parse(fs.readFileSync(path.resolve(__dirname, './local/states_5m.json'), 'utf-8'));
    return geo;
})

cache.add('statesgeo_detailed', 60*60*24, ['statesgeo_base', 'covid_deltas', 'covidstateshistory'], (deps) => {

    const geo = deps.statesgeo_base;
    const de = deps.covid_deltas;
    const history = deps.covidstateshistory;

    geo.features.forEach((state,idx) => {
        const deltas = de.find(d => d[0] == state.properties.STATE);
        if (deltas) {
            geo.features[idx].properties.delta_7d = [deltas[1][0], deltas[1][1]]
            geo.features[idx].properties.delta_14d = [deltas[2][0], deltas[2][1]]
            geo.features[idx].properties.delta_28d = [deltas[3][0], deltas[3][1]]
        } else {
            geo.features[idx].properties.delta_7d = null;
            geo.features[idx].properties.delta_14d = null;
            geo.features[idx].properties.delta_28d = null;
        }


        const mostRecent = history[state.properties.STATE][0];
            
        geo.features[idx].properties.recent = 
            mostRecent ? [mostRecent[0], parseInt(mostRecent[1]), parseInt(mostRecent[2])] : null;

    })

    return geo;
})

module.exports = cache;