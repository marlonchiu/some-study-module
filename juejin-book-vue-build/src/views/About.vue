<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { getTestData } from '../services/moduleA';
export default {
  mounted() {
    // const result = getTestData()
    // console.log(result.then(res => {
    //   console.log(res)
    // }))
    this._initTestData();
  },
  methods: {
    async _initTestData() {
      const result = await getTestData();
      console.log(result);
    }
  }
};
</script>
