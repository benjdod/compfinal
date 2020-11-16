import React from "react"
import { Link } from "react-router-dom"
import PageFrame from "_components/pageframe"
import HomeBox from "../components/homebox"
import Footer from "../components/footer"

import boxStyle from "../components/modules/box.module.css"

export default () => {
    return (
        <div class="bg-image">
            <div class="pageWrap">
            </div>
            <HomeBox />
            <Footer />
        </div>
    )
}