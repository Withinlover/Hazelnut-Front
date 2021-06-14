<template>
  <div
    class="base-card"
    @click="clickCard">
    <div class="base-img">
      <img :src="imgUrl" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card{
  margin: 5px;
  height: 300px;
  width: 300px;
  border: solid 1.5px #dddddd;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  box-shadow: 2px 2px 3px 1px #ffebb3;
  cursor: pointer;
}
.base-card:hover{
  box-shadow: 0px 0px 10px 5px #ffcc99;
  border: solid 1.5px #ffcc99;
}
.base-img{
  width: 90%;
  height: 50%;
  margin: auto;
  margin-top:12px;
}
img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 30px;
  border: #dddddd 1px solid;
  object-fit:contain;
}
</style>

<script>
export default {
  props:{
    isDemand:{
      type:Boolean,
      required:true
    },
    goodId:{
      type:Number,
      required:true
    },
    imgUrl:{
      type:String,
      required:true
    }
  },
  methods:{
    clickCard(){
      if(this.isDemand){
        this.$router.push('/demand/item/'+this.goodId)
      }else{
        this.$router.push('/commodity/item/'+this.goodId)
      }
    }
  }
}
</script>