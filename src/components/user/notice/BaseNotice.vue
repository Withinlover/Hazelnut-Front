<template>
  <div class="base-notice">
    <div 
      class="base-info" 
      @click="onClick">
      <i :class="icon"></i>
      <p>{{message}}</p>
      <div :class="isRead?'read':'unread'">
        {{isRead?'已读':'未读'}}
      </div>
    </div>
    <slot v-if="showDetail"></slot>
  </div>
</template>

<style scoped>
.base-notice{
  margin:auto;
  margin-top: 8px;
  width: 600px;
  border: solid 1.5px #dddddd;
  border-radius: 25px;
  box-shadow: 2px 2px 4px 1px #dddddd;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(3px);
}
.base-notice:hover{
  box-shadow: 0px 0px 4px 1px #ffcc99;
  border: solid 1.5px #ffcc99;
}
.base-info{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.base-info i{
  padding: 2px;
  font-size: 32px;
  color: rgb(110, 91,80);
  border-radius: 50%;
  background: rgb(224, 209, 193);
  box-shadow: 0px 0px 3px 2px rgb(224, 209, 193);
}
.base-info p{
  margin: 10px 150px 10px 170px;
  font-size: 21px;
  font-weight: bold;
  color: rgb(110, 91,80);
}
.read,.unread{
  padding: 5px 10px;
  border: solid 1px #dddddd;
  border-radius: 20px;
  color: rgb(110, 91,80);
  font-weight: bold;
}
</style>

<script>
export default {
  props:{
    isRead:{
      type:Boolean,
      required:true
    },
    message:{
      type:String,
      required:true
    },
    icon:{
      type:String,
      required:true
    }
  },
  data(){
    return {
      showDetail:false
    }
  },
  methods:{
    onClick(){
      if(this.showDetail){
        this.$emit('close')
      }else{
        this.$emit('read')
      }
      this.showDetail=!this.showDetail
    }
  }
}
</script>