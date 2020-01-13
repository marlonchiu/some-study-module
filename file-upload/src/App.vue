<template>
  <div id="app">
    <input type="file" @change="handleFileChange">
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    container: {
      file: null
    }
  }),
  methods: {
    async handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return false
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    async handleUpload() {}
  }
}
</script>

<style>
</style>
