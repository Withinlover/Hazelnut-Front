<template>
  <div class="detail">
    <!-- {{ window.width }}
    {{ window.height }} -->
    <div class="commo" :class="carouselStyle">
      <div class="block">
        <el-carousel class="carousel" height="500px">
          <el-carousel-item v-for="item in imageUrls" :key="item">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img class="commo-image" :src="item" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="detail-text">
        <div class="title">{{ commoInfo.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
}
.commo {
  border: 1px solid rgb(110, 91, 80, 0.8);
  border-radius: 30px;
  box-shadow: 2px 2px 3px rgb(110, 91, 80, 0.8);
  display: flex;
  overflow: hidden;
  justify-content: left;
}
.commoNor {
  margin: 10px 10%;
  height: 500px;
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
  height: 1000px;
  flex-direction: column;
  align-self: center;
}
.carousel {
  /* align-self: ; */
  width: 400px;
  height: 500px;
  margin-left-right: 10px;
}

.title {
  font-family: Helvetica, Tahoma, Arial, STXihei, SimSun, "宋体", Heiti, "黑体",
    sans-serif;
  font-weight: 900;
  font-size: 2em;
  padding: 10px;
  margin: 10px;
}
</style>

<script>
export default {
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width > 1050) this.carouselStyle = "commoWide";
      else if (this.window.width > 850) this.carouselStyle = "commoNor";
      else this.carouselStyle = "commoThin";
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
      commoInfo: {
        title: "Burger 汉堡",
        releaser: "林璐霞",
      },
    };
  },
};
</script>
