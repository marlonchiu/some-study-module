const path = require('path')
const WebpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config.js')
// 拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩js
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 优化代码的压缩时间
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    }])
  ],
  optimization: {
    // 压缩js
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true
      // }),
      // 优化代码的压缩时间
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJs: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          // 只打包初始时依赖的第三方
          chunks: 'initial'
        }
      }
    }
  }
})
