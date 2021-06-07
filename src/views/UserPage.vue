<template>
  <div id="user-page">
    <div id="background"></div>
    <el-container>
      <el-aside width="20rem">
        <nav-bar ref="navbar"></nav-bar>
      </el-aside>

      <el-main>
        <router-view
          @updateAvatar="handleAvatarUpdate">
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#background{
  position: fixed;
  background: #FFFFFF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -100;
}
</style>

<script>
import NavBar from "@/components/user/nav/NavBar.vue"

export default {
  components:{
    NavBar
  },
  methods:{
    handleAvatarUpdate(avatarUrl){
      this.$refs.navbar.updateAvatar(avatarUrl)
    }
  }
}
</script>