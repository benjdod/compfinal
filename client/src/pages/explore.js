import React, { useState, useEffect } from "react"

import PageFrame from "../components/pageframe"
import Leaflet from "../components/leaflet"
import HistoryChart from "../components/historychart"

import localStyle from "./modules/explore.module.css"

export default () => {

    const [ overlayData, setOverlayData ] = useState({});

    const [ overlayOptions, setOverlayOptions ] = useState({});

    const [ leaflet, setLeaflet ] = useState(null);

    const [ shouldUpdate, setShouldUpdate ] = useState(false);

    const [ chart, setChart ] = useState(null);

    const renderDeltaOverlay = (fields, forceUpdate) => {

        let deltaType = fields.deltaType || overlayOptions.deltaType;
        let countType = fields.countType || overlayOptions.countType;
        let normalize = fields.normalize !== undefined ? fields.normalize : overlayOptions.normalize;

        setOverlayOptions({
            deltaType: deltaType,
            countType: countType,
            normalize: normalize,
        })

        let tooltipData = {};

        const targetDelta = deltaType === '7d' ? 0 : deltaType === '14d' ? 1 : 2;

        const targetCount = countType === 'cases' ? 0 : 1;  // idx[0] for cases, 1 for deaths

        const shouldNormalize = normalize;

        console.log(shouldNormalize);

        fetch('/api/statecurrent')
        .then(res => res.json())
        .then(res => {

            res.forEach(row => {
                tooltipData[row[0]] = {
                    State: row[2],
                    Population: row[1],
                    Cases: row[3],
                    Deaths: row[4],
                }
            })

            return fetch('/api/overlay/deltas');
        })
        .then(res => res.json())
        .then(res => {
            const od = {};
            let colorMax = 0;
            for (const key in res) {
                const pop = tooltipData[key] ? tooltipData[key].Population : null
                let x = 0;

                if (normalize) {
                    if (pop) {
                        x = res[key][targetDelta][targetCount] / pop;
                        if (x > colorMax) colorMax = x;
                        od[key] = normalize ? x : res[key][targetDelta][targetCount]
                    }
                } else {
                    if (res[key][targetDelta][targetCount] > colorMax)
                        colorMax = res[key][targetDelta][targetCount];
                    od[key] = res[key][targetDelta][targetCount]
                }
            }

            console.log(od);

            colorMax *= 1;

            //setLeaflet(null);
            setLeaflet(<Leaflet useOverlay stateOnClick={fetchAndSetChart} winky overlayData={od} tooltipData={tooltipData} overlayColors={{type: 'uni', min: 0, max: colorMax}} width="100%" height="60vh"/>)
            //if (forceUpdate)
                //setShouldUpdate(false);
            console.log(leaflet);
        }).catch(e => {
            console.error(e);
        })
    }

    useEffect(() => {
        renderDeltaOverlay({
            deltaType: '7d',
            countType: 'cases',
            normalize: true,
        }, false);
    }, [shouldUpdate])

    useEffect(() => {
        renderDeltaOverlay({
            deltaType: '7d',
            countType: 'cases',
            normalize: true,
        }, false);
    }, [])

    const fetchAndSetChart = (fips, stateName) => {
        console.log('statename: ', stateName);
        fetch(`/api/statehistory/${fips.toString().padStart(2,"0")}`)
        .then(res => res.json())
        .then(res => {
            const labels = res.map(r => r[0]).reverse();
            const cases = res.map(r => r[1]).reverse();
            const deaths = res.map(r => r[2]).reverse();
            setChart(null);
            setChart(<HistoryChart stateName={stateName} cases={cases} deaths={deaths} labels={labels}/>)
        })
    }

    /*
    useEffect(() => {
        fetch(`/api/statehistory/05`)
        .then(res => res.json())
        .then(res => {
            const labels = res.map(r => r[0]).reverse();
            const cases = res.map(r => r[1]).reverse();
            const deaths = res.map(r => r[2]).reverse();
            setChart(<HistoryChart cases={cases} deaths={deaths} labels={labels}/>)
        })

    }, [])*/

    const displayOptions = (
        <div className={localStyle.optionbox}>
            <p>Display Options</p>
            <div>
                <select onChange={e => {
                    renderDeltaOverlay({deltaType: e.target.value}, true);
                }}>
                    <option value="7d">7 day change</option>
                    <option value="14d">14 day change</option>
                    <option value="28d">28 day change</option>
                </select>
                {<select onChange={e => {
                    renderDeltaOverlay({countType: e.target.value}, true);
                }}>
                    <option value="cases">Cases</option>
                    <option value="deaths">Deaths</option>
                </select>}
                {<select onChange={e => {
                    renderDeltaOverlay({normalize: e.target.value === 'true'}, true);
                }}>
                    <option value="true">Normalized</option>
                    <option value="false">Absolute</option>
                </select>}
            </div>
        </div>
        
    )
    
    return (
        <PageFrame gutter={true}>
            <div className={localStyle.container}>
                {leaflet}
                {displayOptions}
                {chart}
            </div>
        </PageFrame>
    )
}