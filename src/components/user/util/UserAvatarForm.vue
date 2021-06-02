<template>
  <div id="user-avatar-form">
    <el-dialog
      title="修改头像" 
      :visible.sync="visible"
      width="25%">
      <el-avatar :src="avatarUrl" :size="150"></el-avatar>

      <el-upload
        action="http://123.57.194.168:8000/user/uploadimg/"
        :headers="headers"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="false">
        <el-button type="primary">上传头像</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-button{
  margin-top: 2rem;
  width: 6.5rem;
  height: 3rem;
  font-size: 1rem;
}
</style>

<script>
export default {
  data(){
    return {
      visible:false,
      avatarUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      headers:{
        authorization:this.$store.state.token
      }
    }
  },
  methods:{
    open(){
      this.visible=true
      setTimeout(()=>{
        this.getAvatar()
      },0)
    },
    close(){
      this.visible=false
    },
    getAvatar(){
      this.axios.post('/user/getuser/',{
        token:this.$store.state.token
      }).then(res =>{
        this.avatarUrl=res.data.url === 'NULL'? this.avatarUrl:res.data.url
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
    },
    handleSuccess(response,file,fileList){
      this.$message({
        message:'上传头像成功',
        type:'success'
      })
      this.avatarUrl=response.path
      this.$emit('finishUpdate',response.path)
    },
    handleError(error,file,fileList){
      this.$message({
        message:'请求超时，请检查网络设置',
        type:'error'
      })
    }
  }
}
</script>