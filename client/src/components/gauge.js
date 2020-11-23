import React from "react"
import gaugeStyle from "./modules/gauge.module.css"

import { numToRisk } from "../helper/riskranges"

const gauge = (props) => {

    const riskString = numToRisk(props.risk);

    let subBlurb = '';
    let gaugeClass = ''

    switch (riskString) {
        case 'Low':
            subBlurb = 'Caution reccomended for users with underlying health conditions.'
            gaugeClass = gaugeStyle.gauge__fill__green;
            break;
        case 'Medium':
            subBlurb = 'Not reccomended for users with underlying health conditions.'
            gaugeClass = gaugeStyle.gauge__fill__yellow;
            break;
        case 'High':
            subBlurb = 'Discouraged for all users.';
            gaugeClass = gaugeStyle.gauge__fill__orange;
            break;
        default:
            subBlurb = 'Extremely discouraged for all users.';
            gaugeClass = gaugeStyle.gauge__fill__red;
            break;
    }

    return (
        <div>
            <div className= {gaugeStyle.gauge}>
                <div className = {gaugeStyle.gauge__body}>
                    <div className= {gaugeClass}></div>
                        <div className= {gaugeStyle.guage__cover}></div>
                </div>
            </div>
            <strong>{riskString + ' Risk'}</strong>
            <p>{subBlurb}</p>
        </div>
        

    )
}

export default gauge;