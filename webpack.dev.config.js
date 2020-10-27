const path = require('path');
const webpack = require('webpack');
const HWP = require('html-webpack-plugin');
const ReactRefresh = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'./client/src/entry.js', 
	],
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
				use: [
					{
						loader: 'babel-loader',
						options: {
							"plugins": [
								"react-refresh/babel",
							]
						}
					},
				]
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
		new HWP({
			template: './client/src/tagged-template.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefresh({
			overlay: {
				sockIntegration: 'whm',
			}
		}),
	]
}
