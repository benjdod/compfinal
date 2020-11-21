import React from "react"
import gaugeStyle from "./modules/gauge.module.css"

const gauge = (props) => {

    return (
        <div className= {gaugeStyle.gauge}>
            <div className = {gaugeStyle.gauge__body}>
                <div className= {gaugeStyle.gauge__fill__green}></div>
                    <div className= {gaugeStyle.guage__cover}></div>
            </div>
        </div>

    )
}