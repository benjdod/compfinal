// this must be imported first for obvious reasons
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

// get our css module for this file (you're
// probably gonna have one for most files)
import boxStyle from "./modules/box.module.css"
import { Link } from "react-router-dom"

const loginbox = (props) => {

    const inputs = {
        username: '',
        password: ''
    }

    // one of:
    //      'initial',
    //      'rejected',
    //      'accepted',
    //      'error'     (for server error)
    const [loginState, setLoginState] = useState('initial');

    const history = useHistory();

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
        })
        /*
        .then(res => {
            console.log('transforming authentication response to json');
            return res.json()
        })
        */
        .then(response => {
            console.log(response.status);

            if (response.status !== 200) {
                setLoginState('rejected');
            } else {
                setLoginState('accepted');
                history.push('/account');
            }
        }).catch(err => {
            console.error(err);
            setLoginState('error');
        })

        return null;
    }

    return (
        <div className={boxStyle.box}>
            <h1>Log In</h1>
            <form id="login-form">
                <label id="email-label" htmlFor="username">Username</label><br />
                <input type="text" id="username" onChange={(e) => {inputs.username = e.target.value}}/><br />
                <label id="password-label" htmlFor="password">Password</label><br />
                {/* password max length == 64 for key gen reasons */}
                <input type="password" id="password" maxLength={64} onChange={(e) => {inputs.password = e.target.value}} /><br />

                {/* we might not be able to have forgot password :( */}
                <p className={boxStyle.forgot}><a href="#">Forgot Password?</a></p>
                
                <input type="submit" id="login-button" className="button" className={boxStyle.formbutton} value="Login" onClick={submit}/>                <br/>

                {/* styles for this message based on login state */}
                <p style={{
                    color: '#ff6969',
                    backgroundColor: 'rgba(200,100,100,0.1)',
                    display: 'inline',
                }}>{loginState === 'rejected' ? 'Incorrect username or password' : loginState === 'accepted' ? 'Logged in' : ''}</p>
            </form>
            <Link to="/map" classNme="button">temp button to map</Link>
        </div>
    )
    
}


// export default our component
export default loginbox;