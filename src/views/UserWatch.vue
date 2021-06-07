<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="14">
      <user-info></user-info>
    </el-col>
  </el-row>
</template>

<script>
import UserInfo from '../components/user/UserInfo.vue';

export default {
  components: {
    UserInfo,
  },
};
</script>