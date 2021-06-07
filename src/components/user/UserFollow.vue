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
            score-template="{value}"
            v-if="item.score>=0">
          </el-rate>
          <p v-else>暂无交易记录</p>
        </div>
        <div class="follow-info-location">
          <p>{{item.grade}}</p>
          <p>{{item.location}}</p>
        </div>
      </div>
      <el-button type="primary" @click="cancelFollow(item)">取消关注</el-button>
      <el-divider></el-divider>
    </div>

    <pag-bar
      @updatePage="updatePage"
      :total="total"
      :pageSize="pageSize">
    </pag-bar>
  </div>
</template>

<style scoped>
h1{
  font-size: 30px;
}
.follow-item{
  position: relative;
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
  position: absolute;
  right: 1rem;
  top:0.5rem;
}
</style>

<script>
import PagBar from './nav/PagBar.vue'
const map={
  grade:['暂未填写年级','大一','大二','大三','大四'],
  location:['暂未填写校区','沙河校区','学院路校区'],
  defaultAvatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

export default {
  components:{
    PagBar
  },
  data(){
    return {
      pageSize:6,
      currentPage:1,
      Goods:[]
    }
  },
  computed:{
    total(){
      return this.Goods.length
    },
    nowItems(){
      let start=this.pageSize*(this.currentPage-1)
      let end=Math.min(this.total,start+this.pageSize)
      return this.Goods.slice(start,end)
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
      }).then(res =>{
        this.$message({
          message:'取消关注成功',
          type:'success'
        })
        this.getFollowList()
      },reason =>{
        this.$message({
          message:'请求超时，请检查网络设置',
          type:'error'
        })
      })
    },
    getFollowList(){
      this.axios.post('/user/followlist/',{
        token:this.$store.state.token
      }).then(res =>{
        this.Goods=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=i
          tmp.name=res.data.name[i]
          tmp.grade=res.data.grade[i]<0? map.grade[0]:map.grade[res.data.grade[i]]
          tmp.location=res.data.location[i]<0? map.location[0]:map.location[res.data.location[i]+1]
          tmp.score=res.data.score[i].toFixed(1)
          tmp.url=res.data.url[i] === 'NULL'? map.defaultAvatar:res.data.url[i]
          this.Goods.push(tmp)
        }
      })
    }
  },
  mounted(){
    this.getFollowList()
  }
}
</script>