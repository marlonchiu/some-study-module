/**
 * 获取Post请求的步骤：
 *      对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
 */
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(async (ctx) => {
  // 当请求时GET请求时，显示表单让用户填写
  if (ctx.url === '/' && ctx.method === 'GET') {
    const html = `
      <h1>Koa2 request post demo</h1>
      <form method="POST"  action="/">
          <p>userName</p>
          <input name="userName" /> <br/>
          <p>age</p>
          <input name="age" /> <br/>
          <p>webSite</p>
          <input name='webSite' /><br/>
          <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') { // 当请求时POST请求时
    const postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其它请求显示404页面
    ctx.body = '<h3>404!</h3>'
  }
})
app.listen(4000, () => {
  console.log('[demo] POST server is starting at port 4000')
})
