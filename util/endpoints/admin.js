const express = require('express');
const router = express.Router();
const { sign, verify } = require('../auth/token.js');
const database = require('../database');
const { listRoutes } = require('./index');

const adminkey = 'bingobango';

router.use((req,res,next) => {

    if (req.path.indexOf('/login') !== -1) {
        next();
        return;
    }

    if (req.cookies['admin_token']) {
        verify(req.cookies.admin_token, adminkey, () => {
            next();
        }, () => {
            res.status(401).send('not logged in as an admin.')
        })
    } else {
        res.status(401).send('not logged in as an admin.');
    }
})

router.get('/', listRoutes(router));

router.get('/login', (req, res) => {
    res.cookie('admin_token', sign({k:'admingang'}, adminkey, 60*5))
        .send(`successfully logged in as admin. your access will expire in 5 minutes. use your power wisely and safely!`);
})

router.get('/login/:minutes', (req, res) => {
    res.cookie('admin_token', sign({}, adminkey, 60*req.params.minutes))
        .send(`successfully logged in as admin. your access will expire in <strong>${req.params.minutes} minutes.</strong> use your power wisely and safely!`);
})

router.get('/logout', (req,res) => {
    res.cookie('admin_token', sign({}, adminkey, 0))
        .send('Expired your admin token. Thank you for being safe and logging out!');
})

router.get('/users', async (req, res) => {
    try {
        const users = await database.getAllUsers();
        res
            .header('Content-Type: application/json')
            .send(`<pre>${JSON.stringify(users, null, 2)}</pre>`);
    } catch (e) {
        res.status(500)
            .send('could not get users');
    }
})
router.get('/users/:id', async (req, res) => {
    try {
        const user = await database.getByUID(req.params.id);
        res
            .header('Content-Type: application/json')
            .send(`<pre>${JSON.stringify(user, null, 2)}</pre>`);
    } catch (e) {
        res.status(500)
            .send('could not get users');
    }
})
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await database.getAllEncryptedQuizzes();
        res
            .header('Content-Type: application/json')
            .send(`<pre>${JSON.stringify(quizzes, null, 2)}</pre>`);
    } catch (e) {
        res.status(500)
            .send('could not get quizzes');
    }
})
router.get('/quizzes/:id', async (req, res) => {
    try {
        const quizzes = await database.getEncryptedQuizzes(req.params.id);
        res
            .header('Content-Type: application/json')
            .send(`<pre>${JSON.stringify(quizzes, null, 2)}</pre>`);
    } catch (e) {
        res.status(500)
            .send('could not get users');
    }
})

router.all('*', (req,res) => {
    res.status(404).send(`<code>404: not found. You shouldn't be here anyway unless you know what you're up to...</code>`);
})

module.exports = router;