<template>
  <el-card shadow="hover" class="card">
    <p class="title"> 看看 {{ this.userName }} 都想卖什么：</p>
    <el-row>
      <el-col :span="24" :offset="0">
        <user-watch-cascade
          casType="commodity"
          :casKeyword="casKeyword"
          :casCata="selectType"
          :key="casKey"
          :allGoods="goods"
          :userID="userID"
        />
      </el-col>
    </el-row>
    <p class="title"> 看看 {{ this.userName }} 都想买什么：</p>
    <el-row>
      <el-col :span="24" :offset="0">
        <user-watch-cascade
          casType="demand"
          :casKeyword="casKeyword"
          :casCata="selectType"
          :key="casKey"
          :allGoods="goods"
          :userID="userID"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  text-indent: 2em;
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
import GoodList from "../../good/GoodList.vue";
import UserWatchCascade from "./UserWatchCascade.vue";

export default {
  components: { GoodList, UserWatchCascade },
  name: "UserWatchReleaseCard",
  props: ["initialUserID"],

  data() {
    return {
      userID: this.initialUserID,
      userName: "...",
      casKey: 0,
      casKeyword: "",
      selectType: "",
      goods: [],
    };
  },
  methods: {
    getInfo() {
      this.axios
        .post("/user/getuser/", {
          // token:this.$store.state.token,
          id: this.userID,
        })
        .then(
          (res) => {
            // console.log(res.data);
            if (res.data["result"] === 1) {
              this.userName = res.data.name;
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
    updateGood() {
      let url = "good/getgood/";
      this.axios
        .post(url, {
          id: this.userID,
        })
        .then((res) => {
          this.goods = [];
          let length = res.data.name.length;
          for (let i = 0; i < length; i++) {
            let tmp = {};
            tmp.id = res.data.id[i];
            tmp.name = res.data.name[i];
            tmp.info = res.data.description[i];
            tmp.price = res.data.price[i];
            tmp.url = res.data.url[i];
            this.goods.push(tmp);
          }
          console.log(this.goods);
        });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>