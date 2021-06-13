<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="14">
      <user-watch-header-card :initialUserID="userID" />
      <user-watch-ban-card :isBanned="isBanned"/>
      <user-watch-info-card :initialUserID="userID" @setBan="setBan"/>
      <user-watch-release-card :initialUserID="userID"/>
    </el-col>
  </el-row>
</template>

<script>
import UserWatchInfoCard from "../components/user/watch/UserWatchInfoCard.vue";
import UserWatchHeaderCard from "../components/user/watch/UserWatchHeaderCard.vue";
import UserWatchMessageCard from "../components/user/watch/UserWatchMessageCard.vue";
import UserWatchBanCard from '../components/user/watch/Items/UserWatchBanCard.vue';
import UserWatchReleaseCard from '../components/user/watch/Items/UserWatchReleaseCard.vue';

export default {
  components: {
    UserWatchMessageCard,
    UserWatchInfoCard,
    UserWatchHeaderCard,
    UserWatchBanCard,
    UserWatchReleaseCard,
  },
  props: ["initialUserID"],
  data() {
    return {
      userID: this.initialUserID,
      isBanned: false, 
    };
  },
  methods: {
    updateInfo() {
      var url, data; 
      url = '/user/isban/';
      data = {
        id: this.userID,
      }
      console.log(this.id);
      this.axios.post(url, data).then((res) => {
        if (res.data.result === 1) {
          this.isBanned = res.data.isban;
        }
      });
    },
    setBan(isBanned) {
      this.isBanned = isBanned;
    }
  },
  mounted() {
    this.updateInfo();
  },
};
</script>