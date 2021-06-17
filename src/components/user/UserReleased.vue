<template>
  <div id="user-released">
    <h1>当前发布</h1>

    <button-bar
      leftText="当前发布商品"
      rightText="当前发布需求"
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
      :isFavorite="false"
      @deleteGood="handleDelete"
      @updateGood="handleUpdate">
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

    <update-button
      ref="updateButton"
      :initId="updateForm.goodId"
      :initText="updateForm.goodInfo"
      :initType="isGood?0:1">
    </update-button>
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
import UpdateButton from  '../release/updateButton.vue'

export default {
  components:{
    LogoHint,
    ButtonBar,
    PagBar,
    GoodList,
    UpdateButton
  },
  data(){
    return {
      pageSize:4,
      curPage:1,
      goods:[],
      isGood:true,
      updateForm:{
        goodId:0,
        goodInfo:''
      }
    }
  },
  computed:{
    total(){
      return this.goods.length
    },
    hint(){
      return '当前没有发布'+(this.isGood? '商品':'需求')+'哦'
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
      let url=this.isGood? 'good/getgood/':'demand/getdemand/'
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
    },
    handleDelete(index){
      this.goods.splice(index,1)
    },
    handleUpdate(index){
      this.updateForm.goodId=this.goods[index].id
      this.$refs.updateButton.getInfo()
      this.$refs.updateButton.show()
    }
  }
}
</script>