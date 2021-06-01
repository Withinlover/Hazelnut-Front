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
        <el-col :span="6">
          <el-button type="primary" @click="clickChange">修改资料</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="clickSignOut">登出账号</el-button>
        </el-col>
      </el-row>
    </div>
       
    <el-dialog title="修改资料" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
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
            @click="clickSubmit">
            确认修改
          </el-button>
          <el-button 
            type="primary"
            @click="dialogFormVisible=false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
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

.el-form{
  margin: auto;
  width: 40rem;
  position: relative;
  left:-1.3rem;
}

.el-form .el-button{
  position: relative;
  left: -1.5rem;
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
        formData:{
          wxid: -1,
          sex:-1,
          grade:-1,
          telephone: -1,
          location:-1
        },
        rawData:{
          name:'',
          email:'',
          wxid: -1,
          sex:-1,
          grade:-1,
          telephone: -1,
          location:-1
        },
        dialogFormVisible:false,
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
      focusName(){
        this.$message('暂时不支持修改用户名')
      },
      focusMail(){
        this.$message('暂时不支持修改绑定的邮箱')
      },
      clickChange(){
        this.formData=JSON.parse(JSON.stringify(this.rawData))
        this.dialogFormVisible=true
      },
      clickSubmit(){
        this.$refs.form.validate(valid =>{
          if(valid){
            this.updateInfo()
            this.dialogFormVisible=false
            setTimeout(()=>this.getInfo(),0)
          }else{
            this.$message({
              message:'数据格式不正确',
              type:'warning'
            })
          }
        })
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
          this.formData=JSON.parse(JSON.stringify(this.rawData))
        },reason =>{
          this.$message({
            message:'请求超时，请检查网络设置',
            type:'error'
          })
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
      }
    },
    mounted(){
      this.getInfo()
    }
}
</script>