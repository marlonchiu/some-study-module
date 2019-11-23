// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')
const { BrowserWindow } = require('electron').remote

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('render-node').innerHTML = process.versions.node
  document.getElementById('send').addEventListener('click', () => {
    ipcRenderer.send('message', 'hello from renderer')
    // 打开一个新的窗口并访问百度
    const newWin = new BrowserWindow({ width: 800, height: 600 })
    newWin.loadURL('https://baidu.com')
  })
  ipcRenderer.on('reply', (event, arg) => {
    document.getElementById('reply-message').innerHTML = arg
  })
})
