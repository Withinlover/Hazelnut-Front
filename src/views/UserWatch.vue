<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="14">
      <user-watch-header-card :initialUserID="userID" />
      <user-watch-ban-card :initialUserID="userID"/>
      <user-watch-info-card :initialUserID="userID" />
    </el-col>
  </el-row>
</template>

<script>
import UserWatchInfoCard from "../components/user/watch/UserWatchInfoCard.vue";
import UserWatchHeaderCard from "../components/user/watch/UserWatchHeaderCard.vue";
import UserWatchMessageCard from "../components/user/watch/UserWatchMessageCard.vue";
import UserWatchBanCard from '../components/user/watch/Items/UserWatchBanCard.vue';

export default {
  components: {
    UserWatchMessageCard,
    UserWatchInfoCard,
    UserWatchHeaderCard,
    UserWatchBanCard,
  },
  props: ["initialUserID"],
  data() {
    return {
      userID: this.initialUserID,
    };
  },
  mounted() {
    // console.log(this.userID)
  },
};
</script>