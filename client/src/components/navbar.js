import React from "react"
import { Link } from "react-router-dom"

// NavLink uses Link from react-router instead of anchor tags becase
// it performs better in React
import NavLink from "./navlink"

import navStyle from "./modules/navbar.module.css"

export default () => {

    // TODO: this is not responsive for mobile! Hamburger menu or something...
    return (
        <nav className={`${navStyle.bar}`}>
            <Link to="/"><h2>COVID-19 Tracker</h2></Link>
            <NavLink className={`${navStyle.item} ${navStyle.push}`} to="/maps">MAPS</NavLink>
            <NavLink className={`${navStyle.item}`} to="/news">NEWS</NavLink>
            <NavLink className={`${navStyle.item}`} to="/info">INFO</NavLink>
            <NavLink className={`${navStyle.item}`} to="/account">ACCOUNT</NavLink>
        </nav>
    )
}