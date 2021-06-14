<template>
  <div id="user-info-form">
    <el-dialog
      title="修改资料"
      :visible.sync="visible"
      width="600px">
      <el-form
        ref="form" 
        :model="formData" 
        label-width="80px"
        :rules="rules">
        <el-form-item label="用户名">
          <el-input 
            v-model="formData.name" 
            readonly
            prefix-icon="el-icon-user"
            @focus="focusName">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            v-model="formData.email"
            readonly
            prefix-icon="el-icon-message"
            @focus="focusMail">
          </el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wxid">
          <el-input
            v-model="formData.wxid"
            prefix-icon="el-icon-chat-dot-round">
          </el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="formData.grade" placeholder="请选择您的年级">
            <el-option label="大一" :value="1"></el-option>
            <el-option label="大二" :value="2"></el-option>
            <el-option label="大三" :value="3"></el-option>
            <el-option label="大四" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input
            v-model="formData.telephone"
            prefix-icon="el-icon-mobile-phone">
          </el-input>
        </el-form-item>
        <el-form-item label="校区" prop="location">
          <el-radio-group v-model="formData.location">
            <el-radio :label="0">沙河校区</el-radio>
            <el-radio :label="1">学院路校区</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="clickSubmitInfo">
            确认修改
          </el-button>
          <el-button 
            type="primary"
            @click="close"
            style="width:98px;">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-form{
  margin: auto;
  width: 500px;
  position: relative;
  left:-1.3rem;
}

.el-form .el-button{
  position: relative;
  left: -1.5rem;
}
</style>

<script>
export default {
  data(){
    return {
      formData:{
        name:'',
        email:'',
        wxid: '',
        sex:-1,
        grade:-1,
        telephone: '',
        location:-1
      },
      visible:false,
      rules:{
        wxid:[
          { required: true, message: '微信号不能为空', trigger: 'change' }
        ],
        sex:[
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        location:[
          { required: true, message: '校区不能为空', trigger: 'change' }
        ],
        telephone:[
          { required: true, message: '手机号码不能为空', trigger: 'change' }
        ],
        grade:[
          { required: true, message: '年级不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    open(){
      this.visible=true
      this.getInfo()
    },
    close(){
      this.visible=false
    },
    focusName(){
      this.$message('暂时不支持修改用户名')
    },
    focusMail(){
      this.$message('暂时不支持修改绑定的邮箱')
    },
    getInfo(){
      this.axios.post('/user/getinfo/',{
        token:this.$store.state.token
      })
      .then(res => {
        this.formData=res.data
        if(res.data.wxid===-1) this.formData.wxid=''
        if(res.data.telephone===-1) this.formData.telephone=''
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
      .then(res=>{
        this.$refs.form.clearValidate()
      })
    },
    updateInfo(){
      this.axios.post('/user/uploadinfo/',
      Object.assign({token:this.$store.state.token},this.formData))
      .then(res =>{
          this.$message({
            message:'修改个人信息成功',
            type:'success'
          })
        },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
      .then(res =>{
        this.$emit('finishUpdate')
      })
    },
    clickSubmitInfo(){
      this.$refs.form.validate(valid =>{
        if(valid){
          this.updateInfo()
          this.close()
        }else{
          this.$message({
            message:'数据格式不正确',
            type:'warning'
          })
        }
      })
    }
  }
}
</script>