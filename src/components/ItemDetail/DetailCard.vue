<template>
  <div class="detailPage">
    <div class="commo" :class="carouselStyle">
      <div class="block">
        <el-carousel
          class="carousel"
          height="500px"
          :interval="5000"
          :direction="carouselDirect"
        >
          <el-carousel-item v-for="(item, idx) in imageUrls" :key="item">
            <img class="commo-image" :src="item" @click="popUoImg(idx)" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <el-dialog :visible.sync="dialogVisible" class="popup">
        <div>
          <img :src="imageUrls[popImageIdx]" width="100%" />
        </div>
      </el-dialog>

      <div class="detail-text">
        <div class="title">
          <span class="commo-type">{{ commoType }}</span
          >{{ commoInfo.title }}
          <span :hidden="own || !$store.state.isLogin" style="cursor:pointer;">
            <span :hidden="commoInfo.isCollect">
              <i class="el-icon-star-off collect" @click="collectItem" />
            </span>
            <span :hidden="!commoInfo.isCollect">
              <i class="el-icon-star-on collect" @click="unCollectItem" />
            </span>
          </span>
        </div>
        <div class="brief-line">
          <div class="price">
            <span class="rmb">¥</span>
            <span class="priceNum">{{ commoInfo.price }}</span>
          </div>
          <div class="release-info">
            <router-link
              class="releaser"
              tag="div"
              :to="'/user/watch/' + commoInfo.releaser.id"
            >
              <div class="releaser">
                <img class="avatar" :src="commoInfo.releaser.avatar" />
                <span class="name">{{ commoInfo.releaser.name }}</span>
                <span class="rate">{{ commoInfo.releaser.credit }}</span>
              </div>
            </router-link>
            <div class="release-data">发布于:{{ commoInfo.date }}</div>
          </div>
        </div>
        <el-divider />
        <div class="description">{{ commoInfo.description }}</div>
        <div class="button-row" v-if="$store.state.isLogin">
          <!-- own : {{ own }} $store.state.level : {{ $store.state.level }} !own and
          $store.state.level !== -1:
          {{ !own && $store.state.level !== -1 }} store not -1 :{{
            $store.state.level !== '-1'
          }} -->
          <el-button
            v-if="!own && $store.state.level !== '-1'"
            class="button"
            type="danger"
            @click="report"
            round
            >举报</el-button
          >
          <el-button
            v-else
            class="button"
            type="danger"
            @click="deleteGood"
            round
            >下架</el-button
          >
          <el-button
            class="button"
            type="primary"
            :disabled="commoInfo.isSold === 1"
            round
            :key="soldId"
            @click="applyForTrade"
            >{{ commoInfo.isSold == 1 ? "已卖出" : "申请交易" }}</el-button
          >
          <!-- {{ commoInfo.isSold }}{{ commoInfo.isSold ? "已卖出" : "申请交易" }} -->
        </div>
        <div v-else class="button-row">
          请先 <router-link to="/" class="router"> 登录 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detailPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router {
  display: inline-block;
  color: #877;
}
.commo {
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(110, 91, 80, 0.2);
  display: flex;
  overflow: hidden;
  justify-content: left;
}
.commoNor {
  margin: 10px 10%;
  height: 500px;
  width: 800px;
  flex-direction: row;
}
.commoWide {
  margin: 10px;
  width: 800px;
  height: 500px;
  align-self: center;
  flex-direction: row;
}
.commoThin {
  margin: 10px 10%;
  width: 400px;
  flex-direction: column;
  align-self: center;
}

.carousel {
  width: 400px;
  height: 500px;
  margin-right: 10px;
}
.commo-image {
  height: 100%;
}
.detail-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 380px;
}
.title {
  font-family: Helvetica, Tahoma, Arial, STXihei, SimSun, "宋体", Heiti, "黑体",
    sans-serif;
  font-weight: 900;
  font-size: 2em;
  margin: 10px;
  margin-top: 30px;
  text-align: center;
}
.commo-type {
  color: white;
  font-size: 50%;
  padding: 3px;
  margin: 8px;
  background: red;
  border-radius: 20%;
  vertical-align: middle;
}
.collect {
  color: gold;
}
.brief-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
}
.price {
  color: red;
  font-weight: bold;
  display: inline-block;
  font-size: 2.3em;
  margin: 10px;
}
.rmb {
  font-size: smaller;
}
route-link .avatar {
  margin-left: 10px;
}
.avatar {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin: 5px;
}
.release-info {
  display: flex;
  flex-direction: column;
}
.releaser {
  height: 25px;
  align-self: left;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  margin-bottom: 7px;
  align-items: center;
  width: 100;
  cursor: pointer;
}
.name {
  align-self: center;
  line-height: 30px;
  color: dimgrey;
  font-size: smaller;
  margin-right: 5px;
}

