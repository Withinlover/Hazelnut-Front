<template>
  <base-card
    class="favorite-card"
    :isDemand="isDemand"
    :goodId="goodId"
    :imgUrl="imgUrl">
    <div class="favorite-info">
      <div class="favorite-info-base">
        <div class="favorite-name-box">
          <p class="favorite-name">
            {{lessGoodName}}
          </p>
        </div>
        <div class="favorite-price-box">
          <p class="favorite-price">
            ￥{{goodPrice}}
          </p>
        </div>
      </div>
      <div class="favorite-info-text-box">
        <p class="favorite-info-text">
          {{lessGoodInfo}}
        </p>
      </div>
    </div>
  </base-card>
</template>

<style scoped>
.favorite-info{
  margin: auto;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.favorite-info-base{
  display: flex;
  flex-direction: column;
  margin-right: 4px;
}
.favorite-name-box{
  width: 84px;
  height: 46px;
  padding:10px 8px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.favorite-name{
  font-size: 15px;
  font-weight: bold;
}
.favorite-price-box{
  margin-top: 4px;
  width: 100px;
  height: 30px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  align-content: center;
  justify-content: center;
}
.favorite-price{
  margin: auto;
  font-size: 20px;
  color: crimson;
  font-weight: bold;
}
.favorite-info-text-box{
  width: 140px;
  height: 90px;
  padding: 5px 5px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  align-content: center;
  justify-content: center;
}
.favorite-info-text{
  margin: auto;
  font-size: 15px;
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
  },
  data(){
    return {
      lessGoodName:this.goodName.length>12? this.goodName.substr(0,12)+'...':this.goodName,
      lessGoodInfo:this.goodInfo.length>35? this.goodInfo.substr(0,35)+'...':this.goodInfo
    }
  }
}
</script>