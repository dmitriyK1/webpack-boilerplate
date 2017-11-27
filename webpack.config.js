const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: false,  // required
      template: require('html-webpack-template'),
      appMountId: 'root',
      title: "TADAMUS",
      meta: [
        {
          name: 'description',
          content: 'Very important page!'
        }
      ],
    })
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
