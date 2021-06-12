<template>
    <div id="user-info">
      <div id="follow">
        <router-link :to="'/user/watch/' + userID">
          <i class="el-icon-user-solid menu-item"></i>
          <span class="menu-text menu-item">关注</span>
        </router-link>
      </div>
      <div id="favorites">
        <router-link :to="'/user/watch/' + userID">
          <i class="el-icon-s-goods menu-item"></i>
          <span class="menu-text menu-item">收藏</span>
        </router-link>
      </div>
      <div id="credit">
        <router-link :to="'/user/watch/' + userID">
          <p class="menu-item">{{userCredit}}</p>
          <span class="menu-text menu-item">信用</span>
        </router-link>
      </div>
      <div id="base">
        <el-avatar
          :size="80"
          :src="userImgUrl">
        </el-avatar>
        <div style="font-size:1.5rem;">{{userName}}</div>
      </div>
    </div>
</template>

<style scoped>

#user-info{
  position: relative;
  height: 160px;
  width: 160px;
  border-radius: 100%;
  border: solid #ffffff 1.6px;
  box-shadow: 0px 0px 3px 2px rgb(224, 209, 193);
  text-align: center;
}
#user-info a{
  text-decoration: none;
}
#follow,#favorites,#credit{
  position: absolute;
  height: 48px;
  width: 48px;
  background: rgb(224, 209, 193);
  border-radius: 100%;
  box-shadow: 0px 0px 3px 2px rgb(224, 209, 193);
}
#follow{
  left: -13.28px;
  top:16px;
}
#favorites{
  top:16px;
  right: -13.28px;
}
#credit{
  bottom: -24px;
  left: 56px;
}
#credit p{
  margin: 0px;
  font-weight: bolder;
}
.menu-item{
  color: rgb(110, 91,80);
}
.menu-text{
  display: block;
}
#base{
  margin: 24px;
}
#base .el-avatar{
  box-shadow: 0px 0px 3px 2px rgb(224, 209, 193);
}
#user-menu > *{
  margin-top: 32px;
  background-color: transparent;
}
</style>

<script>
export default {
  name: 'UserWatchAvatar',
  props: ['initialUserID'],

  data () {
    return {
      userID: this.initialUserID,
      userImgUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userName:'正在加载',
      userCredit:'?'
    }
  },
  methods: {
    getBaseInfo(){
      this.axios.post('/user/getuser/',{
        // token:this.$store.state.token,
        "id": this.userID
      }).then(res =>{
        // console.log (res.data)
        if (res.data['result'] === 1) {
          this.userImgUrl=res.data.url === 'NULL'? this.userImgUrl : res.data.url
          this.userName=res.data.name
          this.userCredit=res.data.score<0? '?':res.data.score
        }
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
    },
    updateAvatar(imgUrl){
      this.userImgUrl=imgUrl
    }
  },
  mounted() {
    var url = '/user/getinfo/';
    var data = {
      "id" : this.userID,
    }
    this.axios.post(url, data).then((res) => {
      // console.log(res.data);
      if (res.data['result'] === 1) {
        this.userName = res.data['name'];
      }
    }),
    this.getBaseInfo();
  }
}
</script>