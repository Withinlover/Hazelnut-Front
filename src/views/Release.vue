<template>
  <div class="postArea">
    <div v-show="step === 1">
      <div class="postItem" style="border-bottom: solid">
        <span style="font-weight: bold">类别</span>
        <el-radio
          v-model="formType"
          label="Commondity"
          style="line-height: 40px"
        >
          商品
        </el-radio>
        <el-radio v-model="formType" label="Demand" style="line-height: 40px">
          需求
        </el-radio>
      </div>
      <div class="postItem" style="border-bottom: solid">
        <span style="font-weight: bold">标题</span>
        <div style="display: inline-block; padding-left: 20px">
          <el-input v-model="title" placeholder="请输入标题"></el-input>
        </div>
      </div>
      <div class="postItem" style="border-bottom: solid">
        <span style="font-weight: bold">类别</span>
        <div style="display: inline-block; padding-left: 20px">
          <el-select v-model="value" placeholder="请选择商品类别">
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="postItem" style="border-bottom: solid">
        <span style="font-weight: bold">价格 与 详细信息</span>
        <div style="display: inline-block; padding-left: 20px">
          <el-input v-model="price" placeholder="输入预期价格" style="width:200px"></el-input>
        </div>
      </div>
      <div class="content">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 8 }"
          placeholder="请输入内容"
          v-model="content"
        >
        </el-input>
      </div>
      <div class="content">
        <div style="height: 45px; display: inline-block"></div>
        <div class="contentRight">
          <el-button type="primary" @click="onNext()">下一步</el-button>
        </div>
      </div>
    </div>
    <div v-show="step === 2">
      <div class="postItem" style="border-bottom: solid">
        <span style="font-weight: bold">上传图片</span>
        <div style="display: inline-block; padding-left: 20px; font-size: 12px">
          图片仅支持 PNG / JPG 格式，图片大小不得超过 2MB
        </div>
      </div>
      <div class="content">
        <el-upload
          action="http://123.57.194.168:8000/good/uploadimg/"
          :headers="headers"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <div class="content">
        <div style="height: 45px; display: inline-block"></div>
        <div class="contentRight">
          <el-button type="primary" @click="onSubmit()">提交</el-button>
        </div>
      </div>
    </div>
    <div style="boder-bottom: solid; width: 100%"></div>
  </div>
</template>

<style scoped>
.postArea {
  width: 60%;
  margin: auto;
  margin-top: 50px;
  padding: 10px 30px;
  background: rgb(228, 224, 221);
  font-size: 18px;
}

.postItem {
  display: inline-block;
  height: 45px;
  width: 100%;
  margin-top: 20px;
  line-height: 45px;
  text-align: left;
}

.content {
  display: inline-block;
  width: 100%;
  margin-top: 20px;
  text-align: left;
  position: relative;
}

.contentRight {
  display: inline-block;
  position: absolute;
  right: 50px;
}

.el-radio {
  margin-left: 20px;
}

.el-input {
  width: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      ID: -1,
      step: 1,
      formType: "Commondity",
      title: "",
      value: "",
      content: "",
      price: "",
      options: [
        {
          label: "家用电器",
        },
        {
          label: "二手书籍",
        },
        {
          label: "服装首饰",
        },
        {
          label: "日用品",
        },
        {
          label: "成人用品（ZHT YYDS!）",
        },
      ],
      headers: {
        AUTHORIZATION: "111",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file.response);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    onNext() {
      if (this.step === 1) {
        var url, form;
        if (this.formType === "Demand") 
          url = 'http://123.57.194.168:8000/demand/upload/';
        else 
          url = 'http://123.57.194.168:8000/good/upload/';
        form = {
          'token': this.$store.state.token,
          'name': this.title,
          'description': this.content,
          'category': this.formType,
          'price': this.price
        }
        this.axios.post(url, form).then((res) => {
          console.log(res.data);
          this.step = 2;
        })
      } 
    },
    onSubmit() {
      
    }
  },
  mounted() {
    console.log(this.$store.state.token);
  },
};
</script>