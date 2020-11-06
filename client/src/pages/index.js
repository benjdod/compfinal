import React from "react"
import { Link } from "react-router-dom"
import PageFrame from "_components/pageframe"
import NewsCard from "../components/newscard"
import Map from "../components/maptestapp"

export default () => {
    return (
        <PageFrame>
            <Link to="/about" style={{padding: "10px", display: "inline-block"}}>About</Link>
            <Link to="/cookie">Get cookie maybe?</Link>
            <br/>
            
        </PageFrame>
    )
}