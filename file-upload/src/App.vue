<template>
  <div id="app">
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload" type="primary" size="mini">上传</el-button>
  </div>
</template>

<script>
const LENGTH = 10

export default {
  name: 'app',
  data: () => ({
    container: {
      file: null,
      data: [],
    },
  }),
  methods: {
    // 请求公共方法
    request({ url, method = 'post', data, headers = {}, requestList }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key]),
        )
        xhr.send(data)
        xhr.onload = e => {
          // 将请求成功的 xhr 从列表中删除
          if (requestList) {
            // console.log(requestList)
          }
          resolve({
            data: e.target.response,
          })
        }
      })
    },
    // 生成切片文件
    createFileChunk(file, length = LENGTH) {
      const fileChunkList = []
      const chunkSize = Math.ceil(file.size / length)
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) })
        cur += chunkSize
      }
      return fileChunkList
    },
    // 上传切片文件 上传切片，同时过滤已上传的切片
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk, hash }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('filename', this.container.file.name)
          return { formData }
        })
        .map(async ({ formData }) => {
          this.request({
            url: 'http://localhost:3000',
            data: formData,
          })
        })
      // 并发切片
      await Promise.all(requestList)
      // 合并切片
      await this.mergeRequest()
    },
    async mergeRequest() {
      await this.request({
        url: 'http://localhost:3000/merge',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify({
          filename: this.container.file.name,
        }),
      })
    },
    async handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return false
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    async handleUpload() {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        // 临时hash 文件名 + 数组下标
        hash: this.container.file.name + '-' + index,
      }))

      await this.uploadChunks()
    },
  },
}
</script>

<style></style>
