import React from "react"

import NavBar from "./navbar"

export default (props) => {

    return (
        <div>
            <NavBar/>
            <div>
                {props.children}
            </div>
        </div>
    )
}