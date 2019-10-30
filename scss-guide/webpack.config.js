const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')
// 打包html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// css分离出来
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    entry: './src/App.js'
  },
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, './dist')
    // 配置实现内存更新
    // publicPath: 'temp/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractWebpackPlugin.loader,
          options: {
            publicPath: './',
            hmr: process.env.NODE_ENV === 'development'
          }
        }, 'css-loader']
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        // 从后往前 // compiles Sass to CSS  --》translates CSS into CommonJS --》creates style nodes from JS strings
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // minify：是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号
      minify: {
        removeAttributeQuotes: true
      },
      // hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
      hash: true,
      // template：是要打包的html模版路径和文件名称
      template: './index.html'
    }),
    // 分离css
    new MiniCssExtractWebpackPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].scss',
      chunkFilename: '[id].scss',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ],
  mode: 'production',
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, 'dist'),
    // 服务器的IP地址，可以使用IP也可以使用 localhost
    host: 'localhost',
    // 服务端压缩是否开启
    compress: true,
    // 配置服务端口号 默认8080
    port: 8088
  }
}
