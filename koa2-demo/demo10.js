// 使用cookie

const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()

const staticPath = './static'
// 使用图片
app.use(static(
  path.join(__dirname, staticPath)
))

app.use(async (ctx) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
