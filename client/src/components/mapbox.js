import React, { useState } from "react"
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFjaGVsdzAwIiwiYSI6ImNrZ29hdXJoODBhNGQyc3F5MG1rOTU4aW8ifQ.1v3yLXjR8-vD5RnaKkOJkw'; // Set your mapbox token here

export default (props) => {

    // argument processing

    const width = props.width || '50vw';

    const height = props.height || '50vh';

    // useState for viewport change handling
    const [viewport, setViewport] = useState({
        latitude: 36,
        longitude: -79.047554,
        zoom: 10,
        bearing: 0,
        pitch: 0
    })

    return (
        <div>
            <MapGL
                {...viewport}
                width={width}
                height={height}
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={viewport => { setViewport(viewport);}}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        </div>
    )
}