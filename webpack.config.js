const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');
// new CleanWebpackPlugin(['build']),

const config = {
  // This is the best option for development because it is the smallest option that shows the correct line number
  // No .map file emitted and the bundle.js file size is increased
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    stats: 'errors-only',
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080,
    overlay: true,
  },

  entry: { bundle: './src', },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js', // take name of each entry point and use it as a filename
    chunkFilename: '[name].[chunkhash].js', // name template for chunks loaded via dynamic imports
  },

  plugins: [
    new ProgressBarPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // save all common code from all entries into vendor.js file
      // if resource pathname has 'node_modules' substring in it - put it into vendor.js
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),

    // extract the webpack bootstrap logic into a separate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // inline manifest chunk into html to avoid another http request & set defer attribute to script tags
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
      inline: 'manifest',
      sync: 'manifest',
    }),

    // Plugin to replace a standard webpack chunkhash with md5
    // Need this plugin for deterministic hashing
    // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
    // for more info: https://webpack.js.org/how-to/cache/
    new WebpackMd5Hash(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS,
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          "fast-sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 40000
            }
          },
          "image-webpack-loader",
        ]
      }
    ]
  }
};

module.exports = config;
