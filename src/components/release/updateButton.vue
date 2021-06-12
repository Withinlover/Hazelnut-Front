<template>
  <el-row>
    <el-button type="text" @click="centerDialogVisible = true">
      {{ text }}
    </el-button>

    <el-dialog
      title="请重新填写信息"
      :visible.sync="centerDialogVisible"
      width="55%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<style scoped>
</style>

<script>
export default {
  name: "updateButton",
  props: ["initText"],
  data() {
    return {
      text: this.initText,
      centerDialogVisible: false
    };
  }
};
</script>