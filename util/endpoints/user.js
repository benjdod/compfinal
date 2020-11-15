const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../auth/token');
const { listRoutes } = require('./index');
const { getQuizzes } = require('../database');

// authenticate all routes
// this also populates req.jwtPayload
router.use(authenticateUser);

router.get('/', listRoutes(router));

router.get('/reflectjwt', (req,res) => {
    res.json(req.jwtPayload);
})

router.get('/quizzes', async (req,res) => {
    try {
        const masterKey = req.jwtPayload.k;
        const quizzes = await getQuizzes(req.jwtPayload.u, masterKey);
        res.json(quizzes);
    } catch (e) {
        console.error(e);
        res.status(500).send(`server error: ${e}`);
    }
})

module.exports = router;