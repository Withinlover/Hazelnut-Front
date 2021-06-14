<template>
  <div id="user-page">
    <div id="user-page-background">
    </div>
    <div id="user-page-aside">
      <nav-bar
        ref="navbar">
      </nav-bar>
    </div>
    <div id="user-page-main">
      <router-view
        @updateAvatar="handleAvatarUpdate">
      </router-view>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user-page{
  min-width: 800px;
  max-width: 2000px;
  margin: auto;
  margin-top: 0px;
  overflow: auto;
  display: flex;
  flex-direction: row;
}
#user-page-background{
  position: fixed;
  background: #FFFFFF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #dddddd,#FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #f8f8f8,#FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -100;
}
#user-page-aside{
  width: 330px;
  min-width: 250px;
}
#user-page-main{
  width:1000px;
  min-width: 800px;
  margin:auto;
  margin-top: 25px;
  display: flex;
  justify-content: center;
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