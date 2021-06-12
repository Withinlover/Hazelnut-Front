<template>
  <div class="middle">
    <el-row type="flex" justify="center">
      <el-col :span="8">
          <update-button
            :initText="'据说点击可以修改 0 号商品'"
            :initId="0"
            :initType="0"
          />
      </el-col>
      <el-col :span="8">
        <update-button
          :initText="'据说点击可以修改 0 号需求'"
          :initId="0"
          :initType="1"
        />
      </el-col>
    </el-row>
    <el-divider />

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