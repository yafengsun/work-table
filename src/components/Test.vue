<template>
    <div>
        <el-button @click="buttonClick" type="primary">按钮</el-button>
    </div>
</template>

<script>
  export default {
    name: "Test",
    methods:{
      buttonClick(){
        const axios = require('axios');
        axios.get('http://localhost:8081/test')
          .then(response => {alert(response.data)})
      }
    }
  }
</script>

<style scoped>

</style>