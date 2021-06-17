<template>
  <div class="cascade" v-if="this.loaded">
    <div class="not-find" :hidden="hasGoods">
      这个用户似乎还没有发布过商品，换个人看看吧
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
          <user-watch-commodity-card
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
  margin-left: 60px;
  font-size: 18px;
}
</style>

<script>
import CommodityCard from "../../../commodity/CommodityCard.vue";
import UserWatchCommodityCard from './UserWatchCommodityCard.vue';

export default {
  name: "UserWatchCascade",
  props: ["casType", "casKeyword", "casCata", "userID"],
  components: { CommodityCard, UserWatchCommodityCard },
  computed: {},
  data() {
    return {
      allGoods: [],
      cascadeCol: [[], [], []],
      loading: false,
      loaded: false,
      hasGoods: true,
    };
  },

  async mounted() {
    let res = "";

    // if (this.$props.casKeyword !== "") {
    // show searching result
    if (this.$props.casType === "commodity") {
      await this.axios.post("good/getgood/", {
        id: this.userID,
      }).then((res) => {
        this.allGoods = [];
          let length = res.data.name.length;
          for (let i = 0; i < length; i++) {
            let tmp = {};
            tmp.id = res.data.id[i];
            tmp.name = res.data.name[i];
            tmp.info = res.data.description[i];
            tmp.price = res.data.price[i];
            tmp.urls = res.data.url[i];
            this.allGoods.push(tmp);
          }
      });
    } else if (this.$props.casType === "demand") {
      await this.axios.post("demand/getdemand/", {
        id: this.userID,
      }).then((res) => {
        this.allGoods = [];
          let length = res.data.name.length;
          for (let i = 0; i < length; i++) {
            let tmp = {};
            tmp.id = res.data.id[i];
            tmp.name = res.data.name[i];
            tmp.info = res.data.description[i];
            tmp.price = res.data.price[i];
            tmp.urls = res.data.url[i];
            this.allGoods.push(tmp);
          }
      });
    }
    console.log(this.allGoods)
    if (this.allGoods.length === 0) {
      this.hasGoods = false;
      this.loaded = true;
      return;
    }
    console.log(this.allGoods);
    this.cascadeCol[0].push(this.allGoods.pop());
    this.loaded = true;
  },

  methods: {
    async loadCascade() {
      if (!this.loaded) {
        return;
      }
      for (let i = 2; i >= 0; i--) {
        if (this.allGoods.length === 0) return;
        this.cascadeCol[i].push(this.allGoods.pop());
      }
    },
    toUrl(casType, id) {
      return "/" + casType + "/item/" + id;
    },
    updateGood() {
      let url = "good/getgood/";
      this.axios
        .post(url, {
          // token:this.$store.state.token
          id: this.userID,
        })
        .then((res) => {
          this.allGoods = [];
          let length = res.data.name.length;
          for (let i = 0; i < length; i++) {
            let tmp = {};
            tmp.id = res.data.id[i];
            tmp.name = res.data.name[i];
            tmp.info = res.data.description[i];
            tmp.price = res.data.price[i];
            tmp.url = res.data.url[i];
            this.allGoods.push(tmp);
          }
        });
    },
  },
};
</script>
