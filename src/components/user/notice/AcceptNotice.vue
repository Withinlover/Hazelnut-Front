<template>
  <base-notice
    :isRead="isRead"
    @read="read"
    @clickContent="clickContent"
    icon="el-icon-s-claim"
    message="申请通过通知">
    <div class="accept">
      {{text}}
    </div>
    <div class="after-rate" v-if="isRate">
      已评分
    </div>
    <div class="rate" v-else @click="clickRateBox($event)">
      <el-rate
        v-model="rate"
        allow-half
        :colors="colors"
        show-score
        @change="submitRate">
      </el-rate>
    </div>
  </base-notice>
</template>

<style scoped>
.accept{
  font-size: 16px;
  font-weight: bold;
  color: #999999;
}
.after-rate{
  margin-top: 5px;
  padding: 5px 10px;
  border: solid 1px #dddddd;
  border-radius: 20px;
  color: rgb(110, 91,80);
  font-weight: bold;
}
.rate{
  margin: 5px auto 0px 35%;
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
      isGood:false,
      objectId:0,
      isRate:true,
      rate:0,
      colors:['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods:{
    read(){
      this.axios.post('/inform/info/',{
        id:this.id
      }).then(res =>{
        this.text=res.data.text
        this.isRate=res.data.score
        this.isGood=res.data.type==0
        this.objectId=res.data.objectid
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
    },
    clickContent(){
      let url=this.isGood? '/commodity/item/':'/demand/item/'
      this.$router.push(url+this.objectId)
    },
    clickRateBox(event){
      event.stopPropagation()
    }
  }
}
</script>