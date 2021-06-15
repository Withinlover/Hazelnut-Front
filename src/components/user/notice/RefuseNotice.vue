<template>
  <base-notice
    :isRead="isRead"
    @read="read"
    @clickContent="clickContent"
    icon="el-icon-s-release"
    message="申请拒绝通知">
    <div class="refuse">
      {{text}}
    </div>
  </base-notice>
</template>

<style scoped>
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
      isGood:false,
      objectId:0
    }
  },
  methods:{
    read(){
      this.axios.post('/inform/info/',{
        id:this.id
      }).then(res =>{
        this.text=res.data.text
        this.isGood=res.data.type==0
        this.objectId=res.data.objectid
      })
      this.$emit('read')
    },
    clickContent(){
      let url=this.isGood? '/commodity/item/':'/demand/item/'
      this.$router.push(url+this.objectId)
    }
  }
}
</script>