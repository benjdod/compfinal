import React from "react"

import MapBox from "../components/mapbox"
import NavBar from "../components/navbar"

export default () => {

    return (
        <div>
            <NavBar />
            <MapBox width='100vw' height='90vh'/>
        </div>
    )
}