// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"


const homebox = () => {

    return (
        <div className={boxStyle.box}>
            <h1>COVID-19 Tracker</h1>
            <p className={boxStyle.intro}>Welcome to our COVID-19 Tracker, where you can get the most up to date information on the health risk in your area.</p>
            
            <div>
                <Link to="/register" class="button d-inline-block" >Sign Up</Link><br/>
                <Link to="/login" class="button d-inline-block" >Log In</Link>
            </div>
            
        </div>
    )
    
}


// export default our component
export default homebox;