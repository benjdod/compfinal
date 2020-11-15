const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');

const authEndpoints = require('./util/endpoints/auth');
const userEndpoints = require('./util/endpoints/user');
const adminEndpoints = require('./util/endpoints/admin');
const apiEndpoints = require('./util/endpoints/api');

const app = express();

// Heroku sets the app's port in an environment variable,
// so use that or 3000
const port = process.env.PORT || 3000;

// just serve files from the webpack build for client...
app.use(express.static('client/dist'));

app.use(cookieparser());	// req.cookies
app.use(express.json())		// req.body

app.use('/auth', authEndpoints);
app.use('/user', userEndpoints);
app.use('/admin', adminEndpoints);
app.use('/api', apiEndpoints)

// and then send any other request to React
app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})

// finally, start up the server
app.listen(port, () => console.log(`Express server up and listening on port ${port}!\nPress Ctrl+C to stop`));