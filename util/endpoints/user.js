const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth/token');
const { listRoutes } = require('./index');
const { getQuizzes, insertQuiz, getByUID } = require('../database');

const cache = require('../sourcecache');

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
        const quizzes = await getQuizzes(req.jwtPayload.u, masterKey);
        const fipsLUT = await cache.get('censuspops');
        console.log(fipsLUT[1][0]);
        const out = quizzes.map(quiz => {
            // FIXME: define one place for the changeover from string fips to number fips
            const f = fipsLUT.find(row => row[0] === quiz.fips.toString().padStart(5,"0"))
            console.log(f);
            return {
                ...quiz,
                county: f[2],
                state: f[3],
            }
        })
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