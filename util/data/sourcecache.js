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

        return fipsKeys
    } catch (e) {
        console.log(e);
        return null;
    }
})

cache.add('covid_delta_7day', 60*60*24, ['covidstateshistory'], async (deps) => {

    const out = []

    Object.keys(deps.covidstateshistory).forEach(key => {
        if (key === 'fips') return;
        const slice = deps.covidstateshistory[key].reverse().slice(0,7);
        out.push([
            key,
            slice[0][1] - slice[6][1],  // cases
            slice[0][2] - slice[6][2]   // deaths
        ])
    })

    return out;
})

cache.add('covid_delta_28day', 60*60*24, ['covidstateshistory'], async (deps) => {

    const out = []

    Object.keys(deps.covidstateshistory).forEach(key => {
        if (key === 'fips') return;
        const slice = deps.covidstateshistory[key].reverse().slice(0,29);
        out.push([
            key,
            slice[0][1] - slice[28][1],  // cases
            slice[0][2] - slice[28][2]   // deaths
        ])
    })

    return out;
})

cache.add('statesgeo_base', 60*60*24*7, ['covid_delta_7day'], (deps) => {
    const geo = JSON.parse(fs.readFileSync(path.resolve(__dirname, './local/states_5m.json'), 'utf-8'));
    return geo;
})

cache.add('statesgeo_detailed', 60*60*24, ['statesgeo_base', 'covid_delta_7day', 'covid_delta_28day', 'covidstateshistory'], (deps) => {

    const geo = deps.statesgeo_base;
    const delta7day = deps.covid_delta_7day;
    const delta1month = deps.covid_delta_28day;
    const history = deps.covidstateshistory;

    geo.features.forEach((state,idx) => {
        const delta_7d = delta7day.find(d => d[0] == state.properties.STATE);
        if (delta_7d) 
            geo.features[idx].properties.delta_7d = [delta_7d[1], delta_7d[2]]
        else 
            geo.features[idx].properties.delta_7d = null;

        const delta_1mo = delta1month.find(d => d[0] == state.properties.STATE);
        if (delta_1mo) 
            geo.features[idx].properties.delta_1mo = [delta_1mo[1], delta_1mo[2]]
        else 
            geo.features[idx].properties.delta_1mo = null;

        const mostRecent = history[state.properties.STATE][0];
            
        geo.features[idx].properties.recent = 
            mostRecent ? [parseInt(mostRecent[1]), parseInt(mostRecent[2])] : null;

    })

    return geo;
})

module.exports = cache;