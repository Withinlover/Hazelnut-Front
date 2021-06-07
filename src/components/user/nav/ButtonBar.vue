<template>
  <div id="button-bar">
    <el-button-group>
      <el-button 
        type="primary" 
        icon="el-icon-arrow-left"
        @click="clickLeft"
        :disabled="isLeft"
        round>
        {{leftText}}
      </el-button>
      <el-button 
        type="primary" 
        @click="clickRight"
        :disabled="!isLeft"
        round>
        {{rightText}}
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props:{
    leftText:{
      type:String,
      required:true
    },
    rightText:{
      type:String,
      required:true
    },
    isLeft:{
      type:Boolean,
      required:true
    }
  },
  methods:{
    clickLeft(){
      this.$emit('clickLeft')
    },
    clickRight(){
      this.$emit('clickRight')
    }
  }
}
</script>