const express = require('express');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const cookieparser = require('cookie-parser');
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

// you could also use this one if you don't want the whole directory stack
// in the url. Up to you!
// app.use('/julias', express.static('misc/julias-html'));

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


app.get('/auth/login', (req,res,next) => {
	res.cookie('auth_token', auth.sign(2));
	next();
}, reactEndpoint);

app.get('*', reactEndpoint);

app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));
