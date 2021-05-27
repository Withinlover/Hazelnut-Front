<template>
  <div id="user-released">
    <h1>当前发布</h1>
    <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left">当前发布商品</el-button>
      <el-button type="primary">当前发布需求<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>

    <div id="user-released-card">
      <el-card class="box-card" v-for="item in nowItems" :key="item">
        <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>
        <el-container>
          <el-aside width="7rem">
            <h2 class="title">商品标题</h2>
            <el-divider></el-divider>
            <h2 class="price">商品价格</h2>
          </el-aside>
          <el-main>
            <p>
              品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
            </p>
          </el-main>
        </el-container>
      </el-card>
    </div>
    
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
#user-released-card{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.el-card {
  margin: 1rem 0.5rem 0rem 0.5rem;
  width: 25rem;
  height:20rem;
}

.el-card .el-image{
  height: 10rem;
  width: 20rem;
}

.title{
  margin-bottom: 0.5rem;
}

.price{
  margin-top: 0.5rem;
}

.el-divider{
  margin: 0rem;
}

.el-pagination {
  margin-top: 1rem;
}
</style>

<script>
export default {
  data(){
    return {
      pageSize:4,
      currentPage:1,
      allItems:[0,1,2,3,4]
    }
  },
  computed:{
    nowItems(){
      let start=this.pageSize*(this.currentPage-1)
      let end=Math.min(this.total,start+this.pageSize)
      return this.allItems.slice(start,end)
    },
    total(){
      return this.allItems.length
    }
  },
  mounted(){
    console.log('send request')
  },
  methods:{
    updatePage(page){
      this.currentPage=page
    }
  }
}
</script>