const path = require('path');

const config = {
	entry: './index',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
};

module.exports = config;
