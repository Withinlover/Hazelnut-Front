<template>
  <div id="user-message">
    <h1>消息记录</h1>
    
    <el-row :gutter="20">
      <el-col
      v-for="item in nowItems"
      :key="item"
      :span="12">
        <div class="msg-item">

        </div>
      </el-col>
    </el-row>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="updatePage">
    </el-pagination>
  </div>
</template>

<style scoped>
.el-col{
  border-radius: 0.5rem;
}
.msg-item{
  background-color: red;
  height: 4rem;
}
</style>

<script>
export default {
  data(){
    return {
      pageSize:6,
      currentPage:1,
      allItems:[0,1,2,3,4,5,6,7,8,9,10,11]
    }
  },
  computed:{
    total(){
      return this.allItems.length
    },
    nowItems(){
      let start=this.pageSize*(this.currentPage-1)
      let end=Math.min(this.total,start+this.pageSize)
      return this.allItems.slice(start,end)
    }
  },
  methods:{
    updatePage(page){
      this.currentPage=page
    }
  },
  mounted(){
    console.log('get message')
  }
}
</script>