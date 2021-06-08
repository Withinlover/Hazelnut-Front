<template>
  <base-card
    class="good-card"
    :isDemand="isDemand"
    :goodId="goodId"
    :imgUrl="imgUrl">
    <div class="good-info">
      <div class="good-info-base">
        <div class="good-name-box">
          <p class="good-name">
            {{goodName}}
          </p>
        </div>
        <div class="good-price-box">
          <p class="good-price">
            ￥{{goodPrice}}
          </p>
        </div>
      </div>
      <div class="good-info-text-box">
        <p class="good-info-text">
          {{goodInfo}}
        </p>
      </div>
    </div>
  </base-card>
</template>

<style scoped>
.good-info{
  margin: auto;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.good-info-base{
  display: flex;
  flex-direction: column;
  margin-right: 4px;
}
.good-name-box{
  width: 84px;
  height: 66px;
  padding:0px 8px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
.good-name{
  font-size: 18px;
  font-weight: bold;
}
.good-price-box{
  margin-top: 4px;
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  align-content: center;
  justify-content: center;
}
.good-price{
  margin: auto;
  font-size: 20px;
  color: crimson;
  font-weight: bold;
}
.good-info-text-box{
  width: 150px;
  height: 100px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  align-content: center;
  justify-content: center;
}
.good-info-text{
  margin: auto;
}
</style>

<script>
import BaseCard from './BaseCard.vue'

export default {
  components:{
    BaseCard
  },
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
    },
    goodName:{
      type:String,
      required:true
    },
    goodPrice:{
      type:String,
      required:true
    },
    goodInfo:{
      type:String,
      required:true
    }
  }
}
</script>