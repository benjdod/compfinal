const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

// process.env.PORT is how Heroku gives our app
// an endpoint, so use it if it exists. 
const localport = process.env.PORT || 3000;

// just serve files from the webpack build for client...
app.use(express.static('client/dist'));

// and then send any request to the index page (routing is handled by React)

app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})

// start up our server
app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));