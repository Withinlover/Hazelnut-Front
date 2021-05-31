<template>
  <div id="user-follow">
    <h1>我的关注</h1>

    <div v-for="item in nowItems" :key="item.id" class="follow-item">
      <el-avatar :size="50" :src="item.url"></el-avatar>
      <div class="follow-info">
        <div class="follow-info-name">
          <p>{{item.name}}</p>
          <el-rate
            v-model="item.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </div>
        <div class="follow-info-location">
          <p>{{item.grade}}</p>
          <p>{{item.location}}</p>
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
      allItems:[]
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
      this.axios.post('/user/unfollow/',{
        token:this.$store.state.token,
        username:item.name
      })
      this.getFollowList()
    },
    getFollowList(){
      this.axios.post('/user/followlist/',{
        token:this.$store.state.token
      }).then(res =>{
        this.allItems=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=i
          tmp.name=res.data.name[i]
          tmp.grade=res.data.grade[i]
          tmp.location=res.data.location[i]
          tmp.score=res.data.score[i]
          tmp.url=res.data.url[i]
          this.allItems.push(tmp)
        }
      })
    }
  },
  mounted(){
    this.getFollowList()
  }
}
</script>