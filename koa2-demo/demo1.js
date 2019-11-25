/**
 * 在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。
 * query：返回的是格式化好的参数对象。
 * querystring：返回的是请求字符串
 */

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  const url = ctx.url
  // 从request中获取GET请求
  const request = ctx.request
  const reqQuery = request.query
  const reqQuerystring = request.querystring

  // 从上下文获取GET请求
  const ctxQuery = ctx.query
  const ctxQuerystring = ctx.querystring

  // console.log(request, request.query)
  ctx.body = {
    url,
    request,
    reqQuery,
    reqQuerystring,
    ctx,
    ctxQuery,
    ctxQuerystring
  }
})

app.listen(4000, () => {
  console.log('[demo] server is starting at port 4000')
})

// 获得GET请求的方式有两种，
// 一种是从request中获得，一种是一直从上下文中获得。
// 获得的格式也有两种：query和querystring
