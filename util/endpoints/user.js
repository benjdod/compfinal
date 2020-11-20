const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth/token');
const { listRoutes } = require('./index');
const { getQuizzes, insertQuiz, getByUID } = require('../database');

const cache = require('../data/sourcecache');
const source = require('../data/sourcemethods');

// authenticate all routes
// this also populates req.jwtPayload
router.use(authenticateUser);

router.get('/', listRoutes(router));

/**
 * 
 */
router.get('/ping', (req,res) => {
    // if we get here, the response didn't fail at authenticateUser, 
    // so we just need to send a dummy message
    res.send('success');
})

router.get('/reflectjwt', (req,res) => {
    res.json(req.jwtPayload);
})

router.get('/details', async (req,res) => {
    getByUID(req.jwtPayload.u)
        .then(user => res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            createdAt: user.timecreated,
        }))
        .catch(e => {
            console.error(e);
            res.status(500).send('500: could not get user info due to a server error')
        })
})

router.get('/quizzes', async (req,res) => {
    try {
        const masterKey = req.jwtPayload.k;
        console.log(masterKey);
        const quizzes = await getQuizzes(req.jwtPayload.u, req.jwtPayload.k);
        console.log(quizzes);
        const fipsLUT = await cache.get('censuspops');
        const out = quizzes.map(quiz => {
            const countyState = source.fipsToCountyState(quiz.fips, fipsLUT);
            return {
                ...quiz,
                ...countyState,
            }
        }).filter(r => r !== null);
        console.log(out);
        res.json(out);
    } catch (e) {
        console.error(e);
        res.status(500).send(`server error: ${e}`);
    }
})

router.post('/addquiz', async (req, res) => {
    const uid = req.jwtPayload.u;
    const masterKey = req.jwtPayload.k;
    const data = req.body;

    console.log('/user addquiz data: ', data);

    console.log(masterKey);

    insertQuiz(uid, masterKey, data)
        .then(() => {
            res.send('success');
        })
        .catch(e => {
            console.error(e);
            res.status(500).send('could not add quiz result');
        })
})

module.exports = router;