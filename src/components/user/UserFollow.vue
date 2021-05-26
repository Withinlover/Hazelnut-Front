<template>
  <div id="user-follow">
    <h1>我的关注</h1>

    <div v-for="item in nowItems" :key="item" class="follow-item">
      <el-avatar :size="50" :src="followUrl"></el-avatar>
      <div class="follow-info">
        <div class="follow-info-name">
          <p>关注的用户名</p>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="follow-info-location">
          <p>用户的年级</p>
          <p>用户的校区</p>
        </div>
      </div>
      <el-button type="primary" @click="cancelFollow(item)">取消关注</el-button>
      <el-divider></el-divider>
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
.follow-item{
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  align-items: center;
  width: 50rem;
  margin: auto;
}
.el-divider{
  margin: 0.8rem auto 0.8rem auto;
}
.follow-info{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  left: 1rem;
}
.follow-info .follow-info-name{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem;
}
.follow-info .follow-info-name p{
  margin: 0rem;
  margin-right: 1rem;
  font-weight:bolder;
}
.follow-info .follow-info-location{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0rem;
}
.follow-info .follow-info-location p{
  margin-bottom: 0.1rem;
  margin-right: 1rem;
  margin-top: 0.1rem;
}
.el-button{
  position: relative;
  right: -25rem;
}
</style>

<script>
export default {
  data(){
    return {
      pageSize:6,
      currentPage:1,
      allItems:[0,1,2,3,4,5,6,7,8,9,10,11],
      followUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      value:5
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
    },
    cancelFollow(item){
      console.log(item)
    }
  },
  mounted(){
    console.log('get follow list')
  }
}
</script>