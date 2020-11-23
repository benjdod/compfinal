import React, { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"

// NavLink uses Link from react-router instead of anchor tags becase
// it performs better in React
import NavLink from "./navlink"
import navStyle from "./modules/navbar.module.css"
import Arrow from "../images/arrow.png"

export default () => {

    const history = useHistory();

    const location = useLocation();

    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        fetch('/user/ping', {method: 'get', credentials: 'include'})
            .then(res => {
                if (res.status !== 200)
                    setLoggedIn(false)
                else
                    setLoggedIn(true)
            }).catch(e => {
                setLoggedIn(false);
            })
    }, [])

    
    const logoutHandler = () => {
        fetch('/user', {
            method: 'delete',
            credentials: 'include'
        }).then(() => {
            history.push('/');
        }).catch(e => {
            console.error(e);
            alert('could not log out!');
        })
    }

    const accountButtons = (
        <li className={`${navStyle.item} ${navStyle.dropdown}`}>
        <NavLink className={`${navStyle.item} ${navStyle.dropbtn} ${navStyle.account}`} to="/account">ACCOUNT <img className={navStyle.arrow} src={Arrow} /></NavLink>
        <div className={navStyle.dropdownContent}>
            <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="#" onClick={logoutHandler}>LOGOUT</NavLink>
        </div>
        </li>
    )

    const loginButtons = (
        <NavLink className={`${navStyle.item} ${navStyle.account}`} to="/login">LOG IN</NavLink>
    )

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
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/explore">EXPLORE</NavLink>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/guidelines">GUIDELINES</NavLink>
                    <NavLink className={`${navStyle.item} ${navStyle.dropItem}`} to="/about">ABOUT</NavLink>
                </div>
            </li>
            { loggedIn ? accountButtons : loginButtons }
        </nav>
    )
}