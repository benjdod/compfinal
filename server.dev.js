const express = require('express');
const webpack = require('webpack');
const wdm = require('webpack-dev-middleware');
const whm = require('webpack-hot-middleware');
const path = require('path');
const app = express();
const localport = process.env.PORT || 3000;
const webpackConfig = require(path.resolve(__dirname, './webpack.dev.config.js'))
const compiler = webpack(webpackConfig);

/* this server, instead of serving the built files in client/dist,
* uses webpack-dev-middleware to serve the compiled files 
* from memory. */

app.use(wdm(compiler, {
	// set this to false if it seems like something's broken and check the console
	noInfo: true, 	
	publicPath: webpackConfig.output.publicPath,
}));

app.use(whm(compiler));

app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
})


app.listen(localport, () => console.log(`Express server up and listening on port ${localport}!\nPress Ctrl+C to stop`));