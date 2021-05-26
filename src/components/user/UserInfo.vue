<template>
  <div id="user-info">
    <h1>个人资料</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mail"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.wxid"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="form.grade" placeholder="请选择您的年级">
          <el-option label="大一" value="1"></el-option>
          <el-option label="大二" value="2"></el-option>
          <el-option label="大三" value="3"></el-option>
          <el-option label="大四" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-radio-group v-model="form.location">
          <el-radio :label="0">学院路校区</el-radio>
          <el-radio :label="1">沙河校区</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
        <el-button type="primary" @click="onSignOut">登出账号</el-button>
        <el-button type="primary" @click="onRelease">发布商品/需求</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form{
  margin: auto;
  width: 40rem;
  position: relative;
  left:-2rem;
}
</style>

<script>
export default {
    data(){
      return {
        form:{
          name: '',
          mail: '',
          wxid: '',
          sex:0,
          grade:"1",
          phone: '',
          location:0
        }
      }
    },
    methods:{
      onSubmit() {
        console.log(this.form)
      },
      onSignOut(){
        this.$store.commit('clearToken')
        this.$router.push('/')
      },
      onRelease(){
        this.$router.push('/release')
      }
    }
}
</script>