import React from "react"
import { Link } from "react-router-dom"
import FancyButton from "../components/fancybutton"

export default () => {
    return (
        <div>
            <p>Index (reacte)</p>
            <Link to="/about">About</Link>
            <FancyButton>Click ee!</FancyButton>
        </div>
    )
}