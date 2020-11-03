import React from "react"
import { Link } from "react-router-dom"

export default () => {
    isLoggedIn();
    return (
        <div>
            <p>Rrestricted content!</p>
            <Link to="/">Home.</Link>
        </div>
    )
}