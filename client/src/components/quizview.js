import React from "react"
import moment from "moment"
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

    // lol this is bad!!
    const genColor = (number) => {
        const octo = Math.trunc(number*255);
        const red = octo.toString(16).padStart(2,"0");
        const green = (255-octo).toString(16).padStart(2,"0");
        const blue = '44';
        const color = '#' + red + green + blue;
        return color;
    }

    const details = (
        <div>
            <p>A {data.eventDuration} minute event {data.eventOutside ? 'outside' : 'inside'} event with {data.eventSize} people attending.</p>
            <p>{data.maskPercentage > 0 ? data.maskPercentage >= 1 ? '100% of' : `Around ${Math.round(data.maskPercentage*100)}% of` : 'No'} attendees wearing masks</p>
            <p>{data.socialDistancing > 0 ? `${data.socialDistancing} meters of` : 'No'} social distancing</p>
            <p style={{color: genColor(data.risk), fontWeight: 700}}>Risk: {data.risk}</p>
        </div>
    )

    //low risk
    const gaugeG = (
        <div className= {gaugeStyle.gauge}>
            <div className = {gaugeStyle.gauge__body}>
                <div className= {gaugeStyle.gauge__fill__green}></div>
                    <div className= {gaugeStyle.guage__cover}></div>
            </div>
            <strong>Low Risk</strong>
            <p>Caution reccomended for users with underlying health conditions.</p>
        </div> )
    //medium risk
    const gaugeY = (
        <div className= {gaugeStyle.gauge}>
            <div className = {gaugeStyle.gauge__body}>
                <div className= {gaugeStyle.gauge__fill__yellow}></div>
                    <div className= {gaugeStyle.guage__cover}></div>
            </div>
            <strong>Medium Risk</strong>
            <p>Not reccomended for users with underlying health conditions.</p>
        </div> )
    //high risk
    const gaugeO = (
        <div className= {gaugeStyle.gauge}>
            <div className = {gaugeStyle.gauge__body}>
                <div className= {gaugeStyle.gauge__fill__orange}></div>
                    <div className= {gaugeStyle.guage__cover}></div>
            </div>
            <strong>High Risk</strong>
            <p>Highly discouraged for all users.</p>
        </div> )
    //extreme risk
    const gaugeR = (
        <div className= {gaugeStyle.gauge}>
            <div className = {gaugeStyle.gauge__body}>
                <div className= {gaugeStyle.gauge__fill__red}></div>
                    <div className= {gaugeStyle.guage__cover}></div>
            </div>
            <strong>Extreme Risk</strong>
            <p>Highly discouraged for all users.</p>
        </div>)

    // TODO: it would be awesome to have like a slider / color changing component
    // to make the risk number seem more real. We will also have to establish color rules for 
    // risk as well as the color coding for the map. (a linear equation to make a gradient
    // w/ cutoff @ a certain risk number e.g. 0 is green, 0.15 is red)


    if(data.risk <= 0.01) {
        return (
            <div>
                <h2>{data.county} County, {data.state}</h2>
                {time}
                {details}
                {gaugeG}
            </div>
        )
    } else if(data.risk <= 0.05 && data.risk > 0.01) {
        return (
            <div>
                <h2>{data.county} County, {data.state}</h2>
                {time}
                {details}
                {gaugeY}
            </div>
        )
    } else if(data.risk <= 0.1 && data.risk > 0.05) {
        return (
            <div>
                <h2>{data.county} County, {data.state}</h2>
                {time}
                {details}
                {gaugeO}
            </div>
        )
    } else{
        return (
            <div>
                <h2>{data.county} County, {data.state}</h2>
                {time}
                {details}
                {gaugeR}
            </div>
        )
    }
}