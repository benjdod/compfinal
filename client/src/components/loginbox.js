// this must be imported first for obvious reasons
import React from "react"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"


const loginbox = (props) => {

    const inputs = {
        username: '',
        password: ''
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputs);

        fetch('/auth/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputs),
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.error(err);
        })

        return null;
    }

    return (
        <div className={boxStyle.box}>
            <h1>Log In</h1>
            <form id="login-form">
                <label id="email-label" htmlFor="username">Email:</label><br />
                <input type="text" id="username" onChange={(e) => {inputs.username = e.target.value}}/><br />
                <label id="password-label" htmlFor="password">Password:</label><br />
                {/* password max length == 64 for key gen reasons */}
                <input type="password" id="password" maxLength={64} onChange={(e) => {inputs.password = e.target.value}} /><br />

                {/* we might not be able to have forgot password :( */}
                <p className={boxStyle.forgot}><a href="#">Forgot Password?</a></p>
                <input type="submit" id="login-button" class="button" className={boxStyle.formbutton} value="Login" />
              </form>
              <Link to="/map" class="button">temp button to map</Link>
        </div>
    )
    
}


// export default our component
export default loginbox;