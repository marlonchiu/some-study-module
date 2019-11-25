/**
 * 获取Post请求的步骤：
 *      解析上下文ctx中的原生nodex.js对象req。
 *      将POST表单数据解析成query string-字符串.(例如:user=jspang&age=18)
 *      将字符串转换成JSON格式。
 *
 * ctx.request和ctx.req的区别
 *      ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
 *      ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。
 */
const Koa = require('koa')
const app = new Koa()

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
    // const ctxReq = ctx.req
    const postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    // 其它请求显示404页面
    ctx.body = '<h3>404!</h3>'
  }
})
app.listen(4000, () => {
  console.log('[demo] POST server is starting at port 4000')
})

// 用Promise对象进行解析。这里我们使用了ctx.req.on来接收事件
function parsePostData (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.on('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        // resolve(postdata)
        const parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 解析字符串
function parseQueryStr (queryStr) {
  const queryData = {}
  const queryStrList = queryStr.split('&')
  console.log(queryStrList)
  for (let [index, queryStrItem] of queryStrList.entries()) {
    const itemList = queryStrItem.split('=')
    console.log(itemList)
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}
