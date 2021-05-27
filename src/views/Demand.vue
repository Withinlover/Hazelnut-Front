<template>
  <div class="demand">
    <h1>This is a Demand Page</h1>
    <div>
      <el-input
        class="searchInput"
        v-model="input"
        placeholder="请输入您想找的需求"
        prefix-icon="el-icon-search"
      ></el-input>

      <div class="icon-group">
        <div class="icon-circle-back">
          <i class="el-icon-arrow-up iconAbs"></i>
        </div>
        <router-link tag="dummy" to="/release">
          <div class="icon-circle-back">
            <i class="el-icon-plus iconAbs"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon-circle-back {
  /* background-color: rgb(181, 158, 140); */
  background-color: rgb(110, 91, 80);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 23px;
  display: flex;
  margin: 10px;
  box-shadow: 2px 2px 5px rgb(177, 176, 176, 0.6);
}
.icon-circle-back:active {
  background-color: rgb(110, 91, 80, 0.8);
}

.iconAbs {
  align-self: center;
  width: 2em;
  padding-top: 20px;
  height: 2em;
  /* font-size: 4em; */
  font-weight: 900;
  color: rgb(224, 209, 193);
}
.icon-group {
  position: fixed;
  right: 30px;
  bottom: 30px;
  /* border: 3px solid #73ad21; */
}
</style>