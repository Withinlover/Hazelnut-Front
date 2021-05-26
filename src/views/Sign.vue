<template>
  <div class="sign">
    <el-row :gutter="10">
      <el-col class="middleContent">
        <el-col :xs="8" :sm="12" :md="14" :lg="15" :xl="16"> </el-col>
        <el-col :xs="16" :sm="12" :md="9" :lg="7" :xl="5" class="loginArea">
          <sign-in-form />
        </el-col>
        <el-col :xs="0" :sm="0" :md="1" :lg="2" :xl="3"> </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.middleContent {
  background-image: url("../assets/logo.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: 20%;
  background-position-y: 55%;
}

.el-radio-group {
  margin-bottom: 20px;
}

.loginArea {
  padding: 50px;
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
  mounted() {
    if (this.$store.state.isLogin == true) {
      this.$router.push({path: '/commodity'});
    }
  }
};
</script>