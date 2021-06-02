<template>
  <div id="user-avatar-form">
    <el-dialog title="修改头像" :visible.sync="visible">
      <el-avatar>

      </el-avatar>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  data(){
    return {
      visible:false
    }
  },
  methods:{
    open(){
      this.visible=true
    },
    close(){
      this.visible=false
    }
  }
}
</script>