import React from "react"

import NavBar from "./navbar"
import Footer from "./footer"

import localStyle from "./modules/pageframe.module.css"
import { Link, useLocation } from "react-router-dom"

/**
 * This wraps content in a header and footer
 * @param {object} props
 * @param {string|boolean} props.gutter specify the gutter behavior. If boolean false, no gutter is created. Gutter width can be specified with a string. Default behavior is 10% on each side
 */
export default (props) => {

    const location = useLocation();

    console.log(location.state);

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

    const gutterWidth = (props.gutter !== undefined) 
        ? (props.gutter === true)
            ? '10%'
            : props.gutter
        : '10%' 

    return (
        <div className={localStyle.container}>
            {nav}
            <div className={`${localStyle.content} ${footer !== null && props.footerCover !== true ? localStyle.footerspace : ''}`} style={{paddingLeft: gutterWidth, paddingRight: gutterWidth}}>
                {props.children}
            </div>
            {footer}
        </div>
    )
}