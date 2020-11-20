// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"


const homebox = (props) => {

    const loggedIn = props.loggedIn === true;

    const userData = props.userData;

    console.log(loggedIn, userData);

    const header = loggedIn && userData !== undefined
        ? <h1>Welcome back, {userData.firstname}</h1>
        : <h1>COVID-19 Risk Assessor</h1>


    const innerbuttons = loggedIn 
        ? (
            <div className={`${boxStyle.buttonbox}`}>
                <Link to="/quiz" className="button d-inline-block" >Take a Quiz</Link><br/>
                <Link to="/account" className="button d-inline-block" >Account</Link>
            </div>
        ) : (
            <div className={`${boxStyle.buttonbox}`}>
                <Link to="/register" className="button d-inline-block" >Sign Up</Link><br/>
                <Link to="/login" className="button d-inline-block" >Log In</Link>
            </div>
        )

    return (
        <div className={boxStyle.box}>
            {header}
            {/* TODO: I feel like this needs to be workshopped a little bit. */}
            <p className={boxStyle.intro}>Welcome to our website, where you can learn more about the COVID-19 risk in your area.</p>
            {innerbuttons}
        </div>
    )
    
}


// export default our component
export default homebox;