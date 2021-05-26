<template>
  <div id="user-message">
    <h1>消息记录</h1>
    
    <el-row v-for="item in nowItems" :key="item">
      <el-col :span="14" :offset="item%2? 6:4">
        <div :class="item%2? 'msg-item-right':'msg-item-left'">
          <div class="msg-item-user">
            <el-avatar :size="50" :src="userUrl"></el-avatar>
            <p>用户名称</p>
          </div>
          <div class="msg-item-info">
            用户信息用户信息用户信息用户信息用户信息用户信息
            用户信息用户信息用户信息用户信息用户信息用户信息
          </div>
          <div class="msg-item-state" v-if="item%2">
            已读
          </div>
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
.el-row{
  margin-bottom: 1rem;
  
}
.el-col{
  border-radius: 0.5rem;
}
.msg-item-left,.msg-item-right{
  height: 6rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.msg-item-left{
  background-color: rgb(224, 209, 193);
}
.msg-item-right{
  background-color: rgb(198, 194, 191);
}
.msg-item-user{
  margin-left:0.5rem;
  margin-top:0.5rem;
}
.msg-item-user p{
  margin-top: 0rem;
}
.msg-item-info{
  width: 25rem;
  margin-left: 2rem;
}
</style>

<script>
export default {
  data(){
    return {
      pageSize:5,
      currentPage:1,
      allItems:[0,1,2,3,4,5,6,7,8,9,10,11],
      userUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
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
      console.log(this.pageSize)
    }
  },
  mounted(){
    console.log('get message')
  }
}
</script>