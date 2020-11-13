// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"


const loginbox = (props) => {

    return (
        <div className={boxStyle.box}>
            <h1>Log In</h1>
            <form id="login-form">
                <label id="email-label">Email:</label><br />
                <input type="text" id="username" /><br />
                <label id="password-label">Password:</label><br />
                <input type="password" id="password" /><br />
                <p className={boxStyle.forgot}><a href="#">Forgot Password?</a></p>
                <input type="submit" id="login-button" class="button" className={boxStyle.formbutton} value="Login" />
              </form>
              <Link to="/map" class="button">temp button to map</Link>
        </div>
    )
    
}


// export default our component
export default loginbox;