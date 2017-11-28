const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const CleanWebpackPlugin = require('clean-webpack-plugin');
// new CleanWebpackPlugin(['build']),

const config = {
  devServer: {
    stats: 'errors-only',
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080,
    overlay: true,
  },
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, "node_modules")
    ]),
    new ProgressBarPlugin(),
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
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS,
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          "sass-loader" // compiles Sass to CSS
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
