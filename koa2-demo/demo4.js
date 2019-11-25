/**
 * 原生路由的实现
 * ctx.request.url
 *    获取地址栏输入的路径 ctx.request.url
 *  原生路由的实现需要引入fs模块来读取文件。然后再根据路由的路径去读取，最后返回给页面，进行渲染
 */

const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

function renderPage (page) {
  console.log(333)
  return new Promise((resolve, reject) => {
    const pagePath = `./page/${page}`
    fs.readFile(pagePath, 'binary', (err, data) => {
      console.log(err, data)
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function route (url) {
  console.log(222)
  let page = '404.html'
  switch (url) {
    case '/':
      page = 'index.html'
      break
    case '/index':
      page = 'index.html'
      break
    case '/todo':
      page = 'todo.html'
      break
    case '/404':
      page = '404.html'
      break
    default:
      break
  }
  const html = await renderPage(page)
  return html
}

app.use(async (ctx) => {
  console.log(111)
  const url = ctx.request.url
  const html = await route(url)
  ctx.body = html
})

app.listen(3000, () => {
  console.log('[demo] POST server is starting at port 3000')
})
