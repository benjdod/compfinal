const path = require('path');

module.exports = {
	entry: './client/src/router.js',
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './client/dist'),
		publicPath: '/',
	},
	
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}
