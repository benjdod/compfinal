// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"


const homebox = (props) => {

    const loggedIn = props.loggedIn === true;

    const userData = props.userData;

    const header = loggedIn && userData !== undefined
        ? <h1>Welcome back, {userData.firstname}</h1>
        : <h1>COVID-19 Risk Assessor</h1>


    const innerbuttons = loggedIn 
        ? (
            <div className={`${boxStyle.buttonbox}`}>
                <Link to="/quiz" className="button d-inline-block greenBtn">Take a Quiz</Link><br/>
                <Link to="/account" className="button d-inline-block">Account</Link>
            </div>
        ) : (
            <div className={`${boxStyle.buttonbox}`}>
                <Link to="/register" className="button d-inline-block greenBtn">Sign Up</Link><br/>
                <Link to="/login" className="button d-inline-block">Log In</Link>
            </div>
        )

    return (
        <div className={boxStyle.box}>
            {header}
            <p className={boxStyle.intro}>Welcome to the COVID-19 Risk Assessor, where you can get a risk estimate of catching COVID-19 at your upcoming event.</p>
            {innerbuttons}
        </div>
    )
    
}


// export default our component
export default homebox;