<template>
  <div
    class="good-card"
    @click="clickCard">
    <div class="good-img">
      <img :src="imgUrl"/>
    </div>
    <div class="good-info">
      <div class="good-info-base">
        <div class="good-name">
          {{goodName}}
        </div>
        <div class="good-price">
          ￥{{goodPrice}}
        </div>
      </div>
      <div class="good-info-text">
        {{goodInfo}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.good-card{
  margin: 5px;
  height: 300px;
  width: 300px;
  border: solid 1.5px #dddddd;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(2px);
  box-shadow: 2px 2px 3px 1px #ffebb3;
}
.good-card:hover{
  box-shadow: 0px 0px 10px 5px #ffcc99;
  border: solid 1.5px #ffcc99;
}
.good-img{
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
.good-info{
  margin: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.good-info-base{
  display: flex;
  flex-direction: column;
  margin-right: 4px;
}
.good-name{
  width: 90px;
  padding:0px 5px;
  border-radius: 10px;
  border: 1px #dddddd solid;
  font-size: 17px;
}
.good-price{
  margin-top: 4px;
  width: 100px;
  border-radius: 10px;
  border: 1px #dddddd solid;
  font-size: 20px;
  color: crimson;
  font-weight: bold;
}
.good-info-text{
  width: 150px;
  border-radius: 10px;
  border: 1px #dddddd solid;
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