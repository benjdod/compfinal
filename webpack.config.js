const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
	entry: './client/src/entry.js',
	mode: 'production',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './client/dist'),
		publicPath: '/',
	},

	resolve: {
		alias: {
			_components: path.resolve(__dirname, './client/src/components'),
			_util: path.resolve(__dirname, './util'),
		}
	},
	
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(gif|jpe?g|png)$/i,
				exclude: [
					'/node_modules/'
				],
				use: 'file-loader',
			},
			{
				test: /\.css$/i,
				exclude: [
					'/node_modules/',
					/\.module\.css$/i,
				],
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.module\.css$/i,
				exclude: '/node_modules/',
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						}						
					}
				]
			}
		]
	},

	plugins: [
		new HWP({template: './client/src/template.html'}),
	]
}
