<template>
  <div id="follow-list">
    <follow-item
      v-for="(follow,index) in follows"
      :key="index"
      :avatarUrl="follow.avatarUrl"
      :grade="follow.grade"
      :location="follow.location"
      :name="follow.name"
      :score="follow.score"
      @cancelFollow="cancelFollow(index)">
    </follow-item>
  </div>
</template>

<style scoped>

</style>

<script>
import FollowItem from './FollowItem.vue'

export default {
  components:{
    FollowItem
  },
  props:{
    followList:{
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
    }
  },
  computed:{
    follows(){
      let start=this.pageSize*(this.curPage-1)
      let end=Math.min(this.followList.length,start+this.pageSize)
      return this.followList.slice(start,end)
    }
  },
  methods:{
    cancelFollow(index){
      this.$emit('cancelFollow',index)
    }
  }
}
</script>