<template>
  <el-card shadow="hover" class="card">
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="10">  
        <h1> > 用以下信息联系该用户 </h1> 
      </el-col>
      <el-col :span="10"> 
        <user-watch-message-card :initialUserID="this.userID" @setBan="setBan"/>
      </el-col>
    </el-row>
    <user-watch-info :initialUserID="this.userID"/>
  </el-card>
</template>

<style scoped>
h1 {
  font-size: 24px
}

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
</style>

<script>
import UserWatchInfo from './UserWatchHeaderCardItems/UserWatchInfo.vue';
import UserWatchMessageCard from './UserWatchMessageCard.vue';
const map = {
  sex: ["男", "女"],
  grade: ["大一", "大二", "大三", "大四"],
  location: ["沙河校区", "学院路校区"],
};

export default {
  components: { UserWatchInfo, UserWatchMessageCard },
  name: "UserWatchInfoCard",
  props: ["initialUserID"],

  data() {
    return {
      userID: this.initialUserID,
      rawData: {
        name: "",
        email: "",
        wxid: -1,
        sex: -1,
        grade: -1,
        telephone: -1,
        location: -1,
      },
    };
  },
  computed: {
    showData() {
      return {
        name: this.rawData.name,
        email: this.rawData.email,
        wxid: this.rawData.wxid == -1 ? "尚未填写微信号" : this.rawData.wxid,
        telephone:
          this.rawData.telephone == -1
            ? "尚未填写手机号"
            : this.rawData.telephone,
        sex:
          this.rawData.sex == -1 ? "尚未填写性别" : map.sex[this.rawData.sex],
        grade:
          this.rawData.grade == -1
            ? "尚未填写年级"
            : map.grade[this.rawData.grade - 1],
        location:
          this.rawData.location == -1
            ? "尚未填写校区"
            : map.location[this.rawData.location],
      };
    },
  },
  methods: {
    getInfo() {
      this.axios
        .post("/user/getinfo/", {
          id: this.userID,
        })
        .then(
          (res) => {
            this.rawData = res.data;
          },
          (reason) => {
            this.$message({
              message: "请求超时，请检查网络设置",
              type: "error",
            });
          }
        );
    },
    setBan(isBanned) {
      this.$emit("setBan", isBanned);
    }
  },
  mounted() {
    this.getInfo();
  },
};
</script>