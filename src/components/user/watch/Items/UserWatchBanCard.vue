<template> 
  <el-card shadow="hover" class="card" v-show="isBanned">
    <span class="warning">
      Warning: 
    </span>
    <span class="text">
      此用户已被系统管理员封禁，详情请联系<a href="mailto:18377221@buaa.eedu.cn">Marvolo</a>
    </span>
  </el-card>
</template>

<style scoped>
.card {
  /* width: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  margin: 10px;
  text-align: left;
}

.el-card {
  margin-top: 10px;
}

.el-tag {
  height: 3rem;
  width: 6.5rem;
  font-size: 1rem;
  padding-top: 0.5rem;
}
.text {
  font-size: 16px;
  font-weight: bold;
  text-indent: 2em;
}

.warning {
  color: red;
  font-weight: bold;
}
</style>

<script>

export default {
  name: "UserWatchBanCard",
  props: ["initialUserID"],
  data () {
    return {
      userID: this.initialUserID,
      username: "-1",
      isBanned: false, 
    }
  },
  methods: {
    updateInfo() {
      var url, data; 
      url = '/user/isban/';
      data = {
        id: this.userID,
      }
      console.log(this.id);
      this.axios.post(url, data).then((res) => {
        if (res.data.result === 1) {
          this.isBanned = res.data.isban;
        }
      });
    },
  }, 
  mounted() {
    this.updateInfo();
  }
}
</script>