.rate {
  color: orange;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.release-data {
  color: rgb(153, 152, 152);
  align-self: start;
  margin: 0px 25px;
  font-size: smaller;
}
.el-divider--horizontal {
  margin-left: 10px;
  margin-right: 10px;
  background: 0 0;
  border-top: 1px solid #e8eaec;
}
.description {
  margin: 5px 10px 20px 10px;
  text-align: justify;
  padding: 7px;
}
.button-row {
  margin-bottom: 30px;
}
.button-row:last-of-type {
  margin-top: auto;
}

.button {
  margin: 10px;
  align-self: right;
  width: 100px;
}
</style>

<script>
export default {
  name: "DetailCard",
  props: ["commoType", "goodId"],
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  async mounted() {
    this.getDetail();
  },
  methods: {
    popUoImg(idx) {
      this.popImageIdx = idx;
      this.dialogVisible = true;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width > 1050) {
        this.carouselStyle = "commoWide";
        this.carouselDirect = "horizontal";
      } else if (this.window.width > 850) {
        this.carouselStyle = "commoNor";
        this.carouselDirect = "horizontal";
      } else {
        this.carouselStyle = "commoThin";
        this.carouselDirect = "vertical";
      }
    },
    async applyForTrade() {
      let res = "";
      try {
        res = await this.axios.post("trade/apply/", {
          token: this.$store.state.token, //当前登录用户的token
          objectid: this.$props.goodId, // 商品ID或需求ID
          type: `${this.$props.commoType === "出" ? 0 : 1}`, // 0表示商品,1表示需求
        });
      } catch (e) {
        this.$router.push({ path: "/error" });
        return;
      }

      if (res.data.result === 1) {
        this.$notify({
          title: "申请交易成功",
          message: "请耐心等待帖主回复",
          type: "success",
        });
      } else {
        this.$notify.error({
          title: "申请交易失败",
          message: res.data.message,
        });
      }
      this.getDetail();
    },

    async getDetail() {
      let res = "";
      try {
        if (this.$props.commoType === "出") {
          res = await this.axios.post("good/goodinfo/", {
            id: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        } else if (this.$props.commoType === "收") {
          res = await this.axios.post("demand/demandinfo/", {
            id: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        }
      } catch (e) {
        this.$router.push({ path: "/error" });
        return;
      }

      let data = res.data;
      this.own = data.own; //
      this.imageUrls = data.imageUrls;
      this.commoInfo = {
        id: data.id,
        title: data.title,
        price: data.price,
        releaser: {
          id: data.userid,
          name: data.name,
          avatar: data.avatar,
          credit: data.credit,
        },
        date: data.date,
        description: data.description,
        isSold: data.isSold,
        isCollect: data.iscollect,
        canTrade: data.canTrade,
      };
    },
    async collectItem() {
      let res = "";
      try {
        if (this.$props.commoType === "出") {
          res = await this.axios.post("good/collect/", {
            goodid: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        } else if (this.$props.commoType === "收") {
          res = await this.axios.post("demand/collect/", {
            demandid: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        }
      } catch (e) {
        this.$router.push({ path: "/error" });
        return;
      }
      if (res.data.result === 1) {
        this.$notify({
          title: res.data.message,
          message: "",
          type: "success",
        });
        this.getDetail();
      } else
        this.$notify.error({
          title: res.data.message,
          message: "",
        });
    },
    async unCollectItem() {
      let res = "";
      try {
        if (this.$props.commoType === "出") {
          res = await this.axios.post("good/uncollect/", {
            goodid: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        } else if (this.$props.commoType === "收") {
          res = await this.axios.post("demand/uncollect/", {
            demandid: this.$props.goodId,
            token: this.$store.state.isLogin ? this.$store.state.token : null,
          });
        }
      } catch (e) {
        this.$router.push({ path: "/error" });
        return;
      }
      if (res.data.result === 1) {
        this.$notify({
          title: res.data.message,
          message: "",
          type: "success",
        });

        this.getDetail();
      } else {
        this.$notify.error({
          title: res.data.message,
          message: "",
        });
      }
    },

    async report() {
      let res;
      try {
        res = await this.axios.post("good/report/", {
          id: this.$props.goodId,
          type: this.$props.commoType === "出" ? 0 : 1,
        });
      } catch (e) {
        this.$router.go(this.$router.currentRoute);
        return;
      }
      if (res.data.result === 1) {
        this.$notify({
          title: res.data.message,
          message: "",
          type: "success",
        });
      } else {
        this.$notify.error({
          title: res.data.message,
        });
      }
    },

    async deleteGood() {
      let res = "";
      try {
        res = await this.axios.post("good/delete/", {
          id: this.$props.goodId, // 商品/需求ID
          type: this.$props.commoType === "出" ? 0 : 1, // 0商品 1需求
        });
      } catch (e) {
        // this.$router.go(this.$router.currentRoute);
        return;
      }
      let data = res.data;
      if (res.data.result === 1) {
        this.$notify({
          title: res.data.message,
          message: data.message,
          type: "success",
        });
      } else {
        this.$notify.error({
          title: res.data.message,
          message: "等会再试试吧",
        });
      }
    },
  },

  data() {
    return {
      data: "",
      dialogVisible: false,
      starKey: 0,
      popImageIdx: 0,
      soldId: 0,
      own: false,
      imageUrls: ["https://via.placeholder.com/500"],
      window: {
        width: 0,
        height: 0,
      },
      carouselStyle: "commoNor",
      carouselDirect: "horizontal",
      commoInfo: {
        releaser: {
          name: "",
          avatar: "",
          credit: 0,
          isCollect: false,
        },
      },
    };
  },
};
</script>
