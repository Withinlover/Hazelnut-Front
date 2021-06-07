<template>
  <div id="pag-bar">
    <el-pagination
      background
      layout="total,prev,next,jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="updatePage"
      hide-on-single-page>
    </el-pagination>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props:{
    pageSize:{
      type:Number,
      required:true
    },
    total:{
      type:Number,
      required:true
    }
  },
  methods:{
    updatePage(page){
      this.$emit('updatePage',page)
    }
  }
}
</script>