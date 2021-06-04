<template>
  <div class="card" :class="cardStyle">
    <div class="applyTran">
      <div class="apply-row" v-for="applier in applyForTrade" :key="applier">
        <div class="apply-text">
          <span class="applier-name">{{ applier.name }} </span>
          申请交易
        </div>
        <div class="buttons">
          <el-button class="reply-apply-button" type="primary" round
            >同意</el-button
          >
          <el-button class="reply-apply-button" type="danger" round
            >拒绝</el-button
          >
        </div>
      </div>
    </div>
    <el-divider />
    <div class="newComm">
      <img class="commAva" :src="userInfo.avatar" />
      <el-input
        class="newCommIn"
        v-model="newComment"
        placeholder="请输入评论"
      />
      <el-button class="commit-button" type="primary" round>评论</el-button>
    </div>
    <div class="all-comm" :hidden="!hasComment">
      <div v-for="comment in comments" :key="comment.id">
        <div clas="one-comm">
          <div class="comm-layer0">
            <div class="display-info">
              <img class="commAva" :src="comment.url" />
              <div class="display-text">
                <div class="comm-name">
                  {{ comment.username }}
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
            <div class="reply-comm-button">
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
                {{ reply.username }}
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
    let res = await this.axios.post("message/getreply/", {
      objectid: this.$props.goodId, // 商品ID或需求ID
      type: this.commoType === "出" ? 0 : 1, // 0表示商品,1表示需求
    });

    this.data = res.data;
    this.comments = res.data.reply;

    //  user avatar
    let user = await this.axios.post("user/getuser/", {
      token: this.$store.state.token,
    });
    this.userInfo.avatar = user.data.url;

    // trade list
    let trade = await this.axios.post("trade/applylist/", {
      token: this.$store.state.token, //当前登录用户的token
      objectid: this.$props.goodId, // 商品ID或需求ID
      type: this.commoType === "出" ? 0 : 1, // 0表示商品,1表示需求
    });
    console.log(trade);
  },
  data() {
    return {
      data: "",
      window: {
        width: 0,
        height: 0,
      },
      cardStyle: "card-nor",
      newComment: "",
      userInfo: {
        avatar:
          "https://via.placeholder.com/150/0000FF/808080?Text=Digital.com",
      },

      comments: [],
      applyForTrade: [
        {
          name: "Lou",
          state: null,
        },
      ],
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
  },
};
</script>
