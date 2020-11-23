import React, { useState } from "react"
import { useHistory, Redirect } from "react-router-dom"

import PageFrame from "../components/pageframe"
import MapBox from "../components/mapbox"
import Leaflet from "../components/leaflet"

import localStyle from "./modules/quizzard.module.css"


const min = (a,b) => {
    return a < b ? a : b;
}

const max = (a,b) => {
    return a > b ? a : b
}

// this is the quiz form, divided up into multiple parts
class Quiz extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0,

            /*** risk assessment data ***/
            latitude: 27.9938,        // float
            longitude: -81.82347,       // float
            eventSize: 3,       // int: number of attendees
            eventDuration: 60,   // int: duration in minutes
            eventOutside: false,
            maskWearing: true,
            maskPercentage: 0.9,  // float: mask percentage from 0 to 1
            userMaskWearing: true,
            socialDistancing: 1,    // int: meters of social distancing, 0 for no distancing
        }
    }
    

    // normally, React renders a component once per 
    // insertion into the DOM, so we can't change any values 
    // after that render. So we have to hook into the component's 
    // lifecycle.
    // So we'll create a variable called 'step' using a useState hook.
    // React watches this variable and re-renders the whole
    // component if it's changed.
    // see also: https://reactjs.org/docs/hooks-state.html
    
    // now we can use the state variable, 'step' to switch the 
    // page content based on its value...

    componentDidMount() {
        fetch('/user/ping', {
            method: 'get',
            credentials: 'include'
        }).then(res => {
            if (res.status !== 200) {
                this.props.history.push('/login')
            }
        })
        .catch(err => {
            console.error(err);
            this.props.history.push('/login')
        })
    }

    render() {

        const submit = () => {
            const {step, ...inputs} = this.state;

            let quizResult = null;

            fetch('/api/calculaterisk', {
                method: 'post',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(res => {
                quizResult = res;
                const addBody = JSON.stringify(quizResult);
                console.log(addBody);
                const out= fetch('/user/quizzes', {
                    method: 'post',
                    body: addBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                return out;
            }).then((res) => {
                console.log(res);
                console.log('result data: ', quizResult);
                this.props.history.push({
                    pathname: '/quizresult',
                    state: {
                        result: quizResult,
                    }
                });
            }).catch(e => {
                console.error(e);
                this.props.history.push({
                    pathname: '/account',
                    state: {
                        message: 'Could not upload quiz result',
                    }
                })
            })
            /*fetch('/user/quizzes', {
                method: 'post',
                body: JSON.stringify(out)
            })
            .then(res => {
                console.log(res);
                // go to account...
                <Redirect to="/account"/>
            })
            .catch(e => console.error(e))
            */
        }

        const nextButton = <button className={`button greenBtn ${localStyle.button} ${localStyle.next}`} onClick={() => {this.setState({step: this.state.step + 1}); console.log(this.state);}}>Next</button>
        const backButton = <button className={`button ${localStyle.button} ${localStyle.back}`} onClick={() => {this.setState({step: max(0, this.state.step - 1)}); console.log(this.state);}}>Back</button>
        const submitButton = <button className={`button greenBtn ${localStyle.button} ${localStyle.next}`} onClick={submit}>Submit</button>

        const buttons = (
            <div className={localStyle.buttonblock}>
                {backButton}
                {nextButton}
            </div>
        )

        const startStep = (
            <div>
                <h3 className="text-italic">COVID-19 Risk Assessor</h3>
                <p>This quiz will assess your risk for contracting COVID-19 given event details. The creators and mantainers of this website are not medical professionals, and the resulting risk estimate should in no way be construed as medical advice!</p>
                {nextButton}
            </div>
        )

        const locationStep = (
            <div>
                <p>Where are you in the US?</p>
                {/*
                    <MapBox width="100%" height="50vh" startOnLocation setLatLong={(lat,long) => {
                        this.state.latitude = lat;
                        this.state.longitude = long;
                    }}/>
                */}
                
                <Leaflet width="100%" height="50vh" useMarker useGeocoder startOnLocation setLatLng={(latlng) => {
                    this.state.latitude = latlng[0];
                    this.state.longitude = latlng[1];
                }}/>
                {buttons}
            </div>
        )

        const eventStep = (
            <div>
                <form>
                    <label htmlFor="input-event-size">How many people will be attending?</label>
                    <input type="number" id="input-event-size" min="0" max="50000" defaultValue={this.state.eventSize} onChange={(e) => { 
                        this.setState({eventSize: parseInt(e.target.value) });
                    }}></input>
                    <label htmlFor="input-event-duration">How long will you be there? (in minutes)</label>
                    <input type="number" id="input-event-duration" min="0" max="4095" defaultValue={this.state.eventDuration} onChange={(e) => {
                        this.setState({eventDuration: parseInt(e.target.value) });
                    }}
                    style={{paddingRight: '20px', textAlign: 'right'}}></input><span style={{marginLeft: '-20px'}}>minutes</span>
                    <label htmlFor="input-event-location">Will the event be held...</label>
                    <select id="input-event-location" onChange={(e) => {
                            this.setState({eventOutside: e.target.value === 'outside' });
                    }}
                    defaultValue={this.state.eventOutside ? 'outside' : 'inside'}>
                        <option value="inside">Inside</option>
                        <option value="outside">Outside</option>
                    </select>
                </form>
                {buttons}
            </div>
        )

        // FIXME: mask percentage value is coming out not right...
        const maskStep = (
            <div>
                <form>
                    <label htmlFor="input-others-mask">Will attendees be wearing masks?</label>
                    <select id="input-others-mask" onChange={(e) => {
                            this.setState({maskWearing: e.target.value === 'yes' });
                        }} defaultValue={this.state.maskWearing ? 'yes' : 'no'}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    <label htmlFor="input-mask-percentage">What percentage of attendees will be wearing masks</label>
                    <input type="number" id="input-mask-percentage" min="0" max="100"  onChange={(e) => {
                        this.setState({maskPercentage: parseInt(e.target.value) / 100 });
                    }} defaultValue={`${Math.round(this.state.maskPercentage * 100)}`}></input>

                    <label htmlFor="input-user-mask">Will you be wearing a mask?</label>
                    <select id="input-user-mask" onChange={(e) => {
                        this.setState({userMaskWearing: e.target.value === 'yes' });
                    }} defaultValue={this.state.userMaskWearing ? 'yes' : 'no'}>
                        <option value="yes" defaultValue>Yes</option>
                        <option value="no">No</option>
                    </select>
                </form>
                {buttons}
            </div>
        )

        const socialDistancingStep = (
            <div>
                <form>
                
                    <label htmlFor="input-social-distance-meters">How many meters will attendees be distancing? (0 for no distancing)</label>
                    <input type="number" id="input-social-distance-meters" min="0" max="15" defaultValue={this.state.socialDistancing} onChange={(e) => {
                        this.setState({socialDistancing: parseInt(e.target.value)});
                    }}></input>
                </form>
                <div className={localStyle.buttonblock}>
                    {backButton}
                    {submitButton}
                </div>
            </div>
        )

        const endStep = (
            <div>
                <p>Quiz ended</p>
                {submitButton}
            </div>
        )

        const content = () => {
            if (this.state.step < 1) 
                return startStep

            switch (this.state.step) {
                case 1: return locationStep
                case 2: return eventStep
                case 3: return maskStep
                case 4: return socialDistancingStep
                default: return endStep
            }
        }

        return (
            <PageFrame gutter="20%">
                <div className={`${localStyle.container}`}>
                    {content()}
                </div>
            </PageFrame>
        )
    }

}

export default Quiz