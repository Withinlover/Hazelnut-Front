<template>
  <div id="good-list">
    <good-card
      v-for="good in goods"
      :key="good.id"
      :isDemand="isDemand"
      :goodId="good.id"
      :goodInfo="good.info"
      :goodName="good.name"
      :goodPrice="good.price.toFixed(1)"
      :imgUrl="good.url">
    </good-card>
  </div>
</template>

<style scoped>
#good-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 900px;
  margin:auto;
}
</style>

<script>
import GoodCard from './GoodCard.vue'

export default {
  components:{
    GoodCard
  },
  props:{
    goodList:{
      type:Array,
      required:true
    },
    pageSize:{
      type:Number,
      required:true
    },
    curPage:{
      type:Number,
      required:true
    },
    isDemand:{
      type:Boolean,
      required:true
    }
  },
  computed:{
    goods(){
      let start=this.pageSize*(this.curPage-1)
      let end=Math.min(this.goodList.length,start+this.pageSize)
      return this.goodList.slice(start,end)
    }
  }
}
</script>