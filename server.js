const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');

const token = require('./util/auth/token');
const password = require('./util/auth/password');

const database = require('./util/database');

const app = express();

// process.env.PORT is how Heroku gives our app
// an endpoint, so use it if it exists. 
const localport = process.env.PORT || 3000;

// just serve files from the webpack build for client...
app.use(express.static('client/dist'));

app.use(cookieparser());	// req.cookies
app.use(express.json())		// req.body


// auth endpoints

app.get('/auth/getlogincookie', (req,res) => {

	// free cookie for you!

	res.cookie('auth_token', token.sign(9, 'fakeuserkey'))
	.send('free auth cookie for you!');
});

app.post('/auth/login', (req,res) => {

	const body = req.body;

	if (!body.username || !body.password) {
		res.status(400).send(null);
		return;
	}

	const user = database.getUser(body.username);

	if (!user) {
		res.status(400).send(null);
		return;
	}

	console.log(password.compare(body.password, user.passhash));

	res.cookie('auth_token', token.sign(uid))
		.send('successfully sent authentication token to user');
})

app.post('/auth/register', async (req,res) => {

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
app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));