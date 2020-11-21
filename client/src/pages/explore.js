import React from "react"

import PageFrame from "../components/pageframe"
import Leaflet from "../components/leaflet"

export default () => {
    return (
        <PageFrame gutter="0">
            <Leaflet useOverlay width="100%" height="60vh"/>
        </PageFrame>
    )
}