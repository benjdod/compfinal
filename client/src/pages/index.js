import React from "react"
import { Link } from "react-router-dom"

export default () => {
    return (
        <div>
            <p>Index (reacte)</p>
            <Link to="/about">About</Link>
        </div>
    )
}