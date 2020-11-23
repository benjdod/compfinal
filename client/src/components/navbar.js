import React from "react"
import { Link } from "react-router-dom"

// NavLink uses Link from react-router instead of anchor tags becase
// it performs better in React
import NavLink from "./navlink"
import navStyle from "./modules/navbar.module.css"
import Arrow from "../images/arrow.png"

export default () => {

    return (
        <nav className={`${navStyle.bar}`}>
            <Link to="/"><h2 className={navStyle.siteTitle}>COVID-19 Risk Assessor</h2></Link>
            <NavLink className={`${navStyle.item} ${navStyle.push}`} to="/quiz">QUIZ</NavLink>
            {/* <NavLink className={`${navStyle.item}`} to="/news">NEWS</NavLink> */}
            {/* <NavLink className={`${navStyle.item}`} to="/guidelines">GUIDELINES</NavLink> */}

            <li className={`${navStyle.item} ${navStyle.dropdown}`}>
                <NavLink className={`${navStyle.item} ${navStyle.dropbtn}`} to="#">INFO <img className={navStyle.arrow} src={Arrow} /></NavLink>
                <div className={navStyle.dropdownContent}>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/news">NEWS</NavLink>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/guidelines">GUIDELINES</NavLink>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/about">ABOUT</NavLink>
                </div>
            </li>
            <li className={`${navStyle.item} ${navStyle.dropdown}`}>
                <NavLink className={`${navStyle.item} ${navStyle.dropbtn} ${navStyle.account}`} to="/account">ACCOUNT <img className={navStyle.arrow} src={Arrow} /></NavLink>
                <div className={navStyle.dropdownContent}>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="#">LOG OUT</NavLink>
                </div>
            </li>
            {/* we probably don't need this in the navbar, we'll reference it enough
            <NavLink className={`${navStyle.item}`} to="/about">ABOUT</NavLink>*/}
            {/* <NavLink className={`${navStyle.item}`} to="/account">ACCOUNT</NavLink> */}
        </nav>
    )
}