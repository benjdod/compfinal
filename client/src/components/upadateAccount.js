import React, { useState } from "react"
import { useHistory  } from "react-router-dom"

import PageFrame from "_components/pageframe"
import Validate from "../../../util/formvalidation"
import boxStyle from "../components/modules/boxUpdate.module.css";

// convenience methods

const TextInput = (props) => {

    return <input {...props} 
        maxLength = {props.maxLength || "127"} 
        type='text' 
        spellCheck='false'
        />
}

export default () => {

    // maintain inputs as an object for submission. Each entry will be updated by 
    // its corresponding input on change.
    let inputs = {
        username: '',
        firstname: '',
        lastname: '',
    }

    const [error, setError] = useState('');

    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();

        // lol, a valid password....
        const validate = Validate.register({...inputs, password: 'password!'});

        if (validate) {
            setError(validate);
        }

        fetch('/user/details', {
            method: 'put',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputs),
        }).then(res => {
            console.log(res);
            //window.location.reload();
        }).catch(e => {
            console.error(e);
            alert('could not update user info!');
        })
    }

    const errormessage = <p style={{backgroundColor: '#fcc', color: '#f77', display: 'inline-block', padding: '5px', visibility: error ? 'visible' : 'hidden'}}>{error ? error : ''}</p>

    // STYLE: this needs to be styled in the same way as the login page
    return (

        <div className={boxStyle.box}>
            <h1>Update Account Information</h1>
            <div style={{display: 'inline-block'}}>
                <form className='children-as-block' onSubmit={submit}>
                    <label htmlFor='input-first-name' className={boxStyle.signUpLabel}>First name</label>
                    <TextInput id='input-first-name' maxLength="127" onChange={(e) => {inputs.firstname = e.target.value;}}/>
                    <br />
                    <label htmlFor='input-last-name' className={boxStyle.signUpLabel}>Last name</label>
                    <TextInput id='input-last-name' maxLength="127" onChange={(e) => {inputs.lastname = e.target.value; }}/>
                    <br />
                    <label htmlFor='input-user-name' className={boxStyle.signUpLabel}>User name</label>
                    <TextInput id='input-user-name' maxLength="127" onChange={(e) => {inputs.username = e.target.value; }}/>
                    <br />
                    <button type='submit' className={boxStyle.formbutton}>Submit</button>
                </form>
                <button className={`${boxStyle.formbutton} button`} style={{backgroundColor: '#ee2222', color: 'white'}}>Delete Account</button>
                <div>
                    {errormessage}
                </div>
            </div>
        </div>
            
            
    )
}