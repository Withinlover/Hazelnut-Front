<template>
  <div class="detailPage">
    <detail-card commoType="出" :goodId="goodId" />
    <comment-card commoType="出" :goodId="goodId" />
  </div>
</template>

<style scoped>
.detailPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
}
</style>

<script>
import CommentCard from "../components/ItemDetail/Comment.vue";
import DetailCard from "../components/ItemDetail/DetailCard.vue";
export default {
  components: { CommentCard, DetailCard },
  props: ["goodId"],
  data() {
    return {};
  },
};
</script>
