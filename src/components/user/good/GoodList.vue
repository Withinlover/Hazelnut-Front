<template>
  <div id="good-list">
    <template v-if="isFavorite">
      <favorite-card
        v-for="good in goods"
        :key="good.id"
        :isDemand="isDemand"
        :goodId="good.id"
        :goodInfo="good.info"
        :goodName="good.name"
        :goodPrice="good.price.toFixed(1)"
        :imgUrl="good.url">
      </favorite-card>
    </template>
    <template v-else>
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
    </template>
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
import FavoriteCard from './FavoriteCard.vue'

export default {
  components:{
    GoodCard,
    FavoriteCard
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
    },
    isFavorite:{
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