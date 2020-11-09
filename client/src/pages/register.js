import React, { useState } from "react"

import PageFrame from "../components/pageframe"

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

    // validations

    const [error, setError] = useState('');

    const validateUsername = (username) => {

        if (username.indexOf(' ') != -1) {
            setError('Username cannot contain spaces!');
            return;
        } 

        if (username.length > 127) {
            setError('Username cannot be more than 127 letters long');
            return;
        }

        setError('');
    }

    // FIXME: this is bad...
    // this match function shouldn't be returning two matches, but whatever
    const validateNameChars = (name) => {
        const reg = name.match(/^([A-Za-z\u00c0-\u00ff]+[ -]?)+$/);
        if (!reg) {
            return false;
        } else if (reg.length != 2)
            return false;
        else 
            return true;
    }

        // usable for first and last name, allows hyphenation and such...
    const validateFirstName = (name) => {

        if (name == '') {
            setError('First name cannot be empty!');    
            return;
        }

        if (!validateNameChars(name)) {
            setError('First name is not formatted correctly!');
            return;
        } 

        setError('');
    }

    const validateLastName = (name) => {
        if (name == '') {
            setError('Last name cannot be empty!');    
            return;
        }

        if (!validateNameChars(name)) {
            setError('Last name is not formatted correctly!');
            return;
        } 

        setError('');
    }

    const submit = (e) => {
        e.preventDefault();
        setError('got it...');
        console.log(inputs);

        fetch('/auth/register', {
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

    const errormessage = <p style={{backgroundColor: '#fcc', color: '#f77', display: 'inline-block', padding: '5px', visibility: error ? 'visible' : 'hidden'}}>{(error !== '') ? error : ''}</p>

    return (
        <PageFrame>
            <div style={{display: 'block', textAlign: 'center'}}>
                <div style={{display: 'inline-block'}}>
                    <form className='children-as-block' onSubmit={submit}>
                        <label htmlFor='input-first-name'>First name</label>
                        <TextInput id='input-first-name' maxLength="127" onChange={(e) => {inputs.firstname = e.target.value; validateFirstName(inputs.firstname)}}/>
                        <label htmlFor='input-last-name'>Last name</label>
                        <TextInput id='input-last-name' maxLength="127" onChange={(e) => {inputs.lastname = e.target.value; validateLastName(inputs.lastname)}}/>
                        <label htmlFor='input-user-name'>User name</label>
                        <TextInput id='input-user-name' maxLength="127" onChange={(e) => {inputs.username = e.target.value; validateUsername(inputs.username)}}/>
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