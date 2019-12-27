const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // 热更新
    new Webpack.HotModuleReplacementPlugin()
  ],
  // 热更新
  devServer: {
    port: 3000,
    hot: true,
    contentBase: '../dist'
  }
})
