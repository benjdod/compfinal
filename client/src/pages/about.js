import React from "react"
import { Link } from "react-router-dom"

export default () => {
    return (
        <div>
            <h1>About</h1>
            <p className={'cooltext bleh'}>Yeah.</p>
            <Link to="/">Home</Link>
        </div>
    )
}