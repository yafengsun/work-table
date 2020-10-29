<template>
  <div id="app">
  <WorkDetail></WorkDetail>
  </div>
</template>

<script>

import WorkDetail from "@/components/WorkDetail";

export default {
  name: 'App',
  components: {
    WorkDetail
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
