<template>
  <div class="commodity-card">
    <el-col :span="20">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img :src="image_url" class="image" />
        <div style="padding: 14px">
          <span class="title">{{ title }}</span>
          <div class="bottom clearfix">
            <span class="rmb">¥</span>
            <span class="price">{{ price }}</span>
            <!-- <el-button type="text" class="button">操作按钮</el-button> -->
          </div>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<style>
.commodity-card {
  padding: 10px;
}
.bottom {
  margin-top: 13px;
  margin-bottom: 13px;
  line-height: 12px;
  float: right;
  margin-left: 10px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
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
  float: center;
  font-weight: bolder;
  margin-bottom: 15px;
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
  name: "CommodityCard",
  data() {
    return {
      // title: "Burger汉堡这其实是一个超级长的标题blabla",
      title: "Burger汉堡",
      image_url:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      price: 10.5,
      detail_url: "",
    };
  },
  methods: {},
};
</script>
