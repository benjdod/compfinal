const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');

const token = require('./util/auth/token');
const password = require('./util/auth/password');

const authEndpoints = require('./util/endpoints/auth');

const database = require('./util/database');

const app = express();

// Heroku sets the app's port in an environment variable,
// so use that or 3000
const port = process.env.PORT || 3000;

// just serve files from the webpack build for client...
app.use(express.static('client/dist'));

app.use(cookieparser());	// req.cookies
app.use(express.json())		// req.body

app.use('/auth', authEndpoints)

// user-restricted endpoints

app.get('/reflectjwt', token.authenticate, (req,res) => {
	res.json(req.jwtPayload);
})

app.get('/user', token.authenticate, async (req,res) => {

	// returns the currently logged in user's account data

	const result = await database.getByUID(req.jwtPayload.u);

	if (!result) {
		res.status(404).send(null);
	} else {
		console.log(result);
		res.json(result);
	}
})

// test endpoints
app.get('/test/getuser/:uid', async (req,res) => {
	const user = await database.getByUID(req.params.uid);

	if (user.length) {
		res.json(user[0])
	} else {
		res.json({
			message: 'no user found'
		})
	}
})

app.get('/test/checkuser/:username', async (req,res) => {
	const taken = await database.checkUser(req.params.username);
	console.log(taken);
	res.send(`${req.params.username} is ${taken ? 'taken' : 'available'}`)
})

app.get('/test/getuser/:username', async (req,res) => {

	const user = await database.getUser(req.params.username);
	
	if (!user) res.send('user not found');

	res.json(user);
	
})


// and then send any other request to React
app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})

// finally, start up the server
app.listen(port, () => console.log(`Express server up and listening on port ${port}!\nPress Ctrl+C to stop`));