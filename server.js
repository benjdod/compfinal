const express = require('express');
const localport = process.env.PORT || 3000;
const app = express();

// serve files from the webpack dist
app.use('/public', express.static('client/dist'));


/*
app.get('/', (req,res) => {
	res.sendFile('./client/dist/index.html');
})
*/

app.listen(localport, () => console.log(`express up and listening on port ${localport}`));
