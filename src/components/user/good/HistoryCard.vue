<template>
  <base-card
    class="history-card"
    :isDemand="isDemand"
    :goodId="goodId"
    :imgUrl="goodImg"
  >
    <div class="good-name-box">
      <p class="good-name">
        {{ goodName }}
      </p>
    </div>
    <div class="good-price-box">
      <p class="good-price">￥{{ goodPrice }}</p>
    </div>
    <div class="good-score-box">
      <el-rate
        v-if="goodScore !== null && goodScore > 0.4"
        v-model="goodScore"
        show-score
        disabled
        :colors="colors"
        text-color="#ff9900"
        class="good-score"
      >
      </el-rate>
      <p class="good-score-zero" v-else>该交易暂未评分哦</p>
    </div>
  </base-card>
</template>

<style scoped>
.good-name-box,
.good-price-box,
.good-score-box {
  width: 80%;
  height: 30px;
  margin: auto;
  margin-top: 5px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.good-name {
  font-size: 18px;
  font-weight: bold;
}
.good-price {
  margin: auto;
  font-size: 20px;
  color: crimson;
  font-weight: bold;
}
.good-score-zero {
  color: #999999;
  font-weight: bold;
}
</style>

<script>
import BaseCard from "./BaseCard.vue";

export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      data: "",
      goodName: "",
      goodPrice: "",
      goodImg: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  props: {
    isDemand: {
      type: Boolean,
      required: true,
    },
    goodId: {
      type: Number,
      required: true,
    },
    goodScore: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    let url = this.isDemand ? "/demand/demandinfo/" : "good/goodinfo/";
    this.axios
      .post(url, {
        id: this.goodId,
        token: this.$store.state.token,
      })
      .then((res) => {
        this.data = res.data;
        this.goodName = res.data.title;
        this.goodPrice = res.data.price.toFixed(1);
        this.goodImg = res.data.imageUrls.length ? res.data.imageUrls[0] : "";
      });
  },
};
</script>