import React from "react"
import { Link } from "react-router-dom"
import footerStyle from "./modules/footer.module.css"

export default () => {

    return (
        <div className={footerStyle.footer}>
            <p>Created by: Ben Dod, Rachel Tucker, Jacob Taylor, and Julia Johnson</p>
        </div>
    )
}