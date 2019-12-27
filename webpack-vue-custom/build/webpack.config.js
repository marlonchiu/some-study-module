const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.argv.indexOf('--mode=production') === -1
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 分析打包后的文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js'
  },
  module: {
    // noParse 不去解析模块中的依赖库
    // noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        // 把 js 文件处理交给id 为 happyBabel 的 HappyPack 的实例执行
        use: [{
          loader: 'happypack/loader?id=happyBabel'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['cache-loader', 'thread-loader', {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }],
        // 配置include exclude也可以减少 webpack loader的搜索转换时间
        include: [path.resolve(__dirname, '../src')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../dist/css/',
            hmr: devMode
          }
        }, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../dist/css/',
            hmr: devMode
          }
        }, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }, 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i, // 图片文件
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }],
        include: [path.resolve(__dirname, '../src/assets/img')],
        exclude: /node_modules/
      },
      {
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
      // 开启缓存
      // {
      //   test: /\.ext$/,
      //   use: ['cache-loader', ...loaders],
      //   include: path.resolve(__dirname, '../src')
      // }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components')
    },
    extensions: ['*', '.js', '.vue', '.json'] // 频率较高的文件类型优先写在前面
  },
  plugins: [
    // clear dist before build
    new CleanWebpackPlugin(),
    // html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    // 拆分css
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    // 编译模板
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'happyBabel', // 与 loader 对应的 id 标识
      // 用法与loader 的配置一样 注意这里是loaders
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool // 共享进程池
    }),
    new Webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    // 拷贝生成的文件到dist目录 这样每次不必手动去
    new CopyWebpackPlugin([
      { from: 'static', to: 'static' }
    ]),
    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889
    })
  ]
}
