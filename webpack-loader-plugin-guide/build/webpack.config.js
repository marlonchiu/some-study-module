const path = require('path')
const FileSizePlugin = require('./webpack-file-size-plugin')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: path.resolve(__dirname, 'drop-console.js')
    }]
  },
  plugins: [
    new FileSizePlugin()
  ]
}
