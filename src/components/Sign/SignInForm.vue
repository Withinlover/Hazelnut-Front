<template>
  <div class="background">
    <div id="hide" class="hide">{{ message }}</div>
    <span>欢迎来到 Hazelnut 平台</span>
    <el-row class="forms" v-show="radio == 0">
      <img
        src="../../assets/hazelnut.png"
        height="80px"
        style="margin-top: 10px"
      />
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">
          用户名
        </div>
        <el-input id="signInUsername" placeholder="Username" v-model="username">
          <i class="el-icon-user" slot="prepend"></i>
        </el-input>
      </div>
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">密码</div>
        <el-input
          id="signInPassword"
          placeholder="Password"
          v-model="password"
          type="password"
          @keyup.enter.native="onSignIn()"
        >
          <i class="el-icon-lock" slot="prepend"></i>
        </el-input>
      </div>
      <!-- <el-row>
        <el-col :span="6" :offset="18">
          <router-link to="/user/info">
            <span style="font-size: 12px;">忘记密码？</span>
          </router-link>
        </el-col>
      </el-row> -->
    </el-row>

    <el-row class="forms" v-show="radio == 1 || radio == 2">
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">
          用户名
        </div>
        <el-input id="signUpUsername" placeholder="Username" v-model="username">
          <i class="el-icon-user" slot="prepend"></i>
        </el-input>
      </div>
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">密码</div>
        <el-input
          id="signUpPassword"
          placeholder="Password"
          v-model="password"
          type="password"
        >
          <i class="el-icon-lock" slot="prepend"></i>
        </el-input>
      </div>
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">
          重复密码
        </div>
        <el-input
          id="signUpRepeatPassword"
          placeholder="Repeat Password"
          v-model="password2"
          type="password"
        >
          <i class="el-icon-lock" slot="prepend"></i>
        </el-input>
      </div>
      <div class="formsItem">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">邮箱</div>
        <el-input
          id="signUpEmail"
          placeholder="Email Address"
          v-model="emailAddress"
          @keyup.enter.native="onSignUp()"
        >
          <i class="el-icon-message" slot="prepend"></i>
        </el-input>
      </div>
      <div class="formsItem" v-show="radio == 2">
        <div style="font-size: 14px; padding: 3px; margin-left: 10px">
          验证码
        </div>
        <el-input
          id="signUpVerificationCode"
          placeholder="Verification Code"
          v-model="verificationCode"
          @keyup.enter.native="onSignUp()"
        >
          <i class="el-icon-key" slot="prepend"></i>
        </el-input>
      </div>
    </el-row>

    <el-row>
      <el-button id="signInButton" style="width: 40%" @click="onSignIn()">
        登录
      </el-button>
      <el-button id="signUpButton" style="width: 40%" @click="onSignUp()">
        注册
      </el-button>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<style scoped>
.hide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  z-index: -9999;
  color: rgba(255, 255, 255, 0);
}

.background {
  padding: 40px 20px;

  border: #cccccc solid thin;
  border-radius: 30px;

  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);

  align-items: center;

  height: 80%;
}

.switch {
  border: solid;
  height: 40px;
  line-height: 30px;
  border-bottom: 3px solid rgb(224, 209, 193);
}

.tips {
  height: 30px;
  background-color: rgb(224, 209, 193);
}

.tips span {
  font-size: 12px;
  line-height: 30px;
}

.forms {
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
}

.formsItem {
  text-align: left;
}

.forms .el-input {
  margin: 5px;
}
</style>

<script>
export default {
  name: "SignInForm",
  data() {
    return {
      radio: 0,
      username: "",
      password: "",
      password2: "",
      emailAddress: "",
      verificationCode: "",
      message: "123",
    };
  },
  methods: {
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },

    onSignIn() {
      if (this.radio === 1 || this.radio == 2) this.radio = 0;
      else {
        const url = "/user/login/";
        var form = {
          username: this.username,
          password: this.password,
        };
        this.axios.post(url, form).then((res) => {
          if (res.data["result"] === 0) {
            this.$message.error(res.data["message"]);
            this.message = res.data["message"];
          } else {
            console.log(res.data);
            this.$store.commit("setToken", res.data["token"]);
            this.message = res.data["message"];
            this.$message.success(res.data["message"]);
            this.sleep(1000).then(() => {
              this.$router.push({ path: "/commodity" });
            });
            console.log(this.$router.isLogin);
          }
        });
      }
    },
    onSignUp() {
      if (this.radio === 0) this.radio = 1;
      else if (this.radio === 1) {
        if (this.username === "" || this.password === "") {
          this.$message.error("用户名和密码不允许为空");
          this.message = "用户名和密码不允许为空";
        } else if (this.password != this.password2) {
          this.$message.error("两次输入的密码不一致");
          this.message = "两次输入的密码不一致";
        } else {
          const url = "/user/email/";
          var form = {
            email: this.emailAddress,
          };
          this.axios.post(url, form).then((res) => {
            console.log(res.data);
            if (res.data["result"] === 1)
              (this.radio = 2), this.$message.success(res.data["message"]);
            else this.$message.error(res.data["message"]);
          });
        }
      } else {
        const url = "/user/register/";
        var form = {
          username: this.username,
          password1: this.password,
          password2: this.password2,
          email: this.emailAddress,
          code: this.verificationCode,
        };
        this.axios.post(url, form).then((res) => {
          if (res.data["result"] === 1) {
            this.radio = 0;
            this.$message.success(res.data["message"]);
          } else {
            this.$message.error(res.data["message"]);
          }
        });
      }
    },
  },
};
</script>