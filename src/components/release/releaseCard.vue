<template>
  <el-card shadow="hover" class="card">
    <el-row style="width: 90%; margin: auto">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写基本信息"></el-step>
        <el-step title="上传商品图片"></el-step>
        <el-step title="查看结果"></el-step>
      </el-steps>
    </el-row>
    <el-divider></el-divider>

    <el-form ref="form" :model="form" label-width="80px" v-show="active === 0">
      <el-form-item label="标题">
        <el-input
          v-model="form.name"
          placeholder="一个有吸引力的标题可以帮助你更快的 卖出 / 找到商品哦"
        />
      </el-form-item>

      <el-form-item label="类别">
        <el-radio-group v-model="form.type">
          <el-radio label="1" border>发布需求</el-radio>
          <el-radio label="2" border>发布商品</el-radio>
        </el-radio-group>
        <el-divider></el-divider>
        <el-select v-model="form.region" placeholder="请选择商品分类">
          <el-option
            v-for="category in categoris"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="预期价格">
        <el-input
          placeholder="仅输入数字部分，单位：元。如 11.5"
          prefix-icon="el-icon-coin"
          v-model="form.price"
        />
      </el-form-item>

      <el-form-item label="几成新">
        <el-slider v-model="form.rate" :step="1" :min="1" :max="10" show-stops>
        </el-slider>
      </el-form-item>

      <el-form-item label="补充信息">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="next">创建</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="form" label-width="80px" v-show="active === 1">
      <el-form-item label="商品图片">
        <el-upload
          :headers="headers"
          :action='getUrl()'
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="form" label-width="80px" v-show="active === 2">
      <el-form-item label="标题">
        <span>{{ form.name }} </span>
      </el-form-item>

      <el-form-item label="类别">
        <span>{{ form.type }} {{ form.region }}</span>
      </el-form-item>

      <el-form-item label="预期价格">
        <span>{{ form.price }}</span>
      </el-form-item>

      <el-form-item label="几成新">
        <span> {{ form.rate }} </span>
      </el-form-item>

      <el-form-item label="补充信息">
        <span>{{ form.desc }}</span>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="cancel">发布下一个</el-button>
        <el-button type="primary" @click="finish">完成</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.card {
  /* width: 400px; */
  border: 0.1px solid rgb(110, 91, 80, 0.5);
  border-radius: 20px;
  margin: 10px;
  padding: 20px;
  padding-bottom: 20px;
  text-align: left;
}
</style>

<script>
export default {
  name: "release",
  mounted() {
    console.log(this.$store.state.token);
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        type: "1",
        desc: "",
        price: "",
        rate: 1,
      },
      headers: {
        authorization: -1
      },
      releaseID: -1,
      categoris: ["后端炸了"],
      active: 0,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    next() {
      if (this.active === 0) {
        if (this.form.name === "") {
          this.$message.error("请填写标题");
        } else if (this.form.region === "") {
          this.$message.error("请选择商品分类");
        } else if (this.form.price === "") {
          this.$message.error(
            "请填写商品价格(仅填写数字部分，单位为元，如：11.5)"
          );
        } else {
          var url, data;
          if (this.form.type == 2)
            url = "/good/upload/";
          else 
            url = '/demand/upload/';
          data = {
            token: this.$store.state.token,
            name: this.form.name, //商品名称
            description: '[ ' + this.form.rate + ' 成新] ' + this.form.desc, //商品描述
            category: parseInt(this.form.region), //分类序号
            price: parseFloat(this.form.price), //价格
          };
          this.axios.post(url, data).then((res) => {
            if (res.data['result'] === 1) {
              console.log(res.data);
              this.releaseID = res.data['id'];
              this.$message.success('创建商品成功，您的商品 ID: ' + this.releaseID);
              this.headers.authorization = this.releaseID;
              console.log(this.headers);
              this.active += 1;
            } else {
              this.$message.error('来自后端的消息：' + res.data['message']);
            }
          })
        }
      } else if (this.active === 1) {
        
        this.active += 1;
      } else {
        this.active += 1;
      }
    },
    cancel() {
      this.active = 0;
    },
    finish() {
      this.active = 0;
      this.$router.push({ path: "/commodity" });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getUrl() {
      if (this.form.type == 2) 
        return this.axios.defaults.baseURL + '/good/uploadimg/';
      else 
        return this.axios.defaults.baseURL + '/demand/uploadimg/'
    }
  },
  mounted() {
    console.log(this.axios.defaults.baseURL);
    var url, data;
    url = "good/category/";
    this.axios.get(url).then((res) => {
      // console.log(res.data);
      if (res.data["result"] == 1) {
        var categoris = res.data["category"];

        this.categoris = [];
        for (var i in categoris) {
          this.categoris[i] = {
            id: i,
            name: categoris[i],
          };
        }
      } else {
        this.$message.error("后端跑路了");
      }
    });
  },
};
</script>