import React, { useState, useEffect } from "react"

import PageFrame from "../components/pageframe"
import Leaflet from "../components/leaflet"

export default () => {

    const [ overlayData, setOverlayData ] = useState({});

    const [ overlayOptions, setOverlayOptions ] = useState({});

    const [ leaflet, setLeaflet ] = useState(null);

    const [ shouldUpdate, setShouldUpdate ] = useState(false);

    const renderDeltaOverlay = (fields, forceUpdate) => {

        let deltaType = fields.deltaType || overlayOptions.deltaType;
        let countType = fields.countType || overlayOptions.countType;
        let normalize = fields.normalize || overlayOptions.normalize;

        setOverlayOptions({
            deltaType: deltaType,
            countType: countType,
            normalize: normalize,
        })

        let tooltipData = {};

        const targetDelta = deltaType === '7d' ? 0 : deltaType === '14d' ? 1 : 2;

        console.log('target data idx: ', targetDelta);

        const targetCount = countType === 'cases' ? 0 : 1;  // idx[0] for cases, 1 for deaths

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
                let x = 0
                if (pop) {
                    x = res[key][targetDelta][targetCount] / pop;
                    if (x > colorMax) colorMax = x;
                    od[key] = normalize ? x : res[key][targetDelta][targetCount]
                }
            }

            console.log(od);

            colorMax *= 0.9;

            setLeaflet(null);
            setLeaflet(<Leaflet useOverlay winky overlayData={od} tooltipData={tooltipData} overlayColors={{type: 'uni', min: 0, max: colorMax}} width="100%" height="60vh"/>)
            if (forceUpdate)
                setShouldUpdate(true);
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
    
    return (
        <PageFrame gutter="0">
            {leaflet}
            <select onChange={e => {
                console.log('select onchange!');
                renderDeltaOverlay({deltaType: e.target.value}, true);
            }}>
                <option value="7d">7 day change</option>
                <option value="14d">14 day change</option>
                <option value="28d">28 day change</option>
            </select>
        </PageFrame>
    )
}