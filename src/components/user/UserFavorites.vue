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
      :goodList="Goods"
      :pageSize="pageSize">
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
      Goods:[],
      isGood:true
    }
  },
  computed:{
    total(){
      return this.Goods.length
    },
    hint(){
      return '当前没有收藏'+(this.isDemand? '需求':'商品')+'哦'
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
      this.updateGood()
    },
    switchToDemand(){
      this.isGood=false
      this.updateGood()
    },
    updateGood(){
      let url=this.isGood? 'user/goodcollectlist/':'user/demandcollectlist/'
      this.axios.post(url,{
        token:this.$store.state.token
      }).then(res =>{
        this.Goods=[]
        let length=res.data.name.length
        for(let i=0;i<length;i++){
          let tmp={}
          tmp.id=res.data.id[i]
          tmp.name=res.data.name[i]
          tmp.info=res.data.description[i]
          tmp.price=res.data.price[i]
          tmp.url=res.data.url[i]
          this.Goods.push(tmp)
        }
      })
    }
  }
}
</script>