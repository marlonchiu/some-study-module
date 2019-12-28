// 手写webpack plugin
// 手动开发一个简单的需求,在生成打包文件之前自动生成一个关于打包出文件的大小信息

class fileSizePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let str = ''
      for (let filename in compilation.assets) {
        str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
      }
      // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      compilation.assets['fileSize.md'] = {
        source: function () {
          return str
        },
        size: function () {
          return str.length
        }
      }
      callback()
    })
  }
}

module.exports = fileSizePlugin
