<template>
  <div class="card">
    <div class="newComm">
      <img class="commAva" :src="userInfo.avatar" />
      <el-input
        class="newCommIn"
        v-model="newComment"
        placeholder="请输入评论"
      />
      <el-button class="commit-button" type="primary" round>评论</el-button>
    </div>

    <div class="all-comm">
      <div v-for="comment in comments" :key="comment.id">
        <div clas="one-comm">
          <div class="comm-layer0">
            <div class="display-info">
              <img class="commAva" :src="comment.avatar" />
              <div class="display-text">
                <div class="comm-name">
                  {{ comment.name }}
                </div>
                <div class="comm-time">
                  {{ comment.time }}
                </div>
              </div>
            </div>
          </div>
          <div class="comm-text">
            <span>
              {{ comment.content }}
            </span>
            <div class="reply-comm-button">
              <i class="el-icon-chat-line-square" /> 回复
            </div>
          </div>
          <div class="sub-comm">
            <div
              class="one-sub-comm"
              v-for="reply in comment.replys"
              :key="reply.id"
            >
              <div class="sub-comm-name">
                {{ reply.name }}
              </div>
              :
              <div class="sub-comm-name">@ {{ reply.toUser }}</div>
              {{ reply.content }}

              <div class="reply-comm-button">
                <span class="reply-time">
                  {{ reply.time }}
                </span>
                <i class="el-icon-chat-line-square" /> 回复
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
  width: 400px;
  /* height: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(110, 91, 80, 0.2);
  /* 2px 2px 3px rgb(110, 91, 80, 0.8); */
  margin: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 5px;
  padding-bottom: 20px;
}
.newComm {
  display: flex;
  align-self: center;
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
.one-sub-comm {
}
.sub-comm-name {
  display: inline-block;
  color: #877;
}
.reply-time {
  color: #aaa;
  padding-right: 10px;
}
</style>

<script>
export default {
  name: "CommentCard",
  props: [],
  data() {
    return {
      newComment: "",
      test: "test",
      userInfo: {
        avatar:
          "https://via.placeholder.com/150/0000FF/808080?Text=Digital.com",
      },
      comments: [
        {
          id: 1,
          avatar:
            "https://via.placeholder.com/150/7700FF/808080?Text=Digital.com",
          name: "yizhe",
          content: "说了句啥",
          time: "2021-5-19 19:07",
          replys: [],
        },
        {
          id: 2,
          avatar:
            "https://via.placeholder.com/150/7777FF/808080?Text=Digital.com",
          name: "Louise",
          content: "另一条评论",
          time: "2021-5-29 07:07",
          replys: [
            {
              id: 3,
              avatar:
                "https://via.placeholder.com/150/7700FF/808080?Text=Digital.com",
              name: "yizhe",
              toUser: "Louise",
              content: "回复了一句",
              time: "2021-5-30 15:42",
            },
            {
              id: 4,
              avatar:
                "https://via.placeholder.com/150/7700FF/808080?Text=Digital.com",
              name: "夕",
              toUser: "yizhe",
              content: "很有道理",
              time: "2021-6-19 23:59",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>
