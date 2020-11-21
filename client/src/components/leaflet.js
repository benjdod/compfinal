import React, { useEffect, useState } from "react"
import moment from "moment"
//import L from "leaflet"

const gradient = (number, low, high) => {
    const input = ((number < low ? low : number > high ? high : number) - low) / (high - low);
    const lowColor = [0.1, 0.8, 0.6];
    const highColor = [0.95, 0.4, 0.25];

    const outColor = [
        ((lowColor[0] + ((highColor[0] - lowColor[0]) * input))),
        ((lowColor[1] + ((highColor[1] - lowColor[1]) * input))),
        ((lowColor[2] + ((highColor[2] - lowColor[2]) * input))),
    ]

    let outStr = '#'

    outColor.forEach(c => {
        const hexCode = Math.trunc(c*255).toString(16).padStart(2,"0");
        outStr += hexCode;
    })

    return outStr;
}

export default (props) => {

    const startingCoords = [36.89, -96.73]  // rough geographical center of the US

    const [coords, setCoords] = useState(startingCoords);

    const [globalMap, setMap] = useState(null);

    //const [markerHandler, setMarkerHandler] = useState(() => {});

    useEffect(() => {

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
            //accessToken: 'your.mapbox.access.token'
        }).addTo(map);

        let marker = props.useMarker === true ? L.marker(startingCoords, {
            alt: 'your location',
            draggable: true,
        }) : null;
        if (props.useMarker === true) {
            let initMarkerGroup = L.layerGroup().addTo(map);
            initMarkerGroup.addLayer(marker);
        }

        const setMarker = (latlng) => {
            if (!marker) return;
            marker.setLatLng(latlng);
            setCoords([marker._latlng.lat, marker._latlng.lng]);
        }

        if (props.startOnLocation === true)
            navigator.geolocation.getCurrentPosition((res) => {
            map.setView(new L.latLng(res.coords.latitude, res.coords.longitude), 12);
            setMarker([res.coords.latitude, res.coords.longitude]);
        })

        if (props.useGeocoder) {
            // reference: https://github.com/Esri/esri-leaflet-geocoder
            const geocoder = L.esri.Geocoding.geosearch({
                useMapBounds: false,
                placeholder: "Search for your locality"
            }).addTo(map);
            console.log(geocoder);
            //let geocoderResults = L.layerGroup().addTo(map);

            geocoder.on('results', (data) => {
                const results = data.results.reverse();

                /*
                results.forEach(result => {
                    geocoderResults.addLayer(L.marker(result.latlng))
                })*/
                setMarker(results[0].latlng);
            })
        }

        map.on('moveend', (e) => {            
            const bounds = map.getBounds();
            const center = [
                bounds._southWest.lat + (bounds._northEast.lat - bounds._southWest.lat) * 0.5,
                bounds._northEast.lng + (bounds._southWest.lng - bounds._northEast.lng) * 0.5,
            ]
            //setCoords(center);
            /*console.log(map._panes.markerPane.remove());*/
        })

        map.on('click', (e) => {
            setMarker(e.latlng)
        })

        //fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
        if (props.useOverlay)
            fetch('/api/statesgeojson-loaded')
            .then(res => res.json())
            .then(res => {
                // https://leafletjs.com/reference-1.7.1.html#geojson
                const geoLayer = L.geoJSON(res, {
                    onEachFeature: (feature, layer) => {
                        layer.on('click', e => {
                            console.log('clicked on state', feature.properties.NAME);
                        })

                        layer.on('mouseover', e => {
                            const layer = e.target;
                            layer.setStyle({
                                fillOpacity: 0.5,
                            })
                        })

                        layer.on('mouseout', e => {
                            geoLayer.resetStyle(e.target);
                        })

                        const recentDate = new Date(feature.properties.recent[0]);
                        const popupText = `<div>
                            date: ${moment(recentDate).format('LL')}<br/>
                            cases: ${feature.properties.recent[1]}<br/>
                            deaths: ${feature.properties.recent[2]}
                            </div>
                            `

                        layer.bindTooltip(popupText, {
                            direction: 'left',
                        })
                    },
                    style: (feature) => {
                        console.log(feature.properties);
                        return {
                            color: gradient(feature.properties.delta_7d[0], 0, 100000),
                            weight: 1,
                            fillOpacity: 0.2,
                        }
                    }
                }).addTo(map);
            }).catch(e => {
                console.log('error fetching geojson!');
                console.error(e)
            })
    }, [])


    return (
        <div>
            <div id="mapid" style={{height: props.height || '50vh', width: props.width || '50vw'}}>
            </div>
        </div>
    )
}