<template>
  <base-notice
    :isRead="isRead"
    @read="read"
    icon="el-icon-circle-close"
    message="商品封禁通知">
    <div class="banned-box">
      <div class="banned">
        {{text}}
      </div>
    </div>
  </base-notice>
</template>

<style scoped>
.banned-box{
  margin: 0px auto 10px auto;
  width: 530px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1.5px #dddddd;
  border-radius: 20px;
}
.banned{
  width: 75%;
  padding-top: 7px;
  padding-bottom: 7px;
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
      text:''
    }
  },
  methods:{
    read(){
      this.axios.post('/inform/info/',{
        id:this.id
      }).then(res =>{
        this.text=res.data.text
      })
      this.$emit('read')
    }
  }
}
</script>