const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');

const auth = require('./util/auth');
const database = require('./util/database');
const password = require('./util/password')

const app = express();

// process.env.PORT is how Heroku gives our app
// an endpoint, so use it if it exists. 
const localport = process.env.PORT || 3000;

// just serve files from the webpack build for client...
app.use(express.static('client/dist'));

app.use(cookieparser());	// req.cookies
app.use(express.json())		// req.body


/* THESE ARE FOR DEVELOPMENT */

// auth endpoints

app.get('/auth/getcookie', (req,res) => {

	// free cookie for you!

	res.cookie('auth_token', auth.sign(2))
	.send('sent auth cookie');
});

app.post('/auth/authenticate', (req,res) => {

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

	res.cookie('auth_token', sign(uid))
		.send('success');
})

app.post('/auth/user/add', async (req,res) => {

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
		res.status(200).send('success');
	} else {
		res.status(500).send('failed to add user');
	}
})

app.get('/reflect', auth.middleware, (req,res) => {
	res.json(req.jwtPayload);
})

app.get('/user', auth.middleware, async (req,res) => {
	const result = await database.getByUID(req.jwtPayload.u);

	if (!result) {
		res.status(404).send(null);
	} else {
		res.json(result[0]);
	}
})

// test endpoints
app.get('/test/getuser/:uid', async (req,res) => {
	const user = await database.getByUID(req.params.uid);
	console.log(user[0]);
	res.send(`${user.length ? user[0].username : 'no users match the specified uid'}`)
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

/* END DEVELOPMENT */


// and then send any request to the index page (routing is handled by React)
app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})

// start up our server
app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));