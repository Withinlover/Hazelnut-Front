<template>
  <div id="user-favorites">
    <h1>交易历史</h1>

    <button-bar
      leftText="已交易的商品"
      rightText="已解决的需求"
      :isLeft="isGood"
      @clickLeft="switchToGood"
      @clickRight="switchToDemand">
    </button-bar>

    <history-list
      v-if="total"
      :isDemand="!isGood"
      :curPage="curPage"
      :goodList="goods"
      :pageSize="pageSize">
    </history-list>
    <logo-hint
      v-else
      :hint="hint"
      style="margin-top:10px;">
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
import HistoryList from './good/HistoryList.vue'

export default {
  components:{
    LogoHint,
    ButtonBar,
    PagBar,
    HistoryList
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
      return '当前没有历史交易的'+(this.isGood? '商品':'需求')+'哦'
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
      this.axios.post('/trade/history/',{
        token:this.$store.state.token
      }).then(res =>{
        if(this.isGood){
          this.goods=res.data.history.filter(item => item.type===0)
        }else{
          this.goods=res.data.history.filter(item => item.type===1)
        }
      })
    }
  }
}
</script>