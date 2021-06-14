<template>
  <base-notice
    :isRead="isRead"
    @read="read"
    icon="el-icon-error"
    message="商品举报通知">
    <div class="report">
      {{text}}
    </div>
  </base-notice>
</template>

<style scoped>
.report{
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