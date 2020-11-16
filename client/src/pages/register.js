import React, { useState } from "react"
import { useHistory  } from "react-router-dom"

import PageFrame from "_components/pageframe"
import Validate from "../../../util/formvalidation"

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
        password: ''
    }

    const [error, setError] = useState('');

    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();

        // returns a string with the first found error,
        // otherwise returns null
        const validate = Validate.register(inputs);


        if (validate) {
            setError(validate);
        }

        
        fetch('/auth/register', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputs),
        }).then(response => {
            console.log(response);
            history.push('/account');
        }).catch(err => {
            console.error(err);
            setError('failed to register user');
        })
        
        return null;
    }

    const errormessage = <p style={{backgroundColor: '#fcc', color: '#f77', display: 'inline-block', padding: '5px', visibility: error ? 'visible' : 'hidden'}}>{error ? error : ''}</p>

    return (
        <PageFrame>
            <div style={{display: 'block', textAlign: 'center'}}>
                <div style={{display: 'inline-block'}}>
                    <form className='children-as-block' onSubmit={submit}>
                        <label htmlFor='input-first-name'>First name</label>
                        <TextInput id='input-first-name' maxLength="127" onChange={(e) => {inputs.firstname = e.target.value;}}/>
                        <label htmlFor='input-last-name'>Last name</label>
                        <TextInput id='input-last-name' maxLength="127" onChange={(e) => {inputs.lastname = e.target.value; }}/>
                        <label htmlFor='input-user-name'>User name</label>
                        <TextInput id='input-user-name' maxLength="127" onChange={(e) => {inputs.username = e.target.value; }}/>
                        <label htmlFor='input-password'>Password</label>
                        <input type='password' id='input-password' type='password' minLength="8" maxLength="255" onChange={(e) => {inputs.password = e.target.value}}/>
                        <button type='submit'>Submit</button>
                    </form>
                    <div>
                        {errormessage}
                    </div>
                </div>
            </div>
            
            
            
        </PageFrame>
    );
}