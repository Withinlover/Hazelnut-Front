<template>
  <div
    :class="['base-card',{'hover-card':isHoverCard}]"
    @mouseover="isHoverCard=true"
    @mouseout="isHoverCard=false"
    @click="clickCard">
    <div :class="['base-img',{'base-img-option':hasOption}]">
      <img :src="imgUrl" />
    </div>
    <div
      :class="['base-option',{'hover-option':isHoverOption}]"
      @mouseover="hoverOption($event)"
      @click="clickOption($event)"
      v-if="hasOption">
      <el-dropdown
        @command="handleCommand"
        @visible-change="handleMenuVisible">
        <i class="el-icon-more base-option-icon"></i>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item,index) in options"
            :key="index"
            :command="index">
            {{item}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  position: relative;
}
.hover-card{
  box-shadow: 0px 0px 10px 5px #ffcc99;
  border: solid 1.5px #ffcc99;
}
.base-img{
  width: 70%;
  height: 50%;
  margin: auto;
  margin-top:12px;
}
.base-img-option{
  position: relative;
}
img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 30px;
  border: #dddddd 1px solid;
  object-fit:contain;
}
.base-option{
  height: 30px;
  width: 30px;
  position: absolute;
  right: 15px;
  top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.base-option-icon{
  width:30px;
  height:30px;
  font-size:25px;
  line-height: 30px;
  color: #dddddd;
  border-radius: 50%;
  border: solid 2.5px #f0f0f0;
}
.hover-option i{
  color:#ffcc99;
  border:solid 2.5px #ffebb3;
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
    hasOption:{
      type:Boolean
    },
    options:{
      type:Array
    }
  },
  data(){
    return {
      isHoverCard:false,
      isHoverOption:false
    }
  },
  methods:{
    clickCard(){
      if(this.isDemand){
        this.$router.push('/demand/item/'+this.goodId)
      }else{
        this.$router.push('/commodity/item/'+this.goodId)
      }
    },
    handleCommand(index){
      this.$emit('clickOption',index)
    },
    hoverOption(event){
      event.stopPropagation()
      this.isHoverCard=false
      this.isHoverOption=true
    },
    clickOption(event){
      event.stopPropagation()
    },
    handleMenuVisible(state){
      if(state){
        this.isHoverOption=true
      }else{
        this.isHoverOption=false
      }
    }
  }
}
</script>