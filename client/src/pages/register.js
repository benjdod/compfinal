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

    const submit = (e) => {
        e.preventDefault();
        setError('no submission possible');
        return null;
    }

    // validations

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

    const [error, setError] = useState('');

    const errormessage = <p style={{backgroundColor: '#fcc', color: '#f77', display: 'inline-block', padding: '5px', visibility: error ? 'visible' : 'hidden'}}>{(error !== '') ? error : ''}</p>

    return (
        <PageFrame>
            <div style={{display: 'block', textAlign: 'center'}}>
                <div style={{display: 'inline-block'}}>
                    <form className='children-as-block' onSubmit={submit}>
                        <label htmlFor='input-first-name'>First name</label>
                        <TextInput id='input-first-name' maxLength="127" onChange={(e) => {validateFirstName(e.target.value)}}/>
                        <label htmlFor='input-last-name'>Last name</label>
                        <TextInput id='input-last-name' maxLength="127" onChange={(e) => {validateLastName(e.target.value)}}/>
                        <label htmlFor='input-user-name'>User name</label>
                        <TextInput id='input-user-name' maxLength="127" onChange={(e) => {validateUsername(e.target.value)}}/>
                        <label htmlFor='input-password'>Password</label>
                        <input type='password' id='input-password' type='password' minLength="8" maxLength="255"/>
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