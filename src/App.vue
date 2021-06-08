<template>
  <div id="app">
    <base-nav-bar />
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

#nav {
  position: relative;
  height: 3rem;
  padding: 0.1rem 0 0 8rem;
  border-bottom: 0.1em outset rgb(110, 91, 80);
  text-align: left;
  color: rgb(110, 91, 80);
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 4px rgba(110, 91, 80, 0.2);
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: rgb(110, 91, 80);
  display: inline-block;
  font-size: 1.5rem;
  line-height: 2.5rem;
}

#nav a img {
  width: 2.5rem;
  vertical-align: middle;
  display: inline-block;
}

#nav a span {
  color: #2c3e50;
  display: inline-block;
}

#nav a.router-link-exact-active {
  color: rgb(181, 158, 140);
}

#nav-left {
  display: inline-block;
  position: absolute;
  margin-left: 3rem;
  left: 0;
}

.nav-left-item {
  vertical-align: middle;
  margin: 0 1rem;
}
.reddot {
  height: -2px;
  size: small;
}
#nav-right {
  display: inline-block;
  position: absolute;
  margin-right: 3rem;
  right: 0;

  font-size: 2.3em;
}

.nav-right-item {
  vertical-align: middle;
  margin: 0 1rem;
}

.icon {
  width: 2em;
  height: 2em;
  padding-left: 0.5em;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
#bell {
  position: relative;
  bottom: 12px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<script>
import BaseNavBar from './components/navbar/BaseNavBar.vue'
export default {
  components: { BaseNavBar },
  
}
</script>