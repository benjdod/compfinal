const express = require('express');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const path = require('path');
const app = express();
const localport = process.env.PORT || 3000;
const webpackConfig = require(path.resolve(__dirname, './webpack.config.js'))
const compiler = webpack(webpackConfig);

// serve files from the webpack dist
//app.use(express.static('client/dist'));

app.use(wdm(compiler, {}));


app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})


app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));
