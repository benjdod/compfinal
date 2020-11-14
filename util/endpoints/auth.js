const token = require('../auth/token');
const password = require('../auth/password');
const database = require('../database');
const crypt = require('../crypt');

const express = require('express');
const router = express.Router();

// utility to get a cookie
router.get('/getcookie', (req,res) => {

    // free cookie for you!

    res.cookie('auth_token', token.sign(9, 'fakeuserkey'))
    .send('free auth cookie for you!');
});

router.post('/login', async (req,res) => {
    const body = req.body;

    if (!body.username || !body.password) {
        res.status(400).send(null);
        return;
    }

    try {

        const user = await database.getUser(body.username);

        if (!user) {
            res.status(404).send('user not found');
            return;
        }

        const passwordMatch = await password.compare(body.password, user.passhash);
        if (passwordMatch) {
            res.cookie('auth_token', token.sign(user.uid))
            .send('successfully sent authentication token to user');
        } else {
            res.status(401).send('incorrect credentials');
        }
    } catch (e) {
        res.status(500).send(`Internal server error (${e.message})`);
    }

})

router.post('/auth/register', async (req,res) => {

    // takes a request with the new user info in the body, 
    // and adds them to the users db

    const inputs = req.body;

    if (!inputs.username || !inputs.firstname || !inputs.lastname || !inputs.password) {
        res.status(400).send(null)
        return;
    }

    const hash = await password.hash(req.body.password);

    const ins = await database.insertUser(inputs.username, inputs.firstname, inputs.lastname, hash);

    if (ins) {
        res.status(200).send('successfully added user');
    } else {
        res.status(500).send('failed to add user');
    }
})

// sandbox auth routes
router.all('*', (req,res) => {
    res.status(404).send(`<code>404: not found</code>`);
})

module.exports = router;