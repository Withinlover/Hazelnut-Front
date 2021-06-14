<template>
  <base-notice
    :isRead="isRead"
    @read="read"
    icon="el-icon-s-claim"
    message="商品举报通知">
    <div
      class="accept-box"
      v-if="isAccept">
      <div class="accept">
        {{text}}
      </div>
    </div>
    <div 
      class="refuse-box"
      v-else>
      <div class="refuse">
        {{text}}
      </div>
    </div>
  </base-notice>
</template>

<style scoped>
.accept-box{
  margin: 0px auto 10px auto;
  width: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1.5px #dddddd;
  border-radius: 20px;
}
.accept{
  margin-top: 10px;
  margin-bottom: 10px;
  width: 75%;
  font-size: 16px;
  font-weight: bold;
  color: #999999;
}
.after-rate{
  margin-bottom: 5px;
  padding: 5px 10px;
  border: solid 1px #dddddd;
  border-radius: 20px;
  color: rgb(110, 91,80);
  font-weight: bold;
}
.rate{
  margin: 0px auto 10px 202px;
}
.refuse-box{
  margin: 0px auto 10px auto;
  width: 530px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1.5px #dddddd;
  border-radius: 20px;
}
.refuse{
  font-size: 16px;
  font-weight: bold;
  color: #999999;
}
</style>

<script>
import BaseNotice from './BaseNotice.vue'

export default {
  components:{
    BaseNotice
  },
  props:{
    isRead:{
      type:Boolean,
      required:true
    },
    id:{
      type:Number,
      required:true
    }
  },
  data(){
    return {
      text:'',
      isRate:true,
      rate:0,
      colors:['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  computed:{
    isAccept(){
      return this.text.indexOf('确认')>=0
    }
  },
  methods:{
    read(){
      this.axios.post('/inform/info/',{
        id:this.id
      }).then(res =>{
        this.text=res.data.text
        this.isRate=res.data.score
      })
      this.$emit('read')
    },
    submitRate(){
      this.axios.post('inform/scoring/',{
        infoid:this.id,
        score:this.rate
      }).then(res =>{
        this.isRate=true
        this.$message({
          type:'success',
          message:'评分成功'
        })
      },reason =>{
        this.$message({
          type:'error',
          message:'请求超时，请检查网络设置'
        })
      })
    }
  }
}
</script>