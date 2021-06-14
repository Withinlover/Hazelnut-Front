<template>
  <div id="user-info">
    <h1>个人资料</h1>

    <user-show-form
     ref="showForm">
    </user-show-form>

    <div id="button">
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-button type="primary" @click="clickChangeInfo">修改资料</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="clickChangeAvatar">修改头像</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="clickChangePassword">修改密码</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="clickSignOut">登出账号</el-button>
        </el-col>
      </el-row>
    </div>
       
    <user-info-form
      ref="infoForm"
      @finishUpdate="handleInfoUpdate">
    </user-info-form>

    <user-avatar-form
      ref="avatarForm"
      @finishUpdate="handleAvatarUpdate">
    </user-avatar-form>

    <user-password-form
      ref="passwordForm"
      :forgetPassword="false">
    </user-password-form>
  </div>
</template>

<style scoped>
h1{
  font-size: 30px;
  margin-bottom: 130px;
  user-select: none;
}
.el-row{
  margin-bottom: 1rem;
}
#button{
  margin: auto;
  margin-top: 10px;
  height:50px;
  width: 760px;
  padding: 5px 10px 0px 10px;
  border-radius: 20px;
  border: 1.5px solid #dddddd;
  background: rgba(255, 255, 255,0.4);
  backdrop-filter: blur(3px);
}
#button .el-button{
  height: 45px;
  font-size: 1rem;
}
</style>

<script>
import UserInfoForm from './form/UserInfoForm.vue'
import UserAvatarForm from './form/UserAvatarForm.vue'
import UserPasswordForm from './form/UserPasswordForm.vue'
import UserShowForm from './form/UserShowForm.vue'

export default {
    components:{
      UserAvatarForm,
      UserInfoForm,
      UserPasswordForm,
      UserShowForm
    },
    methods:{
      clickChangeInfo(){
        this.$refs.infoForm.open()
      },
      clickChangeAvatar(){
        this.$refs.avatarForm.open()
      },
      clickChangePassword(){
        this.$refs.passwordForm.open()
      },
      clickSignOut(){
        this.$store.commit('clearToken')
        this.$router.push('/')
        this.$message({
          message:'退出账号成功',
          type:'success'
        })
      },
      handleAvatarUpdate(avatarUrl){
        this.$emit('updateAvatar',avatarUrl)
      },
      handleInfoUpdate(){
        this.$refs.showForm.updateInfo()
      }
    }
}
</script>