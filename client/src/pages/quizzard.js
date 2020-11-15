import React, { useState } from "react"

const min = (a,b) => {
    return a < b ? a : b;
}

const max = (a,b) => {
    return a > b ? a : b
}

// this is the quiz form, divided up into multiple parts
export default () => {

    // normally, React renders a component once per 
    // insertion into the DOM, so we can't change any values 
    // after that render. So we have to hook into the component's 
    // lifecycle.
    // So we'll create a variable called 'step' using a useState hook.
    // React watches this variable and re-renders the whole
    // component if it's changed.
    // see also: https://reactjs.org/docs/hooks-state.html
    
    const [step, setStep] = useState(0);

    // now we can use the state variable, 'step' to switch the 
    // page content based on its value...

    const content = () => {
        if (step < 1) 
            return <p>Start quiz</p>

        switch (step) {
            case 1:
                return <p>Loction</p>
            case 2:
                return <p>Step 2</p>
            default:
                return <p>Quiz done</p>
        }
    }

    const inputs = {
        latitude: 0,        // float
        longitude: 0,       // float
        eventSize: 0,       // int: number of attendees
        eventDuration: 0,   // int: duration in minutes
        eventOutside: false,
        maskWearing: false,
        maskPercentage: 0,  // float: mask percentage from 0 to 1
        socialDistancing: 0,    // int: meters of social distancing, 0 for no distancing
    }

    return (
        <div>
            {content()}
            <button onClick={() => {setStep(step+1)}}>Next</button>
            <button onClick={() => {setStep(max(step-1,0))}}>Back</button>
        </div>
    )
}