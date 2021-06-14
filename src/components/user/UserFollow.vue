<template>
  <div id="user-follow">
    <h1>我的关注</h1>

    <follow-list
      v-if="total"
      :followList="follows"
      :curPage="curPage"
      :pageSize="pageSize"
      @cancelFollow="cancelFollow">
    </follow-list>
    <logo-hint
      v-else
      :hint="hint"
      style="margin-top:70px;">
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
import PagBar from './nav/PagBar.vue'
import LogoHint from './hint/LogoHint.vue'
import FollowList from './follow/FollowList.vue'
const map={
  grade:['暂未填写年级','大一','大二','大三','大四'],
  location:['暂未填写校区','沙河校区','学院路校区'],
  defaultAvatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}

export default {
  components:{
    PagBar,
    LogoHint,
    FollowList
  },
  data(){
    return {
      pageSize:6,
      curPage:1,
      follows:[],
      hint:'当前还没有关注任何人哦'
    }
  },
  computed:{
    total(){
      return this.follows.length
    }
  },
  methods:{
    updatePage(page){
      this.curPage=page
    },
    cancelFollow(index){
      this.follows.splice(index,1)
    }
  },
  mounted(){
    this.axios.post('/user/followlist/',{
      token:this.$store.state.token
    }).then(res =>{
      let length=res.data.name.length
      for(let i=0;i<length;i++){
        let tmp={}
        tmp.name=res.data.name[i]
        tmp.grade=res.data.grade[i]<0? map.grade[0]:map.grade[res.data.grade[i]]
        tmp.location=res.data.location[i]<0? map.location[0]:map.location[res.data.location[i]+1]
        tmp.score=res.data.score[i]
        tmp.avatarUrl=res.data.url[i] === 'NULL'? map.defaultAvatar:res.data.url[i]
        this.follows.push(tmp)
      }
    })
  }
}
</script>