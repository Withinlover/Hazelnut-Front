<template>
  <div class="cascade" v-if="this.loaded">
    <div
      class="cascade-col"
      v-for="(col, index) in cascadeCol"
      :key="index"
      v-infinite-scroll="loadCascade"
      style="overflow: auto"
    >
      <div v-for="good in col" :key="good.id">
        <commodity-card
          :imageUrl="good.urls"
          :title="good.name"
          :price="good.price"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>
.cascade {
  display: flex;
  flex-direction: row;
}
.cascade-col {
  display: flex;
  flex-direction: column;
}
.inf-col {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import CommodityCard from "./CommodityCard.vue";

export default {
  name: "GoodsCascade",
  props: ["casType"],
  components: { CommodityCard },

  data() {
    return {
      allGoods: [],
      cascadeCol: [[], [], [], []],
      loading: false,
      loaded: false,
    };
  },

  async mounted() {
    // console.log(this.$props.casType);
    let res = "";
    if (this.$props.casType === "comm") {
      res = await this.axios.post("good/allgood/", {});
      this.allGoods = res.data.good;
    } else if (this.$props.casType === "demand") {
      res = await this.axios.post("demand/alldemand/", {});
      this.allGoods = res.data.demand;
    }
    console.log(this.allGoods[0]);
    if (this.allGoods.length === 0) return;
    this.cascadeCol[3].push(this.allGoods.pop());
    this.loaded = true;
  },

  methods: {
    async loadCascade() {
      if (!this.loaded) {
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (this.allGoods.length === 0) return;
        this.cascadeCol[i].push(this.allGoods.pop());
      }
    },
  },
};
</script>
