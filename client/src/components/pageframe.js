import React from "react"

import NavBar from "./navbar"
import Footer from "./footer"

import localStyle from "./modules/pageframe.module.css"
import { Link } from "react-router-dom"

export default (props) => {

    const nav = props.header === undefined || props.header !== false
        ? <NavBar/>
        : null;

    const cpstatement = '&copy; 2020 Ben Dod, Rachel Tucker, Jacob Taylor, and Julia Johnson'

    const footer = props.footer === undefined || props.footer !== false
        ? (<div className={`${localStyle.footer} ${props.transparentFooter ? localStyle.tspfooter : ''}`}>
            <p dangerouslySetInnerHTML={{__html: cpstatement}}/>
            <div className={`${localStyle.footerlinks}`}>
                <Link to="/about">About</Link>
                <Link to="/guidelines">CDC Guidelines</Link>
            </div>
        </div>) : null

    return (
        <div className={localStyle.container}>
            {nav}
            <div className={`${localStyle.content} ${footer !== null && props.footerCover !== true ? localStyle.footerspace : ''} ${props.gutter !== undefined && props.gutter === false ? '' : localStyle.gutter}`}>
                {props.children}
            </div>
            {footer}
        </div>
    )
}