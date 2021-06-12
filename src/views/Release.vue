<template>
  <div class="middle">
    <update-button :initText="'一个奇怪的按钮'"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-around">
      <el-col :span="14">
        <release />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.middle {
  margin-top: 30px;
}
</style>

<script>
import release from "../components/release/releaseCard.vue";
import UpdateButton from '../components/release/updateButton.vue';

export default {
  components: { release, UpdateButton },
};
</script>