import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFjaGVsdzAwIiwiYSI6ImNrZ29hdXJoODBhNGQyc3F5MG1rOTU4aW8ifQ.1v3yLXjR8-vD5RnaKkOJkw'; // Set your mapbox token here

export default (props) => {

    // argument processing

    const width = props.width || '50vw';

    const height = props.height || '50vh';

    // useState for viewport change handling
    const [viewport, setViewport] = useState({
        latitude: 36,
        longitude: -79.047554,
        zoom: 7,
        bearing: 0,
        pitch: 0
    });

    //changes to the new viewport
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    //slide animation
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        [handleViewportChange]
      );

    return (
        <div>
            <MapGL
                ref={mapRef}
                {...viewport}
                width={width}
                height={height}
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={viewport => { setViewport(viewport);}}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                >
            <Geocoder
                mapRef={mapRef}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position="top-left"
            />
            </MapGL>
        </div>
    )
}