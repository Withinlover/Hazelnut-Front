<template>
  <div class="user-history">
    <h1>交易历史</h1>
    <el-container>
      <el-aside width="20rem">
        <UserNavBar></UserNavBar>
      </el-aside>

      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </el-main>

      <el-aside width="20rem">
        
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped>
.el-card {
  margin: 2em auto 0rem auto;
}

.el-pagination{
  margin-top: 2rem;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>

<script>
import UserNavBar from '../components/UserNavBar.vue'

export default {
    components:{
      UserNavBar
    }
}
</script>