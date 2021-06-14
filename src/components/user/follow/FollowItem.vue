<template>
  <div class="follow-item">
    <img :src="avatarUrl" @click="enterUserWatch"/>
    <div class="follow-info">
      <div class="follow-info-name">
        <p @click="enterUserWatch">
          {{name}}
        </p>
        <el-rate
          v-model="score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          v-if="score>=0">
        </el-rate>
        <p v-else>暂无交易记录</p>
      </div>
      <div class="follow-info-location">
        <p>{{grade}}</p>
        <p>{{location}}</p>
      </div>
    </div>
    <el-button type="primary" @click="cancelFollow">取消关注</el-button>
    <el-divider></el-divider>
  </div>
</template>

<style scoped>
.follow-item{
  position: relative;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: center;
  width: 50rem;
  margin: auto;
}
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor:pointer;
}
img:hover{
  box-shadow: 0px 0px 5px 2px rgb(224, 209, 193);
}
.follow-info{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  left: 1rem;
}
.follow-info-name{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem;
}
.follow-info-name p{
  margin: 0rem;
  margin-right: 1rem;
  font-weight:bolder;
  cursor: pointer;
}
.follow-info-name p:hover{
  color: rgb(224, 209, 193);
}
.follow-info-location{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem;
}
.follow-info-location p{
  margin-bottom: 0.1rem;
  margin-right: 1rem;
  margin-top: 0.1rem;
}
.el-button{
  position: absolute;
  right: 1rem;
  top:0.5rem;
}
.el-divider{
  margin: 0.8rem auto 0.8rem auto;
}
</style>

<script>
export default {
  props:{
    name:{
      type:String,
      required:true
    },
    avatarUrl:{
      type:String,
      required:true
    },
    score:{
      type:Number,
      required:true
    },
    grade:{
      type:String,
      required:true
    },
    location:{
      type:String,
      required:true
    },
    userId:{
      type:true,
      required:true
    }
  },
  methods:{
    enterUserWatch(){
      this.$router.push('/user/watch/'+this.userId)
    },
    cancelFollow(){
      this.axios.post('/user/unfollow/',{
        token:this.$store.state.token,
        username:this.name
      }).then(res =>{
        this.$emit('cancelFollow')
        this.$message({
          message:'取消关注成功',
          type:'success'
        })
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
    }
  }
}
</script>