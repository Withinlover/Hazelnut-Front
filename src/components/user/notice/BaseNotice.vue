<template>
  <div
    class="base-notice"
    @click="onClick">
    
    <slot v-if="showDetail"></slot>
  </div>
</template>

<style scoped>
.base-notice{
  width: 500px;
  border: solid 1.5px #dddddd;
  border-radius: 25px;
  box-shadow: 3px 3px 4px 1px #dddddd;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(3px);
}
</style>

<script>
export default {
  data(){
    return {
      showDetail:false
    }
  },
  methods:{
    onClick(){
      this.showDetail=!this.showDetail
    }
  }
}
</script>