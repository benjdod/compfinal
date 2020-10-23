import React from "react"
import { Link } from "react-router-dom"

import globalStyle from "../styles/global.css"

export default () => {
    return (
        <div>
            <h1>About</h1>
            <p className='bleh'>Yeah.</p>
            <Link to="/">Home</Link>
        </div>
    )
}