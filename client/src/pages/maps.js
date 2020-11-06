import React from "react"

import PageFrame from "_components/pageframe"
import MapBox from "_components/mapbox"

export default () => {

    return (
        <PageFrame>
            <MapBox width='100vw' height='80vh'/>
        </PageFrame>
    )
}