const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth/token');
const { listRoutes } = require('./index');
const { getQuizzes, insertQuiz, getByUID, getQuiz, deleteQuiz, updateUser, deleteQuizzes, deleteByUID } = require('../database');

const cache = require('../data/sourcecache');
const source = require('../data/sourcemethods');

// this is authentication middleware for all routes under /user
// basically, for every route, the client must first have their 
// token authenticated as a user! Every request passes through this first
// and if their token doesn't check out, this sends a 401 (unauthorized)
// and ends the response chain. This should probably be documented.

// this also populates req.jwtPayload
router.use(authenticateUser);

// don't document. lists routes for users and available methods
router.get('/', listRoutes(router));

// deletes the current user and all associated data. 
router.delete('/', async (req,res) => {
    try {
        await deleteQuizzes(req.jwtPayload.u);
        await deleteByUID(req.jwtPayload.u);
        res.clearCookie('auth_token').send('successfully deleted user');
    } catch (e) {
        console.error(e);
        res.status(500).send('could not delete user');
    }
})

// checks to see if the client is logged in as a user
// (essentially if we pass the authorization middleware up top,
// we'll get here and it'll return text saying 'success' and a 200 code)
router.get('/ping', (req,res) => {
    // if we get here, the response didn't fail at authenticateUser, 
    // so we just need to send a dummy message
    res.send('success');
})

// reflects the contents of the user's decoded authentication token
router.get('/reflectjwt', (req,res) => {
    res.json(req.jwtPayload);
})

// returns the user's account details (fisrt, last, username)
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

// updates the user's account details from an inuts object in
// the request body. Note that only provided fields will be updated!
// (e.g. if the request body were {username: 'billy'}, only the username 
// would be updated)
router.put('/details', async (req,res) => {
    const inputs = req.body;
    console.log(inputs);
    updateUser(req.jwtPayload.u, inputs).then(response => {
        console.log(response);
        res.send('success');
    }).catch(e => {
        console.error(e);
        res.status(500).send('could not update user details');
    })
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

// returns an array of all the user's quizzes
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

// returns one of the users's quizzes which matches the provided quizid.
// note that the quizid is an auto-incrementing key which is  global to the 
// database and not local to each user, so their quizzes don't go (1,2,3,4,5,....)
// and if they don't have any quizzes with a given id, a 404 will be returned. 
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

// deletes the users' quiz with the specified quiz id. See above!
router.delete('/quizzes/:quizid', async (req,res) => {
    deleteQuiz(req.jwtPayload.u, req.params.quizid)
        .then(response => {
            if (response)
                res.send(`successfully deleted quiz ${req.params.quizid}`);
            else 
                throw new Error('database could not remove quiz');
        }).catch(e => {
            console.error(e);
            res.status(500).send(`could not delete quiz ${req.params.quizid}`);
        })
})

// adds a quiz result to the user account. 
router.post('/quizzes', async (req, res) => {
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