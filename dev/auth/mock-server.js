const express = require('express');

const auth = require('./auth-middleware');
const cookieparser = require('cookie-parser');

const app = express();

app.use(cookieparser());

app.get('/', (req,res) => {
    res.send('Mock authentication server.\nVisit <a href="/cookie"><code>/cookie</code></a> to get the cookie token, then visit <a href="/restricted"><code>/restricted</code></a> to see user content.');
})

app.get('/cookie', (req,res) => {
    res.cookie('authcookie', 'bunnies', {
        maxAge: 1000 * 60 * 10,     // expires in 10 minutes
        httpOnly: true,             // can only be used in HTTP requests
    }).send(`sent auth cookie along with this response. You can check your browser storage to see it.<br>
    Now you can go to <a href="/restricted"><code>/restricted</code></a> to see user content.`);
})

// add auth as middleware to deflect bad requests.
app.get('/restricted', auth, (req,res) => {
    res.send('You are logged in and this is some user content. <br><a href="/">Go home</a>.');
})

app.listen(3000, () => {console.log(`mock auth server up and running on port 3000. 
Ctrl+C to stop.`)})