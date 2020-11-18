import React from "react"

import localStyle from "./modules/footergang.module.css"

export default () => {
    return (
        <div className={localStyle.container}>
            <div className={localStyle.content}>
                <p>beginning of content</p>
                <div style={{height: '200vh'}}/>
                <p>end of content content!</p>
            </div>
            <div className={localStyle.footer}></div>
        </div>
    )
}