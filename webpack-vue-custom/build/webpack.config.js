const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 拆分多个 css
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const indexCss = new ExtractTextWebpackPlugin('index.css')
const indexLess = new ExtractTextWebpackPlugin('index.less')

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: indexCss.extract({
          use: ['css-loader']
        })
      }, {
        test: /\.less$/,
        use: indexLess.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 图片文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/header.html'),
    //   filename: 'header.html',
    //   chunks: ['header'] // 与入口文件对应的模块名
    // }),
    // clear dist before build
    new CleanWebpackPlugin(),
    // 拆分css
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    // 拆分多个css
    indexCss,
    indexLess
  ]
}
