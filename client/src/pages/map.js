import React from "react"

import MapBox from "../components/mapbox"
import NavBar from "../components/navbar"
import Footer from "../components/footer"

export default () => {

    let latitude = 0;
    let longitude = 0;

    const mb = <MapBox width='100vw' height='90vh' setLatLong={(lat,long) => {
        latitude = lat;
        longitude = long;
        console.log(`(${latitude}, ${longitude})`);
    }}/>

    console.log(mb);

    return (
        <div>
            <NavBar />
                {mb}
            <Footer />
        </div>
    )
}