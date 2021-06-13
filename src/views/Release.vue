<template>
  <div class="middle">
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
import UpdateButton from "../components/release/updateButton.vue";

export default {
  components: { release, UpdateButton },
  methods: {
    click(ref) {
      this.$refs.test1.$el.click();
      
    }
  }
};
</script>