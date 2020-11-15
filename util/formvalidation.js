/**
 * Validates a username string
 * @param {string} username The username to be validated
 * @returns {(string|null)} returns a string containing the error if invalid, null if valid.
 */
const username = (username) => {

    if (username.indexOf(' ') != -1) {
        return 'Username cannot contain spaces!';
    } 

    return null;
}

const nameChars = (name) => {
    const reg = name.match(/^([A-Za-z\u00c0-\u00ff]+[ -]?)+$/);
    if (!reg) {
        return true;
    } else if (reg.length != 2)
        return true;
    else 
        return false;
}

const firstName = (name) => {

    if (name == '') {
        return 'First name cannot be empty!'
    }

    if (nameChars(name)) {
        return 'First name is not formatted correctly!'
    } 

    return null;
}

const lastName = (name) => {
    if (name == '') {
        return 'Last name cannot be empty!'
    }

    if (nameChars(name)) {
        return 'Last name is not formatted correctly!'
        
    } 

    return null;
}

const password = (password) => {

    // limit length for security and key generation 

    if (password.length === 0) {
        return 'Please enter a password'
    }
    
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }

    if (password.length > 64) {
        return 'Password length is limited to 64 characters';
    }

    return null;
}

const register = (inputs) => {
    return username(inputs.username) || firstName(inputs.firstName) || lastName(inputs.lastName) || password(inputs.password);
}

const login = (inputs) => {
    return username(inputs.username) || password(inputs.password);
}

module.exports = {
    username: username,
    name: nameChars,
    firstName: firstName,
    lastName: lastName,
    password: password,
    register: register,
    login: login,
}
