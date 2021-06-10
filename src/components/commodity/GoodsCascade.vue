<template>
  <div class="cascade" v-if="this.loaded">
    <div class="not-find" :hidden="hasGoods">
      没有查到任何商品哦，换个关键词再试试吧
    </div>
    <div
      :hidden="!hasGoods"
      class="cascade-col"
      v-for="(col, index) in cascadeCol"
      :key="index"
      v-infinite-scroll="loadCascade"
      style="overflow: auto"
    >
      <div v-for="good in col" :key="good.id">
        <router-link :to="toUrl(casType, good.id)" tag="div">
          <commodity-card
            :imageUrl="good.urls"
            :title="good.name"
            :price="good.price"
          />
        </router-link>
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
.not-find {
  margin: 30px;
  font-size: 150%;
}
</style>

<script>
import CommodityCard from "./CommodityCard.vue";

export default {
  name: "GoodsCascade",
  props: ["casType", "casKeyword"],
  components: { CommodityCard },
  computed: {},
  data() {
    return {
      allGoods: [],
      cascadeCol: [[], [], [], []],
      loading: false,
      loaded: false,
      hasGoods: true,
    };
  },

  async mounted() {
    let res = "";
    if (this.$props.casKeyword !== "") {
      // show searching result
      if (this.$props.casType === "commodity") {
        res = await this.axios.post("search/", {
          type: 0,
          key: this.$props.casKeyword,
        });
        this.allGoods = res.data.object;
      } else if (this.$props.casType === "demand") {
        res = await this.axios.post("search/", {
          type: 0,
          key: this.$props.casKeyword,
        });
        // console.log(res.data.len);
        this.allGoods = res.data.object;
      }
    } else {
      // show all goods
      if (this.$props.casType === "commodity") {
        res = await this.axios.post("good/allgood/", {});
        this.allGoods = res.data.good;
      } else if (this.$props.casType === "demand") {
        res = await this.axios.post("demand/alldemand/", {});
        this.allGoods = res.data.demand;
      }
    }

    if (this.allGoods.length === 0) {
      this.hasGoods = false;
      // console.log("no good");
      this.loaded = true;
      return;
    }
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
    toUrl(casType, id) {
      return "/" + casType + "/item/" + id;
    },
  },
};
</script>
