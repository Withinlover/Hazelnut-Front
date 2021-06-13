<template>
  <div id="app">
    <base-nav-bar ref="navbar"></base-nav-bar>
    <router-view />
    <vue-canvas-nest :config="config" />
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
import BaseNavBar from "./components/navbar/BaseNavBar.vue";
import vueCanvasNest from 'vue-canvas-nest'; 

export default {
  components: { BaseNavBar, vueCanvasNest },
  data() {
    return {
      config: {
        color: '0,0,255',
        opacity: 0.7,
        zIndex: -2,
        count: 99,
      },
    }
  }
};
</script>
