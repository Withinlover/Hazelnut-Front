<template>
  <div class="detailPage">
 
    <div class="commo" :class="carouselStyle">
      <div class="block">
        <el-carousel
          class="carousel"
          height="500px"
          interval="5000"
          :direction="carouselDirect"
        >
        
          <el-carousel-item v-for="item in imageUrls" :key="item">
            <img class="commo-image" :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="detail-text">
        <div class="title">
          <span class="commo-type">{{ commoType }}</span
          >{{ commoInfo.title }}
        </div>
        <div class="brief-line">
          <div class="price">
            <span class="rmb">¥</span>
            <span class="priceNum">{{ commoInfo.price }}</span>
          </div>
          <div class="release-info">
            <div class="releaser">
             
              <img class="avatar" :src="commoInfo.releaser.avatar" />
              <span class="name">{{ commoInfo.releaser.name }}</span>
              <span class="rate">{{ commoInfo.releaser.credit }}</span>
            </div>
            <div class="release-data">发布于:{{ commoInfo.date }}</div>
          </div>
        </div>
        <el-divider />
        <div class="description">{{ commoInfo.description }}</div>
        <div class="button-row">
          <el-button class="button" type="danger" round>举报</el-button>
          <el-button
            class="button"
            type="primary"
            :disabled="false"
            round
            @click="applyForTrade"
            >申请交易</el-button
          >
          <!-- commoInfo.isSold -->
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

.detail-text {
  display: flex;
  flex-direction: column;
}
.title {
  font-family: Helvetica, Tahoma, Arial, STXihei, SimSun, "宋体", Heiti, "黑体",
    sans-serif;
  font-weight: 900;
  font-size: 2em;
  margin: 10px;
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
  margin: 8px 0;
  background: 0 0;
  width: 90%;
  align-self: center;
  border-top: 1px solid #e8eaec;
}
.description {
  margin: 5px 10px 20px 10px;
  text-align: justify;
  padding: 7px;
}
.button-row {
  align-self: right;
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
    let res = "";
    if (this.$props.commoType === "出") {
      res = await this.axios.post("good/goodinfo/", { id: this.$props.goodId });
    } else if (this.$props.commoType === "收") {
      res = await this.axios.post("demand/demandinfo/", {
        id: this.$props.goodId,
      });
    }

    let data = res.data;
    this.imageUrls = data.imageUrls;
    this.commoInfo = {
      title: data.title,
      price: data.price,
      releaser: {
        name: data.name,
        avatar: data.avatar,
        credit: data.credit,
      },
      date: data.date,
      description: data.description,
      isSold: data.isSold,
    };
  },
  methods: {
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
      let res = await this.axios.post("trade/apply/", {
        token: this.$store.state.token, //当前登录用户的token
        objectid: this.$props.goodId, // 商品ID或需求ID
        type: this.commoType === "出" ? 0 : 1, // 0表示商品,1表示需求
      });

      if (res.data.result === 1) {
        this.$notify({
          title: "申请交易成功",
          message: "请耐心等待帖主回复",
          type: "success",
        });
      } else {
        this.$notify(
          this.$notify.error({
            title: "申请交易失败",
            message: "换个商品看看吧",
          })
        );
      }
    },
  },

  data() {
    return {
      imageUrls: [
        "https://via.placeholder.com/500",
        "https://via.placeholder.com/500/FFFF00/000000?Text=WebsiteBuilders.com",
      ],
      window: {
        width: 0,
        height: 0,
      },
      carouselStyle: "commoNor",
      carouselDirect: "horizontal",
      commoInfo: {},
    };
  },
};
</script>
