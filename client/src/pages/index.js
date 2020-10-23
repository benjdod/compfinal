import React from "react"
import { Link } from "react-router-dom"
import FancyButton from "../components/fancybutton"

export default () => {
    return (
        <div>
            <h1>Index Page</h1>
            <Link to="/about" style={{padding: "10px", display: "inline-block"}}>About</Link>
            <br/>
            <FancyButton>Scary button</FancyButton>
        </div>
    )
}