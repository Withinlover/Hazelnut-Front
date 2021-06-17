<template>
  <div id="user-favorites">
    <h1>我的收藏</h1>

    <button-bar
      leftText="当前收藏商品"
      rightText="当前收藏需求"
      :isLeft="isGood"
      @clickLeft="switchToGood"
      @clickRight="switchToDemand">
    </button-bar>

    <good-list
      v-if="total"
      :isDemand="!isGood"
      :curPage="curPage"
      :goodList="goods"
      :pageSize="pageSize"
      :isFavorite="true">
    </good-list>
    <logo-hint
      v-else
      :hint="hint">
    </logo-hint>
    
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
  user-select: none;
}
</style>

<script>
import LogoHint from './hint/LogoHint.vue'
import ButtonBar from './nav/ButtonBar.vue'
import PagBar from './nav/PagBar.vue'
import GoodList from './good/GoodList.vue'

export default {
  components:{
    LogoHint,
    ButtonBar,
    PagBar,
    GoodList
  },
  data(){
    return {
      pageSize:4,
      curPage:1,
      goods:[],
      isGood:true
    }
  },
  computed:{
    total(){
      return this.goods.length
    },
    hint(){
      return '当前没有收藏'+(this.isGood? '商品':'需求')+'哦'
    }
  },
  mounted(){
    this.updateGood()
  },
  methods:{
    updatePage(page){
      this.curPage=page
    },
    switchToGood(){
      this.isGood=true
      this.curPage=1
      this.updateGood()
    },
    switchToDemand(){
      this.isGood=false
      this.curPage=1
      this.updateGood()
    },
    updateGood(){
      let url=this.isGood? 'user/goodcollectlist/':'user/demandcollectlist/'
      this.axios.post(url,{
        token:this.$store.state.token
      }).then(res =>{
        this.goods=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=res.data.id[i]
          tmp.name=res.data.name[i]
          tmp.info=res.data.description[i]
          tmp.price=res.data.price[i]
          tmp.url=res.data.url[i]
          this.goods.push(tmp)
        }
      })
    }
  }
}
</script>