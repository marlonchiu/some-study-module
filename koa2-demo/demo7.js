// 传递参数

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  const query = ctx.query
  const queryString = ctx.querystring
  ctx.body = {
    query,
    queryString
  }
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
