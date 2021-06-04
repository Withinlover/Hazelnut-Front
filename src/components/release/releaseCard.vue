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
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="家用电器" value="shanghai" />
          <el-option label="二手书籍" value="beijing" />
          <el-option label="服装首饰" value="shanghai" />
          <el-option label="日用品" value="beijing" />
          <el-option label="成人用品" value="shanghai" />
          <el-option label="ZHTYYDS" value="beijing" />
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
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="form" label-width="80px" v-show="active === 1">
      <el-form-item label="商品图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
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
        <el-button type="primary" @click="cancel">重新填写</el-button>
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
      active: 0,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    next() {
      if (this.active < 2) this.active += 1;
    },
    cancel() {
      this.active = 0
    },
    finish() {
      this.active = 0
      this.$router.push({path: '/commodity'});  
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>