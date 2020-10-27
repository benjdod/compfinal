import React, { useEffect, useState } from "react"

// this instead of <a>!
import { Link } from "react-router-dom"

export default (props) => {

    // we have to use state and an effect hook
    // to set our style on mount
    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (window.location.pathname === props.to) {
            setActive(true);
        }
    });

    return (
        <Link to={props.to} className={props.className + ` ${isActive ? 'text-bold' : null}`} style={props.style}>{props.children}</Link>
    )
}