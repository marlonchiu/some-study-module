const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // preload String(可选) - 在页面运行其他脚本之前预先加载指定的脚本
      // 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // 打开开发者工具
  // mainWindow.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  mainWindow.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWindow = null
  })
}
app.on('ready', createWindow)
