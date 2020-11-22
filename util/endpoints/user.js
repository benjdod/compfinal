const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth/token');
const { listRoutes } = require('./index');
const { getQuizzes, insertQuiz, getByUID, getQuiz, deleteQuiz } = require('../database');

const cache = require('../data/sourcecache');
const source = require('../data/sourcemethods');

// authenticate all routes
// this also populates req.jwtPayload
router.use(authenticateUser);

router.get('/', listRoutes(router));


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
            createdAt: new Date(user.timecreated),
        }))
        .catch(e => {
            console.error(e);
            res.status(500).send('500: could not get user info due to a server error')
        })
})

router.put('/details', async (req,res) => {
    
})

const addQuizFields = async (quizzes) => {

    if (!quizzes) return null;

    const quizzesToProcess = (Array.isArray(quizzes))
        ? quizzes : [quizzes];

    try {
        const fipsLUT = await cache.get('censuspops');
        const out = quizzesToProcess.map(quiz => {
            const countyState = source.fipsToCountyState(quiz.fips, fipsLUT);
            return {
                ...quiz,
                ...countyState,
            }
        }).filter(r => r !== null);
        return out;
    } catch (e) {
        console.error(e);
        return null;
    }
}

router.get('/quizzes', async (req,res) => {
    try {
        const quizzes = await getQuizzes(req.jwtPayload.u, req.jwtPayload.k);
        const out = await addQuizFields(quizzes);
        res.json(out);
    } catch (e) {
        console.error(e);
        res.status(500).send(`server error: could not get quizzes`);
    }
})

router.get('/quizzes/:quizid', async (req,res) => {
    try {
        const masterKey = req.jwtPayload.k;
        const quiz = await getQuiz(req.jwtPayload.u, req.params.quizid, masterKey);
        if (!quiz) {
            res.status(404).send(`404: no quiz with id ${req.params.quizid} is associated with the currently logged in user`);
            return;
        }
        const out = await addQuizFields(quiz);
        res.json(out[0]);
    } catch (e) {
        console.error(e);
        res.status(500).send(`server error: could not get quiz`);
    }
})

router.delete('/quizzes/:quizid', async (req,res) => {
    deleteQuiz(req.jwtPayload.u, req.params.quizid, res.jwtPayload.k)
        .then(response => {
            console.log(response);
            res.send(`successfully deleted quiz ${req.params.quizid}`);
        }).catch(e => {
            console.error(e);
            res.status(500).send(`could not delete quiz ${req.params.quizid}`);
        })
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