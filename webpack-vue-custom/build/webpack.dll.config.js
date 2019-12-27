// 抽离第三方模块

const path = require('path')
const Webpack = require('webpack')
module.exports = {
  entry: {
    // 打包的模块的数组 'element-ui'
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, '../static/js'), // 见名思意 ../static/dll 输出地址
    filename: '[name].dll.js',
    // 需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致
    library: '[name]_library'
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}
