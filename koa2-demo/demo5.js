const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router({})

router.get('/', (ctx, next) => {
  ctx.body = 'hello koa-router'
})
router.get('/todo', (ctx, next) => {
  ctx.body = 'Todo Page'
})
router.get('/list', (ctx, next) => {
  ctx.body = 'List Page'
})

app.use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)
