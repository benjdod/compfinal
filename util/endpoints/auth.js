const token = require('../auth/token');
const password = require('../auth/password');
const database = require('../database');
const { derivePasswordKey, encrypt, decryptToString, generateUserKey } = require('../crypt');
const { listRoutes } = require('./index');

const express = require('express');
const router = express.Router();

router.get('/', listRoutes(router));

// get a cookie that doesn't work!
router.get('/getcookie', (req,res) => {

    // free cookie for you!

    res.cookie('auth_token', token.sign(9, 'fakeuserkey'))
    .send('free auth cookie for you!');
});

router.post('/login', async (req,res) => {
    const body = req.body;

    if (body.username === undefined || body.password === undefined) {
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
            res.cookie('auth_token', token.signUser(user.id, decryptToString(user.key, derivePasswordKey('password'))))
            .send('successfully sent authentication token to user');
        } else {
            res.status(401).send('incorrect credentials');
        }
    } catch (e) {
        res.status(500).send(`Internal server error (${e.message})`);
    }

})

router.post('/ping', (req,res) => {
    if (req.cookies['auth_token'])
        token.verifyUser(req.cookies.auth_token, () => {
            res.send('success');
        }, () => {
            res.status(401).send('incorrect credentials')
        })
    else 
        res.status(400).send('no credentials');
})

router.post('/register', async (req,res) => {

    // takes a request with the new user info in the body, 
    // and adds them to the users db

    const inputs = req.body;

    if (!inputs.username || !inputs.firstname || !inputs.lastname || !inputs.password) {
        res.status(400).send(null)
        return;
    }

    const hash = await password.hash(req.body.password);

    const masterKey = generateUserKey();
    const passKey = derivePasswordKey(inputs.password);
    const encMaster = encrypt(masterKey, passKey);

    database.insertUser(inputs.username, inputs.firstname, inputs.lastname, hash, encMaster)
        .then(() => database.getUser(inputs.username))
        .then(user => {
            const unencryptedMaster = decryptToString(user.key, passKey)
            console.log('signing with key: ', unencryptedMaster);
            res.cookie('auth_token', token.signUser(user.id, decryptToString(user.key, passKey))).send('successfully added user')
        })
        .catch(e => {
            console.error(e);
            res.status(500).send('failed to add user');

        })

})

// sandbox auth routes
router.all('*', (req,res) => {
    res.status(404).send(`<code>404: not found</code>`);
})

module.exports = router;