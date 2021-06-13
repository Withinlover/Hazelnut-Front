<template>
  <div class="card" :class="cardStyle">
    <!-- 申请交易 -->
    <div class="applyTran">
      <div class="apply-row" v-for="applier in applyForTrade" :key="applier.id">
        <div class="apply-text">
          <!-- {{ applyForTrade }} -->
          <span class="applier-name"
            ><router-link
              class="router"
              tag="div"
              :to="'/user/watch/' + applier.userid"
              >{{ applier.name }}
            </router-link></span
          >

          申请交易
        </div>
        <div class="buttons">
          <el-button
            class="reply-apply-button"
            type="primary"
            @click="acceptApply(applier.id)"
            round
            >同意</el-button
          >
          <el-button
            class="reply-apply-button"
            type="danger"
            @click="refuseApply(applier.id)"
            round
            >拒绝</el-button
          >
        </div>
      </div>
    </div>
    <el-divider v-if="owned" />

    <!-- 增加评论 -->

    <div v-if="this.$store.state.isLogin" class="newComm">
      <img class="commAva" :src="userInfo.avatar" />
      <el-input
        class="newCommIn"
        id="newCommInput"
        v-model="inputContent"
        :placeholder="inputPlaceHoldertext"
      />
      <el-button class="commit-button" type="primary" @click="postCommnet" round
        >评论</el-button
      >
    </div>
    <div v-else class="please-login">
      发表评论前需要先
      <router-link to="/" class="router">登陆</router-link>
      哦
    </div>

    <!-- 查看所有评论 -->
    <div class="all-comm" :hidden="!hasComment">
      <div v-for="comment in comments" :key="comment.id">
        <div clas="one-comm">
          <div class="comm-layer0">
            <div class="display-info">
              <img class="commAva" :src="comment.url" />
              <div class="display-text">
                <div class="comm-name">
                  <!-- {{ comment }} -->
                  <router-link
                    class="router"
                    tag="div"
                    :to="'/user/watch/' + comment.userid"
                  >
                    <!-- {{ "/user/watch/" + comment.userid }} -->
                    {{ comment.username }}
                  </router-link>
                </div>
                <div class="comm-time">
                  {{ comment.sendtime }}
                </div>
              </div>
            </div>
          </div>
          <div class="comm-text">
            <span>
              {{ comment.text }}
            </span>
            <div
              class="reply-comm-button"
              @click="setReplyTo(comment.id, comment.username)"
            >
              <i class="el-icon-chat-line-square" /> 回复
            </div>
          </div>
          <div class="sub-comm">
            <div
              class="one-sub-comm"
              v-for="reply in comment.subreply"
              :key="reply.id"
            >
              <div class="sub-comm-name">
                <router-link
                  class="router"
                  tag="div"
                  :to="'/user/watch/' + reply.userid"
                >
                  {{ reply.username }}
                </router-link>
              </div>
              :
              {{ reply.text }}

              <div class="reply-comm-button">
                <span class="reply-time">
                  {{ reply.sendtime }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  /* width: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(110, 91, 80, 0.2);
  margin: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 5px;
  padding-bottom: 20px;

}
.card-nor {
  width: 800px;
}
.car-thin {
  width: 400px;
  margin: 10px 10%;
}

el-divider {
  width: 300px;
}

.router {
  display: inline-block;
  color: #877;
}
.please-login {
  margin: 15px;
}
.newComm {
  display: flex;
  align-self: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 20px;
}

.commAva {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.newCommIn {
  margin-left: 10px;
  margin-right: 10px;
  width: 250px;
  border-radius: 50%;
  display: inline-block;
}
.one-comm {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.comm-layer0 {
  margin-left: 10px;
  margin-top: 15px;
}
.display-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 10px;
}
.display-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.comm-name {
  font-size: 85%;
}
.comm-time {
  color: #aaa;
  font-size: 65%;
}
.comm-text {
  margin-left: 25px;
  margin-right: 25px;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
.reply-comm-button {
  color: #877;
  font-size: 80%;
}
.sub-comm {
  border-left: rgba(190, 174, 174, 0.8) solid 2px;
  padding-left: 10px;
  margin-left: 40px;
  margin-top: 5px;
  text-align: left;
}

.sub-comm-name {
  display: inline-block;
  color: #877;
}
.reply-time {
  color: #aaa;
  padding-right: 10px;
}
.apply-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  margin-left: 30px;
}

.applier-name {
  color: #877;
}
.buttons {
  margin-right: 20px;
  align-self: flex-end;
}
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  width: 90%;
  align-self: center;
  border-top: 1px solid #e8eaec;
}
</style>

<script>
export default {
  name: "CommentCard",
  props: ["commoType", "goodId"],
  computed: {
    hasComment() {
      return this.comments !== "NULL";
    },
  },
  async mounted() {
    // all comments
    this.getComment();

    //  user avatar
    let user = await this.axios.post("user/getuser/", {
      token: this.$store.state.token,
    });
    this.userInfo.avatar = user.data.url;

    // trade list
    this.getApply();
  },

  data() {
    return {
      owned: false,
      replyTo: -1,
      inputPlaceHoldertext: "请输入评论",
      inputContent: "",
      window: {
        width: 0,
        height: 0,
      },
      cardStyle: "card-nor",
      newComment: "",
      userInfo: {
        avatar: "https://via.placeholder.com/500",
      },

      comments: [],
      applyForTrade: [],
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width > 850) {
        this.cardStyle = "card-nor";
      } else {
        this.cardStyle = "card-thin";
      }
    },
    async getApply() {
      let trade = await this.axios.post("trade/applylist/", {
        token: this.$store.state.token, //当前登录用户的token
        objectid: this.$props.goodId, // 商品ID或需求ID
        type: this.commoType === "出" ? 0 : 1, // 0表示商品,1表示需求
      });
      this.owned = trade.data.result === 1;
      this.applyForTrade = trade.data.apply;
    },
    async acceptApply(id) {
      let res = await this.axios.post("trade/confirm/", {
        token: this.$store.state.token, //当前登录用户的token,后台会进行验证该用户是不是交易涉及到商品的拥有者
        applyID: id, //交易请求ID
        confirm: 1, //同意(1)或拒绝0
      });

      if (res.data.result === 1) {
        this.$notify({
          title: res.data.message,
          message: "记得和卖家交易哦",
          type: "success",
        });
      } else {
        this.$notify(
          this.$notify.error({
            title: res.data.message,
            message: "等会再试试吧",
          })
        );
      }
      this.getApply();
    },
    async refuseApply(id) {
      let res = await this.axios.post("trade/confirm/", {
        token: this.$store.state.token, //当前登录用户的token,后台会进行验证该用户是不是交易涉及到商品的拥有者
        applyID: id, //交易请求ID
        confirm: -1, //同意(1)或拒绝0
      });
      if (res.data.result === 1) {
        this.$notify({
          title: "已拒绝交易",
          message: "再看看有什么合适的交易吧",
          type: "success",
        });
      } else {
        this.$notify(
          this.$notify.error({
            title: "拒绝失败",
            message: "等会再试试吧",
          })
        );
      }
      this.getApply();
    },
    setReplyTo(id, name) {
      // console.log(id);
      this.replyTo = id;
      this.inputPlaceHoldertext = "回复" + name + ":";

      document.getElementById("newCommInput").focus();
    },
    async getComment() {
      let res = await this.axios.post("message/getreply/", {
        objectid: this.$props.goodId, // 商品ID或需求ID
        type: this.commoType === "出" ? 0 : 1, // 0表示商品,1表示需求
      });

      this.comments = res.data.reply;
    },
    async postCommnet() {
      this.inputContent = this.inputContent.trim();

      if (this.inputContent === "") {
        this.$message({
          message: "评论不能为空",
          type: "warning",
        });
      } else {
        // comment isn't empty
        let res = await this.axios.post("message/reply/", {
          token: this.$store.state.token,
          objectid: this.$props.goodId, // 商品ID或需求ID
          type: this.commoType === "出" ? 0 : 1, //0表示商品,1表示需求
          reply: this.replyTo, // 被回复的留言ID,如果没有,传-1
          text: this.inputContent, //留言内容
        });
        if (res.data.result === 1) {
          this.$notify({
            title: "评论成功",
            message: "",
            type: "success",
          });
        } else {
          this.$notify(
            this.$notify.error({
              title: "评论失败",
              message: "等会再试试吧",
            })
          );
        }
      }
      this.replyTo = -1;
      this.inputContent = "";
      this.inputPlaceHoldertext = "请输入评论";
      this.getComment();
    },
  },
};
</script>