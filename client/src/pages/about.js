import React from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/navbar"
import Footer from "../components/footer"
import aboutStyle from "../components/modules/about.module.css"

export default () => {
    return (
        <div>
            {/* use pageWrap div if the page doesn't scroll, delete if it does */}
            <div class="pageWrap">
            <NavBar />
            
            <p>content</p>
            </div>
            <Footer />

        </div>
    )
}