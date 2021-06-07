<template>
  <el-card shadow="hover" class="card">
    <h1> 个人信息 - 历史记录 ？</h1>
  </el-card>
</template>

<style scoped>
.card {
  /* width: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  margin: 10px;
  padding: 20px;
  padding-bottom: 20px;
  text-align: left;
}

.el-card {
  margin-top: 10px;
}

</style>

<script>
export default {
  name: 'UserWatchMessageCard',
  props: ['initialUserID'],

  data () {
    return {
      userID: this.initialUserID,
    }
  },
  mounted() {
    var url = '/user/getinfo/';
    var data = {
      "id" : this.userID,
    }
    this.axios.post(url, data).then((res) => {
      console.log(res.data);
    })
  }
}
</script>