<template>
  <div id="app">
    <base-nav-bar ref="navbar"></base-nav-bar>
    <router-view />
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

.absolute {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -999;
}
</style>


<script>
import BaseNavBar from "./components/navbar/BaseNavBar.vue";
export default {
  components: { BaseNavBar },
  data() {
    return {
      config: {
        color: '0,0,255',
        opacity: 0.7,
        zIndex: -99,
        count: 99,
      },
    }
  }
};
</script>
