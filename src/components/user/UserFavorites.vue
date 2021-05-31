<template>
  <div id="user-favorites">
    <h1>我的收藏</h1>
    <el-button-group>
      <el-button 
        type="primary" 
        icon="el-icon-arrow-left"
        @click="switchToCommodity"
        :disabled="!isDemand">
        当前收藏商品
      </el-button>
      <el-button 
        type="primary" 
        @click="switchToDemand"
        :disabled="isDemand">
        当前收藏需求
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>

    <div id="user-favorites-card">
      <el-card class="box-card" v-for="item in nowItems" :key="item.id">
        <el-image :src="item.url"></el-image>
        <el-container>
          <el-aside width="7rem">
            <h2 class="title">{{item.name}}</h2>
            <el-divider></el-divider>
            <h2 class="price">{{item.price}}</h2>
          </el-aside>
          <el-main>
            <p>{{item.description}}</p>
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
#user-favorites-card{
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
      allItems:[],
      isDemand:false
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
    this.getGood()
  },
  methods:{
    updatePage(page){
      this.currentPage=page
    },
    switchToCommodity(){
      this.isDemand=false
      this.getGood()
    },
    switchToDemand(){
      this.isDemand=true
      this.getDemand()
    },
    getDemand(){
      this.axios.post('user/demandcollectlist/',{
        token:this.$store.state.token
      }).then(res =>{
        this.allItems=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=i
          tmp.name=res.data.name[i]
          tmp.description=res.data.description[i]
          tmp.price=res.data.price[i]
          tmp.url=res.data.url[i]
          this.allItems.push(tmp)
        }
      })
    },
    getGood(){
      this.axios.post('user/goodcollectlist/',{
        token:this.$store.state.token
      }).then(res =>{
        this.allItems=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=i
          tmp.name=res.data.name[i]
          tmp.description=res.data.description[i]
          tmp.price=res.data.price[i]
          tmp.url=res.data.url[i]
          this.allItems.push(tmp)
        }
      })
    }
  }
}
</script>