<template>
  <div id="app">
    <base-nav-bar ref="navbar"></base-nav-bar>
    <router-view />
    <div ref="a"></div>
  </div>
</template>

<style scope>
#app {
  min-width: 800px;
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>


<script>
import BaseNavBar from './components/navbar/BaseNavBar.vue'
export default {
  components: { BaseNavBar },
  
}
</script>