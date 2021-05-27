<template>
  <div class="Commodity">
    <div class="search">
      <el-input
        class="searchInput"
        v-model="input"
        placeholder="请输入您想找的商品"
        prefix-icon="el-icon-search"
      ></el-input>
    </div>
    <a href="http://localhost:8080/commodity/item">
      <commodity-card
        imageUrl="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        title="Burger汉堡包"
        price="18.5"
      />
    </a>
    <div class="pool">
      <!-- all goods -->
    </div>
    <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
    ></el-backtop>

    <div class="icon-group">
      <div class="icon-circle-back">
        <i class="el-icon-arrow-up iconAbs"></i>
      </div>
      <router-link tag="dummy" to="/release">
        <div class="icon-circle-back">
          <i class="el-icon-plus iconAbs"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>


<style scoped>
.Commodity {
  display: flex;
  flex-direction: column;
  align-items: center;
}

el-input {
  padding: 10px;
  margin: 0;
}
.search {
  padding: 20px;
}
.searchinput {
  /* margin: 10px; */
  padding: 1em;
  width: 10px;
  display: flex;
  /* cross-size: ; */
}
.icon-circle-back {
  /* background-color: rgb(181, 158, 140); */
  background-color: rgb(110, 91, 80);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 23px;
  display: flex;
  margin: 10px;
  box-shadow: 2px 2px 5px rgb(177, 176, 176, 0.6);
}
.icon-circle-back:active {
  background-color: rgb(110, 91, 80, 0.8);
}

.iconAbs {
  align-self: center;
  width: 2em;
  padding-top: 20px;
  height: 2em;
  /* font-size: 4em; */
  font-weight: 900;
  color: rgb(224, 209, 193);
}
.icon-group {
  position: fixed;
  right: 30px;
  bottom: 30px;
  /* border: 3px solid #73ad21; */
}

</style>

<script>
import CommodityCard from "../components/commodity/CommodityCard.vue";

export default {
  components: { CommodityCard },
  data() {
    return {};
  },
};
</script>
