<template>
  <div id="user-page">
    <el-container>
      <el-aside width="20rem">
        <div id="user-page-info">
          <div id="follow">
            <router-link to="/user/follow">
              <i class="el-icon-user-solid">我的关注</i>
            </router-link>
          </div>
          <div id="favorites">
            <router-link to="/user/favorites">
              <i class="el-icon-s-goods">我的收藏</i>
            </router-link>
          </div>
          <div id="credit">
            <router-link to="/user/history">
              <i class="el-icon-star-on">我的信用</i>
            </router-link>
          </div>
          <div id="base">
            <el-avatar :size="80" :src="userImgUrl"></el-avatar>
            <div style="font-size:1.5rem;">{{userName}}</div>
          </div>
        </div>

        <div id="user-page-menu">
          <el-menu
            class="el-menu-vertical-demo"
            active-text-color="#B59E8C"
            default-active="/user/info"
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
      </el-aside>

      <el-main>
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user-page-info{
  margin: auto;
  margin-top: 3rem;
  border-radius: 100%;
  border: solid;
  height: 10rem;
  width: 10rem;
}
#follow{
  background: blue;
  position: relative;
  left: -10rem;
}
#user-page-menu{
  margin-top: 2rem;
}
</style>

<script>
export default {
  data(){
    return {
      userImgUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      creditRating:5,
      userName:'Matrix53'
    }
  }
}
</script>