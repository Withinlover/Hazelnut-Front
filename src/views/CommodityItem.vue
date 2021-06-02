<template>
  <div class="detailPage">
    <detail-card commoType="出" />
    <comment-card />
  </div>
</template>

<style scoped>
.detailPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import CommentCard from "../components/ItemDetail/Comment.vue";
import DetailCard from "../components/ItemDetail/DetailCard.vue";
export default {
  components: { CommentCard, DetailCard },

  data() {
    return {};
  },
};
</script>
