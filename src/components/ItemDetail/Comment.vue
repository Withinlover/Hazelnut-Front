<template>
  <div class="card">
    <div class="newComm">
      <img class="commAva" :src="userInfo.avatar" />
      <el-input
        class="newCommIn"
        v-model="newComment"
        placeholder="请输入评论"
      />
    </div>
    {{ test }}
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  height: 400px;
  border: 1px solid rgb(110, 91, 80, 0.8);
  border-radius: 20px;
  box-shadow: 2px 2px 3px rgb(110, 91, 80, 0.8);
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-content: left;
  overflow: hidden;
}
.newComm {
  display: flex;
  align-items: row;
}
.commAva {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin: 5px;
}

.newCommIn {
  margin: 20px;
  width: 300px;
  border-radius: 50%;
  display: inline-block;
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
    };
  },
  methods: {},
};
</script>
