const express = require('express');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const path = require('path');

const auth = require('./util/auth');
const database = require('./util/database');

const app = express();
const localport = process.env.PORT || 3000;
const webpackConfig = require(path.resolve(__dirname, './webpack.dev.config.js'))
const compiler = webpack(webpackConfig);

/* this server, instead of serving the built files in client/dist,
* uses webpack-dev-middleware to serve the compiled files 
* from memory. */

// serves all files from the misc folder if we want them
app.use('/misc', express.static('misc'));

// populate req.cookies
app.use(cookieparser());
// populate req.body
app.use(express.json())

app.use(wdm(compiler, {
	// set this to false if it seems like something's broken and check the console
	noInfo: true, 	
	publicPath: webpackConfig.output.publicPath,
}));

app.use(whm(compiler));

const reactEndpoint = (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
}

// api endpoints
app.get('/profile', async (req, res) => {
	console.log('cookies: ', req.cookies);
	if (req.cookies['auth_token']) {
		auth.verify(req.cookies.auth_token, async (decoded) => {
			const result = await database.getByUID(decoded.u);
			console.log(result);
			res.json(result);
		})
	} else {
		res.send('invalid authentication');
	}
});

// auth endpoints
app.get('/auth/login', (req,res,next) => {
	res.cookie('auth_token', auth.sign(2));
	next();
}, reactEndpoint);

// takes a request with the new user info in the body, 
// and adds them to the users db
app.post('/auth/register', (req,res,) => {
	const inputs = req.body;
	res.send('success');
})

// test endpoints
app.get('/test/getuser/:uid', async (req,res) => {
	const user = await database.getByUID(req.params.uid);
	console.log(user);
	res.send(`${user.length ? user : 'no users match the specified uid'}`)
})

app.get('/test/checkuser/:username', async (req,res) => {
	const taken = database.checkUser(req.params.username);
	console.log(taken);
	res.send(`${req.params.username} is ${taken ? 'taken' : 'available'}`)
})

// any other request goes to the React SPA to handle
app.get('*', reactEndpoint);

app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));
