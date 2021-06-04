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

    <div class="pool">
      <!-- all goods -->
      <goods-cascade casType="commodity" />
    </div>

    <div class="icon-group">
      <div class="f">
        <div @click="scrollToTop()" class="icon-circle-back">
          <i class="el-icon-arrow-up iconAbs" />
        </div>
      </div>

      <router-link tag="div" to="/release">
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
  padding: 1em;
  width: 10px;
  display: flex;
}
.icon-circle-back {
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
  font-weight: 900;
  color: rgb(224, 209, 193);
}
.icon-group {
  position: fixed;
  right: 30px;
  bottom: 30px;
}
</style>

<script>
import GoodsCascade from "../components/commodity/GoodsCascade.vue";

export default {
  components: { GoodsCascade },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>
