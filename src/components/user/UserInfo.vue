<template>
  <div id="user-info">
    <h1>个人资料</h1>

    <div id="show-form">
      <el-row>
        <el-col :span="4" >
          <el-tag>
            用户名
            <i class="el-icon-user"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.name}}</p>
        </el-col>

        <el-col :span="4">
          <el-tag>
            手机号码
            <i class="el-icon-mobile-phone"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.telephone}}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-tag>
            邮箱
            <i class="el-icon-message"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.email}}</p>
        </el-col>

        <el-col :span="4">
          <el-tag>
            性别
            <i class="el-icon-male"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.sex}}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-tag>
            微信号
            <i class="el-icon-chat-dot-round"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.wxid}}</p>
        </el-col>

        <el-col :span="4">
          <el-tag>
            年级
            <i class="el-icon-office-building"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.grade}}</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-tag>
            校区
            <i class="el-icon-location-outline"></i>
          </el-tag>
        </el-col>
        <el-col :span="8">
          <p>{{showData.location}}</p>
        </el-col>
      </el-row>
    </div>

    <div id="button">
      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-button type="primary" @click="clickChangeInfo">修改资料</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="clickChangeAvatar">修改头像</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="clickSignOut">登出账号</el-button>
        </el-col>
      </el-row>
    </div>
       
    <user-info-form
      ref="infoForm"
      @finishUpdate="getInfo">
    </user-info-form>

    <user-avatar-form
      ref="avatarForm"
      @finishUpdate="handleAvatarUpdate">
    </user-avatar-form>
  </div>
</template>

<style scoped>
h1{
  font-size: 30px;
}
#show-form{
  width: 50rem;
  margin: auto;
  margin-top: 6rem;
}

.el-tag{
  height: 3rem;
  width: 6.5rem;
  font-size: 1rem;
  padding-top: 0.5rem;
}

.el-row{
  margin-bottom: 1rem;
}

.el-col p{
  color: rgb(181, 158, 140);
  font-size: 1.5rem;
  margin: auto;
  padding-top: 0.5rem;
}

#button{
  margin-top: 5rem;
}

#button .el-button{
  height: 2.7rem;
  font-size: 1rem;
}
</style>

<script>
import UserInfoForm from './form/UserInfoForm.vue'
import UserAvatarForm from './form/UserAvatarForm.vue'
const map={
  sex:['男','女'],
  grade:['大一','大二','大三','大四'],
  location:['沙河校区','学院路校区']
}

export default {
    components:{
      UserAvatarForm,
      UserInfoForm
    },
    data(){
      return {
        rawData:{
          name:'',
          email:'',
          wxid: -1,
          sex:-1,
          grade:-1,
          telephone: -1,
          location:-1
        }
      }
    },
    computed:{
      showData(){
        return {
          name:this.rawData.name,
          email:this.rawData.email,
          wxid:this.rawData.wxid == -1? '尚未填写微信号':this.rawData.wxid,
          telephone:this.rawData.telephone == -1? '尚未填写手机号':this.rawData.telephone,
          sex:this.rawData.sex == -1? '尚未填写性别':map.sex[this.rawData.sex],
          grade:this.rawData.grade == -1? '尚未填写年级':map.grade[this.rawData.grade-1],
          location:this.rawData.location == -1? '尚未填写校区':map.location[this.rawData.location]
        }
      }
    },
    methods:{
      clickChangeInfo(){
        this.$refs.infoForm.open()
      },
      clickChangeAvatar(){
        this.$refs.avatarForm.open()
      },
      clickSignOut(){
        this.$store.commit('clearToken')
        this.$router.push('/')
        this.$message({
          message:'退出账号成功',
          type:'success'
        })
      },
      getInfo(){
        this.axios.post('/user/getinfo/',{
          token:this.$store.state.token
        })
        .then(res => {
          this.rawData=res.data
        },reason =>{
          this.$message({
            message:'请求超时，请检查网络设置',
            type:'error'
          })
        })
      },
      handleAvatarUpdate(avatarUrl){
        this.$emit('updateAvatar',avatarUrl)
      }
    },
    mounted(){
      this.getInfo()
    }
}
</script>