<template>
  <div id="user-password-form">
    <el-dialog
      title="修改密码"
      :visible.sync="visible"
      width="500px">
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        label-width="93px">
        <el-form-item label="用户名">
          <el-input 
            v-model="form.username"
            prefix-icon="el-icon-user"
            :readonly="!forgetPassword">
          </el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="validation">
          <el-input
            v-model="form.validate"
            prefix-icon="el-icon-s-claim"
            style="width:196px;">
          </el-input>
          <el-button
            type="primary"
            @click="clickSendValidate"
            :disabled="isSend"
            style="width:107px;">
            发送验证码
          </el-button>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password1">
          <el-input
            v-model="form.password1"
            prefix-icon="el-icon-key"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="password2">
          <el-input
            v-model="form.password2"
            prefix-icon="el-icon-key"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="clickChangePassword"
            class="bottom-button">
            确认修改
          </el-button>
          <el-button 
            type="primary"
            @click="close"
            class="bottom-button">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-form{
  width: 400px;
  margin: auto;
  position: relative;
  left: -20px;
}
.bottom-button{
  position: relative;
  left:-15px;
  width: 98px;
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
    var validateCode=(rule,value,callback)=>{
      if(this.form.validate==''){
        callback(new Error('验证码不能为空'))
      }else{
        callback()
      }
    }
    var validatePassword=(rule,value,callback)=>{
      if(value!=this.form.password1){
        callback(new Error('两次输入的新密码不一致'))
      }else{
        callback()
      }
    }
    return {
      visible:false,
      isSend:false,
      form:{
        username:'',
        password1:'',
        password2:'',
        validate:''
      },
      rules:{
        password1:[
          {required:true,message:'密码不能为空',trigger:'change'}
        ],
        password2:[
          {required:true,validator:validatePassword,trigger:'change'}
        ],
        validation:[
          {required:true,validator:validateCode,trigger:'change'}
        ]
      }
    }
  },
  methods:{
    open(){
      this.visible=true
      this.form.password1=''
      this.form.password2=''
      this.form.validate=''
      setTimeout(()=>this.$refs.form.clearValidate(),0)
    },
    close(){
      this.visible=false
    },
    clickSendValidate(){
      console.log(this.form.username)
      this.axios.post('user/changepassword/',{
        // token:this.$store.state.token,
        status:0,
        username: this.form.username,
      }).then(res=>{
        console.log(res.data)
        this.isSend=true
        this.$message({
          type:'success',
          message:'成功发送验证码，请耐心等待'
        })
      })
    },
    clickChangePassword(){
      this.$refs.form.validate(valid=>{
        if(valid){
          this.axios.post('user/changepassword/',{
            // token:this.$store.state.token,
            username: this.form.username,
            status:1,
            password:this.form.password1,
            code:this.form.validate
          }).then(res=>{
            if(res.data.result==1){
              this.$message({
                type:'success',
                message:'修改密码成功'
              })
              this.close()
            }else{
              this.$message({
                type:'warning',
                message:'验证码错误，请重新输入'
              })
            }
          })  
        }else{
          this.$message({
            type:'warning',
            message:'数据格式不正确'
          })
        }
      })
    }
  },
  mounted(){
    if(!this.forgetPassword){
      this.axios.post('/user/getuser/',{
        token:this.$store.state.token
      }).then(res =>{
        this.form.username=res.data.name
      })
    }
  }
}
</script>