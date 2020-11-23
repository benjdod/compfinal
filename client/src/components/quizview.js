import React from "react"
import moment from "moment"
import Gauge from "../components/gauge"
import gaugeStyle from "./modules/gauge.module.css"


// STYLE: this needs to be styled 
// there should be similar rules for this and QuizCrumb to unify the 
// look of the design
// e.g. dates are grey and font-weight 200, titles are bold, etc.
export default (props) => {

    if (!props.data) return <p>Quiz not found :(</p>

    const data = props.data;

    const time = data.timestamp
        ? <h4>{moment(data.timestamp).calendar()}</h4> : null;

    const details = (
        <div>
            <p>A {data.eventDuration} minute event {data.eventOutside ? 'outside' : 'inside'} event with {data.eventSize} people attending.</p>
            <p>{data.maskPercentage > 0 ? data.maskPercentage >= 1 ? '100% of' : `Around ${Math.round(data.maskPercentage*100)}% of` : 'No'} attendees wearing masks</p>
            <p>{data.socialDistancing > 0 ? `${data.socialDistancing} meters of` : 'No'} social distancing</p>
            {/*<p style={{color: genColor(data.risk), fontWeight: 700}}>Risk: {data.risk}</p>*/}
        </div>
    )

    return (
        <div>
            <h2>{data.county} County, {data.state}</h2>
            {time}
            {details}
            <Gauge risk={data.risk}/>
        </div>
    )
    
}