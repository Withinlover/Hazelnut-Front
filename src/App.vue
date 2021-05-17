<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <img src="./assets/logo.png" />
        <span>二手商品交易平台</span>
      </router-link>
      <div id="nav-links">
        <router-link to="/" class="nav-links-item">Home</router-link>
        <router-link to="/about" class="nav-links-item">About</router-link>
      </div>
    </div>
    <h1>ElementUI + Axios 测试</h1>
    <el-button type="primary" round>{{info}}</el-button>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: relative;
  height: 2.5rem;
  padding: 0.7rem 8rem;
  border-bottom: solid #2c3e50;
  text-align: left;
  background-color: aliceblue;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  display: inline-block;
  font-size: 1.5rem;
  line-height: 2.5rem;
}

#nav a img {
  width: 2.5rem;
  vertical-align: middle;
  display: inline-block;
}

#nav a span{
  color: #2c3e50;
  display: inline-block;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav-links {
  position: absolute;
  right: 8rem;
  display: inline-block;
}

.nav-links-item {
  padding-left: 1.2rem;
}

</style>

<script>
export default {
  data() {
    return {
      info: "我后端呢？？？"
    }
  }, 
  mounted () {
    const url = 'http://123.57.194.168:8000/login/';
    var formData = new FormData();
    formData.append('username', 'aaa');
    formData.append('password', '111');

    this.axios.post(url, formData).then(res => {
      this.info = '后端支棱起来了！！！'
    })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>