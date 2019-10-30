const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
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
