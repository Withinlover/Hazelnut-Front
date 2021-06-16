<template>
  <div id="show-form">
    <el-row>
      <el-col :span="4" >
        <el-tag>
          用户名
          <i class="el-icon-user"></i>
        </el-tag>
      </el-col>
      <el-col :span="8">
        <p>{{name}}</p>
      </el-col>
      <el-col :span="4">
        <el-tag>
          手机号码
          <i class="el-icon-mobile-phone"></i>
        </el-tag>
      </el-col>
      <el-col :span="8">
        <p>{{telephone}}</p>
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
        <p>{{email}}</p>
      </el-col>
      <el-col :span="4">
        <el-tag>
          性别
          <i class="el-icon-male"></i>
        </el-tag>
      </el-col>
      <el-col :span="8">
        <p>{{sex}}</p>
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
        <p>{{wxid}}</p>
      </el-col>
      <el-col :span="4">
        <el-tag>
          年级
          <i class="el-icon-office-building"></i>
        </el-tag>
      </el-col>
      <el-col :span="8">
        <p>{{grade}}</p>
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
        <p>{{location}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
#show-form{
  width: 760px;
  height: 240px;
  margin: auto;
  padding: 20px 10px;
  border-radius: 30px;
  border: 1.5px solid #dddddd;
  background: rgba(255, 255, 255,0.4);
  backdrop-filter: blur(3px);
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
</style>

<script>
const map={
  sex:['男','女'],
  grade:['大一','大二','大三','大四'],
  location:['沙河校区','学院路校区']
}

export default {
  data(){
    return {
      name:'',
      email:'',
      wxid:'尚未填写微信号',
      telephone:'尚未填写手机号',
      sex:'尚未填写性别',
      grade:'尚未填写年级',
      location:'尚未填写校区'
    }
  },
  methods:{
    updateInfo(){
      this.axios.post('/user/getinfo/',{
        token:this.$store.state.token
      }).then(res => {
        this.name=res.data.name,
        this.email=res.data.email,
        this.wxid=res.data.wxid == -1? '尚未填写微信号':res.data.wxid,
        this.telephone=res.data.telephone == ""? '尚未填写手机号':res.data.telephone,
        this.sex=res.data.sex == null? '尚未填写性别':map.sex[res.data.sex],
        this.grade=res.data.grade == null? '尚未填写年级':map.grade[res.data.grade-1],
        this.location=res.data.location == null? '尚未填写校区':map.location[res.data.location]
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
    }
  },
  mounted(){
    this.updateInfo()
  }
}
</script>