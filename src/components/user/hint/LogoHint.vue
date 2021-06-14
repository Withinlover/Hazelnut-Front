<template>
  <div id="logo-hint">
    <img src="@/assets/logo.png">
    <div>{{hint}}</div>
  </div>
</template>

<style scoped>
#logo-hint{
  border:solid 1.5px #dddddd;
  border-radius: 50px;
  width:500px;
  margin:auto;
  margin-top: 10px;
  background-color: rgb(255, 255, 255,0.4);
  backdrop-filter: blur(3px);
  box-shadow: 6px 6px 5px #ffebb3;
}
#logo-hint img{
  width: 350px;
}
#logo-hint div{
  position: relative;
  top: -40px;
  margin-bottom: 0px;
  font-size: 23px;
}
</style>

<script>
export default {
  props:{
    hint:{
      type:String,
      required:true
    }
  }
}
</script>