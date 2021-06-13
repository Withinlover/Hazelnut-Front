<template>
  <div class="demand">
    <div class="search">
      <el-input
        class="searchInput"
        v-model="input"
        placeholder="请输入您想找的商品"
        prefix-icon="el-icon-search"
        @change="enterSearch"
      >
        <el-select
          class="select-search"
          v-model="selectType"
          slot="prepend"
          placeholder="选择分类"
          @change="enterSearch"
        >
          <el-option
            v-for="(type, index) in allTypes"
            :label="type"
            :value="index"
            :key="index"
          />
        </el-select>
      </el-input>
    </div>

    <div class="pool">
      <goods-cascade
        casType="demand"
        :casKeyword="casKeyword"
        :casCata="selectType"
        :key="casKey"
      />
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
.demand {
  display: flex;
  flex-direction: column;
  align-items: center;
    background: #FFF;
}

el-input {
  padding: 10px;
  margin: 0;
}

.select-search {
  width: 120px;
}
.search {
  padding: 20px;
}
.searchinput {
  padding: 1em;
  width: 30px;
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
      casKey: 0,
      casKeyword: "",
      selectType: "",
      allTypes: [],
    };
  },
  async mounted() {
    let res = "";
    try {
      res = await this.axios.get("/good/category");
    } catch (e) {
      return;
    }
    this.allTypes = res.data.category;
    this.allTypes.unshift("全部分类");
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    enterSearch(e) {
      // console.log(this.input);
      this.casKeyword = this.input;
      this.casKey++;
      this.input = "";
    },
  },
};
</script>
