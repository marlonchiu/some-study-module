const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
// const router = new Router({
//   // 添加前缀
//   // prefix: '/jspang'
// })

// HOME 子路由
const home = new Router()
home.get('/todo', (ctx, next) => {
  ctx.body = 'Home Todo Page'
})
home.get('/list', (ctx, next) => {
  ctx.body = 'Home List Page'
})

// rank 子路由
const rank = new Router()
rank.get('/todo', (ctx, next) => {
  ctx.body = 'rank Todo Page'
})
rank.get('/list', (ctx, next) => {
  ctx.body = 'rank List Page'
})

// 设置父路由 挂载所有子路由
const router = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/rank', rank.routes(), rank.allowedMethods())

// 挂载路由中间件
app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
