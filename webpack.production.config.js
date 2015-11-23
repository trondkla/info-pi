var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    './js/index'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js'
  },
  plugins: [
    new webpack.DefinePlugin({ DEBUG: false }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [node_modules_dir],
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /dev\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
          "less-loader?strictMath&cleancss"
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};

module.exports = config;