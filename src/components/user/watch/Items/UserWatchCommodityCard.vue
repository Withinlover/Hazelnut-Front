<template>
  <div class="commodity-card">
    <el-col :span="20" :offset="4">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="imageUrl" class="image" />
        <div style="padding: 14px">
          <span class="title">{{ title }}</span>
          <div class="bottom clearfix">
            <span class="rmb">¥</span>
            <span class="price">{{ price }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<style scoped>
.commodity-card {
  width: 240px;
  margin-top: 20px;
}
.bottom {
  margin-top: 13px;
  margin-bottom: 13px;
  line-height: 12px;
  float: right;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  align-self: center;

  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.title {
  /* float: center; */
  font-weight: bolder;
  margin-bottom: 15px;
  padding: 15px;
}
.price {
  font-size: medium;
  color: crimson;
  font-family: "Droid Serif", "Droid Serif", serif;
  font-weight: bolder;
  padding-left: 3px;
}
.rmb {
  color: crimson;
  font-size: small;
}
</style>

<script>
export default {
  name: "UserWatchCommodityCard",
  props: ["imageUrl", "title", "price"],
  data() {
    return {
      detail_url: "",
    };
  },
  methods: {},
};
</script>
