<template>
  <div id="user-page">
    <el-container>
      <el-aside width="20rem">
        <div id="user-page-info">
          <div id="follow">
            <router-link to="/user/follow">
              <i class="el-icon-user-solid menu-item"></i>
              <span class="menu-text menu-item">关注</span>
            </router-link>
          </div>
          <div id="favorites">
            <router-link to="/user/favorites">
              <i class="el-icon-s-goods menu-item"></i>
              <span class="menu-text menu-item">收藏</span>
            </router-link>
          </div>
          <div id="credit">
            <router-link to="/user/history">
              <p class="menu-item">{{userCredit}}</p>
              <span class="menu-text menu-item">信用</span>
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
            :default-active="this.$route.path"
            router>
            <el-menu-item index="/user">
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
#uer-page{
  position: fixed;
}

#user-page-info{
  position: relative;
  margin: auto;
  margin-top: 3rem;
  border-radius: 100%;
  border: solid rgb(181, 158,140) 0.1rem;
  height: 10rem;
  width: 10rem;
}
#user-page-info a{
  text-decoration: none;
}
#follow,#favorites,#credit{
  position: absolute;
  background: rgb(224, 209, 193);
  border-radius: 100%;
  height: 3rem;
  width: 3rem;
}
#follow{
  left: -0.83rem;
  top:1rem;
}
#favorites{
  top:1rem;
  right: -0.83rem;
}
#credit{
  bottom: -1.5rem;
  left: 3.5rem;
}
#credit p{
  margin: 0rem;
  font-weight: bolder;
}
.menu-item{
  color: rgb(110, 91,80);
}
.menu-text{
  display: block;
}
#base{
  margin: 1.5rem;
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
      userName:'Matrix53',
      userCredit:4.7
    }
  }
}
</script>