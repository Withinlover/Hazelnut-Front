<template>
  <base-card
    class="good-card"
    :isDemand="isDemand"
    :goodId="goodId"
    :imgUrl="imgUrl"
    :hasOption="true"
    :options="options"
    @clickOption="handleOption">
    <div class="good-info">
      <div class="good-info-base">
        <div class="good-name-box">
          <p class="good-name">
            {{lessGoodName}}
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
          {{lessGoodInfo}}
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
  height: 46px;
  padding:10px 8px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.good-name{
  font-size: 15px;
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
  width: 140px;
  height: 90px;
  padding: 5px 5px;
  border-radius: 20px;
  border: 1px #dddddd solid;
  display: flex;
  align-content: center;
  justify-content: center;
}
.good-info-text{
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
      lessGoodInfo:this.goodInfo.length>35? this.goodInfo.substr(0,35)+'...':this.goodInfo,
      options:['修改','下架']
    }
  },
  methods:{
    handleOption(option){
      if(option==0){
        this.updateGood()
      }else if(option==1){
        this.deleteGood()
      }
    },
    updateGood(){

    },
    deleteGood(){
      this.axios.post('good/delete/',{
        id:this.goodId,
        type:this.isDemand? 1:0
      }).then(res=>{
        this.$message({
          type:'success',
          message:'下架商品成功'
        })
        this.$emit('deleteGood')
      })
    }
  }
}
</script>