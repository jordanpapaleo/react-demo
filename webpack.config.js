const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const loaders = require('./config/loaders')
const preloaders = require('./config/preloaders')

module.exports = {
  context: path.join(__dirname, 'app'),
  // devtool: 'source-map',
  entry: './index.js',
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    root: [
      path.join(__dirname, 'app')
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: preloaders,
    loaders: loaders,
    noParse: /\.min\.js/
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Seed Project',
      filename: 'index.html',
      template: 'index.tmpl.html',
      inject: 'body',
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify({ blar: 'plop' })
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.OccurenceOrderPlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true
    // })
  ]
}
