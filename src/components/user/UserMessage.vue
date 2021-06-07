<template>
  <div id="user-message">
    <h1>消息记录</h1>
    
    <div v-if="nowItems.length>0">
      <div
        class="notices"
        v-for="item in nowItems"
        :key="item.id">
        <reply-notice 
          v-if="item.name==='留言回复通知'"
          :isRead="item.isread">
        </reply-notice>
        <apply-notice 
          v-else-if="item.name==='交易申请通知'"
          :isRead="item.isread">
        </apply-notice>
        <banned-notice
          v-else-if="'商品封禁通知'"
          :isRead="item.isread">
        </banned-notice>
        <finish-notice
          v-else
          :isRead="item.isread">
        </finish-notice>
      </div>
    </div>
    <logo-hint
      v-else
      hint="您暂时还没有通知哦">
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
import ReplyNotice from './notice/ReplyNotice.vue'
import ApplyNotice from './notice/ApplyNotice.vue'
import BannedNotice from './notice/BannedNotice.vue'
import FinishNotice from './notice/FinishNotice.vue'
import LogoHint from './hint/LogoHint.vue'
import PagBar from './nav/PagBar.vue'

export default {
  components:{
    ReplyNotice,
    ApplyNotice,
    BannedNotice,
    FinishNotice,
    LogoHint,
    PagBar
  },
  data(){
    return {
      pageSize:5,
      currentPage:1,
      Informs:[]
    }
  },
  computed:{
    total(){
      return this.Informs.length
    },
    nowItems(){
      let start=this.pageSize*(this.currentPage-1)
      let end=Math.min(this.total,start+this.pageSize)
      return this.Informs.slice(start,end)
    }
  },
  methods:{
    updatePage(page){
      this.currentPage=page
      console.log(this.pageSize)
    }
  },
  mounted(){
    this.axios.post('/inform/infolist/',{
      token:this.$store.state.token
    }).then(res=>{
      this.Informs=res.data.inform
    })
  }
}
</script>