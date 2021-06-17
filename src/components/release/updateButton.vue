<template>
  <span>
    <!-- <a id="updateButton" href="#" @click="show()">
      {{ text }}
    </a> -->

    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      width="55%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input
            v-model="form.name"
            placeholder="一个有吸引力的标题可以帮助你更快的 卖出 / 找到商品哦"
          />
        </el-form-item>

        <el-form-item label="类别">
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
          <el-slider
            v-model="form.rate"
            :step="1"
            :min="1"
            :max="10"
            show-stops
          >
          </el-slider>
        </el-form-item>

        <el-form-item label="补充信息" >
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <!-- <el-form-item style="text-align: right">
          <el-button type="primary" @click="next">创建</el-button>
        </el-form-item> -->
      </el-form>
      <el-row>
        <el-col class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消 修 改 </el-button>
          <el-button type="primary" @click="submit()"> 提 交 </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </span>
</template>

<style scoped>
.dialog-footer {
  text-align: right;
}

a {
  color: black;
  text-decoration: none;
}
</style>

<script>
export default {
  name: "updateButton",
  props: ["initText", "initType", "initId"],
  /**
   * initText: 文本
   * type: 0 表示商品，1 表示需求
   * id: 商品/需求 -> id
   */
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
      categoris: [],
      text: this.initText,
      id: this.initId,
      type: this.initType,
      centerDialogVisible: false,
    };
  },
  methods: {
    async getInfo() {
      var url, data;
      url = "/good/goodinfo/";
      if (this.type === 1) url = "demand/demandinfo/";
      data = {
        token: this.$store.state.token,
        id: this.initId,
      };

      this.axios.post(url, data).then((res) => {
        console.log(res.data);
        if (res.data.result === 1) {
          this.form.name = res.data.title;
          this.form.price = res.data.price;
          this.form.desc = res.data.description;
          this.form.region = res.data.region
        }
      });

      url = "good/category/";
      this.axios.get(url).then((res) => {
        // console.log(res.data);
        if (res.data["result"] == 1) {
          var categoris = res.data["category"];

          this.categoris = [];
          for (var i in categoris) {
            this.categoris[i] = {
              id: i + 1,
              name: categoris[i],
            };
          }
        } else {
          this.$message.error("后端跑路了");
        }
      });
    },
    show() {
      this.centerDialogVisible = true;
      this.getInfo();
    },
    checkPrice(price) {
      console.log(price);
      var pattern = new RegExp("^\\d*(\\.\\d{1,2})?$")
      if (pattern.test(price) === false)
        return false;
      return parseFloat(price) <= 20000;
    },
    check() {
      if (this.form.name === "") {
        this.$message.error("请填写标题");
        return false;
      } else if (this.form.region === "") {
        this.$message.error("请选择商品分类");
        return false;
      } else if (this.form.price === "" || !this.checkPrice(this.form.price)) {
        this.$message.error("请正确填写商品价格(不超过 20000元，如：11.5)");
        return false;
      }
      return true;
    },
    submit() {
      if (!this.check()) return;

      var url, data;
      url = "/good/update/";
      if (this.type === 1) url = "demand/update/";
      data = {
        id: this.id,
        name: this.form.name,
        description: this.form.desc,
        category: this.form.region,
        price: this.form.price,
      };
      console.log(data);
      this.axios.post(url, data).then((res) => {
        console.log(res.data);
        if (res.data.result === 1) {
          this.$message.success("修改成功！");
          this.$emit("finishUpdate");
          this.centerDialogVisible = false;
        }
      });
    }
  },
  mounted() {},
};
</script>