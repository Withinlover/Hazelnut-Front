<template>
  <div id="history-list">
    <history-card
      v-for="good in goods"
      :key="good.objectid"
      :isDemand="isDemand"
      :goodId="good.objectid"
      :goodScore="good.score">
    </history-card>
  </div>
</template>

<style scoped>
#history-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 900px;
  margin:auto;
}
</style>

<script>
import HistoryCard from './HistoryCard.vue'

export default {
  components:{
    HistoryCard
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