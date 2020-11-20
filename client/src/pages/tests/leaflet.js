import React, { useEffect, useState } from "react"
//import L from "leaflet"

export default () => {

    const startingCoords = [36.89, -96.73]  // rough geographical center of the US

    const [coords, setCoords] = useState(startingCoords);

    const [globalMap, setMap] = useState(null);

    const [markerHandler, setMarkerHandler] = useState(() => {});

    useEffect(() => {
        console.log(document.getElementById('mapid'));

        const map = L.map('mapid', {
            center: startingCoords,
            zoom: 4,
        });

        //setMap(map);

        const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFjaGVsdzAwIiwiYSI6ImNrZ29hdXJoODBhNGQyc3F5MG1rOTU4aW8ifQ.1v3yLXjR8-vD5RnaKkOJkw'; // Set your mapbox token here

        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(map);

        // reference: https://github.com/Esri/esri-leaflet-geocoder
        const geocoder = L.esri.Geocoding.geosearch({
            useMapBounds: false,
            placeholder: "Search for your locality"
        }).addTo(map);
        console.log(geocoder);
        let geocoderResults = L.layerGroup().addTo(map);

        geocoder.on('results', (data) => {
            geocoderResults.clearLayers();
            const results = data.results.reverse();

            results.forEach(result => {
                geocoderResults.addLayer(L.marker(result.latlng))
            })
        })

        map.on('moveend', (e) => {            
            const bounds = map.getBounds();
            const center = [
                bounds._southWest.lat + (bounds._northEast.lat - bounds._southWest.lat) * 0.5,
                bounds._northEast.lng + (bounds._southWest.lng - bounds._northEast.lng) * 0.5,
            ]
            setCoords(center);
            console.log(center);
        })

        navigator.geolocation.getCurrentPosition((res) => {
            map.setView(new L.latLng(res.coords.latitude, res.coords.longitude), 12);
            L.marker([res.coords.latitude, res.coords.longitude]).addTo(map);
        })

        console.log(L.latLng.lat);

        fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
        .then(res => res.json())
        .then(res => {
            L.geoJSON(res).addTo(map);
        }).catch(e => {
            console.log('error fetching geojson!');
            console.error(e)
        })
    }, [])


    return (
        <div>
            <div id="mapid" style={{height: '90vh', width: '90%'}}>
            </div>
            <button onClick={(e) => {
                console.log(coords);
            }}>log coords</button>
        </div>
    )
}