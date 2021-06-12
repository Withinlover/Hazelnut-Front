<template>
  <el-card shadow="hover" class="card" :style="'background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0)), url(' + this.userImgUrl + ' )'">
    <el-row>
      <el-col :span="8">
        <user-watch-avatar :initialUserID="userID" />
      </el-col>
      <el-col :span="16" class="down">
        <el-col :span="4">
          <el-row class="title">
            关注数
          </el-row>
          <el-row class="context">
            {{num.following}}
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="title">
            被关注数
          </el-row>
          <el-row class="context">
            {{num.followed}}
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="title">
            交易数
          </el-row>
          <el-row class="context">
            {{num.trade}}
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="title">
            发布商品
          </el-row>
          <el-row class="context">
            {{num.good}}
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row class="title">
            发布需求
          </el-row>
          <el-row class="context">
            {{num.trade}}
          </el-row>
        </el-col>
      </el-col>
    </el-row>
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
  background-size: cover;
}

.down {
  position: absolute;
  bottom: 0;
  right: 0;

  text-align: center;
}

.el-card {
  margin-top: 50px;
}

.title {
  font-size: 14px;
  color: darkslategrey;
}

.context {
  font-size: 16px;
  color: black;
  margin-top: 2px;
}
</style>

<script>
import UserWatchAvatar from "./UserWatchHeaderCardItems/UserWatchAvatar.vue";
export default {
  components: { UserWatchAvatar },
  name: "UserWatchHeaderCard",
  props: ["initialUserID"],

  data() {
    return {
      userID: this.initialUserID,
      userImgUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userName: "正在加载",
      userCredit: "?",
      num: {
        followed: -1,
        following: -1,
        trade: -1,
        good: -1,
        demand: -1,
      }
    };
  },
  methods: {
    getBaseInfo() {
      this.axios
        .post("/user/getuser/", {
          // token:this.$store.state.token,
          id: this.userID,
        })
        .then(
          (res) => {
            // console.log(res.data);
            if (res.data["result"] === 1) {
              this.userImgUrl =
                res.data.url === "NULL" ? this.userImgUrl : res.data.url;
              this.userName = res.data.name;
              this.userCredit = res.data.score < 0 ? "?" : res.data.score;
            }
          },
          (reason) => {
            this.$message({
              message: "请求超时，请检查网络设置",
              type: "error",
            });
          }
        );
    },
    getCount() {
      var url, data; 
      url = '/user/count/';
      data = {
        id: this.userID,
      }
      this.axios.post(url, data).then((res) => {
        if (res.data['result'] === 1) {
        // console.log(res.data);
          this.num = res.data;
        }
      })
    }
  },
  mounted() {
    this.getBaseInfo();
    this.getCount();
  },
};
</script>