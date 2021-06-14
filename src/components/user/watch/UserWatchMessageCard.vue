<template>
  <!-- <el-card shadow="hover" class="card"> -->
    <el-row>
      <el-button @click="follow" v-show="!isFollowing"> 关注 </el-button>
      <el-button @click="unFollow" v-show="isFollowing"> 取消关注 </el-button>
      <el-button @click="ban" v-show="!isBanned && this.$store.state.level == -1"> 封禁该用户 </el-button>
      <el-button @click="ban" v-show="isBanned && this.$store.state.level == -1"> 解封该用户 </el-button>
    </el-row>
  <!-- </el-card> -->
</template>

<style scoped>
.card {
  /* width: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  text-align: left;
}

.el-card {
  margin-top: 10px;
}
</style>

<script>
export default {
  name: "UserWatchMessageCard",
  props: ["initialUserID"],
  data() {
    return {
      userID: this.initialUserID,
      username: "-1",
      isFollowing: false,
      isBanned: false, 
    };
  },
  methods: {
    getName() {
      var url = "/user/getinfo/";
      var data = {
        id: this.userID,
      };
      this.axios.post(url, data).then((res) => {
        // console.log(res.data);
        if (res.data["result"] === 1) {
          this.username = res.data.name;
        }
      });
    },
    updateInfo() {
      var url, data; 
      url = '/user/isban/';
      data = {
        id: this.userID,
      }
      this.axios.post(url, data).then((res) => {
        console.log(res.data);
        if (res.data.result === 1) {
          this.isBanned = res.data.isban;
          this.$emit("setBan", this.isBanned)
        }
      });

      url = '/user/isfollow/';
      data = {
        token: this.$store.state.token,
        id: this.userID,
      }
      this.axios.post(url, data).then((res) => {
        // console.log(res.data);
        if (res.data.result === 1) {
          this.isFollowing = res.data.isfollow;
        }
      })
    },
    follow() {
      var url, data;
      url = "/user/follow/";
      // console.log(this.username);
      data = {
        "token": this.$store.state.token,
        "username": this.username,
      };
      this.axios.post(url, data).then((res) => {
        if (res.data.result === 1)
          this.updateInfo();
      });
    },
    unFollow() {
      var url, data;
      url = "/user/unfollow/";
      console.log(this.username);
      data = {
        "token": this.$store.state.token,
        "username": this.username,
      };
      this.axios.post(url, data).then((res) => {
        if (res.data.result === 1)
          this.updateInfo();
      })
      this.updateInfo();
    },
    ban() {
      var url, data;
      url = "/user/ban/";
      data = {
        id: this.userID
      }
      this.axios.post(url, data).then((res) => {
        console.log(res.data);
        if (res.data.result === 1) 
          this.updateInfo();
      })
    },
    
  },
  mounted() {
    this.getName();
    console.log(this.$store.state.level)
    this.updateInfo();
  },
};
</script>