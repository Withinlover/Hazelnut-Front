<template>
  <div class="Commodity">
    <div>
      <el-input
        class="searchInput"
        v-model="input"
        placeholder="请输入您想找的商品"
      ></el-input>
    </div>
    <commodity-card></commodity-card >
    <CommodityCard></CommodityCard>
    <div class="pool">
      <!-- all goods -->
    </div>
    <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
    ></el-backtop>
  </div>
</template>


<style scoped>
.Commodity {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchinput {
  margin: 10px;
  padding: 10px;
  width: 10px;
  flex: 1;
  /* cross-size: ; */
}
</style>

<script>
import CommodityCard from "../components/commodity/CommodityCard.vue";

export default {
  components: { CommodityCard },
};
</script>
