<template>
  <el-row id="nav">
    <el-row id="nav-left">
      <router-link to="/" class="nav-left-item">
        <img src="../../assets/hazelnut.png" />
      </router-link>
      <router-link to="/commodity" class="nav-left-item">商品</router-link>
      <router-link to="/demand" class="nav-left-item">需求</router-link>
    </el-row>

    <el-row id="nav-right">
      <router-link to="/user/message" style="font-size: 2.2rem">
        <el-badge
          id="DotBell"
          :value="1"
          is-dot
          :hidden="this.$store.state.dotIsHidden"
        >
          <i class="el-icon-bell" id="bell" />
        </el-badge>
      </router-link>

      <router-link
        to="/user"
        exact-active-class=""
        active-class="router-link-exact-active"
      >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xinxibar_zhanghu" />
        </svg>
      </router-link>
    </el-row>
  </el-row>
</template>

<style scoped>
#nav {
  position: relative;
  height: 3rem;
  padding: 0.1rem 0 0 8rem;
  /* border-bottom: 0.1em outset rgb(110, 91, 80); */
  text-align: left;
  color: rgb(110, 91, 80);
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 4px rgba(110, 91, 80, 0.2);
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: rgb(110, 91, 80);
  display: inline-block;
  font-size: 1.5rem;
  line-height: 2.5rem;
}

#nav a img {
  width: 2.5rem;
  vertical-align: middle;
  display: inline-block;
}

#nav a span {
  color: #2c3e50;
  display: inline-block;
}

#nav a.router-link-exact-active {
  color: rgb(181, 158, 140);
}

#nav-left {
  display: inline-block;
  position: absolute;
  margin-left: 3rem;
  left: 0;
}

.nav-left-item {
  vertical-align: middle;
  margin: 0 1rem;
}
.reddot {
  height: -2px;
  size: small;
}
#nav-right {
  display: inline-block;
  position: absolute;
  margin-right: 3rem;
  right: 0;

  font-size: 2.3em;
}

.nav-right-item {
  vertical-align: middle;
  margin: 0 1rem;
}

.icon {
  width: 2em;
  height: 2em;
  padding-left: 0.5em;
  /* vertical-align: -0.15em; */
  fill: currentColor;
  overflow: hidden;
}
#bell {
  position: relative;
  bottom: 12px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
  name: "BaseNavBar",
  data() {
    return {
      dotIsHidden: false,
    };
  },
  methods: {
    hasNewInfo() {
      var url,
        data,
        isdot = true;
      url = "inform/infolist/";
      data = {
        token: this.$store.state.token,
      };
      this.axios.post(url, data).then((res) => {
        if (res.data.result == 1) {
          console.log(res.data.inform);
          var list = res.data.inform;
          for (var i in list) {
            isdot &= list[i].isread;
          }
          isdot = !isdot;
          this.dotIsHidden = !isdot;
        }
      });
    },
    showMessage() {
      this.$router.push("/user/message").catch((err) => {
        err;
      });
    },
  },
  mounted() {
    this.hasNewInfo();
  },
};
</script>