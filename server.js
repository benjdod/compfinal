const express = require('express');

const app = express();

const localport = process.env.PORT || 3000;

app.get('/', (req,res) => {
	res.send('hello from express');
})

app.listen(localport, () => console.log(`express up and listening on port ${localport}`));
