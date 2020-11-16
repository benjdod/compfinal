import React from "react"

import NavBar from "./navbar"
import Footer from "./footer"

import localStyle from "./modules/pageframe.module.css"

export default (props) => {

    return (
        <div>
            <NavBar/>
            <div className={`${localStyle.container} pageWrap`}>
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}