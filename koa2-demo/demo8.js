// 使用cookie

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set(
      'userName', 'JSPang', {
        domain: '127.0.0.1', // 写cookie所在的域名
        path: '/index', // 写cookie所在的路径
        maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
        expires: new Date('2019-12-31'), // cookie失效时间
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false // 是否允许重写
      }
    )
    ctx.body = 'cookies is ok'
  } else {
    ctx.body = 'hello world'
  }
})

app.listen(3000)
