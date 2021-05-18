<template>
  <div class="user-nav-bar">
    <el-avatar :size="70" :src="userImgUrl"></el-avatar>
    <div id="user-name">{{userName}}</div>
    <el-rate
      v-model="creditRating"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>
    
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#B59E8C"
      :default-active="active"
      router>
      <el-menu-item index="/user/info">
          <i class="el-icon-s-custom"></i>
          <span>个人资料</span>
      </el-menu-item>
      <el-menu-item index="/user/released">
        <i class="el-icon-menu"></i>
        <span>当前发布</span>
      </el-menu-item>
      <el-menu-item index="/user/message">
        <i class="el-icon-chat-line-round"></i>
        <span>消息记录</span>
      </el-menu-item>
      <el-menu-item index="/user/history">
        <i class="el-icon-s-order"></i>
        <span>交易历史</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-nav-bar{
  box-sizing: content-box;
  width: 20rem;
}
#user-name{
  margin-top: 1rem;
  font-size: 1.5rem;
}
.el-rate{
  margin-top: 1rem;
}
</style>

<script>
export default {
  name:'UserNavBar',
  data(){
    return {
      active:this.$route.path,
      userImgUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      creditRating:5,
      userName:'Matrix53'
    }
  }
}
</script>