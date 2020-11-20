import React, { useEffect, useState } from "react"
import L from "leaflet"

export default () => {

    const [coords, setCoords] = useState([37.7749, -122.4194]);

    useEffect(() => {
        console.log(document.getElementById('mapid'));
        const map = L.map('mapid', {
            center: coords,
            zoom: 13,
        })

        const MAPBOX_TOKEN = 'pk.eyJ1IjoicmFjaGVsdzAwIiwiYSI6ImNrZ29hdXJoODBhNGQyc3F5MG1rOTU4aW8ifQ.1v3yLXjR8-vD5RnaKkOJkw'; // Set your mapbox token here

        L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(map);

        fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
        .then(res => res.json())
        .then(res => {
            L.geoJSON(res).addTo(map);
        }).catch(e => {
            console.log('error fetching geojson!');
            console.error(e)
        })
    })

    return (
        <div>
            <p>hello</p>
            <div id="mapid" style={{height: '200px', width: '50%'}}>
            </div>
        </div>
    )
}