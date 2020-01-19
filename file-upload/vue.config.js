module.exports = {
  devServer: {
    proxy: 'http://localhost:3000' // 配置跨域处理,只有一个代理
  }
}
