const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new ProgressBarPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS,
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};

module.exports = config;
