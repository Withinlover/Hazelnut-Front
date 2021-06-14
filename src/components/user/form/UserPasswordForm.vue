<template>
  <div id="user-password-form">
    <el-dialog
      title="修改密码"
      :visible.sync="visible">
      <el-form
        :rule="rules"
        ref="form"
        :model="form"
        :label-position="left"
        label-width="80px">
        <el-form-item label="用户名">
          <el-input 
            v-model="form.username"
            prefix-icon="el-icon-user"
            :readonly="!forgetPassword">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input
            v-model="form.validate"
            prefix-icon="el-icon-s-claim"
            style="width:308px;">
          </el-input>
          <el-button
            type="primary"
            @click="clickSendValidate">
            发送验证码
          </el-button>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-key">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="clickChangePassword">
            确认修改
          </el-button>
          <el-button 
            type="primary"
            @click="close">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-form{
  width: 500px;
  margin: auto;
}
</style>

<script>
export default {
  props:{
    forgetPassword:{
      type:Boolean,
      required:true
    }
  },
  data(){
    return {
      visible:false,
      form:{
        username:'',
        password:'',
        validate:''
      }
    }
  },
  methods:{
    open(){
      this.visible=true
    },
    close(){
      this.visible=false
    },
    clickChangePassword(){
      this
    }
  },
  mounted(){
    if(!this.forgetPassword){
      this.axios.post('/')
    }
  }
}
</script>