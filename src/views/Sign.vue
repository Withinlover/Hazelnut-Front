<template>
  <div class="sign">
    <div class="backgroundColor"></div>
    <el-row type="flex" justify="space-around" align="middle">
      <el-col :lg="12" :md="12" :sm="12" :xs="12">
        <el-row class="backgroundImage" style="margin: 0"></el-row>
        <el-row style="margin-top: 0; font-size: 18px">
          {{ text }}
        </el-row>
      </el-col>
      <el-col :lg="6" :md="7" :sm="9" :xs="10">
        <sign-in-form />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.backgroundColor {
  background: #b7989146; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #94716b46,
    #b7989146
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #94716b46,
    #b7989146
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -100;
}

.backgroundImage {
  height: 40vh;
  background-image: url("../assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.el-radio-group {
  margin-bottom: 20px;
}

.el-row {
  margin: 50px;
}

.el-col {
  border-radius: 4px;
  height: 600px;
  text-align: center;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100px;
  padding: 40px;
}

.el-container {
  margin-bottom: 40px;
  height: 600px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
import SignInForm from "../components/Sign/SignInForm.vue";

export default {
  components: { SignInForm },
  data() {
    return {
      text: "理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本理论上这里有一个很长很长的文本",
    };
  },
  mounted() {
    if (this.$store.state.isLogin == true) {
      this.$router.push({ path: "/commodity" });
    }
  },
};
</script>